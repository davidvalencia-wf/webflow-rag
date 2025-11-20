---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-component-definition
title: "Create a component | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.registerComponent(name, root)`

Registers a new [component definition](https://developers.webflow.com/designer/reference/components-overview#component-definition) with the specified name and root element.

### Syntax

```
webflow.registerComponent(
  name: string,
  root: AnyElement | ElementPreset<AnyElement> | Component
): Promise<Component>
```

### Parameters

- **`name`** : _string_ \- The name of the component.
- **`root`** : _AnyElement_ \- The root element of the component.

### Returns

**Promise< _Component_ >**

A Promise that resolves to the registered component.

### Example

```
// Get selected element
const rootElement = await webflow.getSelectedElement();

if (rootElement) {

  // Create a component from the Root Element
  const component = await webflow.registerComponent('MyCustomComponent', rootElement);
  console.log(`Component registered with ID: ${component.id}`);

} else {
  console.log("No element is currently selected. Please select a root element first.");
}

},~
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

* * *

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canCreateComponents** | Primary | any | Canvas | any |

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