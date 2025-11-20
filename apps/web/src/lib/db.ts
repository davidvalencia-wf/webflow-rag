/**
 * Database client for Cloudflare D1 (SQLite)
 */

import type { D1Database, D1Result, KVNamespace, R2Bucket } from '@cloudflare/workers-types';

// ==========================================
// Cloudflare Environment Type
// ==========================================

export type Env = {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  OPENAI_API_KEY: string;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_NAME: string;
};

// ==========================================
// Database Client
// ==========================================

export function getDatabase(env: Env): D1Database {
  if (!env.DB) {
    throw new Error('Database binding (DB) not found in environment');
  }
  return env.DB;
}

export async function testDatabaseConnection(db: D1Database): Promise<boolean> {
  try {
    // Simple query to test connection
    const result = await db.prepare('SELECT 1 as test').first();
    return result?.test === 1;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// ==========================================
// Helper Functions
// ==========================================

/**
 * Execute a query and return all results
 */
export async function queryAll<T = unknown>(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt.bind(...params);
  }
  const result = await stmt.all<T>();
  return result.results || [];
}

/**
 * Execute a query and return the first result
 */
export async function queryFirst<T = unknown>(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<T | null> {
  const stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt.bind(...params);
  }
  return await stmt.first<T>();
}

/**
 * Execute a query that doesn't return results (INSERT, UPDATE, DELETE)
 */
export async function execute(
  db: D1Database,
  sql: string,
  params: unknown[] = []
): Promise<D1Result> {
  const stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt.bind(...params);
  }
  return await stmt.run();
}

/**
 * Execute multiple queries in a batch (transaction)
 */
export async function batch(
  db: D1Database,
  statements: Array<{ sql: string; params?: unknown[] }>
): Promise<D1Result[]> {
  const stmts = statements.map(({ sql, params = [] }) => {
    const stmt = db.prepare(sql);
    if (params.length > 0) {
      return stmt.bind(...params);
    }
    return stmt;
  });
  return await db.batch(stmts);
}
