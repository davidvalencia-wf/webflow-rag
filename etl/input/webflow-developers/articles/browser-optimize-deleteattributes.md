---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/deleteAttributes
title: "Delete attributes | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.deleteAttributes(scope, names)`

Delete specified custom attributes for the current user or page view. This method removes previously set attributes from storage. If you attempt to delete an attribute that doesn’t exist, the operation will be ignored and no error will be thrown.

### Syntax

```
wf.deleteAttributes(scope: 'user' | 'pageview', names: string[])
```

### Parameters

- **scope**: `'user'` \| `'pageview'` \- The scope of the attributes. You can choose to set attributes for the current user or the current page view.
- **names**: `string[]` \- An array of attribute names to delete.

### Example implementation

```
// Call the wf.ready() function the Browser API is available
wf.ready(function() {
  // Set attributes for the current user
  wf.deleteAttributes('user', ['userSegment'])
})
```

### Returns

This method doesn’t return a value. It only deletes the specified attributes from storage. To see updated attributes, use [`wf.getAttributes()`](https://developers.webflow.com/browser/optimize/getAttributes).

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