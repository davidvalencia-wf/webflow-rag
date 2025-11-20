---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/all-events
title: "All Events | Webflow Developer Documentation"
published: 2025-11-17
---

## `form_submission`

Details about a form submission

#### Required Scope \| `forms:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the form |
| `siteId` | string | The id of the site that the form was submitted from |
| `data` | object | The data submitted in the form (key-value pairs for each field) |
| `submittedAt` | string | The timestamp the form was submitted |
| `formId` | string | The id of the form submission |

#### Example Payload

```
{
  "triggerType": "form_submission",
  "payload": {
    "name": "Contact Us",
    "siteId": "65427cf400e02b306eaa049c",
    "data": {
      "First Name": "Zaphod",
      "Last Name": "Beeblebrox",
      "email": "zaphod@heartofgold.ai",
      "Phone Number": 15550000000
    },
    "schema": [\
      {\
        "fieldName": "First Name",\
        "fieldType": "FormTextInput",\
        "fieldElementId": "285042f7-d554-dc7f-102c-aa10d6a2d2c4"\
      },\
      {\
        "fieldName": "Last Name",\
        "fieldType": "FormTextInput",\
        "fieldElementId": "285042f7-d554-dc7f-102c-aa10d6a2d2c5"\
      },\
      {\
        "fieldName": "email",\
        "fieldType": "FormTextInput",\
        "fieldElementId": "285042f7-d554-dc7f-102c-aa10d6a2d2c6"\
      },\
      {\
        "fieldName": "Phone Number",\
        "fieldType": "FormTextInput",\
        "fieldElementId": "285042f7-d554-dc7f-102c-aa10d6a2d2c7"\
      }\
    ],
    "submittedAt": "2022-09-14T12:35:16.117Z",
    "id": "6321ca84df3949bfc6752327",
    "formId": "65429eadebe8a9f3a30f62d0",
    "formElementId": "4e038d2c-6a1e-4953-7be9-a59a2b453177"
  }
}
```

* * *

## `site_publish`

Details about a site publish event

#### Required Scope \| `sites:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | string | The identifier for the site that was published |
| `publishedOn` | string | The timestamp of the publish event (ISO8601 string) |
| `domains` | \[string\] | The domains that the site was published to |
| `publishedBy` | object | The name of the user who published the site |

#### Example Payload

```
{
  "triggerType": "site_publish",
  "payload": {
    "siteId": "62749158efef318abc8d5a0f",
    "publishedOn": "2023-07-31T12:34:56.789Z",
    "domains": ["my-website.webflow.io"],
    "publishedBy": {
      "displayName": "Some One"
    }
  }
}
```

* * *

## `page_created`

Details about a new page event

#### Required Scope \| `pages:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | string | ID of the Site that the page is on |
| `pageId` | string | ID of the new page |
| `pageTitle` | string | Title of the page |
| `createdOn` | string | Timestamp of when the page was created, as an ISO8601 string |
| `publishedPath` | string | The path of the page that was published |

#### Example

```
{
  "triggerType": "page_created",
  "payload": {
    "siteId": "63499e4e6e9ed55a17e42b68",
    "pageId": "641371d477a18c936fe237cd",
    "pageTitle": "This is a New Page",
    "createdOn": "2023-03-16T19:45:24.311Z",
    "publishedPath": "/my-new-page"
  }
}
```

* * *

## `page_metadata_updated`

Metadata of page is updated and published.

#### Required Scope \| `pages:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | string | ID of the Site that the page is on |
| `pageId` | string | ID of the updated page |
| `pageTitle` | string | Title of the page |
| `lastUpdated` | string | Timestamp of when the page was updated as an ISO8601 string |
| `publishedPath` | string | The path of the page that was updated |

#### Example

```
{
  "triggerType": "page_metadata_updated",
  "payload": {
    "siteId": "63499e4e6e9ed55a17e42b68",
    "pageId": "641371d477a18c936fe237cd",
    "pageTitle": "Home",
    "lastUpdated": "2023-03-16T19:48:48.499Z",
    "publishedPath": "/"
  }
}
```

* * *

## `page_deleted`

The information about a deleted page

#### Required Scope \| `pages:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | string | ID of the Site that the page is on |
| `pageId` | string | ID of the deleted page |
| `pageTitle` | string | Title of the page |
| `deletedOn` | string | Timestamp of when the page was deleted as an ISO8601 string |
| `publishedPath` | string | The path of the page that was deleted |

#### Example

```
{
  "triggerType": "page_deleted",
  "payload": {
    "siteId": "63499e4e6e9ed55a17e42b68",
    "pageId": "63499e4e6e9ed5abbfe42b69",
    "pageTitle": "Old contact page",
    "deletedOn": "2023-03-16T19:51:33.068Z",
    "publishedPath": "/contact"
  }
}
```

* * *

## `ecomm_new_order`

The information about the new order

#### Required Scope \| `ecommerce:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `orderId` | string | The order id. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned. |
| `status` | string | One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded` |
| `comment` | string | A comment string for this order editable by API user (not used by Webflow). |
| `orderComment` | string | A comment that the customer left when making their order |
| `acceptedOn` | string | The ISO8601 timestamp that an order was placed. |
| `disputedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed. |
| `disputeUpdatedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed. |
| `disputeLastStatus` | string | If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status). |
| `fulfilledOn` | string | If an order was marked as ‘fulfilled’, then this is the ISO8601 timestamp when that happened. |
| `refundedOn` | string | If an order was refunded, this is the ISO8601 of when that happened. |
| `customerPaid` | [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) object. |
| `netAmount` | [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) object. |
| `requiresShipping` | boolean | A boolean indicating whether the order contains one or more purchased items that require shipping. |
| `shippingProvider` | string | A string editable by the API user to note the shipping provider used (not used by Webflow). |
| `shippingTracking` | string | A string editable by the API user to note the shipping tracking number for the order (not used by Webflow). |
| `customerInfo` | [OrderCustomerInfo](https://developers.webflow.com/data/reference/all-events#ordercustomerinfo) | An instance of the [OrderCustomerInfo](https://developers.webflow.com/data/reference/all-events#ordercustomerinfo) object. |
| `allAddresses` | \[ [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress)\] | All addresses provided by the customer during the ordering flow. |
| `shippingAddress` | [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) object. |
| `billingAddress` | [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) object. |
| `purchasedItems` | \[ [OrderPurchasedItem](https://developers.webflow.com/data/reference/all-events#orderpurchaseditem)\] | An array of all things that the customer purchased. |
| `stripeDetails` | [StripeDetails](https://developers.webflow.com/data/reference/all-events#stripedetails) | An instance of the [StripeDetails](https://developers.webflow.com/data/reference/all-events#stripedetails) object. |
| `stripeCard` | [StripeCard](https://developers.webflow.com/data/reference/all-events#stripecard) | An instance of the [StripeCard](https://developers.webflow.com/data/reference/all-events#stripecard) object. |
| `totals` | [OrderTotals](https://developers.webflow.com/data/reference/all-events#ordertotals) | An instance of the [OrderTotals](https://developers.webflow.com/data/reference/all-events#ordertotals) object. |
| `customData` | \[object\] | An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a textInput, textArea, or checkbox value. |
| `downloadFiles` | \[ [OrderDownloadedFile](https://developers.webflow.com/data/reference/all-events#orderdownloadedfile)\] | An array of downloadable file objects. |

#### Example Payload

```
{
  "triggerType": "ecomm_new_order",
  "payload": {
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
}
```

* * *

## `ecomm_order_changed`

The information about the order that changed

#### Required Scope \| `ecommerce:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `orderId` | string | The order id. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned. |
| `status` | string | One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded` |
| `comment` | string | A comment string for this order editable by API user (not used by Webflow). |
| `orderComment` | string | A comment that the customer left when making their order |
| `acceptedOn` | string | The ISO8601 timestamp that an order was placed. |
| `disputedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed. |
| `disputeUpdatedOn` | string | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed. |
| `disputeLastStatus` | string | If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status). |
| `fulfilledOn` | string | If an order was marked as ‘fulfilled’, then this is the ISO8601 timestamp when that happened. |
| `refundedOn` | string | If an order was refunded, this is the ISO8601 of when that happened. |
| `customerPaid` | [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) object. |
| `netAmount` | [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/reference/all-events#orderamount) object. |
| `requiresShipping` | boolean | A boolean indicating whether the order contains one or more purchased items that require shipping. |
| `shippingProvider` | string | A string editable by the API user to note the shipping provider used (not used by Webflow). |
| `shippingTracking` | string | A string editable by the API user to note the shipping tracking number for the order (not used by Webflow). |
| `customerInfo` | [OrderCustomerInfo](https://developers.webflow.com/data/reference/all-events#ordercustomerinfo) | An instance of the [OrderCustomerInfo](https://developers.webflow.com/data/reference/all-events#ordercustomerinfo) object. |
| `allAddresses` | \[ [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress)\] | All addresses provided by the customer during the ordering flow. |
| `shippingAddress` | [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) object. |
| `billingAddress` | [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/reference/all-events#orderaddress) object. |
| `purchasedItems` | \[ [OrderPurchasedItem](https://developers.webflow.com/data/reference/all-events#orderpurchaseditem)\] | An array of all things that the customer purchased. |
| `stripeDetails` | [StripeDetails](https://developers.webflow.com/data/reference/all-events#stripedetails) | An instance of the [StripeDetails](https://developers.webflow.com/data/reference/all-events#stripedetails) object. |
| `stripeCard` | [StripeCard](https://developers.webflow.com/data/reference/all-events#stripecard) | An instance of the [StripeCard](https://developers.webflow.com/data/reference/all-events#stripecard) object. |
| `totals` | [OrderTotals](https://developers.webflow.com/data/reference/all-events#ordertotals) | An instance of the [OrderTotals](https://developers.webflow.com/data/reference/all-events#ordertotals) object. |
| `customData` | \[object\] | An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a textInput, textArea, or checkbox value. |
| `downloadFiles` | \[ [OrderDownloadedFile](https://developers.webflow.com/data/reference/all-events#orderdownloadedfile)\] | An array of downloadable file objects. |

#### Example Payload

```
{
  "triggerType": "ecomm_order_changed",
  "payload": {
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
}
```

* * *

## `ecomm_inventory_changed`

The information about the inventory item that changed

#### Required Scope \| `ecommerce:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for a SKU item |
| `quantity` | number | Total quantity of items remaining in inventory (if finite) |
| `inventoryType` | string | String enum of `infinite` or `finite` |

#### Example Payload

```
{
  "triggerType": "ecomm_inventory_changedr",
  "payload": {
    "id": "5bfedb42bab0ad90fa7dad39",
    "quantity": 83,
    "inventoryType": "finite"
  }
}
```

* * *

## `user_account_added`

The information about the user account that was added

#### Required Scope \| `users:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for the User |
| `isEmailVerified` | boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | string | The timestamp the user was updated |
| `createdOn` | string | The timestamp the user was created |
| `status` | string | The status of the user |

#### Example Payload

```
{
  "triggerType": "user_account_added",
  "payload": {
    "id": "6287ec36a841b25637c663df",
    "isEmailVerified": true,
    "lastUpdated": "2022-05-20T13:46:12.093Z",
    "createdOn": "2022-05-20T13:46:12.093Z",
    "status": "verified",
    "accessGroups": [\
      {\
        "slug": "webflowers",\
        "type": "admin"\
      }\
    ],
    "data": {
      "accept-privacy": false,
      "accept-communications": false,
      "email": "Some.One@home.com",
      "name": "Some One"
    }
  }
}
```

* * *

## `user_account_updated`

The information about the user account that was updated

#### Required Scope \| `users:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for the User |
| `isEmailVerified` | boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | string | The timestamp the user was updated |
| `createdOn` | string | The timestamp the user was created |
| `status` | string | The status of the user |
| `accessGroups` | array | A list of access groups the user belongs to |

#### Example Payload

```
{
  "triggerType": "user_account_updated",
  "payload": {
    "id": "6287ec36a841b25637c663df",
    "isEmailVerified": true,
    "lastUpdated": "2022-05-20T13:46:12.093Z",
    "createdOn": "2022-05-20T13:46:12.093Z",
    "status": "verified",
    "accessGroups": [\
      {\
        "slug": "webflowers",\
        "type": "admin"\
      }\
    ],
    "data": {
      "accept-privacy": false,
      "accept-communications": false,
      "email": "Some.One@home.com",
      "name": "Some One"
    }
  }
}
```

* * *

## `user_account_deleted`

The information about the user account that was deleted

#### Required Scope \| `users:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for the User |
| `isEmailVerified` | boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | string | The timestamp the user was updated |
| `createdOn` | string | The timestamp the user was created |
| `status` | string | The status of the user |
| `accessGroups` | array | A list of access groups the user belongs to |

#### Example Payload

```
{
  "triggerType": "user_account_deleted",
  "payload": {
    "id": "6287ec36a841b25637c663df",
    "isEmailVerified": true,
    "lastUpdated": "2022-05-20T13:46:12.093Z",
    "createdOn": "2022-05-20T13:46:12.093Z",
    "status": "verified",
    "accessGroups": [\
      {\
        "slug": "webflowers",\
        "type": "admin"\
      }\
    ],
    "data": {
      "accept-privacy": false,
      "accept-communications": false,
      "email": "Some.One@home.com",
      "name": "Some One"
    }
  }
}
```

* * *

## `collection_item_created`

The information about the collection item that was created

#### Required Scope \| `cms:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for the Item |
| `siteId` | string | Unique identifier for the Site where the Collection lives |
| `workspaceId` | string | Unique identifier for the Workspace where the Site lives |
| `collectionId` | string | Unique identifier for the Collection |
| `lastPublished` | string | Date and time of when the item was last published, will be null if the item has never been published. |
| `lastUpdated` | string | Date and time of when the item was last updated |
| `createdOn` | string | Date and time of when the item was created |
| `isArchived` | boolean | Boolean determining if the Item is set to archived |
| `isDraft` | boolean | Boolean determining if the Item is set to draft |
| `fieldData` | object | Object containing the item details structured within the Collection’s schema. If the item is localized, an object with item data for each locale will be returned. |

#### Example Payload

###### Single Locale

###### Multiple Locales

```
{
  "triggerType": "collection_item_created",
  "payload": {
    "id": "582b900cba19143b2bb8a759",
    "siteId": "1111111",
    "workspaceId": "1111111",
    "collectionId": "1111111",
    "lastPublished": null,
    "lastUpdated": "2023-03-27T22:26:40.926Z",
    "createdOn": "2023-03-27T22:26:40.926Z",
    "archived": false,
    "draft": true,
    // depends on the field schema
    "fieldData": {
      "name": "hello world",
      "slug": "hello-world",
      "favoriteColor": "#ff00ff"
    }
  }
}
```

* * *

## `collection_item_changed`

The information about the collection item that was changed

#### Required Scope \| `cms:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier for the Item |
| `siteId` | string | Unique identifier for the Site where the Collection lives |
| `workspaceId` | string | Unique identifier for the Workspace where the Site lives |
| `collectionId` | string | Unique identifier for the Collection |
| `lastPublished` | string | Date and time of when the item was last published, will be null if the item has never been published. |
| `lastUpdated` | string | Date and time of when the item was last updated |
| `createdOn` | string | Date and time of when the item was created |
| `isArchived` | boolean | Boolean determining if the Item is set to archived |
| `isDraft` | boolean | Boolean determining if the Item is set to draft |
| `fieldData` | object | Object containing the item details structured within the Collection’s schema. |

#### Example Payload

###### Single Locale

###### Multiple Locales

```
{
  "triggerType": "collection_item_changed",
  "payload": {
    "id": "582b900cba19143b2bb8a759",
    "siteId": "1111111",
    "workspaceId": "1111111",
    "collectionId": "1111111",
    "lastPublished": null,
    "lastUpdated": "2023-03-27T22:26:40.926Z",
    "createdOn": "2023-03-27T22:26:40.926Z",
    "archived": false,
    "draft": true,
    "fieldData": {
      "name": "hello world",
      "slug": "hello-world",
      "favoriteColor": "#ff00ff"
    }
  }
}
```

* * *

## `collection_item_deleted`

The results from deleting the collection item

#### Required Scope \| `cms:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | The unique identifier of the collection item that was deleted |
| `siteId` | string | The unique identifier of the Site the Collection belongs to |
| `workspaceId` | string | The unique identifier of the Workspace the related Site belongs to |
| `collectionId` | string | The unique identifier of the Collection the deleted item belongs to |

#### Example Payload

##### Multiple Locales

If you delete an object across multiple locales, the Webhook will trigger for each locale.

```
{
  "triggerType": "collection_item_deleted",
  "payload": {
    "id": "647f35d49f499fe22e6dc173",
    "siteId": "63692ab61fb28552c22ba8e3",
    "workspaceId": "63499d0dd2f3b4e46108efa3",
    "collectionId": "63692ab61fb285e2ff2ba8f3"
  }
}
```

* * *

## `collection_item_unpublished`

The results from unpublishing the collection item

#### Required Scope \| `cms:read`

#### Properties

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | The unique identifier of the collection item that was deleted |
| `siteId` | string | The unique identifier of the Site the Collection belongs to |
| `workspaceId` | string | The unique identifier of the Workspace the related Site belongs to |

#### Example Payload

```
{
  "triggerType": "collection_item_unpublished",
  "payload": {
    "id": "647f35d49f499fe22e6dc173",
    "siteId": "63692ab61fb28552c22ba8e3",
    "workspaceId": "63499d0dd2f3b4e46108efa3",
    "collectionId": "63692ab61fb285e2ff2ba8f3"
  }
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