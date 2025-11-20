---
source: webflow-developers
category: general
url: https://developers.webflow.com/devlink/docs/component-export/design-guidelines/props-slots
title: "Props and Slots in Exported Components | Webflow Developer Documentation"
published: 2025-11-17
---

DevLink converts Webflow’s component properties into fully typed React props, giving you programmatic control over your components.

These props come with full TypeScript support and preserve all the defaults and rules set up in Webflow. You can use them to update content, handle user interactions, and control how your components behave in your React app.

## Basic props

Webflow’s native component properties for content and visibility. The visual editor defines these properties, and DevLink automatically types them in React. Component export supports the following properties:

A prop’s **Type** setting determines the values it can accept and how it appears in the Designer.

- Text
- Video
- Link

- Rich text
- Number
- Visibility

#### Example: Notification button

This **Button** component has text and visibility props to show the number of new notifications for a user. The `text` prop sets the number of notifications, while the `showThis` visibility prop shows/hides the button based on the number of notifications.

Dashboard.tsx

```
import { Button } from "../../devlink/Button";

export default function Dashboard({numNotifications}: {numNotifications: number}) {
  return (
    <div>
      <Button
        text={`${numNotifications} new notifications`}
        showIcon={numNotifications > 0}
      />
    </div>
  );
}
```

## DevLink props

DevLink-specific props customize the behavior of the exported component in your React app. They’re not natively supported on Webflow sites, but can be configured in the Designer before exporting.

### Runtime props

Runtime props let you add React-specific behavior to an exported component where Webflow doesn’t have a native setting. When you add a runtime-props property to an element in the Designer, DevLink generates a matching React prop and spreads it onto that element’s underlying HTML node.

#### Creating runtime props in Webflow

Add runtime props to your components by selecting a supported element, then navigating to the element’s settings panel.

In the DevLink section, you can add runtime props to the element. Only certain elements have support for Runtime Props.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/devlink/pages/exported-components/assets/runtime-props.png)

Runtime props component property

Use runtime props to:

- Handle events (e.g., `onClick`, `onSubmit`)
- Apply specific inline styles via the React style prop
- Override the element’s class (not recommended—replaces Webflow classes)
- Attach a React `ref`

#### Example: Notification button

This **Button** component has a `buttonProps` runtime prop to handle the click event of the button. The `buttonProps` prop is an object that contains the properties of the button.

Dashboard.tsx

```
import { Button } from "../../devlink/Button";

export default function Dashboard({numNotifications}: {numNotifications: number}) {
  return (
    <div>
      <Button
        text={`${numNotifications} new notifications`}
        showIcon={numNotifications > 0}
        buttonProps={{ onClick: () => handleClick() }}
      />
    </div>
  );
}
```

### DevLink slots

A **slot** is a DevLink-specific property that accepts a React component as its value.

Slots let you nest components inside other components in your React app. This is especially useful when you need to combine Webflow-authored structure with custom React logic or third-party components that can’t be built in Webflow directly.

To set a slot property on an element, create a wrapper div block in the component, then go to the Element settings panel > DevLink > Slot, then connect it to a property.

#### Example: Card component with a slot

This **Card** component has a `cardContent` slot that accepts a React component as its value.

Card.tsx

```
import { Card } from "@/devlink/Card";
import { UserProfile } from "@/components/UserProfile";

export function Example() {
  return (
    <Card
      cardContent={
        <UserProfile id="42" />
      }
    />
  );
}
```

**When to use slots**

- Embed custom React components (e.g., charts, modals, media players).
- Integrate third-party libraries inside a Webflow-made layout.
- Pass dynamic content into a reusable Webflow component without hard-coding it in the Designer.

##### DevLink slots are different than Webflow Component Slots

DevLink slots enable you to inject custom React components or content into specific areas of an exported React component. In contrast, Webflow Component Slots are used within Webflow’s visual editor to insert Webflow Components into designated areas of a component.

**Webflow Component Slots aren’t supported in DevLink.**

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