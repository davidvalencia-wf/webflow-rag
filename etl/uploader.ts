/**
 * Data Uploader for ETL Pipeline
 *
 * Reads embeddings and uploads to Pinecone + D1 database.
 * Handles deduplication, batch processing, and error recovery.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... \
 *   PINECONE_API_KEY=... \
 *   PINECONE_INDEX_NAME=webflow-docs \
 *   npx tsx uploader.ts
 */

import fs from 'fs';
import path from 'path';
import { Pinecone } from '@pinecone-database/pinecone';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// ES modules workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  inputFile: path.join(__dirname, 'output/embeddings/all-sources-embeddings.json'),
  d1DatabasePath: path.join(__dirname, '../.wrangler/state/v3/d1/miniflare-D1DatabaseObject'),
  vectorBatchSize: 100,
  retryAttempts: 3,
  retryDelayMs: 1000,
};

// ==========================================
// Types
// ==========================================

type ChunkWithEmbedding = {
  id: string;
  document_id: string;
  content: string;
  hash: string;
  token_count: number;
  section: string | null;
  chunk_index: number;
  metadata: {
    uri: string;
    title: string;
    publishDate: string;
    category: string;
  };
  embedding: number[];
};

type EmbeddingResult = {
  totalChunks: number;
  successfulEmbeddings: number;
  failedEmbeddings: number;
  totalTokensUsed: number;
  estimatedCost: number;
  chunks: ChunkWithEmbedding[];
};

type UploadStats = {
  documentsInserted: number;
  chunksInserted: number;
  vectorsUploaded: number;
  duplicatesSkipped: number;
  errors: number;
};

// ==========================================
// Pinecone Client
// ==========================================

function getPineconeClient(): Pinecone {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error('PINECONE_API_KEY environment variable is required');
  }
  return new Pinecone({ apiKey });
}

function getPineconeIndex() {
  const client = getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME || 'webflow-docs';
  return client.index(indexName);
}

// ==========================================
// Database Functions
// ==========================================

function getD1Database(): Database.Database {
  // For local development, we need to find the wrangler D1 database
  const wranglerDbPath = path.join(
    __dirname,
    '../apps/web/.wrangler/state/v3/d1/miniflare-D1DatabaseObject'
  );

  if (!fs.existsSync(wranglerDbPath)) {
    throw new Error(
      `D1 database not found at ${wranglerDbPath}\n` +
        'Please ensure wrangler dev has been run at least once to create the database.'
    );
  }

  // Find the actual .sqlite file
  const files = fs.readdirSync(wranglerDbPath);
  const sqliteFile = files.find((f) => f.endsWith('.sqlite'));

  if (!sqliteFile) {
    throw new Error(`No .sqlite file found in ${wranglerDbPath}`);
  }

  const dbPath = path.join(wranglerDbPath, sqliteFile);
  console.log(`📁 Using D1 database: ${dbPath}\n`);

  return new Database(dbPath);
}

function insertDocuments(db: Database.Database, chunks: ChunkWithEmbedding[]): number {
  // Get unique documents from chunks
  const documentMap = new Map<string, ChunkWithEmbedding>();

  for (const chunk of chunks) {
    if (!documentMap.has(chunk.document_id)) {
      documentMap.set(chunk.document_id, chunk);
    }
  }

  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO documents (id, uri, title, source_type, created_at, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  let inserted = 0;
  for (const [docId, chunk] of documentMap) {
    const result = insertStmt.run(
      docId,
      chunk.metadata.uri,
      chunk.metadata.title,
      chunk.metadata.source_type || 'unknown'
    );
    if (result.changes > 0) inserted++;
  }

  return inserted;
}

function insertChunks(db: Database.Database, chunks: ChunkWithEmbedding[]): { inserted: number; duplicates: number } {
  const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO chunks (
      id, document_id, content, hash, token_count, section, chunk_index, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  let inserted = 0;
  let duplicates = 0;

  for (const chunk of chunks) {
    const result = insertStmt.run(
      chunk.id,
      chunk.document_id,
      chunk.content,
      chunk.hash,
      chunk.token_count,
      chunk.section,
      chunk.chunk_index
    );

    if (result.changes > 0) {
      inserted++;
    } else {
      duplicates++;
    }
  }

  return { inserted, duplicates };
}

// ==========================================
// Pinecone Upload
// ==========================================

async function uploadVectorsToPinecone(
  chunks: ChunkWithEmbedding[],
  batchSize: number
): Promise<number> {
  const index = getPineconeIndex();
  let uploaded = 0;

  const batchCount = Math.ceil(chunks.length / batchSize);
  console.log(`\n🔄 Uploading vectors to Pinecone in ${batchCount} batches...\n`);

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    console.log(`Batch ${batchNumber}/${batchCount} (vectors ${i + 1}-${i + batch.length}):`);

    try {
      // Format vectors for Pinecone
      const vectors = batch.map((chunk) => ({
        id: chunk.id,
        values: chunk.embedding,
        metadata: {
          id: chunk.id,
          document_id: chunk.document_id,
          content: chunk.content,
          uri: chunk.metadata.uri,
          title: chunk.metadata.title,
          section: chunk.section || '',
          source_type: chunk.metadata.source_type || 'unknown',
          token_count: chunk.token_count,
          created_at: new Date().toISOString(),
        },
      }));

      // Upsert to Pinecone
      await index.upsert(vectors);
      uploaded += batch.length;

      console.log(`   ✓ Uploaded ${batch.length} vectors\n`);

      // Rate limiting: wait 500ms between batches
      if (i + batchSize < chunks.length) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`   ❌ Failed to upload batch ${batchNumber}:`, error);
      throw error;
    }
  }

  return uploaded;
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('⬆️  Webflow RAG - Data Uploader\n');

  // Check environment variables
  const requiredEnvVars = ['PINECONE_API_KEY'];
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.error(`❌ Error: Missing required environment variables: ${missingVars.join(', ')}\n`);
    console.log('Usage:');
    console.log('  PINECONE_API_KEY=... PINECONE_INDEX_NAME=webflow-docs npx tsx uploader.ts\n');
    process.exit(1);
  }

  // Load embeddings
  console.log('📖 Loading embeddings...');
  if (!fs.existsSync(CONFIG.inputFile)) {
    console.error(`❌ Error: Input file not found: ${CONFIG.inputFile}\n`);
    console.log('Please run the embedder first: npx tsx embedder.ts\n');
    process.exit(1);
  }

  const embeddingsData = JSON.parse(
    fs.readFileSync(CONFIG.inputFile, 'utf-8')
  ) as EmbeddingResult;
  console.log(`✓ Loaded ${embeddingsData.totalChunks} chunks with embeddings\n`);

  // Connect to D1 database
  console.log('🗄️  Connecting to D1 database...');
  const db = getD1Database();

  // Statistics
  const stats: UploadStats = {
    documentsInserted: 0,
    chunksInserted: 0,
    vectorsUploaded: 0,
    duplicatesSkipped: 0,
    errors: 0,
  };

  const startTime = Date.now();

  try {
    // Step 1: Insert documents
    console.log('📝 Inserting documents into D1...');
    stats.documentsInserted = insertDocuments(db, embeddingsData.chunks);
    console.log(`✓ Inserted ${stats.documentsInserted} documents\n`);

    // Step 2: Insert chunks
    console.log('📝 Inserting chunks into D1...');
    const chunkResult = insertChunks(db, embeddingsData.chunks);
    stats.chunksInserted = chunkResult.inserted;
    stats.duplicatesSkipped = chunkResult.duplicates;
    console.log(`✓ Inserted ${stats.chunksInserted} chunks`);
    if (stats.duplicatesSkipped > 0) {
      console.log(`   (Skipped ${stats.duplicatesSkipped} duplicates)`);
    }
    console.log();

    // Step 3: Upload vectors to Pinecone
    stats.vectorsUploaded = await uploadVectorsToPinecone(
      embeddingsData.chunks,
      CONFIG.vectorBatchSize
    );

    const elapsedMs = Date.now() - startTime;

    // Final report
    console.log('='.repeat(60));
    console.log('✅ Upload Complete!\n');
    console.log(`📊 Statistics:`);
    console.log(`   Documents inserted: ${stats.documentsInserted}`);
    console.log(`   Chunks inserted: ${stats.chunksInserted}`);
    console.log(`   Vectors uploaded: ${stats.vectorsUploaded}`);
    console.log(`   Duplicates skipped: ${stats.duplicatesSkipped}`);
    console.log(`   Time elapsed: ${(elapsedMs / 1000).toFixed(1)}s`);
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n❌ Upload failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export { uploadVectorsToPinecone, insertDocuments, insertChunks };
