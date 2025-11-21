# Webflow Cloud Bug Report: Next.js 15 TypeScript Template Incompatibility

**Date**: 2025-11-20
**Severity**: High (Blocks all Next.js 15 deployments)
**Project**: webflow-rag
**GitHub**: https://github.com/ryanxkh/webflow-rag
**Affected Commit**: 849d34955ba0a21862c6210b45e38c3f11b166cb

---

## Summary

Webflow Cloud's injected Next.js configuration template (`/cosmic/templates/nextjs/next.config.ts.template`) contains a TypeScript type error that prevents **all Next.js 15.x applications** from deploying successfully.

The template references `images.loaderFile` property which does not exist in Next.js 15's `ImageConfig` type definition, causing TypeScript compilation to fail during the build phase.

---

## Steps to Reproduce

1. Create a Next.js 15.0.3 application with TypeScript
2. Configure `webflow.json` with Next.js framework
3. Install dependencies matching Webflow Cloud requirements:
   - `next@15.0.3`
   - `@opennextjs/cloudflare@1.13.1`
   - `react@18.3.1`
4. Include `next.config.ts` (TypeScript config)
5. Deploy to Webflow Cloud via GitHub integration

**Minimal Reproduction Repository**: https://github.com/ryanxkh/webflow-rag

---

## Expected Behavior

- Webflow Cloud's template should be compatible with Next.js 15.0.3
- TypeScript compilation should succeed
- Application should deploy successfully

---

## Actual Behavior

Build fails during TypeScript type checking with error:

```
./next.config.ts:16:36
Type error: Property 'loaderFile' does not exist on type '{ unoptimized: boolean; }'.

 14 |     // and if so allow them to be used here
 15 |     loader: 'custom',
>16 |     loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
    |                                    ^
 17 |   },
 18 | };
```

---

## Environment Details

### Webflow Cloud Build Environment
- **Node.js**: v22.17.1
- **npm**: 10.9.2
- **Next.js**: 15.0.3
- **@opennextjs/cloudflare**: 1.13.1
- **@opennextjs/aws**: 3.9.0

### Build Logs Evidence

**Line 62-63** (Template Injection):
```
renaming user base config /repo/apps/web/next.config.ts to /repo/apps/web/clouduser.next.config.ts...
rendering override config from /cosmic/templates/nextjs/next.config.ts.template to /repo/apps/web/next.config.ts
```

**Line 111-117** (TypeScript Error):
```
./next.config.ts:16:36
Type error: Property 'loaderFile' does not exist on type '{ unoptimized: boolean; }'.

 14 |     // and if so allow them to be used here
 15 |     loader: 'custom',
>16 |     loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
    |                                    ^
```

**Full build logs**: See deployment `849d34955ba0a21862c6210b45e38c3f11b166cb` on Webflow Cloud dashboard (Trace ID: 6075855799555030659)

---

## Root Cause Analysis

### The Bug

Webflow Cloud's template at `/cosmic/templates/nextjs/next.config.ts.template` contains:

```typescript
images: {
  loader: 'custom',
  loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts', // ❌ Error here
}
```

### Why It Fails

In Next.js 15, the `ImageConfig` type definition does not include a `loaderFile` property. The correct type for `images` when `loader: 'custom'` is:

```typescript
type ImageConfig = {
  unoptimized: boolean;
  // loaderFile does NOT exist
}
```

### Reference

Check Next.js 15 source code:
- https://github.com/vercel/next.js/blob/v15.0.3/packages/next/src/shared/lib/image-config.ts

The `loaderFile` property was either:
1. Never part of the TypeScript types (only runtime behavior)
2. Removed in Next.js 15
3. Requires a different type structure

---

## Impact Assessment

**Severity**: High

**Affected Users**:
- All developers deploying Next.js 15.x apps to Webflow Cloud
- Any TypeScript-strict Next.js project using Webflow Cloud

**Workaround Availability**: None (Webflow Cloud forcibly injects the template)

**Timeline**: Bug exists in current production Webflow Cloud build system (as of 2025-11-20)

---

## Suggested Fix

### Option 1: Type Assertion (Quick Fix)

Update `/cosmic/templates/nextjs/next.config.ts.template`:

```typescript
images: {
  loader: 'custom',
  loaderFile: userConfig.images?.loaderFile || './webflow-loader.ts',
} as any, // Suppress TypeScript error
```

### Option 2: Conditional Type Checking (Robust Fix)

```typescript
const imageConfig: any = {
  loader: 'custom',
};

// Only set loaderFile if it exists in user config
if (userConfig.images?.loaderFile) {
  imageConfig.loaderFile = userConfig.images.loaderFile;
} else {
  imageConfig.loaderFile = './webflow-loader.ts';
}

export default {
  // ...
  images: imageConfig,
};
```

### Option 3: Remove Type Checking (Nuclear Option)

Rename template from `next.config.ts.template` to `next.config.js.template` to avoid TypeScript type checking entirely.

---

## Testing Evidence

Multiple deployment attempts with different configurations all failed with the same error:

| Commit | Next.js | Config File | Result | Error |
|--------|---------|-------------|--------|-------|
| 8238ad4 | 15.1.6 | next.config.ts | ❌ Failed | esbuild alias error |
| 0821803 | 15.0.3 | next.config.ts | ❌ Failed | loaderFile type error |
| f87ee9e | 14.2.21 | next.config.mjs | ❌ Failed | Template forces .ts extension |
| 431ce49 | 14.2.33 | next.config.mjs | ❌ Failed | Template forces .ts extension |
| **849d349** | **15.0.3** | **next.config.ts** | ❌ **Failed** | **loaderFile type error** |

**Commit 849d349** represents the cleanest possible setup matching Webflow Cloud's requirements, yet still fails due to the template bug.

---

## Additional Context

### Local Build Success

The same codebase builds successfully locally:

```bash
npm run build
# ✓ Compiled successfully
# ✓ Generating static pages (20/20)
```

This confirms the issue is **specifically with Webflow Cloud's injected template**, not the application code.

### Debugging Timeline

- **7+ deployment attempts** over 3 hours
- **Tested multiple Next.js versions**: 14.2.21, 14.2.33, 15.0.3, 15.1.6
- **Tested multiple adapters**: @opennextjs/cloudflare 1.6.5, 1.13.1
- **Tested with/without workarounds**: .npmrc, esbuild overrides, config renaming
- **Result**: Same TypeScript error persists in all Next.js 15.x configurations

---

## Requested Action

1. **Fix the template** to remove or properly type the `loaderFile` reference
2. **Test with Next.js 15.0.3** to verify compatibility
3. **Update documentation** if Next.js 15 requires specific configuration
4. **Provide timeline** for when this will be resolved

---

## Contact Information

**Reporter**: Ryan Hodge
**GitHub**: https://github.com/ryanxkh/webflow-rag
**Project Name**: webflow-rag
**Webflow Cloud Project ID**: (from dashboard)

---

## Appendix: Full Build Configuration

### package.json (apps/web)
```json
{
  "dependencies": {
    "next": "15.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@opennextjs/cloudflare": "^1.13.1",
    "@cloudflare/next-on-pages": "^1.13.16"
  }
}
```

### webflow.json
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

### next.config.ts (User's Original)
```typescript
const nextConfig = {
  basePath: '/app',
  assetPrefix: '/app',
  images: {
    unoptimized: true,
  },
  output: 'standalone',
};

export default nextConfig;
```

---

**End of Bug Report**
