---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/set-type-input-field
title: "Set input type | Webflow Developer Documentation"
published: 2025-11-17
---

## `formInput.setInputType()`

Sets the HTML type of a FormTextInput field.

Supported element:

- `FormTextInput`

### Syntax

```
formInput.setInputType(type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url'): Promise<null>;
```

### Returns

**A Promise that resolves to `null`**

### Example

```
// Get the currently selected element
let formTextInput = await webflow.getSelectedElement();

// Set the input type
await formTextInput.setInputType("email");
```

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | Canvas | Any |