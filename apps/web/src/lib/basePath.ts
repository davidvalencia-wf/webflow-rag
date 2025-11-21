/**
 * basePath Utility for Webflow Cloud Deployment
 *
 * Webflow Cloud requires explicit basePath configuration when apps are mounted
 * at subdirectories (e.g., /app). This utility ensures all routes, API calls,
 * and asset references work correctly in both development and production.
 *
 * Architecture Decision:
 * - Use Next.js basePath for routing consistency
 * - Webflow Cloud provides BASE_URL env var, but we hardcode for predictability
 * - All client-side route references MUST use getBasePath() helper
 *
 * @see https://developers.webflow.com/webflow-cloud/environment/configuration
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
 */

/**
 * Get the base path for the application
 *
 * Returns '/app' in production (Webflow Cloud) and '' in development.
 * This matches the basePath in next.config.js.
 *
 * @returns The base path string (e.g., '/app' or '')
 */
export function getBasePath(): string {
  // Check if we're in browser or server environment
  if (typeof window !== 'undefined') {
    // Client-side: Use Next.js basePath from next.config.js
    return process.env.NEXT_PUBLIC_BASE_PATH || '/app';
  }

  // Server-side: Use environment variable or fallback
  return process.env.BASE_PATH || '/app';
}

/**
 * Construct an API route path with basePath prefix
 *
 * Examples:
 * - apiPath('/ask') → '/app/api/ask' (production)
 * - apiPath('/ask') → '/api/ask' (development)
 * - apiPath('/admin/content-gaps') → '/app/api/admin/content-gaps'
 *
 * @param path - API route path (e.g., '/ask', '/search')
 * @returns Full API path with basePath prefix
 */
export function apiPath(path: string): string {
  const base = getBasePath();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // If path already includes /api, don't add it again
  if (normalizedPath.startsWith('/api/')) {
    return `${base}${normalizedPath}`;
  }

  // Add /api prefix
  return `${base}/api${normalizedPath}`;
}

/**
 * Construct a page route path with basePath prefix
 *
 * Examples:
 * - pagePath('/admin') → '/app/admin' (production)
 * - pagePath('/admin') → '/admin' (development)
 *
 * @param path - Page route path (e.g., '/admin', '/settings')
 * @returns Full page path with basePath prefix
 */
export function pagePath(path: string): string {
  const base = getBasePath();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/**
 * Construct an asset path with basePath prefix
 *
 * Note: Next.js Image component should automatically handle basePath,
 * but this helper is provided for manual asset references (CSS backgrounds, etc.)
 *
 * Examples:
 * - assetPath('/Mark_Logo_Blue.svg') → '/app/Mark_Logo_Blue.svg' (production)
 * - assetPath('/Mark_Logo_Blue.svg') → '/Mark_Logo_Blue.svg' (development)
 *
 * @param path - Asset path (e.g., '/logo.svg', '/images/hero.png')
 * @returns Full asset path with basePath prefix
 */
export function assetPath(path: string): string {
  const base = getBasePath();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/**
 * Remove basePath from a URL path
 *
 * Useful for extracting route parameters or comparing routes.
 *
 * Examples:
 * - stripBasePath('/app/admin') → '/admin'
 * - stripBasePath('/app/api/ask') → '/api/ask'
 *
 * @param path - Full path including basePath
 * @returns Path without basePath prefix
 */
export function stripBasePath(path: string): string {
  const base = getBasePath();
  if (!base || base === '') return path;

  if (path.startsWith(base)) {
    return path.slice(base.length) || '/';
  }

  return path;
}

/**
 * Check if the app is running in development mode
 *
 * @returns true if NODE_ENV is 'development'
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if the app is running in production mode
 *
 * @returns true if NODE_ENV is 'production'
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
