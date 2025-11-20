---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/custom-attributes/getCustomAttribute
title: "Get Custom Attribute | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getCustomAttribute(name)`

Get [custom HTML attributes](https://university.webflow.com/lesson/custom-attributes?topics=elements) for an element by name.

### Syntax

```
element.getCustomAttribute(name: string):Promise<null | string>
```

### Parameters

- **`name`** : _String_ \- The name of the custom attribute.

### Returns

**Promise< _String_ >**

A Promise that resolves to the value of the named custom attribute.

### Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.customAttributes) {

  // Get Custom Attribute by Name
  const customAttribute = await selectedElement.getCustomAttribute('tooltip')
  console.log(customAttribute)

}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |

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