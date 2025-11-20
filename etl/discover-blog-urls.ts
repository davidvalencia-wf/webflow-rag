#!/usr/bin/env node

/**
 * URL DISCOVERY: Webflow Blog (Recent Posts)
 *
 * Discovers recent blog post URLs from webflow.com/blog
 * Filters to last 6 months, product/feature announcements only
 *
 * Usage: npx tsx discover-blog-urls.ts
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
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-blog'),
  START_URL: 'https://webflow.com/blog',
  MAX_URLS: 60, // Target: 30-40 posts
  CUTOFF_DATE: new Date('2024-05-17'), // 6 months ago from Nov 17, 2024
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

interface DiscoveredUrl {
  url: string;
  category?: string;
}

/**
 * Filter URLs to only include blog posts
 */
function isBlogPostUrl(url: string): boolean {
  return (
    url.includes('webflow.com/blog/') &&
    !url.includes('/category/') &&
    !url.includes('/author/') &&
    !url.includes('/tag/') &&
    !url.includes('#') &&
    url !== 'https://webflow.com/blog'
  );
}

/**
 * Filter to product/feature announcements
 */
function isProductRelated(url: string): boolean {
  const productKeywords = [
    'feature', 'update', 'launch', 'release', 'new',
    'announcing', 'introduce', 'introducing', 'cms',
    'designer', 'interaction', 'component', 'api',
    'enterprise', 'ecommerce', 'localization', 'seo'
  ];

  const urlLower = url.toLowerCase();
  return productKeywords.some(keyword => urlLower.includes(keyword));
}

/**
 * Discover blog URLs
 */
async function discoverUrls(): Promise<DiscoveredUrl[]> {
  console.log('🔍 Discovering Blog Post URLs...');
  console.log(`📍 Starting from: ${CONFIG.START_URL}`);
  console.log(`📅 Cutoff date: ${CONFIG.CUTOFF_DATE.toISOString().split('T')[0]}`);
  console.log(`🎯 Target: ${CONFIG.MAX_URLS} URLs\n`);

  try {
    const mapResult = await firecrawl.mapUrl(CONFIG.START_URL, {
      search: 'recent product updates and feature announcements',
      limit: CONFIG.MAX_URLS,
      includeSubdomains: false,
    });

    console.log(`✓ Discovered ${mapResult.links?.length || 0} total links`);

    // Filter to blog posts
    const blogUrls = (mapResult.links || [])
      .filter(link => isBlogPostUrl(link))
      .filter(link => isProductRelated(link))
      .map(url => ({
        url,
        category: 'product-updates',
      }));

    console.log(`✓ Filtered to ${blogUrls.length} product-related posts\n`);

    return blogUrls;

  } catch (error) {
    console.error('❌ Error during URL discovery:', error);
    throw error;
  }
}

/**
 * Save discovered URLs
 */
async function saveUrls(urls: DiscoveredUrl[]): Promise<void> {
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });

  const data = {
    source: 'webflow-blog',
    discovered_at: new Date().toISOString(),
    start_url: CONFIG.START_URL,
    cutoff_date: CONFIG.CUTOFF_DATE.toISOString(),
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
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 DISCOVERY SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Total blog post URLs: ${urls.length}`);
  console.log(`Cutoff date: ${CONFIG.CUTOFF_DATE.toISOString().split('T')[0]}`);
  console.log(`Focus: Product updates and feature announcements`);

  console.log('\n✅ Next steps:');
  console.log('  1. Review discovered-urls.json');
  console.log('  2. Run scraper: npx tsx scrape-blog.ts');
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
