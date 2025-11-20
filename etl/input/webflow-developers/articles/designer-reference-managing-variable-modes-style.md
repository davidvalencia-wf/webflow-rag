---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/managing-variable-modes-style
title: "Managing variable modes on styles | Webflow Developer Documentation"
published: 2025-11-17
---

Use [variable modes](https://developers.webflow.com/designer/reference/variable-modes) with styles to create multiple design themes programmatically. Variable modes let you define different values for the same [variable](https://developers.webflow.com/designer/reference/variables-overview), enabling you to switch between complete design systems like light and dark themes. This approach reduces variable management overhead and streamlines design workflows through the Designer API.

## How variable modes work with styles

When you apply a variable mode to a style that uses variables, the applied variables inherit all variable values from that mode. This creates a unified design system where changes to the mode automatically update all dependent styles.

## Creating and applying variable modes

[1](https://developers.webflow.com/designer/reference/managing-variable-modes-style#create-a-variable-mode)

### Create a variable mode

Create a variable mode for a specific collection using the [`collection.createVariableMode()` method](https://developers.webflow.com/designer/reference/create-variable-mode). All variable modes created with the Designer API are created as ‘manual’ modes.

```
// Get the default variable collection
const collection = await webflow.getDefaultVariableCollection()

// Create a variable mode
const darkMode = await collection.createVariableMode("Dark Mode")
```

[2](https://developers.webflow.com/designer/reference/managing-variable-modes-style#set-a-mode-specific-value-on-a-variable)

### Set a mode-specific value on a variable

Once you’ve created a variable mode, you can set a mode-specific value on a variable using the [`variable.set()` method](https://developers.webflow.com/designer/reference/set-variable-value).

```
// Get the default variable collection
const collection = await webflow.getDefaultVariableCollection()

// Create variables for the default mode
const primaryColor = await collection.createColorVariable("Primary Color", "#2563eb") // blue-600
const secondaryColor = await collection.createColorVariable("Secondary Color", "#64748b") // slate-500
const backgroundColor = await collection.createColorVariable("Background Color", "#ffffff") // white
const accentColor = await collection.createColorVariable("Accent Color", "#f59e42") // orange-400

// Set dark mode values for all variables
await primaryColor.set("#3b82f6", {mode: darkMode}) // blue-500
await secondaryColor.set("#94a3b8", {mode: darkMode}) // slate-400
await backgroundColor.set("#0f172a", {mode: darkMode}) // slate-900
await accentColor.set("#fb923c", {mode: darkMode}) // orange-400
```

[3](https://developers.webflow.com/designer/reference/managing-variable-modes-style#apply-a-variable-mode-to-a-style)

### Apply a variable mode to a style

Apply a variable mode to a style using the [`style.setVariableMode()` method](https://developers.webflow.com/designer/reference/set-variable-mode-style). Each variable mode is associated with a variable collection. To apply a variable mode, you must provide the variable collection that belongs to the variable mode.

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {
    // Get Styles
    const styles = await selectedElement.getStyles()
    const primaryStyle = styles[0] // Get the primary style

    // Get Variable Collection
    const variableCollections = await webflow.getAllVariableCollections();
    const collectionsByName = Object.fromEntries(
        await Promise.all(
            variableCollections.map(async col => [await col.getName(), col])
        )
    );
    const variableCollection = collectionsByName['My Collection Name']

    // Set Variable Mode
    if (primaryStyle && variableCollection) {
        await primaryStyle.setVariableMode(variableCollection, variableMode)
        console.log('Variable mode set successfully')
    }
}
```

##### Set variable modes on primary styles

Currently, you can only set variable modes on primary styles. Variable modes aren’t supported for combo classes through the Designer API.