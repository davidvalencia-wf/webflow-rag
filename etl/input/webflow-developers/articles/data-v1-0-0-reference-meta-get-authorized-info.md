---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/meta/get-authorized-info
title: "Authorized Info | Webflow Developer Documentation"
published: 2025-11-17
---

Basic information about the authorization being used.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Headers

Accept-VersionstringOptional

The API version

### Response

Request was successful

\_idstring or null`format: "uuid"`

The uniqueID of the authorization

createdOnstring or null`format: "date-time"`

The date the authorization was created

grantTypestring or null

The grant type of the authorization

lastUsedstring or null`format: "date-time"`

The date the authorization was last used

siteslist of strings or null

The sites authorized

orgslist of strings or null

The organizations authorized

workspaceslist of strings or null

The workspaces authorized

userslist of strings or null

The users authorized

rateLimitinteger or null

The default rate limit for the authorization

statusstring or null

The status of the authorization

applicationobject or null

Show 6 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

404

Not Found Error

429

Too Many Requests Error

500

Internal Server Error

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