/**
 * Knowledge Base Stats Endpoint
 * GET /api/stats
 *
 * Returns statistics about the knowledge base
 */

import { getCloudflareEnv } from '@/lib/env';

import { getDatabase, queryFirst } from '@/lib/db';

import { getIndexStats } from '@/lib/pinecone-edge';

interface StatsResponse {
  documents: {
    total: number;
    by_source: Record<string, number>;
  };
  chunks: {
    total: number;
    avg_tokens: number;
  };
  vectors: {
    total: number;
    dimension: number;
  };
  last_updated?: string;
}

export async function GET() {
  try {
    const env = getCloudflareEnv();
    const db = env.DB ? getDatabase(env) : null;

    const stats: StatsResponse = {
      documents: { total: 0, by_source: {} },
      chunks: { total: 0, avg_tokens: 0 },
      vectors: { total: 0, dimension: 1536 },
    };

    // Get document stats from D1
    if (db) {
      // Total documents
      const docCount = await queryFirst<{ count: number }>(
        db,
        'SELECT COUNT(*) as count FROM documents'
      );
      stats.documents.total = docCount?.count || 0;

      // Documents by source type
      const docsBySource = await db
        .prepare('SELECT source_type, COUNT(*) as count FROM documents WHERE source_type IS NOT NULL GROUP BY source_type')
        .all<{ source_type: string; count: number }>();

      if (docsBySource.results) {
        for (const row of docsBySource.results) {
          stats.documents.by_source[row.source_type] = row.count;
        }
      }

      // Chunk stats
      const chunkCount = await queryFirst<{ count: number; avg_tokens: number }>(
        db,
        'SELECT COUNT(*) as count, AVG(token_count) as avg_tokens FROM chunks'
      );
      stats.chunks.total = chunkCount?.count || 0;
      stats.chunks.avg_tokens = Math.round(chunkCount?.avg_tokens || 0);

      // Last updated
      const lastDoc = await queryFirst<{ updated_at: string }>(
        db,
        'SELECT updated_at FROM documents ORDER BY updated_at DESC LIMIT 1'
      );
      stats.last_updated = lastDoc?.updated_at;
    }

    // Get vector stats from Pinecone
    try {
      const pineconeStats = await getIndexStats();
      if (pineconeStats.totalRecordCount !== undefined) {
        stats.vectors.total = pineconeStats.totalRecordCount;
      }
      if (pineconeStats.dimension !== undefined) {
        stats.vectors.dimension = pineconeStats.dimension;
      }
    } catch (error) {
      console.error('Failed to fetch Pinecone stats:', error);
      // Continue without Pinecone stats
    }

    return Response.json(stats, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Stats endpoint error:', error);
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
