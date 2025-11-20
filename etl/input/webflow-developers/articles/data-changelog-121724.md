---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/121724
title: "301 redirects, workspace management, and CMS publishing improvements | Webflow Developer Documentation"
published: 2025-11-17
---

[December 17, 2024](https://developers.webflow.com/data/changelog/121724)

## [301 redirects, workspace management, and CMS publishing improvements](https://developers.webflow.com/data/changelog/121724)

The Data API now supports programmatic management of 301 redirects and workspace administration, alongside enhanced bulk CMS operations in the JavaScript SDK. These additions enable developers to automate site configuration tasks and streamline content management workflows through new endpoints and improved functionality.

For important breaking changes in this release, please see the [Breaking Changes](https://developers.webflow.com/data/changelog/121724-breaking) update.

## New site configuration capabilities

### 301 redirect management

Take control of your site’s 301 redirects with new endpoints that let you create and manage 301 redirects programmatically:

- **[List 301 redirects](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/get)**

Get all configured 301 redirects for a site

- **[Create 301 redirect](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/create)**

Add a new 301 redirection rule

- **[Update 301 redirect](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/patch)**

Modify an existing 301 redirection rule

- **[Delete 301 redirect](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/delete)**

Remove an existing 301 redirection rule

### Workspace management

Programmatically create, update, and delete sites within your workspace:

- **[Create site](https://developers.webflow.com/data/reference/enterprise/workspace-management/create)**

Create a new site in your workspace

- **[Update site](https://developers.webflow.com/data/reference/enterprise/workspace-management/update)**

Modify an existing site’s properties

- **[Delete site](https://developers.webflow.com/data/reference/enterprise/workspace-management/delete)**

Remove a site from your workspace

## Improved CMS operations

### Bulk CMS management

The Data API now supports efficient methods to perform operations on multiple CMS items at once:

- **[Create multiple items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/create-items)**

Create single or multiple CMS items in one request

- **[Update multiple items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/update-items)**

Update multiple CMS items simultaneously

- **[Update multiple live items](https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-item-live)**

Update multiple published CMS items

- **[Delete multiple items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/delete-items)**

Unpublish/delete multiple CMS items at once

- **[Delete multiple live items](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live)**

Unpublish/delete multiple published CMS items

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