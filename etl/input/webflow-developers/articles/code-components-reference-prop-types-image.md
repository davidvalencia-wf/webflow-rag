---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/prop-types/image
title: "Image | Webflow Developer Documentation"
published: 2025-11-17
---

Add an Image property to your component so designers can select images from their Webflow asset library.

## Syntax

```
// Prop definition
props.Image({
    name: string,
    group?: string,
    tooltip?: string,
})

// Props returned to the React component
{
    src: string;
    alt?: string;
}
```

### Prop definition

Define the Image prop in your Webflow code component with a name. Optionally, you can add a group and tooltip text.

```
props.Image({
    name: string,
    group?: string,
    tooltip?: string,
})
```

#### Properties

- `name`: The name for the property.
- `group`: The group for this property (optional).
- `tooltip`: The tooltip for this property (optional).

### Prop value

The Image prop provides both the image URL and alt text to your React component, making it easy to display dynamic images with proper accessibility.

PropType.Image

```
{
    src: string;
    alt?: string;
}
```

#### Properties returned to the React component

- `src`: The source URL of the image.
- `alt`: The alt text for the image (optional).

#### Webflow properties panel

![Image property in the Webflow panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/reference/prop-types/assets/image.png)

### Examples

###### Direct mapping

###### Prop mapping

Define an Image property in your Webflow component, that directly maps to an image property in your React component.

Hero.webflow.tsxHero.tsx

```
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Hero } from "./Hero";
// import "../styles/globals.css";

export default declareComponent(Hero, {
    name: "Hero",
    description: "A Hero component with an Image property",
    props: {
        image: props.Image({
            name: "Hero Image",
            group: "Content"
        })
    }
});
```

## When to use

Use an Image prop when you want designers to:

- Select images from their asset library
- Change images without touching code
- Set alt text for accessibility

## Best practices

- Handle missing images
- Use alt text for accessibility
- Consider responsive design needs

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