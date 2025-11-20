/**
 * Enhanced Universal Scraper for Webflow RAG
 *
 * Features:
 * - Exponential backoff retry (3 attempts: 1s, 2s, 4s)
 * - Rate limiting (max 2 requests/second)
 * - Progress checkpointing (save after each success)
 * - Error categorization (rate_limit, timeout, parse_error, network_error, not_found)
 * - Resumable from checkpoint
 * - Multi-source support (University, API Docs, Blog, Updates)
 *
 * Usage:
 *   npx tsx enhanced-scraper.ts --source webflow-university
 *   npx tsx enhanced-scraper.ts --source webflow-api-docs
 *   npx tsx enhanced-scraper.ts --source webflow-blog
 *   npx tsx enhanced-scraper.ts --source webflow-updates --resume
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
  MAX_RETRIES: 3,
  BASE_DELAY_MS: 1000, // Start with 1s delay
  RATE_LIMIT_DELAY_MS: 500, // 500ms between requests = 2 req/s
  TIMEOUT_MS: 30000,
};

// Error types for categorization
enum ScrapeErrorType {
  RATE_LIMIT = 'rate_limit',
  NOT_FOUND = 'not_found',
  TIMEOUT = 'timeout',
  PARSE_ERROR = 'parse_error',
  NETWORK_ERROR = 'network_error',
  INSUFFICIENT_CREDITS = 'insufficient_credits',
  UNKNOWN = 'unknown',
}

// ==========================================
// Types
// ==========================================

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
  lastSuccessfulSlug: string;
  successCount: number;
  failureCount: number;
  timestamp: string;
};

type ScrapeState = {
  startTime: Date;
  articles: (ArticleMetadata | null)[];
  failures: ScrapeFailure[];
  totalCreditsUsed: number;
  successCount: number;
  failureCount: number;
};

// ==========================================
// Source Configurations
// ==========================================

const SOURCE_CONFIGS: Record<SourceType, { name: string; baseUrl: string; category: string }> = {
  'webflow-university': {
    name: 'Webflow University',
    baseUrl: 'https://university.webflow.com',
    category: 'Tutorial',
  },
  'webflow-api-docs': {
    name: 'Webflow API Documentation',
    baseUrl: 'https://developers.webflow.com',
    category: 'API Reference',
  },
  'webflow-blog': {
    name: 'Webflow Blog',
    baseUrl: 'https://webflow.com/blog',
    category: 'Blog Post',
  },
  'webflow-updates': {
    name: 'Webflow Updates',
    baseUrl: 'https://webflow.com/updates',
    category: 'Product Update',
  },
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
  const message = error.message || String(error);

  if (message.includes('429') || message.toLowerCase().includes('rate limit')) {
    return ScrapeErrorType.RATE_LIMIT;
  }

  if (message.includes('404') || message.toLowerCase().includes('not found')) {
    return ScrapeErrorType.NOT_FOUND;
  }

  if (message.includes('402') || message.toLowerCase().includes('insufficient credits')) {
    return ScrapeErrorType.INSUFFICIENT_CREDITS;
  }

  if (message.toLowerCase().includes('timeout')) {
    return ScrapeErrorType.TIMEOUT;
  }

  if (
    message.toLowerCase().includes('parse') ||
    message.toLowerCase().includes('content too short') ||
    message.toLowerCase().includes('no markdown')
  ) {
    return ScrapeErrorType.PARSE_ERROR;
  }

  if (
    message.toLowerCase().includes('network') ||
    message.toLowerCase().includes('connection') ||
    message.toLowerCase().includes('econnrefused')
  ) {
    return ScrapeErrorType.NETWORK_ERROR;
  }

  return ScrapeErrorType.UNKNOWN;
}

function cleanMarkdown(markdown: string): string {
  let cleaned = markdown;

  // Remove "Skip to Main Content" links
  cleaned = cleaned.replace(/\[Skip to Main Content\].*?\n\n/gs, '');

  // Remove signup/login sections
  cleaned = cleaned.replace(/\[Log in\].*?Already have an account.*?\n\n/gs, '');
  cleaned = cleaned.replace(/Sign up with Google.*?Terms of Service.*?\n\n/gs, '');

  // Remove footer sections
  cleaned = cleaned.replace(/## Get started for free.*$/gs, '');

  // Remove customer logo sections
  cleaned = cleaned.replace(/!\[.*?logo\]\(https:\/\/.*?cloudfront\.net.*?\n\n/gs, '');

  // Remove excessive newlines
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  return cleaned.trim();
}

function extractPublishDate(markdown: string, metadata: any): string | null {
  // Try various date patterns
  const patterns = [
    /Launched on\s+([A-Za-z]+ \d+, \d{4})/,
    /Published on\s+([A-Za-z]+ \d+, \d{4})/,
    /(\d{4}-\d{2}-\d{2})/,
  ];

  for (const pattern of patterns) {
    const match = markdown.match(pattern);
    if (match) {
      try {
        return new Date(match[1]).toISOString().split('T')[0];
      } catch {
        continue;
      }
    }
  }

  // Check OG metadata
  if (metadata['article:published_time']) {
    try {
      return new Date(metadata['article:published_time']).toISOString().split('T')[0];
    } catch {
      // Ignore
    }
  }

  return null;
}

function extractCategory(markdown: string, sourceType: SourceType): string | null {
  const match = markdown.match(/Category\s+([A-Za-z\s]+)/);
  if (match) {
    return match[1].trim();
  }

  return SOURCE_CONFIGS[sourceType].category;
}

// ==========================================
// Checkpoint Management
// ==========================================

async function loadCheckpoint(source: SourceType): Promise<Checkpoint | null> {
  const checkpointPath = path.join(__dirname, 'checkpoints', `${source}.json`);

  try {
    const data = await fs.readFile(checkpointPath, 'utf-8');
    return JSON.parse(data) as Checkpoint;
  } catch {
    return null;
  }
}

async function saveCheckpoint(
  source: SourceType,
  lastUrl: string,
  lastSlug: string,
  successCount: number,
  failureCount: number
): Promise<void> {
  const checkpointDir = path.join(__dirname, 'checkpoints');
  await fs.mkdir(checkpointDir, { recursive: true });

  const checkpoint: Checkpoint = {
    source,
    lastSuccessfulUrl: lastUrl,
    lastSuccessfulSlug: lastSlug,
    successCount,
    failureCount,
    timestamp: new Date().toISOString(),
  };

  const checkpointPath = path.join(checkpointDir, `${source}.json`);
  await fs.writeFile(checkpointPath, JSON.stringify(checkpoint, null, 2), 'utf-8');
}

// ==========================================
// Scraping Logic
// ==========================================

async function scrapeArticleWithRetry(
  firecrawl: Firecrawl,
  url: string,
  sourceType: SourceType,
  retryCount = 0
): Promise<ArticleMetadata> {
  const slug = getSlugFromUrl(url);

  try {
    console.log(`  [Attempt ${retryCount + 1}/${CONFIG.MAX_RETRIES}] Scraping: ${slug}`);

    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 10000,
      timeout: CONFIG.TIMEOUT_MS,
    });

    if (!result.markdown || result.markdown.length < 100) {
      throw new Error(`Content too short: ${result.markdown?.length || 0} characters`);
    }

    const metadata = result.metadata || {};
    const cleanedMarkdown = cleanMarkdown(result.markdown);

    // Calculate metrics
    const wordCount = cleanedMarkdown.split(/\s+/).length;
    const charCount = cleanedMarkdown.length;

    // Validate minimum content
    if (wordCount < 50) {
      throw new Error(`Content too short: ${wordCount} words (likely extraction failed)`);
    }

    const articleData: ArticleMetadata = {
      url,
      slug,
      title: metadata['og:title'] || metadata.title || slug.replace(/-/g, ' '),
      publishDate: extractPublishDate(cleanedMarkdown, metadata),
      description: metadata.description || metadata['og:description'] || '',
      category: extractCategory(cleanedMarkdown, sourceType),
      file: `articles/${slug}.md`,
      scraped: true,
      word_count: wordCount,
      char_count: charCount,
      scraped_at: new Date().toISOString(),
    };

    // Add YAML front matter to markdown
    const frontMatter = `---
source: ${sourceType}
category: ${articleData.category || 'Unknown'}
url: ${url}
title: "${articleData.title}"
${articleData.publishDate ? `published: ${articleData.publishDate}` : ''}
---

`;

    const markdownWithFrontMatter = frontMatter + cleanedMarkdown;

    // Save markdown file
    const outputDir = path.join(__dirname, 'input', sourceType, 'articles');
    await fs.mkdir(outputDir, { recursive: true });

    const filePath = path.join(outputDir, `${slug}.md`);
    await fs.writeFile(filePath, markdownWithFrontMatter, 'utf-8');

    console.log(`    ✓ Saved: ${slug}.md (${wordCount} words)`);

    return articleData;
  } catch (error: any) {
    const errorType = categorizeError(error);
    const errorMessage = error.message || String(error);

    // Determine if we should retry
    const shouldRetry =
      retryCount < CONFIG.MAX_RETRIES - 1 &&
      (errorType === ScrapeErrorType.RATE_LIMIT ||
        errorType === ScrapeErrorType.TIMEOUT ||
        errorType === ScrapeErrorType.NETWORK_ERROR);

    if (shouldRetry) {
      // Exponential backoff: 1s, 2s, 4s
      const delayMs =
        errorType === ScrapeErrorType.RATE_LIMIT
          ? CONFIG.BASE_DELAY_MS * Math.pow(2, retryCount + 2) // Longer for rate limits: 4s, 8s, 16s
          : CONFIG.BASE_DELAY_MS * Math.pow(2, retryCount); // Normal: 1s, 2s, 4s

      console.log(`    ⚠️  ${errorType}: ${errorMessage}`);
      console.log(`    ↻ Retrying in ${delayMs / 1000}s...`);

      await sleep(delayMs);
      return scrapeArticleWithRetry(firecrawl, url, sourceType, retryCount + 1);
    }

    // No more retries - throw categorized error
    const categorizedError = new Error(errorMessage);
    (categorizedError as any).errorType = errorType;
    (categorizedError as any).retryCount = retryCount;
    throw categorizedError;
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
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles.filter((a) => a !== null),
    failures: state.failures,
  };

  const metadataPath = path.join(outputDir, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');

  console.log(
    `\n  📊 Progress saved: ${state.successCount}/${totalUrls} articles (${((state.successCount / totalUrls) * 100).toFixed(1)}%)`
  );
}

async function saveScrapeLog(source: SourceType, state: ScrapeState, totalUrls: number): Promise<void> {
  const endTime = new Date();
  const duration = Math.floor((endTime.getTime() - state.startTime.getTime()) / 1000);

  const log = {
    source,
    started_at: state.startTime.toISOString(),
    completed_at: endTime.toISOString(),
    duration_seconds: duration,
    articles_attempted: totalUrls,
    articles_succeeded: state.successCount,
    articles_failed: state.failureCount,
    failure_rate: ((state.failureCount / totalUrls) * 100).toFixed(1) + '%',
    error_breakdown: state.failures.reduce(
      (acc, f) => {
        acc[f.errorType] = (acc[f.errorType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    failures: state.failures,
    credits_used: state.totalCreditsUsed,
  };

  const outputDir = path.join(__dirname, 'input', source);
  const logPath = path.join(outputDir, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');

  console.log(`\n  📋 Scrape log saved: ${logPath}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));
  const resume = args.includes('--resume');

  if (!sourceArg) {
    console.error('❌ Error: --source argument required');
    console.log('\nUsage:');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-university');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-api-docs');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-blog');
    console.log('  npx tsx enhanced-scraper.ts --source=webflow-updates --resume');
    process.exit(1);
  }

  const source = sourceArg.split('=')[1] as SourceType;

  if (!SOURCE_CONFIGS[source]) {
    console.error(`❌ Error: Invalid source '${source}'`);
    console.log('Valid sources: webflow-university, webflow-api-docs, webflow-blog, webflow-updates');
    process.exit(1);
  }

  console.log(`\n🚀 Enhanced Scraper: ${SOURCE_CONFIGS[source].name}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`⚙️  Configuration:`);
  console.log(`   Max retries: ${CONFIG.MAX_RETRIES}`);
  console.log(`   Rate limit: ${1000 / CONFIG.RATE_LIMIT_DELAY_MS} req/s`);
  console.log(`   Retry strategy: Exponential backoff (1s → 2s → 4s)`);

  // Check for checkpoint
  let checkpoint: Checkpoint | null = null;
  if (resume) {
    checkpoint = await loadCheckpoint(source);
    if (checkpoint) {
      console.log(`\n📍 Resuming from checkpoint:`);
      console.log(`   Last successful: ${checkpoint.lastSuccessfulSlug}`);
      console.log(`   Success count: ${checkpoint.successCount}`);
      console.log(`   Failure count: ${checkpoint.failureCount}`);
    } else {
      console.log(`\n⚠️  No checkpoint found for ${source}, starting fresh`);
    }
  }

  // TODO: Load URLs for this source (for now, you'll need to provide these)
  console.log('\n⚠️  NOTE: URL discovery not implemented yet');
  console.log('Please provide URLs in the source code or via config file');
  console.log('\nNext steps:');
  console.log('1. Implement URL discovery for each source');
  console.log('2. Run scraper with --source flag');
  console.log('3. Use --resume to continue from last checkpoint');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('\n❌ FATAL ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}

export {
  scrapeArticleWithRetry,
  saveCheckpoint,
  loadCheckpoint,
  categorizeError,
  ScrapeErrorType,
  type SourceType,
  type ArticleMetadata,
  type ScrapeFailure,
};
