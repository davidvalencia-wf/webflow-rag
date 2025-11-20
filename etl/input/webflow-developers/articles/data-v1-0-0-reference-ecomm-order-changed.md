---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecomm_order_changed
title: "Order Changed | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`ecomm_order_changed`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `orderId` | string | The order id. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned. |
| `status` | string | One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded` |
| `comment` | string | A comment string for this order editable by API user (not used by Webflow). |
| `orderComment` | string | A comment that the customer left when making their order. |
| `acceptedOn` | string | The ISO8601 timestamp that an order was placed. |
| `disputedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed. |
| `disputeUpdatedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed. |
| `disputeLastStatus` | string | If an order was disputed by the customer, then this key will be set with the dispute’s status. |
| `fulfilledOn` | string | If an order was marked as ‘fulfilled’, then this is the ISO8601 timestamp when that happened. |
| `refundedOn` | string | If an order was refunded, this is the ISO8601 of when that happened. |
| `customerPaid` | object | An instance of the OrderAmount object. |
| `netAmount` | object | An instance of the OrderAmount object. |
| `requiresShipping` | Boolean | A Boolean indicating whether the order contains one or more purchased items that require shipping. |
| `shippingProvider` | string | A string editable by the API user to note the shipping provider used (not used by Webflow). |
| `shippingTracking` | string | A string editable by the API user to note the shipping tracking number for the order (not used by Webflow). |
| `customerInfo` | object | An instance of the OrderCustomerInfo object. |
| `allAddresses` | \[object\] | All addresses provided by the customer during the ordering flow. |
| `shippingAddress` | object | An instance of the OrderAddress object. |
| `billingAddress` | object | An instance of the OrderAddress object. |
| `purchasedItems` | \[object\] | An array of all things that the customer purchased. |
| `stripeDetails` | object | An instance of the StripeDetails object. |
| `stripeCard` | object | An instance of the StripeCard object. |
| `totals` | object | An instance of the OrderTotals object. |
| `customData` | \[object\] | An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a `textInput`, `textArea`, or `checkbox` value. |
| `downloadFiles` | \[object\] | An array of downloadable file objects. |
|  |  |  |

## Example

```
{
    "orderId": "dfa-3f1",
    "status": "unfulfilled",
    "comment": "",
    "orderComment": "",
    "acceptedOn": "2018-12-03T22:06:15.761Z",
    "disputedOn": null,
    "disputeUpdatedOn": null,
    "disputeLastStatus": null,
    "fulfilledOn": null,
    "refundedOn": null,
    "customerPaid": {
        "unit": "USD",
        "value": 6099,
        "string": "$60.99"
    },
    "netAmount": {
        "unit": "USD",
        "value": 5892,
        "string": "$58.92"
    },
    "requiresShipping": true,
    "shippingProvider": null,
    "shippingTracking": null,
    "customerInfo": {
        "fullName": "Customerio Namen",
        "email": "renning+customer@webflow.com"
    },
    "allAddresses": [\
        {\
            "type": "billing",\
            "addressee": "Customerio Namen",\
            "line1": "123 Example Rd",\
            "line2": "",\
            "city": "Examplesville",\
            "state": "CA",\
            "country": "US",\
            "postalCode": "90012"\
        },\
        {\
            "type": "shipping",\
            "addressee": "Customerio Namen",\
            "line1": "123 Example Rd",\
            "line2": "",\
            "city": "Examplesville",\
            "state": "CA",\
            "country": "US",\
            "postalCode": "90012"\
        }\
    ],
    "shippingAddress": {
        "type": "shipping",
        "addressee": "Customerio Namen",
        "line1": "123 Example Rd",
        "line2": "",
        "city": "Examplesville",
        "state": "CA",
        "country": "US",
        "postalCode": "90012"
    },
    "billingAddress": {
        "type": "billing",
        "addressee": "Customerio Namen",
        "line1": "123 Example Rd",
        "line2": "",
        "city": "Examplesville",
        "state": "CA",
        "country": "US",
        "postalCode": "90012"
    },
    "purchasedItems": [\
        {\
            "count": 1,\
            "rowTotal": {\
                "unit": "USD",\
                "value": 5500,\
                "string": "$55.00"\
            },\
            "productId": "5eb9fd05caef491eb9757183",\
            "productName": "White Cup",\
            "productSlug": "white-cup",\
            "variantId": "5eb9fcace279761d8199790c",\
            "variantName": "white-cup_default_sku",\
            "variantSlug": "white-cup-default-sku",\
            "variantImage": {\
                "fileId": "5bfedb42bab0ad90fa7dad2e",\
                "url": "https://dev-assets.website-files.com/5bfedb42bab0ad90fa7dac03/5bfedb42bab0ad90fa7dad2e_5bb3d019b3465c6e8a324dd7_458036-unsplas.png"\
            },\
            "variantPrice": {\
                "unit": "USD",\
                "value": 5500,\
                "string": "$55.00"\
            },\
            "height": 7,\
            "length": 2,\
            "weight": 5,\
            "width": 4\
        }\
    ],
    "purchasedItemsCount": 1,
    "stripeDetails": {
        "refundReason": null,
        "refundId": null,
        "disputeId": null,
        "chargeId": "ch_1DdPYQKMjGA7k9mI2AKiBY6u",
        "customerId": "cus_E5ajeiWNHEtcAW"
    },
    "stripeCard": {
        "last4": "4242",
        "brand": "Visa",
        "ownerName": "Customerio Namen",
        "expires": {
            "year": 2023,
            "month": 12
        }
    },
    "totals": {
        "subtotal": {
            "unit": "USD",
            "value": 5500,
            "string": "$55.00"
        },
        "extras": [\
            {\
                "type": "tax",\
                "name": "State Taxes",\
                "description": "CA Taxes (6.25%)",\
                "price": {\
                    "unit": "USD",\
                    "value": 344,\
                    "string": "$3.44"\
                }\
            },\
            {\
                "type": "tax",\
                "name": "County Taxes",\
                "description": "LOS ANGELES Taxes (1.00%)",\
                "price": {\
                    "unit": "USD",\
                    "value": 55,\
                    "string": "$0.55"\
                }\
            },\
            {\
                "type": "tax",\
                "name": "Special District Taxes",\
                "description": "Special District Taxes (2.25%)",\
                "price": {\
                    "unit": "USD",\
                    "value": 124,\
                    "string": "$1.24"\
                }\
            },\
            {\
                "type": "shipping",\
                "name": "Flat Rate",\
                "description": "",\
                "price": {\
                    "unit": "USD",\
                    "value": 599,\
                    "string": "$5.99"\
                }\
            },\
            {\
                "type": "discount",\
                "name": "Discount (SAVE5)",\
                "description": "",\
                "price": {\
                    "unit": "USD",\
                    "value": -500,\
                    "string": "-$ 5.00 USD"\
                }\
            }\
        ],
        "total": {
            "unit": "USD",
            "value": 6122,
            "string": "$61.22"
        }
    },
    "customData": [\
        {\
            "textInput": "(415) 123-4567",\
            "name": "Telephone"\
        },\
        {\
            "textArea": "Happy birthday Mom!",\
            "name": "Gift note"\
        },\
        {\
            "checkbox": true,\
            "name": "Send as gift"\
        }\
    ],
    "downloadFiles": [\
        {\
            "id": "5e9a5eba75e0ac242e1b6f64",\
            "name": "The modern web design process - Webflow Ebook.pdf",\
            "url": "https://webflow.com/dashboard/download-digital-product?payload=5d93ba5e38c6b0160ab711d3;e7634a;5eb1aac72912ec06f561278c;5e9a5eba75e0ac242e1b6f63:ka2nehxy:4a1ee0a632feaab94294350087215ed89533f2f530903e3b933b638940e921aa"\
        },\
        {\
            "id": "5e9a5eba75e0ac242e1b6f63",\
            "name": "The freelance web designers guide - Webflow Ebook.pdf",\
            "url": "https://webflow.com/dashboard/download-digital-product?payload=5d93ba5e38c6b0160ab711d3;e7634a;5dd44c493543b37d5449b3cd;5e9a5eba75e0ac242e1b6f63:ka2nehxy:6af5adf7c6fff7a3b0f54404fac1be492ac6f1ed5340416f1fe27c5fd4dd8079"\
        }\
    ]
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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)