---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/06182024
title: "CMS item filtering and sorting | Webflow Developer Documentation"
published: 2025-11-17
---

[June 18, 2024](https://developers.webflow.com/data/changelog/06182024)

## [CMS item filtering and sorting](https://developers.webflow.com/data/changelog/06182024)

The Webflow Data API now supports server-side filtering and sorting capabilities for CMS items, along with enhanced page metadata information. These updates help you optimize data retrieval, improve performance, and gain access to additional page details.

## Enhanced CMS item management

The CMS endpoints [List CMS items](https://developers.webflow.com/data/reference/cms/collection-items/items/list-items) and [List live CMS items](https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live) now feature filtering and sorting capabilities to help you optimize data retrieval and build more efficient applications.

### Server-side filtering options

You can now filter CMS items with these new parameters:

- **Name and slug exact matching**

Use `name` and `slug` query parameters for precise filtering

```
GET /collections/{collection_id}/items?name=Featured+Article
GET /collections/{collection_id}/items?slug=featured-article
```

- **Publication date ranges**

Filter by `lastPublished` date ranges to find recently updated content

```
GET /collections/{collection_id}/items?lastPublished[gt]=2024-05-01T00:00:00Z
GET /collections/{collection_id}/items?lastPublished[lt]=2024-06-18T00:00:00Z
```

- **Combined filters**

Combine multiple filters for precise data retrieval

```
GET /collections/{collection_id}/items?slug=featured-article&lastPublished[gt]=2024-05-01T00:00:00Z
```

### Server-side sorting

Sort your CMS items directly on the server to minimize data processing in your application:

- **Sort by publication date**

Sort by `lastPublished` in ascending or descending order

```
GET /collections/{collection_id}/items?sortBy=lastPublished&sortOrder=asc
GET /collections/{collection_id}/items?sortBy=lastPublished&sortOrder=desc
```

- **Sort by name or slug**

Sort alphabetically by item name or slug

```
GET /collections/{collection_id}/items?sortBy=name&sortOrder=asc
GET /collections/{collection_id}/items?sortBy=slug&sortOrder=asc
```

Server-side filtering and sorting significantly reduce the amount of data transferred and processed by your application, improving performance and reducing API usage.

## Enhanced page metadata

The [Get page metadata](https://developers.webflow.com/data/reference/pages/get-metadata) endpoint now includes additional information that’s valuable for multi-language sites and SEO optimization.

### New metadata fields

- **`localeId`**

Identify the language/locale of a specific page

- **`publishedPath`**

Access the published URL path for the page

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