---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/number
title: "Number | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Number property to your component so designers can input numeric values.

## Syntax

```
// Prop definition
props.Number({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: number,
    min?: number,
    max?: number,
    decimals?: number,
})

// Prop value
number
```

### Prop definition

Define the Number prop in your Webflow code component with a name. Optionally, you can add a group, tooltip text, and a default value, as well as numeric constraints like min, max, and decimals.

```
props.Number({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: number,
    min?: number,
    max?: number,
    decimals?: number,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)
- `defaultValue`: Default value for all component instances. (optional)
- `min`: Minimum value allowed. (optional)
- `max`: Maximum value allowed. (optional)
- `decimals`: Maximum number of decimal places. (optional)

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";
// import "../styles/globals.css";

export default declareComponent(MyComponent, {
    name: "MyComponent",
    description: "A component with a Number property",
    props: {
        count: props.Number({
            name: "Item Count",
            group: "Settings",
            defaultValue: 5,
            min: 1,
            max: 100,
            decimals: 0
        })
    }
});
```

### Prop value

The Number prop provides a numeric value to your React component.

PropType.Number

```
number
```

#### Properties

- `n/a`

#### Webflow properties panel

![Number property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/number.png)

#### Example

MyComponent.tsx

```
import React from "react";
// import "../styles/globals.css";

interface MyComponentProps {
count?: number;
}

export const MyComponent = ({ count }: MyComponentProps) => {
return (
    <div className="counter">
    <span>Count: {count}</span>
    </div>
);
}
```

## When to use

Use a Number prop when you want designers to:

- Set numeric values like counts, sizes, or durations
- Control values within specific ranges
- Provide sensible defaults for components
- Limit decimal precision for cleaner data

## Best practices

- Set appropriate min/max values for your use case
- Use decimals: 0 for whole numbers, 1-2 for currency/percentages
- Provide meaningful default values
- Consider the range designers will need

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