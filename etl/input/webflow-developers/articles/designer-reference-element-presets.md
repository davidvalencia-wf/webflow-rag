---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-presets
title: "Element Presets | Webflow Developer Documentation"
published: 2025-11-17
---

The Element Presets object specifies all the element types available in the designer. Using the Element Presets object, Apps can select native Webflow elements to insert onto a page with the [element creation methods.](https://developers.webflow.com/designer/reference/insert-element-before)

Each preset corresponds to a unique element type, complete with its own properties and methods. For a deeper understanding of how to manipulate these element properties and methods, consult the [Designer Extension type definitions](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code) and documentation on [element properties and methods.](https://developers.webflow.com/designer/reference/elements-overview)

##### Use the DOM element when presets aren't available

Not all element types are supported through presets. Additionally, not all
presets have methods to support updating the element. If a preset or
functionality isn’t available for the element you want to create, you can use
the [custom DOM element](https://developers.webflow.com/designer/reference/dom-element) method to create a
custom element.

### Layout & Structure

For fundamental building blocks of page layout and responsive design.

| Preset | Element Type |
| --- | --- |
| DivBlock | BlockElement |
| DOM | [DOMElement](https://developers.webflow.com/designer/reference/dom-element) |
| Grid | GridElement |
| HFlex | HFlexElement |
| QuickStack | LayoutElement |
| Row | RowElement |
| Section | SectionElement |
| VFlex | VFlexElement |

### Typography & Content

For elements whose primary purpose is to display text or structured content.

| Preset | Element Type |
| --- | --- |
| Blockquote | BlockquoteElement |
| Heading | [HeadingElement](https://developers.webflow.com/designer/reference/heading-element) |
| List | ListElement |
| ListItem | ListItemElement |
| Paragraph | ParagraphElement |
| RichText | RichTextElement |
| TextBlock | BlockElement |

### Navigation & Interactive

For elements that users interact with to navigate or trigger actions.

| Preset | Element Type |
| --- | --- |
| Button | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |
| DropdownWrapper | DropdownWrapperElement |
| LightboxWrapper | LightboxWrapperElement |
| LinkBlock | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |
| NavbarWrapper | NavbarWrapperElement |
| Pagination | PaginationElement |
| SliderWrapper | SliderWrapperElement |
| TabsWrapper | TabsWrapperElement |
| TextLink | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |

### Forms

All presets related to creating and managing forms.

| Preset | Element Type |
| --- | --- |
| FormBlockLabel | FormBlockLabelElement |
| FormButton | FormButtonElement |
| FormCheckboxInput | AnyElement |
| FormFileUploadWrapper | AnyElement |
| FormForm | [FormElement](https://developers.webflow.com/designer/reference/form-element) |
| FormRadioInput | AnyElement |
| FormReCaptcha | FormReCaptchaElement |
| FormSelect | AnyElement |
| FormTextarea | AnyElement |
| FormTextInput | AnyElement |

### Pre-built Layouts

For professionally designed, pre-built sections that can be inserted onto a page.

| Preset | Element Type |
| --- | --- |
| LayoutFeaturesList | SectionElement |
| LayoutFeaturesMetrics | SectionElement |
| LayoutFeaturesTable | SectionElement |
| LayoutFooterDark | SectionElement |
| LayoutFooterLight | SectionElement |
| LayoutFooterSubscribe | SectionElement |
| LayoutGalleryOverview | SectionElement |
| LayoutGalleryScroll | SectionElement |
| LayoutGallerySlider | SectionElement |
| LayoutHeroHeadingCenter | SectionElement |
| LayoutHeroHeadingLeft | SectionElement |
| LayoutHeroHeadingRight | SectionElement |
| LayoutHeroStack | SectionElement |
| LayoutHeroSubscribeLeft | SectionElement |
| LayoutHeroSubscribeRight | SectionElement |
| LayoutHeroWithoutImage | SectionElement |
| LayoutLogosQuoteBlock | SectionElement |
| LayoutLogosQuoteDivider | SectionElement |
| LayoutLogosTitleLarge | SectionElement |
| LayoutLogosTitleSmall | SectionElement |
| LayoutLogosWithoutTitle | SectionElement |
| LayoutNavbarLogoCenter | SectionElement |
| LayoutNavbarLogoLeft | SectionElement |
| LayoutNavbarNoShadow | SectionElement |
| LayoutPricingComparison | SectionElement |
| LayoutPricingItems | SectionElement |
| LayoutPricingOverview | SectionElement |
| LayoutTeamCircles | SectionElement |
| LayoutTeamSlider | SectionElement |
| LayoutTestimonialColumnDark | SectionElement |
| LayoutTestimonialColumnLight | SectionElement |
| LayoutTestimonialImageLeft | SectionElement |
| LayoutTestimonialSliderLarge | SectionElement |
| LayoutTestimonialSliderSmall | SectionElement |
| LayoutTestimonialStack | SectionElement |
| StructureLayoutQuickStack1plus2 | SectionElement |
| StructureLayoutQuickStack1x1 | SectionElement |
| StructureLayoutQuickStack2plus1 | SectionElement |
| StructureLayoutQuickStack2x1 | SectionElement |
| StructureLayoutQuickStack2x2 | SectionElement |
| StructureLayoutQuickStack3x1 | SectionElement |
| StructureLayoutQuickStack4x1 | SectionElement |
| StructureLayoutQuickStackMasonry | SectionElement |

### E-commerce

All presets specific to Webflow’s E-commerce functionality.

| Preset | Element Type |
| --- | --- |
| CommerceAddToCartWrapper | AnyElement |
| CommerceCartQuickCheckoutActions | CommerceCartQuickCheckoutActionsElement |
| CommerceCartWrapper | AnyElement |
| CommerceCheckoutAdditionalInfoSummaryWrapper | CommerceCheckoutAdditionalInfoSummaryWrapperElement |
| CommerceCheckoutAdditionalInputsContainer | AnyElement |
| CommerceCheckoutCustomerInfoSummaryWrapper | AnyElement |
| CommerceCheckoutDiscounts | AnyElement |
| CommerceCheckoutFormContainer | AnyElement |
| CommerceCheckoutOrderItemsWrapper | AnyElement |
| CommerceCheckoutOrderSummaryWrapper | AnyElement |
| CommerceCheckoutPaymentSummaryWrapper | CommerceCheckoutPaymentSummaryWrapperElement |
| CommerceCheckoutShippingSummaryWrapper | AnyElement |
| CommerceDownloadsWrapper | CommerceDownloadsWrapperElement |
| CommerceOrderConfirmationContainer | AnyElement |
| CommercePayPalCheckoutButton | CommercePayPalCheckoutButtonElement |
| CommercePaypalCheckoutFormContainer | AnyElement |

### CMS & Dynamic Content

For elements related to displaying content from the Webflow CMS.

| Preset | Element Type |
| --- | --- |
| DynamoWrapper | DynamoWrapperElement |

### Media & Embeds

For displaying images, videos, and third-party content.

| Preset | Element Type |
| --- | --- |
| BackgroundVideoWrapper | BackgroundVideoWrapperElement |
| Facebook | FacebookElement |
| HtmlEmbed | HtmlEmbedElement |
| Image | [ImageElement](https://developers.webflow.com/designer/reference/image-element) |
| MapWidget | MapWidgetElement |
| Spline | AnyElement |
| Twitter | TwitterElement |
| Video | VideoElement |
| YouTubeVideo | YouTubeVideoElement |

### User Accounts

All presets related to user authentication and account management.

| Preset | Element Type |
| --- | --- |
| LogIn | UserLogInFormWrapperElement |
| ResetPassword | UserResetPasswordFormWrapperElement |
| SignUp | UserSignUpFormWrapperElement |
| UpdatePassword | UserUpdatePasswordFormWrapperElement |
| UserAccount | UserAccountWrapperElement |
| UserAccountSubscriptionList | UserAccountSubscriptionListWrapperElement |
| UserLogOutLogIn | UserLogOutLogInElement |

### Advanced & Miscellaneous

A catch-all for more technical or specialized elements.

| Preset | Element Type |
| --- | --- |
| Animation | AnyElement |
| BlockContainer | BlockContainerElement |
| CodeBlock | CodeBlockElement |
| IX2InstanceFactoryOnClass | BlockElement |
| IX2InstanceFactoryOnElement | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |

This list outlines all presets that can be used with `webflow.elementPresets.<preset>`.

| Preset | Element Type |
| --- | --- |
| Animation | AnyElement |
| BackgroundVideoWrapper | BackgroundVideoWrapperElement |
| BlockContainer | BlockContainerElement |
| Blockquote | BlockquoteElement |
| Button | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |
| CodeBlock | CodeBlockElement |
| CommerceAddToCartWrapper | AnyElement |
| CommerceCartQuickCheckoutActions | CommerceCartQuickCheckoutActionsElement |
| CommerceCartWrapper | AnyElement |
| CommerceCheckoutAdditionalInfoSummaryWrapper | CommerceCheckoutAdditionalInfoSummaryWrapperElement |
| CommerceCheckoutAdditionalInputsContainer | AnyElement |
| CommerceCheckoutCustomerInfoSummaryWrapper | AnyElement |
| CommerceCheckoutDiscounts | AnyElement |
| CommerceCheckoutFormContainer | AnyElement |
| CommerceCheckoutOrderItemsWrapper | AnyElement |
| CommerceCheckoutOrderSummaryWrapper | AnyElement |
| CommerceCheckoutPaymentSummaryWrapper | CommerceCheckoutPaymentSummaryWrapperElement |
| CommerceCheckoutShippingSummaryWrapper | AnyElement |
| CommerceDownloadsWrapper | CommerceDownloadsWrapperElement |
| CommerceOrderConfirmationContainer | AnyElement |
| CommercePayPalCheckoutButton | CommercePayPalCheckoutButtonElement |
| CommercePaypalCheckoutFormContainer | AnyElement |
| DivBlock | BlockElement |
| DOM | DOMElement |
| DropdownWrapper | DropdownWrapperElement |
| DynamoWrapper | DynamoWrapperElement |
| Facebook | FacebookElement |
| FormBlockLabel | FormBlockLabelElement |
| FormButton | FormButtonElement |
| FormCheckboxInput | AnyElement |
| FormFileUploadWrapper | AnyElement |
| FormForm | AnyElement |
| FormRadioInput | AnyElement |
| FormReCaptcha | FormReCaptchaElement |
| FormSelect | AnyElement |
| FormTextarea | AnyElement |
| FormTextInput | AnyElement |
| Grid | GridElement |
| Heading | [HeadingElement](https://developers.webflow.com/designer/reference/heading-element) |
| HFlex | HFlexElement |
| HtmlEmbed | HtmlEmbedElement |
| Image | AnyElement |
| IX2InstanceFactoryOnClass | BlockElement |
| IX2InstanceFactoryOnElement | [LinkElement](https://developers.webflow.com/designer/reference/image-element) |
| LayoutFeaturesList | SectionElement |
| LayoutFeaturesMetrics | SectionElement |
| LayoutFeaturesTable | SectionElement |
| LayoutFooterDark | SectionElement |
| LayoutFooterLight | SectionElement |
| LayoutFooterSubscribe | SectionElement |
| LayoutGalleryOverview | SectionElement |
| LayoutGalleryScroll | SectionElement |
| LayoutGallerySlider | SectionElement |
| LayoutHeroHeadingCenter | SectionElement |
| LayoutHeroHeadingLeft | SectionElement |
| LayoutHeroHeadingRight | SectionElement |
| LayoutHeroStack | SectionElement |
| LayoutHeroSubscribeLeft | SectionElement |
| LayoutHeroSubscribeRight | SectionElement |
| LayoutHeroWithoutImage | SectionElement |
| LayoutLogosQuoteBlock | SectionElement |
| LayoutLogosQuoteDivider | SectionElement |
| LayoutLogosTitleLarge | SectionElement |
| LayoutLogosTitleSmall | SectionElement |
| LayoutLogosWithoutTitle | SectionElement |
| LayoutNavbarLogoCenter | SectionElement |
| LayoutNavbarLogoLeft | SectionElement |
| LayoutNavbarNoShadow | SectionElement |
| LayoutPricingComparison | SectionElement |
| LayoutPricingItems | SectionElement |
| LayoutPricingOverview | SectionElement |
| LayoutTeamCircles | SectionElement |
| LayoutTeamSlider | SectionElement |
| LayoutTestimonialColumnDark | SectionElement |
| LayoutTestimonialColumnLight | SectionElement |
| LayoutTestimonialImageLeft | SectionElement |
| LayoutTestimonialSliderLarge | SectionElement |
| LayoutTestimonialSliderSmall | SectionElement |
| LayoutTestimonialStack | SectionElement |
| LightboxWrapper | LightboxWrapperElement |
| LinkBlock | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |
| List | ListElement |
| ListItem | ListItemElement |
| LogIn | UserLogInFormWrapperElement |
| MapWidget | MapWidgetElement |
| NavbarWrapper | NavbarWrapperElement |
| Pagination | PaginationElement |
| Paragraph | ParagraphElement |
| QuickStack | LayoutElement |
| ResetPassword | UserResetPasswordFormWrapperElement |
| RichText | RichTextElement |
| Row | RowElement |
| SearchForm | AnyElement |
| Section | SectionElement |
| SignUp | UserSignUpFormWrapperElement |
| SliderWrapper | SliderWrapperElement |
| Spline | AnyElement |
| StructureLayoutQuickStack1plus2 | SectionElement |
| StructureLayoutQuickStack1x1 | SectionElement |
| StructureLayoutQuickStack2plus1 | SectionElement |
| StructureLayoutQuickStack2x1 | SectionElement |
| StructureLayoutQuickStack2x2 | SectionElement |
| StructureLayoutQuickStack3x1 | SectionElement |
| StructureLayoutQuickStack4x1 | SectionElement |
| StructureLayoutQuickStackMasonry | SectionElement |
| TabsWrapper | TabsWrapperElement |
| TextBlock | BlockElement |
| TextLink | [LinkElement](https://developers.webflow.com/designer/reference/link-element) |
| Twitter | TwitterElement |
| UpdatePassword | UserUpdatePasswordFormWrapperElement |
| UserAccount | UserAccountWrapperElement |
| UserAccountSubscriptionList | UserAccountSubscriptionListWrapperElement |
| UserLogOutLogIn | UserLogOutLogInElement |
| VFlex | VFlexElement |
| Video | VideoElement |
| YouTubeVideo | YouTubeVideoElement |