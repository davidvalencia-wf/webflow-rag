---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-size-variable
title: "Create size variable | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.createSizeVariable(name, value)`

Create a Size variable with a name for the variable, and size value.

Once created, you can set size variables for:

| Area | Properties |
| --- | --- |
| Margin and padding | Top, bottom, left, right |
| Position | Top, bottom, left, right |
| Column and row gaps | Display settings, Quick Stack |
| Dimensions | Height, width (including min and max) |
| Grid | Column and row sizes |
| Typography | Font size, line height, letter spacing |
| Border | Radius, width |
| Filter and backdrop filter | Blur radius |

### Syntax

```
collection.createSizeVariable(
  name: string,
  value: SizeValue | SizeVariable | CustomValue,
  options?: {
    mode?: VariableMode
  }
): Promise<SizeVariable>
```

### Parameters

- **name** : _string_ \- Name of the variable

- **value**:
  - _SizeValue_ \- Object with the unit and value of the size. `{unit: SizeUnit, value: number}`
    - **SizeUnit** See the accordion below for the list of supported units.

      ###### Size Units

      #### Absolute Units

      | Unit | Name | Description | Example Usage |
      | --- | --- | --- | --- |
      | `px` | Pixels | Absolute unit, 1px equals one pixel on the screen | `font-size: 16px;` |

      #### Relative Units

      | Unit | Name | Description | Example Usage |
      | --- | --- | --- | --- |
      | `em` | Element-relative Em | Relative to parent element’s font size (2em = 2× parent font) | `padding: 1.5em;` |
      | `rem` | Root Em | Relative to root element’s font size | `margin: 2rem;` |
      | `ch` | Character Units | Relative to width of ‘0’ (zero) character | `width: 20ch;` |

      #### Viewport-based Units

      | Unit | Name | Description | Example Usage |
      | --- | --- | --- | --- |
      | `vh` | Viewport Height | 1% of viewport height | `height: 50vh;` |
      | `vw` | Viewport Width | 1% of viewport width | `width: 80vw;` |
      | `vmin` | Viewport Minimum | 1% of viewport’s smaller dimension | `margin: 2vmin;` |
      | `vmax` | Viewport Maximum | 1% of viewport’s larger dimension | `margin: 2vmax;` |

      #### Dynamic Viewport Units

      | Unit | Name | Description | Example Usage |
      | --- | --- | --- | --- |
      | `dvh` | Dynamic Viewport Height | Adjusts to viewport height changes (mobile browsers) | `min-height: 100dvh;` |
      | `dvw` | Dynamic Viewport Width | Adjusts to viewport width changes | `max-width: 50dvw;` |
      | `svh` | Small Viewport Height | Viewport height for small screens | `height: 60svh;` |
      | `svw` | Small Viewport Width | Viewport width for small screens | `width: 40svw;` |
      | `lvh` | Large Viewport Height | Viewport height for large screens | `height: 75lvh;` |
      | `lvw` | Large Viewport Width | Viewport width for large screens | `width: 100lvw;` |
  - _SizeVariable_ \- A reference to another size variable
  - [_CustomValue_](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values) \- A custom value for the variable
- **options**: _object_ \- Optional parameters for the variable.
  - **mode**: _VariableMode_ \- The [variable mode](https://developers.webflow.com/designer/reference/variable-modes) object. Get the variable mode by using the [`collection.getVariableModeByName()`](https://developers.webflow.com/designer/reference/get-variable-mode-by-name) method.

### Returns

**Promise< _SizeVariable_ >**

A Promise that resolves to a SizeVariable object

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Create Size Variable with a Size Value
const mySizeVariable = await collection?.createSizeVariable("Defualt Padding", { unit: "px", value: 50 })
console.log(mySizeVariable)

// Create a Size Variable with a Custom Value
const myCustomSizeVariable = await collection?.createSizeVariable("h1-font-size", {
  type: "custom",
  value: "clamp(1rem, 2vw, 2rem)",
})
console.log(myCustomSizeVariable)
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