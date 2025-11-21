import type { NextConfig } from 'next';

/**
 * Next.js configuration for Webflow Cloud deployment
 *
 * IMPORTANT: Using `satisfies NextConfig` instead of type annotation to preserve
 * literal types during Webflow Cloud's template spreading. This prevents the
 * TypeScript error: Type 'string' is not assignable to type '"standalone" | "export"'.
 */
const nextConfig = {
  // Webflow Cloud mount path configuration
  basePath: '/app',
  assetPrefix: '/app',

  // Enable experimental features for edge runtime
  experimental: {
    // serverActions: true,
  },

  // Optimize for edge deployment
  images: {
    unoptimized: true, // Cloudflare Workers doesn't support Next.js Image Optimization
    loaderFile: './webflow-loader.ts', // Required for Webflow Cloud template compatibility
  },

  // Output standalone for Cloudflare Pages
  // Using literal type to prevent type widening during template spread
  output: 'standalone' as const,
} satisfies NextConfig;

export default nextConfig;
