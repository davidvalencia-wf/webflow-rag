# Quick Setup Guide - Webflow RAG

## Phase 1 Complete! ✅

This guide will help you set up and run the Webflow RAG application locally.

---

## Prerequisites

- **Node.js** 20+
- **pnpm** 10.21.0+
- **wrangler** (installed as dev dependency)
- API keys (for Phase 2):
  - OpenAI API key
  - Pinecone API key

---

## Local Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

```bash
cd apps/web
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:

```bash
OPENAI_API_KEY=sk-your-key-here
PINECONE_API_KEY=your-key-here
PINECONE_INDEX_NAME=webflow-docs
```

### 3. Create and Set Up Local Database

```bash
# Create D1 database for local development
npx wrangler d1 create webflow-rag-local

# Apply migrations
npx wrangler d1 migrations apply webflow-rag-local --local
```

### 4. Create KV Namespace (Local)

```bash
npx wrangler kv:namespace create webflow-rag-cache --preview
```

### 5. Update wrangler.json

Update `apps/web/wrangler.json` with the generated IDs from steps 3-4:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webflow-rag-local",
      "database_id": "YOUR_DATABASE_ID",
      "migrations_dir": "migrations"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "YOUR_KV_NAMESPACE_ID"
    }
  ]
}
```

### 6. Start Development Server

Option A: Using Next.js dev server (simpler, faster)
```bash
pnpm dev
```

Option B: Using Wrangler (for full Cloudflare Workers environment)
```bash
cd apps/web
npx wrangler dev
```

### 7. Test the API Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Version info
curl http://localhost:3000/api/version

# Search (requires database with data)
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "webflow", "limit": 5}'
```

---

## Database Management

### View Database Schema

```bash
npx wrangler d1 execute webflow-rag-local --local \
  --command "SELECT name FROM sqlite_master WHERE type='table'"
```

### Query Database

```bash
# Count documents
npx wrangler d1 execute webflow-rag-local --local \
  --command "SELECT COUNT(*) as count FROM documents"

# View recent queries
npx wrangler d1 execute webflow-rag-local --local \
  --command "SELECT * FROM queries ORDER BY created_at DESC LIMIT 10"
```

### Seed Database (Phase 2 - After ETL Pipeline)

```bash
cd etl
node ingest.ts
```

---

## Production Deployment

### Prerequisites

1. Webflow Cloud account with API token
2. GitHub repository with secrets configured

### Manual Deployment

```bash
# Login to Webflow Cloud
webflow login

# Deploy
cd apps/web
webflow cloud deploy
```

### Automatic Deployment (GitHub Actions)

Push to `main` branch triggers automatic deployment.

**Required GitHub Secrets:**
- `WEBFLOW_API_TOKEN`
- `OPENAI_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`

---

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm lint                   # Run ESLint
pnpm typecheck             # Run TypeScript checks

# Database (from apps/web)
npx wrangler d1 migrations apply webflow-rag-local --local
npx wrangler d1 execute webflow-rag-local --local --command "SQL"

# KV Cache
npx wrangler kv:key list --namespace-id=YOUR_KV_ID
npx wrangler kv:key get "key-name" --namespace-id=YOUR_KV_ID
```

---

## What's Implemented (Phase 1)

✅ **Infrastructure**
- Webflow Cloud configuration (wrangler.json)
- D1 SQLite database with full schema
- KV cache setup
- Rate limiting

✅ **API Endpoints**
- `GET /api/health` - Health check with DB/KV status
- `GET /api/version` - Version and build info
- `POST /api/search` - Full-text search (FTS5)

✅ **Developer Experience**
- TypeScript with strict mode
- ESLint + Prettier
- CI/CD pipeline (GitHub Actions)
- Comprehensive documentation

✅ **Code Quality**
- Zod validation schemas
- Error handling
- Structured logging
- Type safety

---

## Next Steps (Phase 2)

🚧 **Vector Search & RAG**
- ETL pipeline for Webflow docs
- Pinecone vector index
- OpenAI embeddings
- `/api/ask` endpoint with streaming
- Caching layer

---

## Troubleshooting

### "Cannot find module '@shared'"

Make sure you've run `pnpm install` from the root directory.

### "Database binding not found"

Run `npx wrangler dev` instead of `pnpm dev` to get proper D1 bindings.

### Build warnings about Edge Runtime

Make sure you're not importing Node.js modules (`fs`, `path`, `crypto`) in API routes.
We use Web Crypto API instead.

---

## Documentation

- **[README.md](../README.md)** - Project overview
- **[CLAUDE.md](../CLAUDE.md)** - Comprehensive developer reference
- **[MVP_PLAN.md](../docs/MVP_PLAN.md)** - Implementation roadmap
- **[TODO.md](../TODO.md)** - Task tracking

---

**Questions?** Check the documentation or review the codebase in `apps/web/src/`.
