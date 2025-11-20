---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element/setAttribute
title: "Set Attribute | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setAttribute(name, value)`

Set the value of the specified [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) of the DOMElement. Use this method instead of the ‘Custom Attribute’ methods.

## Syntax

```
element.setAttribute(name: string, value: string): Promise<null>
```

## Parameters

- name : `string` \- The name of the attribute to set
- value : `string` \- The value of the attribute to set

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

  if (DOMElement?.type === "DOM") {
    // Set Tag
    await DOMElement.setTag('img');

    // Set HTML Attribute
    await DOMElement.setAttribute('src', 'https://example.com/image.jpg');
    await DOMElement.setAttribute('alt', 'Example image');
    await DOMElement.setAttribute('width', '300');

    // Get all attributes to verify
    const attributes = await DOMElement.getAllAttributes();
    console.log(attributes);
  }
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDesign** | Primary | Main | Canvas | Design |