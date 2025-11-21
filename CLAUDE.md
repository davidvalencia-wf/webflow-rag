# CLAUDE.md - Webflow RAG Project Reference

**Last Updated**: 2025-11-21
**Status**: 🚀 DEPLOYED TO PRODUCTION (v1.6.0)
**Live URL**: https://webflow-rag.pages.dev
**Purpose**: Comprehensive reference for AI assistants and developers working on this codebase

---

## ⚠️ CRITICAL: For AI Assistants Working on This Codebase

**Before attempting to fix ANY deployment, build, or compatibility error:**

1. **READ**: [DEBUGGING_FRAMEWORK.md](./DEBUGGING_FRAMEWORK.md) - MANDATORY first-principles protocol
2. **VERIFY**: Platform requirements BEFORE making version changes
3. **RESEARCH**: Deploy specialized agents EARLY (after 2nd failed attempt, not 12th)
4. **NO ASSUMPTIONS**: Every hypothesis requires evidence from official documentation
5. **NEVER DOWNGRADE**: Without verifying platform minimum version requirements

**Why This Exists**: We experienced 12+ failed deployments because Claude:
- Assumed issues were "platform bugs" without evidence
- Downgraded Next.js 15 → 14 to "fix" compatibility
- **Reality**: Webflow Cloud REQUIRES Next.js 15+ (violated platform requirement)
- Cost: Hours wasted, blame placed on non-existent bugs

**The Rule**: If you're about to say "this seems like a [platform] bug" or "let's downgrade [package]" → STOP and consult DEBUGGING_FRAMEWORK.md first.

**Quick Links**:
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Complete feature overview
- [Admin Dashboard Guide](./ADMIN_DASHBOARD_GUIDE.md) - Admin analytics platform
- [Features Implemented](./FEATURES_IMPLEMENTED.md) - 6 enhanced features
- [Must Have Trio](./MUST_HAVE_TRIO_IMPLEMENTATION.md) - 3 critical features
- [UI Components](./UI_COMPLETE.md) - Component documentation
- [Brand Redesign](./WEBFLOW_BRAND_REDESIGN.md) - Design system
- [**Debugging Framework**](./DEBUGGING_FRAMEWORK.md) - **⚠️ REQUIRED: First-principles debugging protocol**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Codebase Structure](#codebase-structure)
4. [Code Patterns & Conventions](#code-patterns--conventions)
5. [Data Models](#data-models)
6. [Common Commands & Workflows](#common-commands--workflows)
7. [API Reference](#api-reference)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting & Debugging](#troubleshooting--debugging)
10. [External Dependencies](#external-dependencies)

---

## Project Overview

### Goal
Build a production-grade Retrieval-Augmented Generation (RAG) system that answers questions about Webflow using official documentation sources (University, Blog, API Docs, Forums).

### Target Users
- Webflow developers seeking technical answers
- Designers learning Webflow features
- Product teams evaluating Webflow capabilities

### Non-Goals
- User authentication (MVP)
- Monetization/paid tiers
- Real-time documentation sync
- Multi-language support (future)

### Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Cloudflare Pages (Edge) | Node.js 20+ |
| **Framework** | Next.js (App Router) | 15.1.6 |
| **Language** | TypeScript (strict mode) | 5.9.3 |
| **UI** | React + Tailwind CSS | 19.2.0 + 4.x |
| **Metadata DB** | SQLite (Cloudflare D1) | - |
| **Vector DB** | Pinecone (free tier) | - |
| **Cache** | Key-Value Store (Cloudflare KV) | - |
| **Storage** | Object Storage (Cloudflare R2) | - |
| **LLM** | OpenAI GPT-4o-mini | - |
| **Embeddings** | OpenAI text-embedding-3-small | 1536 dims |
| **Package Manager** | pnpm | 10.21.0 |
| **Monorepo** | pnpm workspaces | - |

### Deployment
- **Platform**: Cloudflare Pages (powers Webflow Cloud)
- **Production URL**: https://webflow-rag.pages.dev
- **Latest Deployment**: https://9eca1a6e.webflow-rag.pages.dev
- **Edge Runtime**: Cloudflare Workers (global, <50ms latency)
- **Status**: ✅ Live and operational

### Current Features (v1.5.0)

#### Core RAG Features
- ✅ **Semantic Search** - Pinecone vector similarity search (1536-dim embeddings)
- ✅ **Streaming Responses** - Real-time answer generation with Server-Sent Events
- ✅ **Source Citations** - Automatic source extraction with clickable links
- ✅ **Caching** - Embedding + response caching via Cloudflare KV
- ✅ **Rate Limiting** - 10 requests/minute per IP

#### Conversation Features
- ✅ **Multi-Turn Conversations** - Context-aware follow-ups (last 6 messages)
- ✅ **Related Questions** - AI-generated suggestions after each answer (GPT-4o-mini)
- ✅ **Saved Conversations** - Bookmark conversations to localStorage (max 20)
- ✅ **Conversation History** - View and resume previous conversations

#### Search & Filtering
- ✅ **Source Type Filtering** - Filter by University/Blog/API Docs/Forum
- ✅ **Confidence Indicators** - High/Medium/Limited badges based on match quality
- ✅ **Knowledge Base Stats** - Real-time statistics dashboard
- ✅ **Search History** - localStorage-based history with re-run capability

#### Code & Content Features
- ✅ **Syntax Highlighting** - react-syntax-highlighter with oneDark theme
- ✅ **Code Copy Buttons** - Individual copy per code block
- ✅ **Markdown Formatting** - Headings, lists, bold, italic, inline code
- ✅ **Regenerate Answers** - 4 strategies (default, more sources, simpler, technical)

#### Export & Share
- ✅ **Share URLs** - Query parameter-based sharing
- ✅ **Download Markdown** - Export Q&A as .md files
- ✅ **Copy for Slack** - Slack mrkdwn formatting

#### UI & UX
- ✅ **Webflow Branding** - Official colors (#146EF5), Poppins + Inter fonts
- ✅ **Premium Interactions** - Blue glow, gradient heading, pulse animations
- ✅ **Responsive Design** - Mobile-first (320px - 1920px)
- ✅ **WCAG AA Accessibility** - Keyboard navigation, ARIA labels, color contrast
- ✅ **Feedback Widget** - Thumbs up/down with optional text

#### Admin Dashboard (NEW in v1.5.0)
- ✅ **Content Gap Analysis** - Identify unanswered questions, zero citation queries, trending gaps
- ✅ **Usage Analytics** - DAU/WAU/MAU, active users, session duration, retention curves
- ✅ **Performance Monitoring** - P50/P95/P99 latency, error rates, cache hit rates, streaming failures
- ✅ **Quality Metrics** - Confidence scores, satisfaction rates, regeneration tracking
- ✅ **Cost Tracking** - OpenAI, Pinecone, and Cloudflare usage with cost per query analysis
- ✅ **Content Analytics** - Top queries, citation analysis, source distribution, uncited sources
- ✅ **Trend Analysis** - Query volume over time, topic trends, geographic distribution
- ✅ **Topic Trends** - Emerging topics detection, seasonal patterns, intent distribution
- ✅ **Sentiment Analysis** - Feedback categorization, complaint tracking, improvement trends
- ✅ **CSV Export** - Export analytics data for external analysis

**Total**: 35+ production-ready features (25 user-facing + 10 admin)

---

## Architecture Decisions

### Why Webflow Cloud?
**Decision**: Deploy exclusively on Webflow Cloud (not Vercel/Netlify/Cloudflare Pages directly)

**Rationale**:
- Native integration with Webflow ecosystem
- Powered by Cloudflare Workers (edge runtime, global performance)
- Built-in storage options (D1, KV, R2)
- Simplified billing and management
- Future integration with Webflow marketing site

**Alternatives Considered**:
- ❌ **Vercel**: Better Next.js DX, but misses Webflow ecosystem integration
- ❌ **Cloudflare Pages Direct**: More control, but duplicate Webflow Cloud's functionality

**Trade-offs**:
- ⚠️ Limited to npm package manager (no pnpm in Webflow Cloud deployments yet)
- ⚠️ Beta platform with evolving features
- ✅ Edge runtime performance
- ✅ Integrated storage solutions

---

### Why Next.js over Astro?
**Decision**: Use Next.js 16 with App Router

**Rationale**:
- Superior API route support for streaming responses
- React Server Components for optimal performance
- Larger ecosystem for RAG/LLM integrations
- Better state management for complex UIs
- Native streaming support for OpenAI responses

**Alternatives Considered**:
- ❌ **Astro**: Lighter, faster builds, but limited dynamic API capabilities
- ❌ **SvelteKit**: Great DX, smaller community for RAG use cases

**When to Reconsider**: If the app becomes primarily static content with minimal interactivity

---

### Why Pinecone for Vectors?
**Decision**: Use Pinecone free tier (external vector database)

**Rationale**:
- Webflow Cloud doesn't include Cloudflare Vectorize (yet)
- Native vector similarity search (no manual cosine calculations)
- Free tier: 100k vectors, 1 index, 5M queries/month
- Proven for RAG applications
- Simple REST API

**Alternatives Considered**:
- ❌ **SQLite BLOB vectors**: Naive similarity search doesn't scale, slow
- ❌ **Qdrant Cloud**: Great features, but free tier more limited
- ❌ **Weaviate Cloud**: Over-engineered for MVP

**Trade-offs**:
- ⚠️ External dependency (network latency)
- ⚠️ Vendor lock-in (migration effort if switching)
- ✅ No infrastructure management
- ✅ Free tier sufficient for MVP

**When to Reconsider**: If Webflow Cloud adds Vectorize support, or if vector count exceeds 100k

---

### Why OpenAI over Cloudflare Workers AI?
**Decision**: Use OpenAI for both embeddings and LLM

**Rationale**:
- **Embeddings**: `text-embedding-3-small` is industry standard (1536 dims, $0.02/1M tokens)
- **LLM**: `gpt-4o-mini` balances quality and cost ($0.15/1M input tokens)
- Proven reliability and quality for RAG
- Streaming support out-of-the-box
- Large context window (128k tokens)

**Alternatives Considered**:
- ❌ **Cloudflare Workers AI**: Cost-effective, but lower quality for RAG
- ❌ **Anthropic Claude**: Excellent quality, but 2x cost for MVP
- ❌ **Local embeddings**: Inference latency on edge runtime

**Trade-offs**:
- ⚠️ External API dependency (OpenAI outages affect app)
- ⚠️ Higher cost than Workers AI (~10x)
- ✅ Superior answer quality
- ✅ Better citation accuracy

**Cost Levers**:
1. **Caching**: Cache embeddings in KV (hit rate 50%+ saves ~$0.50/month per 10k queries)
2. **Model downgrade**: Switch to Workers AI if cost > $50/month
3. **Context optimization**: Reduce top_k from 5 to 3 chunks

---

### Why SQLite (D1) over PostgreSQL?
**Decision**: Use Cloudflare D1 (SQLite) for metadata

**Rationale**:
- Native Webflow Cloud integration
- Excellent for read-heavy workloads (queries, analytics)
- 10GB limit sufficient for metadata (not storing full documents)
- Full-text search (FTS5) for fallback search
- Zero cold-start (edge-optimized)

**Alternatives Considered**:
- ❌ **PostgreSQL (Neon/Supabase)**: Over-engineered, adds latency
- ❌ **Cloudflare KV only**: No relational queries, no transactions

**Trade-offs**:
- ⚠️ 10GB limit (not suitable for large binary data)
- ⚠️ Eventual consistency in some scenarios
- ✅ Fast reads at the edge
- ✅ No cold-starts

---

### ETL: TypeScript vs Python?
**Decision**: Use TypeScript for ETL pipeline

**Rationale**:
- Consistency with monorepo (single language)
- Reuse types from `packages/shared`
- Same dependencies (OpenAI SDK, Pinecone client)
- Easier for web developers to maintain

**Alternatives Considered**:
- ❌ **Python**: Better ML library ecosystem (LangChain, etc.), but introduces second runtime
- ❌ **Deno**: Great TypeScript support, but less mature ecosystem

**When to Reconsider**: If complex NLP preprocessing is needed (Python's NLTK, spaCy)

---

## Codebase Structure

### Monorepo Layout

```
webflow-rag/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD: lint → build → deploy
├── apps/
│   └── web/                     # Next.js app (primary app)
│       ├── src/
│       │   ├── app/             # App Router pages
│       │   │   ├── api/         # API routes
│       │   │   │   ├── health/route.ts
│       │   │   │   ├── version/route.ts
│       │   │   │   ├── ask/route.ts        # RAG streaming endpoint
│       │   │   │   ├── search/route.ts     # Full-text search
│       │   │   │   ├── stats/route.ts      # Knowledge base stats
│       │   │   │   ├── feedback/route.ts   # User feedback
│       │   │   │   └── admin/              # Admin analytics routes (9 routes)
│       │   │   │       ├── content-gaps/route.ts
│       │   │   │       ├── analytics/
│       │   │   │       │   ├── overview/route.ts
│       │   │   │       │   ├── performance/route.ts
│       │   │   │       │   ├── quality/route.ts
│       │   │   │       │   ├── cost/route.ts
│       │   │   │       │   ├── content/route.ts
│       │   │   │       │   └── trends/route.ts
│       │   │   │       ├── topic-trends/route.ts
│       │   │   │       └── sentiment/route.ts
│       │   │   ├── admin/
│       │   │   │   └── page.tsx # Admin dashboard (1,384 lines)
│       │   │   ├── layout.tsx   # Root layout
│       │   │   ├── page.tsx     # Homepage (search UI)
│       │   │   └── globals.css  # Tailwind imports
│       │   ├── lib/             # Shared utilities
│       │   │   ├── db.ts        # D1 database client
│       │   │   ├── kv.ts        # KV client
│       │   │   ├── r2.ts        # R2 client
│       │   │   ├── pinecone.ts  # Pinecone client
│       │   │   ├── openai.ts    # OpenAI client
│       │   │   ├── rag.ts       # RAG pipeline logic
│       │   │   ├── cache.ts     # Caching layer
│       │   │   ├── rate-limit.ts # Rate limiting
│       │   │   ├── saved-conversations.ts # localStorage helpers
│       │   │   ├── animations.ts # GSAP animations
│       │   │   ├── analytics.ts # Analytics helpers (NEW)
│       │   │   ├── csv-export.ts # CSV export (NEW)
│       │   │   ├── dev-data.ts  # Mock data for development (NEW)
│       │   │   └── utils.ts     # General utilities
│       │   └── components/      # React components (25+ total)
│       │       ├── SearchBox.tsx # Main search input
│       │       ├── StreamingAnswer.tsx # Answer display + syntax highlighting
│       │       ├── CitationList.tsx # Source cards
│       │       ├── FeedbackWidget.tsx # Thumbs up/down
│       │       ├── HistoryView.tsx # Search history
│       │       ├── KnowledgeBaseStats.tsx # Stats dashboard
│       │       ├── ExportActions.tsx # Export/share buttons
│       │       ├── SavedConversations.tsx # Bookmarks modal
│       │       ├── RegenerateButton.tsx # Regenerate dropdown
│       │       ├── ConfidenceBadge.tsx # Confidence indicators
│       │       ├── WebflowLogo.tsx # SVG logo component
│       │       ├── MagneticButton.tsx # Interactive button
│       │       ├── AnimatedCounter.tsx # Animated number display
│       │       ├── admin/       # Admin components (8 components)
│       │       │   ├── AdminLayout.tsx # Dashboard sidebar layout
│       │       │   ├── MetricCard.tsx # KPI display cards
│       │       │   ├── Badge.tsx # Status/priority badges
│       │       │   ├── LoadingState.tsx # Skeleton loaders
│       │       │   ├── EmptyState.tsx # No data states
│       │       │   ├── DataTable.tsx # Sortable tables
│       │       │   ├── ChartContainer.tsx # Chart wrapper
│       │       │   └── README.md # Admin component docs
│       │       ├── hooks/       # React hooks
│       │       │   ├── useToast.tsx # Toast notifications
│       │       │   └── useAnimations.ts # GSAP animation hooks
│       │       ├── index.ts # Component exports
│       │       └── README.md # Component documentation
│       ├── public/              # Static assets
│       ├── wrangler.json        # Webflow Cloud config
│       ├── next.config.ts       # Next.js config
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── shared/                  # Shared types/utilities
│       ├── index.ts             # Exports
│       ├── types.ts             # TypeScript types
│       └── package.json
├── etl/                         # ETL pipeline
│   ├── input/                   # Source files (gitignored)
│   ├── output/                  # Processed data (gitignored)
│   ├── checks/                  # Validation scripts
│   ├── ingest.ts                # Main ETL script
│   ├── chunker.ts               # Text chunking logic
│   ├── embedder.ts              # Embedding generation
│   ├── uploader.ts              # Push to Pinecone/D1
│   └── package.json
├── docs/
│   ├── MVP_PLAN.md              # Phase-by-phase implementation plan
│   ├── CLAUDE.md                # This file
│   └── adr/                     # Architecture Decision Records
│       ├── 001-webflow-cloud.md
│       ├── 002-pinecone-vectors.md
│       └── 003-openai-models.md
├── scripts/                     # Utility scripts
│   ├── seed-db.ts               # Seed SQLite with test data
│   └── migrate-db.ts            # Run D1 migrations
├── .gitignore
├── package.json                 # Root package.json (workspaces)
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── README.md                    # User-facing setup guide
```

### Module Responsibilities

| Module | Purpose |
|--------|---------|
| `apps/web/src/app/api/` | API route handlers (health, version, ask, search, admin) |
| `apps/web/src/lib/` | Business logic, external clients, utilities (no React) |
| `apps/web/src/components/` | React UI components (presentational + interactive) |
| `packages/shared/` | Cross-workspace types and utilities (no dependencies) |
| `etl/` | Data ingestion pipeline (runs locally, not deployed) |
| `docs/` | Documentation and ADRs |
| `scripts/` | One-off utilities (migrations, seeding, testing) |

---

## Code Patterns & Conventions

### TypeScript Patterns

#### 1. Strict Mode Always
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

#### 2. Avoid `any` - Use `unknown` + Type Guards
```typescript
// ❌ Bad
function parseData(data: any) {
  return data.items.map((item: any) => item.name);
}

// ✅ Good
import { z } from 'zod';

const DataSchema = z.object({
  items: z.array(z.object({ name: z.string() }))
});

function parseData(data: unknown) {
  const parsed = DataSchema.parse(data);
  return parsed.items.map(item => item.name);
}
```

#### 3. Use Zod for All External Input
```typescript
// apps/web/src/app/api/ask/route.ts
import { z } from 'zod';

const AskRequestSchema = z.object({
  query: z.string().min(1).max(500),
  options: z.object({
    model: z.enum(['gpt-4o', 'gpt-4o-mini']).optional(),
    top_k: z.number().int().min(1).max(10).optional()
  }).optional()
});

export async function POST(req: Request) {
  const body = await req.json();
  const { query, options } = AskRequestSchema.parse(body); // Throws on invalid input
  // ...
}
```

#### 4. Database Types from Schema
```typescript
// packages/shared/types.ts
export type Document = {
  id: string;
  uri: string;
  title: string | null;
  source_type: string | null;
  license: string | null;
  created_at: string;
  updated_at: string;
};

export type Chunk = {
  id: string;
  document_id: string;
  content: string;
  hash: string;
  token_count: number | null;
  section: string | null;
  chunk_index: number | null;
  created_at: string;
};
```

#### 5. Error Handling Pattern
```typescript
// apps/web/src/lib/utils.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Usage in API routes
try {
  const result = await ragQuery(query);
  return Response.json(result);
} catch (error) {
  if (error instanceof AppError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  console.error('Unexpected error:', error);
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### API Design Conventions

#### Request/Response Format
```typescript
// All API routes return JSON with consistent shape

// Success response
{
  "data": { /* payload */ },
  "meta": { /* optional metadata */ }
}

// Error response
{
  "error": "Human-readable message",
  "code": "ERROR_CODE",
  "details": { /* optional context */ }
}
```

#### Rate Limiting Pattern
```typescript
// apps/web/src/lib/rate-limit.ts
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function checkRateLimit(req: Request): Promise<boolean> {
  const { env } = getCloudflareContext();
  const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `ratelimit:${ip}`;

  const count = await env.KV.get<number>(key) || 0;
  if (count >= 10) { // 10 requests per minute
    return false;
  }

  await env.KV.put(key, (count + 1).toString(), { expirationTtl: 60 });
  return true;
}
```

#### Logging Pattern
```typescript
// Structured JSON logs
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  level: 'info',
  message: 'RAG query completed',
  request_id: crypto.randomUUID(),
  query: query,
  latency_ms: performance.now() - start,
  model: 'gpt-4o-mini',
  top_k: 5
}));
```

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **React Components** | PascalCase | `SearchBox.tsx`, `CitationList.tsx` |
| **Utilities/Libs** | camelCase | `db.ts`, `openai.ts`, `ragPipeline.ts` |
| **API Routes** | lowercase + route.ts | `api/ask/route.ts`, `api/health/route.ts` |
| **Types** | PascalCase + Type suffix | `DocumentType`, `ChunkType` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_QUERY_LENGTH`, `DEFAULT_TOP_K` |

### Import Order
```typescript
// 1. External dependencies
import { z } from 'zod';
import OpenAI from 'openai';

// 2. Internal aliases (@/*)
import { ragQuery } from '@/lib/rag';
import { checkRateLimit } from '@/lib/rate-limit';

// 3. Relative imports
import { SearchBox } from '../components/SearchBox';

// 4. Types
import type { Document, Chunk } from '@shared/types';
```

---

## Data Models

### SQLite Schema (Cloudflare D1)

Located in: `apps/web/migrations/0001_initial.sql`

#### `documents` Table
```sql
CREATE TABLE documents (
  id TEXT PRIMARY KEY,              -- UUID
  uri TEXT NOT NULL UNIQUE,         -- Source URL
  title TEXT,                       -- Document title
  source_type TEXT,                 -- 'university' | 'blog' | 'api-docs' | 'forum'
  license TEXT,                     -- License info (e.g., 'CC BY 4.0')
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

#### `chunks` Table
```sql
CREATE TABLE chunks (
  id TEXT PRIMARY KEY,              -- UUID
  document_id TEXT NOT NULL,        -- FK to documents.id
  content TEXT NOT NULL,            -- Chunk text (512 tokens avg)
  hash TEXT NOT NULL,               -- SHA-256 of content (deduplication)
  token_count INTEGER,              -- Approximate token count
  section TEXT,                     -- Heading/section context
  chunk_index INTEGER,              -- Position in document (0-indexed)
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE INDEX idx_chunks_document ON chunks(document_id);
CREATE INDEX idx_chunks_hash ON chunks(hash);

-- Full-text search index (fallback for Phase 1)
CREATE VIRTUAL TABLE chunks_fts USING fts5(
  content,
  content=chunks,
  content_rowid=id
);
```

#### `queries` Table
```sql
CREATE TABLE queries (
  id TEXT PRIMARY KEY,              -- UUID
  query_text TEXT NOT NULL,         -- User's question
  embedding_hash TEXT,              -- SHA-256 of query (for caching)
  user_ip TEXT,                     -- Hashed IP (for rate limiting)
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_queries_created ON queries(created_at DESC);
```

#### `responses` Table
```sql
CREATE TABLE responses (
  id TEXT PRIMARY KEY,              -- UUID
  query_id TEXT NOT NULL,           -- FK to queries.id
  answer TEXT NOT NULL,             -- LLM response
  sources TEXT,                     -- JSON array: [{ uri, title, section }]
  model TEXT,                       -- e.g., 'gpt-4o-mini'
  latency_ms INTEGER,               -- Response time
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (query_id) REFERENCES queries(id) ON DELETE CASCADE
);

CREATE INDEX idx_responses_query ON responses(query_id);
```

#### `feedback` Table
```sql
CREATE TABLE feedback (
  id TEXT PRIMARY KEY,              -- UUID
  response_id TEXT NOT NULL,        -- FK to responses.id
  helpful INTEGER,                  -- 1=yes, 0=no, null=not answered
  issue_report TEXT,                -- Free-form feedback
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (response_id) REFERENCES responses(id) ON DELETE CASCADE
);
```

### Pinecone Index Structure

**Index Name**: `webflow-docs`
**Dimension**: 1536 (OpenAI text-embedding-3-small)
**Metric**: cosine similarity

#### Vector Metadata Schema
```typescript
{
  id: string;              // UUID (matches chunks.id in D1)
  document_id: string;     // FK to documents.id
  content: string;         // Full chunk text (for display)
  uri: string;             // Source URL
  title: string;           // Document title
  section?: string;        // Section heading
  source_type: string;     // Filter: 'university' | 'blog' | 'api-docs'
  token_count: number;
  created_at: string;      // ISO timestamp
}
```

#### Query Pattern
```typescript
const results = await pinecone.query({
  vector: embedding,       // [1536 floats]
  topK: 5,
  includeMetadata: true,
  filter: {
    source_type: { $in: ['university', 'api-docs'] }  // Optional filter
  }
});
```

### Key-Value Store (Cloudflare KV)

#### Namespace: `webflow-rag-cache`

**Key Patterns**:
```
embedding:{hash}          → JSON-encoded embedding vector
response:{query_hash}     → JSON-encoded cached response
ratelimit:{ip_hash}       → Request count (TTL: 60s)
```

**Example Usage**:
```typescript
// Cache embedding
const hash = sha256(query);
const cached = await env.KV.get(`embedding:${hash}`, 'json');
if (cached) return cached;

const embedding = await openai.embeddings.create({ input: query });
await env.KV.put(`embedding:${hash}`, JSON.stringify(embedding), {
  expirationTtl: 86400  // 24 hours
});
```

---

## Common Commands & Workflows

### Development

```bash
# Install dependencies
pnpm install

# Run dev server (apps/web only)
pnpm dev
# Opens http://localhost:3000

# Run dev with Wrangler (for D1/KV/R2 bindings)
cd apps/web
npx wrangler dev --local

# Typecheck all packages
pnpm typecheck

# Lint all packages
pnpm lint

# Format code
pnpm format
```

### Database Migrations

```bash
# Create new migration
cd apps/web
npx wrangler d1 migrations create webflow-rag "migration_name"

# Apply migrations (local)
npx wrangler d1 migrations apply webflow-rag --local

# Apply migrations (production)
npx wrangler d1 migrations apply webflow-rag --remote

# Query local database
npx wrangler d1 execute webflow-rag --local --command "SELECT * FROM documents LIMIT 10"

# Query production database
npx wrangler d1 execute webflow-rag --remote --command "SELECT COUNT(*) FROM chunks"
```

### ETL Pipeline

```bash
# Run full ETL pipeline
cd etl
node --loader ts-node/esm ingest.ts

# Steps (can run individually):
# 1. Download sources to etl/input/
node --loader ts-node/esm scripts/download.ts

# 2. Chunk documents
node --loader ts-node/esm chunker.ts

# 3. Generate embeddings
node --loader ts-node/esm embedder.ts

# 4. Upload to Pinecone + D1
node --loader ts-node/esm uploader.ts

# Validate upload
node --loader ts-node/esm checks/validate.ts
```

### Deployment

```bash
# Deploy to Webflow Cloud (manual)
cd apps/web
webflow cloud deploy

# Deploy via GitHub (automatic)
git push origin main
# GitHub Actions → builds → deploys to Webflow Cloud

# Check deployment status
webflow cloud status

# View logs
webflow cloud logs --tail
```

### Testing

```bash
# Run unit tests (future)
pnpm test

# Test API endpoint locally
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I create a collection in Webflow?"}'

# Test health endpoint
curl http://localhost:3000/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Test version endpoint
curl http://localhost:3000/api/version
# Expected: {"version":"0.1.0","git_sha":"abc123"}
```

---

## API Reference

### `GET /api/health`

**Purpose**: Health check endpoint

**Request**: None

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-11-12T10:30:00.000Z"
}
```

**Status Codes**:
- `200`: Service healthy
- `503`: Service degraded (DB unavailable, etc.)

---

### `GET /api/version`

**Purpose**: Version and build information

**Request**: None

**Response**:
```json
{
  "version": "0.1.0",
  "git_sha": "abc123def456",
  "build_time": "2025-11-12T10:00:00.000Z"
}
```

---

### `POST /api/search` (Phase 1 - Full-Text Search)

**Purpose**: Search chunks using SQLite FTS (fallback before vectors)

**Request**:
```json
{
  "query": "How do I create a collection?",
  "limit": 5
}
```

**Response**:
```json
{
  "results": [
    {
      "chunk_id": "uuid",
      "content": "To create a collection in Webflow...",
      "document": {
        "uri": "https://university.webflow.com/...",
        "title": "Collections Guide",
        "section": "Creating Collections"
      },
      "score": 0.85
    }
  ],
  "total": 42
}
```

**Validation**:
- `query`: 1-500 characters
- `limit`: 1-20, default 5

---

### `POST /api/ask` (Phase 2 - RAG)

**Purpose**: Semantic search + LLM answer with citations

**Request**:
```json
{
  "query": "How do I create a collection in Webflow?",
  "options": {
    "model": "gpt-4o-mini",  // optional
    "top_k": 5               // optional
  }
}
```

**Response** (Streaming):
```
data: {"type":"chunk","content":"To create a collection"}
data: {"type":"chunk","content":" in Webflow, follow"}
data: {"type":"chunk","content":" these steps:\n\n1. Go to"}
...
data: {"type":"done","sources":[{"uri":"...","title":"...","section":"..."}]}
```

**Validation**:
- `query`: 1-500 characters, required
- `options.model`: `"gpt-4o"` | `"gpt-4o-mini"`, default `"gpt-4o-mini"`
- `options.top_k`: 1-10, default 5

**Rate Limit**: 10 requests/minute per IP

**Status Codes**:
- `200`: Success (streaming)
- `400`: Validation error
- `429`: Rate limit exceeded
- `500`: Internal error

**Error Response**:
```json
{
  "error": "Query too long",
  "code": "VALIDATION_ERROR",
  "details": { "max_length": 500 }
}
```

---

### `POST /api/feedback`

**Purpose**: Submit user feedback on responses

**Request**:
```json
{
  "response_id": "uuid",
  "helpful": true,           // optional
  "issue_report": "..."      // optional
}
```

**Response**:
```json
{
  "feedback_id": "uuid"
}
```

---

### `GET /api/admin/content-gaps`

**Purpose**: Identify content gaps in the knowledge base

**Request**: None (requires auth in future)

**Response**:
```json
{
  "unanswered_questions": [
    {
      "query": "How do I...",
      "count": 12,
      "avg_confidence": 0.23,
      "last_asked": "2025-11-19T..."
    }
  ],
  "zero_citation_queries": [...],
  "most_regenerated": [...],
  "topic_clusters": [...],
  "trending_gaps": [...]
}
```

---

### `GET /api/admin/analytics/overview`

**Purpose**: Usage analytics and user metrics

**Response**:
```json
{
  "queries_total": 1523,
  "queries_today": 47,
  "queries_7d": 342,
  "queries_30d": 1289,
  "active_users": {
    "dau": 23,
    "wau": 87,
    "mau": 245
  },
  "avg_queries_per_user": 4.2,
  "avg_session_duration_minutes": 12.5,
  "retention_curve": [...]
}
```

---

### `GET /api/admin/analytics/performance`

**Purpose**: Performance metrics and latency tracking

**Response**:
```json
{
  "latency": {
    "p50": 1230,
    "p95": 2450,
    "p99": 4120
  },
  "error_rate": 0.02,
  "cache_hit_rate": 0.42,
  "streaming_failure_rate": 0.01,
  "latency_breakdown": {
    "pinecone_avg_ms": 450,
    "openai_avg_ms": 780
  }
}
```

---

### `GET /api/admin/analytics/quality`

**Purpose**: Answer quality metrics

**Response**:
```json
{
  "avg_confidence_score": 0.78,
  "feedback_scores": {
    "helpful": 89,
    "not_helpful": 11
  },
  "regeneration_rate": 0.15,
  "top_not_helpful_reasons": [...]
}
```

---

### `GET /api/admin/analytics/cost`

**Purpose**: Cost tracking and budget monitoring

**Response**:
```json
{
  "openai": {
    "embeddings_cost": 2.45,
    "completions_cost": 12.30
  },
  "pinecone_cost": 0.00,
  "cloudflare": {
    "kv_cost": 0.50,
    "d1_cost": 0.25,
    "r2_cost": 0.10
  },
  "cost_per_query": 0.015,
  "monthly_burn_rate": 15.60
}
```

---

### `GET /api/admin/analytics/content`

**Purpose**: Content analytics and citation tracking

**Response**:
```json
{
  "top_queries": [
    { "query": "...", "count": 23 },
    ...
  ],
  "top_cited_sources": [...],
  "uncited_sources": [...],
  "source_type_distribution": {
    "university": 45,
    "blog": 23,
    "api-docs": 32
  }
}
```

---

### `GET /api/admin/analytics/trends`

**Purpose**: Temporal analysis and geographic distribution

**Response**:
```json
{
  "queries_over_time": [
    { "date": "2025-11-19", "count": 47 },
    ...
  ],
  "topic_trends": [...],
  "query_volume_heatmap": [...],
  "geographic_distribution": [...]
}
```

---

### `GET /api/admin/topic-trends`

**Purpose**: Advanced topic trend detection

**Response**:
```json
{
  "trending_topics": [
    {
      "topic": "collections",
      "status": "rising",
      "growth_rate": 0.35
    }
  ],
  "seasonal_patterns": [...],
  "emerging_topics": [...],
  "intent_distribution": {
    "how-to": 45,
    "troubleshooting": 30,
    "conceptual": 25
  }
}
```

---

### `GET /api/admin/sentiment`

**Purpose**: Sentiment analysis and feedback categorization

**Response**:
```json
{
  "sentiment_overview": {
    "positive": 72,
    "neutral": 18,
    "negative": 10
  },
  "complaint_categories": [
    { "category": "incomplete_answer", "count": 15 },
    ...
  ],
  "improvement_trends": [...],
  "action_items": [...]
}
```

---

## Deployment Guide

### Prerequisites

1. **Webflow Cloud Account** (beta access)
2. **API Keys**:
   - OpenAI API key
   - Pinecone API key
3. **GitHub Repository** (for CI/CD)

### Initial Setup

#### 1. Install Webflow CLI
```bash
npm install -g webflow-cli

# Verify installation
webflow --version
```

#### 2. Authenticate
```bash
webflow login
# Opens browser for authentication
```

#### 3. Initialize Webflow Cloud Project
```bash
cd apps/web
webflow cloud init

# Follow prompts:
# - Select existing Next.js project
# - Choose mount path (e.g., /app)
# - Select environment (production/staging)
```

This generates `wrangler.json`:
```json
{
  "name": "webflow-rag",
  "compatibility_date": "2025-11-12",
  "pages_build_output_dir": ".next",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webflow-rag",
      "database_id": "auto-generated-on-deploy"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "auto-generated-on-deploy"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "webflow-rag-assets"
    }
  ]
}
```

#### 4. Set Environment Variables
```bash
# Local development (.env.local)
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=webflow-docs

# Production (via Webflow Cloud dashboard)
# Settings → Environment Variables
```

#### 5. Create D1 Database
```bash
npx wrangler d1 create webflow-rag
# Returns database_id → add to wrangler.json
```

#### 6. Run Migrations
```bash
npx wrangler d1 migrations apply webflow-rag --remote
```

#### 7. Deploy
```bash
webflow cloud deploy

# Expected output:
# ✓ Building Next.js app
# ✓ Uploading to Webflow Cloud
# ✓ Deployment complete
# URL: https://your-project.webflow.io
```

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Webflow Cloud

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10.21.0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Build
        run: pnpm build

      - name: Deploy to Webflow Cloud
        run: |
          npm install -g webflow-cli
          webflow cloud deploy
        env:
          WEBFLOW_API_TOKEN: ${{ secrets.WEBFLOW_API_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          PINECONE_API_KEY: ${{ secrets.PINECONE_API_KEY }}
```

**Required GitHub Secrets**:
- `WEBFLOW_API_TOKEN`
- `OPENAI_API_KEY`
- `PINECONE_API_KEY`

---

## Troubleshooting & Debugging

### Common Errors

#### 1. `Error: Cannot find module '@opennextjs/cloudflare'`

**Cause**: Missing Cloudflare adapter for Next.js

**Solution**:
```bash
cd apps/web
npm install @opennextjs/cloudflare
```

Add to `next.config.ts`:
```typescript
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default {
  // ... other config
};
```

---

#### 2. `D1_ERROR: no such table: documents`

**Cause**: Migrations not applied

**Solution**:
```bash
# Check migration status
npx wrangler d1 migrations list webflow-rag --remote

# Apply missing migrations
npx wrangler d1 migrations apply webflow-rag --remote
```

---

#### 3. `PineconeError: Index 'webflow-docs' not found`

**Cause**: Index not created in Pinecone dashboard

**Solution**:
1. Go to https://app.pinecone.io
2. Create index:
   - Name: `webflow-docs`
   - Dimension: `1536`
   - Metric: `cosine`
3. Update `.env`: `PINECONE_INDEX_NAME=webflow-docs`

---

#### 4. `OpenAI RateLimitError: 429 Too Many Requests`

**Cause**: Exceeded OpenAI API rate limits

**Solution**:
- Check usage: https://platform.openai.com/usage
- Implement exponential backoff:
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

---

#### 5. `wrangler deploy` fails with "npm not found"

**Cause**: Webflow Cloud currently only supports npm, but local dev uses pnpm

**Solution**:
- Keep local dev with pnpm
- Generate `package-lock.json` for deployment:
```bash
cd apps/web
npm install --package-lock-only
git add package-lock.json
```

---

#### 6. Slow query performance (>5s)

**Diagnosis**:
```typescript
// Add timing logs
const start = performance.now();
const embedding = await openai.embeddings.create({ input: query });
console.log('Embedding time:', performance.now() - start);

const results = await pinecone.query({ vector: embedding });
console.log('Pinecone time:', performance.now() - start);
```

**Common Causes**:
- **Pinecone latency**: Use caching (KV) for embeddings
- **Large context**: Reduce `top_k` from 5 to 3
- **OpenAI timeout**: Increase timeout or use smaller model

---

### Debugging Tips

#### Enable Verbose Logging
```bash
# Local dev
WRANGLER_LOG=debug npx wrangler dev

# Production logs
webflow cloud logs --tail --level=debug
```

#### Inspect D1 Database
```bash
# Get row counts
npx wrangler d1 execute webflow-rag --remote \
  --command "SELECT
    (SELECT COUNT(*) FROM documents) as docs,
    (SELECT COUNT(*) FROM chunks) as chunks,
    (SELECT COUNT(*) FROM queries) as queries"

# Inspect recent queries
npx wrangler d1 execute webflow-rag --remote \
  --command "SELECT * FROM queries ORDER BY created_at DESC LIMIT 10"
```

#### Test Pinecone Connection
```bash
curl https://controller.YOUR_ENV.pinecone.io/databases \
  -H "Api-Key: $PINECONE_API_KEY"
```

#### Validate Embeddings
```typescript
// Check embedding dimension
const embedding = await openai.embeddings.create({
  input: "test query",
  model: "text-embedding-3-small"
});
console.log('Dimension:', embedding.data[0].embedding.length);
// Expected: 1536
```

---

## External Dependencies

### Webflow Cloud APIs

**Documentation**: https://developers.webflow.com/webflow-cloud

#### D1 (SQLite) Bindings
```typescript
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function GET() {
  const { env } = getCloudflareContext();
  const result = await env.DB.prepare(
    "SELECT * FROM documents WHERE source_type = ?"
  ).bind('university').all();

  return Response.json(result);
}
```

#### KV Bindings
```typescript
const { env } = getCloudflareContext();

// Read
const value = await env.KV.get('key', 'json');

// Write
await env.KV.put('key', JSON.stringify(data), {
  expirationTtl: 3600  // 1 hour
});

// Delete
await env.KV.delete('key');

// List keys
const keys = await env.KV.list({ prefix: 'embedding:' });
```

#### R2 Bindings (Future)
```typescript
const { env } = getCloudflareContext();

// Upload file
await env.R2.put('path/to/file.pdf', fileBuffer, {
  httpMetadata: { contentType: 'application/pdf' }
});

// Download file
const object = await env.R2.get('path/to/file.pdf');
const buffer = await object.arrayBuffer();
```

---

### Pinecone SDK

**Documentation**: https://docs.pinecone.io/

```typescript
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);

// Upsert vectors
await index.upsert([
  {
    id: 'chunk-uuid',
    values: embedding,  // [1536 floats]
    metadata: {
      document_id: 'doc-uuid',
      content: 'Full chunk text...',
      uri: 'https://...',
      title: 'Document Title'
    }
  }
]);

// Query
const results = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true
});
```

---

### OpenAI SDK

**Documentation**: https://platform.openai.com/docs

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

// Generate embeddings
const embeddingResponse = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'Query text',
  encoding_format: 'float'
});
const embedding = embeddingResponse.data[0].embedding;  // [1536 floats]

// Generate answer (streaming)
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a Webflow expert...' },
    { role: 'user', content: 'How do I create a collection?' }
  ],
  stream: true
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  // Stream to client
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-11-12 | Initial CLAUDE.md creation, Phase 0 complete |
| 0.2.0 | 2025-11-13 | Phase 1 complete: Core infrastructure, database, API endpoints |
| 0.3.0 | 2025-11-13 | Phase 2 complete: RAG pipeline, OpenAI/Pinecone integration, streaming |
| 0.4.0 | 2025-11-14 | Phase 3 complete: UI components (5 components) |
| 0.5.0 | 2025-11-15 | Webflow brand redesign (design sub-agent) |
| 0.6.0 | 2025-11-15 | Enhanced features (multi-turn, related questions, filtering, confidence, stats, export) |
| 0.7.0 | 2025-11-15 | Must Have Trio (syntax highlighting, saved conversations, regenerate) |
| 1.0.0 | 2025-11-16 | Production-ready release: 25+ features, 11 components, full documentation |
| 1.1.0 | 2025-11-17 | Admin dashboard foundation: AdminLayout, routing structure |
| 1.2.0 | 2025-11-17 | Admin analytics API routes: 9 endpoints (content-gaps, analytics suite, topic-trends, sentiment) |
| 1.3.0 | 2025-11-17 | Admin UI components: MetricCard, Badge, DataTable, LoadingState, EmptyState, ChartContainer |
| 1.4.0 | 2025-11-17 | ETL pipeline expansion: 690+ articles from developers.webflow.com, 5.3MB chunk data |
| 1.5.0 | 2025-11-19 | Complete admin analytics platform: 35+ features, 25+ components, CSV export, mock data system |
| **1.6.0** | **2025-11-20** | **🚀 PRODUCTION DEPLOYMENT: Edge-compatible Pinecone client, Cloudflare Pages deployment, live at webflow-rag.pages.dev** |

---

## Quick Reference Card

```bash
# Development
pnpm dev                          # Start Next.js dev server
pnpm typecheck                    # Check types
pnpm lint                         # Lint code

# Database
npx wrangler d1 migrations apply webflow-rag --remote
npx wrangler d1 execute webflow-rag --remote --command "SQL"

# Deployment
webflow cloud deploy              # Deploy to Webflow Cloud
webflow cloud logs --tail         # View production logs

# ETL
cd etl && node ingest.ts          # Run full pipeline

# Testing
curl localhost:3000/api/health   # Health check
curl -X POST localhost:3000/api/ask -d '{"query":"test"}'
```

---

**End of CLAUDE.md** - Update this file as architecture evolves.
