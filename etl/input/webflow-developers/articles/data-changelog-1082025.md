---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/1082025
title: "New LLMS.txt endpoints, Audit Log events, and Google Tag support | Webflow Developer Documentation"
published: 2025-11-17
---

[October 8, 2025](https://developers.webflow.com/data/changelog/1082025)

beta

## [New LLMS.txt endpoints, Audit Log events, and Google Tag support](https://developers.webflow.com/data/changelog/1082025)

This update gives you better control over your site configuration, with new endpoints for managing `llms.txt` files, and a new event type in Workspace Audit Logs for tracking user granular access updates.

## `LLMS.txt` supportBETA

We’ve added three new endpoints to the Beta API for managing `llms.txt` files on enterprise sites. This file can be used to provide information about your site to large language models (LLMs). These endpoints are available for Enterprise customers.

- GET [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/get) \- Retrieve the `llms.txt` file for a specific site.
- PATCH [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/patch) \- Update the `llms.txt` file for a specific site.
- DELETE [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/delete) \- Delete the `llms.txt` file for a specific site.

## New `user_granular_access_updated` event in Workspace Audit Logs

The [`Get Workspace Audit Logs`](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get) endpoint now includes a new `user_granular_access_updated` event sub-type in the response. This sub-type informs admins of when a user’s granular access to a site is updated.

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