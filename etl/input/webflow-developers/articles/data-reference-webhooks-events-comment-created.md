---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/webhooks/events/comment-created
title: "New Comment Thread | Webflow Developer Documentation"
published: 2025-11-17
---

Information about a new comment thread or reply

##### Timing of comment webhooks

There may be a delay of up to 5 minutes before new comments appear in the system and trigger the webhook notification.

### Payload

The payload of this webhook request is an object.

triggerTypestringOptional

The type of event that triggered the request

payloadobjectOptional

The comment webhook payload contains data for the thread and for replies. Check the type to determine if the payload is for a thread or a reply. The webhook payload may be delayed by up to 5 minutes.

Show 15 properties

### Response

200

any

Return a 200 status to indicate that the data was received successfully.

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