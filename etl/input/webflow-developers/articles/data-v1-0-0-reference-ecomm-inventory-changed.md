---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecomm_inventory_changed
title: "Inventory Changed | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`ecomm_inventory_changed`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `_id` | string | Unique identifier for a SKU item |
| `quantity` | number | Total quantity of items remaining in inventory (if finite) |
| `inventoryType` | string | infinite or finite |

## Example

```
{
    "_id": "5bfedb42bab0ad90fa7dad39",
    "quantity": 83,
    "inventoryType": "finite"
}
```

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)