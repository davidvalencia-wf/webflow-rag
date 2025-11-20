---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/reference/hooks/useWebflowContext
title: "Use Webflow Context | Webflow Developer Documentation"
published: 2025-11-17
---

## `useWebflowContext()`

Call the `useWebflowContext` hook to get information about the current Webflow environment.

Webflow provides multiple modes to support different parts of the design process including designing, page building, previewing, and publishing. The `useWebflowContext` hook provides information about the current mode and locale to help you adapt your component’s behavior and content accordingly.

Use `useWebflowContext` when you need to:

- **Adapt component behavior** depending on the mode, provide placeholders, expanded states, or guidance for designers.
- **Control interactivity** \- When in a non-interactive state, provide
- **Handle localization** with locale-specific content and formatting

## Syntax

```
useWebflowContext(): WebflowContext;

// Type definitions
type WebflowContext = {
  mode: WebflowMode;
  interactive: boolean;
  locale: string | null;
};

type WebflowMode =
  | "design"
  | "build"
  | "edit"
  | "preview"
  | "component-preview"
  | "comment"
  | "analyze"
  | "publish";
```

## Returns

**`WebflowContext`** \- An object containing the current mode, interactive state, and locale.

### WebflowContext properties

| Property | Type | Description |
| --- | --- | --- |
| `mode` | `WebflowMode` | The current Webflow mode |
| `interactive` | `boolean` | Whether the component is in an interactive state |
| `locale` | `string | null` | The current ISO string for the current locale, or `null` if the locale isn’t set |

## Examples

### Conditional rendering based on interactive state

In this example, the accordion component opens by default in design mode (when not interactive) so designers can see the full content while working.

interactive.tsx

```
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { useWebflowContext } from '@webflow/react';

const MyComponent =  ({
    text,
    variant,
}: {
    text: string;
    variant: string;
}) => {
  const { interactive } = useWebflowContext();

  // Open accordion by default in design mode (when not interactive)
  // so designers can see the full content while working
  return (
    <div>
      <h1>My Component</h1>
      <Accordion defaultExpanded={!interactive}>
        <AccordionSummary
          expandIcon={<span>▼</span>}
          aria-controls="content-section-content"
          id="content-section-header"
        >
          <Typography>Content Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This content is visible by default in design mode.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MyComponent;
```

### Locale-aware content

In this example, the component automatically switches to Spanish and French based on the locale.

locale.tsx

```
import { useWebflowContext } from '@webflow/react';

const LocalizedComponent = () => {

// Get the current locale
  const { locale } = useWebflowContext();

//  Get the localized content based on the locale
  const getLocalizedContent = () => {
    switch (locale) {
      case 'es':
        return {
          title: 'Bienvenido a nuestro sitio',
          description: 'Descubre nuestros productos y servicios',
          cta: 'Comenzar ahora'
        };
      case 'fr':
        return {
          title: 'Bienvenue sur notre site',
          description: 'Découvrez nos produits et services',
          cta: 'Commencer maintenant'
        };
      default:
        return {
          title: 'Welcome to our site',
          description: 'Discover our products and services',
          cta: 'Get started'
        };
    }
  };

  const content = getLocalizedContent();

//  Render the localized content
  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>{content.title}</h2>
      <p>{content.description}</p>
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {content.cta}
      </button>
    </div>
  );
}

export default LocalizedComponent;
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