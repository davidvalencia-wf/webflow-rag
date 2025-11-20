---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/publish-site-api-new-rate-limits
title: "Publish Site API: New Rate Limits | Webflow Developer Documentation"
published: 2025-11-17
---

[March 15, 2023](https://developers.webflow.com/data/changelog/publish-site-api-new-rate-limits)

## [Publish Site API: New Rate Limits](https://developers.webflow.com/data/changelog/publish-site-api-new-rate-limits)

**What’s changing?**

Webflow is striving to improve the performance and stability of the platform to provide customers with the best possible experience. In light of this, Webflow is introducing a new rate-limiting policy for the Data API’s [site publishing endpoint](https://developers.webflow.com/data/reference/sites/publish), which will help maintain the overall health of the Data API. Customers are limited to a maximum of one successful publish queue per minute.

**Key requirement:**

Limit to 1 publish per minute

**Why are we making this change?**
Site publishing is a resource-intensive service, and analysis has identified a small number of customers who account for a significant portion of monthly publishes. This high usage has been impacting the overall system health and causing errors for other customers.

This rate-limiting policy ensures a more consistent and reliable experience for all users of the platform.

For questions or concerns about this update, please contact the [support team](https://support.webflow.com/).

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