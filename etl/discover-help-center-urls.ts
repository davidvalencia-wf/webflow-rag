#!/usr/bin/env node

/**
 * URL DISCOVERY: Webflow Help Center
 *
 * Discovers article URLs from help.webflow.com using Firecrawl's map feature.
 * The old university.webflow.com has been migrated to help.webflow.com.
 *
 * Usage: npx tsx discover-help-center-urls.ts
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a408c85daa9724b13805f',
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-help-center'),
  START_URL: 'https://help.webflow.com/hc/en-us',
  MAX_URLS: 150, // Target: 80-100 articles, allow buffer for filtering
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

interface DiscoveredUrl {
  url: string;
  title?: string;
  category?: string;
}

/**
 * Filter URLs to only include article pages
 */
function isArticleUrl(url: string): boolean {
  // Help center articles follow pattern: /hc/en-us/articles/{id}-{slug}
  return url.includes('/hc/en-us/articles/') && !url.includes('#');
}

/**
 * Extract category from URL path
 */
function extractCategory(url: string): string {
  const categories = [
    'designer', 'cms', 'interactions', 'components',
    'forms', 'ecommerce', 'seo', 'hosting', 'localization'
  ];

  for (const cat of categories) {
    if (url.toLowerCase().includes(cat)) {
      return cat;
    }
  }

  return 'general';
}

/**
 * Discover URLs using Firecrawl map feature
 */
async function discoverUrls(): Promise<DiscoveredUrl[]> {
  console.log('🔍 Discovering Help Center URLs...');
  console.log(`📍 Starting from: ${CONFIG.START_URL}`);
  console.log(`🎯 Target: ${CONFIG.MAX_URLS} URLs\n`);

  try {
    const mapResult = await firecrawl.mapUrl(CONFIG.START_URL, {
      search: 'articles about Webflow features and tutorials',
      limit: CONFIG.MAX_URLS,
      includeSubdomains: false,
    });

    console.log(`✓ Discovered ${mapResult.links?.length || 0} total links`);

    // Filter to article URLs only
    const articleUrls = (mapResult.links || [])
      .filter(link => isArticleUrl(link))
      .map(url => ({
        url,
        category: extractCategory(url),
      }));

    console.log(`✓ Filtered to ${articleUrls.length} article URLs\n`);

    return articleUrls;

  } catch (error) {
    console.error('❌ Error during URL discovery:', error);
    throw error;
  }
}

/**
 * Save discovered URLs to JSON
 */
async function saveUrls(urls: DiscoveredUrl[]): Promise<void> {
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  const data = {
    source: 'webflow-help-center',
    discovered_at: new Date().toISOString(),
    start_url: CONFIG.START_URL,
    total_urls: urls.length,
    urls,
  };

  const outputPath = path.join(CONFIG.OUTPUT_DIR, 'discovered-urls.json');
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`💾 Saved ${urls.length} URLs to: ${outputPath}`);
}

/**
 * Print summary statistics
 */
function printSummary(urls: DiscoveredUrl[]): void {
  const byCategory = urls.reduce((acc, url) => {
    acc[url.category || 'unknown'] = (acc[url.category || 'unknown'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 DISCOVERY SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Total article URLs: ${urls.length}`);
  console.log('\nURLs by category:');

  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat.padEnd(15)}: ${count}`);
    });

  console.log('\n✅ Next steps:');
  console.log('  1. Review discovered-urls.json');
  console.log('  2. Run scraper: npx tsx scrape-help-center.ts');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Main function
 */
async function main() {
  try {
    const urls = await discoverUrls();
    await saveUrls(urls);
    printSummary(urls);
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    process.exit(1);
  }
}

main();
