---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/usage/troubleshooting
title: "Troubleshooting Exported Components | Webflow Developer Documentation"
published: 2025-11-17
---

This guide covers common issues you might encounter when working with DevLink and provides solutions to help you resolve them.

## Authentication and setup

###### API token authentication failures

**Issue**: DevLink sync fails with authentication errors

**Solutions**:

1. Verify your Webflow API token has the correct permissions
2. Check that your token is properly stored in your `.env` file
3. Ensure the token is being accessed correctly in your `.webflowrc.js` / `webflow.json` file

###### Configuration File Location

**Issue**: The DevLink CLI can’t find your configuration

**Solutions**:

1. Ensure `.webflowrc.js` / `webflow.json` is in the root directory of your project
2. Check that the file has the correct name and extension
3. Verify the file has proper syntax

###### @/devlink not found

Many code examples in the DevLink guides reference importing DevLink components from an alias:

```
import { Button } from "@/devlink/Button";
```

You can set up your project to import via this alias in various ways once you’ve synced your components. Here are a few examples:

**Via `tsconfig.json`**

Update the `paths` in the `tsconfig.json` file to point to the correct location of your DevLink components.

tsconfig.json

```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/devlink": ["./devlink"],
      "@/devlink/*": ["./devlink/*"]
    }
  }
}
```

**Via Webpack**

Update the `resolve.alias` settings in your Webpack configuration to point to the correct location of your DevLink components.

webpack.config.js

```
const path = require('path');

module.exports = {
  // ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'devlink'),
    }
  }
}
```

## Component sync issues

###### Missing components

**Issue**: Some components aren’t exported from Webflow

**Solutions**:

1. Verify the elements are properly converted to Components in Webflow (not just elements on the canvas)
2. Check if the components use only [supported elements](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/component-architecture#supported-elements)
3. Ensure component names don’t contain special characters or spaces

###### Sync Process Failures

**Issue**: The sync process starts but fails to complete

**Solutions**:

1. Check for network connectivity issues
2. Verify you’re not exceeding API rate limits
3. Try syncing specific components instead of all at once

You can sync a specific component by name:

```
webflow devlink sync YourComponentName
```

## Styling and rendering issues

###### Missing Styles

**Issue**: Components don’t look the same as in Webflow

**Solutions**:

1. Ensure the DevLink `global.css` file is [imported at the application root](https://developers.webflow.com/devlink/docs/component-export/installation)
2. Verify the `DevLinkProvider` component is [wrapping your application at the root](https://developers.webflow.com/webflow-cloud/devlink/styling-and-interactions#handling-webflow-interactions)
3. Check for CSS conflicts with other styles in your application
4. Inspect the browser console for CSS-related errors

###### Font Loading Issues

**Issue**: Custom fonts don’t appear correctly

**Solutions**:

1. Check if the fonts are being loaded from the correct source
2. Ensure font imports in `global.css` are loading correctly
3. Verify fonts aren’t being blocked by CORS policies
4. Consider self-hosting the fonts if they’re from external sources
5. Make sure font weights and styles match those used in Webflow

###### Z-index Issues

**Issue**: Elements appearing behind or in front of others incorrectly

**Solutions**:

1. Check z-index values in the exported CSS
2. Inspect stacking contexts in your application
3. Adjust z-index values as needed
4. Consider using [React portals](https://react.dev/reference/react-dom/createPortal) for complex stacking situations

## Interaction issues

###### Interactions Not Working

**Issue**: Animations or interactions from Webflow don’t work

**Solutions**:

1. Verify the `DevLinkProvider` is properly set up in your application
2. Check if the interactions use supported features
3. Inspect browser console for JavaScript errors
4. Consider simplifying complex interactions

## Framework-specific issues

###### Next.js App Router Issues

**Issue**: DevLink components don’t work with React Server Components

**Solutions**:

1. Add the `"use client"` directive to component files that use client-side features
2. Import DevLink components only in client components
3. Ensure the DevLinkProvider is in a client-side context

Example client component:

```
"use client";

import { MyDevLinkComponent } from '@/devlink';

export default function ClientComponent() {
  return <MyDevLinkComponent />;
}
```

###### Next.js Image Optimization

**Issue**: Images in DevLink components don’t work with Next.js Image optimization

**Solution**:
Replace DevLink Image elements with [Next.js Image components](https://developers.webflow.com/webflow-cloud/devlink/framework-integrations#custom-link-and-image-components)

###### CSS Conflicts with Tailwind

**Issue**: DevLink styles conflict with Tailwind CSS

**Solutions**:

1. Use Tailwind’s preflight reset cautiously
2. Consider using Tailwind’s `@layer` directive to control specificity
3. Use more specific selectors for custom styles
4. Enable `skipTagSelectors` in your DevLink configuration to prevent conflicts between Tailwind CSS defaults and global.css rules

Some rules from tue DevLink `global.css` might conflict with the defaults set by Tailwind CSS. If you wish to use DevLink and Tailwind CSS on the same project, we recommend enabling `skipTagSelectors` to disable opinionated rules and selectors and only include the bare minimum required for DevLink components to work.

In your CSS:

global.css

```
/* Give DevLink styles higher priority */
@layer base, components, utilities, devlink;
```

In your `.webflowrc.js` / `webflow.json`:

.webflowrc.jswebflow.json

```
module.exports = {
  skipTagSelectors: true
}
```

When disabling global tags with `skipTagSelectors`, make sure that the parent elements of your DevLink components have a defined height/width OR your `<html/>` and `<body>` have `height: 100%;`, especially for components like Navbar and Dropdown that rely on the viewport having sufficient dimensions.

###### CSS Loading Issues

If styles aren’t loading correctly:

1. Verify the DevLink `global.css` import path is correct for your framework
2. Ensure CSS loading is configured correctly in your app
3. Check for CSS isolation, scoping, and conflict issues with browser tools

###### Performance Optimizations

To optimize DevLink components in production:

1. Enable code splitting in your framework configuration
2. Only import the DevLink components you need from their respective file, rather than importing from the entire `devlink` directory
3. Consider lazy loading components that aren’t needed on initial render
4. Use production builds to minimize JavaScript and CSS

## DevLink CLI Issues

###### CLI Installation Problems

**Issue**: Issues installing or running the Webflow CLI

**Solutions**:

1. Check Node.js version (v20+ recommended)
2. Clear npm cache and try reinstalling
3. Ensure you have proper permissions for the installation directory

```
# Clear npm cache
npm cache clean --force

# Reinstall the CLI
npm install @webflow/webflow-cli
```

###### CLI Command Not Found

**Issue**: `Webflow` command not found after installation

**Solutions**:

1. Ensure the package is installed and up to date
2. Use `npx` to run the CLI commands
3. Add the CLI to your `package.json` scripts

In your package.json:

```
"scripts": {
  "sync": "webflow devlink sync"
}
```

Then run:

```
npm run sync
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