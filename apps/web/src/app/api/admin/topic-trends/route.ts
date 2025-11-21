/**
 * Admin API: Topic Trend Analysis
 * Provides advanced topic analysis and emerging trends
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import {
  toSQLDate,
  getDateRange,
  extractKeywords,
  calculateGrowthRate,
  getTrendStatus,
  classifyQueryIntent,
} from '@/lib/analytics';
import { getMockTopicTrends } from '@/lib/dev-data';
import type { TopicTrendAnalysisResponse } from '@/lib/types';

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock topic trends data');
      return Response.json(getMockTopicTrends());
    }

    const db = getDatabase(env);

    // Get time ranges
    const { start: start7d } = getDateRange('7d');
    const { start: start30d } = getDateRange('30d');
    const sql7d = toSQLDate(start7d);
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Get All Queries
    // ==========================================
    const queries7d = await queryAll<{ query_text: string; created_at: string }>(
      db,
      `SELECT query_text, created_at FROM queries WHERE created_at >= ?`,
      [sql7d]
    );

    const queries30d = await queryAll<{ query_text: string; created_at: string }>(
      db,
      `SELECT query_text, created_at FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    // ==========================================
    // 1. Trending Topics
    // ==========================================
    const topics7d = new Map<string, string[]>();
    const topics30d = new Map<string, string[]>();

    queries7d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 3);
      const topic = keywords[0] || 'general';
      if (!topics7d.has(topic)) topics7d.set(topic, []);
      topics7d.get(topic)!.push(q.query_text);
    });

    queries30d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 3);
      const topic = keywords[0] || 'general';
      if (!topics30d.has(topic)) topics30d.set(topic, []);
      topics30d.get(topic)!.push(q.query_text);
    });

    const trendingTopics = Array.from(topics30d.entries())
      .map(([topic, queries]) => {
        const count7d = topics7d.get(topic)?.length || 0;
        const count30d = queries.length;
        const avgCount7d = count7d;
        const avgCount30d = count30d / 4.3; // Normalize to weekly

        const growthRate = calculateGrowthRate(avgCount7d, avgCount30d);

        return {
          topic,
          change_7d_vs_30d: growthRate,
          current_volume: count7d,
          example_queries: queries.slice(0, 3),
          status: getTrendStatus(growthRate),
        };
      })
      .sort((a, b) => Math.abs(b.change_7d_vs_30d) - Math.abs(a.change_7d_vs_30d))
      .slice(0, 15);

    // ==========================================
    // 2. Seasonal Patterns (simplified)
    // ==========================================
    // For MVP, group by month and find peaks
    const queryByMonth = await queryAll<{
      month: string;
      topic: string;
      count: number;
    }>(
      db,
      `
      SELECT
        strftime('%Y-%m', created_at) as month,
        query_text as topic,
        COUNT(*) as count
      FROM queries
      GROUP BY month, query_text
      ORDER BY count DESC
      `
    );

    // Find peak months for top topics
    const monthlyData = new Map<string, Map<string, number>>();
    queryByMonth.forEach(q => {
      const keywords = extractKeywords(q.topic, 1);
      const topic = keywords[0] || 'general';

      if (!monthlyData.has(topic)) {
        monthlyData.set(topic, new Map());
      }
      const months = monthlyData.get(topic)!;
      months.set(q.month, (months.get(q.month) || 0) + q.count);
    });

    const seasonalPatterns = Array.from(monthlyData.entries())
      .map(([topic, months]) => {
        const sortedMonths = Array.from(months.entries()).sort((a, b) => b[1] - a[1]);
        const peak = sortedMonths[0];

        return {
          topic,
          peak_month: peak ? peak[0] : 'N/A',
          peak_volume: peak ? peak[1] : 0,
          pattern_description: 'Highest activity in ' + (peak ? peak[0] : 'unknown'),
        };
      })
      .filter(p => p.peak_volume > 5)
      .sort((a, b) => b.peak_volume - a.peak_volume)
      .slice(0, 10);

    // ==========================================
    // 3. Emerging Topics (new in last 7 days)
    // ==========================================
    const topics7dOnly = new Set(topics7d.keys());
    const topics30dOnly = new Set(topics30d.keys());

    const emergingTopics = Array.from(topics7dOnly)
      .filter(topic => !topics30dOnly.has(topic) || (topics30d.get(topic)?.length || 0) < 3)
      .map(topic => {
        const queries = topics7d.get(topic) || [];
        const firstQuery = queries30d.find(q =>
          extractKeywords(q.query_text, 1).includes(topic)
        );

        return {
          topic,
          first_seen: firstQuery?.created_at || new Date().toISOString(),
          mention_count: queries.length,
          in_docs: false, // Would need to check against chunks table
          suggested_action: queries.length > 5
            ? 'Create documentation'
            : 'Monitor for growth',
        };
      })
      .sort((a, b) => b.mention_count - a.mention_count)
      .slice(0, 10);

    // ==========================================
    // 4. Intent Distribution
    // ==========================================
    const intentCounts = {
      'how-to': 0,
      'troubleshooting': 0,
      'comparison': 0,
      'explanation': 0,
    };

    queries30d.forEach(q => {
      const intent = classifyQueryIntent(q.query_text);
      intentCounts[intent]++;
    });

    // ==========================================
    // 5. Visualizations
    // ==========================================
    // Topic Time Series (daily counts for top 5 topics)
    const topTopics = trendingTopics.slice(0, 5).map(t => t.topic);

    const dailyCounts = await queryAll<{ date: string; query_text: string }>(
      db,
      `
      SELECT DATE(created_at) as date, query_text
      FROM queries
      WHERE created_at >= ?
      `,
      [sql30d]
    );

    // Group by date and topic
    const timeSeriesData = new Map<string, Record<string, number>>();

    dailyCounts.forEach(q => {
      const keywords = extractKeywords(q.query_text, 1);
      const topic = keywords[0] || 'general';

      if (!topTopics.includes(topic)) return;

      if (!timeSeriesData.has(q.date)) {
        const row: Record<string, number> = { date: 0 };
        topTopics.forEach(t => (row[t] = 0));
        timeSeriesData.set(q.date, row);
      }

      const row = timeSeriesData.get(q.date)!;
      row[topic] = (row[topic] || 0) + 1;
    });

    const topicTimeSeries = Array.from(timeSeriesData.entries())
      .map(([date, counts]) => ({
        date,
        ...counts,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Word Cloud (top 50 keywords)
    const allText = queries30d.map(q => q.query_text).join(' ');
    const keywords = extractKeywords(allText, 50);

    const wordCloud = keywords.map((word, index) => ({
      word,
      weight: 50 - index, // Descending weight
    }));

    // ==========================================
    // Build Response
    // ==========================================
    const response: TopicTrendAnalysisResponse = {
      trendingTopics,
      seasonalPatterns,
      emergingTopics,
      intentDistribution: intentCounts,
      visualizations: {
        topicTimeSeries,
        wordCloud,
      },
    };

    return Response.json(response);
  } catch (error) {
    console.error('Topic trend analysis error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to analyze topic trends',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
