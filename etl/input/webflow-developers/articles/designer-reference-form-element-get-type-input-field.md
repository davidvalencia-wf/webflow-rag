---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/get-type-input-field
title: "Get input type | Webflow Developer Documentation"
published: 2025-11-17
---

## `formInput.getInputType()`

Retrieves the HTML type of a FormTextInput field.

Supported element:

- `FormTextInput`

### Syntax

```
formInput.getInputType(): Promise<'text' | 'email' | 'password' | 'tel' | 'number' | 'url' | null>;
```

### Returns

**A Promise resolving to a string or null**

Returns the HTML type of the `FormTextInput` element (`'text'`, `'email'`, etc.). Returns `null` if the type isn’t found.

### Example

```
// Get the currently selected element
let formTextInput = await webflow.getSelectedElement();

// Get the input type
let type = await formTextInput.getInputType();

console.log(type); // e.g., "email"
```

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |