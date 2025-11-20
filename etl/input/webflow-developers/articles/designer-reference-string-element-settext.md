---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/string-element/setText
title: "Set Text | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setText(text)`

Sets the text value on a String element, overwriting any prior text value.

## Syntax

```
element.setText(text: string): Promise<null>
```

## Parameters

- text: `string` \- The new text for your `StringElement`

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
// Get all elements and find the first StringElement
const allElements = await webflow.getAllElements();
const foundElement = allElements.find(el => el.type === "String");

if (foundElement) {
    // Check that element has the method in order to use it
    if ('setText' in foundElement) {
        const elementText = foundElement.setText("Hello Element 🚀"); // Set Text
    }
} else {
    console.log('Element not found on page');
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | Canvas | Any |

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