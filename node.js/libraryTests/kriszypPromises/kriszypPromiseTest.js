var log = require('utils').log;
var domain = require('domain');
var KriszypPromise = require('kriszypPromise');

var Promise = KriszypPromise.Promise;
var defer = KriszypPromise.defer;

log("\n");
    
// single value
var p1 = new Promise;
process.nextTick(function() {
	p1.resolve("test");	
});
p1.then(function(x) {
	console.log(x);	
});

log("\n");

