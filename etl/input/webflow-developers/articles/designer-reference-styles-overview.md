---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/styles-overview
title: "Styles | Webflow Developer Documentation"
published: 2025-11-17
---

Customize the look and feel of Elements with Styles. Styles, [also referred to as Classes in the Designer](https://university.webflow.com/lesson/web-styling-using-classes?topics=layout-design), save styling information that can be applied to as many elements as you want across a site.

## Working with styles

[1](https://developers.webflow.com/designer/reference/styles-overview#create-a-style)

### Create a style

To create a style, you need to provide a unique name. The Webflow API prevents creating styles with duplicate names to maintain uniqueness across your project.

```
// Create new style
const newStyle = await webflow.createStyle(styleName);
```

[2](https://developers.webflow.com/designer/reference/styles-overview#add-style-properties)

### Add style properties

Add CSS properties to a style. [Refer to this list of Style Properties](https://developers.webflow.com/designer/reference/style-properties) for a full index of properties that can added to a style in Webflow.

You can add properties to a style in two ways:

###### Set a single property

###### Set multiple properties

The [`set property`](https://developers.webflow.com/designer/reference/set-style-property) method requires you to pass a single property name and its corresponding value as `string` parameters. Additionally, you can include an optional `options` parameter, [which we cover below.](https://developers.webflow.com/designer/reference/styles-overview#responsive-styling-with-breakpoints-and-pseudo-states)

```
// Create new style
const newStyle = await webflow.createStyle("My Custom Style");

// Set a single property
await newStyle.setProperty("background-color", "blue")
```

[3](https://developers.webflow.com/designer/reference/styles-overview#apply-styles-to-elements)

### Apply styles to elements

Once you’ve created and modified a style, you can apply it to one or more elements.

```
// Get selected element
const selectedElement = await webflow.getSelectedElement()

// Get style
const myStyle = await webflow.getStyleByName("My Custom Style");

// Apply style to element
await selectedElement.setStyles([newStyle])
```

## Responsive styling with [breakpoints and pseudo states](https://university.webflow.com/lesson/intro-to-breakpoints?topics%3Dlayout-design&sa=D&source=docs&ust=1706631470173943&usg=AOvVaw1itdh_-wDf_3NgNzP2w-N8)

Webflow’s responsive design features enable customization of style properties for different contexts, such as varying screen sizes or specific states like `:hover` or `:active`.

Pass the `options` parameter when setting style properties to customize the style for different breakpoints and pseudo-states.

```
{
  breakpoint?: BreakpointId
  pseudo?: PseudoStateKey
}
```

- **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.

```
type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
```

- **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.

```
type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
    "first-child" | "last-child" | "hover" | "active" | "pressed" |
    "visited" | "focus" | "focus-visible" | "focus-within" |
    "placeholder" | "empty" | "before" | "after"
```

**Example**

```
// Create new style
const newStyle = await webflow.createStyle("My Custom Style");

// Property Map for XXL Breakpoint
const propertyMapXXL = {
  'font-size': "16px",
  'font-weight': "bold",
}

// Property Map for Medium Breakpoint
const propertyMapMedium = {
  'font-size': "12px",
  'font-weight': "bold",
}

// Set style properties for XXL Breakpoint and hover state
await newStyle.setProperties(propertyMapXXL, {breakpoint: "xxl", pseudo: "hover"})

// Set styles for Medium Breakpoint and hover state
await newStyle.setProperties(propertyMapMedium, {breakpoint: "medium", pseudo: "hover"})
```

### Breakpoint IDs

| Breakpoint ID | Description |
| --- | --- |
| `xxl` | Very large screens or high-resolution monitors |
| `xl` | Large desktop monitors |
| `large` | Standard desktop monitors |
| `main` | Suitable for smaller desktops or large tablets |
| `medium` | Suitable for tablets and some large phones |
| `small` | Suitable for larger mobile devices |
| `tiny` | Suitable for the smallest mobile devices |

### Pseudo-State Keys

| Pseudo-State | Designer State | Description |
| --- | --- | --- |
| `hover` | Hover | Element is hovered over by the mouse |
| `pressed` | Pressed | Element is in pressed state |
| `visited` | Visited | **Link** element has been visited |
| `focus` | Focused | Element has keyboard/input focus |
| `focus-visible` | Focused (Keyboard) | Element has keyboard focus with visible indicator |
| `focus-within` | — | Element or its descendant has focus |
| `placeholder` | Placeholder | Placeholder text in form block inputs |
| `first-child` | First Item | First Collection Item in a collection list |
| `last-child` | Last Item | Last Collection Item in a collection list |
| `nth-child(odd)` | Odd Items | Odd-numbered Collection Item in a collection list |
| `nth-child(even)` | Even Items | Even-numbered Collection Item in a collection list |

## FAQs

###### Can I style HTML Tags with the Webflow API?

No, you can’t style HTML Tags with the Designer API. Currently, the Designer API only supports creating and applying CSS Classes.

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