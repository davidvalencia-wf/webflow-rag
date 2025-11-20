# PRODUCTION SCRAPE: Webflow Updates Articles

**Objective:** Scrape ALL Webflow product update articles for the RAG system's ETL pipeline.

---

## Copy This Entire Prompt Into a NEW Conversation:

```
PRODUCTION SCRAPE TASK: Webflow Updates Articles

I need to scrape ALL Webflow product update articles for my RAG system. This is a production data collection task, not a test.

## Requirements

**Target:** https://webflow.com/updates
**Scope:** All articles exactly one level deep (e.g., /updates/article-name)
**Expected Count:** ~136 articles based on preliminary mapping
**Output Location:** /Users/ryan.hodge/Projects/webflow-rag/etl/input/webflow-updates/

## Task Breakdown

### Phase 1: Discovery & Planning
1. Use firecrawl_map to discover all URLs at https://webflow.com/updates
2. Filter to include ONLY URLs matching pattern: https://webflow.com/updates/[article-slug]
   - ✅ INCLUDE: https://webflow.com/updates/product-nav-updates
   - ❌ EXCLUDE: https://webflow.com/updates (parent)
   - ❌ EXCLUDE: https://webflow.com/updates/category/article (nested)
3. Report total count of articles to scrape
4. Estimate Firecrawl credits needed (1 credit per scrape)

### Phase 2: Batch Scraping
1. Scrape ALL filtered article URLs (not just a sample)
2. For each article, extract:
   - Clean markdown content (use formats: ["markdown"])
   - Set onlyMainContent: true (remove nav/footer)
3. Handle errors gracefully:
   - If an article fails, log it and continue
   - Retry failed articles once
   - Report all failures at the end

### Phase 3: Content Extraction
Use firecrawl_extract to pull structured metadata from each article:

**Schema:**
```json
{
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "publishDate": { "type": "string" },
    "category": { "type": "string" },
    "description": { "type": "string" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["title"]
}
```

### Phase 4: File Organization
Save all content with this structure:

```
etl/input/webflow-updates/
├── metadata.json                 # Master index file
├── scrape-log.json              # Detailed scrape log
└── articles/
    ├── product-nav-updates.md
    ├── dashboard-quick-find.md
    ├── we-made-some-updates-to-project-settings.md
    └── ... (all 136 articles)
```

**File naming convention:**
- Use the article slug from URL (e.g., "product-nav-updates" from /updates/product-nav-updates)
- Replace special characters with hyphens
- Keep .md extension

**metadata.json format:**
```json
{
  "source": "webflow-updates",
  "scraped_at": "2025-11-12T19:30:00Z",
  "total_articles_discovered": 136,
  "total_articles_scraped": 136,
  "failed_articles": 0,
  "firecrawl_credits_used": 136,
  "articles": [
    {
      "url": "https://webflow.com/updates/product-nav-updates",
      "title": "Product nav updates",
      "publishDate": "2024-11-05",
      "category": "Product",
      "description": "...",
      "tags": ["navigation", "ui"],
      "file": "articles/product-nav-updates.md",
      "scraped": true,
      "word_count": 523,
      "char_count": 3245
    }
  ]
}
```

**scrape-log.json format:**
```json
{
  "started_at": "2025-11-12T19:30:00Z",
  "completed_at": "2025-11-12T19:45:00Z",
  "duration_seconds": 900,
  "articles_attempted": 136,
  "articles_succeeded": 135,
  "articles_failed": 1,
  "failures": [
    {
      "url": "https://webflow.com/updates/some-article",
      "error": "Timeout after 30s",
      "timestamp": "2025-11-12T19:35:00Z"
    }
  ],
  "credits_used": 136,
  "credits_remaining": 364
}
```

## Progress Tracking

Use TodoWrite to track progress through all phases. Update todos as you complete:
- [ ] Phase 1: Map URLs and filter (1 task)
- [ ] Phase 2: Batch scrape all articles (136 tasks - update every 10)
- [ ] Phase 3: Extract structured metadata (1 task)
- [ ] Phase 4: Save files and create metadata.json (1 task)

**Report progress every 10 articles:**
"Scraped 10/136 articles... (7.4% complete)"
"Scraped 20/136 articles... (14.7% complete)"
etc.

## Error Handling

1. **Rate Limiting:** If you hit rate limits, pause and retry
2. **Timeouts:** Set waitFor: 10000 (10s timeout per page)
3. **Failed Scrapes:** Log failures but continue with remaining articles
4. **Network Errors:** Retry once, then log and skip
5. **Malformed Content:** Save what you can, mark as "partial" in metadata

## Quality Validation

After scraping, validate:
- [ ] All article files exist in etl/input/webflow-updates/articles/
- [ ] metadata.json contains all articles with required fields
- [ ] No article files are empty (< 100 chars)
- [ ] All markdown files have proper formatting (no HTML artifacts)
- [ ] scrape-log.json shows < 5% failure rate

## Final Report

When complete, provide:

**Summary:**
- Total articles discovered: X
- Successfully scraped: Y
- Failed: Z (with failure reasons)
- Firecrawl credits used: N
- Credits remaining: M
- Total word count: ~X,XXX words
- Average article length: X words
- Scrape duration: X minutes

**File Locations:**
- Articles: /Users/ryan.hodge/Projects/webflow-rag/etl/input/webflow-updates/articles/
- Metadata: /Users/ryan.hodge/Projects/webflow-rag/etl/input/webflow-updates/metadata.json
- Log: /Users/ryan.hodge/Projects/webflow-rag/etl/input/webflow-updates/scrape-log.json

**Next Steps:**
Suggest running the ETL chunker on this content:
`cd etl && node chunker.ts --input input/webflow-updates/articles/`

## Important Notes

- This is a PRODUCTION scrape - get ALL articles, not a sample
- Be thorough with error handling
- Save progress incrementally (don't wait until the end)
- If the scrape is interrupted, resume from where you left off
- Report detailed statistics at the end
- Ensure output is ready for the ETL pipeline

BEGIN PRODUCTION SCRAPE NOW.
```

---

## Notes for You

This prompt will:
- ✅ Scrape ALL 136 articles (not a sample)
- ✅ Cost ~136-140 Firecrawl credits (you have 500/month free)
- ✅ Take ~10-15 minutes depending on rate limits
- ✅ Create production-ready output for your ETL pipeline
- ✅ Handle errors gracefully
- ✅ Provide detailed logging and metadata
- ✅ Save files in the correct directory structure

**Copy the prompt between the triple backticks and paste into a NEW Claude Desktop conversation.**
