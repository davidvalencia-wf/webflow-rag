---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/visibility
title: "Visibility | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Visibility property to your component to choose whether to show or hide elements in Webflow.

## Syntax

```
// Prop definition
props.Visibility({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: boolean,
})

// Prop value
boolean
```

### Prop definition

Define the Visibility prop in your Webflow code component with a name. Optionally, you can add a group, tooltip text, and a default value.

```
props.Visibility({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: boolean,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)
- `defaultValue`: Default visibility state. (optional)

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Visibility property",
    props: {
        isVisible: props.Visibility({
            name: "Show Element",
            group: "Display",
            defaultValue: true
        })
    }
});
```

### Prop value

The Visibility prop provides a `boolean` value to your React component.

PropType.Visibility

```
boolean
```

#### Properties

- `n/a`

#### Webflow properties panel

![Visibility property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/visibility.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
isVisible?: boolean;
}

export const MyComponent = ({ isVisible }: MyComponentProps) => {
if (!isVisible) return null;

return (
    <div className="element">
    This element is visible
    </div>
);
}
```

```
## When to use

Use a Visibility prop when you want designers to:
- Show or hide elements conditionally
- Control component display states
- Create toggled content
- Build conditional layouts

## Best practices
- Provide sensible default values
- Handle hidden states gracefully
- Consider accessibility implications
```

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