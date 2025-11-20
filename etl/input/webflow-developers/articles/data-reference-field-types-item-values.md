---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/field-types-item-values
title: "Field Types & Item Values | Webflow Developer Documentation"
published: 2025-11-17
---

This page is a reference for all Webflow CMS field types and the value formats they accept. Use it to:

- Understand each field type’s purpose and behavior
- Learn how to format values when creating or updating items via the API

To retrieve the specific fields used in a collection, call the [Get Collection](https://developers.webflow.com/data/reference/cms/collections/get) endpoint.

##### Field Type Names

Some field types may use slightly different names in the Webflow UI. This document uses the API name for each field type.

## [Plain Text](https://university.webflow.com/lesson/plain-text-field)

Stores text without formatting.

###### Value Format

###### Example

```
string
```

## [Rich Text](https://university.webflow.com/lesson/rich-text-field)

Stores long-form text with HTML formatting.

###### Value Format

###### Example

```
string
```

##### Code Blocks in Rich Text Fields

The API doesn’t currently support code blocks in Rich Text fields. Passing code blocks will result in an empty string.

## [ImageRef / Image](https://university.webflow.com/lesson/image-field)

Stores a single image. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for images is 4MB.

###### Read Value

###### Write Value

FormatExample

```
{
  "fileId": "string",
  "url": "string",
  "alt": "string" (optional)
}
```

## [Multi-Image](https://university.webflow.com/lesson/multi-image-field-overview)

Stores multiple images. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for each image is 4MB.

###### Read Value

###### Write Value

FormatExample

```
[\
  {\
    "fileId": "string",\
    "url": "string",\
    "alt": "string" (optional)\
  }\
]
```

## VideoLink

Accepts a URL string for videos hosted on platforms like YouTube or Vimeo.

###### Value Format

###### Example

```
string
```

## [Link](https://university.webflow.com/lesson/link-field)

Stores a URL.

###### Value Format

###### Example

```
string
```

## [Email](https://university.webflow.com/lesson/email-field)

Stores an email address.

###### Value Format

###### Example

```
string
```

## [Phone](https://university.webflow.com/lesson/phone-field)

Stores a phone number.

###### Value Format

###### Example

```
string
```

## [Number](https://university.webflow.com/lesson/number-field)

Stores an integer or a decimal number.

###### Value Format

###### Example

```
number
```

## [Date/Time](https://university.webflow.com/lesson/date-time-field)

Stores a date and time.

###### Read Value Format

###### Write Value Format

###### Example

```
string (ISO 8601)
```

## [Switch](https://university.webflow.com/lesson/switch-field)

Stores a boolean value (`true` or `false`).

###### Value Format

###### Example

```
boolean
```

## [Color](https://university.webflow.com/lesson/color-field-overview)

Stores a color value. Accepts HEX, RGB, HSL, and named color formats.

###### Value Format

###### Example

```
string
```

Accepted formats include:

- `#RGB`
- `#RGBA`
- `#RRGGBB`
- `#RRGGBBAA`
- `rgb(red,green,blue)`
- `rgba(red,green,blue,alpha)`
- `hsl(hue,saturation,lightness)`
- `hsla(hue,saturation,lightness,alpha)`
- `orchid`, `aqua`, `black`, etc.
- `transparent`

## [Option](https://university.webflow.com/lesson/option-field)

Creates a predefined list of choices for an item.

### Create an Option Field

To create an Option field, send a `POST` request to the [Create Field](https://developers.webflow.com/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Option"` and a `metadata` object containing an `options` array. Each object in the array defines a choice with a `name`.

###### Create Field Request

###### Read Field Definition

```
{
  "type": "Option",
  "displayName": "milliways-drink-menu",
  "metadata": {
    "options": [\
      {"name": "pan-galactic gargle blaster"},\
      {"name": "waturi punch"},\
      {"name": "gnab gib"}\
    ]
  }
}
```

### Write an option value

To set an option for an item, get the option `id` of the desired option and pass it as a string. You can get the option `id` by calling the [Get Collection Details](https://developers.webflow.com/data/reference/cms/collections/get) endpoint and then searching for the option field and it’s metadata in the `fields` array.

###### Value Format

###### Example

```
string (Option ID)
```

## File

Stores a file reference. You can upload a new file from a public URL or use an existing file by referencing its `fileId`.

###### Read Value

###### Write Value

```
{
  "fileId": "string",
  "url": "string",
  "alt"?: "string"
}
```

## [ItemRef / Reference](https://university.webflow.com/lesson/reference-field)

Links an item to another item in the same or a different collection.

### Create a reference field

To create a Reference field, send a `POST` request to the [Create Field](https://developers.webflow.com/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Reference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

###### Create Field Request

```
// Include the metadata property in the request body
{
  "type": "Reference",
  "displayName": "Author",
  "helpText": "Add the post author here",
  "metadata": {
    "collectionId": "63692ab61fb2852f582ba8f5"
  }
}
```

### Write a reference value

To set a reference for an item, get the item `id` of the referenced item and pass it as a string. You can get the item `id` by calling the [Get Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint for the referenced collection.

###### Value Format

###### Example

```
string (Item ID)
```

## [Multi-Reference](https://university.webflow.com/lesson/multi-reference-field)

Links an item to multiple items in the same or a different collection.

### Create a multi-reference field

To create a Multi-Reference field, send a `POST` request to the [Create Field](https://developers.webflow.com/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "MultiReference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

###### Create Field Request

```
// Include the metadata property in the request body
{
  "type": "MultiReference",
  "displayName": "Authors",
  "helpText": "Add post authors here",
  "metadata": {
    "collectionId": "63692ab61fb2852f582ba8f5"
  }
}
```

### Write a multi-reference value

To set multiple references for an item, pass an array of item `id` strings.

###### Value Format

###### Example

```
[string, string] (Item IDs)
```

## User

A read-only field containing the unique ID of a Webflow user. This field is used for the “created-by” and “updated-by” properties on an item.

###### Value Format

###### Example

```
string
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