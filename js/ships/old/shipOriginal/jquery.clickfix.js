(function($) {
	var click = $.fn.click;
	$.fn.click = function() {
		var handlerIndex = 0;
		if(arguments.length == 2) {
			handlerIndex = 1;
		}
		
		var oldHandler = arguments[handlerIndex];
		arguments[handlerIndex] = function() {
			var args = arguments;
			var e = args[0];
			if(e.offsetX === undefined) {
				var elementsPageOffset = $(this).offset().left;
	    		var clicksPageOffset = e.pageX;
	    		args[0].offsetX = clicksPageOffset - elementsPageOffset;
	    		
				elementsPageOffset = $(this).offset().top;
	    		clicksPageOffset = e.pageY;
	    		args[0].offsetY = clicksPageOffset - elementsPageOffset;
	    	
			}
			
			oldHandler.apply(this, args);
		};
		
		
		click.apply(this, arguments);
	}	
})(jQuery);