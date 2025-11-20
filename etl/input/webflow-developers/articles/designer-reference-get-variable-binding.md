---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-binding
title: "Get variable binding | Webflow Developer Documentation"
published: 2025-11-17
---

## `variable.getBinding()`

Returns a binding value for the variable. Use the binding value when creating or updating variables with [custom values.](https://developers.webflow.com/designer/reference/variables-detail-overview#custom-values)

### Syntax

```
variable.getBinding(): Promise<string>
```

### Returns

**Promise< _string_ >**

A Promise that resolves to a string representing the variable’s binding.

### Example

```
// Create a variable
const webflowBlue = await collection?.createColorVariable(
  "blue-500",
  "#146EF5"
);

// Get the binding value for a variable
const binding = await webflowBlue.getBinding();
// binding = "var(--blue-500)"

// Use the binding value to create a variable with a custom value
const webflowBlue400 = await collection.createColorVariable("blue-400", {
  type: "custom",
  value: `color-mix(in srgb, ${binding}, white 50%)`,
});
```

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |