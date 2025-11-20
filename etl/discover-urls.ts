/**
 * URL Discovery Script for Webflow RAG
 *
 * Uses Firecrawl's map feature to discover URLs from each source.
 *
 * Usage:
 *   npx tsx discover-urls.ts --source webflow-university
 *   npx tsx discover-urls.ts --source webflow-api-docs
 *   npx tsx discover-urls.ts --source webflow-blog
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
};

type SourceType = 'webflow-university' | 'webflow-api-docs' | 'webflow-blog';

const SOURCE_CONFIGS: Record<
  SourceType,
  {
    name: string;
    startUrls: string[];
    includePatterns: string[];
    excludePatterns: string[];
    limit: number;
  }
> = {
  'webflow-university': {
    name: 'Webflow University',
    startUrls: ['https://university.webflow.com/'],
    includePatterns: [
      'university.webflow.com/lesson/',
      'university.webflow.com/courses/',
      'university.webflow.com/tutorial/',
    ],
    excludePatterns: ['university.webflow.com/courses$', '/pricing', '/signup', '/login'],
    limit: 100,
  },
  'webflow-api-docs': {
    name: 'Webflow API Documentation',
    startUrls: ['https://developers.webflow.com/data/reference'],
    includePatterns: [
      'developers.webflow.com/data/reference',
      'developers.webflow.com/reference',
    ],
    excludePatterns: ['/changelog', '/pricing', '/signup'],
    limit: 50,
  },
  'webflow-blog': {
    name: 'Webflow Blog',
    startUrls: ['https://webflow.com/blog'],
    includePatterns: ['webflow.com/blog/'],
    excludePatterns: [
      '/blog/category/',
      '/blog/tag/',
      '/blog$',
      '/pricing',
      '/signup',
      '/webinar',
    ],
    limit: 40,
  },
};

// ==========================================
// Discovery Functions
// ==========================================

async function discoverUrls(source: SourceType): Promise<string[]> {
  const config = SOURCE_CONFIGS[source];
  const firecrawl = new Firecrawl({ apiKey: CONFIG.FIRECRAWL_API_KEY });

  console.log(`\n🔍 Discovering URLs for: ${config.name}`);
  console.log(`   Start URLs: ${config.startUrls.join(', ')}`);
  console.log(`   Include patterns: ${config.includePatterns.join(', ')}`);
  console.log(`   Limit: ${config.limit} URLs`);

  const allUrls = new Set<string>();

  for (const startUrl of config.startUrls) {
    console.log(`\n  Mapping: ${startUrl}`);

    try {
      const mapResult = await firecrawl.mapUrl(startUrl, {
        search: config.includePatterns.join(' OR '),
        limit: config.limit,
      });

      if (!mapResult.links || mapResult.links.length === 0) {
        console.log(`    ⚠️  No links found`);
        continue;
      }

      console.log(`    ✓ Found ${mapResult.links.length} raw links`);

      // Filter links
      for (const link of mapResult.links) {
        // Check include patterns
        const matchesInclude = config.includePatterns.some((pattern) =>
          link.includes(pattern)
        );

        // Check exclude patterns
        const matchesExclude = config.excludePatterns.some((pattern) => {
          if (pattern.endsWith('$')) {
            // Exact match at end
            return link.endsWith(pattern.slice(0, -1));
          }
          return link.includes(pattern);
        });

        if (matchesInclude && !matchesExclude) {
          allUrls.add(link);
        }
      }

      console.log(`    ✓ After filtering: ${allUrls.size} URLs`);
    } catch (error: any) {
      console.error(`    ❌ Error mapping ${startUrl}:`, error.message);
    }
  }

  const finalUrls = Array.from(allUrls).slice(0, config.limit);

  console.log(`\n  📊 Total discovered: ${finalUrls.length} URLs`);

  return finalUrls;
}

async function saveDiscoveredUrls(source: SourceType, urls: string[]): Promise<void> {
  const outputDir = path.join(__dirname, 'input', source);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'discovered-urls.json');
  const data = {
    source,
    discovered_at: new Date().toISOString(),
    total_urls: urls.length,
    urls,
  };

  await fs.writeFile(outputPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`\n  ✓ Saved to: ${outputPath}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='));

  if (!sourceArg) {
    console.error('❌ Error: --source argument required');
    console.log('\nUsage:');
    console.log('  npx tsx discover-urls.ts --source=webflow-university');
    console.log('  npx tsx discover-urls.ts --source=webflow-api-docs');
    console.log('  npx tsx discover-urls.ts --source=webflow-blog');
    process.exit(1);
  }

  const source = sourceArg.split('=')[1] as SourceType;

  if (!SOURCE_CONFIGS[source]) {
    console.error(`❌ Error: Invalid source '${source}'`);
    console.log('Valid sources: webflow-university, webflow-api-docs, webflow-blog');
    process.exit(1);
  }

  console.log(`\n🚀 URL Discovery: ${SOURCE_CONFIGS[source].name}`);
  console.log(`📅 Started at: ${new Date().toISOString()}`);

  try {
    const urls = await discoverUrls(source);
    await saveDiscoveredUrls(source, urls);

    console.log('\n✅ Discovery complete!');
    console.log(`\nNext step: Run the enhanced scraper:`);
    console.log(`  npx tsx enhanced-scraper.ts --source=${source}`);
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
