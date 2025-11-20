#!/usr/bin/env node

/**
 * PRODUCTION SCRAPER V2: Webflow Updates Articles (Clean Content)
 *
 * This version focuses on extracting only the main article content by:
 * - Using aggressive content cleaning
 * - Extracting only content between key markers
 * - Removing all navigation, footer, and promotional content
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
  OUTPUT_DIR: path.join(__dirname, 'input/webflow-updates'),
  ARTICLES_DIR: path.join(__dirname, 'input/webflow-updates/articles'),
  BATCH_SIZE: 10,
  RETRY_ATTEMPTS: 5,
  DELAY_MS: 5000, // 5 seconds between scrapes (avoid rate limits)
  BACKOFF_MS: 30000, // 30 second backoff on 429
};

// Article URLs (all 106)
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

const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

const state = {
  startTime: new Date(),
  articles: [],
  failures: [],
  totalCreditsUsed: 0,
};

function getSlugFromUrl(url) {
  const match = url.match(/\/updates\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * IMPROVED: Extract only main article content
 */
function extractMainContent(markdown) {
  // Split into lines
  const lines = markdown.split('\n');

  // Find start and end markers
  let startIndex = -1;
  let endIndex = lines.length;

  // Look for common start patterns (article title or first heading after nav)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Start: After "Documentation" or first ## heading
    if (line.startsWith('##') && startIndex === -1) {
      startIndex = i;
    }

    // End: Before "Related updates" or "Get started for free"
    if (line.includes('Related updates') ||
        line.includes('Get started for free') ||
        line.includes('Launched on')) {
      if (startIndex > -1 && endIndex === lines.length) {
        endIndex = i;
      }
    }
  }

  // If we found markers, extract that section
  if (startIndex > -1 && startIndex < endIndex) {
    const contentLines = lines.slice(startIndex, endIndex);
    let content = contentLines.join('\n');

    // Additional cleaning
    content = cleanContent(content);

    return content.trim();
  }

  // Fallback: Try to extract based on content patterns
  return cleanContent(markdown);
}

/**
 * Clean markdown content aggressively
 */
function cleanContent(markdown) {
  let cleaned = markdown;

  // Remove navigation links at top
  cleaned = cleaned.replace(/\[Skip to Main Content\].*?\n/gs, '');
  cleaned = cleaned.replace(/\[Webflow\]\(https:\/\/webflow\.com.*?\n/gs, '');
  cleaned = cleaned.replace(/\[Log in\].*?\n/gs, '');
  cleaned = cleaned.replace(/\[Contact Sales\].*?\n/gs, '');
  cleaned = cleaned.replace(/\[Get started\].*?\n/gs, '');
  cleaned = cleaned.replace(/\[Start building\].*?\n/gs, '');

  // Remove signup/login sections
  cleaned = cleaned.replace(/Sign up with Google.*?Terms of Service/gs, '');
  cleaned = cleaned.replace(/Welcome to Webflow.*?Already have an account.*/gs, '');

  // Remove customer logos and testimonials
  cleaned = cleaned.replace(/!\[.*?logo\]\(https:\/\/.*?\.svg\)/gs, '');
  cleaned = cleaned.replace(/Trusted by teams at.*?(?=\n##|\n\*\*|$)/gs, '');
  cleaned = cleaned.replace(/\d+x\s+In cost savings.*?Read story/gs, '');
  cleaned = cleaned.replace(/\$\d+M\s+in.*?Read story/gs, '');
  cleaned = cleaned.replace(/\d+%\s+(increase|decrease).*?Read story/gs, '');

  // Remove arrow symbols (navigation artifacts)
  cleaned = cleaned.replace(/→\n\n↗\n\n►\n\n↓\n\n←\n\n↑\n\n/g, '');
  cleaned = cleaned.replace(/[→↗►↓←↑]/g, '');

  // Remove "Related updates" section
  cleaned = cleaned.replace(/## Related updates.*$/gs, '');

  // Remove footer CTAs
  cleaned = cleaned.replace(/## Get started for free.*$/gs, '');
  cleaned = cleaned.replace(/Try Webflow for as long as you like.*$/gs, '');

  // Remove excessive whitespace
  cleaned = cleaned.replace(/\n{4,}/g, '\n\n\n');
  cleaned = cleaned.replace(/^\s+/gm, ''); // Remove leading spaces on lines

  return cleaned.trim();
}

/**
 * Extract publish date
 */
function extractPublishDate(markdown) {
  const match = markdown.match(/Launched on[:\s]+([A-Za-z]+ \d+, \d{4})/i);
  if (match) {
    try {
      return new Date(match[1]).toISOString().split('T')[0];
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Extract category
 */
function extractCategory(markdown) {
  const match = markdown.match(/Category[:\s]+([A-Za-z\s]+)/i);
  return match ? match[1].trim() : null;
}

/**
 * Scrape single article with improved content extraction
 */
async function scrapeArticle(url, retries = CONFIG.RETRY_ATTEMPTS) {
  const slug = getSlugFromUrl(url);
  console.log(`\n[${new Date().toISOString()}] Scraping: ${slug}`);

  try {
    // Scrape with better options (don't use onlyMainContent - it's not working)
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      waitFor: 10000,
    });

    if (!result.markdown) {
      throw new Error('No markdown content returned');
    }

    // Extract main article content
    const cleanedMarkdown = extractMainContent(result.markdown);

    const metadata = result.metadata || {};
    const wordCount = cleanedMarkdown.split(/\s+/).length;
    const charCount = cleanedMarkdown.length;

    // Validate content quality
    if (wordCount < 50) {
      throw new Error(`Content too short: ${wordCount} words (likely extraction failed)`);
    }

    const articleData = {
      url,
      slug,
      title: metadata['og:title'] || metadata.title || slug,
      publishDate: extractPublishDate(result.markdown),
      description: metadata.description || metadata['og:description'] || '',
      category: extractCategory(result.markdown),
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

    state.totalCreditsUsed += 1;

    return articleData;

  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);

    // Handle rate limiting with longer backoff
    if (error.message.includes('429') && retries > 0) {
      console.log(`  ⏸  Rate limited! Backing off for ${CONFIG.BACKOFF_MS/1000}s...`);
      await sleep(CONFIG.BACKOFF_MS);
      console.log(`  ↻ Retrying after backoff... (${retries} left)`);
      return scrapeArticle(url, retries - 1);
    }

    if (retries > 0) {
      console.log(`  ↻ Retrying... (${retries} left)`);
      await sleep(3000);
      return scrapeArticle(url, retries - 1);
    }

    state.failures.push({
      url,
      slug,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return null;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveProgress() {
  const metadata = {
    source: 'webflow-updates',
    scraped_at: state.startTime.toISOString(),
    total_articles_discovered: ARTICLE_URLS.length,
    total_articles_scraped: state.articles.filter(a => a).length,
    failed_articles: state.failures.length,
    firecrawl_credits_used: state.totalCreditsUsed,
    articles: state.articles.filter(a => a),
  };

  const metadataPath = path.join(CONFIG.OUTPUT_DIR, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`\n📊 Progress: ${metadata.total_articles_scraped}/${ARTICLE_URLS.length} articles`);
}

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
    credits_remaining: 500 - state.totalCreditsUsed,
  };

  const logPath = path.join(CONFIG.OUTPUT_DIR, 'scrape-log.json');
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 PRODUCTION SCRAPE V2: Webflow Updates (Clean Content)');
  console.log(`📅 Started: ${state.startTime.toISOString()}`);
  console.log(`📊 Total articles: ${ARTICLE_URLS.length}\n`);

  await fs.mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
  await fs.mkdir(CONFIG.ARTICLES_DIR, { recursive: true });

  // Process articles
  for (let i = 0; i < ARTICLE_URLS.length; i++) {
    const url = ARTICLE_URLS[i];
    const articleData = await scrapeArticle(url);
    state.articles.push(articleData);

    // Progress reporting
    if ((i + 1) % 10 === 0) {
      const progress = ((i + 1) / ARTICLE_URLS.length * 100).toFixed(1);
      console.log(`\n⏳ ${i + 1}/${ARTICLE_URLS.length} (${progress}%)`);
      await saveProgress();
    }

    // Delay to avoid rate limiting
    await sleep(CONFIG.DELAY_MS);
  }

  await saveProgress();
  await saveScrapeLog();

  // Summary
  const successCount = state.articles.filter(a => a).length;
  const failureCount = state.failures.length;
  const totalWords = state.articles.filter(a => a).reduce((sum, a) => sum + a.word_count, 0);
  const avgWords = Math.floor(totalWords / successCount);
  const duration = Math.floor((new Date() - state.startTime) / 1000);

  console.log('\n' + '='.repeat(60));
  console.log('🎉 SCRAPE COMPLETE!');
  console.log('='.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`  Total: ${ARTICLE_URLS.length}`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failureCount}`);
  console.log(`  Credits: ${state.totalCreditsUsed}`);
  console.log(`  Words: ~${totalWords.toLocaleString()}`);
  console.log(`  Avg length: ${avgWords} words`);
  console.log(`  Duration: ${Math.floor(duration / 60)}m ${duration % 60}s`);
  console.log(`\n📁 Output: ${CONFIG.ARTICLES_DIR}`);

  if (failureCount > 0) {
    console.log('\n⚠️  Failures:');
    state.failures.forEach(f => console.log(`  - ${f.slug}: ${f.error}`));
  }

  console.log('\n' + '='.repeat(60) + '\n');
}

main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
});
