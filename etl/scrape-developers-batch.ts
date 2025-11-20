#!/usr/bin/env node
/**
 * Batch Scraper for developers.webflow.com
 *
 * Scrapes all URLs discovered in curated-developers-webflow-urls.json
 * Features:
 * - Batch processing with progress tracking
 * - Checkpoint/resume capability
 * - Exponential backoff retry logic
 * - Rate limiting (500ms between requests)
 * - Detailed logging
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a4d8c85daaa724b13885f',
  URL_LIST_FILE: path.join(__dirname, 'curated-developers-webflow-urls.json'),
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-developers'),
  ARTICLES_DIR: path.join(__dirname, 'input/webflow-developers/articles'),
  CHECKPOINT_FILE: path.join(__dirname, 'input/webflow-developers/scrape-checkpoint.json'),
  BATCH_SIZE: 50,
  RETRY_ATTEMPTS: 2,
  RATE_LIMIT_DELAY: 500, // 500ms between requests
};

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

// ==========================================
// Types
// ==========================================

interface URLListData {
  source: string;
  total_urls: number;
  urls: string[];
}

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
  checkpoint: {
    completed: string[];
    failed: string[];
    lastBatch: number;
  };
}

// ==========================================
// Utility Functions
// ==========================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateSlug(url: string): string {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);
  return pathParts.join('-').replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').toLowerCase();
}

function cleanMarkdown(content: string): string {
  return content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+$/gm, '')
    .trim();
}

async function loadCheckpoint(): Promise<ScraperState['checkpoint'] | null> {
  try {
    const data = await fs.readFile(CONFIG.CHECKPOINT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function saveCheckpoint(checkpoint: ScraperState['checkpoint']): Promise<void> {
  await fs.writeFile(CONFIG.CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
}

// ==========================================
// Scraping Logic
// ==========================================

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

    const markdown = cleanMarkdown(result.markdown);
    const wordCount = markdown.split(/\s+/).length;
    const charCount = markdown.length;

    // Add YAML front matter
    const frontMatter = `---
source: webflow-developers
category: general
url: ${url}
title: "${result.metadata?.title || slug}"
published: ${new Date().toISOString().split('T')[0]}
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

    return {
      url,
      slug,
      file: '',
      scraped: false,
      error: errorMessage,
    };
  }
}

// ==========================================
// Batch Processing
// ==========================================

async function processBatch(
  urls: string[],
  batchNumber: number,
  totalBatches: number,
  state: ScraperState
): Promise<void> {
  const startIdx = (batchNumber - 1) * CONFIG.BATCH_SIZE + 1;
  const endIdx = Math.min(batchNumber * CONFIG.BATCH_SIZE, urls.length);

  console.log(`\n━━━ BATCH ${batchNumber}/${totalBatches} (URLs ${startIdx}-${endIdx}) ━━━\n`);

  for (const url of urls) {
    // Skip if already completed
    if (state.checkpoint.completed.includes(url)) {
      console.log(`[${new Date().toISOString()}] ⏭️  Skipping (already scraped): ${url}`);
      continue;
    }

    const slug = generateSlug(url);
    const article = await scrapeArticle(url, slug);
    state.articles.push(article);
    state.totalCreditsUsed += 1;

    if (article.scraped) {
      state.checkpoint.completed.push(url);
    } else {
      state.checkpoint.failed.push(url);
      state.failures.push({
        url,
        slug,
        error: article.error || 'Unknown error',
        timestamp: new Date().toISOString(),
      });
    }

    // Rate limiting
    await sleep(CONFIG.RATE_LIMIT_DELAY);
  }

  // Save checkpoint after batch
  state.checkpoint.lastBatch = batchNumber;
  await saveCheckpoint(state.checkpoint);

  console.log(`\n📊 Progress saved: ${state.checkpoint.completed.length}/${urls.length} URLs`);
}

// ==========================================
// Metadata & Logging
// ==========================================

async function saveMetadata(state: ScraperState, totalUrls: number): Promise<void> {
  const metadata = {
    source: 'webflow-developers',
    scraped_at: new Date().toISOString(),
    total_urls: totalUrls,
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
    source: 'webflow-developers',
    started_at: state.startTime.toISOString(),
    completed_at: new Date().toISOString(),
    duration_seconds: Math.floor((Date.now() - state.startTime.getTime()) / 1000),
    total_urls: totalUrls,
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

function printSummary(state: ScraperState, totalUrls: number): void {
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
  console.log(`  Total URLs: ${totalUrls}`);
  console.log(`  Successfully scraped: ${successCount}`);
  console.log(`  Failed: ${state.failures.length} (${((state.failures.length / totalUrls) * 100).toFixed(1)}%)`);
  console.log(`  Firecrawl credits used: ${state.totalCreditsUsed}`);
  console.log(`  Total word count: ~${totalWords.toLocaleString()} words`);
  console.log(`  Average article length: ${avgWords} words`);
  console.log(`  Duration: ${minutes}m ${seconds}s\n`);
  console.log(`📁 Output: ${CONFIG.ARTICLES_DIR}\n`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (state.failures.length > 0) {
    console.log('⚠️  Failed URLs:');
    state.failures.slice(0, 10).forEach(f => {
      console.log(`  - ${f.url}`);
      console.log(`    Error: ${f.error}\n`);
    });
    if (state.failures.length > 10) {
      console.log(`  ... and ${state.failures.length - 10} more (see scrape-log.json)\n`);
    }
  }
}

// ==========================================
// Main Function
// ==========================================

async function main() {
  console.log('🚀 STARTING BATCH SCRAPE: Webflow Developers Documentation');
  console.log(`📅 Started at: ${new Date().toISOString()}\n`);

  // Create output directories
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG.ARTICLES_DIR, { recursive: true });

  // Load URL list
  const urlListContent = await fs.readFile(CONFIG.URL_LIST_FILE, 'utf-8');
  const urlList: URLListData = JSON.parse(urlListContent);
  const urls = urlList.urls || [];

  if (urls.length === 0) {
    console.log('❌ No URLs found in curated list');
    process.exit(1);
  }

  console.log(`📊 Total URLs to scrape: ${urls.length}\n`);

  // Initialize state
  const existingCheckpoint = await loadCheckpoint();
  const state: ScraperState = {
    startTime: new Date(),
    articles: [],
    failures: [],
    totalCreditsUsed: 0,
    checkpoint: existingCheckpoint || {
      completed: [],
      failed: [],
      lastBatch: 0,
    },
  };

  // Resume info
  if (existingCheckpoint) {
    console.log(`📌 Resuming from checkpoint:`);
    console.log(`   Already completed: ${existingCheckpoint.completed.length} URLs`);
    console.log(`   Last batch: ${existingCheckpoint.lastBatch}`);
    console.log(`   Remaining: ${urls.length - existingCheckpoint.completed.length} URLs\n`);
  }

  // Process in batches
  const batches = [];
  for (let i = 0; i < urls.length; i += CONFIG.BATCH_SIZE) {
    batches.push(urls.slice(i, i + CONFIG.BATCH_SIZE));
  }

  for (let i = 0; i < batches.length; i++) {
    // Skip completed batches
    if (i < state.checkpoint.lastBatch) {
      console.log(`⏭️  Skipping batch ${i + 1} (already completed)\n`);
      continue;
    }

    await processBatch(batches[i], i + 1, batches.length, state);
  }

  // Save results
  await saveMetadata(state, urls.length);
  printSummary(state, urls.length);

  // Cleanup checkpoint
  try {
    await fs.unlink(CONFIG.CHECKPOINT_FILE);
  } catch {}
}

// Run
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
