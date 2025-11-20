---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/link-element/getTarget
title: "Get Link Target | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getTarget()`

Get the target value of the link block element. Links can target URLs emails, and phone numbers, as well as pages within a site, elements on a page, and attachments.

## Syntax

```
element.getTarget(): Promise<null | string | Page | AnyElement | Asset>;
```

## Returns

**Promise< _null \| string \| Page \| AnyElement \| Asset_ >**

A Promise that resolves to the target value of the link. The target value can be a string, Page, Element, or an Asset object.

## Example

```
const elements = await webflow.getAllElements(); // Get All Elements
const links = elements.filter((element) => element.type === "Link"); // Filter for Link elements

// Print target value of each link element
for (const link of links) {
  const targetValue = await link.getTarget();
  console.log(`ID: ${link.id.element}, Target Value: ${targetValue}`);
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | any | any | any | any |

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