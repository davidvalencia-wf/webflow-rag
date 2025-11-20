---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-folder-name
title: "Get folder name | Webflow Developer Documentation"
published: 2025-11-17
---

## `folder.getName()`

Retrieve the name of the folder.

### Syntax

```
folder.getName(): Promise<string>
```

### Returns

**Promise< _String_ >**

A Promise that resolves to a `string` value of the folder name.

### Example

```
// Get all Pages and folders
const pagesAndFolders = await webflow.getAllPagesAndFolders()

for (let folder of pagesAndFolders) {

  const folderName = await folder.getName()
  const type = folder.type
  console.log(folderName, type)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |