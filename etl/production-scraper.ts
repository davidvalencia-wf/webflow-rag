/**
 * PRODUCTION SCRAPER: Comprehensive Multi-Source Scraping
 *
 * This script orchestrates scraping across all Webflow documentation sources:
 * - Webflow University (76 articles)
 * - Webflow API Docs (40 pages)
 * - Webflow Blog (40 posts)
 * - Webflow Updates (106 articles, already scraped)
 *
 * Features:
 * - Uses enhanced scraper infrastructure (retry, rate limiting, checkpointing)
 * - Loads discovered URLs from JSON files
 * - Batch processing with progress reporting
 * - Comprehensive error handling and logging
 * - Resumable from checkpoints
 *
 * Usage:
 *   npx tsx production-scraper.ts --source=all
 *   npx tsx production-scraper.ts --source=webflow-university
 *   npx tsx production-scraper.ts --source=webflow-api-docs --resume
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  scrapeArticleWithRetry,
  saveCheckpoint,
  loadCheckpoint,
  categorizeError,
  ScrapeErrorType,
  type SourceType,
  type ArticleMetadata,
  type ScrapeFailure,
} from './enhanced-scraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a4d8c85daaa724b13885f',
  RATE_LIMIT_DELAY_MS: 500, // 500ms = 2 req/s
  BATCH_SIZE: 10,
  PROGRESS_INTERVAL: 5, // Report progress every 5 articles
};

// ==========================================
// Types
// ==========================================

type DiscoveredUrls = {
  source: string;
  method: string;
  discovered_at: string;
  total_urls: number;
  urls: string[];
};

type ScrapeState = {
  startTime: Date;
  articles: (ArticleMetadata | null)[];
  failures: ScrapeFailure[];
  totalCreditsUsed: number;
  successCount: number;
  failureCount: number;
};

type ScrapeSummary = {
  source: SourceType;
  totalUrls: number;
  successCount: number;
  failureCount: number;
  failureRate: string;
  duration: number;
  creditsUsed: number;
  errorBreakdown: Record<string, number>;
};

// ==========================================
// URL Loading
// ==========================================

async function loadDiscoveredUrls(source: SourceType): Promise<string[]> {
  const urlsPath = path.join(__dirname, 'input', source, 'discovered-urls.json');

  try {
    const data = await fs.readFile(urlsPath, 'utf-8');
    const discovered = JSON.parse(data) as DiscoveredUrls;
    return discovered.urls;
  } catch (error) {
    console.error(`❌ Error loading URLs for ${source}: ${error}`);
    return [];
  }
}

// ==========================================
// Progress Reporting
// ==========================================

async function saveProgress(
  source: SourceType,
  state: ScrapeState,
  totalUrls: number
): Promise<void> {
  const outputDir = path.join(__dirname, 'input', source);
  await fs.mkdir(outputDir, { recursive: true });

  const metadata = {
    source,
    scraped_at: state.startTime.toISOString(),
    total_articles_discovered: totalUrls,
    total_articles_scraped: state.successCount,
    failed_articles: state.failureCount,
    failure_rate: ((state.failureCount / totalUrls) * 100).toFixed(1) + '%',
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles.filter((a) => a !== null),
    failures: state.failures,
  };

  const metadataPath = path.join(outputDir, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
}

async function saveScrapeLog(
  source: SourceType,
  state: ScrapeState,
  totalUrls: number
): Promise<void> {
  const endTime = new Date();
  const duration = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);

  const errorBreakdown = state.failures.reduce(
    (acc, f) => {
      acc[f.errorType] = (acc[f.errorType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const log = {
    source,
    started_at: state.startTime.toISOString(),
    completed_at: endTime.toISOString(),
    duration_seconds: duration,
    articles_attempted: totalUrls,
    articles_succeeded: state.successCount,
    articles_failed: state.failureCount,
    failure_rate: ((state.failureCount / totalUrls) * 100).toFixed(1) + '%',
    error_breakdown: errorBreakdown,
    failures: state.failures,
    credits_used: state.totalCreditsUsed,
  };

  const outputDir = path.join(__dirname, 'input', source);
  const logPath = path.join(outputDir, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');

  return;
}

function printProgressReport(
  source: SourceType,
  state: ScrapeState,
  totalUrls: number,
  current: number
): void {
  const progress = ((current / totalUrls) * 100).toFixed(1);
  const elapsed = Math.floor((Date.now() - state.startTime.getTime()) / 1000);
  const rate = current / elapsed || 0;
  const remaining = totalUrls - current;
  const eta = remaining / rate || 0;

  console.log(`\n📊 Progress Report (${source})`);
  console.log(`   Progress: ${current}/${totalUrls} (${progress}%)`);
  console.log(`   Success: ${state.successCount} | Failures: ${state.failureCount}`);
  console.log(`   Elapsed: ${elapsed}s | Rate: ${rate.toFixed(2)} articles/s`);
  console.log(`   ETA: ${Math.floor(eta / 60)}m ${Math.floor(eta % 60)}s`);
  console.log(`   Credits used: ${state.totalCreditsUsed}`);
}

// ==========================================
// Scraping Logic
// ==========================================

async function scrapeSource(
  source: SourceType,
  urls: string[],
  resume: boolean = false
): Promise<ScrapeSummary> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 STARTING SCRAPE: ${source}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`📊 Total URLs: ${urls.length}`);
  console.log(`⚙️  Rate limit: ${1000 / CONFIG.RATE_LIMIT_DELAY_MS} req/s`);
  console.log(`⚙️  Retry strategy: Exponential backoff (3 attempts)`);

  const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

  // Initialize state
  const state: ScrapeState = {
    startTime: new Date(),
    articles: [],
    failures: [],
    totalCreditsUsed: 0,
    successCount: 0,
    failureCount: 0,
  };

  // Check for checkpoint
  let startIndex = 0;
  if (resume) {
    const checkpoint = await loadCheckpoint(source);
    if (checkpoint) {
      console.log(`\n📍 Resuming from checkpoint:`);
      console.log(`   Last successful: ${checkpoint.lastSuccessfulSlug}`);
      console.log(`   Success count: ${checkpoint.successCount}`);
      console.log(`   Failure count: ${checkpoint.failureCount}`);

      // Find index of last successful URL
      startIndex = urls.findIndex((url) => url === checkpoint.lastSuccessfulUrl) + 1;
      state.successCount = checkpoint.successCount;
      state.failureCount = checkpoint.failureCount;
    } else {
      console.log(`\n⚠️  No checkpoint found, starting fresh`);
    }
  }

  // Process URLs in batches
  for (let i = startIndex; i < urls.length; i += CONFIG.BATCH_SIZE) {
    const batch = urls.slice(i, i + CONFIG.BATCH_SIZE);
    const batchNumber = Math.floor(i / CONFIG.BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / CONFIG.BATCH_SIZE);

    console.log(
      `\n━━━ BATCH ${batchNumber}/${totalBatches} (Articles ${i + 1}-${Math.min(i + CONFIG.BATCH_SIZE, urls.length)}) ━━━`
    );

    // Scrape batch sequentially with rate limiting
    for (let j = 0; j < batch.length; j++) {
      const url = batch[j];
      const currentIndex = i + j;

      try {
        const articleData = await scrapeArticleWithRetry(firecrawl, url, source);
        state.articles.push(articleData);
        state.successCount++;

        // Estimate credits used (1 per scrape)
        state.totalCreditsUsed++;

        // Save checkpoint after each success
        await saveCheckpoint(source, url, articleData.slug, state.successCount, state.failureCount);
      } catch (error: any) {
        const errorType = error.errorType || categorizeError(error);
        const errorMessage = error.message || String(error);

        state.articles.push(null);
        state.failureCount++;

        const failure: ScrapeFailure = {
          url,
          slug: url.split('/').pop() || 'unknown',
          error: errorMessage,
          errorType,
          timestamp: new Date().toISOString(),
          retryCount: error.retryCount || 0,
        };

        state.failures.push(failure);

        console.log(`    ❌ FAILED: ${failure.slug} (${errorType})`);

        // Stop if we hit insufficient credits
        if (errorType === ScrapeErrorType.INSUFFICIENT_CREDITS) {
          console.log(`\n⚠️  INSUFFICIENT CREDITS - Stopping scrape for ${source}`);
          break;
        }
      }

      // Rate limiting: wait between requests
      if (j < batch.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONFIG.RATE_LIMIT_DELAY_MS));
      }

      // Progress report every N articles
      if ((currentIndex + 1) % CONFIG.PROGRESS_INTERVAL === 0) {
        printProgressReport(source, state, urls.length, currentIndex + 1);
      }
    }

    // Save progress after each batch
    await saveProgress(source, state, urls.length);
  }

  // Save final scrape log
  await saveScrapeLog(source, state, urls.length);

  // Calculate summary
  const endTime = new Date();
  const duration = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);

  const errorBreakdown = state.failures.reduce(
    (acc, f) => {
      acc[f.errorType] = (acc[f.errorType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const summary: ScrapeSummary = {
    source,
    totalUrls: urls.length,
    successCount: state.successCount,
    failureCount: state.failureCount,
    failureRate: ((state.failureCount / urls.length) * 100).toFixed(1) + '%',
    duration,
    creditsUsed: state.totalCreditsUsed,
    errorBreakdown,
  };

  // Print final summary
  printSummary(summary, state);

  return summary;
}

function printSummary(summary: ScrapeSummary, state: ScrapeState): void {
  const totalWords = state.articles
    .filter((a) => a !== null)
    .reduce((sum, a) => sum + (a?.word_count || 0), 0);
  const avgWords = totalWords / summary.successCount || 0;

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ SCRAPE COMPLETE: ${summary.source}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total URLs: ${summary.totalUrls}`);
  console.log(`   Successfully scraped: ${summary.successCount}`);
  console.log(`   Failed: ${summary.failureCount}`);
  console.log(`   Failure rate: ${summary.failureRate}`);
  console.log(`   Duration: ${Math.floor(summary.duration / 60)}m ${summary.duration % 60}s`);
  console.log(`   Credits used: ${summary.creditsUsed}`);
  console.log(`   Total words: ~${totalWords.toLocaleString()}`);
  console.log(`   Avg article length: ${Math.floor(avgWords)} words`);

  if (Object.keys(summary.errorBreakdown).length > 0) {
    console.log(`\n⚠️  Error Breakdown:`);
    Object.entries(summary.errorBreakdown).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });
  }

  console.log(`\n📁 Output Location:`);
  console.log(`   ${path.join(__dirname, 'input', summary.source, 'articles')}`);
  console.log(`${'='.repeat(60)}\n`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));
  const resume = args.includes('--resume');

  if (!sourceArg) {
    console.error('❌ Error: --source argument required');
    console.log('\nUsage:');
    console.log('  npx tsx production-scraper.ts --source=all');
    console.log('  npx tsx production-scraper.ts --source=webflow-university');
    console.log('  npx tsx production-scraper.ts --source=webflow-api-docs --resume');
    console.log('  npx tsx production-scraper.ts --source=webflow-blog');
    process.exit(1);
  }

  const sourceInput = sourceArg.split('=')[1];

  // Define source priority order
  const sources: SourceType[] =
    sourceInput === 'all'
      ? ['webflow-university', 'webflow-api-docs', 'webflow-blog']
      : [sourceInput as SourceType];

  console.log('\n' + '='.repeat(60));
  console.log('🚀 PRODUCTION SCRAPER: Webflow Documentation');
  console.log('='.repeat(60));
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🎯 Sources to scrape: ${sources.join(', ')}`);
  console.log(`⚙️  Resume mode: ${resume ? 'enabled' : 'disabled'}`);
  console.log('='.repeat(60));

  const summaries: ScrapeSummary[] = [];

  // Scrape each source sequentially
  for (const source of sources) {
    const urls = await loadDiscoveredUrls(source);

    if (urls.length === 0) {
      console.log(`\n⚠️  No URLs found for ${source}, skipping...`);
      continue;
    }

    const summary = await scrapeSource(source, urls, resume);
    summaries.push(summary);

    // Wait between sources to avoid rate limits
    if (sources.indexOf(source) < sources.length - 1) {
      console.log('\n⏳ Waiting 10 seconds before next source...\n');
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  // Print final overall summary
  printOverallSummary(summaries);
}

function printOverallSummary(summaries: ScrapeSummary[]): void {
  const totalUrls = summaries.reduce((sum, s) => sum + s.totalUrls, 0);
  const totalSuccess = summaries.reduce((sum, s) => sum + s.successCount, 0);
  const totalFailures = summaries.reduce((sum, s) => sum + s.failureCount, 0);
  const totalCredits = summaries.reduce((sum, s) => sum + s.creditsUsed, 0);
  const totalDuration = summaries.reduce((sum, s) => sum + s.duration, 0);

  console.log('\n' + '='.repeat(60));
  console.log('🎉 OVERALL SUMMARY: All Sources');
  console.log('='.repeat(60));
  console.log(`\n📊 Aggregate Statistics:`);
  console.log(`   Total URLs processed: ${totalUrls}`);
  console.log(`   Successfully scraped: ${totalSuccess}`);
  console.log(`   Failed: ${totalFailures}`);
  console.log(`   Overall failure rate: ${((totalFailures / totalUrls) * 100).toFixed(1)}%`);
  console.log(`   Total duration: ${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`);
  console.log(`   Total Firecrawl credits: ${totalCredits}`);
  console.log(`   Credits remaining: ~${500 - totalCredits}/500`);

  console.log(`\n📋 Per-Source Breakdown:`);
  summaries.forEach((s) => {
    console.log(`   ${s.source}: ${s.successCount}/${s.totalUrls} (${s.failureRate} failure)`);
  });

  console.log(`\n✅ Next Steps:`);
  console.log(`   1. Run chunker: cd etl && npx tsx chunker.ts`);
  console.log(`   2. Generate embeddings: npx tsx embedder.ts`);
  console.log(`   3. Upload to Pinecone: npx tsx uploader.ts`);
  console.log(`   4. Validate counts: npx tsx validate.ts`);
  console.log('\n' + '='.repeat(60) + '\n');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}
