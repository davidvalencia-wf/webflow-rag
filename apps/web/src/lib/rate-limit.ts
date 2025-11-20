/**
 * Rate limiting using Cloudflare KV
 */

import type { KVNamespace } from '@cloudflare/workers-types';
import { hashIP } from './utils';

// ==========================================
// Rate Limiting
// ==========================================

export const RATE_LIMIT_CONFIG = {
  maxRequests: 10,  // Maximum requests
  windowSeconds: 60, // Time window in seconds
};

export async function checkRateLimit(
  kv: KVNamespace,
  clientIP: string,
  maxRequests: number = RATE_LIMIT_CONFIG.maxRequests,
  windowSeconds: number = RATE_LIMIT_CONFIG.windowSeconds
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const ipHash = await hashIP(clientIP);
  const key = `ratelimit:${ipHash}`;

  // Get current count
  const countStr = await kv.get(key);
  const count = countStr ? parseInt(countStr, 10) : 0;

  if (count >= maxRequests) {
    // Rate limit exceeded
    const resetAt = new Date(Date.now() + windowSeconds * 1000);

    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  // Increment count
  const newCount = count + 1;
  const resetAt = new Date(Date.now() + windowSeconds * 1000);

  await kv.put(key, newCount.toString(), {
    expirationTtl: windowSeconds,
  });

  return {
    allowed: true,
    remaining: maxRequests - newCount,
    resetAt,
  };
}

export function rateLimitHeaders(
  remaining: number,
  resetAt: Date
): Record<string, string> {
  return {
    'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': resetAt.toISOString(),
  };
}
