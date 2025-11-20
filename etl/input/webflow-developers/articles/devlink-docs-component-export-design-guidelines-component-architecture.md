---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/design-guidelines/component-architecture
title: "Component Architecture | Webflow Developer Documentation"
published: 2025-11-17
---

You can design components in Webflow the same way you normally would, using classes, most elements, and interactions. DevLink takes care of turning those designs into React components.

By following these guidelines, you’ll make sure your components export cleanly and behave as expected in your React app.

## Supported elements

The following Webflow elements are supported for export through DevLink:

###### Layout

###### Interactive

###### Media and Content

```
- Container
- Div Block
- Section
- Grid
- Columns
- List / List Item
- Map
- Navbar
- Slider
- Tabs
```

##### Ecommerce and CMS-specific elements are not supported

Ecommerce and CMS-specific elements aren’t supported in Exported Components.

##### Use DevLink Slots instead of Component Slots

Component slots aren’t supported in Exported Components. Please [see documentation](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/props-slots) on how to use DevLink Slots instead.

## Component architecture

When building components in Webflow, you can choose between two main approaches to component architecture, or even mix them together based on your specific needs:

###### Complex components

Larger, self-contained components that represent complete UI sections or features. They’re ideal when you want to maintain consistency between your Webflow site and React app for entire sections of your interface.

Use these for components that need to look and behave identically across both platforms

**Examples:**

- Navigation bars (with all their states and interactions)
- Complete pricing tables (with all cells and styling)
- Full footers (with all links and sections)
- Entire page sections (like hero sections or feature blocks)

###### Atomic components

Smaller, reusable building blocks that form the foundation of your design system. They’re perfect for creating a consistent look and feel across your application.

Use these for basic UI elements that you’ll combine in different ways

**Examples:**

- Buttons (with different variants)
- Headings (with different sizes)
- Links (with different styles)
- Cards (with different layouts)

### Forms

Design forms so engineers can choose between two predictable build paths:

###### Export a full Webflow form as one component

Export a whole Webflow form for simple, lightweight flows when you don’t need controlled inputs or complex validation.

Add a [runtime prop](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/props-slots#runtime-props) to the Form in Webflow so apps can pass handlers like `onSubmit`.

In React, treat the exported form as an uncontrolled form: prevent default, read values via `FormData`, and post to your endpoint. If your handler throws, render the form’s `Error` state; otherwise show `Success` and map these directly to Webflow’s built-in states.

#### Example

This example uses a whole Webflow form exported as one React component. The form stays visually identical to your Webflow design, but in your React code you pass it a runtime prop called `formProps`. That prop lets you hook into the form’s submit event.

newsletter-signup-form.jsx

```
import { NewsletterSignupForm } from "@/devlink/NewsletterSignupForm";

export function FooterSignup() {
  return (
    <NewsletterSignupForm
      // Runtime prop
      formProps={{
        onSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const res = await fetch("/newsletter-signup", {
            method: "POST",
            body: new FormData(e.currentTarget),
          });
          if (!res.ok) throw new Error("Submit failed"); // triggers Error state
        },
      }}
    />
  );
}
```

- `NewsletterSignupForm` is your exported Webflow form, now usable as a React component. It already includes the fields, labels, success message, and error message you styled in Webflow.
- `formProps` is a runtime prop that lets you pass an object that can include handlers like `onSubmit`.
- `onSubmit` function
  - The handler prevents the browser’s default form submission.
  - It collects the field values with `new FormData(e.currentTarget)`.
  - It posts that data to your app’s backend (here: /newsletter-signup).
  - If the request fails, it throws an error. That error tells the form to switch to its Error state. If the request succeeds, the form automatically shows its Success state.
- **Success/Error states**
These are the states you set up visually in Webflow. The exported component just switches between them depending on whether your submit handler finishes or throws.

###### Compose forms from exported Webflow elements

Instead of exporting a whole form, you can export individual inputs and buttons and build your own `<form>` in React. This gives you full control over:

- Validation (for example, with react-hook-form + Zod)
- Error messages (announced with aria-invalid and aria-describedby)
- Submission state (disable the button while sending, show a spinner)
- Success handling (show a toast, banner, or redirect)

This approach keeps the Webflow design but lets you manage all behavior in React.

validate-signup-form.jsx

```
import { useForm } from "react-hook-form";
import { EmailInput } from "@/devlink/EmailInput";
import { SubmitButton } from "@/devlink/SubmitButton";

export function SignupForm() {
  const { register, handleSubmit, formState } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    await fetch("/newsletter-signup", {
      method: "POST",
      body: new URLSearchParams(data),
    });
    // Show your own success UI here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <EmailInput
        inputProps={{
          ...register("email", { required: true }),
          type: "email",
          placeholder: "you@example.com",
          "aria-invalid": formState.errors.email ? true : undefined,
        }}
      />

      {formState.errors.email && (
        <p role="alert">Please enter a valid email.</p>
      )}

      <SubmitButton />
    </form>
  );
}
```

In this example, you export the `EmailInput` and `SubmitButton` elements from Webflow. You then assemble them in your own `<form>` in React. You use react-hook-form to handle the form’s state and validation.

- React manages validation and errors with `react-hook-form`.
- An error message is displayed and announced when validation fails.

Success handling is left to the developer (toast, banner, redirect, etc.).

### Custom Code

DevLink doesn’t export site or page-level custom code (e.g. code added in a page’s `<head>` or `<body>`). It also doesn’t preserve plain class selectors because DevLink applies unique namespaces to every component.

If you need custom CSS or JS with a DevLink component, **add it using a Code Embed element placed inside the component.**

#### Adding custom CSS

1. Add a Code Embed inside your Webflow component.
2. Wrap your CSS in `<style>` tags.
3. Target DevLink’s [namespaced classes](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/element-settings#custom-identifierss) with an attribute selector:

my-custom-code-embed.css

```
<style>
[class*="MyComponent_my-class__"] {
  /* your styles */
}
</style>
```

#### Adding custom JavaScript

The Code Embed element also supports `<script>`. Place scripts here only if they’re specific to the component. For logic, prefer handling interactions in your React/JS app.

### Repeatable lists

When rendering lists of data in an exported component, split the implementation into:

- **Container component**
defines the overall list structure and exposes a slot property for content.

- **Item component**
defines how each item is rendered.

This pattern keeps layouts reusable, rows portable, and responsibilities clear.

#### Example: User table

Create the following components in Webflow:

- `UserTable` — table structure with a [DevLink slot property](https://developers.webflow.com/devlink/docs/component-export/design-guidelines/props-slots#devlink-slots) named `tableContent`.
- `UserTableRow` — a row layout for a single user.

In React, you can use the `UserTable` component to render the outer table and then pass it a list of `UserTableRow` components (hydrated with your own data) with the `tableContent` prop.

user-dashboard.jsx

```
import { UserTable } from "@/devlink/UserTable";
import { UserTableRow } from "@/devlink/UserTableRow";
import { useQuery } from "react-query";

// Replace with your real data source
const fetchUsers = () =>
  Promise.resolve([\
    {\
      id: 1,\
      image: "/sophie.png",\
      name: "Sophie Moore",\
      email: "sophie@dashflow.com",\
      jobTitle: "CTO & Co-Founder",\
      active: true,\
      company: "BRIX Templates",\
      role: "Member",\
    },\
    {\
      id: 2,\
      image: "/andy.png",\
      name: "Andy Smith",\
      email: "andy@dashflow.com",\
      jobTitle: "VP of Marketing",\
      active: false,\
      company: "BRIX Templates",\
      role: "Member",\
    },\
  ]);

const Users = () => {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  return (
    <UserTable
      tableContent={
        <>
          {(users ?? []).map(({ active, id, ...user }) => (
            <UserTableRow
              {...user}
              key={id}
              greenBadgeVisibility={active}
              redBadgeVisibility={!active}
              greenBadgeText="ACTIVE"
              redBadgeText="INACTIVE"
            />
          ))}
        </>
      }
    />
  );
};

export default Users;
```

## Accessibility

DevLink components inherit their accessibility features from the Webflow elements they’re built upon. To ensure your components meet accessibility standards, follow [Webflow’s accessibility guidelines.](https://help.webflow.com/hc/en-us/articles/33961346219923-Accessible-elements-in-Webflow)

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