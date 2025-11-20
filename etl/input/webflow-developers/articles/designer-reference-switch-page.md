---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/switch-page
title: "Switch to a page | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.switchPage(page)`

Switch the Designer to a specified page.

### Syntax

```
webflow.switchPage(page: Page): Promise<null>
```

### Parameters

**`page`** : _Page_ \- The page to switch to.

### Returns

**Promise<`null`>**

A Promise that resolves to `null` when the page switch is complete.

### Example

```
// Get All Pages and Folders
const pagesAndFolders = await webflow.getAllPagesAndFolders()
const pages = pagesAndFolders?.filter((i): i is Page => i.type === "Page")

// Switch Page
const newPage = pages[2]
await webflow.switchPage(newPage)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | An |

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