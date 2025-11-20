---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/dom-element/getTag
title: "Get Tag | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getTag()`

Retrieve the [HTML tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) of the element.

## Syntax

```
element.getTag(): Promise<null | string>
```

## Returns

- **Promise< _String_ >** : If the element has a tag, a promise that resolves to the tag value.
- **Promise<`null`>**: If the element does not have a tag, a promise that resolves to `null`

## Example

```
// Get All Elements and find first DOM Element
const elements = await webflow.getAllElements()
const DOMElement = elements.find(element => element.type === "DOM")

if (DOMElement?.type === "DOM") {

  // Get DOM Element's Tag
  const tag = await DOMElement.getTag()
  console.log(tag)

} else {
  console.log('No DOM Element Found')
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |