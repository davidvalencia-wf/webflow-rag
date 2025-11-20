---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-current-page
title: "Get the current page | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getCurrentPage()`

Retrieves the current page open in the Designer.

### Syntax

```
webflow.getCurrentPage(): Promise<Page>
```

### Returns

**Promise< _Page_ >**

A Promise that resolves to the current page.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage()
const pageName = await currentPage?.getName()

// Print page details
console.log(currentPage, pageName)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |