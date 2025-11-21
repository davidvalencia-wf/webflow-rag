/**
 * Admin API: Usage Analytics - Trends
 * Provides trend analysis and temporal patterns
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import {
  toSQLDate,
  getDateRange,
  extractKeywords,
  calculateGrowthRate,
  getHourAndDay,
} from '@/lib/analytics';
import { getMockTrendsAnalytics } from '@/lib/dev-data';
import type { UsageTrendsResponse } from '@/lib/types';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock trends analytics data');
      return Response.json(getMockTrendsAnalytics());
    }

    const db = getDatabase(env);

    // Get time ranges
    const { start: start7d } = getDateRange('7d');
    const { start: start30d } = getDateRange('30d');
    const sql7d = toSQLDate(start7d);
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Queries Over Time (daily for last 30 days)
    // ==========================================
    const queriesByDay = await queryAll<{ date: string; count: number }>(
      db,
      `
      SELECT
        DATE(created_at) as date,
        COUNT(*) as count
      FROM queries
      WHERE created_at >= ?
      GROUP BY DATE(created_at)
      ORDER BY date ASC
      `,
      [sql30d]
    );

    const queriesOverTime = queriesByDay.map(q => ({
      timestamp: q.date,
      count: q.count,
    }));

    // ==========================================
    // Topic Trends (7d vs 30d)
    // ==========================================
    const queries7d = await queryAll<{ query_text: string }>(
      db,
      `SELECT query_text FROM queries WHERE created_at >= ?`,
      [sql7d]
    );

    const queries30d = await queryAll<{ query_text: string }>(
      db,
      `SELECT query_text FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    // Extract keywords and group by topic
    const topics7d = new Map<string, number>();
    const topics30d = new Map<string, number>();

    queries7d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 2);
      const topic = keywords[0] || 'general';
      topics7d.set(topic, (topics7d.get(topic) || 0) + 1);
    });

    queries30d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 2);
      const topic = keywords[0] || 'general';
      topics30d.set(topic, (topics30d.get(topic) || 0) + 1);
    });

    // Calculate trends
    const topicTrends = Array.from(topics30d.entries())
      .map(([topic, count30d]) => {
        const count7d = topics7d.get(topic) || 0;
        const avgCount7d = count7d;
        const avgCount30d = count30d / 4.3; // Normalize to weekly average

        return {
          topic,
          trend_7d: calculateGrowthRate(avgCount7d, avgCount30d),
          trend_30d: 0, // Would need 60d data for this
          current_volume: count7d,
        };
      })
      .sort((a, b) => b.current_volume - a.current_volume)
      .slice(0, 10);

    // ==========================================
    // Query Volume Heatmap (hour x day of week)
    // ==========================================
    const allQueries = await queryAll<{ created_at: string }>(
      db,
      `SELECT created_at FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    // Initialize heatmap (24 hours x 7 days)
    const heatmap = new Map<string, number>();
    for (let hour = 0; hour < 24; hour++) {
      for (let day = 0; day < 7; day++) {
        heatmap.set(`${hour}-${day}`, 0);
      }
    }

    // Populate heatmap
    allQueries.forEach(q => {
      const { hour, day } = getHourAndDay(q.created_at);
      const key = `${hour}-${day}`;
      heatmap.set(key, (heatmap.get(key) || 0) + 1);
    });

    const queryVolumeHeatmap = Array.from(heatmap.entries()).map(([key, count]) => {
      const [hour, day] = key.split('-').map(Number);
      return { hour, day, count };
    });

    // ==========================================
    // Geographic Distribution (from CF headers if available)
    // ==========================================
    // For MVP, this would require storing CF-IPCountry header
    // Since we don't have it in the current schema, return empty array
    const geographicDistribution: Array<{
      country: string;
      count: number;
      percentage: number;
    }> = [];

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsageTrendsResponse = {
      queriesOverTime,
      topicTrends,
      queryVolumeHeatmap,
      geographicDistribution,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Trends analytics error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch trends analytics',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
