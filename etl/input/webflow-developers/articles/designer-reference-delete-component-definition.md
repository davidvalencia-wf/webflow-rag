---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/delete-component-definition
title: "Delete a component | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.unregisterComponent(component)`

Removes a component definition from the site.

### Syntax

```
webflow.unregisterComponent(component: Component): Promise<null>
```

### Parameters

- **`component`** : _Component_ \- The component to delete

### Returns

**Promise<`null`>**

A promise that resolves to `null`.

### Example

```
// Get selected element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement) {

  // Create component from selected element
  const myNewComponent = await webflow.registerComponent('Hero Component', selectedElement);

  // Delete Component
  await webflow.unregisterComponent(myNewComponent);

} else {
  console.log("No element is currently selected. Please select a root element first.");
}
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