---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/memberships_user_account_updated
title: "User Account Updated | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`memberships_user_account_updated`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `_id` | string | Unique identifier for the User |
| `createdOn` | string | The timestamp the user was created |
| `updatedOn` | string | The timestamp the user was updated |
| `invitedOn` | string | The timestamp the user was invited |
| `lastLogin` | string | The timestamp the user was logged in |
| `emailVerified` | Boolean | Shows whether the user has verified their email address |
| `status` | string | The status of the user |
| `data` | object | An object containing the User’s basic info and custom fields |
| `accessGroups` | array | An array of Access Groups the user has access to |

## Example

```
{
  "_id": "64061f907c8237778232f9b7",
  "invitedOn": "2023-03-06T17:14:56.493Z",
  "createdOn": "2023-03-06T17:14:56.493Z",
  "updatedOn": "2023-03-09T20:26:01.245Z",
  "emailVerified": false,
  "data": {
    "name": "Some One",
    "email": "SomeOne@home.com",
    "accept-communications": false,
    "accept-privacy": false
  },
  "status": "invited",
  "accessGroups": [\
    {\
      "slug": "test-access-group",\
      "type": "admin"\
    }\
  ]
}
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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)