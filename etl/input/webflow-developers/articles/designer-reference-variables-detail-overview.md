---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/variables-detail-overview
title: "Variables | Webflow Developer Documentation"
published: 2025-11-17
---

Variables are reusable design tokens that let you [define and manage values across your Webflow projects](https://university.webflow.com/lesson/variables?topics=layout-design). They enable you to create a single source of truth for common values like colors, spacing, and typography. When you update a variable’s value, that change automatically propagates everywhere the variable is used, making it easy to maintain consistency and make global design updates.

Assign variables to any compatible [style property](https://developers.webflow.com/designer/reference/style-properties). For example, you can use color variables for background colors, size variables for padding and margins, or font variables for typography. When the variable’s value changes, all style properties using that variable will automatically update, providing a powerful way to maintain design consistency and make global updates efficiently.

## Variable types

Webflow currently supports five types of variables:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Variable.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Variable.svg)\\
\\
Color\\
\\
Define colors.](https://developers.webflow.com/designer/reference/create-color-variable) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/GlobalCDN.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/GlobalCDN.svg)\\
\\
Size\\
\\
Define sizes and spacing.](https://developers.webflow.com/designer/reference/create-size-variable) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Typography.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Typography.svg)\\
\\
Font\\
\\
Define fonts.](https://developers.webflow.com/designer/reference/create-font-family-variable) [Number\\
\\
Define number.](https://developers.webflow.com/designer/reference/create-number-variable) [Percentage\\
\\
Define percentages.](https://developers.webflow.com/designer/reference/create-percentage-variable)

## Creating a variable

Variables belong to a collection. To create a variable, you need to get the collection first.

```
const collection = await webflow.getVariableCollectionById(
  "Your Collection ID"
);
```

Each variable type has its own creation function. Below are the available variable types and how to create them:

###### Color

###### Size

###### Number & Percentage

###### FontFamily

```
collection.createColorVariable(name: string, value: string | ColorVariable | CustomValue): Promise<ColorVariable>
```

| Accepted Formats for Value | Examples |
| --- | --- |
| Color name | `collection.createColorVariable("primary", "red");` |
| RGB Hex | `collection.createColorVariable("primary", "#ffcc11");` |
| RGBA Hex | `collection.createColorVariable("primary", "#fffcc11");` |

### Variable aliases

Variable aliases allow you to create references between variables, making it easier to maintain consistent design systems and create dynamic relationships between your variables. When you update the original variable, all aliases automatically reflect the change.

```
// Get the default variable collection
const collection = await webflow.getDefaultVariableCollection();

// Create primary brand color variable
const primaryColor = await collection.createColorVariable(
  "primary-brand",
  "#0066FF"
);

// Create aliases that reference the primary color
const buttonColor = await collection.createColorVariable(
  "button-primary",
  primaryColor
);
const linkColor = await collection.createColorVariable(
  "link-color",
  primaryColor
);

// When primaryColor changes, buttonColor and linkColor will automatically update
await primaryColor.set("#FF0066");
```

### Custom values

Webflow’s variable system supports a limited set of CSS functions, enabling you to create dynamic, responsive, and mathematically derived values.

#### Available functions

Webflow supports these CSS functions in variables:

| Function | Purpose | Example |
| --- | --- | --- |
| [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc()) | Perform mathematical calculations | `calc(100vh - var(--header-height))` |
| [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()) | Create fluid values with min/max bounds | `clamp(1rem, 5vw, 3rem)` |
| [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min()) | Use the smallest of multiple values | `min(50%, 300px)` |
| [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max()) | Use the largest of multiple values | `max(100px, 20%)` |
| [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) | Blend colors together | `color-mix(in srgb, var(--primary) 75%, white)` |

#### Using functions with custom values

To use functions in variables, you need to create or set them as custom values. Custom values work with any variable type.

##### Variable References

When using functions, you can reference other variables using the `var()` syntax. This allows you to create dynamic relationships between your design tokens. To dynamically get this syntax, you can use the [`getBinding()`](https://developers.webflow.com/designer/reference/get-variable-binding) method on a variable.

```
variable.set({
  type: "custom",
  value: "calc(var(--spacing-base) * 2)",
});
```

###### Create a custom value

###### Set a custom value

```
// Get collection
const collection = await webflow.getDefaultVariableCollection()

// Create a Color Variable
const colorVariable = await collection.createColorVariable("blue-500", "#146EF5")

// Get the binding for the variable
const binding = await colorVariable.getBinding()

// Create a Color Variable with a custom value
await colorVariable.set({
    type: "custom",
    value: `color-mix(in srgb, ${binding}, white 75%)`
});
```

## Selecting variables

Select variables from their Collection by their name or ID.

```
// Get Default Collection
const collection = await webflow.getDefaultVariableCollection();

// Get variable by ID
const variableById = await collection?.getVariable("id-123");

// Get Variable by Name
const variableByName = await collection?.getVariableByName("Space Cadet");
```

## Updating variables

Renaming and setting new values on a variable.

### Renaming variables

Variables in Webflow can be renamed for better clarity or organization. After you’ve successfully renamed a variable, all instances where this variable is used will automatically reference the new name.

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection();

if (collection) {
  // Get variable and reset name
  const variable = await collection.getVariableByName("Space Cadet");
  await variable?.setName("Our awesome bg color");
}
```

### Setting variable values

You can’t change a variable’s type once it’s created. However, you can change its value. The format for updating the value is consistent with its initial declaration.

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection();

// Get Variable
const variable = await collection?.getVariable("id-123");

// Check Variable type and set color
if (variable?.type === "Color") await variable.set("#fffcc11");
```

## Applying variables to styles

After defining your variables, you can incorporate them into your styles. To do this, simply use the variable as the property value in the style you’re customizing.

```
// Get collection
const collection = await webflow.getDefaultVariableCollection();

// Get Style and desired variable
const style = await webflow.getStyleByName(styleName);
const variable = await collection?.getVariablebyName(variableName);

// Check variable type and set property
if (variable?.type === "Size")
  await style?.setProperties({ "font-size": variable });
```