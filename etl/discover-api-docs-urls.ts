#!/usr/bin/env node

/**
 * URL DISCOVERY: Webflow API Documentation
 *
 * Discovers API documentation URLs from developers.webflow.com
 *
 * Usage: npx tsx discover-api-docs-urls.ts
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
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-api-docs'),
  START_URLS: [
    'https://developers.webflow.com/data/reference',
    'https://developers.webflow.com/data/docs',
  ],
  MAX_URLS: 60, // Target: 30-50 pages
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

interface DiscoveredUrl {
  url: string;
  type: 'reference' | 'guide' | 'example';
}

/**
 * Filter URLs to only include API documentation
 */
function isApiDocUrl(url: string): boolean {
  return (
    url.includes('developers.webflow.com') &&
    (url.includes('/reference') || url.includes('/docs')) &&
    !url.includes('#') &&
    !url.includes('changelog')
  );
}

/**
 * Categorize URL by type
 */
function categorizeUrl(url: string): 'reference' | 'guide' | 'example' {
  if (url.includes('/reference')) return 'reference';
  if (url.includes('/examples')) return 'example';
  return 'guide';
}

/**
 * Discover URLs from multiple start points
 */
async function discoverUrls(): Promise<DiscoveredUrl[]> {
  console.log('🔍 Discovering API Documentation URLs...');
  const allUrls: DiscoveredUrl[] = [];

  for (const startUrl of CONFIG.START_URLS) {
    console.log(`\n📍 Mapping: ${startUrl}`);

    try {
      const mapResult = await firecrawl.mapUrl(startUrl, {
        search: 'API endpoints, guides, and documentation',
        limit: CONFIG.MAX_URLS / 2,
        includeSubdomains: false,
      });

      const urls = (mapResult.links || [])
        .filter(link => isApiDocUrl(link))
        .map(url => ({
          url,
          type: categorizeUrl(url),
        }));

      console.log(`  ✓ Found ${urls.length} documentation URLs`);
      allUrls.push(...urls);

    } catch (error) {
      console.error(`  ✗ Error mapping ${startUrl}:`, error);
    }
  }

  // Deduplicate
  const uniqueUrls = Array.from(
    new Map(allUrls.map(item => [item.url, item])).values()
  );

  console.log(`\n✓ Total unique URLs: ${uniqueUrls.length}\n`);
  return uniqueUrls;
}

/**
 * Save discovered URLs
 */
async function saveUrls(urls: DiscoveredUrl[]): Promise<void> {
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  const data = {
    source: 'webflow-api-docs',
    discovered_at: new Date().toISOString(),
    start_urls: CONFIG.START_URLS,
    total_urls: urls.length,
    urls,
  };

  const outputPath = path.join(CONFIG.OUTPUT_DIR, 'discovered-urls.json');
  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`💾 Saved ${urls.length} URLs to: ${outputPath}`);
}

/**
 * Print summary
 */
function printSummary(urls: DiscoveredUrl[]): void {
  const byType = urls.reduce((acc, url) => {
    acc[url.type] = (acc[url.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 DISCOVERY SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Total API documentation URLs: ${urls.length}`);
  console.log('\nURLs by type:');

  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type.padEnd(15)}: ${count}`);
  });

  console.log('\n✅ Next steps:');
  console.log('  1. Review discovered-urls.json');
  console.log('  2. Run scraper: npx tsx scrape-api-docs.ts');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

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
