#!/usr/bin/env node
/**
 * Pinecone Validation Script
 * Checks vector count and sample metadata
 */

import { Pinecone } from '@pinecone-database/pinecone';

const PINECONE_API_KEY = 'pcsk_38N2Jd_MtLe3vXs5geumRN2de8hirJfCGGnA93AQ6iBfmCRZS8v3qDwYAopg6tE5Pe5vRX';
const PINECONE_INDEX_NAME = 'webflow-docs';

async function main() {
  console.log('🔍 Validating Pinecone Index\n');

  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = pinecone.index(PINECONE_INDEX_NAME);

  // Get index stats
  console.log('📊 Fetching index statistics...');
  const stats = await index.describeIndexStats();

  console.log('\n✅ Index Stats:');
  console.log(`   Total vectors: ${stats.totalRecordCount}`);
  console.log(`   Dimension: ${stats.dimension}`);
  console.log(`   Index fullness: ${((stats.totalRecordCount || 0) / 100000 * 100).toFixed(2)}%`);

  // Sample a few vectors to check metadata
  console.log('\n🔍 Sampling vectors for quality check...');

  // Query with a dummy vector to get results
  const dummyVector = new Array(1536).fill(0);
  const queryResult = await index.query({
    vector: dummyVector,
    topK: 5,
    includeMetadata: true,
  });

  console.log('\n📋 Sample Vectors:');
  queryResult.matches?.slice(0, 3).forEach((match, idx) => {
    console.log(`\n${idx + 1}. Vector ID: ${match.id}`);
    console.log(`   Source: ${match.metadata?.source_type}`);
    console.log(`   Title: ${match.metadata?.title}`);
    console.log(`   Content preview: ${(match.metadata?.content as string)?.substring(0, 80)}...`);
  });

  console.log('\n✅ Validation complete!');
}

main().catch(console.error);
