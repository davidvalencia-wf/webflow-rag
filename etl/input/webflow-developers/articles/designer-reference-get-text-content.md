---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-text-content
title: "Get Text Content | Webflow Developer Documentation"
published: 2025-11-17
---

The text content of an element is automatically created as a child `StringElement` of that element. To retrieve the text content from an element, you’ll need to retrieve the child `StringElement` of your target element. Once you’ve retrieved the `StringElement` you can use the [`getText()`](https://developers.webflow.com/designer/reference/string-element/getText) method to get the text content of your element.

## Example

```
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement();

if (selectedElement?.textContent && selectedElement?.children) {

  // Get Child Elements
  const children = await selectedElement.getChildren();

  // Filter string elements from children
  const strings = children.filter(child => child.type === "String");

  // Initialize an array to hold text content
  let textContent = [];

  // Loop over string elements to get text
  for (const myString of strings) {
    if (myString.type === "String") {
      const text = await myString.getText();
      textContent.push(text);
    }
  }

  // Print text
  console.log(textContent);
}
```