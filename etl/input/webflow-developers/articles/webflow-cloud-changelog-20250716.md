---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/changelog/20250716
title: "Introducing storage for Webflow Cloud | Webflow Developer Documentation"
published: 2025-11-17
---

[July 16, 2025](https://developers.webflow.com/webflow-cloud/changelog/20250716)

## [Introducing storage for Webflow Cloud](https://developers.webflow.com/webflow-cloud/changelog/20250716)

We’re excited to announce that storage is now available in Webflow Cloud.

With storage, you’re no longer limited to stateless apps or forced to connect to external APIs just to save or retrieve data. Now, you can use built-in bindings to securely store, manage, and access your data right inside your Webflow Cloud project.

## What’s new?

You can now choose from multiple storage options, each designed for different types of data and use cases:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
SQLite\\
\\
Store and manage structured, relational data using a familiar SQL database. Webflow Cloud handles provisioning, scaling, and security, so you can focus on building features.](https://developers.webflow.com/webflow-cloud/storing-data/sqlite) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DeveloperToolsSDK.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DeveloperToolsSDK.svg)\\
\\
Key Value Store\\
\\
Instantly store and retrieve unstructured or semi-structured data at the edge. Perfect for caching API responses, managing sessions, or saving user preferences.](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store)

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/App.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/App.svg)\\
\\
Object Storage\\
\\
Upload, store, and serve large files and media directly from your app. Object Storage is scalable, S3-compatible, and has no egress fees.](https://developers.webflow.com/webflow-cloud/storing-data/object-storage)

## Why it matters

- **More power, less hassle**

Build dynamic, data-driven apps without worrying about external databases or third-party APIs.

- **Secure and scalable**

All storage is managed by Webflow Cloud, with built-in security, backups, and scaling.

- **Easy to use**

Declare a binding in your `wrangler.json` file, and your app can read and write data using environment variables—no secret keys or manual setup required.

## How to get started

- Check out the [Storing data in Webflow Cloud](https://developers.webflow.com/webflow-cloud/storing-data/overview) overview for a quick start.
- Dive into the guides for [SQLite](https://developers.webflow.com/webflow-cloud/storing-data/sqlite), [Key Value Store](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store), and [Object Storage](https://developers.webflow.com/webflow-cloud/storing-data/object-storage).
- Add a SQLite database to your app using the [quickstart](https://developers.webflow.com/webflow-cloud/add-sqlite).

* * *

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