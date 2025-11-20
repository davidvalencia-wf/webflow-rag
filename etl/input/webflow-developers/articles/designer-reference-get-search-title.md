---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-search-title
title: "Get search title | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getSearchTitle()`

Get the search title of the page.

### Syntax

```
page.getSearchTitle(): Promise<string>;
```

### Returns

**Promise<`string`>**

A Promise that resolves to a `string` value.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Get Search engine title and print details
const searchEngineTitle = currentPage.getSearchTitle()
console.log(searchEngineTitle)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |