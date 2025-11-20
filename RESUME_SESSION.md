# Resume Session - RAG Data Pipeline Expansion

**Date**: 2025-11-17
**Goal**: Expand data pipeline to comprehensive Webflow documentation (Option B)
**Sub-agent**: `rag-data-pipeline-engineer` (newly created)

---

## Current State

### ✅ What's Working
- **Frontend**: Production-ready with 25+ features (v1.0.0)
- **Backend**: RAG pipeline fully functional
- **Data**: 24 documents → 68 chunks → all in Pinecone + D1
- **ETL**: Full pipeline working (chunker, embedder, uploader, validator)

### ⚠️ Current Limitations
- Only 1 source: Webflow Updates
- 77% scraping failure rate (82/106 articles failed)
- Need 10-20x more content for comprehensive MVP

---

## Chosen Plan: Option B (Comprehensive)

### Target: 500-800 chunks from 3 sources

**Priority Sources:**
1. **Webflow University** (80-100 articles → ~300 chunks)
   - https://university.webflow.com/
   - Courses, tutorials, guides

2. **Webflow API Docs** (30-50 pages → ~150 chunks)
   - https://developers.webflow.com/data/reference
   - REST API, Data Client API

3. **Webflow Blog** (30-40 posts → ~120 chunks)
   - https://webflow.com/blog
   - Last 6 months, product updates

---

## Implementation Tasks

### Phase 1: Infrastructure (2h)
- [ ] Fix scraper retry logic (exponential backoff)
- [ ] Add rate limiting (2 req/sec)
- [ ] Add progress checkpointing
- [ ] Create organized folder structure

### Phase 2: Scraping (6-8h)
- [ ] Scrape Webflow University (80-100 articles)
- [ ] Scrape API documentation (30-50 pages)
- [ ] Scrape Blog posts (30-40 posts)

### Phase 3: Processing (3-4h)
- [ ] Run chunker on all sources
- [ ] Generate embeddings (watch rate limits)
- [ ] Upload to Pinecone + D1
- [ ] Validate counts and quality

**Total Time**: 11-14 hours

---

## Key Technical Details

### Folder Structure
```
etl/input/
├── webflow-university/    ← NEW
│   ├── articles/
│   └── metadata.json
├── webflow-api-docs/     ← NEW
│   ├── endpoints/
│   └── metadata.json
├── webflow-blog/         ← NEW
│   ├── posts/
│   └── metadata.json
└── webflow-updates/       ← EXISTS (24 articles)
    ├── articles/
    └── metadata.json
```

### Markdown Format with YAML Front Matter
```markdown
---
source: webflow-university
category: CMS Tutorials
url: https://university.webflow.com/...
title: "How to build a CMS"
published: 2025-01-15
---

# Content here...
```

### Chunking Settings (keep current)
- 512 tokens per chunk
- 50 token overlap
- Preserve section headers
- Add document title to metadata

---

## API Keys & Environment

Verify these are set in `.env.local`:
```bash
OPENAI_API_KEY=sk-proj-... (CONFIRMED)
PINECONE_API_KEY=pcsk_... (CONFIRMED)
PINECONE_INDEX_NAME=webflow-docs (CONFIRMED)
```

Firecrawl API key in `.mcp.json`:
```json
{
  "mcpServers": {
    "firecrawl": {
      "env": {
        "FIRECRAWL_API_KEY": "fc-0816fa448a3a4d8c85daaa724b13885f"
      }
    }
  }
}
```

---

## Sub-Agent: rag-data-pipeline-engineer

**Purpose**: Specialized in ETL, scraping, chunking, embedding generation
**Access to**: All ETL scripts, Firecrawl, OpenAI, Pinecone

**First Task**: Implement comprehensive scraping strategy for Option B

---

## Success Metrics

After completion:
- ✅ 500-800 chunks (vs current 68)
- ✅ 150-200 documents (vs current 24)
- ✅ 3 sources covered (University, API, Blog)
- ✅ <2s query response time
- ✅ 85%+ answer accuracy

---

## Resume Command

When ready to resume:
```bash
cd /Users/ryan.hodge/Projects/webflow-rag
# Work with rag-data-pipeline-engineer sub-agent
# Start with: "Let's implement Option B for data pipeline expansion"
```

---

**Status**: Ready to begin comprehensive data expansion with specialized sub-agent
