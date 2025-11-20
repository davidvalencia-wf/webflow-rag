---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/limits
title: "Limits | Webflow Developer Documentation"
published: 2025-11-17
---

## Overview

This page lists the resource limits and constraints for Webflow Cloud projects. Use these tables to understand the maximums for projects, environments, assets, storage, and other resources. Limits may vary by plan and are subject to change.

## App limits

### Project limits

| Type | Limit | Description |
| --- | --- | --- |
| Projects per site | 5 (Free, Basic)<br> 15 (CMS, Business)<br> 50 (Enterprise) | Projects are connected to a GitHub repository and contain environments. |
| GitHub repository connections | 1 per site | A GitHub repository can only be connected to one project within a Webflow site. |
| Active environments | 10 | Maximum number of environments per project. |
| Supported frameworks | Next.js, Astro | Currently supported web frameworks. |

### Environment limits

| Resource | Limit | Notes |
| --- | --- | --- |
| Worker size | 10 MB | Maximum bundle size per deployment. |
| Worker CPU time | 30 seconds | Maximum execution time per request. |
| Worker memory | 128 MB | Maximum memory per worker instance. |
| Worker startup time | 400 ms | Maximum cold start time. |
| Environment variables | 100 | Maximum per environment. |

See [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/platform/limits/#memory) for more details.

### Asset limits

| Asset type | Size limit | Description |
| --- | --- | --- |
| Images | 20 MB | Maximum size per image file. |
| Videos | 1 GB | Maximum size per video file. |
| 3D Models | 500 MB | Maximum size per 3D model file. |
| Other static files | 20 MB | Maximum size for other static assets. |

### Request handling limits

| Limit type | Value |
| --- | --- |
| Request body size | 500 MB |
| Request headers | 32 KB total, 16 KB per header |
| Response body size | Unlimited |
| Response headers | 32 KB total, 16 KB per header |
| Request timeout | 30 seconds |
| URL size | 16 KB |
| Simultaneous outgoing requests | 6 |
| Subrequests per request | 1,000 |

Requests exceeding these limits are rejected with a 413 (Request Entity Too Large) error.

### Header behavior limitations

Webflow Cloud’s infrastructure enforces specific header behaviors that can override custom settings. These behaviors are:

| Header type | Direction | Behavior |
| --- | --- | --- |
| `Cache-Control` | Response | Always replaced with `private, no-cache` |
| `Cache-Control` | Request | Stripped by Webflow Cloud |
| `cache-tag` | Response | Removed from responses |
| `x-wf-usys-gate-group-access` | Response | Removed from responses |
| `x-wf-usys-variant` | Response | Removed from [Vary header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary) |
| [HSTS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security) | Response | Conditionally added by Webflow |

#### Caching implications

Webflow Cloud overrides custom cache headers from your application. Once content is cached, you can’t control caching behavior through standard HTTP headers like `Cache-Control`.

This means traditional cache invalidation methods won’t work - you’ll need to work within Webflow Cloud’s caching behavior rather than trying to override it.

### Retention periods

The following table shows how long different types of deployment and log data are retained, based on your Webflow Cloud plan:

| Type | Starter, Basic | CMS, Business | Enterprise |
| --- | --- | --- | --- |
| Previous deployments | 1 hour | 1 day | 3 days |
| Deployment logs | 1 hour | 1 day | 3 days |
| Runtime logs | 1 hour | 1 day | 3 days |

## Storage limits

### Bindings

| Feature | Limit |
| --- | --- |
| Maximum bindings per Webflow Cloud app | 5,000 |

### SQLite

| Feature | Limit |
| --- | --- |
| Databases per app | Unlimited |
| Maximum database size | 100MB (Free, Basic, CMS)<br> 1GB (Business, Enterprise)<br>[See Pricing page for more details](https://webflow.com/pricing) |
| Queries per invocation | 1,000 |
| Columns per table | 100 |
| Rows per table | Unlimited (subject to storage limits) |
| String/BLOB/table row size | 2 MB |
| SQL statement length | 100 KB |
| Bound parameters per query | 100 |
| Arguments per SQL function | 32 |
| LIKE/GLOB pattern length | 50 bytes |
| SQL query duration | 30 seconds |
| File import size | 5 GB |

### Key Value Store

| Feature | Limit |
| --- | --- |
| Namespaces | Unlimited |
| Storage per namespace | 100MB (Free, Basic, CMS)<br> 500MB (Business)<br> 2.5GB (Enterprise)<br>[See Pricing page for more details](https://webflow.com/pricing) |
| Reads per day | 100K (Free, Basic, CMS)<br> 500k (Business)<br> 5M (Enterprise)<br>[See Pricing page for more details](https://webflow.com/pricing) |
| Writes to different keys per day | 10K (Free, Basic, CMS)<br> 50k (Business)<br> 500k (Enterprise)<br>[See Pricing page for more details](https://webflow.com/pricing) |
| Writes to same key | 1 per second |
| Operations per invocation | 1,000 |
| Keys per namespace | Unlimited <br> (Subject to storage limits) |
| Key size | 512 bytes |
| Key metadata | 1,024 bytes |
| Value size | 25 MiB |
| Minimum cache TTL (Time to live) | 60 seconds |

### Object Storage

| Feature | Limit |
| --- | --- |
| Buckets per app | Unlimited |
| Data storage per bucket | 1GB (Free, Basic, CMS)<br> 5GB (Business)<br> 25GB (Enterprise)<br>[See Pricing page for more details](https://webflow.com/pricing) |
| Management operations per bucket¹ | 50/sec |
| Object key length | 1,024 bytes |
| Object metadata size | 8,192 bytes |
| Object size | 5 TiB per object |
| Upload size | 5 GiB (multipart uploads supported) |
| Upload parts | 10,000 |
| Concurrent writes to same object | 1/sec |

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