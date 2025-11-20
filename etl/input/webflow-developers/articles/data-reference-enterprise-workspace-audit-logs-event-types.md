---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types
title: "Workspace audit log event types | Webflow Developer Documentation"
published: 2025-11-17
---

## `user_access`

Login and logout events for users in the workspace.

##### Event subtypes

| Value | Description |
| --- | --- |
| `login` | A user logged in |
| `logout` | A user logged out |

#### Payload schema

| Field | Type | Description |
| --- | --- | --- |
| `method` | string | How the user logged in, enum: `dashboard`, `sso`, `api`, `google` |
| `location` | string | The geolocation based on the logged IP address |
| `ipAddress` | string | The captured IP address of the user |

## `custom_role`

Tracks when custom roles are created, updated, or deleted in your workspace. [Learn more about custom roles](https://help.webflow.com/hc/en-us/articles/37207901526419-Create-and-manage-custom-roles).

##### Event subtypes

| Value | Description |
| --- | --- |
| `role_created` | A custom role has been created |
| `role_updated` | A custom role has been updated |
| `role_deleted` | A custom role has been deleted |

#### Payload schema

| Field | Type | Description |
| --- | --- | --- |
| `roleName` | string | The name of the custom role |
| `previousRoleName` | string | The previous name of the custom role |

## `workspace_membership`

Tracks when users join or leave the workspace, and when their roles change within it.

##### Event subtypes

| Value | Description |
| --- | --- |
| `user_added` | A user has been added to the workspace |
| `user_removed` | A user has been removed from the workspace |
| `user_role_updated` | A user’s role has been updated |

#### Payload schema

| Field | Type | Description |
| --- | --- | --- |
| `targetUser` | object | The affected user, with properties `id` and `email` |
| `method` | string | How access was managed, enum: `sso`, `dashboard`, `admin`, `access_request` |
| `userType` | string | Type of user, enum: `member`, `guest`, `reviewer`, `client` |
| `roleName` | string | The role assigned to the user |
| `previousRoleName` | string | The previous role (for role updates) |

## `site_membership`

Tracks when users are added to or removed from a specific site, and when their site-specific roles change or their granular access to resources. This is similar to workspace membership events, but focused on site-level access instead of workspace-level access.

##### Event subtypes

| Value | Description |
| --- | --- |
| `user_added` | A user has been added to a site |
| `user_removed` | A user has been removed from a site |
| `user_role_updated` | A user’s site role has been updated |
| `user_granular_access_updated` | A user’s granular access has been updated for a specific resource |

#### Payload schema

| Field | Type | Description |
| --- | --- | --- |
| `site` | object | The affected site, with properties `id` and `slug` |
| `targetUser` | object | The affected user, with properties `id` and `email` |
| `method` | string | How access was managed, enum: `sso`, `invite`, `scim`, `dashboard`, `admin`, `access_request` |
| `userType` | string | Type of user, enum: `member`, `guest`, `reviewer`, `client` |
| `roleName` | string | The role assigned to the user |
| `previousRoleName` | string | The previous role (for role updates) |
| `granularAccess` | object | The granular access settings for the user, with properties `id`, `name`, `type`, `restricted` |

## `workspace_invitation`

Tracks the lifecycle of workspace invitations from when they’re sent to when they’re accepted, declined, or canceled.

##### Event subtypes

| Value | Description |
| --- | --- |
| `invite_sent` | A workspace invite was sent |
| `invite_accepted` | A workspace invite was accepted |
| `invite_updated` | A workspace invite was updated |
| `invite_canceled` | A workspace invite was canceled |
| `invite_declined` | A workspace invite was declined |
| `access_request_accepted` | A [guest access request](https://help.webflow.com/hc/en-us/articles/33961349456915-Agency-or-Freelancer-guest-role-overview) was accepted |

#### Payload schema

| Field | Type | Description |
| --- | --- | --- |
| `targetUser` | object | The invited user, with properties `id` and `email` |
| `method` | string | How the invitation was managed, enum: `sso`, `dashboard`, `admin` |
| `userType` | string | Type of user invited, enum: `member`, `guest`, `reviewer`, `client` |
| `roleName` | string | The role assigned to the user in the invitation |
| `previousRoleName` | string | The previous role (for updated invitations) |
| `targetUsers` | array | List of users approved from a [guest access request](https://help.webflow.com/hc/en-us/articles/33961349456915-Agency-or-Freelancer-guest-role-overview) with an `id` and `email` |

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