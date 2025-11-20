---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/component-element/getComponent
title: "Get Component | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getComponent()`

Retrieves the associated [component definition](https://developers.webflow.com/designer/reference/components-overview#component-definition) of the component instance.

## Syntax

```
element.getComponent(): Promise<Component>
```

## Returns

**Promise< _Component_ >**

A Promise that resolves to a [Component Object](https://developers.webflow.com/designer/reference/components-overview)

## Example

```
// Select Component Element on Page
const elements = await webflow.getAllElements()
const componentInstance = elements.find(el => el.type === 'ComponentInstance')

if (componentInstance?.type === "ComponentInstance") {

  // Get Component object from instance
  const component = await componentInstance?.getComponent()
  const componentName = await component.getName()
  console.log(componentName)
} else {
  console.log("No component element found")
}
```

## Designer Ability

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