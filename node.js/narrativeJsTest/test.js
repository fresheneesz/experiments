var fs = require('fs');
var path = require('path');
var compiler = fs.readFileSync(path.resolve(__dirname, "narrative.js/deploy/njs_compile.js")).toString();
//console.log(compiler);
eval(compiler);
//eval(fs.readFileSync(path.resolve(__dirname, "narrative.js/deploy/njs_runtime.js")));

new NjsCompiler().compile("");


function assert(test, message) {
	if (test) {
		console.log("passed: " + message + "<br>");
	} else {
		console.log("FAILED: " + message + "<br>");
	}
}

var code = new NjsCompiler().compile(fs.readFileSync("test.njs"));
console.log(code);
eval(code);
runTests();