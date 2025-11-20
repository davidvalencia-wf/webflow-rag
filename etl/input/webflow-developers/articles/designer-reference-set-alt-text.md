---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-alt-text
title: "Set Alt Text | Webflow Developer Documentation"
published: 2025-11-17
---

## `asset.setAltText(altText, localeId?)`

This method sets the Alt Text for a specific Asset.

### Syntax

```
asset.setAltText(altText: string | null; localeId?: string): Promise<null>
```

### Parameters

- **`altText`**: _string_ \- The alt text for the Asset. If null is passed as this parameter, Webflow will set the asset alt text to “decorative.”
- **`localeId`** _string_ (optional) - The Locale ID for the Alt Text.

### Returns

**Promise< _null_ >**

A Promise that resolves to `null`.

### Example

```
// Get Asset by ID
const asset = await webflow.getAssetById(assetId)
console.log(asset)

if (asset) {
  // Get asset URL
  const originalAltText = await asset.getAltText()
  await asset.setAltText(altText)
  const newAltText = await asset.getAltText()
  console.log(`Original Asset Alt Text: ${originalAltText}`)
  console.log(`New Asset Alt Text: ${newAltText}`)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManageAssets** | any | any | any | any |

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