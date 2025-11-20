/**
 * HTTP-Based Scraper for Webflow RAG (Firecrawl-free)
 *
 * Uses axios + cheerio + turndown for scraping without external API costs.
 *
 * Features:
 * - Exponential backoff retry (3 attempts: 1s, 2s, 4s)
 * - Rate limiting (max 2 requests/second)
 * - Progress checkpointing
 * - Error categorization
 * - HTML to Markdown conversion
 * - YAML front matter
 *
 * Usage:
 *   npx tsx http-scraper.ts --source=webflow-university
 *   npx tsx http-scraper.ts --source=webflow-api-docs
 *   npx tsx http-scraper.ts --source=webflow-blog
 *   npx tsx http-scraper.ts --source=webflow-updates --resume
 */

import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000,
  RATE_LIMIT_DELAY_MS: 500, // 2 req/s
  TIMEOUT_MS: 30000,
  USER_AGENT:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

enum ScrapeErrorType {
  RATE_LIMIT = 'rate_limit',
  NOT_FOUND = 'not_found',
  TIMEOUT = 'timeout',
  PARSE_ERROR = 'parse_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN = 'unknown',
}

type SourceType = 'webflow-university' | 'webflow-api-docs' | 'webflow-blog' | 'webflow-updates';

type ArticleMetadata = {
  url: string;
  slug: string;
  title: string;
  publishDate: string | null;
  description: string;
  category: string | null;
  file: string;
  scraped: boolean;
  word_count: number;
  char_count: number;
  scraped_at: string;
};

type ScrapeFailure = {
  url: string;
  slug: string;
  error: string;
  errorType: ScrapeErrorType;
  timestamp: string;
  retryCount: number;
};

type Checkpoint = {
  source: string;
  lastSuccessfulUrl: string;
  successCount: number;
  failureCount: number;
  timestamp: string;
};

type ScrapeState = {
  startTime: Date;
  articles: ArticleMetadata[];
  failures: ScrapeFailure[];
  successCount: number;
  failureCount: number;
};

// ==========================================
// Utility Functions
// ==========================================

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSlugFromUrl(url: string): string {
  const parts = url.split('/').filter((p) => p.length > 0);
  return parts[parts.length - 1] || 'unknown';
}

function categorizeError(error: any): ScrapeErrorType {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 429) return ScrapeErrorType.RATE_LIMIT;
    if (status === 404) return ScrapeErrorType.NOT_FOUND;
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return ScrapeErrorType.TIMEOUT;
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return ScrapeErrorType.NETWORK_ERROR;
    }
  }

  const message = error.message || String(error);
  if (message.toLowerCase().includes('parse') || message.toLowerCase().includes('content too short')) {
    return ScrapeErrorType.PARSE_ERROR;
  }

  return ScrapeErrorType.UNKNOWN;
}

// ==========================================
// HTML to Markdown Conversion
// ==========================================

function extractMainContent($: cheerio.CheerioAPI): string {
  // Remove unwanted elements
  $('script, style, nav, header, footer, .cookie-banner, .nav, .navigation').remove();

  // Try to find main content area (common patterns)
  let content =
    $('main').html() ||
    $('article').html() ||
    $('[role="main"]').html() ||
    $('.content').html() ||
    $('.main-content').html() ||
    $('body').html() ||
    '';

  return content;
}

function htmlToMarkdown(html: string): string {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  // Custom rules
  turndownService.addRule('removeComments', {
    filter: (node) => node.nodeType === 8, // Comment node
    replacement: () => '',
  });

  turndownService.addRule('cleanImages', {
    filter: 'img',
    replacement: (content, node: any) => {
      const alt = node.getAttribute('alt') || '';
      const src = node.getAttribute('src') || '';
      return alt ? `![${alt}](${src})` : '';
    },
  });

  const markdown = turndownService.turndown(html);

  // Clean up excessive whitespace
  return markdown
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function extractMetadata($: cheerio.CheerioAPI): Record<string, string> {
  const metadata: Record<string, string> = {};

  // Extract meta tags
  $('meta').each((_, elem) => {
    const property = $(elem).attr('property') || $(elem).attr('name');
    const content = $(elem).attr('content');

    if (property && content) {
      metadata[property] = content;
    }
  });

  // Extract title
  metadata.title = $('title').text() || metadata['og:title'] || '';

  return metadata;
}

// ==========================================
// Scraping Logic
// ==========================================

async function scrapeArticleWithRetry(
  url: string,
  sourceType: SourceType,
  retryCount = 0
): Promise<ArticleMetadata> {
  const slug = getSlugFromUrl(url);

  try {
    console.log(`  [Attempt ${retryCount + 1}/${CONFIG.MAX_RETRIES}] ${slug}`);

    const response = await axios.get(url, {
      timeout: CONFIG.TIMEOUT_MS,
      headers: {
        'User-Agent': CONFIG.USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract metadata
    const metadata = extractMetadata($);

    // Extract and convert main content
    const mainContentHtml = extractMainContent($);
    if (!mainContentHtml || mainContentHtml.length < 100) {
      throw new Error('Content extraction failed: too short');
    }

    const markdown = htmlToMarkdown(mainContentHtml);

    // Validate content
    const wordCount = markdown.split(/\s+/).length;
    if (wordCount < 50) {
      throw new Error(`Content too short: ${wordCount} words`);
    }

    const charCount = markdown.length;

    // Determine category and publish date
    const category = sourceType.replace('webflow-', '');
    const publishDate = metadata['article:published_time']
      ? new Date(metadata['article:published_time']).toISOString().split('T')[0]
      : null;

    const articleData: ArticleMetadata = {
      url,
      slug,
      title: metadata.title || metadata['og:title'] || slug.replace(/-/g, ' '),
      publishDate,
      description: metadata.description || metadata['og:description'] || '',
      category,
      file: `articles/${slug}.md`,
      scraped: true,
      word_count: wordCount,
      char_count: charCount,
      scraped_at: new Date().toISOString(),
    };

    // Create markdown with YAML front matter
    const frontMatter = `---
source: ${sourceType}
category: ${category}
url: ${url}
title: "${articleData.title.replace(/"/g, '\\"')}"
${publishDate ? `published: ${publishDate}` : ''}
---

`;

    const finalMarkdown = frontMatter + markdown;

    // Save file
    const outputDir = path.join(__dirname, 'input', sourceType, 'articles');
    await fs.mkdir(outputDir, { recursive: true });

    const filePath = path.join(outputDir, `${slug}.md`);
    await fs.writeFile(filePath, finalMarkdown, 'utf-8');

    console.log(`    ✓ ${slug}.md (${wordCount} words)`);

    // Rate limiting
    await sleep(CONFIG.RATE_LIMIT_DELAY_MS);

    return articleData;
  } catch (error: any) {
    const errorType = categorizeError(error);
    const errorMessage = error.message || String(error);

    const shouldRetry =
      retryCount < CONFIG.MAX_RETRIES - 1 &&
      (errorType === ScrapeErrorType.RATE_LIMIT ||
        errorType === ScrapeErrorType.TIMEOUT ||
        errorType === ScrapeErrorType.NETWORK_ERROR);

    if (shouldRetry) {
      const delayMs =
        errorType === ScrapeErrorType.RATE_LIMIT
          ? CONFIG.BASE_DELAY_MS * Math.pow(2, retryCount + 2)
          : CONFIG.BASE_DELAY_MS * Math.pow(2, retryCount);

      console.log(`    ⚠️  ${errorType}: Retrying in ${delayMs / 1000}s...`);
      await sleep(delayMs);
      return scrapeArticleWithRetry(url, sourceType, retryCount + 1);
    }

    const categorizedError = new Error(errorMessage);
    (categorizedError as any).errorType = errorType;
    (categorizedError as any).retryCount = retryCount;
    throw categorizedError;
  }
}

// ==========================================
// Checkpoint Management
// ==========================================

async function loadCheckpoint(source: SourceType): Promise<Checkpoint | null> {
  const checkpointPath = path.join(__dirname, 'checkpoints', `${source}.json`);
  try {
    const data = await fs.readFile(checkpointPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}

async function saveCheckpoint(
  source: SourceType,
  lastUrl: string,
  successCount: number,
  failureCount: number
): Promise<void> {
  const checkpointDir = path.join(__dirname, 'checkpoints');
  await fs.mkdir(checkpointDir, { recursive: true });

  const checkpoint: Checkpoint = {
    source,
    lastSuccessfulUrl: lastUrl,
    successCount,
    failureCount,
    timestamp: new Date().toISOString(),
  };

  const checkpointPath = path.join(checkpointDir, `${source}.json`);
  await fs.writeFile(checkpointPath, JSON.stringify(checkpoint, null, 2), 'utf-8');
}

async function saveProgress(source: SourceType, state: ScrapeState, totalUrls: number): Promise<void> {
  const outputDir = path.join(__dirname, 'input', source);
  await fs.mkdir(outputDir, { recursive: true });

  const metadata = {
    source,
    scraped_at: state.startTime.toISOString(),
    total_articles_discovered: totalUrls,
    total_articles_scraped: state.successCount,
    failed_articles: state.failureCount,
    success_rate: `${((state.successCount / totalUrls) * 100).toFixed(1)}%`,
    articles: state.articles,
    failures: state.failures,
  };

  const metadataPath = path.join(outputDir, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
}

async function saveScrapeLog(source: SourceType, state: ScrapeState, totalUrls: number): Promise<void> {
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
    success_rate: `${((state.successCount / totalUrls) * 100).toFixed(1)}%`,
    error_breakdown: errorBreakdown,
    failures: state.failures,
  };

  const outputDir = path.join(__dirname, 'input', source);
  const logPath = path.join(outputDir, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));
  const resume = args.includes('--resume');

  if (!sourceArg) {
    console.error('❌ Error: --source argument required\n');
    console.log('Usage:');
    console.log('  npx tsx http-scraper.ts --source=webflow-university');
    console.log('  npx tsx http-scraper.ts --source=webflow-api-docs');
    console.log('  npx tsx http-scraper.ts --source=webflow-blog');
    console.log('  npx tsx http-scraper.ts --source=webflow-updates --resume');
    process.exit(1);
  }

  const source = sourceArg.split('=')[1] as SourceType;

  console.log(`\n🚀 HTTP Scraper: ${source}`);
  console.log(`📅 Started: ${new Date().toISOString()}`);

  // Load URLs
  const urlsPath = path.join(__dirname, 'input', source, 'discovered-urls.json');
  let urlsData: { urls: string[] };

  try {
    const data = await fs.readFile(urlsPath, 'utf-8');
    urlsData = JSON.parse(data);
  } catch {
    console.error(`\n❌ Error: URL list not found at ${urlsPath}`);
    console.log('Run: npx tsx manual-url-lists.ts --source=' + source);
    process.exit(1);
  }

  const urls = urlsData.urls;
  console.log(`📊 Total URLs: ${urls.length}\n`);

  // Initialize state
  const state: ScrapeState = {
    startTime: new Date(),
    articles: [],
    failures: [],
    successCount: 0,
    failureCount: 0,
  };

  // Load checkpoint if resuming
  let startIndex = 0;
  if (resume) {
    const checkpoint = await loadCheckpoint(source);
    if (checkpoint) {
      startIndex = urls.findIndex((u) => u === checkpoint.lastSuccessfulUrl) + 1;
      state.successCount = checkpoint.successCount;
      state.failureCount = checkpoint.failureCount;
      console.log(`📍 Resuming from URL #${startIndex + 1}\n`);
    }
  }

  // Scrape articles
  for (let i = startIndex; i < urls.length; i++) {
    const url = urls[i];
    const progress = `[${i + 1}/${urls.length}]`;

    console.log(`${progress} ${url}`);

    try {
      const article = await scrapeArticleWithRetry(url, source);
      state.articles.push(article);
      state.successCount++;

      // Save checkpoint every 10 successes
      if (state.successCount % 10 === 0) {
        await saveCheckpoint(source, url, state.successCount, state.failureCount);
        await saveProgress(source, state, urls.length);
        console.log(`  💾 Checkpoint saved (${state.successCount}/${urls.length})\n`);
      }
    } catch (error: any) {
      const errorType = (error as any).errorType || ScrapeErrorType.UNKNOWN;
      const retryCount = (error as any).retryCount || 0;

      state.failures.push({
        url,
        slug: getSlugFromUrl(url),
        error: error.message,
        errorType,
        timestamp: new Date().toISOString(),
        retryCount,
      });

      state.failureCount++;
      console.log(`    ❌ Failed: ${error.message}\n`);
    }
  }

  // Save final progress
  await saveProgress(source, state, urls.length);
  await saveScrapeLog(source, state, urls.length);

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ Scraping Complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Succeeded: ${state.successCount} (${((state.successCount / urls.length) * 100).toFixed(1)}%)`);
  console.log(`   Failed: ${state.failureCount} (${((state.failureCount / urls.length) * 100).toFixed(1)}%)`);

  if (state.failureCount > 0) {
    console.log(`\n   Error Breakdown:`);
    const breakdown = state.failures.reduce(
      (acc, f) => {
        acc[f.errorType] = (acc[f.errorType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    Object.entries(breakdown).forEach(([type, count]) => {
      console.log(`     ${type}: ${count}`);
    });
  }

  console.log('\n' + '='.repeat(60));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('\n❌ FATAL ERROR:', error);
    process.exit(1);
  });
}

export { scrapeArticleWithRetry, categorizeError, ScrapeErrorType };
