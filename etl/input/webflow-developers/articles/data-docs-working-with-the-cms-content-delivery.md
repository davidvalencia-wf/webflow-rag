---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery
title: "Multi-Channel Content Delivery | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow’s content delivery API enables high-performance, low-latency delivery of your CMS content to apps, services, and other platforms beyond your website. These APIs serve published content from a modern cloud edge connectivity network and automate caching, ensuring fast response times for your users.

## Content delivery with Webflow

Webflow provides two APIs for working with CMS content, each designed for a different purpose:

- **`api.webflow.com`**

The primary API server for managing CMS content. This uncached server handles real-time CRUD operations. While it always returns the most up-to-date data, response times may be slower since each request must reach Webflow’s backend servers directly.

- **`api-cdn.webflow.com`**

For headless content delivery at scale. Serve content consistently across multiple channels like websites, apps, email campaigns, and digital touchpoints while leveraging built-in caching for fast, reliable performance.

### Endpoints

The content delivery API provides the following read-only endpoints for accessing published CMS content:

- [Get a live collection item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/get-item-live): Retrieves a selected published item from a collection
- [List live collection items](https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live): Retrieves all published items from a collection

To use the content delivery API, replace the standard API domain - `api.webflow.com` \- with `api-cdn.webflow.com` in your requests. For example:

GET

/v2/collections/:collection\_id/items/:item\_id/live

cURL

```
curl https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live \
     -H "Authorization: Bearer <token>"
```

### Authentication

The content delivery API uses the same authentication methods as the [Webflow API](https://developers.webflow.com/data/reference/authentication), supporting both [site tokens](https://developers.webflow.com/data/reference/site-token) and [OAuth access tokens](https://developers.webflow.com/data/reference/oauth-app).

For optimal security and management, create a dedicated API token with [CMS Read-Only permissions](https://developers.webflow.com/data/reference/scopes) for each delivery channel. This allows you to independently manage access and quickly revoke access if needed without affecting other integrations. For step-by-step instructions on creating and managing site tokens, see [the site token guide](https://developers.webflow.com/data/reference/site-token).

### Caching policy

Caching improves content delivery by reducing server load, minimizing latency, and ensuring reliable performance during high traffic.

Here’s how Webflow’s CDN caching works:

#### Initial requests

When you first request published CMS data, the request goes to Webflow’s origin servers (e.g. `api.webflow.com`). The response is then stored in the CDN’s cache. Subsequent identical requests will be served directly from the cache, providing faster response times.

##### Rate limit errors

If too many uncached requests hit the origin servers simultaneously, you may temporarily receive 429 rate limit errors. These should resolve once responses are cached and served from the CDN. See the [rate limits section](https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery#rate-limits) for more details.

#### Cache duration

Cached responses are stored for **120 seconds (2 minutes) for enterprise plans.** For other plans, the cache duration is **300 seconds (5 minutes).** After this period:

- The cache entry is automatically purged
- The next request will fetch fresh data from the origin server (`api.webflow.com`)
- The new response is cached for another 120 seconds for enterprise plans, or 300 seconds for other plans

This ensures that users receive reasonably up-to-date content while maintaining optimal performance.

#### Content updates

When you update or delete published CMS items, there may be up to a 120-second delay before changes are reflected in the API responses due to the cache duration. During this period, users may still receive the previous version of the content until the cache refreshes.

### Rate limits

The Webflow API includes rate limits that vary based on your site plan. For cached requests that hit the CDN, there are effectively no rate limits. However, uncached requests to the origin server count against your plan’s rate limits.

When you exceed the rate limit, the API will respond with a `429 Too Many Requests` status code. To learn more about the specific rate limits for your plan, see the [rate limits documentation](https://developers.webflow.com/data/reference/rate-limits).

To minimize rate limit errors when working with requests for cached content:

- Implement retry logic with exponential backoff for 429 responses
- [Stagger initial, uncached requests to avoid overwhelming the origin server](https://newsletter.scalablethread.com/p/how-to-handle-sudden-bursts-of-traffic?open=false#%C2%A7exponential-jitter-and-retry)

### FAQs

###### How do I know if my request is being served from the CDN or the origin server?

To determine whether your API request is being served from a CDN cache or the origin server, you can check the `CF-Cache-Status` response header to see the cache status. If the status says HIT, the response was served from the CDN cache. For responses with a MISS or BYPASS status, the request was served from the origin.

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