---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-value
title: "Get variable value | Webflow Developer Documentation"
published: 2025-11-17
---

## `variable.get(options?)`

Retrieves the value of the variable.

### Syntax

```
variable.get(
    options?: {
        mode: VariableMode,
        customValues: boolean,
        doNotInheritFromBase: boolean}
): Promise<string | number | SizeValue | Variable | CustomValue>;
```

### Parameters

- **options**: _object_ \- An optional parameter to include get specific information.

| Parameter | Type | Description | Default |
| --- | --- | --- | --- |
| `mode` | VariableMode | The value of the variable in the specified [variable mode](https://developers.webflow.com/designer/reference/variable-modes). | — |
| `customValues` | boolean | Indicates whether to return the custom value of the variable. | `false` |
| `doNotInheritFromBase` | boolean | Indicates whether to return the value of the variable without inheriting from the base [variable mode](https://developers.webflow.com/designer/reference/variable-modes). | `false` |

Calling `variable.get()` without `customValues: true` will throw an error if the variable has a [custom value](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values).

### Returns

Returns a Promise that resolves to the current value of the variable. The exact return type depends on the variable’s type, whether it’s an alias or a custom value, and the selected variable mode.

See the table below for details on return types for each scenario.

###### Color

###### Size

###### Number & Percentage

###### FontFamily

Returns a value in one of these formats:

| Format | Examples | Return Type |
| --- | --- | --- |
| String | `"red"`, `"#ffcc11"`, `"#fffcc11"` | `string` |
| Variable alias | `{ "id": "variable-xyz-123" }` | _ColorVariable_ |
| Custom value | `{"type":"custom","value":"color-mix(in srgb, var(--blue-500) , #fff 60%)"}` | _CustomValue_ |

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection();

// Get All Variables
const variables = await collection.getAllVariables();

// Get Value of first Variable
const variable = variables[0];
const value = await variable.get();
// value = "#146EF5"

// Get Value of first Variable with custom value
const variable = variables[1];
const value = await variable.get({ customValues: true });
// value = { type: 'custom', value: 'color-mix(in srgb, var(--blue-500), white 50%)' }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

Checks for Authorization only

| Designer ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |

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