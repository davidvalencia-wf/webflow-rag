---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/set-form-settings
title: "Set Form Settings | Webflow Developer Documentation"
published: 2025-11-17
---

## `FormForm.setSettings(settings)`

Sets the settings of the form.

## Syntax

```
form.setSettings(
  settings:{
    state: {{FORM_STATE}},
    name: string,
    redirect: string,
    action: string,
    method: {{FORM_METHOD}},
  }
): Promise<null>
```

## Parameters

- `settings`: _Partial<`FormSettings`>_ \- The settings to set for the form.

**`FormSettings` Properties**

| Property | Type | Description |
| --- | --- | --- |
| state | FormState | The current state of the form (‘normal’, ‘success’, or ‘error’) |
| name | string | The name of the form |
| redirect | string | The URL to redirect to after form submission |
| action | string | The URL where the form data will be submitted |
| method | FormMethod | The HTTP method used for form submission (‘get’ or ‘post’) |

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.type === 'FormForm' || selectedElement?.type === 'FormWrapper'){

  await selectedElement.setSettings({
    state: "success",
    name: "My Form",
    redirect: "https://www.my-site.com/thank-you",
    action: "https://{dc}.api.mailchimp.com/3.0/lists/{list_id}/members",
    method: "post"
  })

} else {
  console.log("Selected Element is not a Form Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | canvas | Any |