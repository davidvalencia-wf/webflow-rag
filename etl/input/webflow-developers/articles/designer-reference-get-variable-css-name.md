---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-css-name
title: "Get CSS name | Webflow Developer Documentation"
published: 2025-11-17
---

## `variable.getCSSName()`

Returns the custom property name of a variable (e.g., `--primary`).

This is distinct from
[`variable.getBinding()`](https://developers.webflow.com/designer/reference/get-variable-binding), which
returns the variable wrapped in a `var()` function (e.g., `var(--primary)`).
Use `getCSSName()` when you need a reference to the variable’s name, for
example, to override its value in a custom stylesheet.

### Syntax

```
variable.getCSSName(): Promise<string>
```

### Returns

**Promise< _string_ >**

A Promise that resolves to the variable’s CSS name.

### Example

```
// Create a variable
const webflowBlue = await collection?.createColorVariable(
  "blue-500",
  "#146EF5"
);

// Get the CSS name for the variable
const cssName = await webflowBlue.getCSSName();
// cssName = "--blue-500"
```

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |