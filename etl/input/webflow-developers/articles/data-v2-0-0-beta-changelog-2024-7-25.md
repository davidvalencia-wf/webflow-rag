---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/7/25
title: "Get site plan details | Webflow Developer Documentation"
published: 2025-11-17
---

[July 25, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/7/25)

## [Get site plan details](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/7/25)

In this latest release, we’ve added new Data API endpoints to assist with programmatic Workspace administration. Additionally, we’ve introduced Designer API methods for adjusting links within the Designer. We’ve also expanded the Get Page Content endpoint to include component instances with modified property values.

### New endpoints

- **[Site Plan Details](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/workspace-management/get-site-plan):** Get site plan details for the provided Site (Enterprise only)

### Bug fixes

- **[Get Page Content](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content):** The response now includes component instances on a page that have [modified property values](https://university.webflow.com/lesson/component-properties?topics=layout-design#how-to-modify-property-values-on-component-instances) , including: Plain Text, Rich Text, and Alt Text.