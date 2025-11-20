---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/orders/get-order
title: "Get Order | Webflow Developer Documentation"
published: 2025-11-17
---

Retrieve a single product by its ID. All of its SKUs will also be retrieved. The `count`, `limit`, `offset`
and `total` values in the response represent the Product only and do not include SKUs.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

order\_idstringRequired`format: "uuid"`

Unique identifier for an Order

### Headers

Accept-VersionstringOptional

The API version

### Response

Request was successful

orderIdstring or null

The order ID. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned.

statusenum or null

One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded`

Show 6 enum values

commentstring or null

A comment string for this order editable by API user (not used by Webflow).

orderCommentstring or null

A comment that the customer left when making their order

acceptedOnstring or null`format: "date-time"`

The ISO8601 timestamp that an order was placed.

disputedOnstring or null`format: "date-time"`

If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed.

disputeUpdatedOnstring or null

If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed.

disputeLastStatusstring or null

If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status).

fulfilledOnstring or null`format: "date-time"`

If an order was marked as 'fulfilled', then this is the ISO8601 timestamp when that happened.

refundedOnstring or null`format: "date-time"`

If an order was refunded, this is the ISO8601 of when that happened.

customerPaidobject or null

The sum of all line items.

Show 3 properties

netAmountobject or null

The sum of all line items.

Show 3 properties

requiresShippingboolean or null

A boolean indicating whether the order contains one or more purchased items that require shipping.

shippingProviderstring or null

A string editable by the API user to note the shipping provider used (not used by Webflow).

shippingTrackingstring or null

A string editable by the API user to note the shipping tracking number for the order (not used by Webflow).

customerInfoobject or null

An object with the keys `fullName` and `email`.

Show 2 properties

allAddresseslist of objects or null

All addresses provided by the customer during the ordering flow.

Show 8 properties

shippingAddressobject or null

A customer address

Show 8 properties

billingAddressobject or null

A customer address

Show 8 properties

purchasedItemslist of objects or null

An array of all things that the customer purchased.

Show 15 properties

stripeDetailsobject or null

An object with various Stripe IDs, useful for linking into the stripe dashboard.

Show 5 properties

stripeCardobject or null

Details on the card used to fulfill this order, if this order was finalized with Stripe.

Show 4 properties

totalsobject or null

An object describing various pricing totals.

Show 3 properties

customDatalist of objects or null

An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a textInput, textArea, or checkbox value.

downloadFileslist of objects or null

An array of downloadable file objects.

Show 3 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

404

Not Found Error

429

Too Many Requests Error

500

Internal Server Error

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