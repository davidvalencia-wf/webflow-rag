---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/05-01-2024
title: "Live CMS item management | Webflow Developer Documentation"
published: 2025-11-17
---

[May 1, 2024](https://developers.webflow.com/data/changelog/05-01-2024)

## [Live CMS item management](https://developers.webflow.com/data/changelog/05-01-2024)

The Data API now supports new endpoints dedicated to managing live CMS items. The new live CMS endpoints create a clear separation between staged content (drafts) and published content (live), allowing you to:

- Access only published content without retrieving draft items
- Make direct changes to published content
- Create content that bypasses the draft/staging workflow
- Manage the live database independently of the editing environment

### New endpoints

- **[Get live CMS item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/get-item-live)**

Retrieve a specific item from the live database.

- **[List live CMS items](https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live)**

Retrieve all published items from a collection.

- **[Create live CMS item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/create-item-live)**

Add a new item directly to the live database, bypassing the staging workflow.

- **[Update live CMS item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-item-live)**

Modify an existing item in the live database without affecting its staged version.

- **[Delete live CMS item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live)**

Remove an item from the live database.

Changes made through these live endpoints affect only what visitors see on your published site. They don’t affect staged content in the Webflow Designer, which requires separate API calls to the non-live endpoints.

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