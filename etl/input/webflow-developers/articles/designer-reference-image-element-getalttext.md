---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/image-element/getAltText
title: "Get Alt Text | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getAltText()`

Retrieve the alt text for an Image element on the canvas. If the Image element doesn’t have alt text, the API will retrieve the alt text from the associated Asset.

## Syntax

```
element.getAltText(): Promise<string>
```

## Returns

**Promise< _String_ >**

A Promise that resolves to the string of alt text.

## Example

```
// Get Selected Element
const el = await webflow.getSelectedElement()
if (el?.type === 'Image') {
  // Get alt text
  const alt = await el.getAltText()
  console.log(alt)
} else {
  console.error('Please select an image element')
  await webflow.notify({
    type: 'Error',
    message: 'Please select an Image Element',
  })
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