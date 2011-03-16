(function($){

	$.fn.extend({ 
		
		//pass the options variable to the function
		fullscreenimage: function(options) {
			// pass an image directly or a container containing an image into this function

			//Set the default values, use comma to separate the settings, example:
			var defaults = {
				maxUpscale: 1, // ratio of enlargement before raster turns itself on
				rasterImg: '', // path to your raster image. a black 8bit png 2px by 2px raster is the default.
				showRaster: false, // options here are false, true, 'upscale'. Upscale only shows the raster if the image goes over the maxUpscale size
				vAlign: 'center' // options are top, center, bottom
			}
				
			var options =  $.extend(defaults, options);
			var FSI = {}; // object for the safe keeping of values
			var ie6 = ($.browser.msie && $.browser.version <= '6.0');
			return this.each(function() {
				var o = options;
				var self;
				
				if (this.nodeName == 'IMG') { 
					self = $(this);
				} else { 
					self = $(this).find('img').first();
				}
				
				// calculations run only once per image
				FSI.c	=	self.parent();
				FSI.i	=	self;
				FSI.iw	=	FSI.i.width();
				FSI.ih	=	FSI.i.height();
				FSI.iRatio = FSI.iw / FSI.ih;
				FSI.raster = o.rasterImg;
				FSI.maxUpscale = o.maxUpscale;
				FSI.pos = (ie6 ? 'absolute' : 'fixed');
				
				if ( o.showRaster ) { 
				FSI.rasterContainer = $('<div />', {
					'class':'raster',
					'css': {
						background: 'url('+FSI.raster+') repeat top left',
						'position':FSI.pos,
						top:0,
						left:0,
						width:'100%',
						height:'100%',
						overflow:'hidden',
						zIndex:0 // sits on top of the img
					}
				});
				}
				
				// setup
				FSI.c.css({
				  	zIndex: '-1', // make sure the container does not interfer with any on screen elements
				  	position: FSI.pos,
					top:0,
					left:0,
					width:'100%',
					height: ( ie6 ? $(window).height()+'px' : '100%' ),
					overflow:'hidden'
				});
				if ( o.showRaster ) { 
				FSI.rasterContainer.prependTo(FSI.c).hide();
				}
				
				function fullscreenimage() {
					FSI.icw; // stores computed image width
					FSI.ich;	// stores computed image height
					FSI.ww	=	$(window).width(); // gets the viewport width
					FSI.wh	=	$(window).height();// gets the viewport height
					FSI.windowRatio = FSI.ww/FSI.wh; // window ratio, duh…
					
					function pos() {
						var vAtop;
						if ( o.vAlign == 'top' ) {
							vAtop = 0+'px';
						} else if ( o.vAlign == 'center' ) {
							vAtop = (FSI.wh-FSI.ich)/2+'px';
						} else if ( o.vAlign == 'bottom' ) {
							vAtop = '-'+(FSI.ich-FSI.wh)+'px';
						}
			
						FSI.i.css({
							'position':FSI.pos,
							'z-index':-1,
							'width':FSI.icw,
							'height':FSI.ich,
							'left': ((FSI.ww-FSI.icw)/2)+'px',
							'top': vAtop
						});
					}
					
					function raster(axis) {
						if ( axis == "height" && (FSI.ih*FSI.maxUpscale) <= FSI.ich || axis == "width" && (FSI.iw*FSI.maxUpscale) <= FSI.icw ) { 
							FSI.rasterContainer.show();
						} else {
							FSI.rasterContainer.hide();
						}
					}
					
					if ( FSI.windowRatio > FSI.iRatio ) { 
						// if we have a widescreen 
						var calcWidth = FSI.ww,
							calcHeight = FSI.ww/FSI.iRatio;

							FSI.icw = calcWidth;
							FSI.ich = calcHeight;

							pos();
							if ( o.showRaster ) { 
							raster('width');	 
							}

					} else {
						// 4:3 or small width window with tall height 
						var calcHeight = FSI.wh,
							calcWidth = FSI.wh*FSI.iRatio;

							FSI.icw = calcWidth;
							FSI.ich = calcHeight;

							pos();
							if ( o.showRaster ) { 
							raster('height');
							}	
					}
				}
				fullscreenimage();
				$(window).resize(fullscreenimage);
				
				

			});
		}
	});
	
})(jQuery);