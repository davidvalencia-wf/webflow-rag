---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/creating-retrieving-elements
title: "Creating & Retrieving Elements | Webflow Developer Documentation"
published: 2025-11-17
---

Managing elements is a core aspect of working with the Webflow Designer API. This section covers methods for creating new elements, selecting existing ones, and managing their placement in the element hierarchy.

Your browser doesn’t support HTML video.

## Element selection

Before manipulating elements on the canvas, you typically need to select them. The Designer API provides methods to get references to existing elements:

```
// Get the currently selected element
const selectedElement = await webflow.getSelectedElement();

// Get all elements on the page
const allElements = await webflow.getAllElements();

// Programmatically select an element
await webflow.setSelectedElement(elementToSelect);

// Get element children and select the first child
if (selectedElement?.children) {
  const children = await selectedElement.children;
  await webflow.setSelectedElement(children[0]);
}
```

## Adding elements to the Canvas

When adding elements to your design, you need to consider their placement within the [element hierarchy](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started). The Designer API provides several methods for inserting elements precisely where you need them. Including:

| Method | Description |
| --- | --- |
| [`before()`](https://developers.webflow.com/designer/reference/insert-element-before) | Insert a new element before the target element. |
| [`after()`](https://developers.webflow.com/designer/reference/insert-element-after) | Insert a new element after the target element. |
| [`prepend()`](https://developers.webflow.com/designer/reference/prepend) | Insert a new element as the first child of the target element. |
| [`append()`](https://developers.webflow.com/designer/reference/append) | Insert a new element as the last child of the target element. |
| [`elementBuilder()`](https://developers.webflow.com/designer/reference/bulk-add-elements) | Add multiple elements at once with a hierarchical structure. |

### Element presets

The Designer API uses Element Presets to specify which type of element to create. Each preset corresponds to a unique element type in Webflow. Some [element types include their own properties and methods](https://developers.webflow.com/designer/reference/element-types-methods).

For a complete list of available presets, refer to the [Element Presets](https://developers.webflow.com/designer/reference/element-presets) documentation. These presets can be used with any of the element creation methods shown below.

##### Use custom DOM elements when presets aren't available

Not all element types are supported through presets. If a preset isn’t
available for the element you want to create, you can use the [custom DOM\\
element](https://developers.webflow.com/designer/reference/dom-element) method to create a custom element.

### Inserting elements next to existing elements

To position an element alongside existing elements:

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement) {
  // Insert a div after the selected element
  const newDivAfter = await selectedElement.after(
    webflow.elementPresets.DivBlock
  );

  // Insert a div before the selected element
  const newDivBefore = await selectedElement.before(
    webflow.elementPresets.DivBlock
  );
}
```

##### Parent elements

If the selected element has a parent element, the new element created using
`before()` or `after()` will also be a child element of the same parent.

### Nesting elements within parent elements

To create parent-child relationships by nesting elements:

```
// Get Selected Element
const parentElement = await webflow.getSelectedElement();

// Check if element supports child elements
if (parentElement?.children) {
  // Add element as first child (prepend)
  const firstChild = await parentElement.prepend(
    webflow.elementPresets.DivBlock
  );

  // Add element as last child (append)
  const lastChild = await parentElement.append(
    webflow.elementPresets.Paragraph
  );
}
```

### Bulk adding elements

For more complex structures, you can create multiple elements at once using [element builder](https://developers.webflow.com/designer/reference/bulk-add-elements):

```
// Create an element structure using elementBuilder
const selectedElement = await webflow.getSelectedElement();

// Create a section element as the root
const section = webflow.elementBuilder(webflow.elementPresets.DOM);
section.setTag("section");

// Add a container child element
const container = section.append(webflow.elementPresets.DOM);
container.setTag("div");
container.setAttribute("class", "container");

// Add heading and paragraph to the container
const heading = container.append(webflow.elementPresets.DOM);
heading.setTag("h2");

const paragraph = container.append(webflow.elementPresets.DOM);
paragraph.setTag("p");

// Add the entire structure to the canvas in one operation
if (selectedElement?.children) {
  await selectedElement.append(section);

  // After adding to canvas, find elements and set text content
  const elements = await webflow.getAllElements();

  // Find the heading and paragraph elements by their IDs
  const headingEl = elements.find((el) => el.id.element === heading.id);
  const paragraphEl = elements.find((el) => el.id.element === paragraph.id);

  // Set text content on the elements
  if (headingEl) await headingEl.setTextContent("Hello World");
  if (paragraphEl)
    await paragraphEl.setTextContent("Created with element builder");
}
```

## Removing elements

To remove an element from the canvas:

```
// Get Selected Element
const elementToRemove = await webflow.getSelectedElement();

if (elementToRemove) {
  // Remove the element
  await elementToRemove.remove();
}
```

## Methods

The Elements API offers the following methods for element creation and manipulation:

[Get selected element\\
\\
Retrieve the currently selected element in the Designer.](https://developers.webflow.com/designer/reference/get-selected-element) [Set selected element\\
\\
Programmatically select an element in the Designer.](https://developers.webflow.com/designer/reference/set-selected-element) [Get all elements\\
\\
Retrieve all elements on the current page.](https://developers.webflow.com/designer/reference/get-all-elements) [Insert element before\\
\\
Insert a new element before the target element.](https://developers.webflow.com/designer/reference/insert-element-before) [Insert element after\\
\\
Insert a new element after the target element.](https://developers.webflow.com/designer/reference/insert-element-after) [Prepend\\
\\
Insert a new element as the first child of the target element.](https://developers.webflow.com/designer/reference/prepend) [Append\\
\\
Insert a new element as the last child of the target element.](https://developers.webflow.com/designer/reference/append) [Bulk add elements\\
\\
Add multiple elements at once with a hierarchical structure.](https://developers.webflow.com/designer/reference/bulk-add-elements) [Remove element\\
\\
Remove an element from the canvas.](https://developers.webflow.com/designer/reference/remove-element)

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