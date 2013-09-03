// todo:
// * figure out how node.js will handle amd defines and requires
// * figure out how to convert commonJS files to AMD format (simple)
    // * figure out how r.js's conversion works (what it does when modules are required
// * figure out how to use one of the resource loaders to load scripts
// * figure out how to do better than r.js's conversion and preload top-level requires simultaneously
    // * also figure out how to do node.js-style require resolving, including browserfying node.js native libraries
// * do minification


load.base = "/modules"
;(function() {
	var cache = {}
	
	GLOBALS.load = function() {
		if(arguments.length == 1) {
			var callback = arguments[0]
			var modules = getParamNames(callback)
			
		} else if(arguments.length == 2) {
			var callback = arguments[1]
			var moduleAliases = getParamNames(callback)
			var moduleOverrides = arguments[0]
			
			var modules = []
			moduleAliases.forEach(function(alias, index) {
				if(moduleOverrides[alias] || moduleOverrides[index])
					if(moduleOverrides[alias] && moduleOverrides[index])
						throw Error("You can't override moduleName via its alias *and* index")
					else if(moduleOverrides[alias])
						modules.push(moduleOverrides[alias])
					else //if(moduleOverrides[index])
						modules.push(moduleOverrides[index])
				else
					modules.push(alias)
			})
			
		} else {
			throw Error("Invalid number of arguments("+arguments.length+"), should be 1 or 2.")	
		}

		var unrequestedModules = modules.filter(function(module) {
			return !(module in cache)
		})
		
		if(unrequestedModules.length > 0) {
            var alreadyRequestedModules = cache.keys() // todo: sort alphabetically (so the request can be cached more easily)
			requestModules(unrequestedModules, alreadyRequestedModules, callback)
		}
	}

    function requestModules(unrequestedModules, alreadyRequestedModules) {
		// set it up so the callback is triggered either now or whenever all its dependencies load
        // use code derived from requirejs/require.js (line 1819)
        // * req.load = function (context, moduleName, url) {
		
		

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
		
		// mark these modules as being requested
        unrequestedModules.forEach(function(module) {
            if(!cache[module])
                cache[module] = {loaded: false}
        })
    }
})()


var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParamNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '')
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g)
    if(result === null)
    	result = []

	return result
}



// usage

load(function(moduleA, moduleB, etc) {
	
})
// or with alias overrides (specify the real name of the alias)
load({moduleWithDashes: "module-with-dashs",tooLong:"aModuleWithTooLongOfAName"}], function(moduleWithDashes, tooLong, anOtherModule) {
	
})
// or with index overrides (specify the real name at a given function parameter index)
load({0: "module-with-dashs",1:"aModuleWithTooLongOfAName"}], function(moduleWithDashes, tooLong, anOtherModule) {
	
})