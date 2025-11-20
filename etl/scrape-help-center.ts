#!/usr/bin/env node

/**
 * PRODUCTION SCRAPER: Webflow Help Center Articles
 *
 * Scrapes help center articles using Firecrawl with comprehensive error handling,
 * retry logic, and incremental progress saving.
 *
 * Usage: npx tsx scrape-help-center.ts
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a4d8c85daaa724b13885f',
  URL_LIST_FILE: path.join(__dirname, 'curated-help-center-urls.json'),
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-help-center'),
  ARTICLES_DIR: path.join(__dirname, 'input/webflow-help-center/articles'),
  BATCH_SIZE: 10,
  RETRY_ATTEMPTS: 2,
  RATE_LIMIT_DELAY: 500, // 500ms between requests (2 req/second)
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

interface ArticleData {
  url: string;
  slug: string;
  title: string;
  category?: string;
  file: string;
  scraped: boolean;
  word_count?: number;
  char_count?: number;
  scraped_at?: string;
  error?: string;
}

interface ScraperState {
  startTime: Date;
  articles: ArticleData[];
  failures: Array<{ url: string; slug: string; error: string; timestamp: string }>;
  totalCreditsUsed: number;
}

const state: ScraperState = {
  startTime: new Date(),
  articles: [],
  failures: [],
  totalCreditsUsed: 0,
};

/**
 * Load URLs from curated list
 */
async function loadUrls(): Promise<string[]> {
  const content = await fs.readFile(CONFIG.URL_LIST_FILE, 'utf-8');
  const data = JSON.parse(content);
  return data.urls;
}

/**
 * Extract article slug from URL
 */
function getSlugFromUrl(url: string): string {
  // Extract article ID and slug from pattern: /articles/{id}-{slug}
  const match = url.match(/\/articles\/(\d+)-(.+?)(?:\?|$)/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  // Fallback: use last path segment
  const parts = url.split('/').filter(p => p);
  return parts[parts.length - 1] || 'unknown';
}

/**
 * Clean markdown content
 */
function cleanMarkdown(markdown: string): string {
  let cleaned = markdown;

  // Remove navigation elements
  cleaned = cleaned.replace(/\[Skip to Main Content\].*?\n\n/gs, '');
  cleaned = cleaned.replace(/Sign in.*?Submit a request.*?\n\n/gs, '');

  // Remove footer sections
  cleaned = cleaned.replace(/Was this article helpful\?.*$/gs, '');
  cleaned = cleaned.replace(/Related articles.*$/gs, '');

  // Remove excessive newlines
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  return cleaned.trim();
}

/**
 * Generate YAML front matter
 */
function generateFrontMatter(url: string, title: string, category: string): string {
  return `---
source: webflow-help-center
category: ${category}
url: ${url}
title: "${title.replace(/"/g, '\\"')}"
published: ${new Date().toISOString().split('T')[0]}
---

`;
}

/**
 * Scrape a single article with retry logic
 */
async function scrapeArticle(url: string, retries = CONFIG.RETRY_ATTEMPTS): Promise<ArticleData | null> {
  const slug = getSlugFromUrl(url);
  console.log(`\n[${new Date().toISOString()}] Scraping: ${slug}`);

  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 5000,
    });

    if (!result.markdown) {
      throw new Error('No markdown content returned');
    }

    const metadata = result.metadata || {};
    const cleanedMarkdown = cleanMarkdown(result.markdown);
    const title = metadata['og:title'] || metadata.title || slug;
    const category = extractCategory(url);

    // Add YAML front matter
    const fullMarkdown = generateFrontMatter(url, title, category) + cleanedMarkdown;

    // Calculate metrics
    const wordCount = cleanedMarkdown.split(/\s+/).length;
    const charCount = cleanedMarkdown.length;

    // Save markdown file
    const filePath = path.join(CONFIG.ARTICLES_DIR, `${slug}.md`);
    await fs.writeFile(filePath, fullMarkdown, 'utf-8');

    console.log(`  ✓ Saved: ${slug}.md (${wordCount} words)`);

    // Track credits
    const creditsUsed = 1; // Assume 1 credit per scrape
    state.totalCreditsUsed += creditsUsed;

    return {
      url,
      slug,
      title,
      category,
      file: `articles/${slug}.md`,
      scraped: true,
      word_count: wordCount,
      char_count: charCount,
      scraped_at: new Date().toISOString(),
    };

  } catch (error: any) {
    console.error(`  ✗ Error scraping ${slug}: ${error.message}`);

    if (retries > 0) {
      console.log(`  ↻ Retrying... (${retries} attempts remaining)`);
      await sleep(2000);
      return scrapeArticle(url, retries - 1);
    }

    // Log failure
    state.failures.push({
      url,
      slug,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return {
      url,
      slug,
      title: slug,
      file: '',
      scraped: false,
      error: error.message,
    };
  }
}

/**
 * Extract category from URL
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
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Save progress incrementally
 */
async function saveProgress(urls: string[]): Promise<void> {
  const metadata = {
    source: 'webflow-help-center',
    scraped_at: state.startTime.toISOString(),
    total_articles_discovered: urls.length,
    total_articles_scraped: state.articles.filter(a => a.scraped).length,
    failed_articles: state.failures.length,
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles,
  };

  const metadataPath = path.join(CONFIG.OUTPUT_DIR, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`\n📊 Progress saved: ${metadata.total_articles_scraped}/${urls.length} articles`);
}

/**
 * Save final scrape log
 */
async function saveScrapeLog(urls: string[]): Promise<void> {
  const endTime = new Date();
  const duration = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);

  const log = {
    started_at: state.startTime.toISOString(),
    completed_at: endTime.toISOString(),
    duration_seconds: duration,
    articles_attempted: urls.length,
    articles_succeeded: state.articles.filter(a => a.scraped).length,
    articles_failed: state.failures.length,
    failures: state.failures,
    credits_used: state.totalCreditsUsed,
  };

  const logPath = path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');
  console.log(`\n📋 Scrape log saved: ${logPath}`);
}

/**
 * Main scraper function
 */
async function main() {
  console.log('🚀 STARTING PRODUCTION SCRAPE: Webflow Help Center');
  console.log(`📅 Started at: ${state.startTime.toISOString()}\n`);

  // Ensure output directories exist
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG.ARTICLES_DIR, { recursive: true });

  // Load URLs
  const urls = await loadUrls();
  console.log(`📊 Total articles to scrape: ${urls.length}\n`);

  // Process articles in batches
  for (let i = 0; i < urls.length; i += CONFIG.BATCH_SIZE) {
    const batch = urls.slice(i, i + CONFIG.BATCH_SIZE);
    const batchNumber = Math.floor(i / CONFIG.BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / CONFIG.BATCH_SIZE);

    console.log(`\n━━━ BATCH ${batchNumber}/${totalBatches} (Articles ${i + 1}-${Math.min(i + CONFIG.BATCH_SIZE, urls.length)}) ━━━`);

    // Scrape batch sequentially
    for (const url of batch) {
      const articleData = await scrapeArticle(url);
      if (articleData) {
        state.articles.push(articleData);
      }

      // Rate limiting
      await sleep(CONFIG.RATE_LIMIT_DELAY);
    }

    // Save progress after each batch
    await saveProgress(urls);
  }

  // Save final log
  await saveScrapeLog(urls);

  // Print summary
  printSummary(urls);
}

/**
 * Print final summary
 */
function printSummary(urls: string[]) {
  const successCount = state.articles.filter(a => a.scraped).length;
  const failureCount = state.failures.length;
  const totalWords = state.articles
    .filter(a => a.scraped && a.word_count)
    .reduce((sum, a) => sum + (a.word_count || 0), 0);
  const avgWords = successCount > 0 ? Math.floor(totalWords / successCount) : 0;
  const duration = Math.floor((new Date().getTime() - state.startTime.getTime()) / 1000);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 SCRAPE COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📊 Summary:`);
  console.log(`  Total articles: ${urls.length}`);
  console.log(`  Successfully scraped: ${successCount}`);
  console.log(`  Failed: ${failureCount} (${((failureCount / urls.length) * 100).toFixed(1)}%)`);
  console.log(`  Firecrawl credits used: ${state.totalCreditsUsed}`);
  console.log(`  Total word count: ~${totalWords.toLocaleString()} words`);
  console.log(`  Average article length: ${avgWords} words`);
  console.log(`  Duration: ${Math.floor(duration / 60)}m ${duration % 60}s`);
  console.log(`\n📁 Output: ${CONFIG.ARTICLES_DIR}`);

  if (failureCount > 0) {
    console.log('\n⚠️  Failed Articles:');
    state.failures.slice(0, 10).forEach(f => {
      console.log(`  - ${f.slug}: ${f.error}`);
    });
    if (failureCount > 10) {
      console.log(`  ... and ${failureCount - 10} more`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run the scraper
main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});
