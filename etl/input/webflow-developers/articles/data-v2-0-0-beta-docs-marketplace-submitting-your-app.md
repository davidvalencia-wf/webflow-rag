---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app
title: "Submitting Your App to the Webflow Marketplace | Webflow Developer Documentation"
published: 2025-11-17
---

This guide walks you through the process of submitting your app for review. For details on configuring how your app appears in the Marketplace, see the [app listing guide](https://developers.webflow.com/apps/docs/marketplace/listing-your-app).

## Submission process

1. Prepare [technical requirements](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#technical-requirements) and [submission assets](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#submission-preparation)
2. Submit for review, using the [Webflow App submission form](https://developers.webflow.com/submit)
3. Respond to feedback (if needed)
4. Publicize and share your app upon approval and publication to the Webflow Marketplace

## Technical Requirements

Your app must meet the following technical requirements to be made publicly available in the Webflow Marketplace:

- Two-factor authentication is enabled for an admin account on the workspace
- Your app has been thoroughly tested and is fully functional
- Your app has clear documentation and error handling
- Your app follows Webflow’s security best practices and privacy guidelines

## Submission preparation

Before submitting your app for review, ensure you have completed these essential preparation steps:

[1](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#test-your-app-and-onboarding-flow)

### Test your app and onboarding flow

Ensure your app is fully functional and meets all technical requirements. If you’re submitting a Data Client or Hybrid App, ensure that your onboarding flow is working as expected and [provide an installation URL](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#installation-configuration) that allows users to connect your service with Webflow.

If you’re looking to test your app with users outside of the workspace where it’s registered, you can [submit your app to be reviewed as a private app](https://developers.webflow.com/data/v2.0.0-beta/apps/docs/private-apps). [See the installation configuration guidance for more details.](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#installation-configuration)

[2](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#upload-your-designer-extension-bundle)

### Upload your Designer Extension bundle

For Designer Extensions, developers must upload the `bundle.zip` file created using the Webflow CLI. Please review the guidance on [publishing a Designer Extension bundle](https://developers.webflow.com/apps/docs/publishing-your-app) for more details.

[3](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#grant-webflow-access-to-your-app)

### Grant Webflow access to your app

To enable a thorough review of your app, you must provide Webflow with complete access to test all features. This includes any of the following (if applicable):

- An active demo account with full functionality
- Access to any gated or premium features
- Required test credentials (for example, API keys, login details)
- Sample data or resources needed to evaluate core functionality
- Any additional materials needed to test edge cases or special features

The goal is to ensure reviewers can fully evaluate your app’s functionality, security, and user experience.

[4](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#enable-backend-services)

### Enable backend services

Your app’s backend services and APIs must be fully operational and accessible throughout the review process. This includes any third-party integrations, databases, or microservices that power your app’s core functionality. Having these services available ensures our reviewers can properly assess how your app integrates with and enhances the Webflow ecosystem.

[5](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#create-a-demo-video)

### Create a demo video

Create a comprehensive demo video (2-5 minutes) that demonstrates your app’s key features and functionality, and shows a complete walkthrough of the user experience from installation to usage.
You can provide the video via:

- Loom (private link)
- YouTube (unlisted or private)
- Google Drive (shared link)

[6](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#document-complex-features-and-pricing)

### Document complex features and pricing

Document any complex features, pricing tiers, and in-app purchases thoroughly in your review notes and demo video. Explain how each feature works, demonstrate user interactions with premium features, and outline your pricing structure. Include relevant visuals and external documentation links to give reviewers a complete understanding of your app’s functionality.

[7](https://developers.webflow.com/data/v2.0.0-beta/docs/marketplace/submitting-your-app#create-marketplace-and-submission-assets)

### Create marketplace and submission assets

To ensure your app is listed correctly in the Marketplace, include all the required information and assets detailed in the [App listing guide](https://developers.webflow.com/apps/docs/marketplace/listing-your-app).

## Submit your app

Once you’ve prepared your submission assets, you can submit your app for review using our [App submission form](https://developers.webflow.com/submit). A complete submission with all required details will help expedite the review process.

[Submit your app](https://developers.webflow.com/submit)

## Installation configuration

Your app’s installation URL defines where users are directed after choosing to install your app from the Marketplace. This URL should provide a clear path to where your App will authorize with users’ Webflow Sites. Since Webflow OAuth can be initiated on install or within your platform, there are a few options to set as the Install URL based on your app’s intended user experience.

### Choosing your installation URL

###### Data Client

###### Hybrid App

###### Designer Extension

1. **Direct to Webflow OAuth** (Recommended)

Immediately initiates the Webflow OAuth flow when users install your app
   - Example URL:

     `https://webflow.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&scope=YOUR_SCOPES`
   - After authorization, redirect users to your platform where your service can:
     1. Call the [Get User Info](https://developers.webflow.com/data/reference/token/authorized-by) endpoint to get user details
     2. Create an account or match to existing user in your system
2. **Direct to your platform first**

Directs users to your platform to complete setup before initiating OAuth
   - Example URL: `https://your-app.com/signup`
   - After users authenticate with your service, provide a clear way to initiate the Webflow OAuth flow.

##### Scopes on the Install URL

Verify that the scopes requested in the Install URL are equal to or a subset of the scopes configured for your app in the app settings. If there’s a mismatch where the Install URL requests scopes beyond what’s configured in the app settings, users won’t be able to install your app and an error will be displayed.

#### Best practices for onboarding your users

- Test the full installation flow from start to finish
- For Hybrid Apps, consider [directing users to the designer using your app’s deep link.](https://developers.webflow.com/apps/deep-linking)
- Minimize the number of steps users need to take
- Provide clear guidance at each step
- Handle error cases gracefully with helpful messages

## Post submission

Our goal is to provide a prompt decision, ideally within 10-15 business days. You will be notified of our decision via the email associated with your Webflow account.

If your App submission is rejected, we will send you an email with a brief explanation. You will have the opportunity to address any feedback and resubmit your App for review.

Any attempts to exploit the Webflow APIs or Marketplace review process, such as providing false information, engaging in plagiarism, deceitful manipulation of user files, or data theft, will result in immediate removal. Additionally, you will be banned from publishing future apps in our community.

We look forward to reviewing what you’ve developed!

For more context, please reference our [Developer Terms of Service](https://webflow.com/legal/developer-terms-of-service).

### Updating your app on the Marketplace

To update the information on your app listing, you can submit a request to the Webflow team. App updates follow the same review process as the initial submission. Simply submit your updated details using the [Webflow App submission form](https://developers.webflow.com/submit) and select “App Update” as the “Submission Type.”

For App Updates, only the App Name and Client ID fields are required; all other fields are optional. We recommend completing only the fields you wish to modify, leaving the rest unchanged to streamline the process.

Once your update is approved and published, you will be notified via email.

##### Updating a Designer Extension?

Don’t forget to publish a new version of your Designer Extension from your workspace. For guidance, refer to our documentation on [publishing a Designer Extension bundle](https://developers.webflow.com/apps/docs/publishing-your-app).

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