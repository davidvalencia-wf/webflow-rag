/**
 * Admin API: Usage Analytics - Overview
 * Provides high-level usage statistics
 */

import { NextRequest } from 'next/server';
import { getDatabase, queryAll, queryFirst } from '@/lib/db';
import { getCloudflareEnv } from '@/lib/env';
import { toSQLDate, getDateRange } from '@/lib/analytics';
import type { UsageOverviewResponse } from '@shared/index';
import { getMockUsageOverview } from '@/lib/dev-data';

export const runtime = 'edge';
export async function GET(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    const env = getCloudflareEnv();

    // Development fallback: return mock data if DB not available
    if (!env.DB) {
      console.log('[DEV MODE] Returning mock usage overview data');
      return Response.json(getMockUsageOverview());
    }
    const db = getDatabase(env);

    // Get time ranges
    const { start: startToday } = getDateRange('today');
    const { start: start7d } = getDateRange('7d');
    const { start: start30d } = getDateRange('30d');

    const sqlToday = toSQLDate(startToday);
    const sql7d = toSQLDate(start7d);
    const sql30d = toSQLDate(start30d);

    // ==========================================
    // Total Queries
    // ==========================================
    const totalToday = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM queries WHERE created_at >= ?`,
      [sqlToday]
    );

    const total7d = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM queries WHERE created_at >= ?`,
      [sql7d]
    );

    const total30d = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    const totalAll = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(*) as count FROM queries`
    );

    // ==========================================
    // Active Users (Unique IPs)
    // ==========================================
    const dau = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(DISTINCT user_ip) as count FROM queries WHERE created_at >= ?`,
      [sqlToday]
    );

    const wau = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(DISTINCT user_ip) as count FROM queries WHERE created_at >= ?`,
      [sql7d]
    );

    const mau = await queryFirst<{ count: number }>(
      db,
      `SELECT COUNT(DISTINCT user_ip) as count FROM queries WHERE created_at >= ?`,
      [sql30d]
    );

    // ==========================================
    // Avg Queries Per User
    // ==========================================
    const avgQueriesPerUser =
      (mau?.count || 0) > 0 ? (total30d?.count || 0) / (mau?.count || 1) : 0;

    // ==========================================
    // Avg Session Duration (estimate from query timestamps)
    // ==========================================
    const sessionData = await queryAll<{ user_ip: string; first_query: string; last_query: string }>(
      db,
      `
      SELECT
        user_ip,
        MIN(created_at) as first_query,
        MAX(created_at) as last_query
      FROM queries
      WHERE created_at >= ?
      GROUP BY user_ip
      HAVING COUNT(*) > 1
      `,
      [sql30d]
    );

    let totalDuration = 0;
    sessionData.forEach(session => {
      const first = new Date(session.first_query).getTime();
      const last = new Date(session.last_query).getTime();
      totalDuration += (last - first) / 1000 / 60; // Convert to minutes
    });

    const avgSessionDuration = sessionData.length > 0 ? totalDuration / sessionData.length : 0;

    // ==========================================
    // Retention Curve (simplified for MVP)
    // ==========================================
    // Calculate day-over-day retention for the past 7 days
    const retentionCurve: Array<{ day: number; retention_rate: number }> = [];

    for (let day = 0; day < 7; day++) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() - day);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const usersOnDay = await queryFirst<{ count: number }>(
        db,
        `
        SELECT COUNT(DISTINCT user_ip) as count
        FROM queries
        WHERE created_at >= ? AND created_at <= ?
        `,
        [toSQLDate(dayStart), toSQLDate(dayEnd)]
      );

      // Users who returned the next day
      const nextDayStart = new Date(dayEnd);
      nextDayStart.setDate(nextDayStart.getDate() + 1);
      const nextDayEnd = new Date(nextDayStart);
      nextDayEnd.setHours(23, 59, 59, 999);

      const returnedUsers = await queryFirst<{ count: number }>(
        db,
        `
        SELECT COUNT(DISTINCT q2.user_ip) as count
        FROM queries q1
        JOIN queries q2 ON q1.user_ip = q2.user_ip
        WHERE q1.created_at >= ? AND q1.created_at <= ?
          AND q2.created_at >= ? AND q2.created_at <= ?
        `,
        [
          toSQLDate(dayStart),
          toSQLDate(dayEnd),
          toSQLDate(nextDayStart),
          toSQLDate(nextDayEnd),
        ]
      );

      const retentionRate =
        (usersOnDay?.count || 0) > 0
          ? ((returnedUsers?.count || 0) / (usersOnDay?.count || 1)) * 100
          : 0;

      retentionCurve.push({
        day,
        retention_rate: retentionRate,
      });
    }

    // ==========================================
    // Build Response
    // ==========================================
    const response: UsageOverviewResponse = {
      totalQueries: {
        today: totalToday?.count || 0,
        last7d: total7d?.count || 0,
        last30d: total30d?.count || 0,
        allTime: totalAll?.count || 0,
      },
      activeUsers: {
        dau: dau?.count || 0,
        wau: wau?.count || 0,
        mau: mau?.count || 0,
      },
      avgQueriesPerUser,
      avgSessionDuration,
      retentionCurve: retentionCurve.reverse(), // Show oldest to newest
    };

    return Response.json(response);
  } catch (error) {
    console.error('Usage overview error:', { requestId, error });
    return Response.json(
      {
        error: 'Failed to fetch usage overview',
        code: 'INTERNAL_ERROR',
        details: { requestId },
      },
      { status: 500 }
    );
  }
}
