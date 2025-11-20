---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/components-overview
title: "Components | Webflow Developer Documentation"
published: 2025-11-17
---

[Webflow Components](https://university.webflow.com/lesson/components?topics=layout-design) are customizable blocks created from [Elements](https://developers.webflow.com/designer/reference/elements-overview). They serve as the foundation for structuring visual hierarchies on a Webflow site, ensuring that designs are modular, reusable, and consistent.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/41019fc-Devimage_Components_650px_2.png)

A Card Component

## Key concepts

###### Component definition

Also known as the component object, the **component definition** is the blueprint for a component. It defines the structure of elements within the component, as well as properties that can be used to customize the component instance. Any modifications made to the component definition will propagate to all associated component instances. This ensures consistency across instances while allowing for centralized changes.

###### Component instance

A **component instance** is a “carbon-copy” of the component definition. While it retains the core design and structure of the definition, each instance can be [customized through unique properties.](https://university.webflow.com/lesson/components?topics=layout-design#how-to-define-component-properties) This allows designers and users to assign custom values to a component instance’s properties, tailoring its appearance and behavior, without modifying the underlying component definition.

###### Component properties

**Component properties** are pre-defined attributes within a Component Definition that can be assigned a specific value in the Component Instance. They allow designers or users to modify specific aspects of an Instance - text, images, links, and more - without affecting its foundational design.

##### Component properties are not yet supported

Currently, our APIs don’t support the creation and management of Component Properties.

We understand the importance of this feature for our users, and we’re excited to share that it’s on our development roadmap. We’re committed to enhancing our API capabilities and will provide updates as we make progress. Thank you for your patience and understanding!

## Methods

### Create a component definition

To [create a component definition](https://developers.webflow.com/designer/reference/create-component-definition) you’ll need a root element - or top-level element - that has child elements within its element hierarchy.

After identifying the root element, you can use [`webflow.registerComponent(rootElement)`](https://developers.webflow.com/designer/reference/create-component-definition) to register the component definition. In the above card component example, the root element would be the container DIV element, which has the `img`, `div`, and `button` as child elements.

```
// Get selected element
const rootElement = await webflow.getSelectedElement();

if (rootElement) {

  // Create a component from the Root Element
  const component = await webflow.registerComponent('Card Component', rootElement);
  console.log(`Component registered with ID: ${component.id}`);

} else {
  console.log("No element is currently selected. Please select a root element first.");
}
```

### Edit a component definition

To make changes to a component definition, its component instance must be present on the page. You’ll then need to get the Component Instance, and use the `enterComponent` method to focus Webflow on the component definition. Once the component definition is in focused, you can get the root element of the component, and then insert / remove child elements from the root element.

```
enterComponent: async () => {
  // Step 1: Fetch the currently selected element
  const selectedElement = await webflow.getSelectedElement()

  if (selectedElement && selectedElement.type === 'ComponentInstance') {
    //  Step 2: Enter the context of the selected ComponentElement
    await webflow.enterComponent(selectedElement as ComponentElement)
    console.log('Successfully entered the component context.')

    // Step 3: After entering the component's context, fetch the root element
    const rootElement = await webflow.getRootElement()
    if (rootElement) {
      // Check if element supports child elements
      if (rootElement?.children) {
        // Append newElement as a child to of the selected element
        const newElement = await rootElement?.append(webflow.elementPresets.DivBlock)
        console.log('Added new child element:', newElement)
      } else {
        console.log('Root element does not support child elements')
      }
    } else {
      console.log('No root element found in this component context.')
    }
  } else {
    console.log('The selected element is not a ComponentElement.')
  }
}
```

### Add a component instance to a page

Use `webflow.createInstance(componentDefinition)` to [add a component instance](https://developers.webflow.com/designer/reference/create-component-instance) to the page. Component instances can be nested as part of element hierarchies, including under other component instances.

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