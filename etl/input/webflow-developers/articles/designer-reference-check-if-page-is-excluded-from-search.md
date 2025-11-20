---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/check-if-page-is-excluded-from-search
title: "Check if page is excluded from search | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.isExcludedFromSearch()`

Check if the page is excluded from [internal site search.](https://help.webflow.com/hc/en-us/articles/33961242348179-Site-search)

### Syntax

```
page.isExcludedFromSearch(): Promise<boolean>;
```

### Returns

**Promise<`boolean`>**

A Promise that resolves to a `boolean` value.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage()

// Check if page is excluded from webflow's internal site search
const isExcluded = await currentPage?.isExcludedFromSearch()

if (isExcluded){
  console.log("Current page is excluded from Webflow's internal site search")
} else {
  "Current page is included in included in Webflow's internal site search"
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