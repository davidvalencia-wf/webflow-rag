---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/extension-utilities
title: "Extension utilities | Webflow Developer Documentation"
published: 2025-11-17
---

The Designer API offers essential utilities to manage your extension’s behavior and interaction with the Designer.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/LayoutDashboard.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/LayoutDashboard.svg)\\
\\
Site information\\
\\
Access site details and configure how your extension appears in the Designer](https://developers.webflow.com/designer/reference/get-site-info) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Interactions.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Interactions.svg)\\
\\
User events\\
\\
Subscribe to Designer events to create responsive extensions](https://developers.webflow.com/designer/reference/events) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Export.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Export.svg)\\
\\
App discovery\\
\\
Make your extension discoverable in element settings](https://developers.webflow.com/designer/reference/app-intents-and-connections) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Encryption.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Encryption.svg)\\
\\
User authentication\\
\\
Authenticate users with the Data API, and access Data API resources](https://developers.webflow.com/designer/reference/get-user-id-token)

## Best practices

Dynamic updates

[Subscribe to relevant events](https://developers.webflow.com/designer/reference/events) like when a user selects a new element to keep your extension in sync with the Designer state.

Appropriate sizing

[Size your extension appropriately](https://developers.webflow.com/designer/reference/resize-extension) with `resizeExtension()`. Too large and it dominates the UI; too small and it’s hard to use.

For a comprehensive guide to building effective extensions, check out our [Quick Start Guide](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) and [App Setup](https://developers.webflow.com/designer/reference/app-structure) documentation.