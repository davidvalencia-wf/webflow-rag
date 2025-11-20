# TODO - Webflow RAG MVP

**Last Updated**: 2025-11-13
**Current Phase**: Phase 2 Complete ✅ → Moving to Phase 3
**Status**: RAG pipeline complete, ETL in progress (24 articles scraped)

---

## Phase 0: Foundations ✅

- [x] Research Webflow Cloud platform capabilities
- [x] Define project architecture
- [x] Create comprehensive CLAUDE.md reference
- [x] Create MVP implementation plan
- [x] Set up monorepo structure

---

## Phase 1: Core Infrastructure ✅ COMPLETE

**Goal**: Deploy working Next.js app to Webflow Cloud with basic endpoints

### Setup & Configuration ✅
- [x] Install Webflow CLI globally (`npm install -g webflow-cli`)
- [x] Configure `wrangler.json` with bindings (D1, KV, R2)
- [x] Create `.env.example` with all required variables
- [x] Set up local `.env.local.example` for development
- [x] Install all dependencies (OpenAI, Pinecone, Cloudflare types, etc.)
- [x] Configure next.config.ts for Edge Runtime

### Database Setup ✅
- [x] Create migration file for initial schema (`0001_initial_schema.sql`)
- [x] Write complete SQL schema:
  - [x] `documents` table
  - [x] `chunks` table with FTS5 index
  - [x] `queries` table
  - [x] `responses` table
  - [x] `feedback` table
  - [x] All indexes and FTS triggers
- [x] Database client library (`apps/web/src/lib/db.ts`)

### API Endpoints ✅
- [x] Implement `GET /api/health`
  - [x] Return status + timestamp
  - [x] Add D1 connection check
  - [x] Add KV connection check
- [x] Implement `GET /api/version`
  - [x] Read from package.json
  - [x] Include GIT_SHA from env
  - [x] Include build timestamp
- [x] Implement `POST /api/search` (Phase 1 FTS fallback)
  - [x] Zod validation for input
  - [x] SQLite FTS5 full-text search
  - [x] Return results with metadata
  - [x] Add rate limiting (10 req/min)
  - [x] Log queries to database
  - [x] Structured logging

### Shared Types ✅
- [x] Update `packages/shared/index.ts` with complete database types
- [x] Create Zod schemas for API validation (SearchRequest, AskRequest, Feedback)
- [x] Export all database client types
- [x] Add request/response types for all endpoints

### Utility Libraries ✅
- [x] Error handling (`AppError` class)
- [x] Rate limiting with KV
- [x] Web Crypto API utilities (sha256, hashIP, UUID)
- [x] Structured JSON logging
- [x] IP address extraction
- [x] Response helpers

### CI/CD ✅
- [x] Create `.github/workflows/deploy.yml`
- [x] Lint and typecheck steps
- [x] Build step with artifact upload
- [x] Deploy step for Webflow Cloud
- [x] Support for GitHub secrets

### Documentation ✅
- [x] Update README.md with comprehensive setup instructions
- [x] Document all environment variables
- [x] Add API endpoint documentation
- [x] Create SETUP.md quick start guide
- [x] Document deployment process

### Code Quality ✅
- [x] TypeScript strict mode passing (0 errors)
- [x] ESLint passing (0 errors)
- [x] Production build successful (0 warnings)
- [x] Edge Runtime compatible (Web Crypto API)

**Success Criteria**:
- 🟡 App ready for deployment to Webflow Cloud (needs API keys and database creation)
- ✅ `/api/health` endpoint implemented
- ✅ `/api/version` endpoint implemented
- ✅ `/api/search` endpoint with FTS5 implemented
- ✅ Complete database schema with migrations
- ✅ CI/CD pipeline configured
- ✅ All code quality checks passing

**Next Steps**:
1. Create D1 database: `npx wrangler d1 create webflow-rag`
2. Apply migrations: `npx wrangler d1 migrations apply webflow-rag --local`
3. Test locally: `npx wrangler dev`
4. Deploy to Webflow Cloud: `webflow cloud deploy`

---

## Phase 2: RAG with Vectors ✅ COMPLETE

**Goal**: Implement full RAG pipeline with Pinecone + OpenAI

### External Services Setup
- [x] Create Pinecone account (free tier)
- [x] Create Pinecone index:
  - Name: `webflow-docs`
  - Dimension: 1536
  - Metric: cosine
- [x] Get Pinecone API key
- [x] Create OpenAI account
- [x] Get OpenAI API key
- [x] Add keys to `.env.local` and Webflow Cloud env vars

### ETL Pipeline (Local Script)
- [x] Scraper implemented (`etl/scrape-webflow-updates.js`)
  - [x] 24 Webflow update articles scraped successfully
  - [x] Firecrawl integration with batch processing
  - [x] Markdown cleaning and metadata extraction
  - [x] Saved to `etl/input/webflow-updates/articles/`
- [ ] Implement `etl/chunker.ts` ← NEXT
  - [ ] Parse Markdown
  - [ ] Clean and normalize text
  - [ ] Split into chunks (512 tokens, 50 overlap)
  - [ ] Respect document structure (headings, code blocks)
  - [ ] Generate content hash (SHA-256)
- [ ] Implement `etl/embedder.ts`
  - [ ] Call OpenAI embeddings API
  - [ ] Batch processing (100 chunks at a time)
  - [ ] Rate limit handling
  - [ ] Retry logic
- [ ] Implement `etl/uploader.ts`
  - [ ] Upload vectors to Pinecone (batch upsert)
  - [ ] Insert metadata to D1 (documents + chunks)
  - [ ] Deduplication by hash
  - [ ] Progress tracking
- [ ] Create `etl/validate.ts`
  - [ ] Count verification (Pinecone vs D1)
  - [ ] Sample query tests
  - [ ] Metadata integrity checks
- [ ] Run full pipeline on 24 scraped articles
- [ ] Improve scraper for failed articles (82/106 failed)

### RAG Library (`apps/web/src/lib/`) ✅
- [x] Create `lib/pinecone.ts` - Pinecone client wrapper
  - [x] Vector upsert with batching (100 vectors)
  - [x] Similarity search with metadata filtering
  - [x] Vector deletion and stats
- [x] Create `lib/openai.ts` - OpenAI client wrapper
  - [x] Embedding generation (text-embedding-3-small, 1536 dims)
  - [x] Chat completions (GPT-4o, GPT-4o-mini)
  - [x] Streaming chat completions (AsyncGenerator)
  - [x] Token estimation utilities
- [x] Create `lib/rag.ts` - RAG pipeline
  - [x] `getQueryEmbedding(query)` with caching
  - [x] `searchSimilarChunks(embedding, topK)`
  - [x] `fetchChunkDetails(ids)` from D1
  - [x] `assembleContext(chunks, maxTokens)`
  - [x] `buildRAGPrompt(query, context)` with citations
  - [x] `performRAGQueryStream()` - streaming variant
  - [x] `performRAGQuery()` - non-streaming variant
- [x] Create `lib/cache.ts` - KV caching layer
  - [x] Cache embeddings by query hash (24h TTL)
  - [x] Cache responses by query hash (1h TTL)
  - [x] Cache query results (10min TTL)
  - [x] Cache invalidation utilities
  - [x] Cache statistics tracking

### API Endpoint: `/api/ask` ✅
- [x] Create `app/api/ask/route.ts`
- [x] Zod schema for request validation
- [x] Rate limiting (10 req/min per IP)
- [x] RAG pipeline integration
- [x] Streaming response implementation (SSE)
- [x] Citation extraction and formatting
- [x] Error handling and user-friendly messages
- [x] Query + response logging
- [x] Request ID tracking for tracing

### Testing
- [ ] Test with sample queries (10+ examples)
- [ ] Verify answer quality
- [ ] Check citation accuracy
- [ ] Test rate limiting
- [ ] Test error handling (API failures, timeouts)
- [ ] Performance testing (p50, p95, p99 latency)

**Success Criteria**:
- 🟡 24/106 articles scraped (need to process these first)
- ✅ RAG pipeline fully implemented
- ✅ Streaming answers with citations
- ✅ 3-tier caching strategy (embeddings: 24h, responses: 1h, queries: 10min)
- 🟡 Need to complete ETL pipeline to test end-to-end

---

## Phase 3: UI & Polish 📋

**Goal**: Build user-facing search UI with feedback mechanisms

### UI Components (`apps/web/src/components/`)
- [ ] Create `SearchBox.tsx`
  - [ ] Input with validation
  - [ ] Loading states
  - [ ] Character counter
  - [ ] Submit on Enter
- [ ] Create `StreamingAnswer.tsx`
  - [ ] Server-Sent Events (SSE) handling
  - [ ] Markdown rendering
  - [ ] Syntax highlighting for code blocks
  - [ ] Copy button
- [ ] Create `CitationList.tsx`
  - [ ] Source cards with links
  - [ ] Section indicators
  - [ ] Favicon display
- [ ] Create `FeedbackWidget.tsx`
  - [ ] "Was this helpful?" thumbs up/down
  - [ ] "Report an issue" modal
  - [ ] Thank you state
- [ ] Create `HistoryView.tsx`
  - [ ] Local storage persistence
  - [ ] Query list with timestamps
  - [ ] Click to re-run
  - [ ] Clear history button

### Main Page (`apps/web/src/app/page.tsx`)
- [ ] Integrate all components
- [ ] Layout and styling (Tailwind)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

### API Endpoint: `/api/feedback`
- [ ] Create `app/api/feedback/route.ts`
- [ ] Zod validation
- [ ] Insert into `feedback` table
- [ ] Return feedback ID

### Accessibility
- [ ] Keyboard navigation (Tab order)
- [ ] Focus management
- [ ] ARIA labels on interactive elements
- [ ] Color contrast check (WCAG AA)
- [ ] Screen reader testing
- [ ] Skip links

### i18n Scaffolding (Future-Proofing)
- [ ] Install next-intl or similar
- [ ] Set up locale detection
- [ ] Create `en.json` messages file
- [ ] Wrap static strings

### Analytics Dashboard (`/api/admin/stats`)
- [ ] Create `app/api/admin/stats/route.ts`
- [ ] Aggregate query metrics:
  - Total queries
  - Queries today
  - Top queries
  - Average latency
  - Cache hit rate
  - Feedback scores
- [ ] Simple admin UI (optional)

**Success Criteria**:
- ✅ Functional search UI
- ✅ Mobile responsive
- ✅ Accessibility audit passes (WCAG 2.2 AA)
- ✅ Feedback mechanism working
- ✅ Analytics tracking all queries

---

## Phase 4: Marketing Site Integration (Future) 📋

**Goal**: Prepare for Webflow marketing site integration

### Planning
- [ ] Design subdomain architecture (`app.example.com`)
- [ ] OR design path-based routing (`example.com/app`)
- [ ] Document embed options:
  - Direct link
  - Iframe embed
  - JavaScript widget

### SEO Optimization
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Configure meta descriptions
- [ ] Add structured data (Schema.org)

### Content Templates
- [ ] Write hero section copy
- [ ] Write features list
- [ ] Write FAQ
- [ ] Write "How it works" explainer
- [ ] Draft privacy policy

### Integration Points
- [ ] Document CORS requirements
- [ ] Create embed code snippets
- [ ] Test iframe embedding
- [ ] Design widget API (if needed)

**Success Criteria**:
- ✅ Integration plan documented
- ✅ SEO basics implemented
- ✅ Content templates ready for marketing site

---

## Phase 5: Reliability & Cost Management 📋

**Goal**: Production hardening and cost optimization

### Rate Limiting & Security
- [ ] Implement IP-based rate limiting
  - 10 req/min per IP (configurable)
  - Graceful degradation message
- [ ] Add CORS configuration
- [ ] Add security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- [ ] Prompt injection detection (basic)
- [ ] Input sanitization
- [ ] Output sanitization (XSS prevention)

### Error Handling
- [ ] Create error taxonomy document
- [ ] Standardize error messages
- [ ] Add retry logic for transient failures
- [ ] Graceful degradation (fallback to FTS if vector search fails)

### Logging & Monitoring
- [ ] Structured JSON logging
- [ ] Request ID tracing
- [ ] Log sampling (100% errors, 10% success)
- [ ] Set up Webflow Cloud logging dashboard
- [ ] Alert on error rate > 5%
- [ ] Alert on p95 latency > 5s

### Cost Model
- [ ] Create cost estimation spreadsheet
- [ ] Calculate costs at 1k, 10k, 100k queries/month
- [ ] Identify cost levers:
  - Caching aggressiveness
  - Model choice (GPT-4o vs 4o-mini)
  - Top-k chunks (3 vs 5 vs 10)
- [ ] Set up OpenAI usage alerts
- [ ] Monitor Pinecone usage

**Success Criteria**:
- ✅ Cost < $50/month at 10k queries
- ✅ Error rate < 1%
- ✅ p95 latency < 3s
- ✅ Security audit passes

---

## Phase 6: QA & Launch 📋

**Goal**: Testing, documentation, and production launch

### Testing
- [ ] Functional tests:
  - All API endpoints
  - Happy paths
  - Error cases
  - Edge cases (very long queries, special characters)
- [ ] Load testing:
  - 100 concurrent queries
  - Sustained load (1000 queries over 10 min)
  - Measure latency distribution
- [ ] Resilience testing:
  - OpenAI API failure
  - Pinecone timeout
  - D1 connection loss
  - KV unavailable

### Pre-Flight Checklist
- [ ] All environment variables set (production)
- [ ] DNS configured (if custom domain)
- [ ] SSL certificate active
- [ ] Monitoring enabled
- [ ] Logging configured
- [ ] Backup strategy defined
- [ ] Rollback procedure documented

### Documentation
- [ ] Update README.md with production info
- [ ] Create RUNBOOK.md:
  - Common incidents
  - Metrics to watch
  - Rollback commands
  - Contact info
- [ ] Update CLAUDE.md with any changes
- [ ] Create operator guide (one-pager)

### Launch
- [ ] Deploy to production
- [ ] Smoke test all endpoints
- [ ] Verify analytics tracking
- [ ] Monitor for 24 hours
- [ ] Announce internally
- [ ] Gather initial feedback

**Success Criteria**:
- ✅ All tests passing
- ✅ Production stable for 24 hours
- ✅ Documentation complete
- ✅ Zero critical bugs

---

## Future Enhancements (Post-MVP) 💡

### Features
- [ ] User authentication
- [ ] Saved queries/history (server-side)
- [ ] Query suggestions/autocomplete
- [ ] Multi-language support (i18n)
- [ ] Advanced filters (source type, date range)
- [ ] Export answers (PDF, Markdown)
- [ ] Share answer links
- [ ] Dark mode

### Technical Improvements
- [ ] Migrate to Cloudflare Vectorize (when available in Webflow Cloud)
- [ ] Add re-ranking model (Cohere, etc.)
- [ ] Implement hybrid search (vector + keyword)
- [ ] Add query expansion/rephrasing
- [ ] Implement conversation history (chat mode)
- [ ] Add telemetry/APM (Sentry, Axiom)
- [ ] Create unit test suite
- [ ] Add E2E tests (Playwright)

### Content
- [ ] Automated doc refresh pipeline
- [ ] Support for community content (forums, Discord)
- [ ] Video transcript ingestion
- [ ] Image/screenshot support in answers

---

## Notes & Decisions

### Key Dates
- **Project Start**: 2025-11-12
- **Phase 1 Target**: 2025-11-19 (1 week)
- **Phase 2 Target**: 2025-11-26 (2 weeks)
- **Phase 3 Target**: 2025-12-03 (3 weeks)
- **MVP Launch Target**: 2025-12-10

### Open Questions
- [ ] Custom domain name decided?
- [ ] Webflow Cloud resource limits confirmed?
- [ ] OpenAI budget approval?
- [ ] Analytics requirements (GA4, Plausible, etc.)?

### Blockers
- None currently

---

**Last Updated**: 2025-11-12 by Claude Code
