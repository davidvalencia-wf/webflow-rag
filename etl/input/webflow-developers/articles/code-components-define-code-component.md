---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/define-code-component
title: "Define a code component | Webflow Developer Documentation"
published: 2025-11-17
---

A code component definition is a file that tells Webflow how to use your React component on the Webflow canvas. It defines which properties designers can configure and how they’ll appear in the designer.

Every code component definition is a `.webflow.tsx` file that uses the `declareComponent` function to define the component.

Button.webflow.tsxButton.tsx

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

## File structure and naming

Code component definition files follow specific extension and naming patterns:

- **File extension**: `.webflow.tsx` or `.webflow.ts`
- **Naming pattern**: `ComponentName.webflow.tsx` (where `ComponentName` matches your React component)
- **Location**: Typically alongside your React component file

If you have specific naming needs, you can [configure this pattern in `webflow.json`.](https://developers.webflow.com/code-components/installation) It’s recommended to create your code component file alongside your React component, adding `.webflow` to the name. For example, `Button.webflow.tsx` for `Button.tsx`.

##### File names are the unique identifier of your code component

Renaming a definition file creates a new component and removes the old one from your library. If designers are already using the old component in their projects, those instances will break and need to be manually replaced.

## Imports

Every code component definition file needs to import your React component, Webflow functions, and any styles you want to apply to the component.

Button.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles
```

##### Styling components

Code components render in Shadow DOM, encapsulating them from the rest of the page, which impacts several CSS capabilities.

[Learn more about styling components →](https://developers.webflow.com/code-components/styling-components).

## Declare component

The `declareComponent` function is used to create a code component definition. It takes two arguments:

- The React component
- An object with: Component metadata, prop definitions, and optional configuration

### Component metadata

The metadata properties define how your component appears in the Webflow designer:

Button.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/global.css'; // Import global styles

// Declare the component
export default declareComponent(Button, {

  // Component metadata
  name: "Button",
  description: "A button component with a text and a style variant",
  group: "Interactive",
});
```

- **`name`**: The name designers see in the component panel
- **`description?`**: Description to provide context for the component’s purpose (optional)
- **`group?`**: Organize components into groups in the component panel (optional)

### Prop definitions

The `props` object defines which properties of your React component a designer can edit in Webflow. Declare a prop for each editable property in your React component and provide metadata that will appear in the designer. To see a list of all available prop types and their configuration options, see the [prop types reference. →](https://developers.webflow.com/code-components/reference/prop-types)

The below examples show a React component, its corresponding code component definition file, and how it appears in Webflow.

###### React component

###### Code component

###### Component in Webflow

This React component expects a `buttonText` property, and a `variant` property.

Button.tsx

```
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ text, variant }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
    >
      {text}
    </button>
  );
};
```

See more examples in the [prop types reference. →](https://developers.webflow.com/code-components/reference/prop-types)

### Options

The `options` object is used to configure the component for more advanced use cases. Options accepts the following properties:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `applyTagSelectors` | boolean | `false` | Whether to apply tag selectors to the component. |
| `ssr` | boolean | `true` | Whether to disable server-side rendering. |

#### Tag selectors

Styles targeting a tag selector (for example, `h1`, `p`, `button`) can be automatically provided to the Shadow DOM with the `applyTagSelectors` option. This is helpful for styling components with CSS selectors.

[See more about styling components in the styling documentation. →](https://developers.webflow.com/code-components/styling-components)

#### Server-side rendering (SSR)

By default, Webflow will load your component on the server. This means that the component will be rendered on the server, but the DOM will be hydrated on the client-side. This is helpful for improving the performance of your component.

You can disable this behavior by setting `ssr` to `false`.

## Best practices

###### File naming and organization

- **Use consistent naming**: `ComponentName.webflow.tsx` for all code component definitions
- **Keep code component definitions close**: Place `.webflow.tsx` files next to their React components

###### Component metadata

- **Use clear names**: Make it obvious what the component does
- **Add descriptions**: Help designers understand the component’s purpose
- **Group logically**: Use groups to organize components in the panel

###### Prop definitions

- **Provide helpful defaults**: Make components work immediately when added
- **Use descriptive names**: The `name` property appears in the designer
- **Group related props**: Consider how props will appear together in the designer

## Next steps

Now that you understand code component definitions, you can:

- **[Understand styling](https://developers.webflow.com/code-components/styling-components)** \- Learn about how to style your components.
- **[Explore prop types](https://developers.webflow.com/code-components/reference/prop-types)** \- Learn about all available prop types
- **[Configure bundling](https://developers.webflow.com/code-components/bundling-and-import)** \- Set up your build process
- **[Importing your components](https://developers.webflow.com/code-components/bundling-and-import)** \- Share your components with designers and other developers

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