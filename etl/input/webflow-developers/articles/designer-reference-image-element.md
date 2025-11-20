---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/image-element
title: "Image Element | Webflow Developer Documentation"
published: 2025-11-17
---

The Image element represents an [image](https://university.webflow.com/lesson/image?topics=elements) in the Webflow Designer. Create an Image element using the [Image element preset](https://developers.webflow.com/designer/reference/element-presets).

## Methods

You can get and set the asset and alt text of an image element using the following methods:

[Get Asset\\
\\
Retrieve an asset from an Image element.](https://developers.webflow.com/designer/reference/image-element/getAsset) [Set Asset\\
\\
Add an asset to an Image element.](https://developers.webflow.com/designer/reference/image-element/setAsset) [Get Alt Text\\
\\
Retrieve the alt text for an Image element on the canvas.](https://developers.webflow.com/designer/reference/image-element/getAltText) [Set Alt Text\\
\\
Set the Alt Text for an Image element on the canvas.](https://developers.webflow.com/designer/reference/image-element/setAltText)

# Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | Unique identifier for the element composed of two identifiers, the `component`and the `element`. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | Specifies the type of the element. | `string` | ”Image” |
| `children` | Indicates whether the element can contain child elements. | `boolean` | `false` |
| `customAttributes` | Indicates whether the element can have custom attributes. | `boolean` | `true` |
| `styles` | Indicates whether the element can contain styles. | `boolean` | `true` |
| `textContent` | Indicates whether the element can contain text content | `boolean` | `false` |
| `appConnections` | Indicates whether the element supports [App Connections](https://developers.webflow.com/designer/reference/app-intents-and-connections) | `boolean` | `true` |

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