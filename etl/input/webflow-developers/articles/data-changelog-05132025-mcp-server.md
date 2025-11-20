---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/05132025-mcp-server
title: "Webflow MCP Server Version Update to 0.5.1 | Webflow Developer Documentation"
published: 2025-11-17
---

[May 13, 2025](https://developers.webflow.com/data/changelog/05132025-mcp-server)

## [Webflow MCP Server Version Update to 0.5.1](https://developers.webflow.com/data/changelog/05132025-mcp-server)

### Feature enhancements

- **Inline script management**

Use AI agents to generate and insert (or delete) inline code snippets

- **Collection Item deletion**

Agents can now remove CMS items programmatically, completing the full CRUD through your AI coding tool.

### Improvements

- **Structural refactor**

The codebase now has a clearer folder structure, consistent naming, and easier long-term maintenance.\*\* No breaking changes.\*\*

### New tools

These updates give your AI agents deeper, safer autonomy:

| Tool | One-line description |
| --- | --- |
| **`site_registered_scripts_list`** | Fetch a catalog of all custom code registered for the site. |
| **`site_applied_scripts_list`** | Retrieve the scripts currently applied to the live site. |
| **`add_inline_site_script`** | Inject a new inline `<script>` block into the site. |
| **`delete_all_site_scripts`** | Delete all scripts from the site in a single call. |
| **`collections_items_delete_item`** | Delete a specific CMS collection item by its ID. |

### Add 0.5.1 your AI editor

See our [MCP server documentation](https://developers.webflow.com/data/docs/ai-tools#webflows-official-mcp-server) for more information on how to add the MCP server to your AI editor.

```
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@0.5.1"],
      "env": {
        "WEBFLOW_TOKEN": "<YOUR_WEBFLOW_TOKEN>"
      }
    }
  }
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