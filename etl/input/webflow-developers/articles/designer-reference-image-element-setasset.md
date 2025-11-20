---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/image-element/setAsset
title: "Set Asset | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setAsset(asset)`

Add an asset to an Image element.

## Syntax

```
element.setAsset(asset: Asset | null): Promise<null>
```

## Parameters

- **Asset**: _Asset_ \- The asset to be inserted into the Image Element. Can be retrieved with the method `webflow.getAssetById`

## Returns

**Promise<`null`>**

A Promise that resolves to `null`

## Example

```
// Get Selected Element
const el = await webflow.getSelectedElement()

// Check if element can have children
if (el?.children) {
  // Create a new Image Element using Element Presets
  const imgEl = await el.append(webflow.elementPresets.Image)

  // Get asset by ID
  const asset = await webflow.getAssetById(assetId)

  // Check element type
  if (imgEl.type === 'Image') {
    // Set asset as the "src" of the Image Element
    await imgEl.setAsset(asset)
  }
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| canModifyImageElement | any | main | canvas | any |

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