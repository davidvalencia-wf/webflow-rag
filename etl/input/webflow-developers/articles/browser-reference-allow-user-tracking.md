---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/reference/allow-user-tracking
title: "Allow user tracking | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.allowUserTracking(options)`

Enables user tracking for the current user.

### Syntax

```
wf.allowUserTracking(options?: { reload?: boolean; activate?: boolean }): void
```

### Parameters

- **options**: _object_ \- Controls activation behavior. All properties are optional.
  - **reload**: _boolean_ \- Reloads the page after activating tracking. _Default: false_
  - **activate**: _boolean_ \- Activates tracking immediately. _Default: true_

### Returns

This method doesn’t return a value to the caller.

### Example

```
// Ensure Browser APIs are ready before calling
wf.ready(() => {
  // Enable user tracking and activate immediately
  wf.allowUserTracking({ activate: true });
});
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