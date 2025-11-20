---
source: webflow-developers
category: general
url: https://developers.webflow.com/apps/docs/designer-extensions
title: "Designer API & Extensions | Webflow Developer Documentation"
published: 2025-11-17
---

![A Designer Extension creating elements on the canvas.](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/7500640-New_Apps_Screengram.gif)

Designer Extensions are web applications that run directly inside the Webflow Designer. Using the [Designer APIs](https://developers.webflow.com/designer/reference/introduction), you can create powerful new tools that integrate seamlessly with a user’s workflow, helping them design, create, and optimize their sites faster than ever.

## What you can build

Using the [Designer APIs](https://developers.webflow.com/designer/reference/introduction), you can build extensions that programmatically interact with a user’s design and content in real-time. This opens up a world of possibilities for workflow automation and creative tooling.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Blog.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Blog.svg)

Automate layout and content creation

Generate complex components, populate data from third-party sources, or build entire page structures with a single click.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DesignSystems.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DesignSystems.svg)

Manage design systems

Create tools that allow users to apply and maintain consistent branding, manage variables, and swap themes.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/ImageControls.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/ImageControls.svg)

Streamline asset management

Build extensions that connect to external asset libraries, optimize images, or automate asset organization.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Folders.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Folders.svg)

Create dynamic site structures

Programmatically add and organize pages and folders, perfect for sites with complex information architecture.

## How they work

Designer Extensions are single-page applications that run inside a secure `iframe` within the Webflow Designer. They use Webflow’s client-side **Designer APIs** to communicate with the Designer, allowing your app to perform actions that would typically require manual user intervention. For more advanced use cases, your extension can also integrate with your own backend services and third-party APIs including Webflow’s [Data APIs](https://developers.webflow.com/data/reference/introduction).

## The development workflow

From your first line of code to a public Marketplace launch, here’s an overview of the development process.

[1](https://developers.webflow.com/apps/docs/designer-extensions#register-your-app-in-webflow)

### Register your App in Webflow

Before you can start building, you need to register a new app within your Webflow Workspace settings.

[Register your App](https://developers.webflow.com/data/docs/register-an-app)

[2](https://developers.webflow.com/apps/docs/designer-extensions#create-a-designer-extension-from-the-cli)

### Create a Designer Extension from the CLI

Use the Webflow CLI to scaffold a starter project and run a local development server for live testing.

[Create a Designer Extension from the CLI](https://developers.webflow.com/apps/designer-extensions/getting-started)

[3](https://developers.webflow.com/apps/docs/designer-extensions#build-with-the-designer-apis)

### Build with the Designer APIs

The Designer APIs are how your app will interact with the Webflow canvas, providing a robust interface to control the Designer.

[Build with the Designer APIs](https://developers.webflow.com/designer/reference/introduction)

[4](https://developers.webflow.com/apps/docs/designer-extensions#publish-to-your-workspace)

### Publish to your Workspace

When you’re ready, upload your extension to Webflow to share it with your team for testing and internal use in your Workspace.

[Publish to your Workspace](https://developers.webflow.com/apps/docs/publishing-your-app)

[5](https://developers.webflow.com/apps/docs/designer-extensions#submit-to-the-marketplace)

### Submit to the Marketplace

Share your creation with the world by submitting it to the Webflow Marketplace.

[Submit to the Marketplace](https://developers.webflow.com/apps/docs/marketplace/submitting-your-app)

## FAQs

###### Can I use the Data APIs in my Designer Extension?

Yes, you can use the [Data APIs](https://developers.webflow.com/data/reference/introduction) in your Designer Extension to access and update data from Webflow’s servers. This is called a **Hybrid App**. When you setup your app, you’ll need to select both the **Data Client** and **Designer Extension** options.

###### Which frameworks and libraries can I use to build my Designer Extension?

You can use any framework that outputs static resources and runs in a browser environment. Just make sure your extension fits within the iframe dimensions provided by Webflow.

###### How do I test my Designer Extension?

[1](https://developers.webflow.com/apps/docs/designer-extensions#install-your-extension-on-a-test-site)

### Install your extension on a test site

In the left sidebar of your workspace, navigate to **Apps & Integrations** \> **Develop**. Click the ”…” button next to your app and select **Install App**. You’ll see an authorization screen where you can select the sites or workspace you want to install the app on.

[2](https://developers.webflow.com/apps/docs/designer-extensions#run-the-extension-in-development-mode)

### Run the extension in development mode

In your terminal, navigate to your project folder and run the following command:

```
webflow extension serve
```

This will start development mode locally (port 1337).

[3](https://developers.webflow.com/apps/docs/designer-extensions#preview-and-interact-with-your-extension-in-the-designer)

### Preview and interact with your extension in the Designer

On your test site, open the Apps pane and find your app. Click “Launch Development App” to preview and interact with your locally hosted extension in the Designer.

###### Why isn't my extension interacting with Webflow as expected?

- Double-check your use of the [Designer APIs](https://developers.webflow.com/designer/reference/overview) and ensure you’re using the correct methods.
- Check the browser console for errors and review our [error handling guidelines](https://developers.webflow.com/designer/reference/error-handling).
- Designer APIs only access content on the current page, not other sites or pages.
- Make sure your app has the right permissions and scopes.
- For Data API issues, verify you’re using the correct endpoints and valid tokens.

###### Why does my app look different in Webflow than expected?

- Designer Extensions run in an iframe with controlled dimensions. Check your configuration and use [resizing methods](https://developers.webflow.com/designer/reference/resize-extension) if needed.
- Use scoped CSS or scoped class names to avoid style conflicts with Webflow’s native styles.
- Test at different viewport sizes to ensure responsive behavior.

###### Why can't I upload a new version of my Designer Extension Bundle?

Only Workspace admins can upload new bundles. If you’re not an admin, contact your Workspace administrator to upload the bundle or grant you the necessary permissions.

###### Why isn't my extension showing up in Webflow?

- Make sure you’ve [bundled your app with the Webflow CLI](https://developers.webflow.com/apps/docs/publishing-your-app#build-your-extension) and uploaded your Designer Extension via the Dashboard.
- Confirm the app is installed on your site or workspace (check the App Development section in your workspace).

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