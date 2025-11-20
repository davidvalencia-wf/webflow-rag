---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/cli
title: "Webflow CLI | Webflow Developer Documentation"
published: 2025-11-17
---

The Webflow CLI is the command line interface for developers to interact with Webflow. Use the CLI to manage DevLink by:

- Authenticating with your Webflow workspace or site
- Bundling components into importable libraries
- Exporting components from Webflow
- Importing components into Webflow

You can use the CLI directly in your project or in CI/CD pipelines to automate library imports.

## Installation

The Webflow CLI is available as a package on npm. You can install it to your project with the following command:

```
npm i --save-dev @webflow/webflow-cli
```

## Commands

### Import

To share your library to your Workspace, use the following command:

```
npx webflow library share
```

This command will:

- **Authorize your workspace:** The CLI will check for a Workspace authentication token in your `.env` file. If one isn’t found, the CLI will prompt you to authenticate by opening a browser window to the Workspace authorization page.
- **Bundle your library:** The CLI will bundle your library, and ask you to confirm the components you want to share.
- **Upload your library to your Workspace**

#### Options

You can use the following options to customize sharing:

| Command Option | Description | Default |
| --- | --- | --- |
| `--manifest` | Provide the path to the `webflow.json` file. | Scans the current directory for `webflow.json`. |
| `--api-token` | Pass a Workspace API token. | Uses `WEBFLOW_WORKSPACE_API_TOKEN` from the `.env` file. |
| `--no-input` | Avoid prompting or doing anything interactive. Useful for CI/CD pipelines. | No |
| `--verbose` | Display more information for debugging purposes. | No |
| `--dev` | Bundle in development mode for debugging purposes. This will disable minification and source maps. | No |

### Bundle

Bundle your library locally for debugging and testing. The `share` command automatically bundles your library, but you can use `bundle` for local development.

```
npx webflow library bundle --public-path http://localhost:4000/
```

#### Options

| Command Option | Description |
| --- | --- |
| `--public-path` | Required. The URL where you can serve your library. |
| `--force` | Forces the bundler to finish compiling, even if there are warnings. |
| `--dev` | Bundle in development mode for debugging purposes. This will disable minification and source maps. |
| `--debug-bundler` | Print the final configuration being used by webpack. |

### Log

Get the logs with debug information for your last library import.

```
npx webflow library log
```

## CI/CD workflows

Use the CLI in automated workflows by adding the `--no-input` option to avoid interactive prompts.

**Important:** Implement change detection before sharing to avoid unintentionally removing components:

- Compare current library state with previous import
- Only share when components have actually changed

```
npx webflow library share --no-input
```

## Troubleshooting

###### Authentication

If you’re having trouble authenticating with your Workspace, try the following:

- Check your `.env` file for the `WEBFLOW_WORKSPACE_API_TOKEN` variable. Be sure to use a Workspace API token, not a Site API token.

- Try running the share command with the `--verbose` flag to see if there is additional information in the output.

```
npx webflow library share --verbose
```

- If you’re still having trouble, try running the share command with the `--api-token` flag to manually pass in your API token.

```
npx webflow library share --api-token <your-api-token>
```

###### Prompts for component removal

If the CLI is warning you that you’re about to remove components, it’s because the CLI is comparing the current library state with the previous import. Be sure your component name matches the name in the previous . Otherwise, the CLI will create a new component and remove the old one.

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