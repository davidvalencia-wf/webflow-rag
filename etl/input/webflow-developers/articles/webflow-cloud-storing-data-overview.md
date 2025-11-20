---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/storing-data/overview
title: "Storing data in Webflow Cloud | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow Cloud lets you build and deploy modern web applications with built-in support for persistent data storage. Whether you need to store structured records or simple key-value pairs, Webflow Cloud provides flexible options to match your app’s needs.

## Storage options in Webflow Cloud

Webflow Cloud offers three storage solutions, each designed for different types of data and use cases:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
SQLite\\
\\
Best for structured, relational data - like user profiles, product catalogs, or transactional records.](https://developers.webflow.com/webflow-cloud/storing-data/sqlite) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DeveloperToolsSDK.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DeveloperToolsSDK.svg)\\
\\
Key Value Store\\
\\
Best for unstructured, dynamic data - like user preferences, session data, or temporary settings.](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/App.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/App.svg)\\
\\
Object Storage\\
\\
Best for large files and unstructured data - like images, videos, or PDF files.](https://developers.webflow.com/webflow-cloud/storing-data/object-storage)

* * *

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Code.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Code.svg)

Add a database to your app

Ready to add your first database to your app? Jump into the quickstart and
start building with real data in minutes.

[Start building](https://developers.webflow.com/webflow-cloud/add-sqlite)

## How storage works in Webflow Cloud

Webflow Cloud connects your app to storage resources using **bindings.**

A binding is a configuration that grants your app secure, direct access to a specific resource managed by Webflow Cloud. When you declare a binding in your `wrangler.json` file and deploy your app, Webflow Cloud automatically creates a resource and grants your app permission to use it.

With bindings, you can:

- **Access resources automatically.** No secret keys required.
- **Reference bindings** as environment variables in your app.
- **Maintain isolated environments.** Each binding is specific to a project’s [environment](https://developers.webflow.com/webflow-cloud/environments).
- **Manage bindings and resources** in the Webflow Cloud dashboard.

Bindings combine permission and API access in a single step, so you can read and write data securely and efficiently.

## Declaring a binding

Declaring a binding is the first step to using storage in your app. You can declare a binding in the Webflow Cloud dashboard or in your `wrangler.json` file.

### Before you start

Before you can declare a binding, you need to have a project in Webflow Cloud and an environment for your app. If you don’t have a project or an environment, you can create by following the steps in the [getting started guide](https://developers.webflow.com/webflow-cloud/getting-started).

###### Dashboard

###### wrangler.json

[1](https://developers.webflow.com/webflow-cloud/storing-data/overview#open-the-environment-dashboard)

### Open the environment dashboard

In Webflow Cloud, select your project and the environment where you plan to deploy your app.

![Example screenshot of the environment dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/environment-dashboard.png)

[2](https://developers.webflow.com/webflow-cloud/storing-data/overview#go-to-the-storage-tab)

### Go to the storage tab

In the environment dashboard, click the **Storage** tab to view all storage resources for the selected environment.

![Example screenshot of the Storage tab in the environment dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/storage-tab.png)

[3](https://developers.webflow.com/webflow-cloud/storing-data/overview#add-a-storage-resource)

### Add a storage resource

Click the **Add Storage** button to add a new storage resource. Choose the storage type you want to use from the dropdown menu.

![Example screenshot of adding a storage resource in the Webflock 1app](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/storage-quickstart.png)

[4](https://developers.webflow.com/webflow-cloud/storing-data/overview#copy-the-provided-snippet-to-wranglerjson)

### Copy the provided snippet to `wrangler.json`

Copy the provided snippet, and paste it into the `wrangler.json` file in your project’s root. Replace the placeholder values with values you want to use.

###### SQLite

###### Key Value Store

###### Object Storage

![Example snippet for adding a SQLite database](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/sql-snippet.png)

| Property | Description |
| --- | --- |
| `binding` | The name of the binding to use in your app. |
| `database_name` | The name of the database to create. |
| `database_id` | The ID of the database to create. **Webflow Cloud will generate a unique ID for you once you deploy your app.** |
| `migrations_dir` | The directory containing your migration files. |

##### Prepare your database schema

Before deploying your app, [you need to prepare your database schema and create a migration file](http://localhost:3000/webflow-cloud/storing-data/sqlite#manage-schema-and-migrations). You can create SQL migration files manually or generate them with a migration tool such as [Drizzle ORM](https://orm.drizzle.team/). On each deployment, Webflow Cloud will apply the migrations to your database.

[5](https://developers.webflow.com/webflow-cloud/storing-data/overview#generate-types-for-your-binding)

### Generate types for your binding

Generate TypeScript types for your bindings to enable autocomplete and type safety in your code editor:

```
npx wrangler types
```

This creates/updates a `worker-configuration.d.ts` file with your binding types.

[6](https://developers.webflow.com/webflow-cloud/storing-data/overview#deploy-your-app)

### Deploy your app

Deploy your app to Webflow Cloud by committing and pushing your changes to your linked GitHub repository. After deployment, you can [view and manage your storage resources in the Webflow Cloud dashboard](https://developers.webflow.com/webflow-cloud/storing-data/overview#managing-storage-in-the-webflow-cloud-dashboard).

For a complete walkthrough of using storage in your app, see the guides on [adding a SQLite database to your app](https://developers.webflow.com/webflow-cloud/add-sqlite) and [adding a Key Value Store to your app](https://developers.webflow.com/webflow-cloud/add-key-value-store).

## Accessing storage in your app

Once you’ve declared a binding, access the resource in your app using the binding name as an environment variable. Environment variables for bindings are automatically available in your app and don’t need to be manually created in your environment dashboard.

###### Next.js

###### Astro

In a Next.js app, you must access the environment variables for your bindings through the [Workers runtime](https://developers.webflow.com/webflow-cloud/environment) using the `getCloudflareContext()` function.

#### How to use `getCloudflareContext()`

- **Always** call `getCloudflareContext()` inside a function (not at the top level of your module) to ensure the binding is available in the correct context.
- **For static routes or use outside of request handlers** (such as Incremental Static Regeneration or Static Site Generation), use `getCloudflareContext({ async: true })` and await the result. This ensures the environment bindings are correctly resolved in all environments.

src/db/getDB.ts

```
import { getCloudflareContext } from "@opennextjs/cloudflare"; // Import the function
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

// Use in a request handler (e.g. API route)
export const getDb = cache(() => {
  const { env } = getCloudflareContext(); // Access the cloudflare environment
  return drizzle(env.DB, { schema }); // Access the DB binding
});

// Use for static routes (i.e. ISR/SSG)
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
});
```

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Code.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Code.svg)

Start working with real data

Ready to add your first database to your app? Jump into the quickstart and
start building with real data in minutes.

[Start building](https://developers.webflow.com/webflow-cloud/add-sqlite)

## Managing storage in the Webflow Cloud dashboard

Once you’ve deployed your app with the declared bindings, you can view and manage your storage resources directly in the Webflow Cloud dashboard:

[1](https://developers.webflow.com/webflow-cloud/storing-data/overview#open-the-environment-dashboard-1)

### Open the environment dashboard

In Webflow Cloud, select your project and environment where your app is
deployed with storage bindings configured in `wrangler.json`.

[2](https://developers.webflow.com/webflow-cloud/storing-data/overview#go-to-the-storage-tab-1)

### Go to the storage tab

In the environment dashboard, click the **Storage** tab to view all storage
resources for the selected environment. Each storage binding shows its name, type,
and creation date.

![Storage tab in Webflow Cloud environment dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/storage-tab.png)

[3](https://developers.webflow.com/webflow-cloud/storing-data/overview#view-and-manage-data)

### View and manage data

Click a binding to open the database viewer. You can: - Create, read,
update, and delete records (CRUD) - Search and sort data

![Database viewer in Webflow Cloud](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/assets/database-viewer.png)

## Next steps

- [Learn more about SQLite](https://developers.webflow.com/webflow-cloud/storing-data/sqlite)
- [Learn more about Key Value Store](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store)
- [See how to configure storage bindings in your project](https://developers.webflow.com/webflow-cloud/storing-data/overview#declaring-a-binding)
- [Learn about storage limits in Webflow Cloud](https://developers.webflow.com/webflow-cloud/limits)

## FAQs

###### Where can I see my storage resources?

Once you’ve deployed your app with the declared bindings, you can view and manage your storage resources directly in the Webflow Cloud dashboard.

![Storage tab in Webflow Cloud environment dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/assets/bindings-tab.png)

I declared a binding in my `wrangler.json` file, but I can't see it in the dashboard.

If you have an existing Webflow Cloud project, you may need to edit your project settings to enable storage

1. Go to your project in the Webflow Cloud dashboard.
2. Select the ”…” icon in the “Actions” section of the menu.
3. Select “Edit” (you don’t actually need to edit anything).
4. Press “Save Changes” to update your project.

![Project settings in Webflow Cloud](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/assets/edit-project.png)

Save the changes and redeploy your app. Once your app deploys you should see the storage tab in the dashboard.

###### I can't access the API methods on my binding

After declaring a binding, make sure you’ve generated the types for your binding. After running the following command, you’ll be able to access the API methods on your binding.

AstroNext.js

```
wrangler types
```

This creates/updates a `worker-configuration.d.ts` file with your binding types.

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