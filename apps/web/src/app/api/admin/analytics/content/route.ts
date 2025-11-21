/**
 * Admin API: Usage Analytics - Content
 * Provides content usage statistics and source analytics
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import { toSQLDate, getDateRange, classifyQueryTopic, average } from '@/lib/analytics';
import { getMockContentAnalytics } from '@/lib/dev-data';
import type { UsageContentResponse } from '@/lib/types';

export const runtime = 'edge';

interface QueryWithConfidence {
  query_text: string;
  count: number;
  avg_confidence: number | null;
}

interface SourceCitation {
  uri: string;
  title: string | null;
  source_type: string | null;
}

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock content analytics data');
      return Response.json(getMockContentAnalytics());
    }

    const db = getDatabase(env);

    // Get time range (last 30 days)
    const { start: start30d } = getDateRange('30d');
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Top Queries
    // ==========================================
    const topQueriesRaw = await queryAll<QueryWithConfidence>(
      db,
      `
      SELECT
        q.query_text,
        COUNT(*) as count,
        AVG(rm.confidence_score) as avg_confidence
      FROM queries q
      LEFT JOIN responses r ON r.query_id = q.id
      LEFT JOIN response_metadata rm ON rm.response_id = r.id
      WHERE q.created_at >= ?
      GROUP BY q.query_text
      ORDER BY count DESC
      LIMIT 20
      `,
      [sql30d]
    );

    const topQueries = topQueriesRaw.map(q => ({
      query: q.query_text,
      count: q.count,
      avg_confidence: q.avg_confidence || 0,
    }));

    // ==========================================
    // Top Cited Sources
    // ==========================================
    // Parse sources JSON from responses
    const responsesWithSources = await queryAll<{ sources: string; created_at: string }>(
      db,
      `
      SELECT r.sources, r.created_at
      FROM responses r
      JOIN queries q ON q.id = r.query_id
      WHERE q.created_at >= ?
        AND r.sources IS NOT NULL
        AND r.sources != '[]'
      `,
      [sql30d]
    );

    const sourceCitations = new Map<string, { count: number; title: string; source_type: string }>();

    responsesWithSources.forEach(r => {
      try {
        const sources = JSON.parse(r.sources) as Array<{ uri: string; title?: string }>;
        sources.forEach(source => {
          const existing = sourceCitations.get(source.uri);
          if (existing) {
            existing.count++;
          } else {
            sourceCitations.set(source.uri, {
              count: 1,
              title: source.title || 'Untitled',
              source_type: 'unknown', // Will be enriched from documents table
            });
          }
        });
      } catch {
        // Invalid JSON, skip
      }
    });

    // Enrich with source_type from documents table
    const allUris = Array.from(sourceCitations.keys());
    if (allUris.length > 0) {
      const documents = await queryAll<{ uri: string; title: string; source_type: string }>(
        db,
        `
        SELECT uri, title, source_type
        FROM documents
        WHERE uri IN (${allUris.map(() => '?').join(',')})
        `,
        allUris
      );

      documents.forEach(doc => {
        const citation = sourceCitations.get(doc.uri);
        if (citation) {
          citation.source_type = doc.source_type || 'unknown';
          citation.title = doc.title || citation.title;
        }
      });
    }

    const topCitedSources = Array.from(sourceCitations.entries())
      .map(([uri, data]) => ({
        uri,
        title: data.title,
        citation_count: data.count,
        source_type: data.source_type,
      }))
      .sort((a, b) => b.citation_count - a.citation_count)
      .slice(0, 10);

    // ==========================================
    // Uncited Sources
    // ==========================================
    const citedUris = Array.from(sourceCitations.keys());
    const uncitedSources = await queryAll<{ uri: string; title: string; created_at: string }>(
      db,
      citedUris.length > 0
        ? `
          SELECT uri, title, created_at
          FROM documents
          WHERE uri NOT IN (${citedUris.map(() => '?').join(',')})
          ORDER BY created_at DESC
          LIMIT 20
          `
        : `
          SELECT uri, title, created_at
          FROM documents
          ORDER BY created_at DESC
          LIMIT 20
          `,
      citedUris
    );

    const uncitedSourcesList = uncitedSources.map(s => ({
      uri: s.uri,
      title: s.title || 'Untitled',
      last_indexed: s.created_at,
    }));

    // ==========================================
    // Source Type Distribution
    // ==========================================
    const sourceTypeCounts = await queryAll<{ source_type: string; count: number }>(
      db,
      `
      SELECT source_type, COUNT(*) as count
      FROM documents
      GROUP BY source_type
      `
    );

    const sourceTypeDistribution = {
      'webflow-developers': sourceTypeCounts.find(s => s.source_type === 'api-docs')?.count || 0,
      'webflow-way': sourceTypeCounts.find(s => s.source_type === 'university')?.count || 0,
      'webflow-updates': sourceTypeCounts.find(s => s.source_type === 'blog')?.count || 0,
    };

    // ==========================================
    // Query Classification
    // ==========================================
    const allQueries = await queryAll<{ query_text: string }>(
      db,
      `SELECT DISTINCT query_text FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    const classification = {
      API: 0,
      Design: 0,
      Setup: 0,
      Troubleshooting: 0,
      Unknown: 0,
    };

    allQueries.forEach(q => {
      const topic = classifyQueryTopic(q.query_text);
      classification[topic]++;
    });

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsageContentResponse = {
      topQueries,
      topCitedSources,
      uncitedSources: uncitedSourcesList,
      sourceTypeDistribution,
      queryClassification: classification,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Content analytics error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch content analytics',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
