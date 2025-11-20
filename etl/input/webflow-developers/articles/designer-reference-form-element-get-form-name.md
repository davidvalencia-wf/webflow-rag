---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/get-form-name
title: "Get Form Name | Webflow Developer Documentation"
published: 2025-11-17
---

## `FormForm.getName()`

Retrieves the name of the form.

## Syntax

```
form.getName(): Promise<string>
```

## Returns

**Promise<`name`>**: _String_ \- The name of the form.

## Example

```
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.type === 'FormForm' || selectedElement?.type === 'FormWrapper'){

  const name = await selectedElement.getName()
  console.log(name)

} else {
  console.log("Selected Element is not a Form Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |