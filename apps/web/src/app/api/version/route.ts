/**
 * Version information endpoint
 * GET /api/version
 *
 * Returns version, git SHA, and build information
 */

import { jsonResponse } from '@/lib/utils';
import { getEnvVar } from '@/lib/env';
import type { VersionResponse } from '@/lib/types';
import packageJson from '../../../../package.json';

export async function GET() {
  const response: VersionResponse = {
    version: packageJson.version,
    git_sha: getEnvVar('GIT_SHA', 'local-dev'),
    build_time: getEnvVar('BUILD_TIME', new Date().toISOString()),
  };

  return jsonResponse(response);
}
