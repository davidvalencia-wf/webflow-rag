import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/app',
  assetPrefix: '/app',

  env: {
    NEXT_PUBLIC_BASE_PATH: '/app',
  },

  experimental: {
    // serverActions: true,
  },

  images: {
    unoptimized: true, // Cloudflare Workers doesn't support Next.js Image Optimization
    loaderFile: './webflow-loader.ts', // Required for Webflow Cloud template compatibility
  },

  output: 'standalone',

  async rewrites() {
    return [];
  },
};

export default nextConfig;
