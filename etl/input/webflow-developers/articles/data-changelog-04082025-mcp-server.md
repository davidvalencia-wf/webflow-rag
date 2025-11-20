---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/04082025-mcp-server
title: "Introducing Webflow's official MCP server and LLMS.txt support | Webflow Developer Documentation"
published: 2025-11-17
---

[April 8, 2025](https://developers.webflow.com/data/changelog/04082025-mcp-server)

## [Introducing Webflow's official MCP server and LLMS.txt support](https://developers.webflow.com/data/changelog/04082025-mcp-server)

![MCP Hero Image](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/mcp_hero.png)

### Introducing Webflow’s MCP server

For developers using AI-powered tools like Cursor or Claude Desktop, we provide a [Model Context Protocol (MCP) server](https://developers.webflow.com/data/docs/ai-tools#webflows-official-mcp-server) that enhances the agent’s understanding of your Webflow projects. The MCP server has tools that enable the AI agent to access real-time information about your sites, collections, and other objects, enabling more accurate and contextual code suggestions and troubleshooting. To see a full list of tools, [see the MCP server documentation.](https://www.npmjs.com/package/webflow-mcp-server)

### LLMS.txt support

We’re excited to announce compatibility with the emerging `llms.txt` standard, making your documentation accessible and optimized for AI developer tools such as Cursor, GitHub Copilot, ChatGPT, Perplexity, and Anthropic’s Claude.

`llms.txt` is designed to be token-efficient, ensuring faster processing and cost-effective LLM interactions without sacrificing valuable info.
[Learn more](https://developers.webflow.com/data/docs/ai-tools#documentation-for-llms)

- Use [https://developers.webflow.com/llms.txt](https://developers.webflow.com/llms.txt) to access the LLM-readable documentation.
- Additionally, you can access markdown versions of any documentation page to provide a more structured and context-rich experience for LLMs. To access the markdown version of a page, add .md to the end of the URL.

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