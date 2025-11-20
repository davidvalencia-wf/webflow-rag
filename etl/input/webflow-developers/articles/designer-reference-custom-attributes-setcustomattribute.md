---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/custom-attributes/setCustomAttribute
title: "Set Custom Attribute | Webflow Developer Documentation"
published: 2025-11-17
---

## **`element.setCustomAttribute(name, value)`**

Set a [custom HTML attribute](https://university.webflow.com/lesson/custom-attributes?topics=elements) for an element.

### Syntax

```
element.setCustomAttribute(name: string, value: string): Promise<null>
```

### Parameters

- **`name`** : _String_ \- The name of the custom attribute.
- **`value`** : _String_ \- The value of the custom attribute

The value of the named custom attribute.

### Returns

**Promise<`null`>**

A promise that resolves to `null`

### Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.customAttributes) {

  // Set Custom Attribute
  await selectedElement.setCustomAttribute("tooltip", "my tooltip value")

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