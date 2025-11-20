---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element
title: "DOM Element | Webflow Developer Documentation"
published: 2025-11-17
---

The [custom element](https://university.webflow.com/lesson/custom-element?topics=elements), also known as the DOM Element, is a placeholder element that you can add any HTML custom attribute, tag, or text to — thereby “creating” that element on the canvas. This is useful for adding HTML elements to the canvas that aren’t available as native Webflow elements.

Once you add the custom element to the canvas, you’re able to use the below methods, which are only available to the DOM element, as well as the more general element methods to manage children, styles, and text content.

## Methods

The DOM Element supports the following specific methods:

[Get HTML Tag\\
\\
Retrieve the HTML tag of the element.](https://developers.webflow.com/designer/reference/dom-element/getTag) [Set HTML Tag\\
\\
Set the value of the specified HTML tag of the DOMElement.](https://developers.webflow.com/designer/reference/dom-element/setTag) [Get All Attributes\\
\\
Retrieve all HTML attributes for the DOMElement.](https://developers.webflow.com/designer/reference/dom-element/getAllAttributes) [Get Attribute\\
\\
Retrieve the value of the named HTML attribute of the DOMElement.](https://developers.webflow.com/designer/reference/dom-element/getAttribute) [Set Attribute\\
\\
Set the value of the specified HTML attribute of the DOMElement.](https://developers.webflow.com/designer/reference/dom-element/setAttribute) [Remove Attribute\\
\\
Remove the specified HTML attribute from the DOMElement.](https://developers.webflow.com/designer/reference/dom-element/removeAttribute)

## Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | Unique identifier for the element composed of two identifiers, the `component`and the `element`. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | Specifies the type of the element. | `string` | ”DOM” |
| `styles` | Indicates whether the element can contain styles. | `boolean` | `true` |
| `children` | Indicates whether an element can contain child elements. | `boolean` | `true` |
| `textContent` | Indicates whether an element can contain text content. | `boolean` | `true` |
| `customAttributes` | Indicates whether an element can contain custom attributes. | `boolean` | `false` |

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