---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/usage/styling-and-theming-overrides
title: "Styling and Theming | Webflow Developer Documentation"
published: 2025-11-17
---

DevLink exports your Webflow styles as CSS, giving you full control over how components look in your React application. You can maintain design consistency while adding custom theming, responsive behavior, and component variants.

##### Never edit the generated files

Never edit the auto-generated React files or CSS Modules inside your `/devlink` folder. They will be overwritten on the next sync. Always extend or override styles externally.

## Global CSS setup

DevLink generates a `global.css` file containing base styles, responsive breakpoints, and CSS variables from your Webflow project. Import it once at your app’s root to apply Webflow’s design system globally:

app/layout.tsx

```
import "@/devlink/global.css";
```

## Override with CSS modules

The safest way to customize DevLink components is by attaching your own CSS Module classes via the `className` prop. This approach preserves Webflow’s original styles while adding your customizations:

CustomStyles.module.cssPage.tsx

```
.fancyButton {
  border-radius: 8px;
  padding: 1rem 2rem;
}
```

## Reuse Webflow classes and variables

DevLink exports your Webflow project’s class names and CSS variables, enabling you to build custom components that match your design system. This approach is ideal for components with dynamic data or complex interactions that you wouldn’t build in Webflow:

**Custom-built React component:**

ProductCard.tsxProductCard.module.css

```
import "./ProductCard.module.css";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="webflow-card">
      <img
        src={product.image}
        alt={product.name}
        className="webflow-card-image"
      />
      <div className="webflow-card-content">
        <h3 className="webflow-heading-small">{product.name}</h3>
        <p className="webflow-text-large">${product.price}</p>
        <button
          className="webflow-button-primary"
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

Additionally, you can reuse component classes from your Webflow project in your custom-built React components, by importing the CSS module into your custom component styles.

## Custom Identifiers

DevLink automatically transforms **custom IDs** into safe, namespaced selectors using CSS Modules, preventing style conflicts when components are used in larger React apps.

Custom IDs are transformed into the following format:

```
<ComponentName>_<custom-id>__<unique-identifier>
```

For example, a custom ID of `featured-section` on a **Grid** element within a `Hero` component may become: `Hero_featured-section__abc123`

Use attribute selectors with wildcards to style elements reliably:

CustomStyles.module.cssProductGrid.tsx

```
/* Target elements with custom IDs */
[id*="ProductGrid_featured-section__"] {
  background-color: var(--color-accent);
  padding: var(--spacing-large);
}

/* Target elements with custom attributes */
[data-category="electronics"] {
  border: 2px solid var(--color-primary);
}

[data-product-count] {
  position: relative;
}
```

### Avoid dynamic IDs

Some Webflow elements (like Grid or Quick Stack) rely on fixed IDs for CSS. If you replace them dynamically in React, the exported CSS will no longer apply. Instead, use custom attributes to keep Webflow’s styling intact while allowing you to attach your own identifier.

##### Don't do this

```
// ❌ This breaks Webflow’s generated CSS
<Grid id={sectionId} />
```

##### Use custom attributes instead

dashboard.jsx

```
// ✅ Use custom attributes instead
<Grid
  data-section-id={sectionId}
/>
```

## CSS-in-JS integration

If your project uses styled-components or emotion, you can wrap DevLink components with styled overrides. This approach works well for component variants and theme-based styling:

Dashboard.tsx

```
import styled from "styled-components";
import { Button } from "@/devlink";

const DangerButton = styled(Button)`
  background-color: red;
  border-radius: 4px;
  color: white;
`;

<DangerButton>Delete</DangerButton>
```

## Tailwind CSS integration

### Prevent style conflicts

To avoid conflicts between DevLink’s global styles and Tailwind’s reset, enable `skipTagSelectors` in your DevLink configuration:

webflow.json.webflowrc.js

```
{
  "devlink": {
    "skipTagSelectors": true
  }
}
```

### Control style priority

To give DevLink styles higher priority over Tailwind’s reset, add a custom layer to your CSS:

src/globals.css

```
@layer base, components, utilities, devlink;
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