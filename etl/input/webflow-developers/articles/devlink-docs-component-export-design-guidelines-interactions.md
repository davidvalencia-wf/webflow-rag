---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/design-guidelines/interactions
title: "Interactions | Webflow Developer Documentation"
published: 2025-11-17
---

[Webflow interactions](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/interactions) are JavaScript-powered animations and transitions. Most interactions are supported in Exported Components. See the \[#page-interactions\] section for more details on specific limitations.

## Enabling interactions

To enable interactions in your Exported Components, you need to wrap your application in the `DevLinkProvider` component.

app/layout.tsx

```
import { DevLinkProvider } from '@/devlink/DevLinkProvider';
import '@/devlink/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DevLinkProvider>
          {children}
        </DevLinkProvider>
      </body>
    </html>
  );
}
```

### Page interactions

Webflow components support [page triggers](https://help.webflow.com/hc/en-us/articles/33961357722643-Triggers-and-animations#page-triggers) with a limitation: DevLink only exports the first page interaction. If a component uses multiple page interactions across different pages, DevLink will only export the first one.

### GSAP-powered interactions

##### GSAP-powered interactions aren't supported in Exported Components.

GSAP-powered interactions aren’t supported in Exported Components.

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