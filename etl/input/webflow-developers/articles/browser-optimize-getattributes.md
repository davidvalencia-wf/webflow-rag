---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/getAttributes
title: "Get Attributes | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.getAttributes(scope, names)`

Retrieve a subset of attributes that have been previously stored using [`setAttributes()`](https://developers.webflow.com/browser/optimize/setAttributes). Only attributes that match the names parameter will be returned.

### Syntax

```
wf.getAttributes(scope: 'user' | 'pageview', names: string[])
```

### Parameters

- **scope**: `'user'` \| `'pageview'` \- The scope of the attributes to retrieve.
- **names**: `string[]` \- An array of attribute names to retrieve.

## Example implementation

```
// Call the wf.ready() function the Browser API is available
wf.ready(function() {
  // Set attributes for the current user
  wf.setAttributes('user', {
    userSegment: 'enterprise'
  })
})

// Retrieve the attributes
const attributes = wf.getAttributes('user', ['userSegment'])
  console.log(attributes)
```

### Returns

An object containing the attributes that match the names parameter.

### Example

```
{
  "userSegment": "enterprise"
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