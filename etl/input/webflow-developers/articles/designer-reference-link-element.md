---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/link-element
title: "Link Element | Webflow Developer Documentation"
published: 2025-11-17
---

The Link element represents a [Link Block](https://university.webflow.com/lesson/link-block?topics=elements) in the Webflow Designer. Create a link element using any of the listed presets.

## Supported presets

The following presets create link elements.

- [LinkBlock](https://developers.webflow.com/designer/reference/element-presets)
- [TextLink](https://developers.webflow.com/designer/reference/element-presets)
- [Button](https://developers.webflow.com/designer/reference/element-presets)
- [LinkBlock](https://developers.webflow.com/designer/reference/element-presets)

## Methods

You can get and set the target value of a link element using the following methods.

[Get Link Target\\
\\
Get the target value of the link block element.](https://developers.webflow.com/designer/reference/link-element/getTarget) [Set Link Settings\\
\\
Apply settings for a Link Block element.](https://developers.webflow.com/designer/reference/link-element/setSettings)

# Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | Unique identifier for the element composed of two identifiers, the `component`and the `element`. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | Specifies the type of the element. | `string` | ”Link” |
| `children` | Indicates whether the element can contain child elements. | `boolean` | `false` |
| `customAttributes` | Indicates whether the element can have custom attributes. | `boolean` | `true` |
| `styles` | Indicates whether the element can contain styles. | `boolean` | `true` |
| `textContent` | Indicates whether the element can contain text content | `boolean` | `false` |

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