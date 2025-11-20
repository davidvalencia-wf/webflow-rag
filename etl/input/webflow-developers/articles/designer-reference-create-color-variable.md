---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-color-variable
title: "Create color variable | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.createColorVariable(name, value)`

Create a color variable with a name and value for the variable.

Once created, you can set color variables for: Text colors, Background colors, Border and text stroke colors, and Gradient color stops

### Syntax

```
collection.createColorVariable(
  name: string,
  value: string | ColorVariable | CustomValue,
  options?: {
    mode?: VariableMode
  }
): Promise<ColorVariable>
```

### Parameters

- **name** : _string_ \- Name of the variable
- **value**: _string_ \| _ColorVariable_ \| [_CustomValue_](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values) \- Value of the variable. Value can be a string in one of four formats:
  - Color Name
  - Color RGB hex value
  - Color RGBA hex value
  - [Custom value](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values)
- **options**: _object_ \- Optional parameters for the variable.
  - **mode**: _VariableMode_ \- The [variable mode](https://developers.webflow.com/designer/reference/variable-modes) object. Get the variable mode by using the [`collection.getVariableModeByName()`](https://developers.webflow.com/designer/reference/get-variable-mode-by-name) method.

### Returns

**Promise< _ColorVariable_ >**

A Promise that resolves to a ColorVariable object.

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Color Variable with a HEX Codre
const myColorVariable = await collection?.createColorVariable("primary", "#ffcc11")
console.log(myColorVariable)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canModifyVariables** | Any | Main | Canvas | Design |

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