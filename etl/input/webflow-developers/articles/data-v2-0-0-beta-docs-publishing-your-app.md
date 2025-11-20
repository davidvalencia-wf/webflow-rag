---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/docs/publishing-your-app
title: "How to bundle and upload your Designer Extension to Webflow | Webflow Developer Documentation"
published: 2025-11-17
---

Once you’ve tested your Designer Extension locally, the next step is to upload it to Webflow to share with your Workspace. Each time you’re ready to share a new version, you can upload it by following this guide.

### Before you begin

Make sure you have the following:

- A complete and tested Designer Extension.
- The [Webflow CLI](https://www.npmjs.com/package/@webflow/webflow-cli) installed.
- Admin access to the Webflow Workspace where your app is registered.
- Two-Factor Authentication (2FA) enabled on your Webflow account.

[1](https://developers.webflow.com/data/v2.0.0-beta/docs/publishing-your-app#build-and-bundle-your-extension)

### Build and bundle your extension

First, create a production-ready build of your extension. In your terminal, run the build command for your project. If you used `webflow extension init` to start your project, you can run:

```
npm run build
```

Depending on your project setup, this command compiles your code into a `build` or `dist` folder. You can specify this output directory in your `webflow.json` file. Learn more in our [App Settings guide](https://developers.webflow.com/designer/reference/app-settings).

Next, use the Webflow CLI to bundle your build directory into a `bundle.zip` file. Run the following command from your project’s root directory:

```
webflow extension bundle
```

This creates a `bundle.zip` file that is ready to be uploaded. **The bundle must not exceed 5MB.**

##### Working with Frameworks

If you’re using a framework like Next.js or Astro, run the framework’s production build command first, then run `webflow extension bundle` on the output directory. You can streamline this by combining these steps into a single script in your `package.json`.

[2](https://developers.webflow.com/data/v2.0.0-beta/docs/publishing-your-app#upload-your-extension-bundle)

### Upload your extension bundle

With your `bundle.zip` file ready, you can upload it to Webflow.

1. Navigate to your Workspace settings and click the **Apps & Integrations** tab.

2. Under the **Develop** section, find your app and click **Publish extension version**.

![Publish extension version button in App settings](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/designer-extensions/assets/publish-extension-version.png)

3. In the file dialog, select the `bundle.zip` file and add notes about the changes in this version.

After the upload is complete, you’ll see a confirmation message, and a new version will appear in your app’s version history.

[3](https://developers.webflow.com/data/v2.0.0-beta/docs/publishing-your-app#test-your-uploaded-extension)

### Test your uploaded extension

Once your extension is uploaded, test it in your Workspace to ensure it works as expected.

1. Open a Webflow site in your Workspace.
2. Open your app and click the **Launch App** button.
3. Verify that everything works as expected.

![Launch app button in App settings](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/designer-extensions/assets/launch-development-app.png)

Be sure to click **Launch App** to test the uploaded version, not **Launch development app**, which loads your extension from your local development URL.

## Submitting to the Marketplace

Once your extension is tested in your Workspace, you can submit it to the Webflow App Marketplace. The [submission process](https://developers.webflow.com/apps/docs/marketplace/submitting-your-app) involves providing marketing assets, support information, and a description of your app.

The Webflow team will review your submission to ensure it follows our [Developer Terms of Service](https://developers.webflow.com/apps/developer-terms-of-service) and meets our [Marketplace Guidelines](https://developers.webflow.com/data/v2.0.0-beta/apps/docs/marketplace-guidelines). This process can take a few days, and you’ll receive an email notification once it’s approved.

Learn more in our [Marketplace Submission Guide](https://developers.webflow.com/apps/docs/marketplace/submitting-your-app).

## Frequently asked questions

###### Are uploads to Webflow versioned?

Yes. Every time you upload a `bundle.zip` file, Webflow creates a new, versioned instance of your extension. You can add notes with each version to track new features, changes, and bug fixes. To see your version history, click the **…** button in your app’s settings and select **Version History**.

![A list of Designer Extension versions with notes for each update.](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/designer-extensions/assets/designer-extension-versions.png)

###### Can I revert to a previous version?

Webflow does not have a one-click rollback feature. However, since your `bundle.zip` files are generated from your local codebase, you can use your version control system (like Git) to check out a previous version of your code, generate a new bundle from it, and upload that bundle to Webflow.

###### Why is the 'Publish extension version' button disabled?

This button is disabled if you are not an admin of the Workspace or if you do not have Two-Factor Authentication (2FA) enabled on your account.

###### How can I share my extension outside my Workspace?

You can share your extension outside of your Workspace by submitting it to the Webflow Marketplace. If you want to test with a limited group of users before a full public release, you can also [submit your app to be reviewed as a private app](https://developers.webflow.com/data/v2.0.0-beta/apps/docs/private-apps).

###### Where is my production app hosted?

Your production app is hosted on Webflow’s servers. When you upload your `bundle.zip` file, Webflow compiles your extension and serves it from a unique URL within an iframe in the Designer.

You can find this URL in your app’s settings by clicking the **…** button and selecting **Edit App -> Building Blocks -> Designer Extension** and see the section for Designer Extension URI.

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