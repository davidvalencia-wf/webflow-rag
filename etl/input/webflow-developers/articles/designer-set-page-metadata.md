---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/set-page-metadata
title: "Set page metadata | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setMetadata(parameters)`

Updates the metadata of a page, including SEO-related properties, OpenGraph settings, and search configurations. For more information on the information and properties, see all methods in the Managing Pages section of the API Reference.

### Syntax

```
page.setMetadata(metadata: PageMetadata): void

type PageMetadata = {
  name: string;
  slug: string;
  title: string;
  description: string;
  isDraft: boolean;
  usesTitleAsOpenGraphTitle: boolean;
  openGraphTitle: string;
  usesDescriptionAsOpenGraphDescription: boolean;
  openGraphDescription: string;
  openGraphImage: string;
  isExcludedFromSearch: boolean;
  usesTitleAsSearchTitle: boolean;
  searchTitle: string;
  usesDescriptionAsSearchDescription: boolean;
  searchDescription: string;
  usesOpenGraphImageAsSearchImage: boolean;
  searchImage: string;
}
```

### Parameters

- **metadata**: _PageMetadata_ \- An object containing the page metadata properties:
  - **name**: _string_ \- The name of the page
  - **slug**: _string_ \- The URL-friendly identifier for the page
  - **title**: _string_ \- The page title
  - **description**: _string_ \- The page description
  - **isDraft**: _boolean_ \- Whether the page is in draft status
  - **usesTitleAsOpenGraphTitle**: _boolean_ \- Whether to use the page title as the OpenGraph title
  - **openGraphTitle**: _string_ \- Custom OpenGraph title
  - **usesDescriptionAsOpenGraphDescription**: _boolean_ \- Whether to use the page description as the OpenGraph description
  - **openGraphDescription**: _string_ \- Custom OpenGraph description
  - **openGraphImage**: _string_ \- URL of the OpenGraph image
  - **isExcludedFromSearch**: _boolean_ \- Whether to exclude the page from search results
  - **usesTitleAsSearchTitle**: _boolean_ \- Whether to use the page title as the search title
  - **searchTitle**: _string_ \- Custom search title
  - **usesDescriptionAsSearchDescription**: _boolean_ \- Whether to use the page description as the search description
  - **searchDescription**: _string_ \- Custom search description
  - **usesOpenGraphImageAsSearchImage**: _boolean_ \- Whether to use the OpenGraph image as the search image
  - **searchImage**: _string_ \- Custom search image URL

### Returns

**Promise<`null`>**

A promise that resolves to `null`.

### Example

```
// Update page metadata
page.setMetadata({
  name: "Product Features",
  slug: "product-features",
  title: "Awesome Product Features",
  description: "Discover our product's amazing features",
  isDraft: false,
  usesTitleAsOpenGraphTitle: true,
  openGraphTitle: "",
  usesDescriptionAsOpenGraphDescription: true,
  openGraphDescription: "",
  openGraphImage: "https://example.com/og-image.jpg",
  isExcludedFromSearch: false,
  usesTitleAsSearchTitle: true,
  searchTitle: "",
  usesDescriptionAsSearchDescription: true,
  searchDescription: "",
  usesOpenGraphImageAsSearchImage: true,
  searchImage: ""
});
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| canManagePageSettings | Any | Any | Any | Any |

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