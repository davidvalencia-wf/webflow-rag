---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/heading-element/getHeadingLevel
title: "Get Heading Level | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getHeadingLevel()`

Retrieves the heading level of a heading element.

## Syntax

```
element.getHeadingLevel(): Promise<null | 1 | 2 | 3 | 4 | 5 | 6>
```

## Returns

**Promise<`level`>**: _Number_ \- 1 \| 2 \| 3 \| 4 \| 5 \| 6

A Promise that resolves to the value of the heading level.

## Example

```
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.type === 'Heading'){

  const headingLevel = await selectedElement.getHeadingLevel()
  console.log(headingLevel)

} else {
  console.log("Selected Element is not a Heading Element")
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |

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