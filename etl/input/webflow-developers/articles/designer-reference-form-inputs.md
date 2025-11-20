---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/form-inputs
title: "Form Inputs | Webflow Developer Documentation"
published: 2025-11-17
---

Form inputs are the individual fields within a form that collect information from site visitors. With the Designer APIs, you can create various types of inputs, configure their properties, and manage their behavior.

## Creating Form Inputs

You can create different types of form inputs using the following `elementPresets`:

- `FormTextInput`
- `FormTextarea`
- `FormSelect`
- `FormCheckboxInput`
- `FormRadioInput`

It’s a best practice to wrap each input and its corresponding label (e.g. `FormBlockLabel`) in a container element, such as a `DivBlock`, to keep them organized.

### Example

This example demonstrates how to add a new `FormTextInput` with a `FormBlockLabel` to an existing form.

```
// Get the form element on the page
const formEl = await webflow.getSelectedElement();

// Ensure we have a form element selected
if (formEl && formEl.type === "FormForm") {
  // Create a wrapper for the new input and label
  const inputWrapper = await formEl.append(webflow.elementPresets.DivBlock);

  // Add a label to the wrapper
  const label = await inputWrapper.append(
    webflow.elementPresets.FormBlockLabel
  );
  await label.setText("Your Email");

  // Add a text input to the wrapper
  const input = await inputWrapper.append(webflow.elementPresets.FormTextInput);

  // Configure the new input
  await input.setName("Email");
  await input.setInputType("email");
  await input.setRequired(true);
}
```

## Form Input Methods

The following methods are available for interacting with form input elements. Note that supported element types may vary by method.

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

## FAQs

###### Can I set placeholder text on a form input field?

Yes, you can set placeholder text using custom attributes. This overrides any placeholder text configured in the Designer’s Input Field settings.

For example:

```
const el = await webflow.getSelectedElement()
const input = await el.append(webflow.elementPresets.FormTextInput);

await input.setCustomAttribute("placeholder", "Enter your email");
```

###### Can I set the options for a preset select input field?

No, currently setting the options for a preset select input field isn’t supported via the Designer API.

You can add a select input field with options by using the [custom DOM element](https://developers.webflow.com/designer/reference/dom-element) method to create a select input field with choices as children.

For example:

```
  const selectedElement = await webflow.getSelectedElement()

  if (selectedElement && selectedElement.children) {
    // Create a wrapper div using the element builder
    const wrapper = webflow.elementBuilder(webflow.elementPresets.DOM)
    wrapper.setTag('div')

    // Create a select element using the DOM preset and append it to the wrapper
    const select = wrapper.append(webflow.elementPresets.DOM)
    select.setTag('select')
    select.setAttribute('name', 'custom-select')

    // Define the options for the select field
    const choices = [\
      { name: 'First choice', value: 'first' },\
      { name: 'Second choice', value: 'second' },\
      { name: 'Third choice', value: 'third' },\
    ]

    // Create and append option elements
    choices.forEach((choice) => {
      const option = select.append(webflow.elementPresets.DOM)
      option.setTag('option')
      option.setAttribute('value', choice.value)
      option.setTextContent(choice.name)
    })

    // Add the wrapper with the custom select element to the page
    const wrapperElement = await selectedElement.append(wrapper)

    if (wrapperElement && wrapperElement.children) {
      // Prepend a FormBlockLabel to the wrapper
      const label = await wrapperElement.prepend(
        webflow.elementPresets.FormBlockLabel,
      )
      if (label.type === 'FormBlockLabel') {
        await label.setTextContent('Custom Select Field')
      }
    }

    console.log(
      'Custom select field with wrapper and label created successfully.',
    )
  } else {
    console.log('Please select an element that can contain child elements.')
  }
```

###### Can I create a form with the Element Builder?

No, currently only DOM elements can be created with the Element Builder.