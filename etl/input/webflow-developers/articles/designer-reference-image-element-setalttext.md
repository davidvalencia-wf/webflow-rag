---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/image-element/setAltText
title: "Set Alt Text | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setAltText(altText)`

Set the Alt Text for an Image element on the canvas.

## Syntax

```
element.setAltText(altText: string | null): Promise<null>
```

## Parameters

- **alt text**: _string_ \- The alternate text for an image

## Returns

**Promise<`null`>**

A Promise that resolves to `null`

## Example

```
// Get Selected Element
const el = await webflow.getSelectedElement()

// Check element type
if (el?.type === 'Image') {
  // Set alt text
  await el.setAltText('Descriptive alternative text for this image')

  // Verify by getting the alt text
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