---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/environment/configuration
title: "Configuration | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow Cloud is designed to handle most of your deployment configuration, so you can focus on building your app. This page explains what’s configured automatically and what you need to know if you want to understand or troubleshoot the process.

For step-by-step setup use the following guides:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/PublishDesigner.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/PublishDesigner.svg)\\
\\
Getting Started\\
\\
Get started with Webflow Cloud by following our step-by-step guide.](https://developers.webflow.com/webflow-cloud/getting-started) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Migration.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Migration.svg)\\
\\
Bring your own app\\
\\
Migrate an existing project to Webflow Cloud.](https://developers.webflow.com/webflow-cloud/bring-your-own-app)

## Deployment details

Webflow Cloud hosts your app on [Cloudflare Workers](https://developers.cloudflare.com/workers/), running it at a base path within your Webflow Cloud [environment](https://developers.webflow.com/webflow-cloud/environments) (for example, `/app`). This base path serves as the mount point for your application.

When you [deploy your environment](https://developers.webflow.com/webflow-cloud/deployments), Webflow Cloud uses [Wrangler](https://developers.cloudflare.com/workers/wrangler/), Cloudflare’s official CLI, to deploy your app to the Workers platform with a standard configuration.

## Default configuration

When you [deploy an environment](https://developers.webflow.com/webflow-cloud/deployments) in Webflow Cloud, Webflow automatically sets up the necessary configuration for deployment to the Workers platform.

During deployment, Webflow Cloud generates a `wrangler.json` configuration file based on the framework specified in your `webflow.json` file. This file includes recommended defaults for:

- Asset handling
- Node.js API compatibility
- Observability (for example, logging and metrics)

**This production file is generated automatically and can’t be edited directly.** For more details on Wrangler configuration, see the [Wrangler documentation](https://developers.cloudflare.com/workers/wrangler/configuration/).

###### Next.js

###### Astro

wrangler.json

```
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "nextjs",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-03-01",
  "compatibility_flags": [\
    "nodejs_compat"\
    ],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  },
  "observability": {
    "enabled": true
  },

  "kv_namespaces": [\
    {\
      "binding": "KV",\
      "id": "1234567890" // Webflow Cloud will automatically generate an ID for your environment\
    }\
  ],
  "d1_databases": [\
    {\
      "binding": "DB",\
      "database_name": "my-database",\
      "database_id": "1234567890", // Webflow Cloud will automatically generate an ID for your environment,\
      "migrations_dir": "./migrations" // Specify the directory containing your migrations\
    }\
  ]
}
```

### Storage resources

If your app requires storage, you can declare [storage bindings](https://developers.webflow.com/webflow-cloud/storing-data/overview) in your `wrangler.json` file. Webflow Cloud reads these bindings during deployment and automatically creates the corresponding storage resources in your environment. All other configuration values remain managed by Webflow Cloud and can’t be modified directly. Learn more about [storage in Webflow Cloud.](https://developers.webflow.com/webflow-cloud/storing-data/overview).

## Framework configuration

Some frameworks require additional configuration to run on Webflow Cloud and the [Workers runtime](https://developers.webflow.com/webflow-cloud/environment). If you’ve created a new project using the Webflow Cloud CLI, Webflow Cloud will automatically add the necessary configuration files to your project. If you’ve brought your own app, you’ll need to add the necessary files to your project.

###### Next.js

###### Astro

Next.js apps require the following files:

- `next.config.js`: Configures your environment’s [mount path](https://developers.webflow.com/webflow-cloud/environments#mount-paths) and adapter settings.
- `.open-next.config.ts`: Optimizes Next.js for the [edge runtime](https://developers.webflow.com/webflow-cloud/environment).
- `cloudflare.env.ts`: Enables your app to access your [environment variables](https://developers.webflow.com/webflow-cloud/environments#managing-environment-variables).

next.config.js.open-next.config.tscloudflare.env.ts

```
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/YOUR_BASE_PATH", // your environment's mount path
  assetPrefix: '/YOUR_BASE_PATH', // ensure this matches your environment's mount path
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
```

## Mount path configuration

When you create an [environment](https://developers.webflow.com/webflow-cloud/environments), you set a mount path, which is the subpath where your app will be accessible.
For example, with a mount path of `/app`, your app lives at:

```
https://your-webflow-cloud-domain.com/app
```

In your framework configuration, make sure you set your app’s base path and asset prefix to the mount path of your environment. When building your app, use the provided `BASE_URL` and `ASSETS_PREFIX` environment variables to construct correct paths instead of hard-coding them.

### `BASE_URL`

The `BASE_URL` variable represents the mount path of your environment. Combine this with your Webflow Cloud domain to create the URL where your application is accessible to users.

Use for:

- Navigation links and client-side routing
- Form actions and redirects

###### Next.js

###### Astro

```
// Access BASE_URL in Next.js
import config from "../next.config";

const baseUrl = config.basePath || '';

// Navigation button
<Link href={`${baseUrl}/`}>
  <button>Back to Home</button>
</Link>

// API fetch
const response = await fetch(`${baseUrl}/api/users`);
```

### `ASSETS_PREFIX`

`ASSETS_PREFIX` is the URL for static assets and some direct API calls. The `ASSETS_PREFIX` URL points directly to the Worker handling your app.

Use for:

- Referencing static assets (images, CSS, JavaScript files)
- Uploading large files to your app

###### Next.js

###### Astro

```
// Access ASSETS_PREFIX in Next.js
import config from "../next.config";

const assetsPrefix = config.assetPrefix || config.basePath || '';

// Reference an image asset
<img src={`${assetsPrefix}/images/logo.png`} alt="Logo" />
```

## Troubleshooting and common questions

Why can’t I edit `wrangler.json`?

Webflow Cloud manages this file to ensure compatibility and security.

###### How do I migrate an existing project?

If you’re migrating an existing project, follow the steps in the [Bring your own app guide](https://developers.webflow.com/webflow-cloud/bring-your-own-app).

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