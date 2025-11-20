/**
 * Admin API: Content Gap Dashboard
 * Identifies missing documentation and low-quality answers
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import {
  extractKeywords,
  clusterByTopic,
  calculateGrowthRate,
  toSQLDate,
  getDateRange,
} from '@/lib/analytics';
import { getMockContentGaps } from '@/lib/dev-data';
import type {
  ContentGapResponse,
  UnansweredQuestion,
  ZeroCitationQuery,
  RegeneratedAnswer,
  TopicCluster,
  TrendingGap,
  SuggestedAction,
} from '@shared/index';

export const runtime = 'edge';

interface QueryWithMetadata {
  query_text: string;
  confidence_score: number | null;
  created_at: string;
  helpful: number | null;
  sources: string | null;
}

interface RegenerationData {
  original_query: string;
  regeneration_count: number;
  helpful_count: number;
  unhelpful_count: number;
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    // Get Cloudflare environment
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock content gaps data');
      return Response.json(getMockContentGaps());
    }

    const db = getDatabase(env);

    // Get time ranges
    const { start: start7d } = getDateRange('7d');
    const { start: start30d } = getDateRange('30d');
    const sql7d = toSQLDate(start7d);
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // 1. Unanswered Questions (Low Confidence)
    // ==========================================
    const unansweredQueriesRaw = await queryAll<QueryWithMetadata>(
      db,
      `
      SELECT DISTINCT
        q.query_text,
        rm.confidence_score,
        q.created_at,
        f.helpful
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      LEFT JOIN response_metadata rm ON rm.response_id = r.id
      LEFT JOIN feedback f ON f.response_id = r.id
      WHERE rm.confidence_score < 0.3
        OR rm.confidence_score IS NULL
      ORDER BY q.created_at DESC
      LIMIT 50
      `
    );

    // Count regenerations per query
    const regenerationCounts = await queryAll<{ query_text: string; count: number }>(
      db,
      `
      SELECT q.query_text, COUNT(*) as count
      FROM queries q
      GROUP BY q.query_text
      HAVING COUNT(*) > 1
      `
    );

    const regenMap = new Map(regenerationCounts.map(r => [r.query_text, r.count]));

    const unansweredQuestions: UnansweredQuestion[] = unansweredQueriesRaw.map(q => ({
      query: q.query_text,
      confidence: q.confidence_score || 0,
      created_at: q.created_at,
      regeneration_count: regenMap.get(q.query_text) || 1,
      thumbs_down: q.helpful === 0,
    }));

    // ==========================================
    // 2. Zero Citation Queries
    // ==========================================
    const zeroCitationQueriesRaw = await queryAll<{
      query_text: string;
      created_at: string;
      sources: string | null;
    }>(
      db,
      `
      SELECT q.query_text, q.created_at, r.sources
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      WHERE r.sources IS NULL
        OR r.sources = '[]'
        OR r.sources = ''
      ORDER BY q.created_at DESC
      LIMIT 30
      `
    );

    const zeroCitationQueries: ZeroCitationQuery[] = zeroCitationQueriesRaw.map(q => ({
      query: q.query_text,
      created_at: q.created_at,
      attempted_sources: 0, // No sources found
    }));

    // ==========================================
    // 3. Most Regenerated Answers
    // ==========================================
    const regeneratedAnswersRaw = await queryAll<RegenerationData>(
      db,
      `
      SELECT
        q.query_text as original_query,
        COUNT(DISTINCT q.id) as regeneration_count,
        SUM(CASE WHEN f.helpful = 1 THEN 1 ELSE 0 END) as helpful_count,
        SUM(CASE WHEN f.helpful = 0 THEN 1 ELSE 0 END) as unhelpful_count
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      LEFT JOIN feedback f ON f.response_id = r.id
      GROUP BY q.query_text
      HAVING COUNT(DISTINCT q.id) > 2
      ORDER BY regeneration_count DESC
      LIMIT 20
      `
    );

    // Calculate average confidence for regenerated queries
    const confidenceByQuery = await queryAll<{ query_text: string; avg_confidence: number }>(
      db,
      `
      SELECT q.query_text, AVG(rm.confidence_score) as avg_confidence
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      LEFT JOIN response_metadata rm ON rm.response_id = r.id
      WHERE rm.confidence_score IS NOT NULL
      GROUP BY q.query_text
      `
    );

    const confMap = new Map(confidenceByQuery.map(c => [c.query_text, c.avg_confidence]));

    const mostRegeneratedAnswers: RegeneratedAnswer[] = regeneratedAnswersRaw.map(r => ({
      original_query: r.original_query,
      regeneration_count: r.regeneration_count,
      avg_confidence: confMap.get(r.original_query) || 0,
      thumbs_down_ratio:
        r.helpful_count + r.unhelpful_count > 0
          ? r.unhelpful_count / (r.helpful_count + r.unhelpful_count)
          : 0,
    }));

    // ==========================================
    // 4. Topic Clusters
    // ==========================================
    const allQueries = await queryAll<{ query_text: string; confidence_score: number | null }>(
      db,
      `
      SELECT DISTINCT q.query_text, rm.confidence_score
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      LEFT JOIN response_metadata rm ON rm.response_id = r.id
      WHERE q.created_at >= ?
      LIMIT 500
      `,
      [sql30d]
    );

    const queryTexts = allQueries.map(q => q.query_text);
    const clusters = clusterByTopic(queryTexts);

    const topicClusters: TopicCluster[] = Array.from(clusters.entries())
      .map(([topic, queries]) => {
        const avgConf =
          allQueries
            .filter(q => queries.includes(q.query_text))
            .reduce((sum, q) => sum + (q.confidence_score || 0), 0) / queries.length;

        return {
          topic,
          query_count: queries.length,
          avg_confidence: avgConf,
          keywords: extractKeywords(queries.join(' '), 5),
        };
      })
      .sort((a, b) => b.query_count - a.query_count)
      .slice(0, 10);

    // ==========================================
    // 5. Trending Gaps (7d vs 30d)
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

    // Group by common patterns (simple keyword matching)
    const patterns7d = new Map<string, number>();
    const patterns30d = new Map<string, number>();
    const firstSeen = new Map<string, string>();

    queries7d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 2);
      const pattern = keywords.join(' ') || 'general';
      patterns7d.set(pattern, (patterns7d.get(pattern) || 0) + 1);
    });

    queries30d.forEach(q => {
      const keywords = extractKeywords(q.query_text, 2);
      const pattern = keywords.join(' ') || 'general';
      patterns30d.set(pattern, (patterns30d.get(pattern) || 0) + 1);

      if (!firstSeen.has(pattern)) {
        firstSeen.set(pattern, q.created_at);
      }
    });

    const trendingGaps: TrendingGap[] = Array.from(patterns7d.entries())
      .map(([pattern, count7d]) => {
        const count30d = patterns30d.get(pattern) || 0;
        const avgCount7d = count7d;
        const avgCount30d = count30d / 4.3; // Normalize to weekly average

        return {
          query_pattern: pattern,
          first_seen: firstSeen.get(pattern) || new Date().toISOString(),
          occurrence_count: count7d,
          growth_rate: calculateGrowthRate(avgCount7d, avgCount30d),
        };
      })
      .filter(t => t.growth_rate > 20) // Only show growing trends
      .sort((a, b) => b.growth_rate - a.growth_rate)
      .slice(0, 10);

    // ==========================================
    // 6. Suggested Actions
    // ==========================================
    const suggestedActions: SuggestedAction[] = [];

    // Action 1: Address zero-citation queries
    if (zeroCitationQueries.length > 5) {
      suggestedActions.push({
        priority: 'high',
        action: 'Add documentation coverage for queries with no citations',
        affected_queries: zeroCitationQueries.length,
        impact: 'Improve answer quality and user satisfaction',
      });
    }

    // Action 2: Address most regenerated queries
    if (mostRegeneratedAnswers.length > 3) {
      const topRegenerated = mostRegeneratedAnswers[0];
      suggestedActions.push({
        priority: 'high',
        action: `Improve documentation for "${topRegenerated.original_query}"`,
        affected_queries: topRegenerated.regeneration_count,
        impact: 'Reduce regeneration rate and improve answer confidence',
      });
    }

    // Action 3: Address trending gaps
    if (trendingGaps.length > 0) {
      const topTrending = trendingGaps[0];
      suggestedActions.push({
        priority: 'medium',
        action: `Create documentation for emerging topic: "${topTrending.query_pattern}"`,
        affected_queries: topTrending.occurrence_count,
        impact: `Growing ${topTrending.growth_rate.toFixed(1)}% week over week`,
      });
    }

    // Action 4: Low confidence topics
    const lowConfTopics = topicClusters.filter(t => t.avg_confidence < 0.5);
    if (lowConfTopics.length > 0) {
      suggestedActions.push({
        priority: 'medium',
        action: `Improve documentation quality for topic: "${lowConfTopics[0].topic}"`,
        affected_queries: lowConfTopics[0].query_count,
        impact: 'Increase average confidence score',
      });
    }

    // ==========================================
    // Build Response
    // ==========================================
    const response: ContentGapResponse = {
      unansweredQuestions: unansweredQuestions.slice(0, 20),
      zeroCitationQueries: zeroCitationQueries.slice(0, 15),
      mostRegeneratedAnswers: mostRegeneratedAnswers.slice(0, 10),
      topicClusters,
      trendingGaps,
      suggestedActions,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Content gap analysis error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to analyze content gaps',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
