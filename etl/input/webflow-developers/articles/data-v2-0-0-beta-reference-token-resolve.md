---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/reference/token/resolve
title: "Resolve ID Token | Webflow Developer Documentation"
published: 2025-11-17
---

Information about the authorized user derived from the resolved ID Token

Access to this endpoint requires a bearer token from a [Data Client App](https://developers.webflow.com/data/docs/getting-started-data-clients).

Required Scope \| `authorized_user:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Request

This endpoint expects an object.

idTokenstringOptional

The ID token created using the Designer API

### Response

Request was successful

idstring or null`format: "objectid"`

The unique ID of the user

emailstring or null`format: "email"`

The user's email address

firstNamestring or null

The user's first name

lastNamestring or null

The user's last name

siteIdstring or null

The ID of the site associated with the user

### Errors

401

Unauthorized Error

403

Forbidden Error