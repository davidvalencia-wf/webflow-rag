#!/usr/bin/env node
/**
 * Clear all vectors from Pinecone index
 */

import { Pinecone } from '@pinecone-database/pinecone';

const PINECONE_API_KEY = 'pcsk_38N2Jd_MtLe3vXs5geumRN2de8hirJfCGGnA93AQ6iBfmCRZS8v3qDwYAopg6tE5Pe5vRX';
const PINECONE_INDEX_NAME = 'webflow-docs';

async function main() {
  console.log('🗑️  Clearing Pinecone Index\n');

  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = pinecone.index(PINECONE_INDEX_NAME);

  // Get current stats
  const statsBefore = await index.describeIndexStats();
  console.log(`📊 Current vectors: ${statsBefore.totalRecordCount}`);

  // Delete all vectors
  console.log('\n🔄 Deleting all vectors...');
  await index.deleteAll();

  // Wait a bit for deletion to propagate
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Get stats after
  const statsAfter = await index.describeIndexStats();
  console.log(`\n✅ Vectors after deletion: ${statsAfter.totalRecordCount}`);
  console.log('🎉 Pinecone index cleared!');
}

main().catch(console.error);
