/**
 * Admin API: Usage Analytics - Cost
 * Provides cost estimates for OpenAI, Pinecone, and Cloudflare services
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll, queryFirst } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import {
  toSQLDate,
  getDateRange,
  estimateTokens,
  OPENAI_PRICING,
} from '@/lib/analytics';
import { getMockCostAnalysis } from '@/lib/dev-data';
import type { UsageCostResponse } from '@/lib/types';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock cost analysis data');
      return Response.json(getMockCostAnalysis());
    }

    const db = getDatabase(env);

    // Get time range (last 30 days for monthly projection)
    const { start: start30d } = getDateRange('30d');
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // OpenAI Costs
    // ==========================================

    // Embedding costs (one embedding per unique query)
    const queries = await queryAll<{ query_text: string }>(
      db,
      `SELECT query_text FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    const totalEmbeddingTokens = queries.reduce(
      (sum, q) => sum + estimateTokens(q.query_text),
      0
    );
    const embeddingsCost = totalEmbeddingTokens * OPENAI_PRICING.EMBEDDING;

    // Completion costs (input + output tokens)
    const responses = await queryAll<{ answer: string }>(
      db,
      `
      SELECT r.answer
      FROM responses r
      JOIN queries q ON q.id = r.query_id
      WHERE q.created_at >= ?
      `,
      [sql30d]
    );

    // Estimate input tokens: query + context (avg 1000 tokens)
    const avgInputTokens = 1000;
    const totalInputTokens = responses.length * avgInputTokens;
    const inputCost = totalInputTokens * OPENAI_PRICING.GPT4O_MINI_INPUT;

    // Estimate output tokens from answer length
    const totalOutputTokens = responses.reduce(
      (sum, r) => sum + estimateTokens(r.answer),
      0
    );
    const outputCost = totalOutputTokens * OPENAI_PRICING.GPT4O_MINI_OUTPUT;

    const completionsCost = inputCost + outputCost;
    const openaiTotal = embeddingsCost + completionsCost;

    // ==========================================
    // Pinecone Costs (Free Tier)
    // ==========================================
    // Free tier includes 100k vectors and 5M queries/month
    const pinecone = {
      query_cost: 0, // Free tier
      storage_cost: 0, // Free tier
    };

    // ==========================================
    // Cloudflare Costs (Estimates)
    // ==========================================
    // For MVP, provide rough estimates based on usage

    // KV Operations (reads + writes)
    const kvReads = queries.length * 2; // Cache check + embedding cache
    const kvWrites = queries.length; // Cache writes
    const kvOps = kvReads + kvWrites;

    // D1 Queries (estimate 10 queries per request)
    const d1Queries = queries.length * 10;

    // R2 Storage (not used yet in MVP)
    const r2Storage = 0;

    // Cloudflare pricing (simplified):
    // - KV: 100k reads/day free, 1k writes/day free
    // - D1: 5M rows read/day free, 100k rows write/day free
    // For MVP, assume we're within free tier
    const cloudflareTotal = 0;

    // ==========================================
    // Cost Per Query
    // ==========================================
    const totalCost = openaiTotal + cloudflareTotal;
    const costPerQuery = queries.length > 0 ? totalCost / queries.length : 0;

    // ==========================================
    // Monthly Burn Rate (projected)
    // ==========================================
    // Extrapolate from 30-day data
    const monthlyBurnRate = totalCost; // Already 30-day window

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsageCostResponse = {
      openai: {
        embeddings_cost: Math.round(embeddingsCost * 100) / 100,
        completions_cost: Math.round(completionsCost * 100) / 100,
        total: Math.round(openaiTotal * 100) / 100,
      },
      pinecone,
      cloudflare: {
        kv_ops: kvOps,
        d1_queries: d1Queries,
        r2_storage: r2Storage,
        total: cloudflareTotal,
      },
      costPerQuery: Math.round(costPerQuery * 10000) / 10000, // 4 decimal places
      monthlyBurnRate: Math.round(monthlyBurnRate * 100) / 100,
    };

    return Response.json(response);
  } catch (error) {
    console.error('Cost analytics error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch cost analytics',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
