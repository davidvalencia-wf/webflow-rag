---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-text-content
title: "Set Text Content | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setTextContent(content)`

Set text content for an element that supports text content.

## Syntax

```
element.setTextContent(content: string): Promise<null>>
```

## Parameters

- **`content`**: `string` \- Text to add to the element

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.textContent) {

  // Set and print text content
  const text = await selectedElement.setTextContent("Lorem Ipsum")
  console.log(selectedElement.textContent)

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