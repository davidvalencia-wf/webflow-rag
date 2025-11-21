/**
 * Health check endpoint
 * GET /api/health
 *
 * Returns the health status of the application and its dependencies
 */

import { jsonResponse, getCurrentTimestamp } from '@/lib/utils';
import { getCloudflareEnv } from '@/lib/env';
import { testDatabaseConnection } from '@/lib/db';
import type { HealthResponse } from '@/lib/types';


export async function GET() {
  const timestamp = getCurrentTimestamp();

  try {
    const env = getCloudflareEnv();

    // Check database connection
    let dbStatus: 'ok' | 'error' = 'ok';
    if (env.DB) {
      const isConnected = await testDatabaseConnection(env.DB);
      dbStatus = isConnected ? 'ok' : 'error';
    } else {
      dbStatus = 'error';
    }

    // Check KV
    let kvStatus: 'ok' | 'error' = 'ok';
    if (env.KV) {
      try {
        // Simple test: try to get a non-existent key
        await env.KV.get('health-check-test');
      } catch {
        kvStatus = 'error';
      }
    } else {
      kvStatus = 'error';
    }

    const overallStatus =
      dbStatus === 'ok' && kvStatus === 'ok' ? 'ok' : 'degraded';

    const response: HealthResponse = {
      status: overallStatus,
      timestamp,
      checks: {
        database: dbStatus,
        kv: kvStatus,
      },
    };

    return jsonResponse(response, overallStatus === 'ok' ? 200 : 503);
  } catch (err) {
    console.error('Health check failed:', err);
    const response: HealthResponse = {
      status: 'error',
      timestamp,
    };
    return jsonResponse(response, 500);
  }
}
