---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/design-guidelines/element-settings
title: "Element Settings | Webflow Developer Documentation"
published: 2025-11-17
---

This guide provides best practices for working with element settings, ensuring your components are semantic, accessible, and easily integrated into your React applications.

## Element tags

Some Webflow elements let you override or bind their HTML tag at runtime. This is useful for keeping your exported components semantic and accessible without creating duplicate versions of the same component.

### Headings

Heading elements in Webflow have a Tag setting. With components, you can bind this setting to a prop, then set the tag at runtime. This allows you to reuse the same Heading component across different contexts, while keeping your document outline accessible and SEO-friendly.

![Prop on Tag setting for Heading element](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/devlink/pages/exported-components/assets/heading-prop.png)

Tag Property for a Heading element

In React, you can set the tag at runtime by passing the prop to the component.

my-component.jsx

```
<Heading headingTag="h1" />
```

### Div blocks

`div` blocks don’t require any additional setup in the Designer. Exported components expose an `as` prop automatically, letting you choose the rendered tag at runtime.

my-component.jsx

```
<DynamicDiv as="section" />
```

This approach allows you to make generic containers semantic, and improve accessibility and markup quality without duplicating components.

## Custom identifiers

You can add **custom IDs** and **custom attributes** to elements in the Designer. DevLink automatically transforms custom IDs into safe, namespaced selectors using CSS Modules, preventing style conflicts when components are used in larger React apps.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/devlink/pages/exported-components/assets/featured-section.png)

Custom identifiers component property

DevLink transforms custom IDs into the following format upon export:

```
<ComponentName>_<custom-id>__<unique-identifier>
```

For example, a custom ID of `featured-section` on a **Grid** element within a `Hero` component may become: `Hero_featured-section__abc123`

This ensures that each identifier is unique, even if multiple instances of the component appear on the page.

### Dynamic IDs

Some Webflow elements (like **Grid** or **Quick Stack**) use built-in IDs as **styling hooks**. These IDs appear in the Style Panel with a pink marker. If you make them dynamic in React, Webflow’s generated CSS selectors will no longer match, and your styling will break.

Don’t replace Webflow IDs dynamically in React, because Webflow’s generated CSS selectors will no longer match.

```
// ❌ This breaks Webflow’s generated CSS
<Grid id={sectionId} />
```

### Custom attributes

Instead of replacing IDs, attach your own [custom attributes](https://help.webflow.com/hc/en-us/articles/33961389460115-Custom-attributes). This keeps Webflow’s CSS intact while still giving you dynamic identifiers for React logic.

#### Adding custom attributes in Webflow

Select the element you want to add a custom attribute to, then navigate to the element’s settings panel. Scroll down to the **Custom Attributes** section and click the `+` button to add a custom attribute with a name and value.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/devlink/pages/exported-components/assets/custom-attributes.png)

Custom attributes component property

ProductGrid.tsx

```
import { Grid } from "@/devlink/Grid";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  category: string;
}

export function ProductGrid({ products, category }: ProductGridProps) {
  return (
    <Grid
      id="product-grid-123" // Keep original Webflow ID for styling
      data-category={category} // ✅ Use custom attributes for dynamic data
      data-product-count={products.length}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
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