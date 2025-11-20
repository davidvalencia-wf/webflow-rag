---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/set-form-name
title: "Set Form Name | Webflow Developer Documentation"
published: 2025-11-17
---

## `FormForm.setName(name)`

Sets the name of the form.

## Syntax

```
form.setName(name: string): Promise<null>
```

## Parameters

- `name`: _String_ \- The name of the form.

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.type === 'FormForm' || selectedElement?.type === 'FormWrapper'){

  await selectedElement.setName("My Form")

} else {
  console.log("Selected Element is not a Form Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | canvas | Any |