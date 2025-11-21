/**
 * Full-text search endpoint (Phase 1)
 * POST /api/search
 *
 * Uses SQLite FTS5 for text search before vector search is implemented
 */

import { jsonResponse, errorResponse, getClientIP, structuredLog, generateUUID, Timer } from '@/lib/utils';
import { getCloudflareEnv } from '@/lib/env';
import { getDatabase, queryAll, execute } from '@/lib/db';
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit';
import { SearchRequestSchema, type SearchResponse, type SearchResult } from '@/lib/types';
import { ZodError } from 'zod';

export const runtime = 'edge';

export async function POST(request: Request) {
  const timer = new Timer();
  const requestId = generateUUID();

  try {
    const env = getCloudflareEnv();
    const db = getDatabase(env);

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = await checkRateLimit(env.KV, clientIP);

    if (!rateLimit.allowed) {
      structuredLog('warn', 'Rate limit exceeded', {
        request_id: requestId,
        client_ip: clientIP,
      });

      return errorResponse(
        'Rate limit exceeded. Please try again later.',
        429,
        'RATE_LIMIT_EXCEEDED',
        { reset_at: rateLimit.resetAt.toISOString() }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = SearchRequestSchema.parse(body);
    const { query, limit } = validatedData;

    structuredLog('info', 'Search request received', {
      request_id: requestId,
      query,
      limit,
    });

    // Perform FTS5 search
    const sql = `
      SELECT
        c.id as chunk_id,
        c.content,
        c.section,
        d.uri,
        d.title,
        chunks_fts.rank as score
      FROM chunks_fts
      INNER JOIN chunks c ON chunks_fts.rowid = c.rowid
      INNER JOIN documents d ON c.document_id = d.id
      WHERE chunks_fts MATCH ?
      ORDER BY chunks_fts.rank
      LIMIT ?
    `;

    const results = await queryAll<{
      chunk_id: string;
      content: string;
      section: string | null;
      uri: string;
      title: string | null;
      score: number;
    }>(db, sql, [query, limit]);

    // Transform results
    const searchResults: SearchResult[] = results.map((row) => ({
      chunk_id: row.chunk_id,
      content: row.content,
      document: {
        uri: row.uri,
        title: row.title,
        section: row.section,
      },
      score: Math.abs(row.score), // FTS5 rank is negative, normalize to positive
    }));

    // Log query to database
    await execute(
      db,
      'INSERT INTO queries (id, query_text, user_ip, created_at) VALUES (?, ?, ?, datetime("now"))',
      [requestId, query, clientIP.substring(0, 10)] // Store truncated IP for privacy
    );

    const response: SearchResponse = {
      results: searchResults,
      total: searchResults.length,
    };

    structuredLog('info', 'Search completed', {
      request_id: requestId,
      result_count: searchResults.length,
      latency_ms: timer.elapsed(),
    });

    return jsonResponse(response, 200, rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt));
  } catch (error) {
    if (error instanceof ZodError) {
      structuredLog('warn', 'Invalid search request', {
        request_id: requestId,
        errors: error.errors,
      });

      return errorResponse(
        'Invalid request format',
        400,
        'VALIDATION_ERROR',
        { errors: error.errors }
      );
    }

    structuredLog('error', 'Search error', {
      request_id: requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return errorResponse(
      'An error occurred while processing your search',
      500,
      'INTERNAL_ERROR'
    );
  }
}
