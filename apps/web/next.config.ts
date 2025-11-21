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

  output: 'standalone',

  async rewrites() {
    return [];
  },
};

export default nextConfig;
