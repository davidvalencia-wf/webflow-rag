---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/rich-text
title: "Rich Text | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Rich Text property to your component so designers can create formatted content with HTML markup.

## Syntax

```
// Prop definition
props.RichText({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: string,
})

// Prop value
ReactNode
```

### Prop definition

Define the Rich Text prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.RichText({
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

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Rich Text property",
    props: {
        content: props.RichText({
            name: "Content",
            group: "Content"
        })
    }
});
```

### Prop value

The Rich Text prop provides formatted HTML content to your React component as a `ReactNode`.

PropType.RichText

```
ReactNode
```

#### Properties

- `n/a`

#### Webflow properties panel

![Rich Text property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/rich-text.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
content?: React.ReactNode;
}

export const MyComponent = ({ content }: MyComponentProps) => {
return (
    <div className="content-wrapper">
    {content}
    </div>
);
}
```

## When to use

Use a Rich Text prop when you want designers to:

- Create formatted content with bold, italic, links
- Add structured content like headings and lists
- Include HTML markup in their content

## Best practices

- Provide meaningful default values so the component renders when added to the canvas
- Handle missing content gracefully
- Consider content styling and layout
- Test with various HTML structures

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