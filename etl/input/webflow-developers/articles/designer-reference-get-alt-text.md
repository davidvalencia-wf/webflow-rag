---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-alt-text
title: "Get Alt Text | Webflow Developer Documentation"
published: 2025-11-17
---

## `asset.getAltText()`

This method retrieves the Alt Text for a specific Asset.

### Syntax

```
asset.getAltText(): Promise<string>
```

### Returns

**Promise< _string_ >**

A Promise that resolves to the Alt Text string.

### Example

```
// Get Asset by ID
const asset = await webflow.getAssetById(asset_id)
console.log(asset)

if (asset) {
  // Get asset URL
  const altText = await asset.getAltText()
  console.log(`Asset Alt Text: ${altText}`)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessAssets** | any | any | any | any |