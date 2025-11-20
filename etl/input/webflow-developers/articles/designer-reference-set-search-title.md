---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-search-title
title: "Set search title | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setSearchTitle(title)`

Set the search title of the page.

### Syntax

```
page.setSearchTitle(title: string | null): Promise<null>;
```

### Parameters

- **title**: _`string | null`_ \- The search title of the page.

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Set search engine title and print details
await currentPage.setSearchTitle("My New Title")
const searchTitle = await currentPage.getSearchTitle()
console.log(searchTitle)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |