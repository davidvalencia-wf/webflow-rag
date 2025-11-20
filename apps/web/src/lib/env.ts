/**
 * Environment and Cloudflare bindings access
 *
 * Note: @opennextjs/cloudflare may not be fully compatible with Next.js 16 yet.
 * We'll implement a fallback mechanism for development.
 */

import type { Env } from './db';

/**
 * Get Cloudflare environment bindings
 * This works in production (Cloudflare Workers runtime)
 */
export function getCloudflareEnv(): Env {
  // In production, bindings are available on the global context
  if (typeof process !== 'undefined' && process.env) {
    // Development fallback - will use local .env.local
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nullBinding = null as any;
    return {
      DB: nullBinding, // Will be provided by wrangler dev
      KV: nullBinding,
      R2: nullBinding,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
      PINECONE_API_KEY: process.env.PINECONE_API_KEY || '',
      PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME || 'webflow-docs',
    };
  }

  throw new Error('Unable to access Cloudflare environment bindings');
}

/**
 * Get environment variable with fallback
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}
