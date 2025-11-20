---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-assets
title: "Get All Assets | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getAllAssets()`

Retrieve all assets on a site.

### Syntax

```
webflow.getAllAssets(): Promise<Asset[]>
```

### Returns

**Promise< _Asset\[\]_ >**

A Promise that resolves to an array of Assets.

### Example

```
// Get all assets
const assets = await webflow.getAllAssets()

// Loop to list assets in the console
for (const asset of assets) {
  const name = await asset.getName()
  const mimeType = await asset.getMimeType()
  console.log(name, mimeType)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessAssets** | any | any | any | any |