---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/bundling-and-import
title: "Bundling and Import | Webflow Developer Documentation"
published: 2025-11-17
---

This reference covers bundling your React components and importing them to Webflow.

## Import

Import your components to Webflow using DevLink. DevLink bundles your component files and uploads them to your Workspace as a [shared library](https://help.webflow.com/hc/en-us/articles/33961343551763-Libraries).

Use the following command to import your components to Webflow:

```
npx webflow library share
```

### CI/CD pipelines

For automated workflows, add the `--no-input` flag to skip interactive prompts:

```
npx webflow library share --no-input
```

**Important:** Add change detection to prevent inadvertently removing components:

- Compare current library state with previous import
- Only share when components have actually changed

For more options, see the [Webflow CLI reference. →](https://developers.webflow.com/code-components/reference/cli).

## Bundling

Webflow uses Webpack to bundle your component libraries. During this process, the bundler handles TypeScript compilation, resolves all dependencies and imports, optimizes your code for production, and generates bundles ready for import.

The default configuration handles most use cases automatically. Extend it when you need:

- **Custom CSS processing**
- **Specialized file handling** (SVG, images, fonts)
- **Build optimizations** (tree shaking, code splitting)

To override the default configuration, see the guide on [Webpack configuration overrides](https://developers.webflow.com/code-components/bundling-and-import#overriding-the-default-webpack-configuration).

##### Using CSS frameworks and component libraries

If you’re using a CSS framework or component library, you may need to configure your project to handle the framework’s CSS. See the [frameworks and libraries guide](https://developers.webflow.com/code-components/frameworks-and-libraries) for more information.

### Bundle limits

Maximum bundle size: 50MB

## Debugging

This section provides common debugging techniques for troubleshooting the bundling process and resolving configuration issues.

### Disable minification

By default, the bundler minifies your code to reduce file size for production. To troubleshoot issues, you can disable minification in your webpack configuration.

This keeps your bundled code readable and ensures that any errors you see in the **browser’s developer console** will have accurate line numbers that map back to your original source code.

webpack.webflow.js

```
module.exports = {
    mode: "development",
  };

```

##### Include the Webpack configuration file in your \`webflow.json

When using a custom webpack configuration file, you must include the file in your `webflow.json` file by passing the path to the file in the `bundleConfig` property.

```
{
  "library": {
    "name": "My Library",
    "components": ["./src/components/**/*.webflow.{js,ts,tsx}"],
    "bundleConfig": "./webpack.webflow.js"
  }
}
```

### CSS modules

CSS Modules scope styles by generating unique class names, preventing conflicts between components.

By default, you must use bracket notation to access CSS classes:

Button.tsx

```
import * as styles from "./Button.module.css";

export const Button = (text: string) => {
    return (
        <a className={(styles as any)["my-button"]}>
            {text}
        </a>
    );
};
```

To enable dot notation, and to use the default import syntax for CSS modules, update the `css-loader` configuration:

webpack.webflow.js

```
module.exports = {
    module: {
      // Override the existing rules to modify CSS processing
      rules: (currentRules) => {
        return currentRules.map((rule) => {
          // Find the rule that handles CSS files
          if (
            rule.test instanceof RegExp &&
            rule.test.test("test.css") &&
            Array.isArray(rule.use)
          ) {

              for (const [index, loader] of rule.use.entries()) {

              // Find the css-loader
              if (typeof loader === "object" && loader?.ident === "css-loader") {

                // Preserve existing options and add a custom configuration
                const options =
                  typeof loader.options === "object" ? loader.options : {};
                rule.use[index] = {
                  ...loader,
                  options: {
                    ...options,
                    modules: {
                      exportLocalsConvention: "as-is", // Use original class names
                      namedExport: false, // ⚠️ Allow dot notation access
                    },
                  },
                };
              }
            }
          }
          return rule;
        });
      },
    },
  };

```

## Bundle locally

To test and debug your React components locally, you can bundle your library using the Webflow CLI command.

```
npx webflow library bundle --public-path http://localhost:4000/
```

The public path is the URL where you can serve your bundled library. The CLI will generate a `dist` folder with your bundled library.

To inspect the final configuration being used by webpack, use the `--debug-bundler` option.

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