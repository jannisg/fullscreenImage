# jQuery: fullscreenImage plugin

it's a simple little plugin but it does what it's supposed to in just 745 bytes when minified & gzipped.

## What is this?

Just a simple plugin that makes any image you have a fullscreen background image without breaking the aspect ratio of your image.

## How to?

To use simply create a container with an image inside then pass this container into the fullscreenimage() jquery plugin.

## What options are there?

*  you can define the maxUpscale ratio, in doing so you can trigger when the raster will start appearing to hide some of those nasty upscaling effects.
*  set your own path to a custom raster image. the demo folder contains a simple 8 bit png with a black 2px by 2px raster image but a different colour may work better for your images
*  turn the raster overlay off entirely by setting 'showRaster' to false.
*  easily set the vertical anchor point of the enlargement.


        **maxUpscale**: 1 *(upscale ratio, eg: 1.5 would upscale the image to 150%, then use the rasterImg overlay)*  
        
        **rasterImg**: '/static/img/raster.png' *(a 2px raster that neatly disguises the bad effects of image upscaling)*  
        
        **showRaster**: true | false *(easily disable the raster all together)*  
        
        **vAlign**: 'center' | 'top' | 'bottom' *(set the anchor point of the image's vertical axis)*  
        
    
## Compatibility

This little plugin has been tested in Internet Explorer 6+, Opera 10.6, Firefox 3.6+, Google Chrome & Safari 5, if you notice any bugs please let me know.

## Size

Minified & Gzipped this plugin is just 745 bytes.

## Demo please?

Sure… [here](http://gundermann.me/playground/jq-fullscreenimage/) you go.