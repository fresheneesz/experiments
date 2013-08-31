global.use = require('use')

// you can use commonJs require..
var amdModuleCommonJs = require("./amdModule")
console.log("This thing is: "+amdModuleCommonJs())

// .. or AMD-like style:
use(module, {0:"./amdModule"}, function(amdModule) {
	console.log("This thing is still: "+amdModule())
})

