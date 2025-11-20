---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/events
title: "User events & notifications | Webflow Developer Documentation"
published: 2025-11-17
---

Listen for certain events based on a user’s behavior in the Webflow Designer, or notify a user of important events.

## Notify a user

Send a notification to a user to alert them of important information and events.

Notifications will appear in the top right corner of the designer. Style notifications as either a success, error, or general information message. Notifications are helpful to let a user know that they have - or haven’t - completed a task successfully. Additionally, it’s helpful to let a user know about any unexpected errors your app may encounter.

To notify a user, use the [`webflow.notify()`](https://developers.webflow.com/designer/reference/notify-user) method.

Your browser does not support HTML video.

## Subscribe to an event

Additionally, you can subscribe to events in the designer using the `subscribe` method by subscribing to different event types. Including:

- [`selectedelement`](https://developers.webflow.com/designer/reference/user-selects-element): Listen for when a user selects an element on a page.
- [`mediaquery`](https://developers.webflow.com/designer/reference/user-changes-breakpoint): Get notified when a user changes breakpoints in the Designer.
- [`currentpage`](https://developers.webflow.com/designer/reference/user-changes-current-page): Get notified when a user navigates to a different page.
- [`currentcmsitem`](https://developers.webflow.com/designer/reference/user-changes-cms-page): Triggers when a user selects a Collection page or a new item on a Collection page.
- [`currentappmode`](https://developers.webflow.com/designer/reference/user-changes-mode): Detect when a user switches modes in the Designer.
- [`pseudomode`](https://developers.webflow.com/designer/reference/user-changes-pseudo-mode): Listen for changes to the pseudo-state of the Designer.

### Using callbacks

Callback functions are used to handle and respond to events triggered by the Webflow Designer. Add your callback function as a parameter to the `subscribe` function to determine how to handle events in the designer. Here are some general tips for writing callbacks to handle events:

- **Keep them lightweight:** Callbacks should be fast to execute to ensure a responsive user experience.
- **Error handling:** Always include error handling in your callbacks to manage exceptions gracefully.
- **Unsubscribe when necessary:** Remember to unsubscribe from events when your app no longer needs to listen to them, to prevent memory leaks and unnecessary processing.

```
// Example of setting up and using callbacks for event subscriptions
try {
  // Store unsubscribe functions to clean up later
  const unsubscribeFunctions = [];

  // Subscribe to element selection with error handling
  // webflow.subscribe returns an unsubscribe function directly
  const unsubscribeElement = webflow.subscribe('selectedElement', (element) => {
    try {
      // Process the selected element
      if (element) {
        const elementType = element.type;
        const elementId = element.id;

        // Perform different actions based on element type
        if (elementType === 'Image') {
          // Handle image element selection
          console.log(`Selected image element: ${elementId}`);
        } else if (elementType === 'DOM') {
          // Handle DOM element selection
          console.log(`Selected DOM element: ${elementId}`);
        }
      }
    } catch (error) {
      console.error('Error in selectedElement callback:', error);
    }
  });

  // Add the unsubscribe function to our array
  unsubscribeFunctions.push(unsubscribeElement);

  // Detect and respond to breakpoint changes
  const unsubscribeBreakpoint = webflow.subscribe('mediaquery', (breakpoint) => {
    try {
      // Update UI based on breakpoint
      if (breakpoint.name === 'xxl') {
        // Handle xxl view
      } else if (breakpoint.name === 'xl') {
        // Handle xl view
      } else if (breakpoint.name === 'large') {
        // Handle large view
      }
    } catch (error) {
      console.error('Error in mediaquery callback:', error);
    }
  });

  // Add the unsubscribe function to our array
  unsubscribeFunctions.push(unsubscribeBreakpoint);

  // Cleanup function to unsubscribe when your app is done
  function cleanupSubscriptions() {
    // Call each unsubscribe function
    unsubscribeFunctions.forEach(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    console.log('Successfully unsubscribed from all events');
  }

  // Call cleanup when your app is closing or switching modes
  // For example: yourApp.on('beforeClose', cleanupSubscriptions);
} catch (error) {
  console.error('Error setting up event subscriptions:', error);
  webflow.notify({
    message: 'Failed to set up event monitoring',
    type: 'error'
  });
}
```