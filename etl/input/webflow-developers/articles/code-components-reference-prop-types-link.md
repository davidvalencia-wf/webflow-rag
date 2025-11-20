---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/link
title: "Link | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Link property to your component so designers can create clickable links with full control over URL, target behavior, and preload settings.

## Syntax

```
// Prop definition
props.Link({
    name: string,
    group?: string,
    tooltip?: string,
})

// Prop value
{
    href: string,
    target?: "_self" | "_blank" | string,
    preload?: "prerender" | "prefetch" | "none" | string,
}
```

### Prop definition

Define the Link prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.Link({
    name: string,
    group?: string,
    tooltip?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property (optional).
- `tooltip`: The tooltip for this property (optional).

### Prop value

The Link prop value provides an object to your React component with the following properties:

PropType.Link

```
{
    href: string,
    target?: "_self" | "_blank" | string,
    preload?: "prerender" | "prefetch" | "none" | string,
}
```

#### Properties returned to the React component

- `href`: The URL destination.
- `target`: How the link opens (optional).
- `preload`: Preload behavior (optional).

#### Webflow properties panel

![Link property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/link.png)

#### Examples

###### Direct mapping

###### Prop mapping

Define a Link property in your Webflow component, that directly maps to a link property in your React component. If your React component expects a `href` and `target` property, see the [prop mapping](https://developers.webflow.com/code-components/reference/prop-types/link#prop-mapping) example below.

Button.webflow.tsxButton.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from "./Button";
// import "../styles/globals.css";

export default declareComponent(Button, {
name: "Button",
description: "A Button component with a Link property",
props: {
    link: props.Link({
        name: "Button Link",
        group: "Navigation"
    }),
    text: props.Text({
        name: "Button Text",
        group: "Navigation"
    })
}
});
```

## When to use

Use a Link prop when you want designers to:

- Set URLs for buttons or text links
- Control link behavior (same tab vs new tab)
- Create navigation components

## Best practices

- Handle missing links gracefully
- Add proper rel attributes for security
- Consider accessibility for link text

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