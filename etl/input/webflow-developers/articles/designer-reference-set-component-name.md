---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-component-name
title: "Set component name | Webflow Developer Documentation"
published: 2025-11-17
---

## **`component.setName(name)`**

Set the name of the Component Object.

### Syntax

```
component.setName(name: string): Promise<void>
```

### Parameters

- **`name`** : _string_ \- Then name you wish to give your component

### Returns

**Promise<null>**

A promise that resolves to `null` once the name has been set.

```
// Get Component
const components = await webflow.getAllComponents()
const myComponent = components[0]

// Set Component Name
await myComponent.setName("My New Component Name")
```

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canModifyComponents** | any | any | Canvas | Design |

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