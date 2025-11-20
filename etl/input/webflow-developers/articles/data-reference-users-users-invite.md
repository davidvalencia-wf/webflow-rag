---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/users/users/invite
title: "Create and Invite a User | Webflow Developer Documentation"
published: 2025-11-17
---

Create and invite a user with an email address.

The user will be sent and invite via email, which they will need to accept in order to join paid any paid access group.

Required scope \| `users:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

emailstringRequired`format: "email"`

Email address of user to send invite to

accessGroupslist of stringsOptional

An array of access group slugs. Access groups are assigned to the user as type `admin` and the user remains in the group until removed.

### Response

Request was successful

idstring or null`format: "objectid"`

Unique identifier for the User

isEmailVerifiedboolean or null

Shows whether the user has verified their email address

lastUpdatedstring or null`format: "date-time"`

The timestamp the user was updated

invitedOnstring or null`format: "date-time"`

The timestamp the user was invited

createdOnstring or null`format: "date-time"`

The timestamp the user was created

lastLoginstring or null`format: "date-time"`

The timestamp the user was logged in

statusenum or null

The status of the user

Allowed values:invitedverifiedunverified

accessGroupslist of objects or null

Access groups the user belongs to

Show 2 properties

dataobject or null

An object containing the User's basic info and custom fields

Show 1 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

403

Forbidden Error

404

Not Found Error

409

Conflict Error

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