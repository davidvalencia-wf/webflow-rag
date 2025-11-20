#!/usr/bin/env node

/**
 * CUSTOM URL SCRAPER
 *
 * Scrapes any URLs from custom-urls.json using Firecrawl.
 * Perfect for one-off articles, special pages, or ad-hoc content.
 *
 * Usage:
 *   1. Edit custom-urls.json and add your URLs
 *   2. Run: npx tsx scrape-custom-urls.ts
 *
 * Output: etl/input/custom/articles/*.md
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
  URL_LIST_FILE: path.join(__dirname, 'custom-urls.json'),
  OUTPUT_DIR: path.join(__dirname, 'input/custom'),
  ARTICLES_DIR: path.join(__dirname, 'input/custom/articles'),
  BATCH_SIZE: 10,
  RETRY_ATTEMPTS: 2,
  RATE_LIMIT_DELAY: 500, // 500ms between requests
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

interface ArticleData {
  url: string;
  slug: string;
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

// Utility: Sleep function
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility: Generate slug from URL
function generateSlug(url: string): string {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1] || 'page';
  return lastPart.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').toLowerCase();
}

// Utility: Clean markdown content
function cleanMarkdown(content: string): string {
  return content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+$/gm, '')
    .trim();
}

// Scrape single article with retry logic
async function scrapeArticle(url: string, slug: string, attempt = 1): Promise<ArticleData> {
  const maxAttempts = CONFIG.RETRY_ATTEMPTS + 1;

  try {
    console.log(`[${new Date().toISOString()}] Scraping: ${slug}`);

    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
    });

    if (!result.success || !result.markdown) {
      throw new Error(`Scrape failed: ${result.error || 'No markdown content'}`);
    }

    state.totalCreditsUsed += 1;

    const markdown = cleanMarkdown(result.markdown);
    const wordCount = markdown.split(/\s+/).length;
    const charCount = markdown.length;

    // Add YAML front matter
    const frontMatter = `---
source: custom
url: ${url}
scraped_at: ${new Date().toISOString()}
word_count: ${wordCount}
---

`;

    const fullContent = frontMatter + markdown;
    const filename = `${slug}.md`;
    const filepath = path.join(CONFIG.ARTICLES_DIR, filename);

    await fs.writeFile(filepath, fullContent, 'utf-8');

    console.log(`  ✓ Saved: ${filename} (${wordCount} words)`);

    return {
      url,
      slug,
      file: filename,
      scraped: true,
      word_count: wordCount,
      char_count: charCount,
      scraped_at: new Date().toISOString(),
    };

  } catch (error: any) {
    const errorMessage = error?.message || String(error);

    if (attempt < maxAttempts) {
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`  ✗ Error scraping ${slug}: ${errorMessage}`);
      console.log(`  ↻ Retrying... (${maxAttempts - attempt} attempts remaining)`);
      await sleep(delay);
      return scrapeArticle(url, slug, attempt + 1);
    }

    console.log(`  ✗ Failed after ${maxAttempts} attempts: ${errorMessage}`);

    state.failures.push({
      url,
      slug,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });

    return {
      url,
      slug,
      file: '',
      scraped: false,
      error: errorMessage,
    };
  }
}

// Process articles in batches
async function processBatch(urls: string[], batchNumber: number, totalBatches: number) {
  console.log(`\n━━━ BATCH ${batchNumber}/${totalBatches} (Articles ${(batchNumber - 1) * CONFIG.BATCH_SIZE + 1}-${Math.min(batchNumber * CONFIG.BATCH_SIZE, urls.length)}) ━━━\n`);

  for (const url of urls) {
    const slug = generateSlug(url);
    const article = await scrapeArticle(url, slug);
    state.articles.push(article);

    // Rate limiting
    await sleep(CONFIG.RATE_LIMIT_DELAY);
  }
}

// Save metadata and log
async function saveMetadata() {
  const metadata = {
    source: 'custom-webflow-docs',
    scraped_at: new Date().toISOString(),
    total_articles: state.articles.length,
    articles_scraped: state.articles.filter(a => a.scraped).length,
    articles_failed: state.failures.length,
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles.map(a => ({
      url: a.url,
      slug: a.slug,
      file: a.file,
      scraped: a.scraped,
      word_count: a.word_count,
      error: a.error,
    })),
  };

  const scrapeLog = {
    source: 'custom-webflow-docs',
    started_at: state.startTime.toISOString(),
    completed_at: new Date().toISOString(),
    duration_seconds: Math.floor((Date.now() - state.startTime.getTime()) / 1000),
    total_articles: state.articles.length,
    successful: state.articles.filter(a => a.scraped).length,
    failed: state.failures.length,
    firecrawl_credits_used: state.totalCreditsUsed,
    failures: state.failures,
  };

  await fs.writeFile(
    path.join(CONFIG.OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  await fs.writeFile(
    path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json'),
    JSON.stringify(scrapeLog, null, 2)
  );

  console.log(`\n📋 Metadata saved: ${path.join(CONFIG.OUTPUT_DIR, 'metadata.json')}`);
  console.log(`📋 Scrape log saved: ${path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json')}`);
}

// Print summary
function printSummary() {
  const duration = Math.floor((Date.now() - state.startTime.getTime()) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const successCount = state.articles.filter(a => a.scraped).length;
  const totalWords = state.articles
    .filter(a => a.scraped)
    .reduce((sum, a) => sum + (a.word_count || 0), 0);
  const avgWords = successCount > 0 ? Math.floor(totalWords / successCount) : 0;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 SCRAPE COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 Summary:');
  console.log(`  Total URLs: ${state.articles.length}`);
  console.log(`  Successfully scraped: ${successCount}`);
  console.log(`  Failed: ${state.failures.length} (${((state.failures.length / state.articles.length) * 100).toFixed(1)}%)`);
  console.log(`  Firecrawl credits used: ${state.totalCreditsUsed}`);
  console.log(`  Total word count: ~${totalWords.toLocaleString()} words`);
  console.log(`  Average article length: ${avgWords} words`);
  console.log(`  Duration: ${minutes}m ${seconds}s\n`);
  console.log(`📁 Output: ${CONFIG.ARTICLES_DIR}\n`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (state.failures.length > 0) {
    console.log('⚠️  Failed URLs:');
    state.failures.forEach(f => {
      console.log(`  - ${f.url}`);
      console.log(`    Error: ${f.error}\n`);
    });
  }
}

// Main function
async function main() {
  console.log('🚀 STARTING CUSTOM URL SCRAPE');
  console.log(`📅 Started at: ${state.startTime.toISOString()}\n`);

  // Create output directories
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG.ARTICLES_DIR, { recursive: true });

  // Read URL list
  const urlListContent = await fs.readFile(CONFIG.URL_LIST_FILE, 'utf-8');
  const urlList = JSON.parse(urlListContent);
  const urls: string[] = urlList.urls || [];

  if (urls.length === 0) {
    console.log('❌ No URLs found in custom-urls.json');
    console.log('   Please add URLs to the "urls" array and try again.\n');
    process.exit(1);
  }

  console.log(`📊 Total URLs to scrape: ${urls.length}\n`);

  // Process in batches
  const batches = [];
  for (let i = 0; i < urls.length; i += CONFIG.BATCH_SIZE) {
    batches.push(urls.slice(i, i + CONFIG.BATCH_SIZE));
  }

  for (let i = 0; i < batches.length; i++) {
    await processBatch(batches[i], i + 1, batches.length);
  }

  // Save results
  await saveMetadata();
  printSummary();
}

// Run
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
