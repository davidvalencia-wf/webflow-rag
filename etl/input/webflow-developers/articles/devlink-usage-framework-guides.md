---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/usage/framework-guides
title: "Framework Guides | Webflow Developer Documentation"
published: 2025-11-17
---

Exported components are designed to be framework-agnostic, but each framework has its own conventions and best practices for integration. This guide provides specific considerations for popular React frameworks.

Regardless of the framework you’re using, follow these patterns to successfully integrate DevLink:

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Folder.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Folder.svg)

Import paths

Ensure your import paths correctly resolve to your DevLink directory. Adjust import paths based on your project structure (for example, `@/DevLink`, `~/DevLink`, or relative paths).

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DeveloperToolsSDK.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DeveloperToolsSDK.svg)

SSR compatibility

DevLink components are fully compatible with server-side rendering. Just make sure to wrap your application with DevLinkProvider at the root level.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Styles.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Styles.svg)

Dedupe styles

Some frameworks may need configuration to prevent duplicate CSS imports. Use each framework’s recommended approach for CSS management.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Code.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Code.svg)

Type support

DevLink generates type definitions for each Webflow component. Ensure your `tsconfig.json` includes the DevLink directory `*.ts` files.

## React Server Components

Exported components, which often rely on client-side JavaScript for interactions and styling, may not work directly with React Server Components (RSC). To use Webflow components in your React application, it’s recommended to:

- Use exported Webflow components only within client components.
- Mark the React component consuming the exported Webflow component as a **client component** by adding the `"use client"` directive to the component file.
- Make sure the `DevLinkProvider` is in a client-side context (e.g., within a `layout.tsx` file marked as a client component) to enable all interactions.

ClientComponent.tsx

```
"use client";

import { MyDevLinkComponent } from '@/devlink';

export default function ClientComponent() {
  return <MyDevLinkComponent />;
}
```

## Next.js

Next.js, with its server-side rendering (SSR) and static site generation (SSG) capabilities, requires some changes when integrating client-side DevLink components and interactions.

### Styles and interactions

To support interactions, your application must be wrapped with the `DevLinkProvider` component.

###### App Router

###### Pages Router

When using the Next.js App Router in versions 13 and higher, you’ll need to:

- Import and set up the `DevLinkProvider` in your root `layout.tsx` file
- Import global styles from DevLink

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

##### React Server Components

The Next.js App Router uses React Server Components by default. For exported Webflow components that rely on client-side JavaScript for interactions and styling, you may need to add the `"use client"` directive at the top of your component files.

### Links and Images

Some frameworks like Next.js provide their own Link and Image components for use in applications. You can choose to override DevLink’s builtin Link and Image components with the ones from Next.js by passing a custom component to the `renderLink` and/or `renderImage` props of the `<DevLinkProvider>` component.

[1](https://developers.webflow.com/devlink/usage/framework-guides#update-the-nextjs-configuration)

### Update the Next.js Configuration

Update the Next.js configuration to ensure Image components work with external URLs.

next.config.ts

```
const nextConfig = {
  images: {
    remotePatterns: [\
      {\
        protocol: "https",\
        hostname: "uploads-ssl.webflow.com",\
      },\
    ],
  },
};
module.exports = nextConfig;
```

[2](https://developers.webflow.com/devlink/usage/framework-guides#create-custom-components)

### Create custom components

Create custom components that will wrap the Next.js Link and/or Image components:

renderers.tsx

```
  "use client";

  import Image from "next/image";
  import Link from "next/link";
  import { RenderLink, RenderImage } from "@/devlink";

  export const LinkRenderer: RenderLink = ({
    href,
    className,
    children,
    ...props,
  }) => (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );

  export const ImageRenderer: RenderImage = ({
    src,
    alt,
    height,
    width,
    loading,
    className,
    ...props,
  }) => {
    const imgProps = {
      loading,
      className,
      src: typeof src === "string" ? src : "",
      alt: alt || "",
      width: width === "auto" ? undefined : (width as number),
      height: height === "auto" ? undefined : (height as number),
      // Note: this will fill the image to its parent element container
      // so you'll need to style the parent container with the desired size.
      fill: width === "auto" || height === "auto",
      ...props,
    };

    return <Image {...imgProps} />;
  };
```

[3](https://developers.webflow.com/devlink/usage/framework-guides#configure-the-devlinkprovider)

### Configure the DevLinkProvider

In `layout.tsx`, pass the custom components to the `renderLink` and/or `renderImage` props of the `<DevLinkProvider>` component.

layout.tsx

```
import "@/devlink/global.css";
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { LinkRenderer, ImageRenderer } from "@/components/renderers"; // Custom components
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DevLinkProvider renderLink={LinkRenderer} renderImage={ImageRenderer}>
          {children}
        </DevLinkProvider>
      </body>
    </html>
  );
}
```

## Remix

Remix is a full-stack web framework that prioritizes web standards and performance. When using DevLink with Remix:

- **Client-side rendering**: Make sure that components relying on DevLink’s JavaScript interactions are rendered client-side. You may need to use `useEffect` or other client-side hydration techniques for dynamic content.
- **Styling**: Import the DevLink `global.css` within your root `app/root.tsx` or a relevant stylesheet. Address any CSS conflicts with Remix’s default styles or your custom CSS.
- **Data loading**: Integrate DevLink components with Remix’s data loading mechanisms (e.g., `loader` functions) by passing fetched data as props to your DevLink-wrapped components.

**Example**

app/root.tsxapp/routes/\_index.tsx

```
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { DevLinkProvider } from '~/devlink/DevLinkProvider';
import styles from '~/devlink/global.css';

// Import styles using the links export
export const links = () => [\
  { rel: "stylesheet", href: styles }\
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      {/* Wrap the Outlet with the DevLinkProvider */}
        <DevLinkProvider>
          <Outlet />
        </DevLinkProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## Gatsby

Gatsby is a static site generator for React. You can use DevLink components inside your Gatsby project for both static and interactive content. Follow the steps below to integrate DevLink.

### Static and interactive components

- **Static components** are purely presentational and work seamlessly with Gatsby’s static generation.
- **Interactive components** rely on `window`, animations, or JavaScript APIs and need to be hydrated on the client. Use `useEffect` or a mounted state guard to avoid hydration mismatches.

**Example**

/src/components/DevLinkInteractiveClient.tsx

```
import { useEffect, useState } from "react";
import { DevLinkInteractive } from "../devlink/DevLinkInteractive";

export function DevLinkInteractiveClient(props: any) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null; // Prevents SSR mismatch
  return <DevLinkInteractive {...props} />;
}
```

### Styling

Import DevLink’s global stylesheet so your components render with the expected styles. You can do this in either:

- `gatsby-browser.tsx` to apply styles on the client, or
- A shared layout component to ensure styles are included during SSR.

### DevLinkProvider

To give all routes access to DevLink, wrap your app root element with `DevLinkProvider`. Add the wrapper to both `gatsby-browser.tsx` and `gatsby-ssr.tsx`.

gatsby-browser.tsxgatsby-ssr.tsx

```
import React from "react";
import { DevLinkProvider } from "./src/devlink/DevLinkProvider";
import "./src/devlink/global.css"; // Option A: import global styles here

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <DevLinkProvider>{element}</DevLinkProvider>
);
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