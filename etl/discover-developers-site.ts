#!/usr/bin/env node
/**
 * Site Discovery Script for developers.webflow.com
 *
 * Uses Firecrawl map API to discover all pages on the site
 * Filters out external links, anchors, and duplicates
 * Outputs a curated list of URLs ready for scraping
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a4d8c85daaa724b13885f',
  BASE_URL: 'https://developers.webflow.com/',
  OUTPUT_FILE: path.join(__dirname, 'curated-developers-webflow-urls.json'),
  LIMIT: 1000,
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

async function main() {
  console.log('🗺️  Discovering URLs from developers.webflow.com...\n');
  console.log('=' .repeat(60));

  // Step 1: Map the entire site
  console.log('\n📡 Step 1: Mapping site structure...');
  console.log(`   URL: ${CONFIG.BASE_URL}`);
  console.log(`   Limit: ${CONFIG.LIMIT} pages`);

  const mapResult = await firecrawl.mapUrl(CONFIG.BASE_URL, {
    limit: CONFIG.LIMIT,
    includeSubdomains: false,
  });

  if (!mapResult.success) {
    throw new Error(`Map failed: ${mapResult.error}`);
  }

  const allUrls = mapResult.links || [];
  console.log(`   ✓ Discovered ${allUrls.length} URLs`);

  // Step 2: Filter URLs
  console.log('\n🔍 Step 2: Filtering URLs...');

  const filteredUrls = allUrls.filter(url => {
    // Must start with base URL
    if (!url.startsWith(CONFIG.BASE_URL)) return false;

    // Remove anchors
    if (url.includes('#')) return false;

    // Remove query parameters (except necessary ones)
    const urlObj = new URL(url);
    if (urlObj.search && !urlObj.search.includes('page=')) return false;

    // Exclude external domains
    const externalDomains = ['github.com', 'npmjs.com', 'twitter.com', 'youtube.com'];
    if (externalDomains.some(domain => url.includes(domain))) return false;

    // Exclude non-documentation paths
    const excludePaths = ['/signin', '/signup', '/logout', '/auth', '/login'];
    if (excludePaths.some(path => url.includes(path))) return false;

    return true;
  });

  // Remove duplicates
  const uniqueUrls = [...new Set(filteredUrls)];

  console.log(`   ✓ Filtered to ${uniqueUrls.length} relevant URLs`);
  console.log(`   ✗ Removed ${allUrls.length - uniqueUrls.length} URLs`);

  // Step 3: Categorize by path
  console.log('\n📊 Step 3: Categorizing URLs...');

  const categories = {
    'data-api': uniqueUrls.filter(url => url.includes('/data/')),
    'designer-api': uniqueUrls.filter(url => url.includes('/designer/')),
    'reference': uniqueUrls.filter(url => url.includes('/reference/')),
    'guides': uniqueUrls.filter(url => url.includes('/docs/') || url.includes('/guides/')),
    'changelog': uniqueUrls.filter(url => url.includes('/changelog/')),
    'other': uniqueUrls.filter(url =>
      !url.includes('/data/') &&
      !url.includes('/designer/') &&
      !url.includes('/reference/') &&
      !url.includes('/docs/') &&
      !url.includes('/guides/') &&
      !url.includes('/changelog/')
    ),
  };

  console.log('\n   Category Breakdown:');
  Object.entries(categories).forEach(([category, urls]) => {
    if (urls.length > 0) {
      console.log(`   ${category.padEnd(20)} ${urls.length.toString().padStart(4)} URLs`);
    }
  });

  // Step 4: Save to JSON
  console.log('\n💾 Step 4: Saving URL list...');

  const output = {
    source: 'developers-webflow',
    discovered_at: new Date().toISOString(),
    total_urls: uniqueUrls.length,
    base_url: CONFIG.BASE_URL,
    categories: Object.fromEntries(
      Object.entries(categories).map(([key, urls]) => [key, urls.length])
    ),
    urls: uniqueUrls.sort(),
  };

  await fs.writeFile(CONFIG.OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`   ✓ Saved to ${CONFIG.OUTPUT_FILE}`);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ Discovery Complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   Total discovered: ${allUrls.length}`);
  console.log(`   After filtering: ${uniqueUrls.length}`);
  console.log(`   Ready for scraping: ${uniqueUrls.length} pages`);
  console.log('\n📁 Next steps:');
  console.log(`   1. Review: ${CONFIG.OUTPUT_FILE}`);
  console.log(`   2. Approve the URL list`);
  console.log(`   3. Run batch scraper`);
  console.log('='.repeat(60));
}

main().catch((error) => {
  console.error('\n❌ Discovery failed:', error);
  process.exit(1);
});
