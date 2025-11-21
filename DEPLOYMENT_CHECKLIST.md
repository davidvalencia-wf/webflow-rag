# Deployment Checklist

**Purpose**: Pre-deployment verification to prevent failed deployments and wasted time.

**Last Updated**: 2025-11-21

---

## Pre-Deployment Verification

### 1. Platform Requirements ✅

**Webflow Cloud Requirements** (verify at https://developers.webflow.com/cloud):

```bash
# Check current versions
cd apps/web

# Next.js version (must be >= 15.0.0)
node -p "require('./package.json').dependencies.next"
# ✅ Expected: 15.1.6 or higher

# React version (must be >= 19.0.0 for Next.js 15)
node -p "require('./package.json').dependencies.react"
# ✅ Expected: 19.0.0 or higher

# OpenNext version (must support Next.js 15)
node -p "require('./package.json').devDependencies['@opennextjs/cloudflare']"
# ✅ Expected: 1.13.0 or higher

# Node version
node --version
# ✅ Expected: 20.x or higher
```

**Result**:
- [ ] All versions meet platform requirements
- [ ] No version downgrades without platform verification

---

### 2. Configuration Files ✅

#### `apps/web/webflow.json`
```json
{
  "cloud": {
    "framework": "nextjs",
    "build": {
      "command": "npx @opennextjs/cloudflare build",
      "install_command": "npm install --legacy-peer-deps",
      "npm_flags": ["--legacy-peer-deps"]
    },
    "output_directory": ".worker-next",
    "node_version": "20"
  }
}
```

**Verify**:
- [ ] Uses `@opennextjs/cloudflare build` (not @cloudflare/next-on-pages)
- [ ] Output directory is `.worker-next`
- [ ] Node version is 20

#### `apps/web/next.config.js`
```javascript
const nextConfig = {
  basePath: '/app',
  assetPrefix: '/app',
  experimental: {},
  images: {
    unoptimized: true,
    loaderFile: './webflow-loader.ts',
  },
  output: 'standalone',
};

module.exports = nextConfig;
```

**Verify**:
- [ ] Is JavaScript (not TypeScript) - avoids template injection issues
- [ ] Has `loaderFile` property
- [ ] Uses `module.exports` (CommonJS)

#### `apps/web/wrangler.json`
```json
{
  "name": "webflow-rag",
  "compatibility_date": "2025-11-12",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": ".next",
  "d1_databases": [...],
  "kv_namespaces": [...],
  "vars": {
    "NODE_ENV": "production"
  }
}
```

**Verify**:
- [ ] Has `nodejs_compat` flag
- [ ] Database bindings configured
- [ ] KV namespace bindings configured

---

### 3. API Route Compatibility ✅

**Critical**: API routes must NOT have edge runtime declarations for OpenNext.

```bash
# Check for edge runtime declarations (should return no results)
grep -r "export const runtime = 'edge'" apps/web/src/app/api/

# ✅ Expected: No results (empty output)
# ❌ If found: Remove all edge runtime exports
```

**API Routes to Verify** (14 total):
```
apps/web/src/app/api/
├── ask/route.ts
├── search/route.ts
├── stats/route.ts
├── health/route.ts
├── version/route.ts
├── feedback/route.ts
└── admin/
    ├── content-gaps/route.ts
    └── analytics/
        ├── overview/route.ts
        ├── performance/route.ts
        ├── quality/route.ts
        ├── cost/route.ts
        ├── content/route.ts
        └── trends/route.ts
```

**Verify**:
- [ ] No `export const runtime = 'edge'` declarations
- [ ] All routes use standard Next.js 15 async APIs
- [ ] No node:* imports (use Cloudflare equivalents)

---

### 4. Build Test (Local) ✅

```bash
cd apps/web

# Clean build
rm -rf .next .worker-next node_modules
npm install --legacy-peer-deps

# Build with OpenNext
npx @opennextjs/cloudflare build

# Expected output:
# ✓ Compiled successfully
# ✓ Generated .worker-next directory
# ✓ No errors or warnings
```

**Verify**:
- [ ] Build completes without errors
- [ ] `.worker-next` directory created
- [ ] No TypeScript errors
- [ ] No peer dependency warnings (with --legacy-peer-deps)

---

### 5. Environment Variables ✅

**Required for production**:

```bash
# Verify environment variables are set in Webflow Cloud dashboard
# Settings → Environment Variables

OPENAI_API_KEY=sk-proj-...
PINECONE_API_KEY=pcsk_...
PINECONE_INDEX_NAME=webflow-docs
NODE_ENV=production
```

**Verify**:
- [ ] All API keys configured
- [ ] Keys are valid and have appropriate permissions
- [ ] `NODE_ENV=production` set

---

### 6. Database Migrations ✅

```bash
# Verify migrations applied to production D1
cd apps/web
npx wrangler d1 migrations list webflow-rag --remote

# Check row counts
npx wrangler d1 execute webflow-rag --remote \
  --command "SELECT
    (SELECT COUNT(*) FROM documents) as docs,
    (SELECT COUNT(*) FROM chunks) as chunks"
```

**Verify**:
- [ ] All migrations applied
- [ ] Database has data (documents > 0, chunks > 0)
- [ ] No migration errors

---

### 7. Dependency Audit ✅

```bash
cd apps/web

# Check for conflicting packages
npm list @cloudflare/next-on-pages
# ✅ Expected: Not found (should be removed)

npm list eslint-config-next
# ✅ Expected: Not found (causes peer dependency conflicts)

# Verify critical dependencies
npm list next react @opennextjs/cloudflare
```

**Verify**:
- [ ] No conflicting adapters installed
- [ ] All peer dependencies satisfied
- [ ] No security vulnerabilities (run `npm audit`)

---

### 8. Git Status ✅

```bash
# Check for uncommitted changes
git status

# Check recent commits
git log --oneline -5
```

**Verify**:
- [ ] All changes committed
- [ ] Commit messages describe what changed
- [ ] On correct branch (main/staging)
- [ ] Pushed to remote

---

### 9. GitHub Actions Status ✅

```bash
# Check CI/CD status
gh run list --limit 5
```

**Verify**:
- [ ] Latest commit passed lint check
- [ ] Latest commit passed typecheck
- [ ] Latest commit passed build test
- [ ] No failing workflows

**Note**: GitHub Actions no longer deploys (Webflow Cloud handles deployment). It only runs quality checks.

---

### 10. Pre-Deployment Test ✅

**Manual verification**:

```bash
# Start local dev server with Wrangler
cd apps/web
npx wrangler dev --local

# Test critical endpoints
curl http://localhost:8787/api/health
# Expected: {"status":"ok","timestamp":"..."}

curl -X POST http://localhost:8787/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query":"How do I create a collection?"}'
# Expected: Streaming response with sources
```

**Verify**:
- [ ] Health check passes
- [ ] RAG endpoint returns answers
- [ ] Database queries work
- [ ] KV cache works
- [ ] No console errors

---

## Deployment Execution

### Deploy to Webflow Cloud

```bash
cd apps/web

# Deploy (uses webflow.json configuration)
webflow cloud deploy

# Expected output:
# ✓ Installing dependencies...
# ✓ Building Next.js application...
# ✓ Running @opennextjs/cloudflare build...
# ✓ Uploading to Webflow Cloud...
# ✓ Deployment complete!
# URL: https://webflow-rag.pages.dev
```

### Monitor Deployment

```bash
# View real-time logs
webflow cloud logs --tail

# Check deployment status
webflow cloud status

# View deployment history
webflow cloud deployments list
```

---

## Post-Deployment Verification

### 1. Smoke Tests

```bash
# Production health check
curl https://webflow-rag.pages.dev/api/health

# Production version check
curl https://webflow-rag.pages.dev/api/version

# Test RAG endpoint
curl -X POST https://webflow-rag.pages.dev/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query":"What is Webflow?"}'
```

**Verify**:
- [ ] All endpoints return 200
- [ ] Response times < 3s
- [ ] No 500 errors in logs
- [ ] Sources returned correctly

### 2. Admin Dashboard

Visit: https://webflow-rag.pages.dev/admin

**Verify**:
- [ ] Dashboard loads without errors
- [ ] Analytics queries return data
- [ ] Charts render correctly
- [ ] CSV export works

### 3. Performance Check

```bash
# Check response times
curl -w "\nTime: %{time_total}s\n" \
  https://webflow-rag.pages.dev/api/stats

# Expected: < 500ms
```

**Verify**:
- [ ] P95 latency < 2s (check admin dashboard)
- [ ] Cache hit rate > 40%
- [ ] Error rate < 1%

---

## Rollback Plan

**If deployment fails or has critical issues:**

### Option 1: Rollback to Previous Deployment
```bash
# View deployment history
webflow cloud deployments list

# Rollback to previous version
webflow cloud rollback <deployment-id>
```

### Option 2: Emergency Fix + Redeploy
```bash
# Fix issue locally
git revert <bad-commit-hash>

# Test locally
npm run build

# Deploy fix
webflow cloud deploy
```

### Option 3: Disable Problematic Feature
```bash
# Use feature flags or environment variables
# to disable broken feature without full rollback
```

---

## Common Deployment Failures

### "Cannot find module '@opennextjs/cloudflare'"
**Fix**: Run `npm install --legacy-peer-deps`

### "Invalid alias name" errors
**Fix**: Upgrade OpenNext to 1.13.0+ (supports Next.js 15)

### "Platform bug" / Template errors
**Fix**: Consult [DEBUGGING_FRAMEWORK.md](./DEBUGGING_FRAMEWORK.md) before claiming bugs

### Build succeeds locally but fails on Webflow Cloud
**Fix**: Verify `webflow.json` uses correct build command and output directory

### API routes return 500 errors
**Fix**: Check environment variables are set in Webflow Cloud dashboard

---

## Quick Reference

### Before Every Deployment:
1. ✅ Check platform requirements (Next.js 15+, React 19+)
2. ✅ Verify no edge runtime exports in API routes
3. ✅ Test build locally with OpenNext
4. ✅ Commit and push all changes
5. ✅ Review [DEBUGGING_FRAMEWORK.md](./DEBUGGING_FRAMEWORK.md) if any issues

### After Every Deployment:
1. ✅ Run smoke tests on production
2. ✅ Check logs for errors
3. ✅ Verify admin dashboard works
4. ✅ Monitor performance metrics

### If Deployment Fails:
1. ❌ **DO NOT** immediately downgrade versions
2. ✅ **DO** consult DEBUGGING_FRAMEWORK.md
3. ✅ **DO** verify platform requirements first
4. ✅ **DO** deploy research agents after 2nd failure
5. ✅ **DO** create minimal reproduction

---

**Related Documentation**:
- [DEBUGGING_FRAMEWORK.md](./DEBUGGING_FRAMEWORK.md) - First-principles debugging
- [CLAUDE.md](./CLAUDE.md) - Complete architecture reference
- [Webflow Cloud Docs](https://developers.webflow.com/cloud) - Official platform documentation
