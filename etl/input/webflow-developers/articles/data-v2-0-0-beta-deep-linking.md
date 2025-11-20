---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/deep-linking
title: "Deep linking | Webflow Developer Documentation"
published: 2025-11-17
---

To streamline the hand-off between a 3rd party experience and the Webflow Designer Extension, use the following deep link format:

```
https://<site short name>.design.webflow.com?app=<client id>
```

- `site short name`: Use the [Get Site Information](https://developers.webflow.com/designer/reference/get-site-info) method to retrieve this.
- `client id`: Available in your App’s settings in the Webflow Dashboard under Apps & Integrations.

### Why This Matters

Deep linking allows you to bypass extra steps and provide a smooth user experience when moving from your Hybrid App to the Webflow Designer. If the App is already installed on the target site, the Designer launches directly with your Extension, reducing friction and context-switching for users.

- **If the App is installed**: The Designer session starts with the Extension.
- **If the App is not installed**: The Designer will launch as normal without the Extension, treating the deep link as a no-op.

### How It Works

- **Fetch the Site Short Name:** The site short name is needed to construct the link. You can retrieve it using the [Get Site Information](https://developers.webflow.com/designer/reference/get-site-info) method or [Get Site endpoint](https://developers.webflow.com/data/reference/sites/get).
- **Locate the Client ID:** Find the `client_id` in the Webflow Dashboard under Apps & Integrations in your App’s settings.

By constructing a deep link with this format, you ensure that your Hybrid App and the Webflow Designer Extension work together seamlessly, reducing unnecessary user input and improving the overall flow between the two environments.