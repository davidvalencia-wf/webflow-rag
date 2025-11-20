---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/introduction/quick-start
title: "How to import code components into Webflow | Webflow Developer Documentation"
published: 2025-11-17
---

In this quickstart guide, we’ll discuss how to import React components from an external codebase into Webflow using DevLink.

**What you’ll accomplish:**

- Set up your development environment
- Declare a Webflow code component with props
- Import your component library to Webflow
- Use your component in a Webflow project

## Before you start

Before running this quickstart, make sure you have:

- A Webflow account with either:
  - a Workspace on a Freelancer, Core, Growth, Agency, or Enterprise plan
  - a Webflow site with a CMS, Business, or Enterprise plan
- A Webflow site where you can test components
- Node.js 20+ and npm 10+ installed
- Basic familiarity with React components and TypeScript

## 1\. Setup your development environment

Set up your local development environment to create and share React components.

[1](https://developers.webflow.com/code-components/introduction/quick-start#setup-your-react-project)

### Setup your React project

DevLink is compatible with a wide variety of local setups. To get started, create a new React project.

**If you’re working with an existing repository, you can skip this step.**

```
npx create-react-app code-components
cd code-components
```

[2](https://developers.webflow.com/code-components/introduction/quick-start#install-the-webflow-cli)

### Install the Webflow CLI

Install the Webflow CLI and the necessary dependencies to create a code component library.

```
npm i --save-dev @webflow/webflow-cli @webflow/data-types @webflow/react
```

[3](https://developers.webflow.com/code-components/introduction/quick-start#create-a-webflow-configuration-file)

### Create a Webflow configuration file

Create a `webflow.json` file in the root of your repository. This file will define the configuration for your code component library.

webflow.json

```
{
    "library": {
        "name": "<Your Library Name>",
        "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"]
    }
}
```

Give your library a name and specify the path to your code component files.

[4](https://developers.webflow.com/code-components/introduction/quick-start#add-an-example-component-to-your-library)

### Add an example component to your library

In your editor, navigate to your src or components directory. Create a new file called `Badge.tsx`, and paste the following code. In the next step, you’ll create a code component definition file to map this component to a Webflow component.

Badge.tsx

```
import * as React from "react";

interface BadgeProps {
  text: string;
  variant: 'Light' | 'Dark';
}

export const Badge = ({ text, variant }: BadgeProps) => (
  <span
    style={{
      backgroundColor: variant === 'Light' ? '#eee' : '#000',
      borderRadius: '1em',
      color: variant === 'Light' ? '#000' : '#fff',
      display: 'inline-block',
      fontSize: '14px',
      lineHeight: 2,
      padding: '0 1em',
    }}
  >
    {text}
  </span>
);
```

## 2\. Define a Webflow code component

Create a code component definition file to map a React component to a Webflow component. In this step, you’ll create a `Badge` component with two props mapping to an example `Badge.tsx` component.

[1](https://developers.webflow.com/code-components/introduction/quick-start#create-a-code-component-file)

### Create a code component file

In your editor, navigate to the your `src` or components directory where you added your Badge component. Create a new file called `Badge.webflow.tsx`. This file will define how your Badge component appears in Webflow.

[2](https://developers.webflow.com/code-components/introduction/quick-start#import-the-react-component-and-webflow-functions)

### Import the React component and Webflow functions

Import the necessary dependencies to create your code component: the React component, [prop types](https://developers.webflow.com/code-components/reference/prop-types) and the `declareComponent` function.

Badge.webflow.tsx

```
import { Badge } from './Badge'; // Import your React component here
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';
```

[3](https://developers.webflow.com/code-components/introduction/quick-start#declare-the-component)

### Declare the component

Declare the code component using the `declareComponent` function.

Badge.webflow.tsx

```
import { Badge } from './Badge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Badge, {
    name: 'Badge',
    description: 'A badge with variants',
    group: 'Info',
});
```

The `declareComponent` function takes two parameters:

- Your React component (`Badge`)
- Configuration options:
  - `name`: The name of the component
  - `description?`: A description of the component (optional)
  - `group?`: The group the component belongs to (optional)
  - `props?`: The props of the component, **which we’ll define in the next step.** (optional)
  - `options?`: The options of the component, (optional)

For more information and detailed configuration options for code component imports, see the [component definition reference](https://developers.webflow.com/code-components/define-code-component).

[4](https://developers.webflow.com/code-components/introduction/quick-start#define-the-component-props)

### Define the component props

Add configurable properties that users can edit in the Webflow designer.

Add a `props` object to the `declareComponent` function. This object defines which properties designers can configure in the Webflow editor, and maps them to appropriate Webflow prop types using the `props` constructor.

Badge.webflow.tsx

```
import { Badge } from './Badge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Badge, {
    name: 'Badge',
    description: 'A badge with variants',
    group: 'Info',
    props: {
        text: props.Text({
            name: "Text",
            defaultValue: "Hello World",
        }),
        variant: props.Variant({
            name: "Variant",
            options: ["Light", "Dark"],
            defaultValue: "Light",
        }),
    },
});
```

This code component defines two props:

- `text`: A text field for the Badge content
- `variant`: A dropdown with predefined style options

## 3\. Share your library to Webflow

In your terminal, run the following command to upload your library:

```
npx webflow library share
```

The Webflow CLI will:

- **Authorize your workspace:** The CLI will check for a Workspace authentication token in your `.env` file. If one is not found, the CLI will prompt you to authenticate by opening a browser window to the Workspace authorization page. **Authorize a workspace to continue.**
- **Bundle your library:** The CLI will bundle your library, and ask you to confirm the components you want to share.
- **Upload your library to your Workspace**

For more information and detailed configuration options for bundling and importing React components, see the [bundling and import reference. →](https://developers.webflow.com/code-components/bundling-and-import)

## 4\. Use the component on your Webflow site

Add your component to the canvas and update the props to customize the component.

[1](https://developers.webflow.com/code-components/introduction/quick-start#install-the-library-on-your-webflow-site)

### Install the library on your Webflow site

Install the library on any site in your Workspace to start using your React components.

1. Open any Webflow site in your workspace.

2. Open the Libraries panel by pressing “L” or clicking the ![Resources icon](https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Resources.png) icon in the left sidebar.

![Available to install](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/introduction/assets/available-to-install.png)

3. Find your library in the list of available libraries.

4. Install the library by clicking the **Install** icon next to your library.

[2](https://developers.webflow.com/code-components/introduction/quick-start#open-the-components-panel)

### Open the Components panel

Open the Components panel by pressing “⇧C” or clicking the
![Components icon](https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Components.svg) icon in the left sidebar.

Scroll to the section for the library you just installed. You should see your “Badge” component listed under the “Info” group.

![Components panel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/introduction/assets/components-panel.png)

[3](https://developers.webflow.com/code-components/introduction/quick-start#add-the-component-to-your-page)

### Add the component to your page

Click and drag the Badge component from the components panel onto your page. The component will appear with its default text and styling.

[4](https://developers.webflow.com/code-components/introduction/quick-start#customize-the-component)

### Customize the component

Customize your component in the Properties panel on the right. You’ll see two configurable properties:

- **Text**: Change the text content of the Badge
- **Variant**: Select from Light or Dark styling

![Badge component](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/code-components/pages/introduction/assets/badge.png)

Try changing the text to “Welcome!” and selecting a different variant to see your component update in real-time.

## Congratulations

You’ve successfully created and shared a code component library for your Webflow projects! You now know how to:

- Set up a development environment for React components
- Declare a Webflow React component with configurable properties
- Share component libraries to Webflow via DevLink
- Use custom components in your Webflow projects

## Next steps

Now that you’ve created your first code component, explore these resources to build more advanced components:

### Learn the fundamentals

- [**Define a code component**](https://developers.webflow.com/code-components/define-code-component)

Learn how code components work and their architecture
- [**Explore prop types**](https://developers.webflow.com/code-components/reference/prop-types)

Explore all available prop types for creating configurable components
- [**Learn about the Webflow CLI**](https://developers.webflow.com/code-components/reference/cli)

Learn more about the Webflow CLI commands

### Advanced configuration

- [**Installation and setup**](https://developers.webflow.com/code-components/installation)

Learn how to configure your existing codebase for component import.
- [**Configure code components to work with popular frameworks and libraries**](https://developers.webflow.com/code-components/frameworks-and-libraries)

Learn how to use CSS frameworks like **Tailwind CSS**, tools like **Shadcn/UI**, and component libraries like **Material UI** with code components.
- [**Configure bundling and import**](https://developers.webflow.com/code-components/bundling-and-import)

Explore advanced configuration options for bundling and importing React components.

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

![Resources icon](https://dhygzobemt712.cloudfront.net/Icons/Light/32px/Resources.png)