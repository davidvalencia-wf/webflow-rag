---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/environment/nodejs-compatibility
title: "Node.js compatibility | Webflow Developer Documentation"
published: 2025-11-17
---

Node.js is a popular JavaScript runtime for building server-side apps, offering access to system resources and core modules like `fs`, `path`, and `http`. Many npm packages depend on these modules or other Node.js-specific APIs.

Edge environments, such as Webflow Cloud, run code closer to users for better speed, scalability, and security. Instead of full Node.js support, Webflow Cloud relies on Web APIs such as `fetch`, `Request`, and `Response`. While Workers runtime compatibility with Node.js APIs is improving, key differences and limitations remain.

Understanding these differences is essential for building apps on Webflow Cloud.

## Node.js compatibility in Webflow Cloud

The Workers runtime is steadily expanding support for Node.js APIs, but there are still limitations.

- **Native support:** Many Node.js APIs are now natively supported, including modules like `Buffer`, `crypto`, `stream`, and `path`. See the [Cloudflare Node.js compatibility matrix](https://workers-nodejs-compat-matrix.pages.dev/) for the full list.
- **Polyfills:** For unsupported APIs, Cloudflare provides [polyfills](https://dev.to/sandeepnautiyal/polyfills-explained-making-modern-javascript-work-everywhere-34lc). These partial implementations enable many packages to run, but unsupported methods may throw errors at runtime.

When you deploy to Webflow Cloud, Node.js compatibility settings are automatically applied to your Worker.

wrangler.json

```
{
  "compatibility_date": "2025-04-15",
  "compatibility_flags": [\
    "nodejs_compat"\
  ]
}
```

**You can’t edit or override these settings when deploying to Webflow Cloud.**

- Node.js compatibility and polyfills are enabled by default.
- You can’t add, remove, or customize polyfills or compatibility flags.
- Some npm packages that require unsupported Node.js APIs or extra configuration may not work as expected. If you encounter issues, use native Web APIs instead.

### Common errors

If you use an unsupported Node.js API, you may see errors in your [build logs](https://developers.webflow.com/webflow-cloud/deployments#build-logs):

- **Module not found or import errors**

Build log

```
Could not resolve 'fs'
Unexpected external import of 'fs', 'http'
Could not access built-in Nodejs modules
```

- **Runtime exceptions**

Build log

```
Worker threw a JavaScript exception (Cloudflare error code 1101)
Uncaught Error: No such module 'buffer' imported from 'index.js'
```

- **Silent failure or incomplete functionality**

Build log

```
Uncaught Error: No such module 'buffer' imported from 'index.js'
```

If you encounter these errors, switch to native Web APIs or supported APIs. For more details, see the [Cloudflare Node.js compatibility matrix](https://workers-nodejs-compat-matrix.pages.dev/) and the [official Cloudflare Workers Node.js API docs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

## Best practices for edge compatibility

### Use Web APIs for network and data operation

Node.js APIs aren’t always supported in the edge runtime. When that’s the case, use the equivalent Web API. See below for a list of common Node.js APIs and their Web counterparts.

| ✅ Use (Web APIs) | ❌ Avoid (Node.js APIs) | Notes / alternatives |
| --- | --- | --- |
| `fetch`, `Request`, `Response` | `http`, `https`, `net` | Use `fetch` for all HTTP requests. |
| `crypto.subtle` | `crypto` | Use [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) for hashing/encryption. |
| `FormData`, `URL`, `URLSearchParams` | `querystring`, `form-data` | Use Web APIs for URL and form data. |
| `Uint8Array`, `TextEncoder`, `TextDecoder` | `Buffer` | Prefer Web APIs for binary/text data. |
| External storage | `fs`, `path`, `os` | No file system access; use external storage. |
| Edge-native concurrency (stateless) | `child_process`, `worker_threads` | No process spawning or threads. |
| Streams | `stream` | Use the [Web Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/). |
| `setTimeout`, `setInterval` | N/A | Supported, but limited by worker/request lifetime. |

### Choose edge-compatible libraries

Many popular libraries now rely on Web APIs instead of Node.js core modules. When possible, choose libraries built for edge environments or with pure JavaScript implementations.

To help, we’ve compiled a list of popular libraries and their edge-compatible alternatives.

| Use case | Node.js library | Edge-compatible alternatives | Notes |
| --- | --- | --- | --- |
| Password hashing | `bcrypt` | [`bcryptjs`](https://www.npmjs.com/package/bcryptjs), [`bcrypt-edge`](https://www.npmjs.com/package/bcrypt-edge) | `bcrypt-edge` is optimized for Cloudflare Workers and other edge environments. |
| Image manipulation | `sharp` | [`pica`](https://www.npmjs.com/package/pica), [`jimp`](https://www.npmjs.com/package/jimp), [`ImageScript`](https://www.npmjs.com/package/imagescript) | No native Node.js; use WASM or pure JS alternatives. |
| File uploads | `multer` | Browser [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) \+ direct upload to R2/S3 | Use browser-native FormData and direct upload to object storage (R2/S3). For server-side, avoid Node.js streams. |
| Database ORM | `Prisma` | [`@prisma/client`](https://www.npmjs.com/package/@prisma/client) (with [Prisma Edge](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare)), [`drizzle-orm`](https://www.npmjs.com/package/drizzle-orm) | Prisma Edge requires compatible drivers and edge support. |
| Authentication | `NextAuth.js` | [`Clerk`](https://clerk.com/), [`Auth0`](https://auth0.com/), [`Auth.js`](https://authjs.dev/guides/edge-compatibility) | Use providers with edge support. [`Auth.js`](https://authjs.dev/guides/edge-compatibility) is working toward full edge compatibility. |
| Email | `nodemailer` | [`Resend`](https://resend.com/), [`SendGrid`](https://sendgrid.com/), [Cloudflare Email](https://developers.cloudflare.com/email-routing/) | Use a service that supports edge environments. |
| JWT auth | `jsonwebtoken` | [`jose`](https://www.npmjs.com/package/jose) | Lightweight, edge-compatible JWT library. |
| ID generation | `uuid`, `shortid` | [`nanoid`](https://www.npmjs.com/package/nanoid) | Fast, secure, and edge-compatible. |

### Troubleshoot library compatibility

- Check for errors like `ReferenceError: process is not defined` or `Module not found: fs`. These indicate Node.js dependencies that aren’t supported in the Workers runtime.
- Polyfills using `unenv` or custom `wrangler.json` aren’t currently supported on Webflow Cloud.

## Resources

- [Cloudflare Node.js compatibility matrix](https://workers-nodejs-compat-matrix.pages.dev/)
- [Cloudflare Workers Node.js API docs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Polyfills explained](https://dev.to/sandeepnautiyal/polyfills-explained-making-modern-javascript-work-everywhere-34lc)

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions

How do I get started with Webflow Cloud storage and what are the three main storage options available?

What are the new LLMS.txt endpoints available for Enterprise customers and how do they work?

What changes are required for internal APIs affecting site data sync, and what is the migration timeline?

How can I use the MCP server with the Designer API, and what are the system requirements?

What are the breaking changes for CMS publishing on July 7, 2025, and how should I update my code?