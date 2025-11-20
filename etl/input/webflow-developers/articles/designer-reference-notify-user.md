---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/notify-user
title: "Send notification to user | Webflow Developer Documentation"
published: 2025-11-17
---

## `notify(opts)`

Send an in-Designer notification to the user. The notification can be styled as either a success, error, or general information message. Error messages provide users with the opportunity to close the Designer Extension.

Your browser doesn’t support HTML video.

### Syntax

```
webflow.notify(
  opts: {
    type: 'Error' | 'Info' | 'Success',
    message: string,
  }
): Promise<void>
```

### Parameters

**`opts`** : `{message: string, type: 'Error' | 'Info' | 'Success'`

The options for the notification.

- **message**: string
- **type**: “Error” \| “Info” \| “Success”

### Returns

**Promise< _Void_ >**

A Promise that returns a value of `undefined`.

### Example

```
webflow.notify({ type: 'Info', message: 'Great work!' }); // General notification
webflow.notify({ type: 'Error', message: 'Something went wrong, try again!' }); // Error notification
webflow.notify({ type: 'Success', message: 'Successfully did something!' }); // Success notification
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

* * *

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