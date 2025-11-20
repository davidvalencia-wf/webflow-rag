---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/reference/all-events
title: "All Events | Webflow Developer Documentation"
published: 2025-11-17
---

## `form_submission`

The form data submitted

**Required Scope \| `forms:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | The name of the form |
| `siteId` | String | The id of the site that the form was submitted from |
| `data` | Object | The data submitted in the form |
| `submittedAt` | String | The timestamp the form was submitted |
| `formId` | String | The id of the form submission |

**Example Payload**

```
{
	"triggerType": "form_submission",
	"payload": {
		"name": "Sample Form",
		"siteId": "62749158efef318abc8d5a0f",
		"data": {
			"name": "Some One",
			"email": "some.one@home.com"
		},
		"submittedAt": "2022-09-14T12:35:16.117Z",
		"formId": "6321ca84df3949bfc6752327"
	}
}
```

* * *

## `site_publish`

The information about the site(s) published

**Required Scope \| `sites:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | String | The identifier for the site that was published |
| `publishedOn` | String | The timestamp of the publish event (ISO8601 string) |
| `domains` | \[String\] | The domains that were published |
| `publishedBy` | Object | The name of the user who published the site |

**Example Payload**

```
{
	"triggerType": "site_publish",
	"payload": {
		"siteId": "62749158efef318abc8d5a0f",
		"publishedOn": "2023-07-31T12:34:56.789Z",
		"domains": [\
			"my-website.webflow.io"\
		],
		"publishedBy": {
			"displayName": "Some One"
		}
	}
}
```

* * *

## `page_created`

A new page has been created.

**Required Scope \| `pages:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | String | ID of the Site that the page is on |
| `pageId` | String | ID of the new page |
| `pageTitle` | String | Title of the page |
| `createdOn` | String | Timestamp of when the page was created |

**Example**

```
{
	"triggerType": "page_created",
	"payload": {
		"siteId": "63499e4e6e9ed55a17e42b68",
		"pageId": "641371d477a18c936fe237cd",
		"pageTitle": "This is a New Page",
		"createdOn": "2023-03-16T19:45:24.311Z"
	}
}
```

* * *

## `page_metadata_updated`

Metadata of page is updated and published.

**Required Scope \| `pages:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | String | ID of the Site that the page is on |
| `pageId` | String | ID of the new page |
| `pageTitle` | String | Title of the page |
| `lastUpdated` | String | Timestamp of when the page was updated |

**Example**

```
{
	"triggerType": "page_metadata_updated",
	"payload": {
		"siteId": "63499e4e6e9ed55a17e42b68",
		"pageId": "641371d477a18c936fe237cd",
		"pageTitle": "Home",
		"lastUpdated": "2023-03-16T19:48:48.499Z"
	}
}
```

* * *

## `page_deleted`

The information about a deleted page

**Required Scope \| `pages:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `siteId` | String | ID of the Site that the page is on |
| `pageId` | String | ID of the new page |
| `pageTitle` | String | Title of the page |
| `deletedOn` | String | Timestamp of when the page was deleted |

**Example**

```
{
	"triggerType": "page_deleted",
	"payload": {
		"siteId": "63499e4e6e9ed55a17e42b68",
		"pageId": "63499e4e6e9ed5abbfe42b69",
		"pageTitle": "Old Home",
		"deletedOn": "2023-03-16T19:51:33.068Z"
	}
}
```

* * *

## `ecomm_new_order`

The information about the new order

**Required Scope \| `ecommerce:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `orderId` | String | The order id. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned. |
| `status` | String | One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded` |
| `comment` | String | A comment string for this order editable by API user (not used by Webflow). |
| `orderComment` | String | A comment that the customer left when making their order |
| `acceptedOn` | String | The ISO8601 timestamp that an order was placed. |
| `disputedOn` | String | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed. |
| `disputeUpdatedOn` | String | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed. |
| `disputeLastStatus` | String | If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status). |
| `fulfilledOn` | String | If an order was marked as ‘fulfilled’, then this is the ISO8601 timestamp when that happened. |
| `refundedOn` | String | If an order was refunded, this is the ISO8601 of when that happened. |
| `customerPaid` | [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) object. |
| `netAmount` | [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) object. |
| `requiresShipping` | Boolean | A Boolean indicating whether the order contains one or more purchased items that require shipping. |
| `shippingProvider` | String | A string editable by the API user to note the shipping provider used (not used by Webflow). |
| `shippingTracking` | String | A string editable by the API user to note the shipping tracking number for the order (not used by Webflow). |
| `customerInfo` | [OrderCustomerInfo](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordercustomerinfo) | An instance of the [OrderCustomerInfo](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordercustomerinfo) object. |
| `allAddresses` | \[ [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress)\] | All addresses provided by the customer during the ordering flow. |
| `shippingAddress` | [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) object. |
| `billingAddress` | [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) object. |
| `purchasedItems` | \[ [OrderPurchasedItem](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderpurchaseditem)\] | An array of all things that the customer purchased. |
| `stripeDetails` | [StripeDetails](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripedetails) | An instance of the [StripeDetails](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripedetails) object. |
| `stripeCard` | [StripeCard](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripecard) | An instance of the [StripeCard](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripecard) object. |
| `totals` | [OrderTotals](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordertotals) | An instance of the [OrderTotals](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordertotals) object. |
| `customData` | \[Object\] | An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a `textInput`, `textArea`, or `checkbox` value. |
| `downloadFiles` | \[ [OrderDownloadedFile](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderdownloadedfile)\] | An array of downloadable file objects. |

**Example Payload**

```
{"triggerType": "ecomm_new_order",
 "payload":
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
}
```

* * *

## `ecomm_order_changed`

The information about the order that changed

**Required Scope \| `ecommerce:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `orderId` | String | The order id. Will usually be 6 hex characters, but can also be 9 hex characters if the site has a very large number of orders. Randomly assigned. |
| `status` | String | One of `pending`, `unfulfilled`, `fulfilled`, `disputed`, `dispute-lost`, or `refunded` |
| `comment` | String | A comment string for this order editable by API user (not used by Webflow). |
| `orderComment` | String | A comment that the customer left when making their order |
| `acceptedOn` | String | The ISO8601 timestamp that an order was placed. |
| `disputedOn` | String | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp that Stripe notifies Webflow. Null if not disputed. |
| `disputeUpdatedOn` | String | If an order was disputed by the customer, then this key will be set with the ISO8601 timestamp of the last time that we got an update. Null if not disputed. |
| `disputeLastStatus` | String | If an order was disputed by the customer, then this key will be set with the [dispute’s status](https://stripe.com/docs/api#dispute_object-status). |
| `fulfilledOn` | String | If an order was marked as ‘fulfilled’, then this is the ISO8601 timestamp when that happened. |
| `refundedOn` | String | If an order was refunded, this is the ISO8601 of when that happened. |
| `customerPaid` | [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) object. |
| `netAmount` | [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) | An instance of the [OrderAmount](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderamount) object. |
| `requiresShipping` | Boolean | A Boolean indicating whether the order contains one or more purchased items that require shipping. |
| `shippingProvider` | String | A string editable by the API user to note the shipping provider used (not used by Webflow). |
| `shippingTracking` | String | A string editable by the API user to note the shipping tracking number for the order (not used by Webflow). |
| `customerInfo` | [OrderCustomerInfo](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordercustomerinfo) | An instance of the [OrderCustomerInfo](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordercustomerinfo) object. |
| `allAddresses` | \[ [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress)\] | All addresses provided by the customer during the ordering flow. |
| `shippingAddress` | [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) object. |
| `billingAddress` | [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) | An instance of the [OrderAddress](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderaddress) object. |
| `purchasedItems` | \[ [OrderPurchasedItem](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderpurchaseditem)\] | An array of all things that the customer purchased. |
| `stripeDetails` | [StripeDetails](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripedetails) | An instance of the [StripeDetails](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripedetails) object. |
| `stripeCard` | [StripeCard](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripecard) | An instance of the [StripeCard](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#stripecard) object. |
| `totals` | [OrderTotals](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordertotals) | An instance of the [OrderTotals](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#ordertotals) object. |
| `customData` | \[Object\] | An array of additional inputs for custom order data gathering. Each object in the array represents an input with a name, and a `textInput`, `textArea`, or `checkbox` value. |
| `downloadFiles` | \[ [OrderDownloadedFile](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#orderdownloadedfile)\] | An array of downloadable file objects. |

**Example Payload**

```
{"triggerType": "ecomm_order_changed",
 "payload":{
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

**Required Scope \| `ecommerce:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for a SKU item |
| `quantity` | Number | Total quantity of items remaining in inventory (if finite) |
| `inventoryType` | String | infinite or finite |

**Example Payload**

```
{"triggerType": "ecomm_inventory_changedr",
 "payload":{
    "id": "5bfedb42bab0ad90fa7dad39",
    "quantity": 83,
    "inventoryType": "finite"
  }
}
```

* * *

## `user_account_added`

The information about the user account that was added

**Required Scope \| `users:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for the User |
| `isEmailVerified` | Boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | String | The timestamp the user was updated |
| `createdOn` | String | The timestamp the user was created |
| `status` | String | The status of the user |

**Example Payload**

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

**Required Scope \| `users:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for the User |
| `isEmailVerified` | Boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | String | The timestamp the user was updated |
| `createdOn` | String | The timestamp the user was created |
| `status` | String | The status of the user |
| `accessGroups` | Array | A list of access groups the user belongs to |

**Example Payload**

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

**Required Scope \| `users:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for the User |
| `isEmailVerified` | Boolean | Indicates whether the user has verified their email address |
| `lastUpdated` | String | The timestamp the user was updated |
| `createdOn` | String | The timestamp the user was created |
| `status` | String | The status of the user |
| `accessGroups` | Array | A list of access groups the user belongs to |

**Example Payload**

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

**Required Scope \| `cms:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for the Item |
| `siteId` | String | Unique identifier for the Site where the Collection lives |
| `workspaceId` | String | Unique identifier for the Workspace where the Site lives |
| `collectionId` | String | Unique identifier for the Collection |
| `lastPublished` | String | Date and time of when the item was last published, will be null if the item has never been published. |
| `lastUpdated` | String | Date and time of when the item was last updated |
| `createdOn` | String | Date and time of when the item was created |
| `isArchived` | Boolean | Boolean determining if the Item is set to archived |
| `isDraft` | Boolean | Boolean determining if the Item is set to draft |
| `fieldData` | Object | Object containing the item details structured within the Collection’s schema. |
| **Example Payload** |  |  |

```
{
 "triggerType": "collection_item_created",
  "payload":{
    	"id": "582b900cba19143b2bb8a759",
      "siteId": "1111111",
      "workspaceId": "1111111",
      "collectionId": "1111111",
      "lastPublished": null,
      "lastUpdated": "2023-03-27T22:26:40.926Z",
      "createdOn": "2023-03-27T22:26:40.926Z",
      "archived": false,
      "draft": true,
      "fieldData":{
       	// Any data included in the Collection's Item's schema
        "name": "hello world",
        "slug": "hello-world",
        "favoriteColor": "#ff00ff",
      }
  }
}
```

* * *

## `collection_item_changed`

The information about the collection item that was changed

**Required Scope \| `cms:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | Unique identifier for the Item |
| `siteId` | String | Unique identifier for the Site where the Collection lives |
| `workspaceId` | String | Unique identifier for the Workspace where the Site lives |
| `collectionId` | String | Unique identifier for the Collection |
| `lastPublished` | String | Date and time of when the item was last published, will be null if the item has never been published. |
| `lastUpdated` | String | Date and time of when the item was last updated |
| `createdOn` | String | Date and time of when the item was created |
| `isArchived` | Boolean | Boolean determining if the Item is set to archived |
| `isDraft` | Boolean | Boolean determining if the Item is set to draft |
| `fieldData` | Object | Object containing the item details structured within the Collection’s schema. |

**Example Payload**

```
{
 "triggerType": "collection_item_changed",
  "payload":{
    	"id": "582b900cba19143b2bb8a759",
      "siteId": "1111111",
      "workspaceId": "1111111",
      "collectionId": "1111111",
      "lastPublished": null,
      "lastUpdated": "2023-03-27T22:26:40.926Z",
      "createdOn": "2023-03-27T22:26:40.926Z",
      "archived": false,
      "draft": true,
      "fieldData":{
       	// Any data included in the Collection's Item's schema
        "name": "hello world",
        "slug": "hello-world",
        "favoriteColor": "#ff00ff",
      }
	}
}
```

* * *

## `collection_item_deleted`

The results from deleting the collection item

**Required Scope \| `cms:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The unique identifier of the collection item that was deleted |
| `siteId` | String | The unique identifier of the Site the Collection belongs to |
| `workspaceId` | String | The unique identifier of the Workspace the related Site belongs to |
| `collectionId` | String | The unique identifier of the Collection the deleted item belongs to |

**Example Payload**

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

**Required Scope \| `cms:read`**

**Properties**

| Field | Type | Description |
| --- | --- | --- |
| `id` | String | The unique identifier of the collection item that was deleted |
| `siteId` | String | The unique identifier of the Site the Collection belongs to |
| `workspaceId` | String | The unique identifier of the Workspace the related Site belongs to |

**Example Payload**

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