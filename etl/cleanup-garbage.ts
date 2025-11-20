#!/usr/bin/env node
/**
 * Cleanup Script - Purge Garbage Data from Pinecone and D1
 *
 * Removes 404 error pages and invalid content from:
 * - webflow-help-center (50 docs, 50 chunks)
 * - webflow-blog (30 docs, 30 chunks)
 * - webflow-api-docs (40 docs, 154 chunks)
 *
 * Total to remove: 120 docs, 234 chunks
 * Keeps: webflow-updates (48 docs, 136 chunks) + webflow-way (30 docs, 405 chunks)
 */

import { Pinecone } from '@pinecone-database/pinecone';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PINECONE_API_KEY = 'pcsk_38N2Jd_MtLe3vXs5geumRN2de8hirJfCGGnA93AQ6iBfmCRZS8v3qDwYAopg6tE5Pe5vRX';
const PINECONE_INDEX_NAME = 'webflow-docs';

const GARBAGE_SOURCES = ['webflow-help-center', 'webflow-blog', 'webflow-api-docs'];

async function main() {
  console.log('🗑️  Garbage Data Cleanup Script\n');
  console.log('=' .repeat(60));

  // Step 1: Get D1 database
  console.log('\n📊 Step 1: Analyzing D1 Database...');

  const wranglerDbPath = path.join(
    __dirname,
    '../apps/web/.wrangler/state/v3/d1/miniflare-D1DatabaseObject'
  );

  const files = fs.readdirSync(wranglerDbPath);
  const sqliteFile = files.find((f) => f.endsWith('.sqlite'));
  if (!sqliteFile) {
    throw new Error('SQLite database not found');
  }

  const dbPath = path.join(wranglerDbPath, sqliteFile);
  const db = new Database(dbPath);

  // Count what we're about to delete
  const chunkCount = db.prepare(`
    SELECT d.source_type, COUNT(c.id) as chunk_count
    FROM chunks c
    JOIN documents d ON c.document_id = d.id
    WHERE d.source_type IN (?, ?, ?)
    GROUP BY d.source_type
  `).all(...GARBAGE_SOURCES);

  const docCount = db.prepare(`
    SELECT source_type, COUNT(*) as doc_count
    FROM documents
    WHERE source_type IN (?, ?, ?)
    GROUP BY source_type
  `).all(...GARBAGE_SOURCES);

  console.log('\n📋 Found garbage data:');
  docCount.forEach((row: any) => {
    const chunks = chunkCount.find((c: any) => c.source_type === row.source_type);
    console.log(`   ${row.source_type}: ${row.doc_count} docs, ${chunks?.chunk_count || 0} chunks`);
  });

  const totalChunks = chunkCount.reduce((sum, row: any) => sum + row.chunk_count, 0);
  const totalDocs = docCount.reduce((sum, row: any) => sum + row.doc_count, 0);

  console.log(`\n   TOTAL TO DELETE: ${totalDocs} docs, ${totalChunks} chunks`);

  // Step 2: Delete from D1
  console.log('\n🗄️  Step 2: Deleting from D1...');

  // Get chunk IDs before deleting (for Pinecone cleanup)
  const chunkIds = db.prepare(`
    SELECT c.id
    FROM chunks c
    JOIN documents d ON c.document_id = d.id
    WHERE d.source_type IN (?, ?, ?)
  `).all(...GARBAGE_SOURCES).map((row: any) => row.id);

  console.log(`   Found ${chunkIds.length} chunk IDs to delete from Pinecone`);

  // Delete chunks (CASCADE will handle documents)
  const deleteChunks = db.prepare(`
    DELETE FROM chunks
    WHERE document_id IN (
      SELECT id FROM documents WHERE source_type IN (?, ?, ?)
    )
  `);

  const chunksDeleted = deleteChunks.run(...GARBAGE_SOURCES);
  console.log(`   ✓ Deleted ${chunksDeleted.changes} chunks from D1`);

  // Delete documents
  const deleteDocs = db.prepare(`
    DELETE FROM documents WHERE source_type IN (?, ?, ?)
  `);

  const docsDeleted = deleteDocs.run(...GARBAGE_SOURCES);
  console.log(`   ✓ Deleted ${docsDeleted.changes} documents from D1`);

  db.close();

  // Step 3: Delete from Pinecone
  console.log('\n🔮 Step 3: Deleting from Pinecone...');

  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = pinecone.index(PINECONE_INDEX_NAME);

  // Delete in batches of 100 (Pinecone limit)
  const batchSize = 100;
  let deleted = 0;

  for (let i = 0; i < chunkIds.length; i += batchSize) {
    const batch = chunkIds.slice(i, i + batchSize);
    await index.deleteMany(batch);
    deleted += batch.length;
    console.log(`   Deleted ${deleted}/${chunkIds.length} vectors...`);
  }

  console.log(`   ✓ Deleted ${deleted} vectors from Pinecone`);

  // Step 4: Verify cleanup
  console.log('\n✅ Step 4: Verifying Cleanup...');

  const db2 = new Database(dbPath);

  const remainingDocs = db2.prepare(`
    SELECT source_type, COUNT(*) as count
    FROM documents
    GROUP BY source_type
  `).all();

  const remainingChunks = db2.prepare(`
    SELECT d.source_type, COUNT(c.id) as count
    FROM chunks c
    JOIN documents d ON c.document_id = d.id
    GROUP BY d.source_type
  `).all();

  console.log('\n📊 Remaining data in D1:');
  remainingDocs.forEach((row: any) => {
    const chunks = remainingChunks.find((c: any) => c.source_type === row.source_type);
    console.log(`   ${row.source_type}: ${row.count} docs, ${chunks?.count || 0} chunks`);
  });

  const totalRemainingDocs = remainingDocs.reduce((sum, row: any) => sum + row.count, 0);
  const totalRemainingChunks = remainingChunks.reduce((sum, row: any) => sum + row.count, 0);

  console.log(`\n   TOTAL REMAINING: ${totalRemainingDocs} docs, ${totalRemainingChunks} chunks`);

  db2.close();

  // Verify Pinecone
  const stats = await index.describeIndexStats();
  console.log(`\n📊 Pinecone vectors: ${stats.totalRecordCount}`);

  console.log('\n' + '='.repeat(60));
  console.log('✅ Cleanup Complete!\n');
  console.log(`   Deleted ${totalDocs} documents and ${totalChunks} chunks`);
  console.log(`   Remaining: ${totalRemainingDocs} documents, ${totalRemainingChunks} chunks`);
  console.log('=' .repeat(60));
}

main().catch((error) => {
  console.error('\n❌ Cleanup failed:', error);
  process.exit(1);
});
