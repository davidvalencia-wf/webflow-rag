/**
 * Next.js configuration for Webflow Cloud deployment
 *
 * Converted to JavaScript to avoid TypeScript type errors with Webflow Cloud's
 * template injection system. The template was having issues with TypeScript
 * literal types and type widening during config spreading.
 *
 * @type {import('next').NextConfig}
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
  output: 'standalone',
};

module.exports = nextConfig;
