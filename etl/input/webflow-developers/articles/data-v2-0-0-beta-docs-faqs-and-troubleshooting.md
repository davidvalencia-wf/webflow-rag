---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/docs/faqs-and-troubleshooting
title: "FAQs and Troubleshooting | Webflow Developer Documentation"
published: 2025-11-17
---

## **Frequently asked questions**

### Designer Extensions

###### Which frameworks and libraries can I use to build my Designer Extension?

You can use any framework that outputs static resources and runs in a browser environment. Just make sure your extension fits within the iframe dimensions provided by Webflow.

###### How do I test my Designer Extension?

[1](https://developers.webflow.com/data/v2.0.0-beta/docs/faqs-and-troubleshooting#install-your-extension-on-a-test-site)

### Install your extension on a test site

In the left sidebar of your workspace, navigate to **Apps & Integrations** \> **Develop**. Click the ”…” button next to your app and select **Install App**. You’ll see an authorization screen where you can select the sites or workspace you want to install the app on.

[2](https://developers.webflow.com/data/v2.0.0-beta/docs/faqs-and-troubleshooting#run-the-extension-in-development-mode)

### Run the extension in development mode

In your terminal, navigate to your project folder and run the following command:

```
webflow extension serve
```

This will start development mode locally (port 1337).

[3](https://developers.webflow.com/data/v2.0.0-beta/docs/faqs-and-troubleshooting#preview-and-interact-with-your-extension-in-the-designer)

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

* * *

### Marketplace Apps

###### Do I have to publicly share my app on the Marketplace?

No. You can publish your app as a **private app** and control who can install it. Select the **“Private”** option in the “Marketplace Visibility” section during submission. All private apps are reviewed just like public apps. [Learn more about private apps](https://developers.webflow.com/data/v2.0.0-beta/apps/docs/private-apps).

###### Can I update my app after it's been published?

Yes. You can submit updates at any time. Updates go through the same review process as your initial submission. Use the “Submit an App” form and select “App Update” as the submission type.

* * *

## Troubleshooting

###### Why can't other users install my app on their sites?

Only apps published to the Webflow Marketplace, either [publicly](https://developers.webflow.com/apps/docs/marketplace/submitting-your-app) or [privately](https://developers.webflow.com/data/v2.0.0-beta/apps/docs/private-apps), can be installed by other users. Submit your app for review to make it available for installation.

**Want to test with a few users before publishing?**

Email [developers@webflow.com](mailto:developers@webflow.com) with up to **5** Webflow user emails. Our team can add them to a test group so they can install and use your app with the [install URL](https://developers.webflow.com/apps/docs/marketplace/submitting-your-app#installation-configuration).

###### Why isn't my app showing up in Webflow?

- Make sure you’ve [bundled your app with the Webflow CLI](https://developers.webflow.com/apps/docs/publishing-your-app#build-your-extension) and uploaded your Designer Extension via the Dashboard.
- Confirm the app is installed on your site or workspace (check the App Development section in your workspace).

###### Why can't I view or update my app credentials (like the Client Secret)?

Only Workspace admins can view client secrets, edit app details, or create new apps. If you’re not an admin, contact your Workspace administrator for access or to perform these actions.