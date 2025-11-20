---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/boolean
title: "Boolean | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Boolean property to your component to change behavior, interactivity, or styles.

Use a Boolean prop when you want designers to:

- Enable or disable a feature
- Toggle styling variations
- Create behavior variations

## Syntax

```
// Prop definition
props.Boolean({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: boolean,
    trueLabel?: string,
    falseLabel?: string,
})

// Prop value
boolean
```

### Prop definition

Define the Boolean prop in your Webflow code component with a name.

Optionally, you can add a default value and labels for the true and false values. Additionally, you can add a group and tooltip text.

```
props.Boolean({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: boolean,
    trueLabel?: string,
    falseLabel?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property (optional).
- `tooltip`: The tooltip for this property (optional).
- `defaultValue`: Default value for all component instances. (optional)
- `trueLabel`: Label for the `true` value in the props panel. (optional)
- `falseLabel`: Label for the `false` value in the props panel. (optional)

#### Example

MyComponent.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from "./MyComponent";

export default declareComponent(MyComponent,    {
    name: "MyComponent",
    description: "A component with boolean and text properties",
    props: {
        showDetails: props.Boolean({
            name: "Show Details",
            group: "Content",
            defaultValue: false,
            trueLabel: "Show Details",
            falseLabel: "Hide Details"
        })
    }
});
```

### Prop value

The Boolean prop provides a `boolean` value to your React component:

PropType.Boolean

```
boolean
```

#### Properties

- `n/a`

#### Webflow properties panel

![Boolean property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/boolean.png)

#### Example

MyComponent.tsx

```
import React from "react";

interface MyComponentProps {
  showDetails?: boolean;
}

export const MyComponent = ({ showDetails }: MyComponentProps) => {
  return (
    <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>Welcome Explorers!</h3>
      <p>Unlock your potential with our amazing features.</p>

      {/* When showDetails is true, reveal additional content */}
      {showDetails && (
        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
          <p><strong>🚀 Ready to soar higher?</strong></p>
          <ul>
            <li>Discover hidden capabilities that transform your experience</li>
            <li>Access exclusive insights that drive success</li>
            <li>Unleash the full power of what's possible</li>
          </ul>
        </div>
      )}
    </div>
  );
}
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