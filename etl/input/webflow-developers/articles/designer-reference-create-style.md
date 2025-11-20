---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-style
title: "Create style | Webflow Developer Documentation"
published: 2025-11-17
---

## **`webflow.createStyle(name, options?)`**

Create a new style with a provided name. Provide a parent style to create a [combo class](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes#how-to-create-a-combo-class).

### Syntax

```
webflow.createStyle(
  name: string,
  options?: {
    parent?: Style
  }
): Promise<Style>
```

### Parameters

- **`name`**: _String_ \- The name of the style.
- **`options`**: _Object_ \- An object containing the following properties:
  - **`parent`**: _Style_ \- A style object that will be the parent of the combo class style.

### Returns

**Promise< _Style_ >**

A Promise that resolves to a Style object.

### Example

```
// Create new style
const newStyle = await webflow.createStyle(styleName);

// Set properties for the style
newStyle.setProperties({
  "background-color": "blue",
  "font-size": "16px",
  "font-weight": "bold",
});

// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Apply style to selected element
  await selectedElement.setStyles([newStyle])

} else {
  console.log("No element selected")
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

| Designer ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canCreateStyleBlocks** | Primary | Any | Canvas | Design |

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