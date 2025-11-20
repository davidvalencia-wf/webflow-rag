---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/slot
title: "Slot | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Slot property to your component so designers can insert any child component

## Syntax

```
// Prop definition
props.Slot({
    name: string,
    group?: string,
    tooltip?: string,
})

// Prop value
ReactNode
```

### Prop definition

Define the Slot prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.Slot({
    name: string,
    group?: string,
    tooltip?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Slot property",
    props: {
        children: props.Slot({
            name: "Content",
            group: "Content"
        })
    }
});
```

### Prop value

The Slot prop provides child components to your React component as a single `ReactNode` object.

PropType.Slot

```
ReactNode
```

#### Properties

- `n/a`

#### Webflow properties panel

![Slot property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/slot.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
children?: React.ReactNode;
}

export const MyComponent = ({ children }: MyComponentProps) => {
return (
    <div className="container">
    {children}
    </div>
);
}
```

## When to use

Use a Slot prop when you want designers to:

- Insert child components
- Create flexible layout containers
- Build wrapper components

## Best practices

- Handle missing children gracefully
- Consider layout and spacing for child content
- Test with various component types

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