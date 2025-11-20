---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/set-required-status
title: "Set Required Status | Webflow Developer Documentation"
published: 2025-11-17
---

## `formInput.setRequired(value)`

Sets the required status of a form input.

This method is applicable to the following form input types:

- `FormCheckboxInput`
- `FormFileUploadWrapper`
- `FormRadioInput`
- `FormSelect`
- `FormTextarea`
- `FormTextInput`

## Syntax

```
formInput.setRequired(value: boolean): Promise<null>
```

## Parameters

- `value`: _Boolean_ \- The required status of the form input.

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
const selectedElement = await webflow.getSelectedElement()

const formInputTypes = [\
  'FormCheckboxInput',\
  'FormFileUploadWrapper',\
  'FormRadioInput',\
  'FormSelect',\
  'FormTextarea',\
  'FormTextInput'\
];

if (selectedElement?.type && formInputTypes.includes(selectedElement.type)) {
  await selectedElement.setRequired(true)

} else {
  console.log("Selected Element is not a Form Input Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | canvas | Any |