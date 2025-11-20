## Object-fit in action
As shown in the first GIF in this update, you can use the fit property to control how a grid of author headshots display within their containing parent.
In the example below, the headshot image elements are set to 100% width and height of their parents — but without the fit property, they’re awkwardly squeezed to fit those dimensions.
![Images set to 100% width and height are “squeezed” without the fit property.](https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68c38795b1a1a9c98caaa4b0_64f9399ca7d13575ff21cc94_hOfQBxNbEYFxNyBv47CzRW2Z05rObmpMCvxWRhO-_3Gb9e1RAWtnAtl8l0mSeOJGwAAU9cFC8ROvpDJdZx4gcB0fGJQVnwALs5cf5qsGnSZhhSXO6lZH4hNv2jhn6KStr9FdvuuU.jpeg)
Images set to 100% width and height are “squeezed” without the fit property.
To make all the headshots fill the space of their parent elements without distortion, we’ll apply the “cover” attribute, which ensures that the image — you guessed it — _covers_ the space available, without distorting its proportions.
![](https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68c38795b1a1a9c98caaa4ad_64f9399ca7d13575ff21cc78_F1p0PuMOgSlp4gIQlOGoyg1FCP-X-luiaZQb6Pgtg1sWaGg9DloTN_spOkNS4hb_Kcajn5V5GtpnVSbQw5p6Sgw4fqzQIS4hMI5NLq9MSfynNZgf31JYsvX5T54gz0okQ_dsOLqM.gif)
Apply the fit option “cover” to have images fill the space without distortion.
## Advantages of using the fit property over background images
As many of you pointed out in the wishlist item for this feature, the fit property provides a different way of achieving many of the designs that are currently only possible with [background images](https://university.webflow.com/article/background-image).
Here’s a couple of the key advantages of using the fit property:
- **Improved accessibility.** If you use image elements in place of background images, you can provide alt text to let people who use screen readers better understand what your page is showing — an option that simply doesn’t exist when using a background image.
- **Responsive images support.** Webflow [automatically scales, compresses, and optimizes inline images](https://webflow.com/blog/new-feature-responsive-images) for every device — but not background images. With the fit property, you can use inline images instead, so your images will be appropriately scaled for the viewer’s device, and hence, load faster.
For a full look at all the options object-fit allows, check out [Mozilla’s documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
* * *