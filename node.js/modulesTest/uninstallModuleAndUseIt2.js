// doesn't work! Probably because fiber is a C module
require('child_process').exec("npm install fibers", {}, function (error, stdout, stderr) {
   	var Fiber = require("fibers");
   	delete require.cache[require.resolve("fibers")];
   	
	require('child_process').exec("npm uninstall fibers", {}, function (error, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		console.log(error);
    	Fiber(function() {
			console.log("ok");
		}).run();
	}); 
});