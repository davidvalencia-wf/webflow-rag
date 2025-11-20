---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/pages-overview
title: "Pages & Folders | Webflow Developer Documentation"
published: 2025-11-17
---

Your browser does not support HTML video.

The Pages and Folders APIs provide access to the organizational structure of a site, as well as the settings and metadata of individual pages.

## Pages

The Pages APIs provide access to general page information, enabling Apps to update a page name, slug, and title. Additionally, Apps can programmatically manage SEO and Open Graph information through the Pages APIs, which is essential for improving search engine visibility and ranking, as well as controlling how content looks when shared on social media platforms.

Lastly, the Pages APIs also allow visibility into the current setting of a page, allowing Apps to determine whether a page is a draft, or if it’s password protected and more.

## Folders

The Folders APIs allow Apps to [organize pages within folders, also known as directories.](https://university.webflow.com/lesson/page-folders?topics=site-settings) You can create and nest folders – subfolders, or subdirectories – for sites with deep hierarchy (i.e., sites with information organized into more sub-levels).

##### Folders affect page URLs

Moving pages or folders to a new folder will result in a URL update. This will cause the old URLs to return a 404 page. If you want the old URLs to redirect to the new location, you’ll need to use 301 redirects.

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