---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/forms
title: "Forms | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow Forms enable users to capture and collect information from visitors on a site.

## Creating a form

Use the `FormForm` [element preset](https://developers.webflow.com/designer/reference/element-presets) to create a form.

```
// Get the currently selected element
let el = await Webflow.getSelectedElement();

// Create a form element
let form = await el.after(webflow.elementPresets.FormForm);
```

When you create a form using the `FormForm` preset, it automatically generates a complete [form structure](https://developers.webflow.com/designer/reference/forms#form-structure) with default form fields, as well as a success and error message.

![Form Element Preset](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/designer/pages/Elements/element-methods/form-element/assets/FormForm.png)

## Form structure

A Webflow form consists of several nested elements that work together:

| Element | Description | Parent Element |
| --- | --- | --- |
| `FormWrapper` | The outermost container element that encapsulates the entire form structure |  |
| `FormForm` | The main form element containing all form fields and inputs | `FormWrapper` |
| `FormSuccessMessage` | The success message after successful form submission | `FormWrapper` |
| `FormErrorMessage` | The error message if form submission fails | `FormWrapper` |
| `FormInput` | An individual form field. |  |
| `FormBlockLabel` | The label for a `FormInput` | `FormInput` |
| `FormButton` | The submit button for the form | `FormForm` |

## Form inputs

Form inputs are the individual fields that collect user information. It’s recommended to create a wrapper to contain each input and it’s corresponding [label](https://developers.webflow.com/designer/reference/forms#form-labels).

You can create form inputs using the following element presets:

- `FormTextInput`
- `FormTextarea`
- `FormSelect`
- `FormCheckboxInput`
- `FormRadioInput`

It’s a best practice to wrap each input and its corresponding label (e.g. `FormBlockLabel`) in a container element, such as a `DivBlock`, to keep them organized.

**Example**

Inline

```
// Get the currently selected element
let el = await Webflow.getSelectedElement();

// Create a form element
let formWrapper = await el.after(webflow.elementPresets.FormForm);

// Add a text input with a label
let formWrapperChildren = await formWrapper.getChildren(); // Get the form element
let formInputs = formWrapperChildren[0]; // Get the form element
let inputWrapper = await formInputs.append(webflow.elementPresets.DOMElement); // Create a wrapper for the input and label
let label = await inputWrapper.append(webflow.elementPresets.FormBlockLabel); // Create a label
let input = await inputWrapper.append(webflow.elementPresets.FormTextInput); // Create a text input
```

### Form labels

Each input should have a label that describes the information it collects. Create a label using the `FormBlockLabel` element preset to label each input.

## Methods

### Form element methods

The methods documented below apply specifically to the `FormForm` and
`FormWrapper` elements.

The Form Element supports the following specific methods:

[Get form name\\
\\
Retrieves the name of the form.](https://developers.webflow.com/designer/reference/form-element/get-form-name) [Set form name\\
\\
Sets the name of the form.](https://developers.webflow.com/designer/reference/form-element/set-form-name) [Get form settings\\
\\
Retrieves the settings of the form.](https://developers.webflow.com/designer/reference/form-element/get-form-settings) [Set form settings\\
\\
Sets the settings of the form.](https://developers.webflow.com/designer/reference/form-element/set-form-settings)

### Form input methods

The following methods apply to form input elements:

[Get required status\\
\\
Retrieves the required status of a form input.](https://developers.webflow.com/designer/reference/form-element/get-required-status) [Set required status\\
\\
Sets the required status of a form input.](https://developers.webflow.com/designer/reference/form-element/set-required-status) [Get input name\\
\\
Retrieves the name of the input field.](https://developers.webflow.com/designer/reference/form-element/get-name-input-field) [Set input name\\
\\
Sets the name of the input field.](https://developers.webflow.com/designer/reference/form-element/set-name-input-field) [Get input type\\
\\
Retrieves the type of the input field.\\
\\
Only supported by `FormTextInput`.](https://developers.webflow.com/designer/reference/form-element/get-type-input-field) [Set input type\\
\\
Sets the type of the input field.\\
\\
Only supported by `FormTextInput`.](https://developers.webflow.com/designer/reference/form-element/set-type-input-field)

## Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | The unique identifier for the form. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | The type of the element. | `string` | `"FormForm" || "FormWrapper` |
| `children` | Indicates if the element can contain child elements. | `boolean` | `true` |
| `customAttributes` | Indicates if the element can contain custom attributes. | `boolean` | `true` |
| `styles` | Indicates if the element can contain styles. | `boolean` | `true` |
| `textContent` | Indicates if the element can contain text content. | `boolean` | `false` |
| `appConnections` | Indicates if the element can contain app connections. | `boolean` | `true` |