---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/custom-code-preview-mode
title: "Supporting custom code in preview mode | Webflow Developer Documentation"
published: 2025-11-17
---

Users can preview sites with custom code before publishing. When users add your app’s scripts or resources as custom code, these resources need to be accessible from Webflow’s preview domain.

## How preview mode works

When a user enables [preview](https://webflow.com/glossary/preview-mode) or [comment](https://help.webflow.com/hc/en-us/articles/33961339882131-Comments) mode, their site renders on a new subdomain:

```
{shortName}.canvas.webflow.com
```

This creates a secure, isolated environment that closely mirrors the published site experience, where custom code scripts can execute safely.

## Important considerations for custom code

If your custom code scripts implement specific security controls, they may need modification to work in preview and comment modes.

### What needs to be updated?

Your custom code scripts may need updates if they implement any of the following security controls:

- [Content-Security-Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) restrictions
- [Domain-based script or stylesheet restrictions](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [Origin or Referrer header validation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy)

### Required modifications

#### For scripts with domain restrictions

If your scripts check for specific domains or origins, update domain validation to include preview domains:

```
// Update domain validation to include preview domains
const isAllowedDomain = (domain) => {
    return domain.endsWith('.webflow.io') ||
           domain.endsWith('.canvas.webflow.com');
}
```

#### For scripts that validate origins

If your scripts validate request origins, update origin validation to include preview domains:

```
// Example of updated origin validation
const validateOrigin = (origin) => {
    return origin.includes('.webflow.io') ||
           origin.includes('.canvas.webflow.com');
}
```

#### For dynamic domain detection

If your scripts need to detect the current environment, update domain detection to include preview domains:

```
const shortName = window.location.hostname.split('.')[0];
const isPreviewMode = window.location.hostname.includes('canvas.webflow.com');
```

### Testing your custom code

To ensure your custom code works correctly:

1. Add your custom code to a site or page
2. Enter preview mode to test functionality
3. Verify that all interactive elements work as expected
4. Check that any external service connections still function properly

## Support resources

For implementation assistance or questions, please contact us at [developers@webflow.com](mailto:developers@webflow.com?subject=Support:%20Custom%20Code%20-%20Preview%20and%20Comment%20mode).

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