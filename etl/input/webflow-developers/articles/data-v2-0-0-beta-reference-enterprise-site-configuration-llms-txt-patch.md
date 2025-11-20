---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/patch
title: "Update LLMS.txt | Webflow Developer Documentation"
published: 2025-11-17
---

Update llms.txt for a specific Site.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope: `site_config:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

fileDatastringOptional

The content of the LLMSTXT file

### Response

Request was successful

contentstring or null

The content of the LLMSTXT file

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