---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/reference/app-subscriptions/app-subscriptions
title: "Get app subscriptions | Webflow Developer Documentation"
published: 2025-11-17
---

Information about subscriptions for a specific authorization token

Access to this endpoint requires a bearer token from a [Data Client App](https://developers.webflow.com/data/docs/getting-started-data-clients).

Required Scope \| `app_subscriptions:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Response

Request was successful

appSubscriptionslist of objects or null

Show 1 properties

### Errors

401

Unauthorized Error

403

Forbidden Error