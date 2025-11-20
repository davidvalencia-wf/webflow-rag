---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-launch-context
title: "Get Launch Context | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getLaunchContext()`

The `getLaunchContext` API helps you understand how your Designer Extension was launched and provides contextual information about the launching element.

Use this method on initial load to identify how the extension was launched and provide context about the launching element. The App can use this information to show a customized UI or behavior to manage the element from where it was launched.

**Launch Types**

Your extension can be launched in three ways:

1. **Apps Panel** \- Launched directly from the Webflow Designer’s Apps Panel
2. **App Connection** \- Launched through an existing [App Connection](https://developers.webflow.com/designer/reference/app-intents-and-connections)
3. **App Intent** \- Launched with a specific intent (e.g., to create/manage a form or image)

### Syntax

```
 webflow.getLaunchContext(): Promise<LaunchContext | null>;
```

### Returns

A Promise that resolves to a `LaunchContext` object or null.

**LaunchContext**

```
{
  type: 'AppIntent',
  value: { form: 'create' }
}
```

An object with the following properties:

- **type:**`'AppConnection' | 'AppIntent' | 'AppsPanel'`

Indicates how the extension was launched.

- **value:**`null | string | Record<'form' | 'image', 'create' | 'manage'>`

Additional context about the launch:
  - `null` \- For basic App Panel launches
  - `string` \- For deep links or custom values
  - Object with form/image context - For specific creation or management intents

### Example

```
async function getLaunchContext() {
      const context = await webflow.getLaunchContext();
      if (context) {
        await webflow.notify({ type: "Success", message: `App was launched through ${context.type}` });
      }
    }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDEAccessCanvas** | Any | Any | Any | Any |