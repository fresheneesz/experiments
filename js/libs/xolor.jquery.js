// Requires xcolor.jquery.js
//			proto.js

var xolor = proto({
	make: function(c) {
		if( typeof c !== 'string' && c.length !== undefined) {  // if c is an array (if its not a string and it has a length)
			var xolorList = [];
			for(n in c) {
				xolorList.push(xolor(c[n]));	
			}		
			return xolorList;
		} else {
			this.xc = $.xcolor.lighten(c, 0, 0); // just a way to get the xcolor object
		}
	},
		
	// level should be a number from 0 to 1 describing how far from the calling color you want to calculate the color
	gradientlevel: function(color, level) {
		return xolor($.xcolor.gradientlevel(this.xc, color, level*1000, 1000));
	},
	
	
	// brightens (or darkens) the color
	// level should be a value from 0 to 255
	lighten: function(level) {
		var roundedLevel = Math.round(level); // must be a bug in xcolor - it treats fractions strangely
		return xolor($.xcolor.lighten(this.xc, roundedLevel, 1));
	},
	
	// should take a value where .1 represents 10%
	relLighten: function(ratio) {
		return this.lighten(this.lightness()*ratio);
	},
	
	// 0 arguments gives you the level of lightness a current color has - a value from 0 to 255
	// 1 arguments changes the lightness level
	// level is a value from 0 to 255
	lightness: function (level) {
		if(level === undefined) {
			var c = this.xc;
			return Math.max(c.g,c.r,c.b);
		} else {
			return this.lighten(level - this.lightness());
		}
	},
	// changes the lightness level based on a ratio of the current lightness
	// e.g. .5 darkens by 50% and 1.5 lightens by 50%
	relLightness: function (ratio) {
		return this.lightness(this.lightness()*ratio);
	},
	
	breed: function(x) {
		return xolor($.xcolor.breed(this.xc, x.xc));	
	},
	
	static: {
		rand: function() {
			return xolor($.xcolor.random());
		}
	}
});

(function($) {
	var passthroughFuncs = function(functionNameMap) {
		for(key in functionNameMap) { var func = functionNameMap[key];
			xolor.prototype[key] = function() {
				return this.xc[func].apply(this.xc,arguments);
			};
		}		
	};
	
	passthroughFuncs({css:'getCSS', rgb:'getRGB', hsv:'getHSV',  int:'getInt',  
						array:'getArray',  frac:'getFraction', 
						 name:'getName',  hex:'getHex'});
	
	var objectOrientateXcolorFunction = function(functionName, xolorize) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			var result = $.xcolor[functionName].apply(this, [this.xc].concat(args));
			if(xolorize) return xolor(result);
			// else
			return result;
		};
	};
	
	// if xolorize is set to true, the results of each function will be used as a constructor argument to xolor before being returned
	var addObjectOrientedXcolorFuncs = function(xolorize, functionNameMap) {
		for(key in functionNameMap) { var func = functionNameMap[key];
			xolor.prototype[key] = objectOrientateXcolorFunction(func, xolorize);
		}	
	};
	
	addObjectOrientedXcolorFuncs(true, {
		red: 'red',
		green: 'green',
		blue: 'blue',
		sepia: 'sepia',
		greyfilter: 'greyfilter',
		comp: 'complementary',
		web: 'webround',
		opacity: 'opacity',
		combine: 'xor',
		add: 'additive',
		sub: 'subtractive',
		mult: 'multiply',
		avg: 'average',
		//breed: 'breed',
		triad: 'triad',
		tetrad: 'tetrad',
		analogs: 'analogous',
		monochromes: 'monochromatic',
		splitcomp: 'splitcomplement'
	});
	
	addObjectOrientedXcolorFuncs(false, {
		dist: 'distance',
		readable: 'readable'
	});

	var oldIsReadable = $.fn.isReadable, oldColorize = $.fn.colorize;
	$.fn.isReadable = function() {
		oldIsReadable.apply(this, arguments);
	};
	$.fn.colorize = function(from,to,method) {
		oldColorize.call(this, xolor(from), xolor(to), method);
	};
	
	// changes how each of these attributes work in the jQuery.css method
	// note that xcolor also has handles for jQuery.fx, but I didn't care enough to duplicate that mess
	$.each(['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'outlineColor'], function(i, attr) {
		$.cssHooks[attr] = { "set": function(elem, value) {
			elem.style[attr] = xolor(value).css();
		}};
	});
})(jQuery);

/*
var xolor = function(c) {	
	if( typeof c !== 'string' && c.length !== undefined) {  // if c is an array (if its not a string and it has a length)
		var xolorList = [];
		for(n in c) {
			xolorList.push(xolor(c[n]));	
		}		
		return xolorList;
	}
	// else
	
	return new function() {
		var me=this;
		var xc = $.xcolor.lighten(c, 0, 0); // just a way to get the xcolor object
		
		me.xc = xc;
		
		
		
		var passthroughFuncs = function(functionNameMap) {
			for(key in functionNameMap) { var func = functionNameMap[key];
				me[key] = function() {
					return xc[func].apply(xc,arguments);
				};
			}		
		};
		
		passthroughFuncs({css:'getCSS', rgb:'getRGB', hsv:'getHSV',  int:'getInt',  
							array:'getArray',  frac:'getFraction', 
							 name:'getName',  hex:'getHex'});
		
		var objectOrientateXcolorFunction = function(functionName, xolorize) {
			return function() {
				var args = Array.prototype.slice.call(arguments);
				var result = $.xcolor[functionName].apply(me, [xc].concat(args));
				if(xolorize) return xolor(result);
				// else
				return result;
			};
		};
		
		// if xolorize is set to true, the results of each function will be used as a constructor argument to xolor before being returned
		var addObjectOrientedXcolorFuncs = function(xolorize, functionNameMap) {
			for(key in functionNameMap) { var func = functionNameMap[key];
				me[key] = objectOrientateXcolorFunction(func, xolorize);
			}	
		};
		
		addObjectOrientedXcolorFuncs(true, {
			red: 'red',
			green: 'green',
			blue: 'blue',
			sepia: 'sepia',
			greyfilter: 'greyfilter',
			comp: 'complementary',
			web: 'webround',
			opacity: 'opacity',
			combine: 'xor',
			add: 'additive',
			sub: 'subtractive',
			mult: 'multiply',
			avg: 'average',
			breed: 'breed',
			triad: 'triad',
			tetrad: 'tetrad',
			analogs: 'analogous',
			monochromes: 'monochromatic',
			splitcomp: 'splitcomplement'
		});
		
		addObjectOrientedXcolorFuncs(false, {
			dist: 'distance',
			readable: 'readable'
		});
		
		// level should be a number from 0 to 1 describing how far from the calling color you want to calculate the color
		me.gradientlevel = function(color, level) {
			return xolor($.xcolor.gradientlevel(xc, color, level*1000, 1000));
		};
		
		
		// brightens (or darkens) the color
		// level should be a value from 0 to 255
		me.lighten = function(level) {
			var roundedLevel = Math.round(level); // must be a bug in xcolor - it treats fractions strangely
			return xolor($.xcolor.lighten(me.xc, roundedLevel, 1));
		}
		
		// should take a value where .1 represents 10%
		me.relLighten = function(ratio) {
			return me.lighten(me.lightness()*ratio);
		}
		
		// 0 arguments gives you the level of lightness a current color has - a value from 0 to 255
		// 1 arguments changes the lightness level
		// level is a value from 0 to 255
		me.lightness = function (level) {
			if(level === undefined) {
				var c = me.xc;
				return Math.max(c.g,c.r,c.b);
			} else {
				return me.lighten(level - me.lightness());
			}
		}
		// changes the lightness level based on a ratio of the current lightness
		// e.g. .5 darkens by 50% and 1.5 lightens by 50%
		me.relLightness = function (ratio) {
			return me.lightness(me.lightness()*ratio);
		}
		
	};
}

	xolor.rand = function() {
		return xolor($.xcolor.random());
	}
*/