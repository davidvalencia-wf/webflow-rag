---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/text
title: "Text | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Text property to your component for designers to input plain text content.

## Syntax

```
// Prop definition
props.Text({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: string,
})

// Prop value
string
```

### Prop Definition

Define the Text prop in your Webflow code component with a name. Optionally, you can add a default value, group, and tooltip text.

```
props.Text({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)
- `defaultValue`: Default value for all component instances. (optional)

#### Example

MyComponent.Webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Text property",
    props: {
        title: props.Text({
            name: "Title",
            group: "Content",
            defaultValue: "Hello World!"
        })
    }
});
```

### Prop Value

The Text prop provides a string value to your React component.

PropType.Text

```
string
```

#### Properties

- `n/a`

#### Webflow properties panel

![Text property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/text.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
title?: string;
}

export const MyComponent = ({ title }: MyComponentProps) => {
return (
    <h1 className="title">
    {title}
    </h1>
);
}
```

## When to use

Use a Text prop when you want designers to:

- Input simple text content
- Set titles, labels, or descriptions

## Best practices

- Provide meaningful default values so the component renders when added to the canvas
- Use descriptive prop names

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