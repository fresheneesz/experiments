load.base = "/modules"
;(function() {
	var cache = {}
	
	GLOBALS.load = function() {
		if(arguments.length == 1) {
			var callback = arguments[0]
			var modules = getParamNames(callback)
			
		} else if(arguments.length == 2) {
			var callback = arguments[1]
			var modules = arguments[0]
			
		} else {
			throw new Error("Invalid number of arguments("+arguments.length+"), should be 1 or 2.")	
		}
		
		modules.forEach(function(module) {
			if(!cache[module]) 
				cache[module] = {requested: true, loaded: false}	
		})
		
		var modulesInfo = cache.filter(function(info, module) {
			modules.contains(module)
		})
		
		var allModulesRequested = modulesInfo.reduce(function(prev, cur) {
			return prev && cur.requested
		},true)
		
		if(!allModulesRequested) {
			// request the modules
		}
		
		// set it up so the callback is triggered either now or whenever all its dependencies load
		
		//require(modules, callback);
	}
})()


var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParamNames(func) {
    var funStr = func.toString();
    funStr = funStr.replace(STRIP_COMMENTS, '');
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

// usage

load(function(moduleA, moduleB, etc) {
	
}
// or
load(["module-with-dashs","aModuleWithTooLongOfAName", "otherModules"], function(moduleWithDashes, tooLong, otherModules) {
	
})