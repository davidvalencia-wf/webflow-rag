---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/user-accounts/users/update-user
title: "Update User | Webflow Developer Documentation"
published: 2025-11-17
---

Update a User by id

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

user\_idstringRequired`format: "uuid"`

Unique identifier for a User

### Headers

Accept-VersionstringOptional

The API version

### Request

This endpoint expects a map from strings to strings.

### Response

Request was successful

\_idstring or null`format: "uuid"`

Unique identifier for the User

createdOnstring or null`format: "date-time"`

The timestamp the user was created

updatedOnstring or null`format: "date-time"`

The timestamp the user was updated

invitedOnstring or null`format: "date-time"`

The timestamp the user was invited

lastLoginstring or null`format: "date-time"`

The timestamp the user was logged in

emailVerifiedboolean or null

Shows whether the user has verified their email address

statusenum or null

The status of the user

Allowed values:invitedverifiedunverified

accessGroupslist of objects or null

Access groups the user belongs to

Show 2 properties

dataobject or null

An object containing the User's basic info and custom fields

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