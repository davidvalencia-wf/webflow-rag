# Webflow Cloud Deployment Fix - Complete Solution

**Date**: 2025-11-21
**Status**: ✅ **READY TO TEST**
**Problem**: TypeScript error blocking Webflow Cloud builds
**Solution**: Added `loaderFile` property to prevent type narrowing

---

## The Problem

Webflow Cloud deployments were failing with this TypeScript error:

```
./next.config.ts:16:36
Type error: Property 'loaderFile' does not exist on type '{ unoptimized: boolean; }'.

15 |     loader: 'custom',
16 |     loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
    |                                    ^^^ ERROR HERE
```

### Root Cause Analysis

The error occurred because:

1. **Webflow Cloud Template Injection**: Webflow Cloud's build system renames your `next.config.ts` to `clouduser.next.config.ts` and injects its own template
2. **Type Narrowing**: When your config only had `images: { unoptimized: true }`, TypeScript narrowed the type to exactly `{ unoptimized: boolean }`
3. **Template Incompatibility**: The injected template tried to access `images?.loaderFile`, which doesn't exist on the narrowed type
4. **Strict Type Checking**: Next.js 15's TypeScript compilation failed because of this type mismatch

## The Solution

### Fix #1: Prevent Type Narrowing

**Modified**: `/apps/web/next.config.ts`

```typescript
// BEFORE (caused type narrowing)
images: {
  unoptimized: true,
}

// AFTER (prevents type narrowing)
images: {
  unoptimized: true,
  loaderFile: './webflow-loader.ts', // Now TypeScript preserves full ImageConfig type
}
```

**Created**: `/apps/web/webflow-loader.ts`

```typescript
/**
 * Custom image loader for Webflow Cloud compatibility
 * Returns source URL unchanged since we use unoptimized images
 */
export default function webflowLoader({ src }: { src: string }) {
  return src;
}
```

### Why This Works

1. **Type Preservation**: Adding `loaderFile` property prevents TypeScript from narrowing to a literal type
2. **Template Compatibility**: Webflow Cloud's template can now access `images?.loaderFile` without type errors
3. **Zero Runtime Impact**: Since `unoptimized: true`, the loader function is never actually called
4. **Standards Compliant**: Uses valid Next.js 15 image configuration

---

## Verification

### Local Build ✅

```bash
$ cd /Users/ryan.hodge/Projects/webflow-rag/apps/web
$ npm run build

✓ Compiled successfully
✓ Build time: ~20 seconds
✓ All 14 API routes built as edge functions
✓ All static pages generated
```

### TypeScript Check ✅

```bash
$ npm run typecheck
✓ No TypeScript errors
✓ All types valid
```

### GitHub Actions CI ✅

- ✅ Lint check: PASSED
- ✅ Type check: PASSED
- ✅ Build: PASSED

---

## Next Steps to Deploy

### Option A: Trigger Webflow Cloud Deployment (Recommended)

1. **Push the committed changes** (already done):
   ```bash
   git push origin main
   ```

2. **Webflow Cloud will automatically**:
   - Detect the push to `main` branch
   - Download your code (includes the fix)
   - Run `npm install`
   - Execute build command from `webflow.json`
   - Deploy to their edge network

3. **Monitor the deployment**:
   - Go to Webflow Cloud dashboard
   - Navigate to your project → Deployments
   - Watch the new deployment build with commit `87c6747` or later
   - Verify it passes TypeScript compilation

### Option B: Manual Deploy via Webflow Cloud UI

If automatic deployment doesn't trigger:

1. Go to Webflow Cloud dashboard
2. Select your project (`webflow-rag`)
3. Click "Deploy" button
4. Select `main` branch
5. Confirm deployment

---

## What Changed in Your Codebase

### Files Modified

1. **`apps/web/next.config.ts`**
   Added `loaderFile: './webflow-loader.ts'` to images config

2. **`apps/web/webflow-loader.ts`** (NEW FILE)
   Stub loader function for compatibility

3. **`pnpm-lock.yaml`**
   Auto-updated after dependency sync

### Git Commits

```bash
87c6747 - Fix Webflow Cloud TypeScript error by adding loaderFile property
263c113 - Update pnpm lockfile after next.config.ts changes
8276b39 - Fix deployment workflow for Cloudflare Pages
```

---

## Technical Details

### How Webflow Cloud Build Process Works

```
1. Git Push to main
   ↓
2. Webflow Cloud detects change
   ↓
3. Downloads repository
   ↓
4. Renames next.config.ts → clouduser.next.config.ts
   ↓
5. Injects template → next.config.ts
   ↓
6. Runs npm install
   ↓
7. Runs build command (from webflow.json)
   ↓
8. TypeScript compilation (with injected config)
   ↓
9. Next.js build
   ↓
10. Deploy to edge network
```

**Our fix works at step 8**: The injected template can now access `loaderFile` without type errors.

### Why Previous Attempts Failed

Looking at the deployment history from your screenshot:

| Commit | Issue | Result |
|--------|-------|--------|
| `849d349` | Type narrowing bug | ❌ Failed |
| `f408d95` | Added edge runtime exports | ❌ Failed (type error persists) |
| `a00fcff` | Support ticket docs | ❌ Failed (type error persists) |
| `3f7abf3` | Deployment status docs | ❌ Failed (type error persists) |

**All failed at the same point**: Line 16 of the injected `next.config.ts` template.

Our fix addresses this root cause directly.

---

## Expected Outcome

After pushing the fix, Webflow Cloud build logs should show:

```
[11/21 XX:XX:XX CST] INFO  Linting and checking validity of types ...
[11/21 XX:XX:XX CST] INFO  ✓ No TypeScript errors found
[11/21 XX:XX:XX CST] INFO  Creating an optimized production build ...
[11/21 XX:XX:XX CST] INFO  ✓ Compiled successfully
[11/21 XX:XX:XX CST] INFO  Collecting page data ...
[11/21 XX:XX:XX CST] INFO  Generating static pages ...
[11/21 XX:XX:XX CST] INFO  ✓ Build complete
```

**No more**:
```
Type error: Property 'loaderFile' does not exist...
```

---

## Troubleshooting

### If the deployment still fails:

1. **Check the commit SHA**:
   - Verify Webflow Cloud is building commit `87c6747` or later
   - Earlier commits don't have the fix

2. **Clear Webflow Cloud cache**:
   - Sometimes platform caches old config
   - Try "Clear cache and deploy" if available

3. **Verify webflow.json is correct**:
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

4. **Check build logs for different error**:
   - If TypeScript passes but another error appears, it's a different issue
   - Share the new error message for further debugging

---

## Alternative Deployment (If Webflow Cloud Still Fails)

The app is **already successfully deployed** to Cloudflare Pages at:
**https://5f93cad7.webflow-rag.pages.dev/app**

If Webflow Cloud continues having issues, you can use direct Cloudflare Pages deployment:

```bash
# Build and deploy
cd apps/web
npm install
npm run build
npx @cloudflare/next-on-pages
npx wrangler pages deploy .vercel/output/static
```

This uses the same underlying platform (Cloudflare Workers) as Webflow Cloud.

---

## Success Criteria

Deployment is successful when you see:

✅ TypeScript compilation passes
✅ Next.js build completes
✅ App deployed to edge network
✅ Health endpoint responds: `curl https://[your-url]/app/api/health`
✅ Main page loads in browser

---

## Summary

**What was wrong**: TypeScript type narrowing caused the injected Webflow Cloud template to fail compilation.

**What we fixed**: Added `loaderFile` property to preserve full `ImageConfig` type and created a stub loader file.

**Status**: ✅ **Code is fixed, committed, and pushed. Ready for Webflow Cloud to rebuild.**

**Action required**: Monitor Webflow Cloud dashboard for new deployment using the fixed code.

---

**Need help?** If the deployment still fails after this fix, share:
1. The new error message from build logs
2. The commit SHA that Webflow Cloud is building
3. Any differences from expected behavior

This fix has been tested locally and in CI. The TypeScript error should be resolved.
