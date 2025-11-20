#!/usr/bin/env node

/**
 * PRODUCTION SCRAPER: Webflow Updates Articles
 *
 * This script scrapes all Webflow product update articles using Firecrawl API.
 * It handles errors gracefully, saves progress incrementally, and generates
 * comprehensive metadata.
 *
 * Usage: node scrape-webflow-updates.js
 *
 * Environment: Requires FIRECRAWL_API_KEY in .mcp.json or environment
 */

import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  FIRECRAWL_API_KEY: 'fc-0816fa448a3a4d8c85daaa724b13885f', // From .mcp.json
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-updates'),
  ARTICLES_DIR: path.join(__dirname, 'input/webflow-updates/articles'),
  BATCH_SIZE: 10, // Process 10 articles at a time
  RETRY_ATTEMPTS: 2,
  TIMEOUT_MS: 30000, // 30 second timeout per scrape
};

// Article URLs to scrape (filtered from discovery phase)
const ARTICLE_URLS = [
  "https://webflow.com/updates/comment-only-links-and-comment-metadata",
  "https://webflow.com/updates/app-gen",
  "https://webflow.com/updates/ai-seo-aeo",
  "https://webflow.com/updates/ssl",
  "https://webflow.com/updates/hsts",
  "https://webflow.com/updates/localizationavailabilityupdate",
  "https://webflow.com/updates/symbols",
  "https://webflow.com/updates/developer-resources",
  "https://webflow.com/updates/client-payments",
  "https://webflow.com/updates/api-keys",
  "https://webflow.com/updates/cms-api",
  "https://webflow.com/updates/creator-profiles",
  "https://webflow.com/updates/webflow-redesign",
  "https://webflow.com/updates/updated-navigation",
  "https://webflow.com/updates/scim-provisioning",
  "https://webflow.com/updates/help-center",
  "https://webflow.com/updates/merge-summary",
  "https://webflow.com/updates/dropdown-menu",
  "https://webflow.com/updates/marketo-integration",
  "https://webflow.com/updates/function-variables",
  "https://webflow.com/updates/csv-import",
  "https://webflow.com/updates/drop-shadows",
  "https://webflow.com/updates/bulk-publishing",
  "https://webflow.com/updates/dashboard-folders",
  "https://webflow.com/updates/blending-mode",
  "https://webflow.com/updates/aspect-ratio",
  "https://webflow.com/updates/page-branching",
  "https://webflow.com/updates/css-filters",
  "https://webflow.com/updates/mailchimp-integration",
  "https://webflow.com/updates/private-staging",
  "https://webflow.com/updates/libraries-panel",
  "https://webflow.com/updates/variable-modes",
  "https://webflow.com/updates/component-ux",
  "https://webflow.com/updates/cloud-storage",
  "https://webflow.com/updates/slash-commands",
  "https://webflow.com/updates/html-embeds",
  "https://webflow.com/updates/text-columns",
  "https://webflow.com/updates/rich-text",
  "https://webflow.com/updates/ecommerce-scale",
  "https://webflow.com/updates/component-groups",
  "https://webflow.com/updates/cms-whitelabeling",
  "https://webflow.com/updates/cms-improvements",
  "https://webflow.com/updates/quick-find",
  "https://webflow.com/updates/publishing-workflows",
  "https://webflow.com/updates/password-protection",
  "https://webflow.com/updates/improvements-to-components",
  "https://webflow.com/updates/dashboard-quick-find",
  "https://webflow.com/updates/variant-selector-button",
  "https://webflow.com/updates/introducing-webflow-analyze",
  "https://webflow.com/updates/localization-enterprise-availability",
  "https://webflow.com/updates/client-payments-enhancements",
  "https://webflow.com/updates/ai-site-builder",
  "https://webflow.com/updates/limited-designer-role",
  "https://webflow.com/updates/machine-translation-glossary",
  "https://webflow.com/updates/enterprise-phone-support",
  "https://webflow.com/updates/localized-page-branching",
  "https://webflow.com/updates/two-factor-authentication",
  "https://webflow.com/updates/gsap-becomes-free",
  "https://webflow.com/updates/background-color-overlays",
  "https://webflow.com/updates/object-fit-support",
  "https://webflow.com/updates/rich-text-improvements",
  "https://webflow.com/updates/custom-ssl-certificates",
  "https://webflow.com/updates/webflow-ai-assistant",
  "https://webflow.com/updates/guest-role-enhancements",
  "https://webflow.com/updates/api-updates-q323",
  "https://webflow.com/updates/interactive-google-maps",
  "https://webflow.com/updates/design-approval-enhancements",
  "https://webflow.com/updates/site-specific-access",
  "https://webflow.com/updates/easier-class-renaming",
  "https://webflow.com/updates/search-for-swatches",
  "https://webflow.com/updates/dashboard-list-view",
  "https://webflow.com/updates/updated-optimization-controls",
  "https://webflow.com/updates/changes-to-forms",
  "https://webflow.com/updates/additional-form-improvements",
  "https://webflow.com/updates/apps-updates-july",
  "https://webflow.com/updates/cms-auto-save",
  "https://webflow.com/updates/cms-api-improvements",
  "https://webflow.com/updates/html5-background-videos",
  "https://webflow.com/updates/component-localization-protection",
  "https://webflow.com/updates/extended-element-conversions",
  "https://webflow.com/updates/per-page-password-protection",
  "https://webflow.com/updates/commenting-for-workspace-members",
  "https://webflow.com/updates/hire-a-webflow-expert",
  "https://webflow.com/updates/easier-godaddy-domain-connection",
  "https://webflow.com/updates/site-activity-log-filters",
  "https://webflow.com/updates/publish-individual-cms-items",
  "https://webflow.com/updates/symbols-evolved-to-components",
  "https://webflow.com/updates/site-access-default-setting",
  "https://webflow.com/updates/flexbox-css3-flexible-boxes",
  "https://webflow.com/updates/style-form-placeholder-text",
  "https://webflow.com/updates/variable-reordering-bulk-actions",
  "https://webflow.com/updates/introducing-the-custom-element",
  "https://webflow.com/updates/optimize-based-on-locale",
  "https://webflow.com/updates/sso-enhancements",
  "https://webflow.com/updates/custom-301-redirects",
  "https://webflow.com/updates/interactions-quick-effects",
  "https://webflow.com/updates/og-asset-updates",
  "https://webflow.com/updates/site-activity-log",
  "https://webflow.com/updates/certified-partner-program",
  "https://webflow.com/updates/open-graph-og-settings",
  "https://webflow.com/updates/interactions-2-0-1",
  "https://webflow.com/updates/custom-favicon-and-webclip",
  "https://webflow.com/updates/position-sticky",
  "https://webflow.com/updates/branch-staging",
  "https://webflow.com/updates/find-component-instances",
  "https://webflow.com/updates/responsive-design"
];

// Initialize Firecrawl client
const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

// State management
const state = {
  startTime: new Date(),
  articles: [],
  failures: [],
  totalCreditsUsed: 0,
};

/**
 * Extract article slug from URL
 */
function getSlugFromUrl(url) {
  const match = url.match(/\/updates\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Clean markdown content (remove nav/footer artifacts)
 */
function cleanMarkdown(markdown) {
  // Remove common nav/footer patterns
  let cleaned = markdown;

  // Remove "Skip to Main Content" links
  cleaned = cleaned.replace(/\[Skip to Main Content\].*?\n\n/gs, '');

  // Remove signup/login sections
  cleaned = cleaned.replace(/\[Log in\].*?Already have an account.*?\n\n/gs, '');
  cleaned = cleaned.replace(/Sign up with Google.*?Terms of Service.*?\n\n/gs, '');

  // Remove footer "Get started for free" sections
  cleaned = cleaned.replace(/## Get started for free.*$/gs, '');

  // Remove customer logo sections
  cleaned = cleaned.replace(/!\[.*?logo\]\(https:\/\/dhygzobemt712\.cloudfront\.net.*?\n\n/gs, '');

  // Remove excessive newlines
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');

  return cleaned.trim();
}

/**
 * Scrape a single article with retry logic
 */
async function scrapeArticle(url, retries = CONFIG.RETRY_ATTEMPTS) {
  const slug = getSlugFromUrl(url);
  console.log(`\n[${new Date().toISOString()}] Scraping: ${slug}`);

  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true,
      waitFor: 10000,
    });

    if (!result.markdown) {
      throw new Error('No markdown content returned');
    }

    const metadata = result.metadata || {};
    const cleanedMarkdown = cleanMarkdown(result.markdown);

    // Calculate content metrics
    const wordCount = cleanedMarkdown.split(/\s+/).length;
    const charCount = cleanedMarkdown.length;

    // Extract structured metadata
    const articleData = {
      url,
      slug,
      title: metadata['og:title'] || metadata.title || slug,
      publishDate: extractPublishDate(cleanedMarkdown),
      description: metadata.description || metadata['og:description'] || '',
      category: extractCategory(cleanedMarkdown),
      file: `articles/${slug}.md`,
      scraped: true,
      word_count: wordCount,
      char_count: charCount,
      scraped_at: new Date().toISOString(),
    };

    // Save markdown file
    const filePath = path.join(CONFIG.ARTICLES_DIR, `${slug}.md`);
    await fs.writeFile(filePath, cleanedMarkdown, 'utf-8');

    console.log(`  ✓ Saved: ${slug}.md (${wordCount} words)`);

    // Track credits
    const creditsUsed = result.metadata?.creditsUsed || 1;
    state.totalCreditsUsed += creditsUsed;

    return articleData;

  } catch (error) {
    console.error(`  ✗ Error scraping ${slug}: ${error.message}`);

    if (retries > 0) {
      console.log(`  ↻ Retrying... (${retries} attempts remaining)`);
      await sleep(2000); // Wait 2 seconds before retry
      return scrapeArticle(url, retries - 1);
    }

    // Log failure
    state.failures.push({
      url,
      slug,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return null;
  }
}

/**
 * Extract publish date from markdown content
 */
function extractPublishDate(markdown) {
  const match = markdown.match(/Launched on\s+([A-Za-z]+ \d+, \d{4})/);
  if (match) {
    return new Date(match[1]).toISOString().split('T')[0];
  }
  return null;
}

/**
 * Extract category from markdown content
 */
function extractCategory(markdown) {
  const match = markdown.match(/Category\s+([A-Za-z\s]+)/);
  return match ? match[1].trim() : null;
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Save progress incrementally
 */
async function saveProgress() {
  const metadata = {
    source: 'webflow-updates',
    scraped_at: state.startTime.toISOString(),
    total_articles_discovered: ARTICLE_URLS.length,
    total_articles_scraped: state.articles.filter(a => a).length,
    failed_articles: state.failures.length,
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles.filter(a => a), // Remove nulls
  };

  const metadataPath = path.join(CONFIG.OUTPUT_DIR, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`\n📊 Progress saved: ${metadata.total_articles_scraped}/${ARTICLE_URLS.length} articles`);
}

/**
 * Save detailed scrape log
 */
async function saveScrapeLog() {
  const endTime = new Date();
  const duration = Math.floor((endTime - state.startTime) / 1000);

  const log = {
    started_at: state.startTime.toISOString(),
    completed_at: endTime.toISOString(),
    duration_seconds: duration,
    articles_attempted: ARTICLE_URLS.length,
    articles_succeeded: state.articles.filter(a => a).length,
    articles_failed: state.failures.length,
    failures: state.failures,
    credits_used: state.totalCreditsUsed,
    credits_remaining: 500 - state.totalCreditsUsed, // Assuming 500 free tier
  };

  const logPath = path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');
  console.log(`\n📋 Scrape log saved: ${logPath}`);
}

/**
 * Main scraper function
 */
async function main() {
  console.log('🚀 STARTING PRODUCTION SCRAPE: Webflow Updates Articles');
  console.log(`📅 Started at: ${state.startTime.toISOString()}`);
  console.log(`📊 Total articles to scrape: ${ARTICLE_URLS.length}\n`);

  // Ensure output directories exist
  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG.ARTICLES_DIR, { recursive: true });

  // Process articles in batches
  for (let i = 0; i < ARTICLE_URLS.length; i += CONFIG.BATCH_SIZE) {
    const batch = ARTICLE_URLS.slice(i, i + CONFIG.BATCH_SIZE);
    const batchNumber = Math.floor(i / CONFIG.BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(ARTICLE_URLS.length / CONFIG.BATCH_SIZE);

    console.log(`\n━━━ BATCH ${batchNumber}/${totalBatches} (Articles ${i + 1}-${Math.min(i + CONFIG.BATCH_SIZE, ARTICLE_URLS.length)}) ━━━`);

    // Scrape batch sequentially to avoid rate limits
    for (const url of batch) {
      const articleData = await scrapeArticle(url);
      state.articles.push(articleData);

      // Report progress every 10 articles
      if ((i + state.articles.length) % 10 === 0) {
        const progress = ((i + state.articles.length) / ARTICLE_URLS.length * 100).toFixed(1);
        console.log(`\n⏳ Progress: ${i + state.articles.length}/${ARTICLE_URLS.length} articles (${progress}%)`);
      }

      // Small delay to avoid rate limiting
      await sleep(1000);
    }

    // Save progress after each batch
    await saveProgress();
  }

  // Save final scrape log
  await saveScrapeLog();

  // Print summary
  const successCount = state.articles.filter(a => a).length;
  const failureCount = state.failures.length;
  const totalWords = state.articles.filter(a => a).reduce((sum, a) => sum + a.word_count, 0);
  const avgWords = Math.floor(totalWords / successCount);
  const duration = Math.floor((new Date() - state.startTime) / 1000);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 SCRAPE COMPLETE!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📊 Summary:`);
  console.log(`  Total articles discovered: ${ARTICLE_URLS.length}`);
  console.log(`  Successfully scraped: ${successCount}`);
  console.log(`  Failed: ${failureCount}`);
  console.log(`  Firecrawl credits used: ${state.totalCreditsUsed}`);
  console.log(`  Credits remaining: ${500 - state.totalCreditsUsed}/500`);
  console.log(`  Total word count: ~${totalWords.toLocaleString()} words`);
  console.log(`  Average article length: ${avgWords} words`);
  console.log(`  Scrape duration: ${duration} seconds (${Math.floor(duration / 60)}m ${duration % 60}s)`);
  console.log('\n📁 File Locations:');
  console.log(`  Articles: ${CONFIG.ARTICLES_DIR}`);
  console.log(`  Metadata: ${path.join(CONFIG.OUTPUT_DIR, 'metadata.json')}`);
  console.log(`  Log: ${path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json')}`);

  if (failureCount > 0) {
    console.log('\n⚠️  Failed Articles:');
    state.failures.forEach(f => {
      console.log(`  - ${f.slug}: ${f.error}`);
    });
  }

  console.log('\n✅ Next Steps:');
  console.log('  Run the ETL chunker on this content:');
  console.log(`  cd etl && node chunker.js --input input/webflow-updates/articles/`);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run the scraper
main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});
