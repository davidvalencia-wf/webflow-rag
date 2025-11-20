---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element/getAllAttributes
title: "Get All Attributes | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getAllAttributes()`

Retrieve all [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) for the DOMElement. Use this method instead of the ‘Custom Attribute’ methods.

## Syntax

```
element.getAllAttributes(): Promise<Array<NamedValue>>
```

## Returns

**Promise<Array< _NamedValue_ >>** \- `[{name: string, value:string }]`

A promise that resolves to an array of, `NamedValue` attribute objects.

## Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.type === "DOM") {

  const customAttributes = await selectedElement.getAllAttributes()
  console.log(customAttributes)
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |