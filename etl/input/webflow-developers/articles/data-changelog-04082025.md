---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/04082025
title: "Introducing the Comments API | Webflow Developer Documentation"
published: 2025-11-17
---

[April 8, 2025](https://developers.webflow.com/data/changelog/04082025)

## [Introducing the Comments API](https://developers.webflow.com/data/changelog/04082025)

Webflow is excited to introduce a new Comments API. With these new endpoints, you can programmatically access comments across your Webflow sites, enabling integrations with your existing tools and workflows. This release makes it easier than ever to track feedback, coordinate reviews, and streamline your content management processes.

- [List all comment threads](https://developers.webflow.com/data/reference/comments/list-comment-threads)
- [Get comment thread](https://developers.webflow.com/data/reference/comments/get-comment-thread)
- [List comment replies](https://developers.webflow.com/data/reference/comments/list-comment-replies)
- [Create webhook](https://developers.webflow.com/data/reference/webhooks/create) with a new `comment_created` trigger
- [New comment thread webhook](https://developers.webflow.com/data/reference/webhooks/events/comment-created)

##### Timing on comments

There may be up to a 5-minute delay before comment threads appear in the system. This delay may also occur in webhook notifications.

### Add `.well-known` files to your site

In addition to existing support for [site configuration](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/get), the Data API now supports setting and deleting `.well-known` files. This empowers site managers to automate and streamline the management of site metadata and security configurations, enhancing integration with modern web protocols and improving overall site interoperability. For more information, see [Wefblow’s help documentation on `.well-known` files.](https://help.webflow.com/hc/en-us/articles/36293473743123-Upload-a-well-known-file)

- [Set `.well-known` file](https://developers.webflow.com/data/reference/enterprise/site-configuration/well-known-files/put)
- [Delete `.well-known` file](https://developers.webflow.com/data/reference/enterprise/site-configuration/well-known-files/delete)

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