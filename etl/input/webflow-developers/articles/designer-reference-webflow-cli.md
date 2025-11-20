---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/webflow-cli
title: "Webflow CLI Reference | Webflow Developer Documentation"
published: 2025-11-17
---

The Webflow CLI streamlines the development process for creating Webflow Designer Extensions. This page provides a reference for its installation and commands.

Regularly check for updates to the CLI and the [Designer Extension Type Definitions](https://www.npmjs.com/package/@webflow/designer-extension-typings) to ensure compatibility.

## Installation

Before installing, ensure you have Node.js and package manager of your choice installed.

To install the Webflow CLI globally, use your package manager of choice:

```
npm install -g @webflow/webflow-cli # or yarn add global @webflow/webflow-cli or pnpm add -g @webflow/webflow-cli
```

🔗 [npm package](https://www.npmjs.com/package/@webflow/webflow-cli)

## Commands

### `init`

Initializes a new Designer Extension project. It’s highly recommended to start all projects with this command.

```
webflow extension init <project-name> [template]
```

**Arguments**

- `project-name` (required): The name of your new project directory.
- `template` (optional): The name of a template to use.

**Templates**

You can use templates for specific libraries and languages. To see a list of available templates, run:

```
webflow extension list
```

Example of initializing a project with a React template:

```
webflow extension init my-react-extension react
```

### `serve`

Serves your Designer Extension locally at port 1337, allowing you to interact with it inside the Webflow Designer. Additionally, you can use the `--port` option to serve your extension on a different port.

```
webflow extension serve
```

#### Options

| Command Option | Description | Default |
| --- | --- | --- |
| `--port` | The port to serve your extension on. | 1337 |

### `bundle`

Bundles your extension and creates a `bundle.zip` file in your project’s root directory. This file is used to upload your extension to Webflow.

```
webflow extension bundle
```

If you initialized your project with `webflow extension init`, you can also use the npm script `build`:

```
npm run build
```

### `list`

Lists all available templates that can be used with the `init` command.

```
webflow extension list
```

[![Logo](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/logo.svg)![Logo](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/logo.svg)](https://developers.webflow.com/)

Designer API

Designer API

Control the Webflow Designer

Designer API

Designer API

Control the Webflow Designer

[Log in](https://webflow.com/dashboard/login) [Submit an app](https://developers.webflow.com/submit) [Get started](https://webflow.com/dashboard/signup)