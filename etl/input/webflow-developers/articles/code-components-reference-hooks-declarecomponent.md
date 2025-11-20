---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/hooks/declareComponent
title: "Define a code component | Webflow Developer Documentation"
published: 2025-11-17
---

## `declareComponent(Component, data)`

The `declareComponent` function is used to create a code component declaration. See the [declare code component guide](https://developers.webflow.com/code-components/define-code-component) for more information.

## Syntax

```
declareComponent(Component, data): void;
```

### Parameters

- **`Component`**: The React component to declare
- **`Data`**: An object with: Component metadata, prop definitions, and optional configurations

#### Data object

The `data` object is used to define the component’s metadata, prop definitions, and optional configurations. It takes the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the component |
| `description?` | string | A description of the component (optional) |
| `group?` | string | Group of the component in the component panel (optional) |
| `props` | object | Props for the user to edit in Webflow. See the [prop types reference](https://developers.webflow.com/code-components/reference/prop-types) for more information. |
| `options?` | object | Optional configurations including applying tag selectors, and managing SSR. |

## Example

Button.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {

  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",

  // Prop definitions
  props: {
    text: props.Text({
        name: "Button Text",
        defaultValue: "Click me"
    }),
    variant: props.Variant({
        name: "Style",
        options: ["primary", "secondary"],
        defaultValue: "primary"
    }),
  },
  // Optional configuration
  options: {
    applyTagSelectors: true,
  },
});
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