---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/id
title: "ID | Webflow Developer Documentation"
published: 2025-11-17
---

Add an ID property to your component so designers can set unique identifiers on HTML elements.

The ID prop creates a text input for element IDs, making it easy to target elements with CSS or JavaScript.

## Syntax

```
// Prop definition
props.Id({
    name: string,
    group?: string,
    tooltip?: string,
})

// Prop value
string
```

### Prop definition

Define the ID prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.Id({
    name: string,
    group?: string,
    tooltip?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property (optional).
- `tooltip`: The tooltip for this property (optional).

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent,    {
    name: "MyComponent",
    description: "A component with an ID property",
    props: {
        id: props.Id({
            name: "Element ID",
            group: "Info"
        })
    }
});
```

### Prop value

The ID prop provides a string to your React component:

PropType.Id

```
string
```

#### Properties

- `n/a`

#### Webflow properties panel

![ID property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/id.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
id?: string;
}

export const MyComponent = ({ id }: MyComponentProps) => {
return (
    <div id={id}>
    {/* Component content */}
    </div>
);
}
```

## When to use

Use an ID prop when you want designers to:

- Set unique identifiers for CSS targeting
- Connect form labels to inputs
- Enable JavaScript interactions

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