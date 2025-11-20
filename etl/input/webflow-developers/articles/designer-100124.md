---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/100124
title: "Deep linking to Hybrid Apps | Webflow Developer Documentation"
published: 2025-11-17
---

[October 1, 2024](https://developers.webflow.com/designer/100124)

## [Deep linking to Hybrid Apps](https://developers.webflow.com/designer/100124)

This release introduces deep linking support for Hybrid Apps, enabling smooth transitions between third-party platforms and the Webflow Designer. Learn more about deep linking in the [Hybrid Apps documentation](https://developers.webflow.com/apps/deep-linking).

### Feature highlights

- **Direct access to Hybrid Apps** \- Launch your app directly in the Designer after authenticating with Webflow
- **Streamlined user experience** \- Eliminate manual navigation steps between platforms
- **Enhanced workflow efficiency** \- Create seamless onboarding and integration flows

### Deep linking format

Deep linking requires the Site Short Name and Client ID.

- **Get the Site Short Name:** Retrieve the short name using the [Get Site](https://developers.webflow.com/data/reference/sites/get) endpoint.
- **Add Client ID:** Find the Client ID in the Webflow Dashboard under Apps & Integrations in your App’s settings.

```
<site short name>.design.webflow.com?app=<client id>
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