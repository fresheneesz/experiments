// works!
require('child_process').exec("npm install moment", {}, function (error, stdout, stderr) {
   	var m = require("moment");   	
	require('child_process').exec("npm uninstall moment", {}, function (error, stdout, stderr) {
		console.log(m());
	}); 
});