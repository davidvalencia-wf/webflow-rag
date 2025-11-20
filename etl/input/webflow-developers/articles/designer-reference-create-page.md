---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-page
title: "Create page | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.createPage()`

Create a new page in the Designer. This method will return an error if the App tries to create more pages than a User’s plan allows.

### Syntax

```
webflow.createPage(): Promise<Page>
```

### Returns

**Promise< _Page_ >**

A Promise that resolves to the created page.

### Example

```
// Create new page and set page name
const newPage = await webflow.createPage() as Page
await newPage.setName('My New Page')

// Switch to new page
await webflow.switchPage(newPage)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canCreatePage** | Any | Any | Any | Design |

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