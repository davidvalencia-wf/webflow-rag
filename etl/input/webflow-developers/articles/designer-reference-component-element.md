---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/component-element
title: "Component Instances | Webflow Developer Documentation"
published: 2025-11-17
---

The component element represents a [component instance](https://developers.webflow.com/designer/reference/components-overview#component-instance) within the Webflow Designer.

## Methods

You can get the associated component definition of a component instance using the following method:

[Get Component\\
\\
Retrieves the associated component definition of the component instance.](https://developers.webflow.com/designer/reference/component-element/getComponent)

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg)](https://developers.webflow.com/designer/reference/components-overview)

[Creating & managing components](https://developers.webflow.com/designer/reference/components-overview)

[Learn more about creating and managing component definitions in the](https://developers.webflow.com/designer/reference/components-overview) [Components Overview](https://developers.webflow.com/designer/reference/components-overview).

## Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | Unique identifier for the element composed of two identifiers, the `component`and the `element`. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | Specifies the type of the element. | `string` | ”ComponentInstance” |
| `children` | Indicates whether the element can contain child elements. | `boolean` | `false` |
| `customAttributes` | Indicates whether the element can have custom attributes. | `boolean` | `false` |
| `styles` | Indicates whether the element can contain styles. | `boolean` | `false` |
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