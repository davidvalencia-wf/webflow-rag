---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/set-name-input-field
title: "Set input name | Webflow Developer Documentation"
published: 2025-11-17
---

## `formInput.setName(name)`

Sets the name of the input field.

This method supports the following `FormInput` elements:

- `FormCheckboxInput`
- `FormFileUploadWrapper`
- `FormRadioInput`
- `FormSelect`
- `FormTextarea`
- `FormTextInput`

### Syntax

```
formInput.setName(name: string): Promise<null>;
```

### Returns

**A Promise that resolves to `null`**

### Example

```
// Get the currently selected element
let formInput = await Webflow.getSelectedElement();

// Set the name of the input field
await formInput.setName("Email");
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |