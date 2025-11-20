---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/check-description-is-used-as-search-description
title: "Check if page description is used as search description | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.usesDescriptionAsSearchDescription()`

Check if the page description is used as the search description.

### Syntax

```
page.usesDescriptionAsSearchDescription(): Promise<boolean>;
```

### Returns

**Promise<`boolean`>**

A Promise that resolves to a `boolean` value.

### Example

```
// Get current page
const currentPage = await webflow.getCurrentPage()

// Check search engine description
const isSearchDescription = await currentPage?.usesDescriptionAsSearchDescription()

if(isSearchDescription){
  console.log("This page uses its description as the search engine description")
} else {
  console.log("This page has a custom search engine description")
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |

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