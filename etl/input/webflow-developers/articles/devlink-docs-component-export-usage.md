---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/usage
title: "Using Exported Components | Webflow Developer Documentation"
published: 2025-11-17
---

Once you’ve exported your components, you can use them in your React project. This section provides guides for integrating Exported Components with various frameworks, styling and theming, data and state integration, and best practices for usage.

## Using Exported Components

[1](https://developers.webflow.com/devlink/docs/component-export/usage#apply-webflows-design-system-globally)

### Apply Webflow's design system globally

To apply Webflow’s design system globally, import the `global.css` file at the root of your application.

app/layout.tsx

```
import { DevLinkProvider } from '@/devlink/DevLinkProvider';
import '@/devlink/global.css';
```

[2](https://developers.webflow.com/devlink/docs/component-export/usage#wrap-your-application-in-the-devlinkprovider-component)

### Wrap your application in the DevLinkProvider component

Wrap your application in the `DevLinkProvider` component to ensure all exported components have access to Webflow interactions.

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
      {/* Wrap your application in the DevLinkProvider component */}
        <DevLinkProvider>
          {children}
        </DevLinkProvider>
      </body>
    </html>
  );
}
```

[3](https://developers.webflow.com/devlink/docs/component-export/usage#use-the-devlink-alias)

### Use the DevLink alias

To import the components and styles into your React project, you can use the DevLink alias. To set up the alias, update the paths in `tsconfig.json` to the correct location of your DevLink components.

tsconfig.json

```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/devlink": ["./devlink"],
      "@/devlink/*": ["./devlink/*"]
    }
  }
}
```

[4](https://developers.webflow.com/devlink/docs/component-export/usage#use-the-exported-components)

### Use the exported components

Now you can import and use your Webflow components in your application. This particular example uses three components exported from Webflow via DevLink: `Hero`, `Card`, and `Button`.

You can use them in your application:

app/page.tsx

```
import { Button } from '@/devlink/Button';
import { Card } from '@/devlink/Card';
import { Hero } from '@/devlink/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <Card />
      <Button />
    </main>
  );
}
```

##### Always include the component name in the import

Always include the component name in the import. For example, `import { Hero } from '@/devlink/Hero';` instead of `import { Hero } from '@/devlink';`.

## Learn more

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CirclePlay.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CirclePlay.svg)\\
\\
Getting Started\\
\\
How to setup DevLink and export components to a React project.](https://developers.webflow.com/devlink/docs/quick-start/quick-start-component-export) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/ComponentsCode.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/ComponentsCode.svg)\\
\\
Framework Guides\\
\\
Specific guides for integrating DevLink with various frameworks, including Next.js (App Router & Pages Router), Remix, Gatsby, and Vite/CRA.](https://developers.webflow.com/devlink/usage/framework-guides) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Styles.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Styles.svg)\\
\\
Styling and Theming Overrides\\
\\
How to override DevLink component styles using CSS Modules, global CSS imports, reusing Webflow classes, targeting namespaced selectors, and advanced configuration.](https://developers.webflow.com/devlink/usage/styling-and-theming-overrides) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Troubleshooting.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Troubleshooting.svg)\\
\\
Troubleshooting DevLink\\
\\
Solutions for common issues encountered when working with DevLink, including authentication, component sync, styling, interactions, and framework-specific problems.](https://developers.webflow.com/devlink/docs/component-export/usage/troubleshooting)

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