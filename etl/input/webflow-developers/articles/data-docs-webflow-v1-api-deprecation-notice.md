---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/webflow-v1-api-deprecation-notice
title: "Webflow v1 API Deprecation Notice | Webflow Developer Documentation"
published: 2025-11-17
---

As part of Webflow’s ongoing commitment to enhancing your developer experience, we’re transitioning from the v1 APIs to the more advanced v2 APIs. This document outlines the deprecation timeline for v1 Apps, APIs, and Webhooks, and provides guidance on managing a smooth transition to v2. We recommend starting your migration as soon as possible to ensure uninterrupted service for your integrations.

## Key changes

1. **API Site Tokens:**
   - **Webflow has discontinued creation of v1 API Site Tokens.**

     For new integrations or updates, developers should use v2 API Site Tokens.

     API Tokens are distinct from [auth tokens](https://developers.webflow.com/data/reference/oauth-app) generated via Webflow Apps.

   - See the [v2 migration guide](https://developers.webflow.com/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 API Site Tokens
2. **Webhooks:**
   - **Webflow will no longer support manual creation of v1 Webhooks.**

     To continue receiving real-time notifications via webhooks, [register v2 webhooks](https://developers.webflow.com/data/docs/working-with-webhooks).
   - See the [v2 migration guide](https://developers.webflow.com/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 Webhooks
3. **App Registrations:**
   - **Webflow no longer accepts App submissions for new v1 Apps.**

     To create new applications or update your existing v1 Apps to v2, use the [v2 App registration process](https://developers.webflow.com/data/docs/migrating-to-v2#building-v2-apps).
   - **Integrations/automations created by v1 Apps will stop receiving maintenance and support after March 31, 2025.**

     See the [v2 migration guide](https://developers.webflow.com/data/docs/migrating-to-v2#migrating-to-v2-site-tokens-webhooks-and-v2-apps) for more on migrating to v2 Apps

## Important dates

- **August 1, 2024**: De-listing of Marketplace Apps that are still reliant on v1 (non-scoped) authorization.
- **March 31, 2025**: Deprecation date for the v1 API. While the v1 API may continue to function after this date, it will no longer receive maintenance, updates, or support. We recommend completing your migration to v2 before this date to ensure uninterrupted service.

Transitioning to the v2 API ensures that developers have access to the latest features, enhanced security, and improved performance. We understand the challenges that come with such transitions, and are committed to supporting the Webflow developer community every step of the way.

For any queries or support migrating to v2 APIs, Apps, and Webhooks, reach out to [developers@webflow.com](mailto:developers@webflow.com). For other support matters, please reach out to Webflow’s [support team](https://support.webflow.com/).

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