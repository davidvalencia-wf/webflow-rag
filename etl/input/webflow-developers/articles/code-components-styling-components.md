---
source: webflow-developers
category: general
url: https://developers.webflow.com/code-components/styling-components
title: "Styling components | Webflow Developer Documentation"
published: 2025-11-17
---

Imported components support standard React styling approaches, but with important considerations for Shadow DOM isolation.

## How Shadow DOM affects styling

Code components render in [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), which creates an isolated styling boundary. This means:

- Your component styles won’t affect the rest of the page
- Page styles won’t affect your component
- You need to explicitly connect to external styles

Rendering components in Shadow DOM prevents style conflicts to ensure your component looks and behaves as expected. However, this also means you need to explicitly connect to external styles like site variables, inherited properties, or tag selectors.

## Adding styles to your code components

To ensure your code components are styled correctly, import your styles directly into your `*.webflow.tsx` file.

Button.webflow.tsx

```
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/globals.css'; // Import global styles
```

## CSS capabilities

The following table shows which CSS features work within Shadow DOM:

| Feature | Works in Shadow DOM | How to use |
| --- | --- | --- |
| Site variables | ✅ Yes | `var(--background-primary, fallback)` |
| Inherited properties | ✅ Yes | `font-family: inherit` |
| Tag selectors | ✅ Yes | Enable with `applyTagSelectors: true` |
| Site classes | ❌ No | Use component-specific classes |

### Site variables

Reference a site’s [variables](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables) in your components:

Button.module.css

```
.button {
    color: var(--background-primary, #000);
  }
```

To get the exact variable name, click “Copy CSS” in the three-dot menu next to any variable in the Variables panel.

### Inherited properties

CSS properties set to `inherit` work across Shadow DOM boundaries. Your component inherits styles from the parent HTML element:

Button.module.css

```
.button {
    color: var(--background-primary, #000);
    font-family: inherit;
  }
```

For example, if your component is placed inside a `<div>` with `font-family: sans-serif`, setting `font-family: inherit` in your component will use sans-serif.

### Tag selectors

[Tag selectors](https://help.webflow.com/hc/en-us/articles/33961346359699-HTML-tags) (like `h1`, `p`, `button`) defined in your site’s CSS can be automatically applied to your component. Enable this with the `applyTagSelectors` option in your component definition file.

Button.webflow.tsx

```
import { declareComponent } from '@webflow/react';
import { Button } from './Button';
// import '../styles/globals.css'; // Import global styles

export default declareComponent(Button, {
    name: 'Button',
    options: {
        applyTagSelectors: true,
    },
});
```

## Advanced configuration

Code components support modern CSS frameworks and libraries, but some require specific configuration for Shadow DOM compatibility. For guidance on using CSS frameworks and component libraries with code components, see the [frameworks and libraries guide](https://developers.webflow.com/code-components/frameworks-and-libraries).

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