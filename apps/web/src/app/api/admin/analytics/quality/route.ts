/**
 * Admin API: Usage Analytics - Quality
 * Provides quality metrics based on confidence scores and feedback
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll, queryFirst } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import { average, toSQLDate, getDateRange, categorizeFeedback } from '@/lib/analytics';
import { getMockQualityMetrics } from '@/lib/dev-data';
import type { UsageQualityResponse } from '@/lib/types';

export const runtime = 'edge';




export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock quality metrics data');
      return Response.json(getMockQualityMetrics());
    }

    const db = getDatabase(env);

    // Get time range (last 30 days)
    const { start: start30d } = getDateRange('30d');
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Average Confidence Score
    // ==========================================
    const confidenceScores = await queryAll<{ confidence_score: number }>(
      db,
      `
      SELECT confidence_score
      FROM response_metadata
      WHERE created_at >= ?
        AND confidence_score IS NOT NULL
      `,
      [sql30d]
    );

    const avgConfidenceScore = average(confidenceScores.map(c => c.confidence_score));

    // ==========================================
    // Thumbs Up/Down Ratio
    // ==========================================
    const thumbsUp = await queryFirst<{ count: number }>(
      db,
      `
      SELECT COUNT(*) as count
      FROM feedback
      WHERE created_at >= ?
        AND helpful = 1
      `,
      [sql30d]
    );

    const thumbsDown = await queryFirst<{ count: number }>(
      db,
      `
      SELECT COUNT(*) as count
      FROM feedback
      WHERE created_at >= ?
        AND helpful = 0
      `,
      [sql30d]
    );

    const upCount = thumbsUp?.count || 0;
    const downCount = thumbsDown?.count || 0;
    const totalFeedback = upCount + downCount;

    const thumbsRatio = {
      up: upCount,
      down: downCount,
      ratio: totalFeedback > 0 ? upCount / totalFeedback : 0,
    };

    // ==========================================
    // Regeneration Rate
    // ==========================================
    const totalResponses = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM responses WHERE created_at >= ?`,
      [sql30d]
    );

    const regenerations = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM regenerations WHERE created_at >= ?`,
      [sql30d]
    );

    const regenerationRate =
      (totalResponses?.count || 0) > 0
        ? ((regenerations?.count || 0) / (totalResponses?.count || 1)) * 100
        : 0;

    // ==========================================
    // Feedback Submission Rate
    // ==========================================
    const feedbackCount = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM feedback WHERE created_at >= ?`,
      [sql30d]
    );

    const feedbackSubmissionRate =
      (totalResponses?.count || 0) > 0
        ? ((feedbackCount?.count || 0) / (totalResponses?.count || 1)) * 100
        : 0;

    // ==========================================
    // Top "Not Helpful" Reasons
    // ==========================================
    const negativeFeedback = await queryAll<{ issue_report: string }>(
      db,
      `
      SELECT issue_report
      FROM feedback
      WHERE created_at >= ?
        AND helpful = 0
        AND issue_report IS NOT NULL
        AND issue_report != ''
      `,
      [sql30d]
    );

    // Categorize feedback
    const categories = new Map<string, number>();
    negativeFeedback.forEach(f => {
      const category = categorizeFeedback(f.issue_report);
      categories.set(category, (categories.get(category) || 0) + 1);
    });

    const totalNegative = negativeFeedback.length;
    const topNotHelpfulReasons = Array.from(categories.entries())
      .map(([reason, count]) => ({
        reason,
        count,
        percentage: totalNegative > 0 ? (count / totalNegative) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsageQualityResponse = {
      avgConfidenceScore: Math.round(avgConfidenceScore * 100) / 100,
      thumbsRatio: {
        up: thumbsRatio.up,
        down: thumbsRatio.down,
        ratio: Math.round(thumbsRatio.ratio * 100) / 100,
      },
      regenerationRate: Math.round(regenerationRate * 10) / 10,
      feedbackSubmissionRate: Math.round(feedbackSubmissionRate * 10) / 10,
      topNotHelpfulReasons,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Quality analytics error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch quality analytics',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
