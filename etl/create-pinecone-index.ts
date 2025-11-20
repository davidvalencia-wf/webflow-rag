/**
 * Create Pinecone Index
 * One-time setup script
 */

import { Pinecone } from '@pinecone-database/pinecone';

async function main() {
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    console.error('Error: PINECONE_API_KEY required');
    process.exit(1);
  }

  console.log('🔧 Creating Pinecone index...\n');

  const pinecone = new Pinecone({ apiKey });

  try {
    await pinecone.createIndex({
      name: 'webflow-docs',
      dimension: 1536,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });

    console.log('✅ Index created successfully!');
    console.log('   Name: webflow-docs');
    console.log('   Dimension: 1536');
    console.log('   Metric: cosine');
    console.log('   Cloud: AWS us-east-1\n');
    console.log('⏳ Note: Index may take 1-2 minutes to initialize before you can upload vectors.');
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('✅ Index "webflow-docs" already exists!');
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

main();
