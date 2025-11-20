/**
 * Edge-compatible Pinecone client using REST API
 * Works on Cloudflare Workers/Webflow Cloud
 */

import { getEnvVar } from './env';

// ==========================================
// Types
// ==========================================

export type VectorMetadata = {
  id: string;
  document_id: string;
  content: string;
  uri: string;
  title: string;
  section?: string;
  source_type: string;
  token_count: number;
  created_at: string;
};

export type VectorMatch = {
  id: string;
  score: number;
  metadata: VectorMetadata;
};

export type VectorUpsertRecord = {
  id: string;
  values: number[];
  metadata: VectorMetadata;
};

// ==========================================
// Client Configuration
// ==========================================

function getPineconeConfig() {
  const apiKey = getEnvVar('PINECONE_API_KEY');
  const indexName = getEnvVar('PINECONE_INDEX_NAME', 'webflow-docs');

  // Extract environment and project from API key or use default host pattern
  // Pinecone host format: {index-name}-{project-id}.svc.{environment}.pinecone.io
  // For standard usage, we can get this from the Pinecone dashboard or API

  // This is a simplified approach - in production you'd get this from Pinecone API
  // or environment variable
  const host = getEnvVar('PINECONE_HOST', `${indexName}.svc.gcp-starter.pinecone.io`);

  return { apiKey, indexName, host };
}

async function pineconeRequest(endpoint: string, body: unknown) {
  const { apiKey, host } = getPineconeConfig();

  const response = await fetch(`https://${host}${endpoint}`, {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinecone API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// ==========================================
// Vector Operations
// ==========================================

/**
 * Query vectors for similar matches
 */
export async function queryVectors(
  queryVector: number[],
  topK: number = 5,
  filter?: Record<string, unknown>
): Promise<VectorMatch[]> {
  const result = await pineconeRequest('/query', {
    vector: queryVector,
    topK,
    includeMetadata: true,
    ...(filter && { filter }),
  });

  return result.matches.map((match: { id: string; score?: number; metadata: unknown }) => ({
    id: match.id,
    score: match.score || 0,
    metadata: match.metadata as VectorMetadata,
  }));
}

/**
 * Upsert vectors to Pinecone index
 */
export async function upsertVectors(
  vectors: VectorUpsertRecord[]
): Promise<void> {
  // Pinecone recommends batches of 100-200 vectors
  const batchSize = 100;

  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);
    await pineconeRequest('/vectors/upsert', {
      vectors: batch,
    });
  }
}

/**
 * Get index stats
 */
export async function getIndexStats() {
  return await pineconeRequest('/describe_index_stats', {});
}

/**
 * Delete vectors by IDs
 */
export async function deleteVectors(ids: string[]): Promise<void> {
  await pineconeRequest('/vectors/delete', {
    ids,
  });
}

/**
 * Fetch vectors by IDs
 */
export async function fetchVectors(ids: string[]) {
  return await pineconeRequest('/vectors/fetch', {
    ids,
  });
}
