/**
 * Caching layer using Cloudflare KV
 */

import type { KVNamespace } from '@cloudflare/workers-types';
import { sha256 } from './utils';

// ==========================================
// Cache Keys
// ==========================================

export const CACHE_PREFIX = {
  EMBEDDING: 'embedding:',
  RESPONSE: 'response:',
  QUERY_RESULT: 'query:',
} as const;

export const CACHE_TTL = {
  EMBEDDING: 86400, // 24 hours
  RESPONSE: 3600, // 1 hour
  QUERY_RESULT: 600, // 10 minutes
} as const;

// ==========================================
// Embedding Cache
// ==========================================

export async function getCachedEmbedding(
  kv: KVNamespace,
  text: string
): Promise<number[] | null> {
  const hash = await sha256(text);
  const key = `${CACHE_PREFIX.EMBEDDING}${hash}`;

  const cached = await kv.get(key, 'json');
  if (cached && Array.isArray(cached)) {
    return cached as number[];
  }

  return null;
}

export async function setCachedEmbedding(
  kv: KVNamespace,
  text: string,
  embedding: number[]
): Promise<void> {
  const hash = await sha256(text);
  const key = `${CACHE_PREFIX.EMBEDDING}${hash}`;

  await kv.put(key, JSON.stringify(embedding), {
    expirationTtl: CACHE_TTL.EMBEDDING,
  });
}

// ==========================================
// Response Cache
// ==========================================

export type CachedResponse = {
  answer: string;
  sources: Array<{
    uri: string;
    title: string;
    section?: string;
  }>;
  model: string;
  cached_at: string;
};

export async function getCachedResponse(
  kv: KVNamespace,
  queryText: string,
  topK: number
): Promise<CachedResponse | null> {
  const hash = await sha256(`${queryText}:${topK}`);
  const key = `${CACHE_PREFIX.RESPONSE}${hash}`;

  const cached = await kv.get(key, 'json');
  if (cached) {
    return cached as CachedResponse;
  }

  return null;
}

export async function setCachedResponse(
  kv: KVNamespace,
  queryText: string,
  topK: number,
  response: Omit<CachedResponse, 'cached_at'>
): Promise<void> {
  const hash = await sha256(`${queryText}:${topK}`);
  const key = `${CACHE_PREFIX.RESPONSE}${hash}`;

  const cachedResponse: CachedResponse = {
    ...response,
    cached_at: new Date().toISOString(),
  };

  await kv.put(key, JSON.stringify(cachedResponse), {
    expirationTtl: CACHE_TTL.RESPONSE,
  });
}

// ==========================================
// Query Result Cache (for search endpoint)
// ==========================================

export async function getCachedQueryResult(
  kv: KVNamespace,
  queryText: string
): Promise<unknown | null> {
  const hash = await sha256(queryText);
  const key = `${CACHE_PREFIX.QUERY_RESULT}${hash}`;

  return await kv.get(key, 'json');
}

export async function setCachedQueryResult(
  kv: KVNamespace,
  queryText: string,
  result: unknown
): Promise<void> {
  const hash = await sha256(queryText);
  const key = `${CACHE_PREFIX.QUERY_RESULT}${hash}`;

  await kv.put(key, JSON.stringify(result), {
    expirationTtl: CACHE_TTL.QUERY_RESULT,
  });
}

// ==========================================
// Cache Utilities
// ==========================================

export async function invalidateCache(
  kv: KVNamespace,
  prefix: string
): Promise<void> {
  const list = await kv.list({ prefix });

  for (const key of list.keys) {
    await kv.delete(key.name);
  }
}

export async function getCacheStats(kv: KVNamespace) {
  const embeddingKeys = await kv.list({ prefix: CACHE_PREFIX.EMBEDDING, limit: 1000 });
  const responseKeys = await kv.list({ prefix: CACHE_PREFIX.RESPONSE, limit: 1000 });
  const queryKeys = await kv.list({ prefix: CACHE_PREFIX.QUERY_RESULT, limit: 1000 });

  return {
    embeddings: embeddingKeys.keys.length,
    responses: responseKeys.keys.length,
    queries: queryKeys.keys.length,
    total: embeddingKeys.keys.length + responseKeys.keys.length + queryKeys.keys.length,
  };
}
