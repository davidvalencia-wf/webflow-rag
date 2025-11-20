/**
 * Validation Script for ETL Pipeline
 *
 * Verifies data integrity across Pinecone and D1 database.
 * Runs sample queries to test the RAG pipeline.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... \
 *   PINECONE_API_KEY=... \
 *   PINECONE_INDEX_NAME=webflow-docs \
 *   npx tsx validate.ts
 */

import fs from 'fs';
import path from 'path';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

// ES modules workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  embeddingsFile: path.join(__dirname, 'output/embeddings/webflow-updates-embeddings.json'),
  sampleQueries: [
    'How do I use the Webflow AI Assistant?',
    'What are the new features for CMS?',
    'How do I add drop shadows in Webflow?',
    'What is page branching?',
    'How do I optimize for SEO and AEO?',
  ],
};

// ==========================================
// Types
// ==========================================

type ValidationResult = {
  timestamp: string;
  checks: {
    pineconeVectorCount: { expected: number; actual: number; passed: boolean };
    d1DocumentCount: { expected: number; actual: number; passed: boolean };
    d1ChunkCount: { expected: number; actual: number; passed: boolean };
    uniqueHashes: { passed: boolean; duplicates: number };
    sampleQueries: Array<{
      query: string;
      passed: boolean;
      resultsCount: number;
      topResult?: string;
    }>;
  };
  overallPassed: boolean;
};

// ==========================================
// Clients
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

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({ apiKey });
}

function getD1Database(): Database.Database {
  const wranglerDbPath = path.join(
    __dirname,
    '../apps/web/.wrangler/state/v3/d1/miniflare-D1DatabaseObject'
  );

  if (!fs.existsSync(wranglerDbPath)) {
    throw new Error(`D1 database not found at ${wranglerDbPath}`);
  }

  const files = fs.readdirSync(wranglerDbPath);
  const sqliteFile = files.find((f) => f.endsWith('.sqlite'));

  if (!sqliteFile) {
    throw new Error(`No .sqlite file found in ${wranglerDbPath}`);
  }

  const dbPath = path.join(wranglerDbPath, sqliteFile);
  return new Database(dbPath);
}

// ==========================================
// Validation Checks
// ==========================================

async function checkPineconeVectorCount(expectedCount: number): Promise<{
  expected: number;
  actual: number;
  passed: boolean;
}> {
  const index = getPineconeIndex();
  const stats = await index.describeIndexStats();
  const actual = stats.totalRecordCount || 0;

  return {
    expected: expectedCount,
    actual,
    passed: actual === expectedCount,
  };
}

function checkD1DocumentCount(db: Database.Database, expectedCount: number): {
  expected: number;
  actual: number;
  passed: boolean;
} {
  const result = db.prepare('SELECT COUNT(*) as count FROM documents').get() as { count: number };
  const actual = result.count;

  return {
    expected: expectedCount,
    actual,
    passed: actual === expectedCount,
  };
}

function checkD1ChunkCount(db: Database.Database, expectedCount: number): {
  expected: number;
  actual: number;
  passed: boolean;
} {
  const result = db.prepare('SELECT COUNT(*) as count FROM chunks').get() as { count: number };
  const actual = result.count;

  return {
    expected: expectedCount,
    actual,
    passed: actual === expectedCount,
  };
}

function checkUniqueHashes(db: Database.Database): { passed: boolean; duplicates: number } {
  const result = db
    .prepare(
      'SELECT COUNT(*) as count FROM (SELECT hash, COUNT(*) as c FROM chunks GROUP BY hash HAVING c > 1)'
    )
    .get() as { count: number };

  return {
    passed: result.count === 0,
    duplicates: result.count,
  };
}

async function runSampleQuery(query: string): Promise<{
  query: string;
  passed: boolean;
  resultsCount: number;
  topResult?: string;
}> {
  try {
    const openai = getOpenAIClient();
    const index = getPineconeIndex();

    // Generate embedding for query
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
      encoding_format: 'float',
    });

    const embedding = embeddingResponse.data[0]?.embedding;
    if (!embedding) {
      throw new Error('Failed to generate embedding');
    }

    // Query Pinecone
    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    const resultsCount = queryResponse.matches.length;
    const topResult = queryResponse.matches[0]?.metadata?.title as string | undefined;

    return {
      query,
      passed: resultsCount > 0,
      resultsCount,
      topResult,
    };
  } catch (error) {
    console.error(`   ❌ Error running query "${query}":`, error);
    return {
      query,
      passed: false,
      resultsCount: 0,
    };
  }
}

// ==========================================
// Main Validation
// ==========================================

async function main() {
  console.log('✅ Webflow RAG - Validation Script\n');

  // Check environment variables
  const requiredEnvVars = ['OPENAI_API_KEY', 'PINECONE_API_KEY'];
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    console.error(`❌ Error: Missing required environment variables: ${missingVars.join(', ')}\n`);
    process.exit(1);
  }

  // Load expected counts from embeddings file
  console.log('📖 Loading expected counts...');
  if (!fs.existsSync(CONFIG.embeddingsFile)) {
    console.error(`❌ Error: Embeddings file not found: ${CONFIG.embeddingsFile}\n`);
    console.log('Please run the embedder first: npx tsx embedder.ts\n');
    process.exit(1);
  }

  const embeddingsData = JSON.parse(fs.readFileSync(CONFIG.embeddingsFile, 'utf-8')) as {
    totalChunks: number;
    chunks: Array<{ document_id: string }>;
  };

  const expectedChunks = embeddingsData.totalChunks;
  const uniqueDocuments = new Set(embeddingsData.chunks.map((c) => c.document_id)).size;

  console.log(`✓ Expected ${uniqueDocuments} documents and ${expectedChunks} chunks\n`);

  // Connect to D1
  console.log('🗄️  Connecting to D1 database...');
  const db = getD1Database();
  console.log('✓ Connected\n');

  // Run validation checks
  const result: ValidationResult = {
    timestamp: new Date().toISOString(),
    checks: {
      pineconeVectorCount: { expected: 0, actual: 0, passed: false },
      d1DocumentCount: { expected: 0, actual: 0, passed: false },
      d1ChunkCount: { expected: 0, actual: 0, passed: false },
      uniqueHashes: { passed: false, duplicates: 0 },
      sampleQueries: [],
    },
    overallPassed: false,
  };

  console.log('🔍 Running validation checks...\n');

  // Check 1: Pinecone vector count
  console.log('1. Checking Pinecone vector count...');
  result.checks.pineconeVectorCount = await checkPineconeVectorCount(expectedChunks);
  console.log(
    result.checks.pineconeVectorCount.passed
      ? `   ✓ Passed: ${result.checks.pineconeVectorCount.actual} vectors\n`
      : `   ❌ Failed: Expected ${result.checks.pineconeVectorCount.expected}, got ${result.checks.pineconeVectorCount.actual}\n`
  );

  // Check 2: D1 document count
  console.log('2. Checking D1 document count...');
  result.checks.d1DocumentCount = checkD1DocumentCount(db, uniqueDocuments);
  console.log(
    result.checks.d1DocumentCount.passed
      ? `   ✓ Passed: ${result.checks.d1DocumentCount.actual} documents\n`
      : `   ❌ Failed: Expected ${result.checks.d1DocumentCount.expected}, got ${result.checks.d1DocumentCount.actual}\n`
  );

  // Check 3: D1 chunk count
  console.log('3. Checking D1 chunk count...');
  result.checks.d1ChunkCount = checkD1ChunkCount(db, expectedChunks);
  console.log(
    result.checks.d1ChunkCount.passed
      ? `   ✓ Passed: ${result.checks.d1ChunkCount.actual} chunks\n`
      : `   ❌ Failed: Expected ${result.checks.d1ChunkCount.expected}, got ${result.checks.d1ChunkCount.actual}\n`
  );

  // Check 4: Unique hashes
  console.log('4. Checking for duplicate hashes...');
  result.checks.uniqueHashes = checkUniqueHashes(db);
  console.log(
    result.checks.uniqueHashes.passed
      ? `   ✓ Passed: All hashes are unique\n`
      : `   ❌ Failed: Found ${result.checks.uniqueHashes.duplicates} duplicate hashes\n`
  );

  // Check 5: Sample queries
  console.log('5. Running sample queries...\n');
  for (const query of CONFIG.sampleQueries) {
    console.log(`   Testing: "${query}"`);
    const queryResult = await runSampleQuery(query);
    result.checks.sampleQueries.push(queryResult);

    if (queryResult.passed) {
      console.log(`   ✓ Found ${queryResult.resultsCount} results`);
      if (queryResult.topResult) {
        console.log(`     Top result: ${queryResult.topResult}`);
      }
    } else {
      console.log(`   ❌ No results found`);
    }
    console.log();
  }

  // Determine overall result
  result.overallPassed =
    result.checks.pineconeVectorCount.passed &&
    result.checks.d1DocumentCount.passed &&
    result.checks.d1ChunkCount.passed &&
    result.checks.uniqueHashes.passed &&
    result.checks.sampleQueries.every((q) => q.passed);

  // Final report
  console.log('='.repeat(60));
  if (result.overallPassed) {
    console.log('✅ ALL VALIDATION CHECKS PASSED!\n');
  } else {
    console.log('❌ VALIDATION FAILED\n');
  }

  console.log('Summary:');
  console.log(`  Pinecone vectors: ${result.checks.pineconeVectorCount.passed ? '✓' : '❌'}`);
  console.log(`  D1 documents: ${result.checks.d1DocumentCount.passed ? '✓' : '❌'}`);
  console.log(`  D1 chunks: ${result.checks.d1ChunkCount.passed ? '✓' : '❌'}`);
  console.log(`  Unique hashes: ${result.checks.uniqueHashes.passed ? '✓' : '❌'}`);
  console.log(
    `  Sample queries: ${result.checks.sampleQueries.filter((q) => q.passed).length}/${result.checks.sampleQueries.length} passed`
  );
  console.log('='.repeat(60));

  db.close();

  process.exit(result.overallPassed ? 0 : 1);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}
