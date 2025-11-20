---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/style-properties
title: "Style Properties | Webflow Developer Documentation"
published: 2025-11-17
---

Style properties define the visual appearance and layout of web page elements. Using the Webflow Designer API, you can programmatically set these CSS properties to control design aspects like colors, typography, spacing, and positioning.

## How to use style properties

The Designer API accepts style properties as a `PropertyMap` object. A `PropertyMap` is a key-value collection where keys are CSS property names and values are their corresponding settings.

PropertyMap Example

```
{
    "color": "#ff5733",
    "font-size": "16px",
    "font-weight": "bold",
    "text-align": "center",
    "background-color": "#e0e0e0",
    "border-radius": "5px",
    "border-color": "#000000",
}
```

##### Property naming

Use the long-form CSS property names when setting styles. For example, use `grid-row-gap` instead of `row-gap`. See the [MDN CSS Properties reference](https://developer.mozilla.org/en-US/docs/Web/CSS) for complete property names.

## Supported properties

The following properties are organized by functional category for reference. Each property accepts either a string value or, where noted, a Webflow variable reference.

### Layout & positioning

| Property | Type | Example |
| --- | --- | --- |
| `display` | string | `flex` |
| `position` | string | `absolute` |
| `top` | string or SizeVariable | `100px` |
| `right` | string or SizeVariable | `0px` |
| `bottom` | string or SizeVariable | `0` |
| `left` | string or SizeVariable | `50px` |
| `width` | string or SizeVariable | `50%` |
| `height` | string or SizeVariable | `100vh` |
| `min-width` | string or SizeVariable | `60px` |
| `max-width` | string or SizeVariable | `80%` |
| `min-height` | string or SizeVariable | `100px` |
| `max-height` | string or SizeVariable | `200px` |
| `z-index` | string | `10` |

### Flex layout

| Property | Type | Example |
| --- | --- | --- |
| `flex-direction` | string | `row` |
| `flex-wrap` | string | `wrap` |
| `flex-basis` | string or SizeVariable | `auto` |
| `flex-grow` | string | `1` |
| `flex-shrink` | string | `1` |
| `justify-content` | string | `space-between` |
| `align-items` | string | `flex-start` |
| `align-content` | string | `center` |
| `align-self` | string | `stretch` |

### Grid

| Property | Type | Example |
| --- | --- | --- |
| `grid-template-columns` | string | `50px 100px` |
| `grid-template-rows` | string | `auto` |
| `grid-template-areas` | string | `'header header'` |
| `grid-column-start` | string | `1` |
| `grid-column-end` | string | `span 2` |
| `grid-row-start` | string | `1` |
| `grid-row-end` | string | `3` |
| `grid-column-gap` | string | `10px` |
| `grid-row-gap` | string or SizeVariable | `20px` |
| `grid-auto-flow` | string | `row dense` |

### Typography

| Property | Type | Example |
| --- | --- | --- |
| `font-family` | string or FontFamilyVariable | `Arial, sans-serif` |
| `font-size` | string or SizeVariable | `16px` |
| `font-weight` | string | `bold` |
| `font-style` | string | `italic` |
| `line-height` | string or SizeVariable | `1.5` |
| `text-align` | string | `justify` |
| `text-transform` | string | `uppercase` |
| `letter-spacing` | string or SizeVariable | `0.5em` |
| `word-spacing` | string or SizeVariable | `5px` |
| `color` | string or ColorVariable | `#FF9800` |

### Colors & backgrounds

| Property | Type | Example |
| --- | --- | --- |
| `background-color` | string or ColorVariable | `#e0e0e0` |
| `background-image` | string | `url('image.jpg')` |
| `background-size` | string | `cover` |
| `background-position` | string | `top right` |
| `background-repeat` | string | `repeat-x` |
| `background-attachment` | string | `fixed` |
| `background-blend-mode` | string | `multiply` |
| `accent-color` | string or ColorVariable | `#ff5733` |
| `caret-color` | string or ColorVariable | `blue` |

### Borders

| Property | Type | Example |
| --- | --- | --- |
| `border-top-width` | string or SizeVariable | `2px` |
| `border-top-style` | string | `ridge` |
| `border-top-color` | string or ColorVariable | `#3F51B5` |
| `border-top-left-radius` | string or SizeVariable | `20px` |
| `border-top-right-radius` | string or SizeVariable | `20px` |
| `border-bottom-width` | string or SizeVariable | `1px` |
| `border-bottom-style` | string | `groove` |
| `border-bottom-color` | string or ColorVariable | `#f44336` |
| `border-bottom-left-radius` | string or SizeVariable | `4px` |
| `border-bottom-right-radius` | string or SizeVariable | `4px` |
| `border-left-width` | string or SizeVariable | `2px` |
| `border-left-style` | string | `dashed` |
| `border-left-color` | string or ColorVariable | `#9C27B0` |
| `border-right-width` | string or SizeVariable | `1px` |
| `border-right-style` | string | `double` |
| `border-right-color` | string or ColorVariable | `#FFEB3B` |

### Spacing

| Property | Type | Example |
| --- | --- | --- |
| `margin-top` | string or SizeVariable | `10px` |
| `margin-right` | string or SizeVariable | `30px` |
| `margin-bottom` | string or SizeVariable | `20px` |
| `margin-left` | string or SizeVariable | `30px` |
| `padding-top` | string or SizeVariable | `10px` |
| `padding-right` | string or SizeVariable | `10px` |
| `padding-bottom` | string or SizeVariable | `15px` |
| `padding-left` | string or SizeVariable | `10px` |

### Effects & transforms

| Property | Type | Example |
| --- | --- | --- |
| `box-shadow` | string | `10px 5px 5px black` |
| `text-shadow` | string | `2px 2px 5px grey` |
| `filter` | string | `blur(2px)` |
| `backdrop-filter` | string | `blur(5px)` |
| `transform` | string | `rotate(45deg)` |
| `transform-origin` | string | `top left` |
| `opacity` | string | `0.5` |
| `mix-blend-mode` | string | `multiply` |

### Transitions & animations

| Property | Type | Example |
| --- | --- | --- |
| `transition-property` | string | `opacity` |
| `transition-duration` | string | `300ms` |
| `transition-timing-function` | string | `ease-in-out` |
| `transition-delay` | string | `0.5s` |
| `animation-name` | string | `slidein` |
| `animation-duration` | string | `1s` |
| `animation-timing-function` | string | `ease-in-out` |
| `animation-delay` | string | `2s` |
| `animation-iteration-count` | string | `infinite` |
| `animation-direction` | string | `alternate` |
| `animation-fill-mode` | string | `forwards` |
| `animation-play-state` | string | `paused` |

### Complete property reference

For a comprehensive list of all supported properties, see the [W3Schools CSS Properties reference](https://www.w3schools.com/cssref/index.php).

| Style Property | Value | Example |
| --- | --- | --- |
| accent-color | string or ColorVariable | `#ff5733` |
| align-content | string | `center` |
| align-items | string | `flex-start` |
| align-self | string | `stretch` |
| animation-delay | string | `2s` |
| animation-direction | string | `alternate` |
| animation-duration | string | `1s` |
| animation-fill-mode | string | `forwards` |
| animation-iteration-count | string | `infinite` |
| animation-name | string | `slidein` |
| animation-play-state | string | `paused` |
| animation-timing-function | string | `ease-in-out` |
| appearance | string | `none` |
| backdrop-filter | string | `blur(5px)` |
| backface-visibility | string | `hidden` |
| background-attachment | string | `fixed` |
| background-blend-mode | string | `multiply` |
| background-clip | string | `border-box` |
| background-color | string or ColorVariable | `#e0e0e0` |
| background-image | string | `url('image.jpg')` |
| background-origin | string | `padding-box` |
| background-position | string | `top right` |
| background-position-x | string or SizeVariable | `50%` |
| background-position-y | string or SizeVariable | `50%` |
| background-repeat | string | `repeat-x` |
| background-size | string | `cover` |
| block-size | string or SizeVariable | `100px` |
| border-block-end-color | string or ColorVariable | `#000000` |
| border-block-end-style | string | `dotted` |
| border-block-end-width | string or SizeVariable | `3px` |
| border-block-start-color | string or ColorVariable | `#333333` |
| border-block-start-style | string | `solid` |
| border-block-start-width | string or SizeVariable | `2px` |
| border-bottom-color | string or ColorVariable | `#f44336` |
| border-bottom-left-radius | string or SizeVariable | `4px` |
| border-bottom-right-radius | string or SizeVariable | `4px` |
| border-bottom-style | string | `groove` |
| border-bottom-width | string or SizeVariable | `1px` |
| border-collapse | string | `collapse` |
| border-end-end-radius | string or SizeVariable | `10px` |
| border-end-start-radius | string or SizeVariable | `10px` |
| border-image-outset | string or SizeVariable | `5px` |
| border-image-repeat | string | `stretch` |
| border-image-slice | string | `30%` |
| border-image-source | string | `url('border.png')` |
| border-image-width | string or SizeVariable | `10px` |
| border-inline-end-color | string or ColorVariable | `#4CAF50` |
| border-inline-end-style | string | `inset` |
| border-inline-end-width | string or SizeVariable | `4px` |
| border-inline-start-color | string or ColorVariable | `#2196F3` |
| border-inline-start-style | string | `outset` |
| border-inline-start-width | string or SizeVariable | `3px` |
| border-left-color | string or ColorVariable | `#9C27B0` |
| border-left-style | string | `dashed` |
| border-left-width | string or SizeVariable | `2px` |
| border-right-color | string or ColorVariable | `#FFEB3B` |
| border-right-style | string | `double` |
| border-right-width | string or SizeVariable | `1px` |
| border-start-end-radius | string or SizeVariable | `5px` |
| border-start-start-radius | string or SizeVariable | `5px` |
| border-top-color | string or ColorVariable | `#3F51B5` |
| border-top-left-radius | string or SizeVariable | `20px` |
| border-top-right-radius | string or SizeVariable | `20px` |
| border-top-style | string | `ridge` |
| border-top-width | string or SizeVariable | `2px` |
| bottom | string or SizeVariable | `0` |
| box-shadow | string | `10px 5px 5px black` |
| box-sizing | string | `border-box` |
| break-after | string | `auto` |
| break-before | string | `always` |
| break-inside | string | `avoid` |
| caption-side | string | `bottom` |
| caret-color | string or ColorVariable | `blue` |
| clear | string | `both` |
| clip | string | `rect(0,0,0,0)` |
| clip-path | string | `circle(50%)` |
| clip-rule | string | `evenodd` |
| color | string or ColorVariable | `#FF9800` |
| color-interpolation | string | `sRGB` |
| color-interpolation-filters | string | `linearRGB` |
| column-count | string | `3` |
| column-gap | string or SizeVariable | `20px` |
| column-rule-color | string or ColorVariable | `#607D8B` |
| column-rule-style | string | `solid` |
| column-rule-width | string or SizeVariable | `1px` |
| column-span | string | `all` |
| column-width | string or SizeVariable | `200px` |
| content | string | `'Hello'` |
| cursor | string | `pointer` |
| cx | string | `50` |
| cy | string | `50` |
| direction | string | `ltr` |
| display | string | `flex` |
| dominant-baseline | string | `alphabetic` |
| empty-cells | string | `show` |
| fill | string | `#f00` |
| fill-opacity | string | `0.5` |
| fill-rule | string | `nonzero` |
| filter | string | `blur(2px)` |
| flex-basis | string or SizeVariable | `auto` |
| flex-direction | string | `row` |
| flex-grow | string | `1` |
| flex-shrink | string | `1` |
| flex-wrap | string | `wrap` |
| float | string | `right` |
| flood-color | string or ColorVariable | `#00BCD4` |
| flood-opacity | string | `0.7` |
| font-family | string or FontFamilyVariable | `Arial, sans-serif` |
| font-kerning | string | `normal` |
| font-optical-sizing | string | `auto` |
| font-size | string or SizeVariable | `16px` |
| font-stretch | string | `condensed` |
| font-style | string | `italic` |
| font-variant-alternates | string | `normal` |
| font-variant-caps | string | `small-caps` |
| font-variant-east-asian | string | `normal` |
| font-variant-ligatures | string | `none` |
| font-variant-numeric | string | `ordinal` |
| font-weight | string | `bold` |
| grid-auto-columns | string | `minmax(100px, auto)` |
| grid-auto-flow | string | `row dense` |
| grid-auto-rows | string | `auto` |
| grid-column-end | string | `span 2` |
| grid-column-gap | string | `10px` |
| grid-column-start | string | `1` |
| grid-row-end | string | `3` |
| grid-row-gap | string or SizeVariable | `20px` |
| grid-row-start | string | `1` |
| grid-template-areas | string | `'header header'` |
| grid-template-columns | string | `50px 100px` |
| grid-template-rows | string | `auto` |
| height | string or SizeVariable | `100vh` |
| image-orientation | string | `90deg` |
| image-rendering | string | `auto` |
| inline-size | string or SizeVariable | `200px` |
| inset-block-end | string or SizeVariable | `20px` |
| inset-block-start | string or SizeVariable | `5px` |
| inset-inline-end | string or SizeVariable | `10px` |
| inset-inline-start | string or SizeVariable | `10px` |
| isolation | string | `isolate` |
| justify-content | string | `space-between` |
| justify-items | string | `stretch` |
| justify-self | string | `center` |
| left | string or SizeVariable | `50px` |
| letter-spacing | string or SizeVariable | `0.5em` |
| lighting-color | string or ColorVariable | `white` |
| line-break | string | `strict` |
| line-height | string or SizeVariable | `1.5` |
| list-style-image | string | `url('star.png')` |
| list-style-position | string | `inside` |
| list-style-type | string | `disc` |
| margin-block-end | string or SizeVariable | `15px` |
| margin-block-start | string or SizeVariable | `15px` |
| margin-bottom | string or SizeVariable | `20px` |
| margin-inline-end | string or SizeVariable | `10px` |
| margin-inline-start | string or SizeVariable | `10px` |
| margin-left | string or SizeVariable | `30px` |
| margin-right | string or SizeVariable | `30px` |
| margin-top | string or SizeVariable | `10px` |
| marker-end | string | `url('arrowhead.svg')` |
| marker-mid | string | `url('dot.svg')` |
| marker-start | string | `url('circle.svg')` |
| mask-type | string | `luminance` |
| max-block-size | string or SizeVariable | `100px` |
| max-height | string or SizeVariable | `200px` |
| max-inline-size | string or SizeVariable | `300px` |
| max-width | string or SizeVariable | `80%` |
| min-block-size | string or SizeVariable | `50px` |
| min-height | string or SizeVariable | `100px` |
| min-inline-size | string or SizeVariable | `150px` |
| min-width | string or SizeVariable | `60px` |
| mix-blend-mode | string | `multiply` |
| object-fit | string | `cover` |
| object-position | string | `center top` |
| offset-anchor | string | `auto` |
| offset-distance | string or SizeVariable | `10px` |
| offset-path | string | `path('M10 80 Q 95 10 180 80')` |
| offset-rotate | string | `auto` |
| opacity | string | `0.5` |
| order | string | `2` |
| outline-color | string or ColorVariable | `#FF5722` |
| outline-offset | string or SizeVariable | `2px` |
| outline-style | string | `dashed` |
| outline-width | string or SizeVariable | `3px` |
| overflow-wrap | string | `break-word` |
| overflow-x | string | `auto` |
| overflow-y | string | `scroll` |
| overscroll-behavior-block | string | `contain` |
| overscroll-behavior-inline | string | `none` |
| padding-block-end | string or SizeVariable | `25px` |
| padding-block-start | string or SizeVariable | `25px` |
| padding-bottom | string or SizeVariable | `15px` |
| padding-inline-end | string or SizeVariable | `20px` |
| padding-inline-start | string or SizeVariable | `20px` |
| padding-left | string or SizeVariable | `10px` |
| padding-right | string or SizeVariable | `10px` |
| padding-top | string or SizeVariable | `10px` |
| paint-order | string | `fill stroke markers` |
| perspective | string or SizeVariable | `500px` |
| perspective-origin | string | `50% 50%` |
| pointer-events | string | `none` |
| position | string | `absolute` |
| r | string or SizeVariable | `50px` |
| resize | string | `both` |
| right | string or SizeVariable | `0px` |
| rotate | string | `45deg` |
| row-gap | string or SizeVariable | `20px` |
| rx | string or SizeVariable | `10px` |
| ry | string or SizeVariable | `10px` |
| scale | string | `1.2` |
| scroll-behavior | string | `smooth` |
| scroll-margin-block-end | string or SizeVariable | `10px` |
| scroll-margin-block-start | string or SizeVariable | `10px` |
| scroll-margin-inline-end | string or SizeVariable | `10px` |
| scroll-margin-inline-start | string or SizeVariable | `10px` |
| scroll-padding-block-end | string or SizeVariable | `20px` |
| scroll-padding-block-start | string or SizeVariable | `20px` |
| scroll-padding-inline-end | string or SizeVariable | `20px` |
| scroll-padding-inline-start | string or SizeVariable | `20px` |
| shape-image-threshold | string | `0.3` |
| shape-margin | string or SizeVariable | `15px` |
| shape-outside | string | `circle(50%)` |
| shape-rendering | string | `auto` |
| stop-color | string or ColorVariable | `#0D47A1` |
| stop-opacity | string | `0.8` |
| stroke | string or ColorVariable | `black` |
| stroke-dasharray | string | `5, 10` |
| stroke-dashoffset | string or SizeVariable | `5px` |
| stroke-linecap | string | `round` |
| stroke-linejoin | string | `bevel` |
| stroke-miterlimit | string | `10` |
| stroke-opacity | string | `1` |
| stroke-width | string or SizeVariable | `3px` |
| tab-size | string or SizeVariable | `4` |
| table-layout | string | `fixed` |
| text-align | string | `justify` |
| text-align-last | string | `center` |
| text-anchor | string | `start` |
| text-decoration | string | `underline` |
| text-decoration-color | string or ColorVariable | `red` |
| text-decoration-line | string | `overline` |
| text-decoration-skip-ink | string | `auto` |
| text-decoration-style | string | `dotted` |
| text-emphasis-color | string or ColorVariable | `green` |
| text-emphasis-position | string | `under right` |
| text-emphasis-style | string | `filled circle` |
| text-indent | string or SizeVariable | `20px` |
| text-overflow | string | `ellipsis` |
| text-rendering | string | `optimizeLegibility` |
| text-shadow | string | `2px 2px 5px grey` |
| text-transform | string | `uppercase` |
| text-underline-position | string | `under` |
| top | string or SizeVariable | `100px` |
| touch-action | string | `pan-right` |
| transform | string | `rotate(45deg)` |
| transform-origin | string | `top left` |
| transform-style | string | `preserve-3d` |
| transition-delay | string | `0.5s` |
| transition-duration | string | `300ms` |
| transition-property | string | `opacity` |
| transition-timing-function | string | `ease-in-out` |
| translate | string or SizeVariable | `10px, 20px` |
| unicode-bidi | string | `bidi-override` |
| vector-effect | string | `non-scaling-stroke` |
| vertical-align | string | `middle` |
| visibility | string | `hidden` |
| white-space | string | `nowrap` |
| width | string or SizeVariable | `50%` |
| will-change | string | `transform` |
| word-break | string | `break-word` |
| word-spacing | string or SizeVariable | `5px` |
| writing-mode | string | `vertical-rl` |
| x | string or SizeVariable | `5px` |
| y | string or SizeVariable | `10px` |
| z-index | string | `10` |
| -webkit-line-clamp | string | `3` |
| -webkit-text-fill-color | string or ColorVariable | `#FF5722` |
| -webkit-text-stroke-color | string or ColorVariable | `#4CAF50` |
| -webkit-text-stroke-width | string or SizeVariable | `1px` |

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