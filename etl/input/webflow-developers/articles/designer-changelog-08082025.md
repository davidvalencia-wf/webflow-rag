---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/changelog/08082025
title: "Enhanced element creation and form controls | Webflow Developer Documentation"
published: 2025-11-17
---

[August 8, 2025](https://developers.webflow.com/designer/changelog/08082025)

## [Enhanced element creation and form controls](https://developers.webflow.com/designer/changelog/08082025)

This release streamlines element creation workflows and provides better control over form inputs in the Designer API.

### Enhanced bulk element creation

- **Set text and style during creation**: The [element builder](https://developers.webflow.com/designer/reference/bulk-add-elements) now supports setting text and style properties during element creation, eliminating the need for separate API calls after creation. This improves developer experience and performance.

### Workspace information in site details

- **Access workspace context**: The [Get Site Information](https://developers.webflow.com/designer/reference/get-site-info) method now includes workspace details:
  - `workspaceId` \- Unique identifier for the workspace
  - `workspaceSlug` \- URL-friendly workspace identifier

### Improved form input controls

- **Better form customization**: New methods provide enhanced control over form inputs:
  - [Get input type](https://developers.webflow.com/designer/reference/form-element/get-type-input-field) \- Retrieves the HTML type of a `FormTextInput` field
  - [Set input type](https://developers.webflow.com/designer/reference/form-element/set-type-input-field) \- Sets the HTML type of a `FormTextInput` field

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