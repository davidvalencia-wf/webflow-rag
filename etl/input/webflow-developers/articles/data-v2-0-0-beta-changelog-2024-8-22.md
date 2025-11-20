---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/8/22
title: "Enhanced security and permissions, and new endpoints for site configuration | Webflow Developer Documentation"
published: 2025-11-17
---

[August 22, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/8/22)

## [Enhanced security and permissions, and new endpoints for site configuration](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/8/22)

In this latest release, we’ve rolled out some significant updates to our APIs. First up, we’ve strengthened security by ensuring that only Workspace Admins can manage changes to Apps. In the Data API, we’ve introduced new endpoints that give you greater control over `robots.txt` files and site redirects. And for those using the Designer API, you can now subscribe to alerts when users select new CMS items on collection pages, making it simpler to keep track of automatically generated page paths.

## Security & permissions

- **Enhanced Workspace App Management Permissions:**

Previously, all members within a Workspace had the ability to manage Apps (for example, uploading new bundles, updating redirect URIs). Apps now enforce stricter permissions, allowing only Workspace Admins to perform these actions. This ensures that sensitive operations are restricted to authorized personnel.
- **Mandatory 2FA for Workspace Admins:**

To further enhance security, Workspace Admins are now required to have two-factor authentication (2FA) enabled to upload new App Bundles. This additional security layer helps protect your Workspace from unauthorized access and potential threats.

## New endpoints

#### **Robots.txt**

- **[Replace robots.txt](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/put):** Replace the `robots.txt` configuration for various user agents.
- **[Update robots.txt](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/patch):** Update the `robots.txt` configuration for various user agents.
- **[Delete user-agent rules](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/delete):** Remove specific rules for a user-agent in your `robots.txt` file.

#### **Site redirects**

- **[Get site redirects](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/get)**: Fetch a list of all URL redirect rules configured for a specific site.
- **[Create a site redirect rule](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/create):** Add a new URL redirection rule to a site.
- [**Delete site redirect rules**](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/delete): Remove URL redirection rules from a site.

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions