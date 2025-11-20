---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/get-form-settings
title: "Get Form Settings | Webflow Developer Documentation"
published: 2025-11-17
---

## `FormForm.getSettings()`

Retrieves the settings of the form.

To get the settings of the form in a specific state, first use the `form.setSettings()` method to set form to the desired `state`. Then use `form.getSettings()` to retrieve the settings of the form.

## Syntax

```
form.getSettings(): Promise<FormSettings>
```

## Returns

**Promise<`FormSettings`>**: _Object_ \- A promise that resolves to the settings of the form.

**`FormSettings` Properties**

| Property | Type | Description |
| --- | --- | --- |
| state | FormState | The current state of the form (‘normal’, ‘success’, or ‘error’) |
| name | string | The name of the form |
| redirect | string | The URL to redirect to after form submission |
| action | string | The URL where the form data will be submitted |
| method | FormMethod | The HTTP method used for form submission (‘get’ or ‘post’) |

## Example

```
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.type === 'FormForm' || selectedElement?.type === 'FormWrapper'){

  const formSettings = await selectedElement.getSettings()
  console.log(formSettings)

  /* Example Response
  {
    state: "success",
    name: "My Form",
    redirect: "https://my-site.com/thank-you",
    action: "https://{dc}.api.mailchimp.com/3.0/lists/{list_id}/members",
    method: "post"
  } */

} else {
  console.log("Selected Element is not a Form Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |

```
</rewritten_file>
```