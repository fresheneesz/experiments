
var Fiber = require('fibers');

function moose() {
	Fiber(function() {
		console.log("happens first");
		console.log(new Error().stack);	
	}).run();
}

moose();

console.log("happens second");
