/**
 * Embeddings Generator for ETL Pipeline
 *
 * Reads chunked documents, generates embeddings using OpenAI API,
 * and outputs chunks with embeddings ready for Pinecone upload.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx embedder.ts
 */

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';

// ES modules workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  inputFile: path.join(__dirname, 'output/chunks/all-sources-chunks-2025-11-17T23-10-53-795Z.json'),
  outputFile: path.join(__dirname, 'output/embeddings/all-sources-embeddings.json'),
  embeddingModel: 'text-embedding-3-small',
  embeddingDimension: 1536,
  batchSize: 100, // OpenAI allows up to 2048 inputs per request, but we'll be conservative
  retryAttempts: 3,
  retryDelayMs: 1000,
};

// ==========================================
// Types
// ==========================================

type Chunk = {
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
};

type ChunkWithEmbedding = Chunk & {
  embedding: number[];
};

type ChunkingResult = {
  totalDocuments: number;
  totalChunks: number;
  averageChunksPerDoc: number;
  averageTokensPerChunk: number;
  chunks: Chunk[];
};

type EmbeddingResult = {
  totalChunks: number;
  successfulEmbeddings: number;
  failedEmbeddings: number;
  totalTokensUsed: number;
  estimatedCost: number;
  chunks: ChunkWithEmbedding[];
};

// ==========================================
// OpenAI Client
// ==========================================

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY environment variable is required. ' +
        'Please set it: OPENAI_API_KEY=sk-... npx tsx embedder.ts'
    );
  }

  return new OpenAI({ apiKey });
}

// ==========================================
// Utility Functions
// ==========================================

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateEmbeddings(
  client: OpenAI,
  texts: string[],
  attempt: number = 1
): Promise<number[][]> {
  try {
    console.log(`   → Calling OpenAI API (batch of ${texts.length} texts)...`);

    const response = await client.embeddings.create({
      model: CONFIG.embeddingModel,
      input: texts,
      encoding_format: 'float',
    });

    const embeddings = response.data.map((item) => item.embedding);

    // Validate dimension
    if (embeddings[0]?.length !== CONFIG.embeddingDimension) {
      throw new Error(
        `Unexpected embedding dimension: ${embeddings[0]?.length} (expected ${CONFIG.embeddingDimension})`
      );
    }

    return embeddings;
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };

    // Retry on rate limit or transient errors
    if (
      (err.status === 429 || err.status === 500 || err.status === 503) &&
      attempt < CONFIG.retryAttempts
    ) {
      const delayMs = CONFIG.retryDelayMs * Math.pow(2, attempt - 1);
      console.log(
        `   ⚠️  Rate limited or error (${err.status}). Retrying in ${delayMs}ms... (attempt ${attempt}/${CONFIG.retryAttempts})`
      );
      await sleep(delayMs);
      return generateEmbeddings(client, texts, attempt + 1);
    }

    throw error;
  }
}

// ==========================================
// Main Embedding Logic
// ==========================================

async function generateEmbeddingsForChunks(chunks: Chunk[]): Promise<ChunkWithEmbedding[]> {
  const client = getOpenAIClient();
  const chunksWithEmbeddings: ChunkWithEmbedding[] = [];

  let totalTokensUsed = 0;
  const batchCount = Math.ceil(chunks.length / CONFIG.batchSize);

  console.log(`\n🔄 Generating embeddings in ${batchCount} batches...\n`);

  for (let i = 0; i < chunks.length; i += CONFIG.batchSize) {
    const batch = chunks.slice(i, i + CONFIG.batchSize);
    const batchNumber = Math.floor(i / CONFIG.batchSize) + 1;

    console.log(`Batch ${batchNumber}/${batchCount} (chunks ${i + 1}-${i + batch.length}):`);

    try {
      // Extract texts from batch
      const texts = batch.map((chunk) => chunk.content);

      // Generate embeddings
      const embeddings = await generateEmbeddings(client, texts);

      // Combine chunks with embeddings
      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j]!;
        const embedding = embeddings[j]!;

        chunksWithEmbeddings.push({
          ...chunk,
          embedding,
        });

        totalTokensUsed += chunk.token_count;
      }

      console.log(`   ✓ Successfully embedded ${batch.length} chunks\n`);

      // Rate limiting: wait 1 second between batches
      if (i + CONFIG.batchSize < chunks.length) {
        await sleep(1000);
      }
    } catch (error) {
      console.error(`   ❌ Failed to embed batch ${batchNumber}:`, error);
      throw error;
    }
  }

  return chunksWithEmbeddings;
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🧠 Webflow RAG - Embeddings Generator\n');

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is required\n');
    console.log('Usage:');
    console.log('  OPENAI_API_KEY=sk-... npx tsx embedder.ts\n');
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${outputDir}\n`);
  }

  // Load chunks
  console.log('📖 Loading chunks...');
  if (!fs.existsSync(CONFIG.inputFile)) {
    console.error(`❌ Error: Input file not found: ${CONFIG.inputFile}\n`);
    console.log('Please run the chunker first: npx tsx chunker.ts\n');
    process.exit(1);
  }

  const chunksData = JSON.parse(fs.readFileSync(CONFIG.inputFile, 'utf-8')) as ChunkingResult;
  console.log(`✓ Loaded ${chunksData.totalChunks} chunks from ${chunksData.totalDocuments} documents\n`);

  // Generate embeddings
  const startTime = Date.now();
  let chunksWithEmbeddings: ChunkWithEmbedding[];

  try {
    chunksWithEmbeddings = await generateEmbeddingsForChunks(chunksData.chunks);
  } catch (error) {
    console.error('\n❌ Embedding generation failed:', error);
    process.exit(1);
  }

  const elapsedMs = Date.now() - startTime;

  // Calculate cost (OpenAI text-embedding-3-small: $0.00002 per 1K tokens)
  const totalTokens = chunksWithEmbeddings.reduce((sum, chunk) => sum + chunk.token_count, 0);
  const estimatedCost = (totalTokens / 1000) * 0.00002;

  // Prepare result
  const result: EmbeddingResult = {
    totalChunks: chunksWithEmbeddings.length,
    successfulEmbeddings: chunksWithEmbeddings.length,
    failedEmbeddings: 0,
    totalTokensUsed: totalTokens,
    estimatedCost,
    chunks: chunksWithEmbeddings,
  };

  // Write output
  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(result, null, 2), 'utf-8');

  console.log('='.repeat(60));
  console.log('✅ Embedding Generation Complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Chunks processed: ${result.totalChunks}`);
  console.log(`   Successful: ${result.successfulEmbeddings}`);
  console.log(`   Failed: ${result.failedEmbeddings}`);
  console.log(`   Total tokens: ${result.totalTokensUsed.toLocaleString()}`);
  console.log(`   Estimated cost: $${estimatedCost.toFixed(4)}`);
  console.log(`   Time elapsed: ${(elapsedMs / 1000).toFixed(1)}s`);
  console.log(`\n📁 Output saved to: ${CONFIG.outputFile}`);
  console.log('='.repeat(60));
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export { generateEmbeddingsForChunks };
