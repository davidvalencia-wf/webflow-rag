---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/variable-modes
title: "Variable Modes | Webflow Developer Documentation"
published: 2025-11-17
---

Variable modes let you define multiple values for individual variables, creating distinct sets of values (“modes”) that can be switched and applied across a site.

![Variable Modes](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/variable-modes.jpg)

## Create a variable mode

Create a variable mode for a specific collection using the [`collection.createVariableMode()` method](https://developers.webflow.com/designer/reference/create-variable-mode). All variable modes created with the Designer API will be created as ‘manual’ modes.

```
// Get the default variable collection
const collection = await webflow.getDefaultVariableCollection()

// Create a variable mode
const variableMode = await collection.createVariableMode("Dark Mode")
```

## Set a mode-specific value on a variable

Once you’ve created a variable mode, you can set a mode-specific value on a variable using the [`variable.set()` method](https://developers.webflow.com/designer/reference/set-variable-value).

To reset a mode-specific value back to the default base value, pass `null` when calling `variable.set()` along with the mode you want to reset.

```
// Get the default variable collection
const collection = await webflow.getDefaultVariableCollection()

// Create variable for the collection with a default value
const colorVariable = await collection.createColorVariable("Body Text", "#ccc")

// Create a variable mode
const variableMode = await collection.createVariableMode("Dark Mode")

// Set a mode-specific value on the variables
await colorVariable.set("#FFF", {mode: variableMode})

// Reset the mode-specific value back to the default base value
await colorVariable.set(null, {mode: variableMode}) // This mode value is now "#ccc"
```