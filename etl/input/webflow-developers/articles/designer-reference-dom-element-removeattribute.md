---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element/removeAttribute
title: "Remove Attribute | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.removeAttribute(name)`

Remove the specified [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) from the DOMElement. Use this method instead of the ‘Custom Attribute’ methods.

## Syntax

```
element.removeAttribute(name: string): Promise<null>
```

## Parameters

- name : `string` \- The name of the attribute to remove

## Returns

**Promise<`null`>**

A promise that resolves to `null`

## Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.type === "DOM") {
  // Get current attributes
  const beforeAttributes = await selectedElement.getAllAttributes();
  console.log('Before removal:', beforeAttributes);

  // Remove an attribute
  await selectedElement.removeAttribute('width');

  // Get attributes after removal to verify
  const afterAttributes = await selectedElement.getAllAttributes();
  console.log('After removal:', afterAttributes);
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDesign** | Primary | Main | Canvas | Design |

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