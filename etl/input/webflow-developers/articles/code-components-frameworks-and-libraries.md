---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/frameworks-and-libraries
title: "Frameworks and libraries | Webflow Developer Documentation"
published: 2025-11-17
---

Code Components work with a wide range of styling approaches, including CSS preprocessors, utility frameworks, and component/style libraries.

Because Code Components render inside a [Shadow DOM](https://developers.webflow.com/code-components/component-architecture#shadow-dom-and-react-roots), some tools that inject styles into the global `document.head` need additional configuration to scope styles correctly. Webflow provides utilities for popular CSS-in-JS libraries (e.g. Emotion, styled-components) so they can inject styles directly into the Shadow Root.

Most setups just require a small addition to your [webpack configuration](https://developers.webflow.com/code-components/webpack-configuration-overrides) and an import in your component. For CSS-in-JS solutions, you’ll wrap your components in a Shadow DOM provider.

## CSS frameworks

###### Tailwind CSS

To use Tailwind CSS with your code components, configure PostCSS to process Tailwind classes:

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-tailwind-css)

### Install Tailwind CSS

Install Tailwind CSS and its PostCSS plugin:

```
npm install tailwindcss @tailwindcss/postcss postcss
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#configure-postcss)

### Configure PostCSS

Add the Tailwind PostCSS plugin to your `postcss.config.mjs` file:

postcss.config.mjs

```
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

[3](https://developers.webflow.com/code-components/frameworks-and-libraries#import-tailwind-styles)

### Import Tailwind styles

Import Tailwind in your main CSS file:

globals.css

```
@import "tailwindcss";
```

[4](https://developers.webflow.com/code-components/frameworks-and-libraries#import-styles-in-your-component)

### Import styles in your component

Import your CSS file in each code component:

Badge.webflow.tsx

```
import { Badge } from './Badge';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

import './globals.css'; // Import your styles

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

[5](https://developers.webflow.com/code-components/frameworks-and-libraries#use-tailwind-classes)

### Use Tailwind classes

Now you can use Tailwind utility classes in your components:

Badge.tsx

```
import * as React from "react";

interface BadgeProps {
  text: string;
  variant: 'Light' | 'Dark';
}

export const Badge = ({ text, variant }: BadgeProps) => (
  <span
    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
      variant === 'Light'
        ? 'bg-gray-100 text-gray-800'
        : 'bg-gray-800 text-white'
    }`}
  >
    {text}
  </span>
);
```

###### styled-components

To use styled-components with code components, install the `@webflow/styled-components-utils` package and wrap your component in the `StyledComponentsShadowDomProvider`.

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-the-styled-components-utility-library)

### Install the styled-components utility library

Install the utility library:

```
npm i @webflow/styled-components-utils
```

This package requires the following peer dependencies:

```
npm i styled-components react react-dom
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#wrap-your-component-in-the-shadow-dom-provider)

### Wrap your component in the Shadow DOM provider

In your React component, wrap your component in the `StyledComponentsShadowDomProvider` component:

Button.tsxButton.webflow.tsx

```
import React from "react";
import { StyledComponentsShadowDomProvider } from "@webflow/styled-components-utils";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #007bff;
`;

interface ButtonProps {
  buttonText: string;
}

export const Button = ({ buttonText }: ButtonProps) => {
  return (
    <StyledComponentsShadowDomProvider>
      <StyledButton>{buttonText}</StyledButton>
    </StyledComponentsShadowDomProvider>
  );
}
```

###### Emotion

To use Emotion with code components, install the [`@webflow/emotion-utils`](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme) package and wrap your components in the [EmotionCacheShadowDomProvider](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme). The provider automatically detects whether it’s running inside a Shadow DOM and configures Emotion’s cache accordingly. When inside a Shadow DOM, it injects styles into the Shadow Root; otherwise, it falls back to the document head.

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-the-emotion-utility-library)

### Install the Emotion utility library

In your terminal, run the following command to install the Emotion utility package:

```
npm i @webflow/emotion-utils
```

This package requires the following peer dependencies:

```
npm i @emotion/cache @emotion/react react react-dom
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#wrap-your-react-component-in-the-shadow-dom-provider)

### Wrap your React component in the Shadow DOM provider

In your React component, wrap your component in the `EmotionCacheShadowDomProvider` component:

Button.tsxButton.webflow.tsx

```
import React from "react";
import { EmotionCacheShadowDomProvider } from "@webflow/emotion-utils";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  background-color: #007bff;
`;

interface ButtonProps {
  buttonText: string;
}

export const Button = ({ buttonText }: ButtonProps) => {
  return (
    <EmotionCacheShadowDomProvider>
      <StyledButton>{buttonText}</StyledButton>
    </EmotionCacheShadowDomProvider>
  );
}
```

## Component libraries

###### Material UI

To use Material UI with Emotion, install the [`@webflow/emotion-utils`](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme) package and wrap your components in the [EmotionCacheShadowDomProvider](https://www.npmjs.com/package/@webflow/emotion-utils?activeTab=readme). The provider automatically detects whether it’s running inside a Shadow DOM and configures Emotion’s cache accordingly. When inside a Shadow DOM, it injects styles into the Shadow Root, otherwise, it falls back to the document head.

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-the-emotion-utility-library-1)

### Install the Emotion utility library

In your terminal, run the following command to install the Emotion utility package:

```
npm i @webflow/emotion-utils
```

This package requires the following peer dependencies:

```
npm i @mui/material @emotion/react @emotion/cache
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#wrap-your-component-in-the-shadow-dom-provider-1)

### Wrap your component in the Shadow DOM provider

In your React component, wrap your component in the `EmotionCacheShadowDomProvider` component:

Button.tsxButton.webflow.tsx

```
import React from "react";
import { Button } from "@mui/material";
import { EmotionCacheShadowDomProvider } from "@webflow/emotion-utils";

interface ButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Button variant style */
  variant?: "text" | "outlined" | "contained";
  /** Button color */
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  /** Click handler */
  onClick?: () => void;
}

/**
 * A customizable button component built on Material-UI
 */
export const CustomButton = ({
  children,
  variant = "contained",
  color = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <EmotionCacheShadowDomProvider>
      <Button
        variant={variant}
        color={color}
        onClick={onClick}
      >
        {children}
      </Button>
    </EmotionCacheShadowDomProvider>
  );
};
```

###### Shadcn/UI

Shadcn/UI is a component library built on Tailwind CSS that provides pre-built, accessible React components. It works with code components but requires path alias configuration. Follow these steps after setting up Tailwind CSS:

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#configure-path-aliases)

### Configure path aliases

Shadcn/UI uses path aliases that need to be configured in your webpack setup. Add this to your webpack configuration:

webpack.webflow.js

```
module.exports = {
    resolve: {
        alias: {
            "@": process.cwd(), // Maps @ to your project root
        },
    },
};

```

For detailed webpack configuration options, see the [bundling and import guide](https://developers.webflow.com/code-components/bundling-and-import).

## Preprocessors & post-processing

###### Sass

Configure your project to use Sass with the following steps:

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-the-sass-loaders)

### Install the Sass loaders

Install the loaders as development dependencies:

```
npm install --save-dev sass sass-loader
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#create-a-custom-webpack-configuration)

### Create a custom webpack configuration

Create a `webpack.webflow.js` file to customize the webpack configuration to use the Sass loader:

webpack.webflow.js

```
module.exports = {
module: {
        rules: (currentRules) => {
        const currentCSSRule = currentRules.find(
            (rule) =>
            rule.test instanceof RegExp &&
            rule.test.test("test.css") &&
            Array.isArray(rule.use)
        );
        return [\
            ...currentRules,\
            {\
            test: /\.scss$/,\
            use: [...currentCSSRule.use, "sass-loader"],\
            },\
        ];
        },
    }
}
```

[3](https://developers.webflow.com/code-components/frameworks-and-libraries#update-your-webflow-configuration)

### Update your Webflow configuration

Update your `webflow.json` file to use the custom webpack configuration:

webflow.json

```
{
    "library": {
      "name": "React Components Library",
      "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
      "bundleConfig": "./webpack.webflow.js"
    }
  }

```

[4](https://developers.webflow.com/code-components/frameworks-and-libraries#use-sass-in-your-code-component)

### Use Sass in your code component

Import Sass in your code component definition file:

src/components/Button.webflow.tsx

```
import '../styles/button.scss';

// Declare the component
```

###### Less

Configure your project to use Less with the following steps:

[1](https://developers.webflow.com/code-components/frameworks-and-libraries#install-the-less-loaders)

### Install the Less loaders

Install the loaders as development dependencies:

```
npm install --save-dev less less-loader
```

[2](https://developers.webflow.com/code-components/frameworks-and-libraries#create-a-custom-webpack-configuration-1)

### Create a custom webpack configuration

Create a `webpack.webflow.js` file to customize the webpack configuration to use the Sass loader:

webpack.webflow.js

```
// webpack.webflow.js
module.exports = {
    module: {
      rules: (currentRules) => {
        const currentCSSRule = currentRules.find(
          (rule) =>
            rule.test instanceof RegExp &&
            rule.test.test("test.css") &&
            Array.isArray(rule.use)
        );

        return [\
          ...currentRules,\
          {\
            test: /\.less$/i,\
            use: [...currentCSSRule.use, "less-loader"],\
          },\
        ];
      },
    },
  };

```

[3](https://developers.webflow.com/code-components/frameworks-and-libraries#update-your-webflow-configuration-1)

### Update your Webflow configuration

Update your `webflow.json` file to use the custom webpack configuration:

webflow.json

```
{
    "library": {
      "name": "React Components Library",
      "components": ["./src/**/*.webflow.@(js|jsx|mjs|ts|tsx)"],
      "bundleConfig": "./webpack.webflow.js"
    }
  }

```

[4](https://developers.webflow.com/code-components/frameworks-and-libraries#use-less-in-your-code-component)

### Use less in your code component

Import less in your code component definition file:

src/components/Button.webflow.tsx

```
import '../styles/button.less';

// Declare the component
```

Learn about additional configuration options in the [bundling and import guide](https://developers.webflow.com/code-components/bundling-and-import).

## Next steps

- [Declare your code component](https://developers.webflow.com/code-components/define-code-component)
- [Style your React component](https://developers.webflow.com/code-components/styling-components)
- [Deploy your code component](https://developers.webflow.com/code-components/bundling-and-import)

## Troubleshooting

###### Errors when sharing to Webflow

If you’re getting errors when sharing to Webflow, try the following:

- Ensure you’ve installed the Webflow CLI locally within the project. If you have a global installation, try running the command with `npx` to ensure the correct version is being used.

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