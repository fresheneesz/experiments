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

		var unrequestedModules = modules.filter(function(module) {
			return !(module in cache)
		})
		
		if(unrequestedModules.length > 0) {
            var alreadyRequestedModules = cache.keys() // todo: sort alphabetically (so the request can be cached more easily)

			requestModules(unrequestedModules, alreadyRequestedModules)

            /* Meanwhile: on the sever...

                var cacheKey = JSON.stringify({modules: unrequestedModules, exclusions: alreadyRequestedModules})
                if(packageCache[cacheKey] === undefined) {
                    var packageCache[cacheKey] = createPackage(unrequestedModules, alreadyRequestedModules)
                }

                return packageCache[cacheKey] // return this as the http response

                function createPackage(unrequestedModules, alreadyRequestedModules) {
                    var package = ""
                    unrequestedModules.forEach(function(moduleName) {
                        var module = createModule(moduleName, alreadyRequestedModules)
                        package += minify(module) // a little optimization
                    })

                    return package
                }

                function createModule(module, exclusions) {
                    var file = fs.readFileSync(module)
                    if(hasRequires(file)) { // CommonJs format - needs conversion
                        convertCommonJsToAMD(file)

                    } else { // it must be an AMD module
                        return file
                    }
                }

                function convertCommonJsToAMD(file) {
                    // use r.js to convert files to AMD format

                    // see if you can use this for requires that require node.js builtin modules like path or util
                        //* https://github.com/alexgorbatchev/node-browser-builtin
                }

             */



            unrequestedModules.forEach(function(module) {
                if(!cache[module])
                    cache[module] = {loaded: false}
            })
		}
	}

    function requestModules(unrequestedModules, alreadyRequestedModules) {
		// set it up so the callback is triggered either now or whenever all its dependencies load
            // use code derived from requirejs/require.js (line 1819)
            // * req.load = function (context, moduleName, url) {
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
	
})
// or
load(["module-with-dashs","aModuleWithTooLongOfAName", "otherModules"], function(moduleWithDashes, tooLong, otherModules) {
	
})