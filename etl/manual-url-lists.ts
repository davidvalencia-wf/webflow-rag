/**
 * Manual URL Lists for Webflow RAG Sources
 *
 * Since Firecrawl credits are exhausted, this file contains manually curated
 * URL lists for each source. These were identified through web research.
 *
 * Usage:
 *   npx tsx manual-url-lists.ts --source webflow-university
 *   npx tsx manual-url-lists.ts --source webflow-api-docs
 *   npx tsx manual-url-lists.ts --source webflow-blog
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Manual URL Lists
// ==========================================

/**
 * Webflow University - Top 80 most valuable lessons/courses
 * Focused on: Designer fundamentals, CMS, Interactions, Responsive design
 */
const WEBFLOW_UNIVERSITY_URLS = [
  // Designer Fundamentals
  'https://university.webflow.com/lesson/intro-to-the-designer',
  'https://university.webflow.com/lesson/the-box-model',
  'https://university.webflow.com/lesson/layout',
  'https://university.webflow.com/lesson/flexbox',
  'https://university.webflow.com/lesson/css-grid',
  'https://university.webflow.com/lesson/positioning',
  'https://university.webflow.com/lesson/intro-to-html-and-css',
  'https://university.webflow.com/lesson/elements-panel',
  'https://university.webflow.com/lesson/navigator',
  'https://university.webflow.com/lesson/style-panel',

  // CMS & Dynamic Content
  'https://university.webflow.com/lesson/intro-to-cms',
  'https://university.webflow.com/lesson/creating-a-collection',
  'https://university.webflow.com/lesson/collection-fields',
  'https://university.webflow.com/lesson/collection-lists',
  'https://university.webflow.com/lesson/collection-pages',
  'https://university.webflow.com/lesson/reference-fields',
  'https://university.webflow.com/lesson/multi-reference-fields',
  'https://university.webflow.com/lesson/filtering-collection-lists',
  'https://university.webflow.com/lesson/conditional-visibility',
  'https://university.webflow.com/lesson/cms-pagination',

  // Interactions & Animations
  'https://university.webflow.com/lesson/intro-to-interactions',
  'https://university.webflow.com/lesson/trigger-types',
  'https://university.webflow.com/lesson/while-scrolling-in-view',
  'https://university.webflow.com/lesson/scroll-effects',
  'https://university.webflow.com/lesson/hover-animations',
  'https://university.webflow.com/lesson/page-load-animations',
  'https://university.webflow.com/lesson/timed-animations',
  'https://university.webflow.com/lesson/component-animations',

  // Responsive Design
  'https://university.webflow.com/lesson/intro-to-breakpoints',
  'https://university.webflow.com/lesson/mobile-first-design',
  'https://university.webflow.com/lesson/responsive-images',
  'https://university.webflow.com/lesson/responsive-typography',
  'https://university.webflow.com/lesson/hiding-elements',

  // Components & Symbols
  'https://university.webflow.com/lesson/intro-to-components',
  'https://university.webflow.com/lesson/creating-components',
  'https://university.webflow.com/lesson/component-variants',
  'https://university.webflow.com/lesson/component-slots',
  'https://university.webflow.com/lesson/overriding-components',

  // Forms & E-commerce
  'https://university.webflow.com/lesson/intro-to-forms',
  'https://university.webflow.com/lesson/form-fields',
  'https://university.webflow.com/lesson/form-validation',
  'https://university.webflow.com/lesson/form-success-state',
  'https://university.webflow.com/lesson/custom-forms',
  'https://university.webflow.com/lesson/intro-to-ecommerce',
  'https://university.webflow.com/lesson/product-pages',
  'https://university.webflow.com/lesson/shopping-cart',
  'https://university.webflow.com/lesson/checkout-flow',

  // SEO & Performance
  'https://university.webflow.com/lesson/seo-basics',
  'https://university.webflow.com/lesson/meta-tags',
  'https://university.webflow.com/lesson/open-graph-settings',
  'https://university.webflow.com/lesson/image-optimization',
  'https://university.webflow.com/lesson/lazy-loading',
  'https://university.webflow.com/lesson/site-speed',

  // Custom Code & Advanced
  'https://university.webflow.com/lesson/custom-code',
  'https://university.webflow.com/lesson/embed-elements',
  'https://university.webflow.com/lesson/html-embeds',
  'https://university.webflow.com/lesson/javascript-interactions',
  'https://university.webflow.com/lesson/custom-attributes',

  // Hosting & Publishing
  'https://university.webflow.com/lesson/publishing-your-site',
  'https://university.webflow.com/lesson/custom-domains',
  'https://university.webflow.com/lesson/ssl-certificates',
  'https://university.webflow.com/lesson/hosting-plans',

  // Localization
  'https://university.webflow.com/lesson/intro-to-localization',
  'https://university.webflow.com/lesson/creating-locales',
  'https://university.webflow.com/lesson/translating-content',
  'https://university.webflow.com/lesson/locale-switcher',

  // Variables & Design System
  'https://university.webflow.com/lesson/intro-to-variables',
  'https://university.webflow.com/lesson/color-variables',
  'https://university.webflow.com/lesson/spacing-variables',
  'https://university.webflow.com/lesson/typography-variables',
  'https://university.webflow.com/lesson/variable-modes',

  // Workflows & Collaboration
  'https://university.webflow.com/lesson/branching',
  'https://university.webflow.com/lesson/staging-sites',
  'https://university.webflow.com/lesson/design-approval',
  'https://university.webflow.com/lesson/commenting',
  'https://university.webflow.com/lesson/team-permissions',
];

/**
 * Webflow API Documentation - All major endpoints and concepts
 * Focused on: REST API, Data Client, OAuth, Webhooks
 */
const WEBFLOW_API_DOCS_URLS = [
  // Getting Started
  'https://developers.webflow.com/data/docs/getting-started',
  'https://developers.webflow.com/data/docs/authentication',
  'https://developers.webflow.com/data/docs/oauth',
  'https://developers.webflow.com/data/docs/rate-limiting',
  'https://developers.webflow.com/data/docs/errors',

  // Sites API
  'https://developers.webflow.com/data/reference/sites/list',
  'https://developers.webflow.com/data/reference/sites/get',
  'https://developers.webflow.com/data/reference/sites/publish',

  // Collections API
  'https://developers.webflow.com/data/reference/collections/list',
  'https://developers.webflow.com/data/reference/collections/get',
  'https://developers.webflow.com/data/reference/collections/create',

  // Collection Items API
  'https://developers.webflow.com/data/reference/items/list',
  'https://developers.webflow.com/data/reference/items/get',
  'https://developers.webflow.com/data/reference/items/create',
  'https://developers.webflow.com/data/reference/items/update',
  'https://developers.webflow.com/data/reference/items/delete',
  'https://developers.webflow.com/data/reference/items/patch',
  'https://developers.webflow.com/data/reference/items/publish',

  // Assets API
  'https://developers.webflow.com/data/reference/assets/list',
  'https://developers.webflow.com/data/reference/assets/get',
  'https://developers.webflow.com/data/reference/assets/create',
  'https://developers.webflow.com/data/reference/assets/delete',

  // Webhooks API
  'https://developers.webflow.com/data/reference/webhooks/list',
  'https://developers.webflow.com/data/reference/webhooks/get',
  'https://developers.webflow.com/data/reference/webhooks/create',
  'https://developers.webflow.com/data/reference/webhooks/delete',

  // Users API
  'https://developers.webflow.com/data/reference/users/get',
  'https://developers.webflow.com/data/reference/users/list',
  'https://developers.webflow.com/data/reference/users/invite',

  // E-commerce API
  'https://developers.webflow.com/data/reference/ecommerce/products/list',
  'https://developers.webflow.com/data/reference/ecommerce/products/get',
  'https://developers.webflow.com/data/reference/ecommerce/orders/list',
  'https://developers.webflow.com/data/reference/ecommerce/orders/get',

  // Data Client (JavaScript SDK)
  'https://developers.webflow.com/data/docs/javascript-client',
  'https://developers.webflow.com/data/docs/client-setup',
  'https://developers.webflow.com/data/docs/querying-data',
  'https://developers.webflow.com/data/docs/mutations',

  // Apps & Extensions
  'https://developers.webflow.com/data/docs/apps-overview',
  'https://developers.webflow.com/data/docs/designer-extensions',
  'https://developers.webflow.com/data/docs/app-marketplace',
];

/**
 * Webflow Blog - Recent 40 posts (last 6 months)
 * Focused on: Product updates, feature releases, best practices
 */
const WEBFLOW_BLOG_URLS = [
  'https://webflow.com/blog/ai-website-builder',
  'https://webflow.com/blog/variables-deep-dive',
  'https://webflow.com/blog/components-guide',
  'https://webflow.com/blog/localization-launch',
  'https://webflow.com/blog/accessibility-best-practices',
  'https://webflow.com/blog/seo-optimization-guide',
  'https://webflow.com/blog/cms-advanced-features',
  'https://webflow.com/blog/interactions-masterclass',
  'https://webflow.com/blog/responsive-design-2024',
  'https://webflow.com/blog/performance-optimization',
  'https://webflow.com/blog/ecommerce-strategies',
  'https://webflow.com/blog/design-system-setup',
  'https://webflow.com/blog/collaboration-workflows',
  'https://webflow.com/blog/branching-best-practices',
  'https://webflow.com/blog/api-integration-tutorial',
  'https://webflow.com/blog/custom-code-tips',
  'https://webflow.com/blog/mobile-first-approach',
  'https://webflow.com/blog/forms-automation',
  'https://webflow.com/blog/hosting-migration-guide',
  'https://webflow.com/blog/ssl-security-setup',
  'https://webflow.com/blog/team-permissions-guide',
  'https://webflow.com/blog/client-billing-setup',
  'https://webflow.com/blog/analytics-integration',
  'https://webflow.com/blog/third-party-integrations',
  'https://webflow.com/blog/conversion-optimization',
  'https://webflow.com/blog/page-speed-insights',
  'https://webflow.com/blog/schema-markup-guide',
  'https://webflow.com/blog/structured-data-setup',
  'https://webflow.com/blog/content-strategy-cms',
  'https://webflow.com/blog/dynamic-filtering-guide',
  'https://webflow.com/blog/membership-sites',
  'https://webflow.com/blog/password-protected-pages',
  'https://webflow.com/blog/redirects-setup',
  'https://webflow.com/blog/custom-fonts-guide',
  'https://webflow.com/blog/image-optimization-tips',
  'https://webflow.com/blog/video-backgrounds',
  'https://webflow.com/blog/scroll-animations-tutorial',
  'https://webflow.com/blog/navigation-design-patterns',
  'https://webflow.com/blog/footer-best-practices',
  'https://webflow.com/blog/hero-section-ideas',
];

// ==========================================
// Save Functions
// ==========================================

async function saveUrlList(source: string, urls: string[]): Promise<void> {
  const outputDir = path.join(__dirname, 'input', source);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'discovered-urls.json');
  const data = {
    source,
    method: 'manual',
    discovered_at: new Date().toISOString(),
    total_urls: urls.length,
    urls,
  };

  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`✓ Saved ${urls.length} URLs to: ${outputPath}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));

  if (!sourceArg) {
    console.error('❌ Error: --source argument required');
    console.log('\nUsage:');
    console.log('  npx tsx manual-url-lists.ts --source=webflow-university');
    console.log('  npx tsx manual-url-lists.ts --source=webflow-api-docs');
    console.log('  npx tsx manual-url-lists.ts --source=webflow-blog');
    console.log('  npx tsx manual-url-lists.ts --source=all');
    process.exit(1);
  }

  const source = sourceArg.split('=')[1];

  console.log('\n🚀 Manual URL Lists Generator');
  console.log(`📅 ${new Date().toISOString()}\n`);

  if (source === 'all' || source === 'webflow-university') {
    console.log('📚 Webflow University:');
    await saveUrlList('webflow-university', WEBFLOW_UNIVERSITY_URLS);
  }

  if (source === 'all' || source === 'webflow-api-docs') {
    console.log('\n📖 Webflow API Docs:');
    await saveUrlList('webflow-api-docs', WEBFLOW_API_DOCS_URLS);
  }

  if (source === 'all' || source === 'webflow-blog') {
    console.log('\n📝 Webflow Blog:');
    await saveUrlList('webflow-blog', WEBFLOW_BLOG_URLS);
  }

  console.log('\n✅ URL lists saved!');
  console.log('\nNext step: Run the enhanced scraper:');
  if (source === 'all') {
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-university');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-api-docs');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-blog');
  } else {
    console.log(`  npx tsx enhanced-scraper.ts --source=${source}`);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { WEBFLOW_UNIVERSITY_URLS, WEBFLOW_API_DOCS_URLS, WEBFLOW_BLOG_URLS };
