/**
 * Admin API: Usage Analytics - Performance
 * Provides performance metrics and latency statistics
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import { calculatePercentiles, toSQLDate, getDateRange } from '@/lib/analytics';
import { getMockPerformanceMetrics } from '@/lib/dev-data';
import type { UsagePerformanceResponse } from '@/lib/types';

export const runtime = 'edge';




export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock performance metrics data');
      return Response.json(getMockPerformanceMetrics());
    }

    const db = getDatabase(env);

    // Get time range (last 30 days)
    const { start: start30d } = getDateRange('30d');
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Response Time Percentiles
    // ==========================================
    const latencyData = await queryAll<{ latency_ms: number }>(
      db,
      `
      SELECT latency_ms
      FROM responses
      WHERE created_at >= ?
        AND latency_ms IS NOT NULL
      ORDER BY latency_ms ASC
      `,
      [sql30d]
    );

    const latencies = latencyData.map(r => r.latency_ms);
    const percentiles = calculatePercentiles(latencies);

    // ==========================================
    // Error Rate (estimate - would need error logging)
    // ==========================================
    // For MVP, calculate based on queries with no response
    const totalQueries = await queryAll<{ id: string }>(
      db,
      `SELECT id FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    const queriesWithResponse = await queryAll<{ query_id: string }>(
      db,
      `
      SELECT DISTINCT query_id
      FROM responses
      WHERE created_at >= ?
      `,
      [sql30d]
    );

    const errorRate =
      totalQueries.length > 0
        ? ((totalQueries.length - queriesWithResponse.length) / totalQueries.length) * 100
        : 0;

    // ==========================================
    // Cache Hit Rate (estimate from duplicate queries)
    // ==========================================
    // Queries with same query_text suggest cache usage
    const duplicateQueries = await queryAll<{ query_text: string; count: number }>(
      db,
      `
      SELECT query_text, COUNT(*) as count
      FROM queries
      WHERE created_at >= ?
      GROUP BY query_text
      HAVING COUNT(*) > 1
      `,
      [sql30d]
    );

    const totalDuplicates = duplicateQueries.reduce((sum, q) => sum + q.count, 0);
    const cacheHitRate =
      totalQueries.length > 0 ? (totalDuplicates / totalQueries.length) * 100 : 0;

    // ==========================================
    // Streaming Failure Rate
    // ==========================================
    // Estimate based on responses with very short answers (< 50 chars)
    const shortResponses = await queryAll<{ id: string }>(
      db,
      `
      SELECT id
      FROM responses
      WHERE created_at >= ?
        AND LENGTH(answer) < 50
      `,
      [sql30d]
    );

    const streamingFailureRate =
      queriesWithResponse.length > 0
        ? (shortResponses.length / queriesWithResponse.length) * 100
        : 0;

    // ==========================================
    // Latency Breakdown (estimate for MVP)
    // ==========================================
    // Without detailed logging, we estimate:
    // - Pinecone: ~20% of total latency
    // - OpenAI: ~70% of total latency
    // - Other: ~10%
    const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;

    const latencyBreakdown = {
      pinecone_avg_ms: Math.round(avgLatency * 0.2),
      openai_avg_ms: Math.round(avgLatency * 0.7),
      total_avg_ms: Math.round(avgLatency),
    };

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsagePerformanceResponse = {
      responseTime: {
        p50: Math.round(percentiles.p50),
        p95: Math.round(percentiles.p95),
        p99: Math.round(percentiles.p99),
      },
      errorRate: Math.round(errorRate * 10) / 10, // 1 decimal place
      cacheHitRate: Math.round(cacheHitRate * 10) / 10,
      streamingFailureRate: Math.round(streamingFailureRate * 10) / 10,
      latencyBreakdown,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Performance analytics error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch performance analytics',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
