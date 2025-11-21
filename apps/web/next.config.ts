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
  },
} as const;

export default nextConfig;
