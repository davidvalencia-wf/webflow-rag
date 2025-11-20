---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/orders/refund
title: "Refund Order | Webflow Developer Documentation"
published: 2025-11-17
---

This API will reverse a Stripe charge and refund an order back to a
customer. It will also set the order’s status to `refunded`.

Required scope \| `ecommerce:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

order\_idstringRequired`format: "objectid"`

Unique identifier for an Order

### Request

The order fulfillment request

reasonenumOptional

The reason for the refund

Allowed values:duplicatefraudulentrequested

### Response

Request was successful

orderIdstring or null

The order ID. Will usually be 6 hex characters, but can also be 9
hex characters if the site has a very large number of Orders.
Randomly assigned.

statusenum or null

The status of the Order

Show 6 enum values

commentstring or null

A comment string for this Order, which is editable by API user (not used by Webflow).

orderCommentstring or null

A comment that the customer left when making their Order

acceptedOnstring or null`format: "date-time"`

The ISO8601 timestamp that an Order was placed.

fulfilledOnstring or null`format: "date-time"`

When an Order is marked as 'fulfilled', this field represents the timestamp of the fulfillment in ISO8601 format. Otherwise, it is null.

refundedOnstring or null`format: "date-time"`

When an Order is marked as 'refunded', this field represents the timestamp of the fulfillment in ISO8601 format. Otherwise, it is null.

disputedOnstring or null`format: "date-time"`

When an Order is marked as 'disputed', this field represents the timestamp of the fulfillment in ISO8601 format. Otherwise, it is null.

disputeUpdatedOnstring or null`format: "date-time"`

If an Order has been disputed by the customer, this key will be set to the ISO8601 timestamp of the last update received. If the Order is not disputed, the key will be null.

disputeLastStatusenum or null

If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status).

Show 8 enum values

customerPaidobject or null

The total paid by the customer

Show 3 properties

netAmountobject or null

The net amount after application fees

Show 3 properties

applicationFeeobject or null

The application fee assessed by the platform

Show 3 properties

allAddresseslist of objects or null

All addresses provided by the customer during the ordering flow.

Show 9 properties

shippingAddressobject or null

The shipping address

Show 9 properties

billingAddressobject or null

The billing address

Show 9 properties

shippingProviderstring or null

A string editable by the API user to note the shipping provider used (not used by Webflow).

shippingTrackingstring or null

A string editable by the API user to note the shipping tracking number for the order (not used by Webflow).

shippingTrackingURLstring or null`format: "uri"`

customerInfoobject or null

An object with the keys `fullName` and `email`.

Show 2 properties

purchasedItemslist of objects or null

An array of all things that the Customer purchased.

Show 15 properties

purchasedItemsCountdouble or null

The sum of all 'count' fields in 'purchasedItems'.

stripeDetailsobject or null

An object with various Stripe IDs, useful for linking into the stripe dashboard.

Show 8 properties

stripeCardobject or null

Details on the card used to fulfill this order, if this order was finalized with Stripe.

Show 4 properties

paypalDetailsobject or null

Show 6 properties

customDatalist of objects or null

An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a textInput, textArea, or checkbox value.

metadataobject or null

Show 1 properties

isCustomerDeletedboolean or null

A boolean indicating whether the customer has been deleted from the site.

isShippingRequiredboolean or null

A boolean indicating whether the order contains one or more purchased items that require shipping.

hasDownloadsboolean or null

A boolean indicating whether the order contains one or more purchased items that are downloadable.

paymentProcessorstring or null

A string indicating the payment processor used for this order.

totalsobject or null

An object describing various pricing totals

Show 3 properties

downloadFileslist of objects or null

An array of downloadable file objects.

Show 3 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

403

Forbidden Error

404

Not Found Error

409

Conflict Error

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