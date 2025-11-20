---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/installation
title: "Installation | Webflow Developer Documentation"
published: 2025-11-17
---

This reference covers the configuration required to export Webflow components into a React project using DevLink.

## Install the Webflow CLI

Install the CLI as a development dependency to your React project to bundle and publish your component library:

```
npm i --save-dev @webflow/webflow-cli
```

##### DevLink supports React v16.18.0 and higher

The minimum version of React supported to use exported components is v16.18.0.

## Create a configuration file

DevLink looks for a `webflow.json` file in the root of your project, which defines settings for DevLink setup and sync.

webflow.json.webflowrc.js

```
{
  "devlink": {
    "rootDir": "./devlink",
    "cssModules": true,
    "fileExtensions": {
      "js": "jsx"
    }
}
```

`webflow.json` is a newer configuration file that supports configuration for Webflow Cloud and DevLink. DevLink also supports the older `.webflowrc.js` file for backwards compatibility.

### Configuration options

| Option | Description | Default |
| --- | --- | --- |
| `host` | Webflow API host URL | `https://api.webflow.com` |
| `rootDir` | Directory to export components into | `./devlink` |
| `siteId` | Webflow site ID | `process.env.WEBFLOW_SITE_ID` |
| `authToken` | Webflow API authentication token | `process.env.WEBFLOW_SITE_API_TOKEN` |
| `cssModules` | Enable CSS modules for component styles | `true` |
| `allowTelemetry` | Allow anonymous usage analytics | `true` |
| `envVariables` | Inject environment variables into exported components | `{}` |
| `components` | Regex pattern to match components to export | `.*` |
| `overwriteModule` | Whether to overwrite the module file | `true` |
| `fileExtensions` | File extensions for exported components | `{ js: ".js", css: ".css" }` |
| `skipTagSelectors` | Exclude tag/ID/attribute selectors from global CSS | `false` |
| `relativeHrefRoot` | Control how relative `href` attributes are resolved | `/` |

While DevLink will try to assume reasonable defaults for most of the settings, you can specify certain options to customize the behavior of DevLink management and setup.

#### `skipTagSelectors`

When `true`, DevLink filters out global CSS rules with certain selectors, producing a smaller `global.css` file. Specifically, it removes:

- Tag selectors (e.g., `div`, `p`, `h1`)
- ID selectors (e.g., `#myId`)
- Attribute selectors (e.g., `[type="text"]`)
- Pseudo-class selectors (e.g., `:hover`, `:focus`) \- except for `:root`

This is useful when you only want class-based styles from Webflow and prefer to exclude global tag defaults. Empty rules are dropped entirely.

##### Define height/widths of parent elements

When using `skipTagSelectors: true`, ensure parent elements of DevLink components have defined heights/widths, or set height: 100% on your HTML and body elements to allow proper rendering of components.

#### `relativeHrefRoot`

Controls how relative `href` values are rewritten in exported Link and Image components.

| Value | Description | Notes |
| --- | --- | --- |
| `false` | No modification (export as-is) | Default behavior |
| `/` | Treat all relative paths as root-relative |  |
| **A string URL** | Rewrite all relative paths as absolute URLs | Must be a valid URL |

##### Example:

- With `"/"`:
  - Page link to “About” → `href="/about"`
  - Section link → `href="#contact-section"`
  - CMS page link → `href="/blog/my-blog-post"`
- With `"https://my-site.com"`:
  - Page link to “About” → `href="https://my-site.com/about"`
  - Section link → `href="https://my-site.com#contact-section"`
  - CMS page link → `href="https://my-site.com/blog/my-blog-post"`

#### `envVariables`

Inject environment variables into components. Useful for APIs like Maps or Recaptcha.

webflow.json

```
{
  "devlink": {
    "envVariables": {
      "GOOGLE_MAPS_API_KEY": process.env.MY_GOOGLE_MAPS_API_KEY,
      "GOOGLE_RECAPTCHA_API_KEY": "MY_GOOGLE_RECAPTCHA_API_KEY"
    }
  }
}
```

#### `fileExtensions`

Customize the extensions used for exported component files.

webflow.json

```
{
  "devlink": {
    "fileExtensions": {
      "js": ".jsx",
      "css": ".less"
    }
```

## Next steps

[Styling Components\\
\\
Learn how to style components for reliable export](https://developers.webflow.com/devlink/usage/styling-and-theming-overrides)

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