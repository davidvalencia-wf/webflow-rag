---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/changelog
title: "Changelog | Webflow Developer Documentation"
published: 2025-11-17
---

[September 4, 2025](https://developers.webflow.com/designer/09042025)

## [Webflow's MCP server now supports the Designer](https://developers.webflow.com/designer/09042025)

Webflow’s MCP server now supports the Designer API, enabling AI agents to interact directly with the Webflow Designer canvas in real-time. This pivotal update expands the server’s capabilities beyond content management, opening new possibilities for AI-assisted visual design.

## What’s new

The MCP server now includes tools that connect directly to the Webflow Designer, allowing AI agents to:

- Create and modify design elements on the canvas
- Manage styles, variables, and components
- Work with responsive breakpoints and layouts
- Access real-time design data and structure

### Companion app for Designer connectivity

![MCP Companion App](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/designer/pages/Assets/bridge-app.png)

A new companion app automatically installs during authorization and enables seamless communication between your AI agent and the Designer:

- **Automatic setup**: The companion app installs automatically when you authorize the MCP server
- **Real-time sync**: Maintains a persistent connection between your AI agent and active design sessions
- **Designer access**: Must remain open in the Designer for MCP tools to function

#### Companion app connectivity

**Keep the companion app open**: The MCP Companion App must remain open in the Webflow Designer for Designer API tools to function. Close the app, and you’ll lose access to canvas-based operations.

## Getting started

To use the new Designer API features:

1. **Update your MCP configuration** following the [installation guide](https://developers.webflow.com/data/docs/ai-tools)
2. **Authorize your sites** through the OAuth flow (the companion app installs automatically)
3. **Open the Designer** and launch the “Webflow MCP Companion App” from the Apps panel
4. **Start designing** with AI-powered prompts like “Create a hero section with responsive design”

## Important requirements

### Node.js version 22.3.0+

The MCP server now requires Node.js version **22.3.0** or higher. If you’re using an older version:

- Use `nvm` to install and switch to Node.js 22.3.0
- Clear your `npx` cache: `rm -rf ~/.npm/_npx`
- Restart your AI client after updating

See the [Node.js compatibility section](https://developers.webflow.com/docs/ai-tools#nodejs-compatibility) for detailed troubleshooting steps.

## Learn more

For complete setup instructions, tool documentation, and troubleshooting guides, see the [MCP server and AI tools documentation](https://developers.webflow.com/docs/ai-tools).

* * *

[August 9, 2025](https://developers.webflow.com/designer/reference/variable-modes-style)

## [Manage variable modes on styles](https://developers.webflow.com/designer/reference/variable-modes-style)

This release adds new API methods to manage variable modes on styles. These methods let you programmatically apply, retrieve, and remove variable modes from styles, enabling better control over design themes and variable management.

## New methods for managing variable modes on styles

- [Set variable mode](https://developers.webflow.com/designer/reference/set-variable-mode-style)
- [Set variable modes](https://developers.webflow.com/designer/reference/set-variable-modes-style)
- [Get variable mode](https://developers.webflow.com/designer/reference/get-variable-mode-style)
- [Get variable modes](https://developers.webflow.com/designer/reference/get-variable-modes-style)
- [Remove variable mode](https://developers.webflow.com/designer/reference/remove-variable-mode-style)
- [Remove variable modes](https://developers.webflow.com/designer/reference/remove-variable-modes-style)
- [Remove all variable modes](https://developers.webflow.com/designer/reference/remove-all-variable-modes)

## Try it out

Test these new methods in the [API Playground](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62).

* * *

[August 8, 2025](https://developers.webflow.com/designer/changelog/08082025)

## [Enhanced element creation and form controls](https://developers.webflow.com/designer/changelog/08082025)

This release streamlines element creation workflows and provides better control over form inputs in the Designer API.

### Enhanced bulk element creation

- **Set text and style during creation**: The [element builder](https://developers.webflow.com/designer/reference/bulk-add-elements) now supports setting text and style properties during element creation, eliminating the need for separate API calls after creation. This improves developer experience and performance.

### Workspace information in site details

- **Access workspace context**: The [Get Site Information](https://developers.webflow.com/designer/reference/get-site-info) method now includes workspace details:
  - `workspaceId` \- Unique identifier for the workspace
  - `workspaceSlug` \- URL-friendly workspace identifier

### Improved form input controls

- **Better form customization**: New methods provide enhanced control over form inputs:
  - [Get input type](https://developers.webflow.com/designer/reference/form-element/get-type-input-field) \- Retrieves the HTML type of a `FormTextInput` field
  - [Set input type](https://developers.webflow.com/designer/reference/form-element/set-type-input-field) \- Sets the HTML type of a `FormTextInput` field

* * *

[June 25, 2025](https://developers.webflow.com/designer/06252025)

## [Use functions in variables](https://developers.webflow.com/designer/06252025)

Variables now support using a set of CSS functions in their values, allowing you to create more flexible and dynamic design tokens.

Webflow supports the following [CSS functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_Value_Functions#math_functions) in variables:

| Function | Purpose | Example |
| --- | --- | --- |
| `calc()` | Perform mathematical calculations | `calc(100vh - var(--header-height))` |
| `clamp()` | Create fluid values with min/max bounds | `clamp(1rem, 5vw, 3rem)` |
| `min()` | Use the smallest of multiple values | `min(50%, 300px)` |
| `max()` | Use the largest of multiple values | `max(100px, 20%)` |
| `color-mix()` | Blend colors together | `color-mix(in srgb, var(--primary) 75%, white)` |

### Custom values

To use functions in variables, you need to create or set them as custom values. All variable creation methods accept a `CustomValue` object as the value parameter, and the `variable.set()` method can also update variable values with custom values. For the custom values object, the `type` property is always `"custom"` and the `value` property is a string containing the CSS function.

**CustomValue type**

```
type CustomValue = {
  type: "custom";
  value: string;
};
```

###### Create a custom value

###### Set a custom value

```
// Get collection
const collection = await webflow.getDefaultVariableCollection()

// Create a Color Variable
const colorVariable = await collection.createColorVariable("blue-500", "#146EF5")

// Create a Color Variable with a custom value
await colorVariable.set({
    type: "custom",
    value: `color-mix(in srgb, #146EF5, white 75%)`
});
```

### Reference variables in functions

When using functions, you can reference other variables using the `var()` syntax. This allows you to create dynamic relationships between your design tokens. To dynamically get this syntax, use the new [`getBinding()`](https://developers.webflow.com/designer/reference/get-variable-binding) method on a variable.

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

### Getting the value of a custom variable

To get the value of a custom variable, add the `customValues` property as an optional parameter to the `variable.get()` method.

```
const myValue = await colorVariable.get({
    customValues: true
})

console.log(myValue)
// Returns a CustomValue object
// {
//     type: "custom",
//     value: "color-mix(in srgb, #146EF5, white 75%)"
// }
```

Using `variable.get()` without setting `customValues: true` will throw an error if the variable has a custom value. It’s recommend to always setting `customValues: true` when getting the value of a variable.

* * *

[May 8, 2025](https://developers.webflow.com/designer/05082025)

## [Support for combo classes](https://developers.webflow.com/designer/05082025)

The Designer API now supports the creation of [combo classes](https://help.webflow.com/hc/en-us/articles/33961311094419-Classes#how-to-create-a-combo-class). Combo classes are a way to override the styles of an existing parent class. This is useful for creating unique variations of a style without having to create an entirely new class.

In the Designer API, you can now create combo classes using the [`createStyle` method](https://developers.webflow.com/designer/reference/create-style) and passing an existing style to the `parent` property. For example, if you have a parent class called `button` and you want to create a new style that applies a different color for a specific button, you can do the following:

my-app.ts

```
// Create a style for the button
const buttonStyle = await webflow.createStyle('button')

// Add properties to the style
await buttonStyle.setProperties({
  "background-color": "grey",
  "font-size": "16px",
  "font-weight": "bold",
});

// Create a combo class that applies the new style to the button
const comboClass = await webflow.createStyle('button-primary', {parent: 'button'})

// Add properties to the combo class
await comboClass.setProperties({
  "background-color": "blue",
});

// Check if the class is a combo class
const isComboClass = await comboClass.isComboClass()
```

## Form and asset methods

Additionally, the Designer API now supports the following methods for forms and assets:

**Forms**

- [Get name for a form input element](https://developers.webflow.com/designer/reference/form-element/get-name-input-field)
- [Set name for a form input element](https://developers.webflow.com/designer/reference/form-element/set-name-input-field)

**Assets**

- [Replace asset](https://developers.webflow.com/designer/reference/set-asset-file)
- [Set asset name](https://developers.webflow.com/designer/reference/set-asset-name)

* * *

[April 8, 2025](https://developers.webflow.com/designer/04082025)

## [Control form settings and fields](https://developers.webflow.com/designer/04082025)

We’ve added new methods to manage form settings using the Designer API. This means you can now create forms using the [element creation methods](https://developers.webflow.com/designer/reference/elements-overview#creating-elements) with the `FormForm` element preset. Once the form is created, or if you already have a form created, you can use the new methods to manage the following settings:

- **Name:** the name of the form
- **Redirect URL:** the URL to redirect to after the form is submitted
- **Action:** the URL to send the form data to
- **Method:** the HTTP method to use when sending the form data

### Form settings

- [Get form settings](https://developers.webflow.com/designer/reference/form-element/get-form-settings)
- [Set form settings](https://developers.webflow.com/designer/reference/form-element/set-form-settings)

### Form fields

Additionally, you can manage required fields on forms.

- [Get “required” status of a form input](https://developers.webflow.com/designer/reference/form-element/get-required-status)
- [Set “required” status of a form input](https://developers.webflow.com/designer/reference/form-element/set-required-status)

* * *

[March 12, 2025](https://developers.webflow.com/designer/03122025)

## [Support for variable modes and form elements](https://developers.webflow.com/designer/03122025)

## Support for variable modes

Variable modes let you define multiple values for individual variables, creating distinct sets of values (“modes”) that can be switched and applied across a site.

Use the following endpoints to create and manage variable modes:

- [Create variable mode](https://developers.webflow.com/designer/reference/create-variable-mode)
- [Get all variable modes](https://developers.webflow.com/designer/reference/get-all-variable-modes)
- [Get variable mode by ID](https://developers.webflow.com/designer/reference/get-variable-mode-by-id)
- [Get variable mode by name](https://developers.webflow.com/designer/reference/get-variable-mode-by-name)
- [Remove variable mode](https://developers.webflow.com/designer/reference/remove-variable-mode)
- [Get variable mode name](https://developers.webflow.com/designer/reference/get-variable-mode-name)
- [Set variable mode name](https://developers.webflow.com/designer/reference/set-variable-mode-name)

Get and set variable values for a specific mode:

- **[Set mode-specific variable value](https://developers.webflow.com/designer/reference/set-variable-value)**

You can now include an option parameter to set a mode-specific variable value.
- **[Get mode-specific variable value](https://developers.webflow.com/designer/reference/get-variable-value)**

You can now include an option parameter to get a mode-specific variable value.

## Managing forms

Webflow’s Designer API now supports the following methods for Form elements:

- [Get form name](https://developers.webflow.com/designer/reference/form-element/get-form-name)
- [Set form name](https://developers.webflow.com/designer/reference/form-element/set-form-name)

* * *

[February 28, 2025](https://developers.webflow.com/designer/02282025)

## [Work with pseudo-states in the Designer](https://developers.webflow.com/designer/02282025)

Get the current pseudo-state of the designer and subscribe to changes in the pseudo-state. This is helpful for showing specific [style properties](https://developers.webflow.com/designer/reference/set-style-properties) based on a pseudo-state like `:hover`, `:focus`, or `:active`.

- **[Get the pseudo-state of the designer](https://developers.webflow.com/designer/reference/get-pseudo-mode)**

Added the `webflow.getPseudoMode()` method to return the [pseudo-class state](https://help.webflow.com/hc/en-us/articles/33961301727251-States) of the designer.
- **[Subscribe to pseudo-state changes](https://developers.webflow.com/designer/user-changes-pseudo-mode)**

Added options to the `webflow.subscribe()` method to subscribe to changes in the pseudo-state of the designer.

## Get additional site details

- **[Get site information](https://developers.webflow.com/designer/reference/get-site-info)**

The `getSiteInfo` method now returns the `domains` object in the response.

* * *

[February 5, 2025](https://developers.webflow.com/designer/02062025)

## [Create and manage variable collections](https://developers.webflow.com/designer/02062025)

Variable collections provide an organizational structure for managing related variables. Collections allow you to group variables logically - for example, you might create separate collections for brand colors, typography, or spacing variables. Collections help maintain a clean and organized variable system, making it easier to manage design tokens at scale across your projects.

Use the following endpoints to create and manage [variable collections](https://developers.webflow.com/designer/reference/variable-collections-overview).

- [Create variable collection](https://developers.webflow.com/designer/reference/create-variable-collection)
- [Get all variable collections](https://developers.webflow.com/designer/reference/get-all-variable-collections)
- [Get default variable collection](https://developers.webflow.com/designer/reference/get-default-variable-collection)
- [Get variable collection by ID](https://developers.webflow.com/designer/reference/get-variable-collection-by-id)
- [Remove variable collection](https://developers.webflow.com/designer/reference/remove-variable-collection)
- [Set variable collection name](https://developers.webflow.com/designer/reference/set-variable-collection-name)

* * *

[January 16, 2025](https://developers.webflow.com/designer/01162025)

## [Enhanced page methods](https://developers.webflow.com/designer/01162025)

Page methods for the designer API now accept `null` values. The following methods now accept `null` values:

- [setTitle](https://developers.webflow.com/designer/reference/set-page-title)
- [setDescription](https://developers.webflow.com/designer/reference/set-page-description)
- [setOpenGraphTitle](https://developers.webflow.com/designer/reference/set-open-graph-title)
- [setOpenGraphDescription](https://developers.webflow.com/designer/reference/set-open-graph-description)
- [setOpenGraphImage](https://developers.webflow.com/designer/reference/set-open-graph-image-url)
- [setSearchTitle](https://developers.webflow.com/designer/reference/set-search-title)
- [setSearchDescription](https://developers.webflow.com/designer/reference/set-search-description)
- [setSearchImage](https://developers.webflow.com/designer/reference/set-search-image)

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions

How do I get started with Webflow Cloud storage and what are the three main storage options available?

What are the new LLMS.txt endpoints available for Enterprise customers and how do they work?

What changes are required for internal APIs affecting site data sync, and what is the migration timeline?

How can I use the MCP server with the Designer API, and what are the system requirements?

What are the breaking changes for CMS publishing on July 7, 2025, and how should I update my code?