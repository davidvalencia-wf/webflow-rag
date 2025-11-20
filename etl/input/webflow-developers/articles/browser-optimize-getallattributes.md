---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/getAllAttributes
title: "Get all attributes | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.getAllAttributes()`

Retrieve all attributes that have been previously stored using [`setAttributes()`](https://developers.webflow.com/browser/optimize/setAttributes).

### Syntax

```
wf.getAllAttributes(scope: 'user' | 'pageview')
```

### Parameters

- **scope**: `'user'` \| `'pageview'` \- The scope of the attributes to retrieve.

## Example implementation

```
// Call the wf.ready() function the Browser API is available
wf.ready(function() {
  // Set attributes for the current user
  wf.setAttributes('user', {
    userSegment: 'enterprise',
    userRole: 'technicalBuyer'
  })
})

// Retrieve the attributes
const attributes = wf.getAllAttributes('user')
  console.log(attributes)
```

### Returns

An object containing all attributes set for the current scope.

### Example

```
{
  "userSegment": "enterprise",
  "userRole": "technicalBuyer"
}
```

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