---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/text-node
title: "Text Node | Webflow Developer Documentation"
published: 2025-11-17
---

Add a Text Node property to your component. In the Webflow designer, designers can edit the text content of the component on the canvas or via the properties panel.

## Syntax

```
// Prop definition
props.TextNode({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: string,
    multiline?: boolean,
})

// Prop value
ReactNode
```

### Prop definition

Define the Text Node prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.TextNode({
    name: string,
    group?: string,
    tooltip?: string,
    defaultValue?: string,
    multiline?: boolean,
})
```

#### Properties

- `name`: The name for the property.
- `multiline`: Whether the property allows multiple lines of text. (optional)
- `group`: The group for this property. (optional)
- `tooltip`: The tooltip for the property. (optional)
- `defaultValue`: Default value for all component instances. (optional)

#### Example

InfoSection.webflow.tsx

```
import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { InfoSection } from "./InfoSection";
// import "../styles/globals.css";

export default declareComponent(InfoSection, {
  name: "Info Section",
  description: "A component with a Text Node property",
  props: {
    title: props.TextNode({
      name: "Title",
      group: "Content",
      defaultValue: "Hello World",
    }),
    description: props.TextNode({
      name: "Description",
      multiline: true,
      group: "Content",
      defaultValue: "This is my first Webflow Code Component",
    }),
  },
});
```

### Prop value

The Text Node prop provides formatted HTML content to your React component as a `ReactNode`.

```
ReactNode
```

#### Properties

- `n/a`

#### Webflow properties panel

![Text Node property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/text-node.png)

#### Example

InfoSection.tsx

```
import React from "react";

interface InfoSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export const InfoSection = ({ title, description }: InfoSectionProps) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );
};
```

## When to use

Use a Text Node prop when you want designers to:

- Edit text content in the webflow editor
- Create text content with HTML markup
- Add structured content like headings and lists

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