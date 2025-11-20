---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/image-element/getAsset
title: "Get Asset | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getAsset()`

Retrieve an asset from an Image element.

## Syntax

```
element.getAsset(): Promise<Asset | null>
```

## Returns

**Promise< _Asset_ >** \| `null`

A Promise that resolves to an Asset. If an element doesn’t have an asset, the method will return `null`

## Example

```
// Get Selected Element
const el = await webflow.getSelectedElement()

// Check if element can have children
if (el?.children) {
  // Create a new Image Element using Element Presets
  const imgEl = await el.append(webflow.elementPresets.Image)

  // Check element type
  if (imgEl.type === 'Image') {
    // Get asset from Image element
    const myAsset = await imgEl.getAsset()
    console.log(myAsset)
    }
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| canAccessAssets | any | any | any | any |

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