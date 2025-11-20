#!/usr/bin/env node
/**
 * Migrate data from local D1 to remote D1 (production)
 * This script exports documents and chunks from local and imports to remote
 */

import { spawn } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';

// Helper to execute wrangler commands
function execWrangler(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('npx', ['wrangler', ...args], {
      cwd: '/Users/ryan.hodge/Projects/webflow-rag/apps/web',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed: ${stderr}`));
      } else {
        // Wrangler outputs to both stdout and stderr, combine them
        resolve(stdout + stderr);
      }
    });
  });
}

// Parse D1 query output
function parseD1Output(output) {
  try {
    const lines = output.split('\n');
    const jsonLine = lines.find(line => line.trim().startsWith('['));
    if (!jsonLine) {
      console.error('Could not find JSON in output:', output.substring(0, 500));
      return null;
    }
    const parsed = JSON.parse(jsonLine);
    return parsed[0]?.results || [];
  } catch (e) {
    console.error('Failed to parse D1 output:', e);
    console.error('Output was:', output.substring(0, 500));
    return null;
  }
}

async function main() {
  console.log('🚀 Starting data migration from local to production...\n');

  // Step 1: Export documents from local
  console.log('📦 Exporting documents from local database...');
  const docsOutput = await execWrangler([
    'd1', 'execute', 'webflow-rag', '--local',
    '--command', 'SELECT * FROM documents'
  ]);
  const documents = parseD1Output(docsOutput);
  if (!documents) {
    throw new Error('Failed to export documents from local database');
  }
  console.log(`✅ Found ${documents.length} documents\n`);

  // Step 2: Export chunks from local
  console.log('📦 Exporting chunks from local database...');
  const chunksOutput = await execWrangler([
    'd1', 'execute', 'webflow-rag', '--local',
    '--command', 'SELECT * FROM chunks'
  ]);
  const chunks = parseD1Output(chunksOutput);
  if (!chunks) {
    throw new Error('Failed to export chunks from local database');
  }
  console.log(`✅ Found ${chunks.length} chunks\n`);

  // Step 3: Generate INSERT statements for documents
  console.log('🔨 Generating SQL INSERT statements...');
  const documentInserts = documents.map(doc => {
    const values = [
      `'${doc.id}'`,
      `'${doc.uri.replace(/'/g, "''")}'`,
      doc.title ? `'${doc.title.replace(/'/g, "''")}'` : 'NULL',
      doc.source_type ? `'${doc.source_type}'` : 'NULL',
      doc.license ? `'${doc.license.replace(/'/g, "''")}'` : 'NULL',
      `'${doc.created_at}'`,
      `'${doc.updated_at}'`
    ].join(', ');
    return `INSERT INTO documents (id, uri, title, source_type, license, created_at, updated_at) VALUES (${values});`;
  }).join('\n');

  // Step 4: Generate INSERT statements for chunks (in batches)
  const batchSize = 100;
  const chunkBatches = [];

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const inserts = batch.map(chunk => {
      const content = chunk.content.replace(/'/g, "''");
      const section = chunk.section ? `'${chunk.section.replace(/'/g, "''")}'` : 'NULL';
      const values = [
        `'${chunk.id}'`,
        `'${chunk.document_id}'`,
        `'${content}'`,
        `'${chunk.hash}'`,
        chunk.token_count || 'NULL',
        section,
        chunk.chunk_index !== null ? chunk.chunk_index : 'NULL',
        `'${chunk.created_at}'`
      ].join(', ');
      return `INSERT INTO chunks (id, document_id, content, hash, token_count, section, chunk_index, created_at) VALUES (${values});`;
    }).join('\n');
    chunkBatches.push(inserts);
  }

  console.log(`✅ Generated ${chunkBatches.length} batches of chunk inserts\n`);

  // Step 5: Write to temp files
  const docsSqlPath = '/tmp/docs-import.sql';
  writeFileSync(docsSqlPath, documentInserts);
  console.log(`✅ Wrote documents SQL to ${docsSqlPath}\n`);

  // Step 6: Import documents to remote
  console.log('⬆️  Importing documents to production...');
  await execWrangler([
    'd1', 'execute', 'webflow-rag', '--remote',
    '--file', docsSqlPath
  ]);
  console.log('✅ Documents imported successfully\n');

  // Step 7: Import chunks to remote (in batches)
  console.log('⬆️  Importing chunks to production (this may take a while)...');
  for (let i = 0; i < chunkBatches.length; i++) {
    const chunksSqlPath = `/tmp/chunks-import-${i}.sql`;
    writeFileSync(chunksSqlPath, chunkBatches[i]);

    process.stdout.write(`   Batch ${i + 1}/${chunkBatches.length}... `);
    await execWrangler([
      'd1', 'execute', 'webflow-rag', '--remote',
      '--file', chunksSqlPath
    ]);
    unlinkSync(chunksSqlPath);
    console.log('✅');
  }

  // Cleanup
  unlinkSync(docsSqlPath);

  console.log('\n🎉 Migration complete!');
  console.log(`   ${documents.length} documents migrated`);
  console.log(`   ${chunks.length} chunks migrated`);

  // Verify
  console.log('\n🔍 Verifying production database...');
  const verifyDocs = await execWrangler([
    'd1', 'execute', 'webflow-rag', '--remote',
    '--command', 'SELECT COUNT(*) as count FROM documents'
  ]);
  const verifyChunks = await execWrangler([
    'd1', 'execute', 'webflow-rag', '--remote',
    '--command', 'SELECT COUNT(*) as count FROM chunks'
  ]);

  const docsCount = parseD1Output(verifyDocs)?.[0]?.count;
  const chunksCount = parseD1Output(verifyChunks)?.[0]?.count;

  console.log(`✅ Production has ${docsCount} documents and ${chunksCount} chunks\n`);
}

main().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
