---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/scopes
title: "Scopes | Webflow Developer Documentation"
published: 2025-11-17
---

## Available scopes

Available scopes are determined by the type of token you’re creating. For [Data Client apps](https://developers.webflow.com/data/reference/oauth-app) and [site tokens](https://developers.webflow.com/data/reference/site-token), refer to the site-level scopes. For [workspace tokens](https://developers.webflow.com/data/reference/authentication/workspace-token), refer to the workspace-level scopes.

###### Site-level

###### Workspace-level

| Resource | Scopes | Endpoints |
| --- | --- | --- |
| Assets | `assets:read`, `assets:write` | → [API Docs](https://developers.webflow.com/data/reference/assets/assets/list) |
| Authorized User | `authorized_user:read` | → [API Docs](https://developers.webflow.com/data/reference/token/authorized-by) |
| Authorization info | None required | → [API Docs](https://developers.webflow.com/data/reference/token/introspect) |
| CMS | `cms:read`, `cms:write` | → [API Docs](https://developers.webflow.com/data/reference/cms/collections/list) |
| Comments | `comments:read`, `comments:write` | → [API Docs](https://developers.webflow.com/data/reference/comments/list-comment-threads) |
| Components | `components:read`, `components:write` | → [API Docs](https://developers.webflow.com/data/reference/pages-and-components/components/list) |
| Custom Code | `custom_code:read`, `custom_code:write` | → [API Docs](https://developers.webflow.com/data/reference/custom-code/custom-code/list) |
| Ecommerce | `ecommerce:read`, `ecommerce:write` | → [API Docs](https://developers.webflow.com/data/reference/ecommerce/products/list) |
| Forms | `forms:read`, `forms:write` | → [API Docs](https://developers.webflow.com/data/reference/forms/list) |
| Pages | `pages:read`, `pages:write` | → [API Docs](https://developers.webflow.com/data/reference/pages-and-components/pages/list) |
| Sites | `sites:read`, `sites:write` | → [API Docs](https://developers.webflow.com/data/reference/sites/list) |
| Site Activity | `site_activity:read` | → [API Docs](https://developers.webflow.com/data/reference/enterprise/site-activity/list) |
| Site Configuration | `site_config:read`, `site_config:write` | → [API Docs](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/get) |
| Users | `users:read`, `users:write` | → [API Docs](https://developers.webflow.com/data/reference/users/users/list) |
| Webhooks | Depends on `trigger_type` | → [API Docs](https://developers.webflow.com/data/reference/webhooks/list) |
| Workspace | `workspace:read`, `workspace:write` | → [API Docs](https://developers.webflow.com/data/reference/enterprise/workspace-management/create) |

##### Quick tip: Finding required scopes

Each API endpoint lists its required scopes in the description. When planning your integration, check the endpoints you’ll use to determine which scopes to request.

## Understanding scopes

Scopes are permissions that control what data your app can access. Think of them like permissions on your phone - an app might request access to your camera, photos, or contacts. In Webflow’s API:

- Each scope gives access to specific [resources](https://developers.webflow.com/data/reference/structure-1)
- Scopes usually come in pairs: `:read` for viewing data, `:write` for modifying data
- Users will see and approve these permissions when connecting to your app

##### Best practice

Only request scopes your app actually needs. Requesting unnecessary scopes can make users hesitant to approve your app.

## Adding scopes

When creating a Data Client App or an API token, you’ll first register your required scopes:

###### Data Client App

###### API Token

During [app registration](https://developers.webflow.com/data/docs/register-an-app), select the scopes that match your app’s required functionality. These scopes define what data your app can access.

![Scope Registration](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/28e0ad2-Large_GIF_1064x696.gif)

Scope Registration

##### Using scopes in OAuth

After registration, you’ll use these same scopes in your [Authorization URL](https://developers.webflow.com/data/reference/oauth-app#constructing-the-authorization-link) during the OAuth flow. This shows users an authorization page where they can review and approve your requested permissions.

See our [authorization guide](https://developers.webflow.com/data/reference/oauth-app) for step-by-step OAuth implementation.

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