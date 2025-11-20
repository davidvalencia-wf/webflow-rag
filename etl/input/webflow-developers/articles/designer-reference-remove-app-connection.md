---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/remove-app-connection
title: "Remove App Connection | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.removeAppConnection()`

Remove an App Connection for a specific element. Only App Connections associated with the current App can be removed.

### Syntax

```
removeAppConnection(value: string): Promise<null>
```

### Parameters

- **value**: _String_ \- The string identifier for the App Connection to be removed.

### Returns

**Promise<`null`>**

A promise that returns to `null`.

### Example

```
const el = await webflow.getRootElement(); // Get root element

// Check for an element
if (!el || !el.children) throw new Error("Expected an element");

// Create a form element
const formEl = await el.append(webflow.elementPresets.FormForm);

// Check for App Connections
if (!formEl || !formEl.appConnections) {
  throw new Error("App Connections not supported");
}

// Set App Connection
await formEl.setAppConnection("myAwesomeAppManageFormElement");

//  Get existing App Connections
const connections = await formEl.getAppConnections();

// Remove first App Connection
const connection = connections[0];
await removeAppConnection(connection);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

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