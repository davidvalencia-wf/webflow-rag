---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-page-to-use-title-as-open-graph-title
title: "Set page to use title as Open Graph title | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setUsesTitleAsOpenGraphTitle(value)`

Indicate whether the page should use its title as the Open Graph (OG) title.

### Syntax

```
page.useTitleAsOpenGraphTitle(use: boolean): Promise<null>
```

### Parameters

- **use**: _boolean_ \- Set to `true` to use the page title as the Open Graph title, otherwise set to `false`.

### Returns

**Promise<`null`>**

Returns `null` if successful.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page
// Set page title as open graph title
await currentPage.useTitleAsOpenGraphTitle(true)
const title = await currentPage.getOpenGraphTitle()
console.log(title)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |

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