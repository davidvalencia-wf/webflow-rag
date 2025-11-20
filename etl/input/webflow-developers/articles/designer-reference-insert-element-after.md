---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/insert-element-after
title: "Insert element after target element | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.after(newElement)`

Insert a new element onto the page after the target element.

### Syntax

```
element.after(newElement: ElementPreset | Component): Promise<<AnyElement>
```

### Parameters

- **`newElemen`t**: _webflow.elementPresets.<preset>_ \- The new element to be inserted into the hierarchy. This element is derived from the `webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

### Returns

**Promise< _AnyElement_ >**

A Promise that resolves to an `AnyElement` object.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in the [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

### Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement) {
  // Insert DIV after selected Element
  const newDiv = await selectedElement.after(webflow.elementPresets.DivBlock);

  // Print element details
  console.log(`${JSON.stringify(newDiv)}`);
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDesign** | Primary | Main | Canvas | Design |

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