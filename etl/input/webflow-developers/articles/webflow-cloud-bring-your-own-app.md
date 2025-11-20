---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/bring-your-own-app
title: "Bring your own app | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow Cloud deploys your app using on the [Edge runtime](https://developers.webflow.com/webflow-cloud/environment), enabling fast, globally distributed hosting. Before deploying to Webflow Cloud, your project may require some configuration to ensure compatibility with the Edge environment.

In this guide, you’ll learn how to create projects and environments, configure your app for Webflow Cloud, and deploy your app to your Webflow site,

##### Get Started with Webflow Cloud

To familiarize yourself with Webflow Cloud, it’s recommended to create your first Webflow Cloud project from the Webflow CLI before configuring a custom project.

[Get started with Webflow Cloud →](https://developers.webflow.com/webflow-cloud/getting-started).

**Time Estimate:** 30 minutes

**Prerequisites:**

- A Webflow account
- A Webflow site with components
- A GitHub account
- One of the following:
  - An Astro project
  - A Next.js project (version 15 or higher)
- Node.js 20.0.0 or higher and `npm` installed
  - **Note:** Currently, Webflow Cloud only supports using the `npm` package manager

## 1\. Create a new Webflow Cloud project

Connect GitHub to Webflow Cloud, create a project, and configure an environment for automated deployments.

![Webflow Cloud project creation](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/project-setup-05-09.png)

[1](https://developers.webflow.com/webflow-cloud/bring-your-own-app#open-webflow-cloud)

### Open Webflow Cloud

In Webflow, navigate to your site’s settings and select “Webflow Cloud” from the sidebar.

[2](https://developers.webflow.com/webflow-cloud/bring-your-own-app#authenticate-with-github)

### Authenticate with Github

Click the “Login to GitHub” button to connect your GitHub account. Then click the “Install GitHub” button. Follow the instructions to allow Webflow Cloud to access your GitHub repositories.

[3](https://developers.webflow.com/webflow-cloud/bring-your-own-app#create-a-new-webflow-cloud-project)

### Create a new Webflow Cloud project

Click “Create New Project”

[4](https://developers.webflow.com/webflow-cloud/bring-your-own-app#add-project-details)

### Add project details

- Choose a **name** for your Webflow Cloud project.
- Provide the URL of your newly created **GitHub repository.**
- Optionally, enter a **description** for your app.
- Click **“Create project”** to save your project.

[5](https://developers.webflow.com/webflow-cloud/bring-your-own-app#create-a-new-environment)

### Create a new Environment

![Webflow Cloud environment creation](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/github-setup.png)

- Choose a **branch** to deploy your project from.
- Choose a **mount path** for your project (for example, /admin → mysite.webflow.io/admin).
- Click **“Create environment”** to save a new environment for the project.

[6](https://developers.webflow.com/webflow-cloud/bring-your-own-app#publish-your-webflow-site)

### Publish your Webflow Site

To make your new project and environment live, you’ll need to publish your Webflow site. Click the “Publish” button in the top right corner of your Webflow Dashboard.

## 2\. Configure your project for Webflow Cloud

Webflow Cloud deploys your app on the [Edge runtime](https://developers.webflow.com/webflow-cloud/environment), enabling fast, globally distributed hosting. The Edge runtime environment differs from traditional Node.js servers, requiring specific configurations for compatibility.

The following steps outline common migration patterns to help you adapt your application for Webflow Cloud. Depending on your application’s specific requirements, you may need to make additional adjustments beyond these configurations.

###### Next.js

###### Astro

##### Webflow Cloud is compatible with Next.js 15 and higher

Webflow Cloud is compatible with Next.js 15 and higher. If you’re using a version of Next.js lower than 15, please upgrade to the latest version.

[1](https://developers.webflow.com/webflow-cloud/bring-your-own-app#configure-your-base-path)

### Configure your base path

In Webflow Cloud, your application is served from the mount path you configured in your environment settings. For example, if your mount path is `/app`, your application will be accessible at `yourdomain.webflow.io/app`. To ensure proper routing and asset loading, you must configure the `basePath` and `assetPrefix` properties in your `next.config.ts` file to match this mount path exactly.

next.config.ts

```
module.exports = {
    // Configure the base path and asset prefix to reflect the mount path of your environment
    // For example, if your app is mounted at /app, set basePath and assetPrefix to '/app'
    basePath: '/app',
    assetPrefix: '/app',

    // Additional Next.js configuration options can be added here
    // For example:
    // output: 'standalone',
    // reactStrictMode: true,
}
```

[2](https://developers.webflow.com/webflow-cloud/bring-your-own-app#install-and-configure-opennext)

### Install and configure OpenNext

OpenNext is an adapter designed specifically for deploying Next.js applications to cloud environments like Webflow Cloud. By using OpenNext, you can deploy your Next.js app without managing complex infrastructure configurations yourself.

1. **Install OpenNext**

In your terminal, navigate to your project and run the following command to install OpenNext:

```
npm install @opennextjs/cloudflare@1.6.5
```

2. **Configure OpenNext**

Create a new configuration file named `open-next.config.ts` in your project’s root directory. This file configures OpenNext to work with Webflow Cloud’s deployment environment.

open-next.config.ts

```
import type { NextConfig } from "next";

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
});
```

[3](https://developers.webflow.com/webflow-cloud/bring-your-own-app#set-up-local-testing-for-webflow-cloud)

### Set up local testing for Webflow Cloud

Webflow Cloud uses Wrangler - Cloudflare’s CLI tool - to bridge the gap between local development and cloud deployment. By integrating Wrangler into your workflow, you can identify and resolve compatibility issues early, significantly reducing debugging time after deployment.

1. **Install Wrangler**

To get started, install and configure Wrangler as a dev dependency in your project.

```
npm install wrangler --save-dev
```

2. **Set up your Wrangler configuration**

Create a `wrangler.jsonc` file in your project root that defines how your application will run in development.

wrangler.jsonc

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
       }
       /** Rest of Code **/
}
```

See the Cloudflare documentation for [more details on how to configure Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/).

3. **Create a Cloudflare environment file**

Create a new file named `cloudflare-env.d.ts` in your project’s root directory. This file will allow you to use environment variables defined in your Webflow Cloud environment.

cloudflare-env.d.ts

```
interface CloudflareEnv {
}
```

4. **Add the development preview command**

Add this script to your `package.json` file to enable local testing with Wrangler. This command builds your Next.js app and immediately serves it using the Edge runtime, giving you an exact preview of how your app will perform in production on Webflow Cloud:

package.json

```
"scripts": {
       // Existing scripts...
       "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview", //
}
```

[4](https://developers.webflow.com/webflow-cloud/bring-your-own-app#define-your-webflow-cloud-framework-configuration)

### Define your Webflow Cloud framework configuration

Create a `webflow.json` file at the root of your project to inform Webflow Cloud about your app’s framework.

webflow.json

```
{
    "cloud": {
        "framework": "nextjs"
    }
}
```

## 3\. Manage assets and APIs

###### Next.js

###### Astro

[1](https://developers.webflow.com/webflow-cloud/bring-your-own-app#asset-references)

### Asset references

How you reference assets depends on which component you’re using:

**Next.js Image component**: Local images are automatically optimized and served through Webflow’s CDN.

src/app/components/Logo.tsx

```
import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/images/logo.png" // No prefix needed - automatically optimized
            alt="Logo"
            width={180}
            height={40}
            priority
        />
    );
}
```

**Plain img tags**: Must include `assetPrefix` to load correctly and enable CDN caching.

src/app/components/Icon.tsx

```
import config from "../../../next.config";

// Get the asset prefix from config
const assetPrefix = config.assetPrefix || config.basePath || '';

export function Icon() {
    return (
        <img
            src={`${assetPrefix}/icons/star.svg`} // Prefix required for CDN caching
            alt="Star icon"
        />
    );
}
```

[2](https://developers.webflow.com/webflow-cloud/bring-your-own-app#apis)

### APIs

When using Next.js with a configured base path, there’s an important distinction between API route definitions and client-side requests:

1. **Server-side API route handlers** are automatically mounted at your base path by Next.js. To ensure your API routes run on the Edge runtime, add the `export const runtime = 'edge';` directive to your API route.
2. **Client-side fetch calls** must **_manually_** include the base path to correctly reach your endpoints

Without these adjustments, your API routes will not build properly and your client-side fetch calls will fail by targeting the wrong URL. Implement these patterns in all your APIs and client-side data fetching functions:

API RoutesClient-side fetch call

```
// /src/pages/api/data.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: 'Hello, world!' });
}
```

##### Edge Runtime: Use `fetch` API

The Edge runtime has limited API support. Stick to `fetch` for API calls and avoid third-party clients like `axios` which may not be compatible.

## 4\. Configure environment variables

[1](https://developers.webflow.com/webflow-cloud/bring-your-own-app#access-environment-variable-settings)

### Access environment variable settings

In Webflow Cloud, navigate to your project’s environment settings:

- Click your project name in the dashboard
- Select the specific environment you want to configure
- Click the **“Environment Variables”** tab

[2](https://developers.webflow.com/webflow-cloud/bring-your-own-app#add-and-configure-environment-variables)

### Add and configure environment variables

Add each environment variable that your application requires:

- Click **“Add Variable”**
- Enter a descriptive **“Variable Name”** (e.g., `DATABASE_URL`, `API_KEY`)
- Enter the corresponding **“Variable Value”**
- Toggle **“Secret”** for sensitive values that should be encrypted (API keys, tokens, etc.)
- Click **“Add Variable”** to save

Repeat this process for all required variables.

##### Environment variables are only available at runtime

Environment variables in Webflow Cloud are injected at runtime only and are not accessible during the build process. Keep the following in mind to avoid build failures:

- Do not include environment variable validation or required checks that run during build time
- Use conditional logic to handle cases where environment variables might be undefined during builds

[3](https://developers.webflow.com/webflow-cloud/bring-your-own-app#access-environment-variables-in-your-code)

### Access environment variables in your code

Your environment variables are accessible in your code using the following methods.

###### Next.js

###### Astro

Next.js provides environment variables through the `process.env` object.

Next.js

```
process.env.VARIABLE_NAME
```

## 5\. Deploy your project

After configuring your project:

1. **Test your app in the local preview environment**

Use the local preview environment with Wrangler to simulate the same base path configuration as your production environment.

```
npm run preview
```

2. **Deploy using the Webflow CLI**

In your terminal, run the following command to deploy your project to Webflow Cloud:

```
webflow cloud deploy
```

Additionally, when you commit your changes to your GitHub branch, Webflow Cloud will automatically detect the changes and deploy your project to your environment. Learn more about [deployments in the documentation.](https://developers.webflow.com/webflow-cloud/deployments)

##### Your deployment may take up to 2 minutes to complete

View your deployment in the [“Environment Details”](https://developers.webflow.com/webflow-cloud/deployments#deployment-history) dashboard. Review the status of your deployment by viewing the [build logs](https://developers.webflow.com/webflow-cloud/deployments#build-logs).

3. **View your app at your site’s URL + mount path**

Once your app has been successfully deployed, navigate to your site’s domain and mount path to see your newly deployed Webflow Cloud app!

**🎉Congratulations!**

You’ve successfully deployed your app on Webflow Cloud.

## Next steps

Now that you’ve successfully deployed your app on Webflow Cloud, here’s what you can do next.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DevLink.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DevLink.svg)\\
\\
Sync your Webflow design system\\
\\
Learn how to use DevLink to sync your Webflow styles, variables, and components with your app](https://developers.webflow.com/devlink/reference/overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Optimize.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Optimize.svg)\\
\\
Optimize your app for Webflow Cloud\\
\\
Explore how to optimize and tailor your deployment for the best experience on Webflow Cloud.](https://developers.webflow.com/webflow-cloud/environment/framework-customization) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CloudUpload.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CloudUpload.svg)\\
\\
Manage deployments\\
\\
Explore deployment options and Webflow Cloud’s CI/CD integration with GitHub to streamline your release process](https://developers.webflow.com/webflow-cloud/deployments) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
Add a SQLite database to your app\\
\\
Add a SQLite database to your app to store and retrieve user data.](https://developers.webflow.com/webflow-cloud/add-sqlite)

## Troubleshooting

###### I'm seeing a 404 error when I try to access my app

After creating a new environment, you’ll need to publish your Webflow site to make your environment live.

###### A deployment doesn't start when I push to my Github repo

The [Webflow Cloud GitHub App](https://github.com/apps/webflow-cloud/installations/select_target) may not have access to your repository. To check, go to the `Webflow Cloud` tab in your Webflow site settings and click “Install GitHub App.” Follow the prompts on GitHub to ensure Webflow has access to read from your repository. Once you grant access, try committing to the branch that Webflow Cloud should be monitoring for deployments in your app.

###### My assets or API routes aren't loading correctly

Check that you’re correctly using the base path in all asset and API references. Look for fixed paths that might be missing the base path prefix.

###### Authentication isn't working properly

Verify that your callback URLs include the correct base path and that you’re not duplicating the base path in your code references.

###### My build is failing in Webflow Cloud

Check your project’s [build logs](https://developers.webflow.com/webflow-cloud/deployments#build-logs) in the Webflow Cloud dashboard. Common issues include:

- Incompatible Node.js version
- Environment variables not configured correctly
- Missing or incorrect framework configuration in the following files:
  - `webflow.json`
  - `next.config.js` or `Astro.config.js`
  - `wrangler.jsonc`
  - `cloudflare-env.d.ts` or `worker-configuration.d.ts`
- Custom build commands not supported (Webflow Cloud only uses `Astro build` or `next build`)

###### Caching is not working as expected

Webflow Cloud overrides custom cache headers from your application. Once content is cached, you can’t control caching behavior through standard HTTP headers like `Cache-Control`. See more on header behavior limitations [here](https://developers.webflow.com/webflow-cloud/limits#header-behavior-limitations).

This means traditional cache invalidation methods won’t work - you’ll need to work within Webflow Cloud’s caching behavior rather than trying to override it.

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