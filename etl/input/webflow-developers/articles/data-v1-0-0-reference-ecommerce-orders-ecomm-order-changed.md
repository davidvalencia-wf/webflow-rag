---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/orders/ecomm-order-changed
title: "Updated eComm Order | Webflow Developer Documentation"
published: 2025-11-17
---

### Payload

The payload of this webhook request is an object.

orderIdstringOptional

The order ID. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned.

statusenumOptional

One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded`

Show 6 enum values

commentstringOptional

A comment string for this order editable by API user (not used by Webflow).

orderCommentstringOptional

A comment that the customer left when making their order

acceptedOnstringOptional`format: "date-time"`

The ISO8601 timestamp that an order was placed.

disputedOnstringOptional`format: "date-time"`

If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed.

disputeUpdatedOnstringOptional

If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed.

disputeLastStatusstringOptional

If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status).

fulfilledOnstringOptional`format: "date-time"`

If an order was marked as 'fulfilled', then this is the ISO8601 timestamp when that happened.

refundedOnstringOptional`format: "date-time"`

If an order was refunded, this is the ISO8601 of when that happened.

customerPaidobjectOptional

The sum of all line items.

Show 3 properties

netAmountobjectOptional

The sum of all line items.

Show 3 properties

requiresShippingbooleanOptional

A boolean indicating whether the order contains one or more purchased items that require shipping.

shippingProviderstringOptional

A string editable by the API user to note the shipping provider used (not used by Webflow).

shippingTrackingstringOptional

A string editable by the API user to note the shipping tracking number for the order (not used by Webflow).

customerInfoobjectOptional

An object with the keys `fullName` and `email`.

Show 2 properties

allAddresseslist of objectsOptional

All addresses provided by the customer during the ordering flow.

Show 8 properties

shippingAddressobjectOptional

A customer address

Show 8 properties

billingAddressobjectOptional

A customer address

Show 8 properties

purchasedItemslist of objectsOptional

An array of all things that the customer purchased.

Show 15 properties

stripeDetailsobjectOptional

An object with various Stripe IDs, useful for linking into the stripe dashboard.

Show 5 properties

stripeCardobjectOptional

Details on the card used to fulfill this order, if this order was finalized with Stripe.

Show 4 properties

totalsobjectOptional

An object describing various pricing totals.

Show 3 properties

customDatalist of objectsOptional

An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a textInput, textArea, or checkbox value.

downloadFileslist of objectsOptional

An array of downloadable file objects.

Show 3 properties

### Response

200

any

Return a 200 status to indicate that the data was received successfully.

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)