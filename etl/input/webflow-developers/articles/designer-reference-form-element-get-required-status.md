---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-element/get-required-status
title: "Get Required Status | Webflow Developer Documentation"
published: 2025-11-17
---

## `formInput.getRequired()`

Retrieves the required status of a form input.

This method is applicable to the following form input types:

- `FormCheckboxInput`
- `FormFileUploadWrapper`
- `FormRadioInput`
- `FormSelect`
- `FormTextarea`
- `FormTextInput`

## Syntax

```
formInput.getRequired(): Promise<boolean>
```

## Returns

**Promise<`boolean`>**: _Boolean_ \- A promise that resolves to the required status of the form input.

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

  const required = await selectedElement.getRequired()
  console.log(required)

} else {
  console.log("Selected Element is not a Form Input Element")
}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |