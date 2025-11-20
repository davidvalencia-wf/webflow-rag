---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-folder-slug
title: "Get folder slug | Webflow Developer Documentation"
published: 2025-11-17
---

## `folder.getSlug()`

Get the folder’s slug.

### Syntax

```
folder.getSlug(): Promise<string>
```

### Returns

**Promise<`string`>**

A Promise that resolves to a `string` value of the folder slug.

### Example

```
// Get all Pages and folders
const pagesAndFolders = await webflow.getAllPagesAndFolders()

for (let folder of pagesAndFolders) {

  const folderSlug = await folder.getSlug()
  console.log("Slug", folderSlug)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |

[![Logo](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/logo.svg)![Logo](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/logo.svg)](https://developers.webflow.com/)

Designer API

Designer API

Control the Webflow Designer

Designer API

Designer API

Control the Webflow Designer

[Log in](https://webflow.com/dashboard/login) [Submit an app](https://developers.webflow.com/submit) [Get started](https://webflow.com/dashboard/signup)