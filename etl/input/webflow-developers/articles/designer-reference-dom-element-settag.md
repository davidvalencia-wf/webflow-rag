---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element/setTag
title: "Set Tag | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setTag(tag)`

Set the value of the specified [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) of the DOMElement.

## Syntax

```
element.setTag(tag: string): Promise<null>
```

## Parameters

- tag : `string` \- The [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) to set for the element

## Returns

**Promise<`null`>**

A promise that resolves to `null`

## Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.children) {

  // Create and append DOM Element
  const DOMElement = await selectedElement.append(webflow.elementPresets.DOM);
  console.log(DOMElement)

  // Set Tag
  await DOMElement?.setTag('img');
  const tag = await DOMElement.getTag()
  }
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDesign** | Primary | Main | Canvas | Design |