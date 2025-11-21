/**
 * Admin API: Feedback Sentiment Analysis
 * Analyzes user feedback and identifies improvement areas
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll, queryFirst } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import {
  toSQLDate,
  getDateRange,
  categorizeFeedback,
  determineSentiment,
} from '@/lib/analytics';
import { getMockSentimentAnalysis } from '@/lib/dev-data';
import type { FeedbackSentimentResponse } from '@/lib/types';


interface FeedbackRow {
  helpful: number | null;
  issue_report: string | null;
  created_at: string;
}

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock sentiment analysis data');
      return Response.json(getMockSentimentAnalysis());
    }

    const db = getDatabase(env);

    // Get time range (last 30 days)
    const { start: start30d } = getDateRange('30d');
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Get All Feedback
    // ==========================================
    const allFeedback = await queryAll<FeedbackRow>(
      db,
      `
      SELECT helpful, issue_report, created_at
      FROM feedback
      WHERE created_at >= ?
      `,
      [sql30d]
    );

    // ==========================================
    // 1. Sentiment Overview
    // ==========================================
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    allFeedback.forEach(f => {
      const sentiment = determineSentiment(f.helpful, f.issue_report);
      if (sentiment === 'positive') positive++;
      else if (sentiment === 'negative') negative++;
      else neutral++;
    });

    const sentimentOverview = {
      positive,
      neutral,
      negative,
    };

    // ==========================================
    // 2. Complaint Categories
    // ==========================================
    const categories = new Map<string, string[]>();

    allFeedback
      .filter(f => f.issue_report && f.issue_report.trim() !== '')
      .forEach(f => {
        const category = categorizeFeedback(f.issue_report!);
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category)!.push(f.issue_report!);
      });

    const totalComplaints = allFeedback.filter(
      f => f.issue_report && f.issue_report.trim() !== ''
    ).length;

    const complaintCategories = Array.from(categories.entries())
      .map(([category, examples]) => ({
        category,
        count: examples.length,
        percentage: totalComplaints > 0 ? (examples.length / totalComplaints) * 100 : 0,
        example_feedback: examples.slice(0, 3),
      }))
      .sort((a, b) => b.count - a.count);

    // ==========================================
    // 3. Improvement Trend (weekly satisfaction rate)
    // ==========================================
    const weeklyFeedback = await queryAll<{
      week: string;
      helpful_count: number;
      total_count: number;
    }>(
      db,
      `
      SELECT
        strftime('%Y-W%W', created_at) as week,
        SUM(CASE WHEN helpful = 1 THEN 1 ELSE 0 END) as helpful_count,
        COUNT(*) as total_count
      FROM feedback
      WHERE created_at >= ?
        AND helpful IS NOT NULL
      GROUP BY week
      ORDER BY week ASC
      `,
      [sql30d]
    );

    const improvementTrend = weeklyFeedback.map(w => ({
      week: w.week,
      satisfaction_rate:
        w.total_count > 0 ? (w.helpful_count / w.total_count) * 100 : 0,
    }));

    // ==========================================
    // 4. Action Items
    // ==========================================
    const actionItems: Array<{
      priority: 'high' | 'medium' | 'low';
      category: string;
      issue: string;
      affected_responses: number;
      suggested_fix: string;
    }> = [];

    // High priority: Most common complaints
    complaintCategories.forEach((cat, index) => {
      if (index < 3 && cat.count > 5) {
        let suggestedFix = '';
        switch (cat.category) {
          case 'Answer too technical':
            suggestedFix = 'Simplify language and add more beginner-friendly explanations';
            break;
          case 'Missing code example':
            suggestedFix = 'Add code examples to documentation and improve code block detection';
            break;
          case 'Outdated information':
            suggestedFix = 'Update documentation sources and flag deprecated content';
            break;
          case 'Wrong citation':
            suggestedFix = 'Improve vector search relevance and citation accuracy';
            break;
          case "Doesn't answer my question":
            suggestedFix = 'Expand documentation coverage and improve query understanding';
            break;
          default:
            suggestedFix = 'Review feedback and improve relevant documentation';
        }

        actionItems.push({
          priority: index === 0 ? 'high' : 'medium',
          category: cat.category,
          issue: `${cat.count} users reported: ${cat.category}`,
          affected_responses: cat.count,
          suggested_fix: suggestedFix,
        });
      }
    });

    // Medium priority: Declining satisfaction trend
    if (improvementTrend.length >= 2) {
      const recent = improvementTrend[improvementTrend.length - 1];
      const previous = improvementTrend[improvementTrend.length - 2];

      if (recent.satisfaction_rate < previous.satisfaction_rate - 5) {
        actionItems.push({
          priority: 'medium',
          category: 'Satisfaction Trend',
          issue: `Satisfaction dropped from ${previous.satisfaction_rate.toFixed(1)}% to ${recent.satisfaction_rate.toFixed(1)}%`,
          affected_responses: allFeedback.length,
          suggested_fix: 'Investigate recent changes and user complaints',
        });
      }
    }

    // Low priority: Low feedback submission rate
    const totalResponses = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM responses WHERE created_at >= ?`,
      [sql30d]
    );

    const feedbackRate =
      (totalResponses?.count || 0) > 0
        ? (allFeedback.length / (totalResponses?.count || 1)) * 100
        : 0;

    if (feedbackRate < 20) {
      actionItems.push({
        priority: 'low',
        category: 'Feedback Collection',
        issue: `Only ${feedbackRate.toFixed(1)}% of responses receive feedback`,
        affected_responses: (totalResponses?.count || 0) - allFeedback.length,
        suggested_fix: 'Improve feedback widget visibility and user prompts',
      });
    }

    // ==========================================
    // Build Response
    // ==========================================
    const response: FeedbackSentimentResponse = {
      sentimentOverview,
      complaintCategories,
      improvementTrend,
      actionItems,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Sentiment analysis error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to analyze feedback sentiment',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
