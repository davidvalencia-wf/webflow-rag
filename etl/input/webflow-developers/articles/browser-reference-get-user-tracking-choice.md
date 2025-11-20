---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/reference/get-user-tracking-choice
title: "Get user tracking choice | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.getUserTrackingChoice()`

Retrieves the user’s current tracking preference. Returns one of three possible states: `allow`, `deny`, or `undefined`.

### Syntax

```
wf.getUserTrackingChoice(): 'allow' | 'deny' |
'none'
```

### Returns

The user’s current tracking choice:

- `'allow'` User has opted in to tracking.
- `'deny'` User has opted out of tracking.
- `'none'` User hasn’t made a choice.

### Example

```
// Ensure Browser APIs are ready before calling
wf.ready(() => {
  // Retrieve the user's tracking choice
  const choice = wf.getUserTrackingChoice();
  console.log(choice); // 'allow', 'deny', or undefined
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