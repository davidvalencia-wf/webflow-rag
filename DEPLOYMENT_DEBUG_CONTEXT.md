# Webflow Cloud Deployment Debug Context

**Created**: 2025-11-20
**Status**: 🔴 BLOCKED - Build failing on Webflow Cloud
**Latest Commit**: 8238ad4
**Session Goal**: Deploy webflow-rag to Webflow Cloud (webflow-rag.pages.dev)

---

## Current Error (Build #4 - Latest)

**Location**: OpenNext Cloudflare bundling phase (after Next.js build succeeds)

**Error Messages**:
```
✘ [ERROR] Invalid alias name: "next/dist/compiled/node-fetch"
✘ [ERROR] Invalid alias name: "next/dist/compiled/ws"
✘ [ERROR] Invalid alias name: "next/dist/compiled/@ampproject/toolbox-optimizer"
✘ [ERROR] Invalid alias name: "next/dist/compiled/edge-runtime"
```

**Build Logs** (excerpt from line 222-257):
```
⚙️ Bundling the OpenNext server...

✘ [ERROR] Invalid alias name: "next/dist/compiled/node-fetch"
✘ [ERROR] Invalid alias name: "next/dist/compiled/ws"
✘ [ERROR] Invalid alias name: "next/dist/compiled/@ampproject/toolbox-optimizer"
✘ [ERROR] Invalid alias name: "next/dist/compiled/edge-runtime"

Error: Build failed with 4 errors:
error: Invalid alias name: "next/dist/compiled/node-fetch"
[...repeated for other aliases]
    at failureErrorWithLog (/repo/apps/web/node_modules/esbuild/lib/main.js:1575:15)
```

**What Works**:
- ✅ npm install (1435 packages, 2 minutes)
- ✅ Next.js build (20 routes generated successfully)
- ✅ TypeScript compilation
- ✅ Linting (warnings only)
- ✅ OpenNext starts bundling (middleware, static, cache assets)
- ❌ OpenNext server bundling fails (esbuild alias error)

---

## Root Cause Analysis

**Primary Issue**: Next.js 15.1.6 + @opennextjs/cloudflare 1.13.1 incompatibility

**Why it fails**:
1. OpenNext adapter uses esbuild to bundle the server function
2. It tries to create aliases like `"next/dist/compiled/node-fetch"`
3. esbuild doesn't allow slashes in alias names
4. This is a known incompatibility between Next.js 15.x and older OpenNext versions

**Tech Stack**:
- Next.js: 15.1.6
- @opennextjs/cloudflare: 1.13.1 (in Webflow Cloud)
- @opennextjs/aws: 3.9.0 (in Webflow Cloud)
- Node.js: 22.17.1 (in Webflow Cloud)
- npm: 10.9.2 (in Webflow Cloud)

---

## Chronology of Attempts

### Attempt 1: Dependency Conflict (FIXED)
**Problem**: npm couldn't resolve `vercel` package peer dependency
**Fix**: Removed `vercel` from devDependencies
**Commit**: 57abee0
**Result**: ❌ Still failed (different error)

### Attempt 2: Monorepo Structure (FIXED)
**Problem**: `packages/shared` imports `zod` but didn't declare it as dependency
**Fix**: Flattened architecture - moved shared types into `apps/web/src/lib/types.ts`
**Commit**: 95ed20d
**Result**: ❌ Still failed (different error)

### Attempt 3: Edge Runtime Declarations (FIXED)
**Problem**: `export const runtime = 'edge'` incompatible with OpenNext adapter
**Fix**: Removed all edge runtime declarations from 14 API routes
**Commit**: 8238ad4
**Result**: ❌ Still failing (current error - esbuild aliases)

---

## Proposed Solutions (Not Yet Tried)

### Option 1: Upgrade @opennextjs/cloudflare ✅ RECOMMENDED
**Approach**: Update to latest version with Next.js 15 support

**Changes needed**:
```bash
cd apps/web
pnpm add -D @opennextjs/cloudflare@latest
```

**Expected version**: 1.6.5+ (current local install) or newer

**Risk**: Low - newer versions should have Next.js 15 compatibility fixes

---

### Option 2: Downgrade Next.js to 14.x ⚠️ SAFE FALLBACK
**Approach**: Use proven stable Next.js 14 + OpenNext combination

**Changes needed**:
```bash
cd apps/web
pnpm add next@14.2.21
```

**Trade-offs**:
- ✅ Proven compatibility with OpenNext
- ✅ Stable and well-tested
- ⚠️ Loses Next.js 15 features (Turbopack, partial prerendering improvements)
- ⚠️ Potential type conflicts with React 19

---

### Option 3: Switch to @cloudflare/next-on-pages
**Approach**: Use deprecated adapter that might still work better

**Changes needed** in `apps/web/webflow.json`:
```json
{
  "cloud": {
    "framework": "nextjs",
    "build": {
      "command": "npx @cloudflare/next-on-pages",
      "install_command": "npm install --legacy-peer-deps"
    },
    "output_directory": ".vercel/output/static",
    "node_version": "20"
  }
}
```

**Risk**: Medium - marked as deprecated, but may have better Next.js 15 support

---

### Option 4: Deploy to Vercel First (Validation)
**Approach**: Prove the app works on Next.js native platform

**Commands**:
```bash
cd apps/web
npx vercel deploy
```

**Purpose**:
- Isolate whether issue is Webflow Cloud-specific
- Get a working deployment while debugging Webflow Cloud
- Validate that app code is correct

---

## Key Files & Configuration

### `apps/web/webflow.json` (Current)
```json
{
  "cloud": {
    "framework": "nextjs",
    "build": {
      "command": "npx @cloudflare/next-on-pages",
      "install_command": "npm install --legacy-peer-deps"
    },
    "output_directory": ".vercel/output/static",
    "node_version": "20"
  }
}
```

### `apps/web/package.json` (Key Dependencies)
```json
{
  "dependencies": {
    "next": "15.1.6",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@cloudflare/next-on-pages": "^1.13.16",
    "@opennextjs/cloudflare": "^1.6.5"
  }
}
```

### `apps/web/open-next.config.ts` (Added in Attempt 3)
```typescript
export default {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};
```

---

## Important Context

### Webflow Cloud Specifics
- **NOT vanilla Cloudflare Pages** - Webflow Cloud runs on top of Cloudflare with custom build pipeline
- Injects its own `next.config.ts` overrides during build (see logs line 62-63)
- Uses `webflow.json` for configuration (not `wrangler.toml`)
- Automatically triggers deployments on GitHub push to main branch
- Build logs show: "COSMIC_MOUNT_PATH: /app" - indicates Webflow Cloud's custom environment

### Build Pipeline Flow
1. ✅ Download repo from GitHub
2. ✅ Select framework from webflow.json
3. ✅ Copy Webflow templates (webflow-loader.ts)
4. ✅ Run `npm install --legacy-peer-deps`
5. ✅ Run build command: `npx @cloudflare/next-on-pages` → triggers `opennextjs-cloudflare build`
6. ✅ OpenNext runs `next build` (succeeds)
7. ✅ OpenNext generates bundle (middleware, static, cache assets)
8. ❌ OpenNext bundles server function (fails on esbuild aliases)

---

## Local Build Status

**Last local build**: Successful ✅
```bash
cd apps/web
pnpm build

Result:
✓ Compiled successfully
✓ Generating static pages (20/20)
Route (app)                              Size     First Load JS
┌ ○ /                                    289 kB          405 kB
├ ○ /_not-found                          988 B           107 kB
├ ○ /admin                               128 kB          239 kB
├ ƒ /api/admin/analytics/content         171 B           106 kB
[...14 more API routes]
```

**Local OpenNext build**: Partially successful ⚠️
- Creates `.open-next/` directory with worker files
- Same esbuild alias errors occur locally when running `npx @opennextjs/cloudflare build`

---

## Constraints & Limitations

**Must preserve**:
- ✅ Webflow Cloud as deployment target (requirement)
- ✅ Monorepo structure (apps/web, packages/shared, etl/)
- ✅ Cloudflare bindings (D1, KV, R2) via Webflow Cloud
- ✅ GitHub auto-deploy on push to main

**Cannot do**:
- ❌ Deploy to vanilla Cloudflare Pages (must use Webflow Cloud)
- ❌ Use Vercel as primary deployment (can use for validation only)
- ❌ Skip npm in favor of pnpm (Webflow Cloud only supports npm)

---

## Next Steps for webflow-cloud-build-expert Agent

### Immediate Actions
1. **Investigate @opennextjs/cloudflare version compatibility**
   - Check if 1.6.5 (local) vs 1.13.1 (Webflow Cloud) is the issue
   - Review OpenNext Cloudflare changelog for Next.js 15 support

2. **Try Option 1**: Upgrade @opennextjs/cloudflare
   - Update package.json with latest compatible version
   - Test build locally
   - Commit and push if successful

3. **If Option 1 fails, try Option 2**: Downgrade Next.js to 14.x
   - Ensure React 19 compatibility
   - Test all features still work
   - Update any Next.js 15-specific code

4. **Monitor build logs** after each push
   - Check Webflow Cloud dashboard
   - Note any new error patterns
   - Iterate quickly

### Research Tasks
- [ ] Check @opennextjs/cloudflare GitHub issues for Next.js 15 compatibility
- [ ] Review Webflow Cloud documentation for Next.js version requirements
- [ ] Investigate if Webflow Cloud supports custom esbuild configuration
- [ ] Check if there's a Webflow Cloud-specific OpenNext adapter version

---

## Success Criteria

**Deployment is successful when**:
1. ✅ Webflow Cloud build completes without errors
2. ✅ App deploys to webflow-rag.pages.dev
3. ✅ Health check passes: `curl https://webflow-rag.pages.dev/api/health`
4. ✅ UI loads at root URL
5. ✅ API routes respond correctly
6. ✅ Cloudflare bindings (D1, KV) accessible

---

## Contact & Resources

**GitHub Repo**: https://github.com/ryanxkh/webflow-rag
**Latest Commit**: 8238ad455c890884d8095938c886aa5704293af4
**Local Project Path**: /Users/ryan.hodge/Projects/webflow-rag/apps/web

**Documentation**:
- [Webflow Cloud Docs](https://developers.webflow.com/webflow-cloud)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- [Next.js 15 Docs](https://nextjs.org/docs)

---

**Last Updated**: 2025-11-20 20:06 CST
**Status**: Ready for webflow-cloud-build-expert agent to take over
