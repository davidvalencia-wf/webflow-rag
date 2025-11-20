---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/3/12
title: "New APIs for retrieving comments | Webflow Developer Documentation"
published: 2025-11-17
---

[March 12, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/3/12)

## [New APIs for retrieving comments](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/3/12)

Webflow’s API now supports operations to retrieve comments on a site with these new endpoints:

- [List all comment threads](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/list-comment-threads) \- Get all comment threads for a site.

- [Get comment thread](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/get-comment-thread) \- Retrieve a specific comment thread by ID with full details.

- [List comment replies](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/list-comment-replies) \- Get all replies for a specific comment thread.

Comment replies aren’t included in the initial thread listing. To retrieve replies, first get the Comment Thread ID from the list endpoint, then use that ID with the replies endpoint.