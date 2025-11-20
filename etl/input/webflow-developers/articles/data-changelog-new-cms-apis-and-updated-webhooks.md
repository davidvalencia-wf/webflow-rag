---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/new-cms-apis-and-updated-webhooks
title: "New CMS APIs and updated webhooks | Webflow Developer Documentation"
published: 2025-11-17
---

[May 27, 2022](https://developers.webflow.com/data/changelog/new-cms-apis-and-updated-webhooks)

## [New CMS APIs and updated webhooks](https://developers.webflow.com/data/changelog/new-cms-apis-and-updated-webhooks)

## Overview

As of May 27, 2022, the Webflow Data API now supports unpublishing CMS items, along with improved webhook capabilities and documentation fixes.

## New features

### CMS item unpublish API

The Webflow Data API now supports unpublishing individual CMS items. This aligns with the [unpublish individual items](https://webflow.com/updates/remove-cms-content-without-publishing-your-entire-site) feature in Webflow that allows you to remove CMS content without publishing your entire site.

You can now use the [Unpublish API](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live) in your code to manage content publication state programmatically.

**SDK Update Required**: If you’re using the [Webflow Node.js SDK](https://github.com/webflow/js-webflow-api), please update to version `0.7.2` or higher to access this functionality.

### New webhook trigger: `collection_item_unpublished`

The API now supports the `collection_item_unpublished` webhook trigger. This webhook triggers whenever a CMS item is unpublished, enabling integrations to respond to these events in real-time.

## Improvements

### Enhanced `site_publish` webhook trigger

The `site_publish` webhook now includes additional properties, providing better visibility into your site’s publishing activity:

- **`domains`**: The domains where the content was published
- **`publishedBy`**: The user who initiated the publish action

These additions improve tracking capabilities and help with auditing site publishing workflows.

## Bug fixes

### Product documentation correction

We’ve fixed an incorrect route in the `Update Product` documentation. The documentation now accurately reflects the API’s functionality.

If you encounter any documentation issues, please let us know through our [support channels](https://webflow.com/dashboard/help).

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