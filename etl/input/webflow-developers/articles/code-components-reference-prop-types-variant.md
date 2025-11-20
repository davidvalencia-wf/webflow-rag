---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/variant
title: "Variant | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Variant property to your component for designers to choose from a predefined list of options.

## Syntax

```
// Prop definition
props.Variant({
    name: string,
    options: string[],
    group?: string,
    tooltip?: string,
    defaultValue?: string,
})

// Prop value
string
```

### Prop Definition

Define the Variant prop in your Webflow code component with a name and list of options. Optionally, you can add a group, tooltip text, and a default value that matches one of the pre-defined options.

```
props.Variant({
    name: string,
    options: string[],
    group?: string,
    tooltip?: string,
    defaultValue?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)
- `options`: Array of available variant options.
- `defaultValue`: Default selected option. (optional)

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Variant property",
    props: {
        style: props.Variant({
            name: "Button Style",
            group: "Style",
            options: ["Primary", "Secondary", "Tertiary"],
            defaultValue: "Primary"
        })
    }
});
```

### Prop Value

The Variant prop provides a string value representing the selected option to your React component.

PropType.Variant

```
string
```

#### Properties

- `n/a`

#### Webflow properties panel

![Variant property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/variant.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
    style?: "Primary" | "Secondary" | "Tertiary";
}

export const MyComponent = ({ style }: MyComponentProps) => {
    return (
        <button className={`button button--${style?.toLowerCase()}`}>
        Click me
        </button>
    );
}
```

## When to use

Use a Variant prop when you want designers to:

- Choose from predefined visual styles
- Switch between component variations / themes
- Control component appearance

## Best practices

- Use clear, descriptive option names
- Provide a sensible default value
- Keep options list manageable

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