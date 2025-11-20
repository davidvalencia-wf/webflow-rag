---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-pages-and-folders
title: "Get all pages and folders | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getAllPagesAndFolders()`

Retrieves all pages and folders in the current site.

### Syntax

```
webflow.getAllPagesAndFolders(): Promise<Array<Page | Folder>>
```

### Returns

**Promise<Array< _Folder_ \| _Page_ >>**

A Promise that resolves to an array of page and/or folder objects.

### Example

```
// Get all pages and folders
const pagesAndFolders = await webflow.getAllPagesAndFolders()

// Print Page Details
const pages = pagesAndFolders?.filter(i => i.type === "Page")
await Promise.all(pages.map(async page => {

  const pageName = await page.getName()
  console.log(`Page: ${pageName}`)

}))

const folders = pagesAndFolders?.filter(i => i.type === "PageFolder")
await Promise.all(folders.map(async folder => {

  const folderName = await folder.getName()
  console.log(`Folder: ${folderName}`)

}))
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |