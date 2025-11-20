---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/bulk-add-elements
title: "Bulk Add Elements | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.elementBuilder(preset)`

Construct complex element structures before adding them to a page. This method is optimized for bulk creation of elements, and is particularly useful when working with SVG graphics or nested element groups like a navigation menu. This approach is more efficient than creating and adding elements one at a time, especially for complex designs.

##### Current Limitations

Currently, only DOM elements can be created with the element builder.

### Syntax

```
webflow.elementBuilder(elementPreset: webflow.elementPresets.DOM): BuilderElement
```

### Parameters

- **preset**: The DOM element preset from the Webflow presets. Currently, only DOM elements are supported.

### Returns

**BuilderElement**

A builder element object designed for creating and manipulating hierarchical structures. This object has these methods:

- `append()`: Add a child element to this builder element
- `setTag()`: Set the HTML tag for this DOM element
- `setAttribute()`: Set an attribute on this DOM element
- `setTextContent()`: Set the text within this DOM element
- `setStyles()`: Set styles on this DOM element

## How to use the element builder

[1](https://developers.webflow.com/designer/reference/bulk-add-elements#step)

**Get the parent element**

Use `webflow.getSelectedElement()` to select the parent element. This is where your new structure will be added.

[2](https://developers.webflow.com/designer/reference/bulk-add-elements#step-1)

**Create a builder element**

Use `webflow.elementBuilder(webflow.elementPresets.DOM)` to create a builder element.

[3](https://developers.webflow.com/designer/reference/bulk-add-elements#step-2)

**Configure the builder element**

Use the builder element to configure the tags, attributes, and styles of the new structure.

[4](https://developers.webflow.com/designer/reference/bulk-add-elements#step-3)

**Add child elements**

Use `append()` to add child elements to the builder element. Configure them with tags, attributes, and styles.

[5](https://developers.webflow.com/designer/reference/bulk-add-elements#step-4)

**Add the complete structure to your page**

Use `append()` on the parent element to add the complete structure to your page.

### Examples

###### Create a navigation menu

###### SVG with multiple paths

This example shows how to use element builder to create a navigation menu:

```
async function createNavMenu() {
  // Start by creating some styles that will be applied to the nav container.
  const navStyle = await webflow.createStyle('navContainer');
  await navStyle.setProperties({
    'display': 'flex',
    'row-gap': '20px',
    'padding-left': '15px',
    'padding-right': '15px',
    'padding-top': '15px',
    'padding-bottom': '15px',
    'background-color': '#f5f5f5',
    'border-radius': '8px'
  });

  const navItemStyle = await webflow.createStyle('navItem');
  await navItemStyle.setProperties({
    'color': '#333',
    'text-decoration': 'none',
    'padding-left': '12px',
    'padding-right': '12px',
    'padding-top': '8px',
    'padding-bottom': '8px',
    'border-radius': '4px',
    'font-weight': '500'
  });

  // Get the selected element as the container
  const selectedElement = await webflow.getSelectedElement();

  // Create a nav container
  const navMenu = webflow.elementBuilder(webflow.elementPresets.DOM);
  navMenu.setTag('nav');
  navMenu.setStyles([navStyle]);

  // Menu items to add
  const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  // Create all menu items at once and store references for later
  const menuItemRefs = [];
  menuItems.forEach(itemText => {
    const item = navMenu.append(webflow.elementPresets.DOM);
    item.setTag('a');
    item.setAttribute('href', '#');
    item.setTextContent(itemText);
    item.setStyles([navItemStyle]);
    // Store reference to set text later
    menuItemRefs.push(item);
  });

  // Add the entire menu to the canvas in one operation
  if (selectedElement?.children) {
    await selectedElement.append(navMenu);
    console.log('Navigation structure with 5 items created in one operation');
  }
}
```

## When to use element builder

The element builder is particularly useful for:

- **Complex Element Structures**: When creating hierarchies with many nested elements
- **SVG Creation**: Perfect for building SVG graphics with many path, circle, or other elements
- **Repeating Patterns**: When you need to create many similar elements
- **Performance**: More efficient than adding elements one-by-one to the canvas

## Best practices

- **Build Complete Structures**: Create your entire element structure before adding it to the canvas
- **Set Properties**: Configure tags, attributes, styles, and text content on builder elements before appending
- **Track References**: If you need to modify elements after adding to canvas, store references to them
- **Batch Operations**: Use `Promise.all` for batch operations when modifying multiple elements

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