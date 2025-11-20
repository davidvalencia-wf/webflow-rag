# Example Firecrawl Prompt

Copy and paste this into a NEW Claude Desktop conversation to test Firecrawl:

---

## Prompt 1: Basic Test (Quick)

```
Use Firecrawl to map https://webflow.com/updates and show me:
1. How many total URLs were found
2. Filter to show only article URLs one level deep (like /updates/comment-only-links-and-comment-metadata)
3. Show me the first 10 article URLs

Then scrape 3 of those articles and extract:
- Title
- Publication date
- First paragraph of content
```

---

## Prompt 2: Advanced Test (Full Workflow - Your Use Case)

```
I need to scrape Webflow product update articles for my RAG system. Help me do this:

**Step 1: Discovery**
Use firecrawl_map to discover all URLs at https://webflow.com/updates

**Step 2: Filter**
Filter the results to only include article URLs that are exactly one level deep:
- ✅ Include: https://webflow.com/updates/article-name
- ❌ Exclude: https://webflow.com/updates (parent page)
- ❌ Exclude: https://webflow.com/updates/category/article (two levels deep)

**Step 3: Batch Scrape**
Scrape the first 10 filtered article URLs and extract clean markdown content

**Step 4: Structured Extraction**
Use firecrawl_extract to pull structured data from each article:
{
  "title": "string",
  "date": "string",
  "category": "string",
  "summary": "string",
  "content": "string"
}

**Step 5: Save Results**
Save the results to:
- Raw markdown files: etl/input/webflow-updates/articles/
- Structured JSON: etl/input/webflow-updates/metadata.json

Format the metadata.json like this:
{
  "source": "webflow-updates",
  "scraped_at": "2025-11-12T...",
  "total_articles_found": 136,
  "articles_scraped": 10,
  "articles": [
    {
      "url": "...",
      "title": "...",
      "date": "...",
      "category": "...",
      "summary": "...",
      "file": "articles/product-nav-updates.md"
    }
  ]
}

Track your progress with todos and report:
- How many URLs were discovered
- How many were filtered
- How many were successfully scraped
- Any errors encountered
- Firecrawl credits used
```

---

## Prompt 3: Research-Focused (Using /research agent)

```
/research I need comprehensive data about Webflow's product updates for my RAG system.

Task:
1. Map https://webflow.com/updates to discover all article URLs (one level deep only)
2. Scrape the 15 most recent articles
3. Extract: title, date, category, summary, and full content
4. Save organized files to etl/input/webflow-updates/
5. Create a metadata.json file with article details

Requirements:
- Only scrape articles directly under /updates/* (not nested deeper)
- Use clean markdown format
- Include source URLs for attribution
- Report credits used and any errors

Output structure:
etl/input/webflow-updates/
├── metadata.json
└── articles/
    ├── product-nav-updates.md
    ├── dashboard-quick-find.md
    └── ...
```

---

## Tips

- **Start small**: Test with 3-5 articles first, then scale up
- **Watch credits**: Each scrape = 1 credit, extract = 4 credits
- **New conversation**: Firecrawl tools only work in new conversations (not this one)
- **Check logs**: If errors occur, check ~/Library/Logs/Claude/mcp-server-firecrawl.log
