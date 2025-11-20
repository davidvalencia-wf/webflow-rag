---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/register-an-app
title: "Register an App | Webflow Developer Documentation"
published: 2025-11-17
---

To start developing a Webflow App, you’ll first need to register an app to a workspace. This guide will walk you through creating and registering your app with Webflow.

## Watch: How to register a Webflow App

Webflow for developers: Start building with Webflow Apps - YouTube

[Photo image of Webflow](https://www.youtube.com/channel/UCELSb-IYi_d5rYFOxWeOz5g?embeds_referring_euri=https%3A%2F%2Fdevelopers.webflow.com%2F)

Webflow

218K subscribers

[Webflow for developers: Start building with Webflow Apps](https://www.youtube.com/watch?v=rfEkIB0_ZDA)

Webflow

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

Full screen is unavailable. [Learn More](https://support.google.com/youtube/answer/6276924)

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

More videos

## More videos

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?t=102&v=rfEkIB0_ZDA&embeds_referring_euri=https%3A%2F%2Fdevelopers.webflow.com%2F)

1:42

1:42 / 30:44
•Live

•

## Prerequisites

- A Webflow account.
- A Webflow Workspace with Admin permissions.

##### Admin access required

Only Workspace admins can create apps, view client secrets, upload bundles, and modify app settings.

## Register an app

![Webflow Dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/getting-started-apps/register-an-app/Webflow-Dashboard.png)

##### App installations for external users

New apps are only available to users in your app’s workspace. By default, external users can’t install your app until it’s approved and published in the Webflow Marketplace.

You can test your app with external users before submitting for review. See the [user testing instructions](https://developers.webflow.com/apps/docs/marketplace/overview#user-testing-before-publishing) for details.

[1](https://developers.webflow.com/apps/data/docs/register-an-app#open-the-webflow-dashboard)

### Open the Webflow Dashboard

Login to your Webflow account and navigate to your Dashboard.

[2](https://developers.webflow.com/apps/data/docs/register-an-app#choose-a-workspace)

### Choose a Workspace

Select the Workspace for your app. While you can use any workspace, it’s recommended to create a dedicated development workspace to keep your apps organized and separate from production environments.

##### New to Webflow?

Get started with Webflow’s [free Developer Workspace](https://developers.webflow.com/data/docs/developer-workspace) designed for testing and developing Apps.

[3](https://developers.webflow.com/apps/data/docs/register-an-app#navigate-to-workspace-settings)

### Navigate to Workspace settings

From the “settings” menu on the left sidebar, select the “Apps & Integrations” tab. Scroll down to the “App Development” section and click the “Create an App” button. This will open the App creation modal.

![App Development section](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/getting-started-apps/register-an-app/App-Development.png)

[4](https://developers.webflow.com/apps/data/docs/register-an-app#add-app-details)

### Add app details

![App Details](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/getting-started-apps/register-an-app/App-Details.png)

Here, you’ll add the following basic information for your app:

- **Name:** The name of your app
- **Description:** A brief summary of your app’s purpose (140 characters max)
- **Icon:** An icon to represent your app
- **Homepage URL:** A valid HTTPS link to your app’s website

For more details on how your App will appear in the Marketplace, see the [app listing guide](https://developers.webflow.com/apps/docs/marketplace/listing-your-app).

###### Installation settings (optional)

You can configure your app’s installation scope by toggling the “Restrict app installation to a specific site” option. When enabled, users will only be able to authorize your app for a single site at a time, providing more granular control over permissions. When disabled (default), users can authorize your app for multiple sites or their entire Workspace at once, which is convenient for apps that need broader access. Choose the option that best aligns with your app’s security requirements and user experience.

[5](https://developers.webflow.com/apps/data/docs/register-an-app#define-app-capabilities)

### Define App capabilities

Click the “Continue” button to define your App’s capabilities.

![App Capabilities](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/getting-started-apps/register-an-app/select-scopes.gif)

Here, you’ll select the capabilities your App needs to function. You can choose from the following capabilities:

- **[Designer Extension](https://developers.webflow.com/apps/docs/designer-extensions):** Enables your App to interact with the Webflow Designer.
- **[Data Client](https://developers.webflow.com/data/docs/data-clients):** Enables your App to access and update data from Webflow’s servers.

You can select one or both of these capabilities. [Selecting both will allow your App to interact with both Webflow’s servers and the Webflow Designer as a hybrid app.](https://developers.webflow.com/apps/docs/hybrid-apps)

###### Data Client: OAuth configuration

If you’ve selected the Data Client capability, you’ll need to configure OAuth settings for your app:

- **Select scopes:** Choose the specific API permissions your app requires to function properly. Each scope grants access to different Webflow resources such as sites, collections, or assets. [Learn more about available scopes in our guide.](https://developers.webflow.com/data/reference/scopes)
- **Add redirect URI:** Enter a valid HTTPS URL where users will be redirected after authorizing your app. This is a critical security component of the OAuth flow that ensures authorization codes are only sent to trusted destinations. [Learn more about implementing OAuth authentication](https://developers.webflow.com/data/reference/oauth-app). You can add or modify redirect URIs later as needed.

After configuring your app’s capabilities and OAuth settings, click the “Create app” button to finalize the registration process.

[6](https://developers.webflow.com/apps/data/docs/register-an-app#review-your-app)

### Review your App

![App details](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Apps/getting-started-apps/register-an-app/Completed-App-Details.png)

Congratulations! You’ve successfully registered your App in Webflow. On successful registration, your App will be displayed in the App Development section. You’ll see key details including the Client ID and Client Secret. From here, you can also update your App’s details, capabilities, and installation settings.

###### Designer Extension: App information

If you’ve selected the Designer Extension capability, you’ll see additional information specific to Designer Extensions:

- **Publish Extension Version:** This button will open a modal where you can upload a new version of your Designer Extension and add version notes. For detailed publishing instructions, see our [Publishing Designer Extensions guide](https://developers.webflow.com/apps/docs/publishing-your-app).

- **Designer Extension URI:** The URI where your extension will be served within the Webflow Designer iframe. This URI is important when configuring CORS settings for your extension.

- **Versions:** View all previously published versions of your Designer Extension. This helps you track your extension’s version history and rollback if needed.

##### App Security

- Never commit your Client Secret to version control
- Rotate your Client Secret if it’s ever exposed
- Store secrets in environment variables or a secure secret management system
- Implement proper CORS policies for Designer Extensions

## Troubleshooting

###### Why am I getting an Invalid Redirect URI error?

When you receive an “Invalid Redirect URI” error during OAuth authorization, it typically means there’s a mismatch between the URI you’re using and what you registered. To resolve this:

- Ensure the redirect URI matches **exactly** what you registered
- Check for trailing slashes - `https://example.com/callback` and `https://example.com/callback/` are treated as different URIs
- If using localhost for development, make sure the port number matches exactly
- For Ngrok or other tunneling services, remember that the URL changes each time you restart the tunnel - update your registered URI accordingly

###### Why can't I see the app development section in my workspace settings?

Verify that:

- You’re in the correct Workspace
- You have Admin permissions on the Workspace (only Workspace admins can view and manage apps)
- Your account has been verified via email and has 2-factor authentication enabled
- You’ve navigated to Workspace Settings > App Development (not Site Settings)
- Your Webflow plan supports app development (available on Team and Enterprise plans)

If you’ve confirmed all these requirements and still can’t see the App Development section, try clearing your browser cache or using a different browser, then contact Webflow Support if the issue persists.

###### Why can't external users install my app?

New apps are only available to users in your app’s workspace. External users can’t install your app until it’s approved and published in the Webflow Marketplace.

You can invite external test users to your app before submitting for review. See the [user testing instructions](https://developers.webflow.com/data/docs/overview#user-testing-before-publishing) for details.

## Next steps

To see your new App in action, follow these Quickstart guides, which will get your App up and running in Webflow.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Switch.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Switch.svg)\\
\\
Data Client\\
\\
Access and manipulate Webflow site data including CMS collections, items, assets, and form submissions through secure API endpoints.](https://developers.webflow.com/data/docs/getting-started-data-clients) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Styles.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Styles.svg)\\
\\
Designer Extension\\
\\
Create extensions that automate design tasks, manipulate elements, and enhance the Webflow Designer experience.](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) [Hybrid App\\
\\
Use both the Data Client and Designer Extension in tandem.](https://developers.webflow.com/data/docs/hybrid-apps)

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