---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/assets/assets/create
title: "Upload Asset | Webflow Developer Documentation"
published: 2025-11-17
---

The first step in uploading an asset to a site.

This endpoint generates a response with the following information: `uploadUrl` and `uploadDetails`.

Use these properties in the header of a [POST request to Amazson s3](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPOST.html) to complete the upload.

To learn more about how to upload assets to Webflow, see our [assets guide](https://developers.webflow.com/data/docs/working-with-assets).

Required scope \| `assets:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

Information about the asset to create

fileNamestringRequired

File name including file extension. File names must be less than 100 characters.

fileHashstringRequired

MD5 hash of the file

parentFolderstringOptional

ID of the Asset folder (optional)

### Response

Request was successful

uploadDetailsobject or null

Metadata for uploading the asset binary

Show 11 properties

contentTypestring or null

idstring or null`format: "objectid"`

parentFolderstring or null`format: "objectid"`

Parent folder for the asset

uploadUrlstring or null`format: "uri"`

assetUrlstring or null`format: "uri"`

S3 link to the asset

hostedUrlstring or null`format: "uri"`

Represents the link to the asset

originalFileNamestring or null

Original file name when uploaded. If not specified at time of upload, it may be extracted from the raw file name

createdOnstring or null`format: "date-time"`

Date the asset metadata was created

lastUpdatedstring or null`format: "date-time"`

Date the asset metadata was last updated

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