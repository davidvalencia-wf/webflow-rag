---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-variable-value
title: "Set variable value | Webflow Developer Documentation"
published: 2025-11-17
---

## `variable.set(value, options?)`

Set the value of the selected variable.

**Syntax**

```
variable.set(
    value: string | number | SizeValue | Variable | CustomValue,
    options?: {
        mode: VariableMode,
    }
): Promise<null>;
```

### Parameters

| Parameter | Description | Type |
| --- | --- | --- |
| **value** | The value to set for the variable. Must match the variable’s type. You can also pass a Variable object to create an alias, a [CustomValue](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values) for custom values, or `null` to reset a mode-specific value to its default. | `string` \| `number` \| `SizeValue` \| `Variable` \| `CustomValue` \| `null` |
| **options** | An optional parameter to set the [mode value](https://developers.webflow.com/designer/reference/variable-modes) of the variable. | `{mode: VariableMode}` |

##### Resetting a mode-specific value

To reset a mode-specific value back to the default base value, pass `null`
when calling `variable.set()` along with the mode you want to reset. Variables
without a mode-specific value won’t be affected.

### Variable values by type

###### Color

###### Size

###### Number & Percentage

###### FontFamily

```
collection.createColorVariable(name: string, value: string | ColorVariable | CustomValue): Promise<ColorVariable>
```

| Accepted Formats for Value | Examples |
| --- | --- |
| Color name | `collection.createColorVariable("primary", "red");` |
| RGB Hex | `collection.createColorVariable("primary", "#ffcc11");` |
| RGBA Hex | `collection.createColorVariable("primary", "#fffcc11");` |

### Returns

**Promise<`null`>**

A Promise that resolves to `null`

### Examples

###### Color

###### Size

###### Number & Percentage

###### Font family

###### Alias

###### Custom value

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection();

// Get Variable
const variable = await collection?.getVariableByName("MyColorVariable");

// Check Variable type and set color
if (variable?.type === "Color") await variable.set("#fffcc11");
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

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