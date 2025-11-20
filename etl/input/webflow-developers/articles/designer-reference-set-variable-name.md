---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-variable-name
title: "Set variable name | Webflow Developer Documentation"
published: 2025-11-17
---

## `variable.setName(name)`

Sets the name of the variable.

### Syntax

```
variable.setName(name: string): Promise<null>;
```

### Parameters

- **name** : _string_ \- Name of the variable

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get All Variables
const variables = await collection.getAllVariables()

// Get Value of first Variable
const variable = variables[0]
const value = await variable.setName("Primary")
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