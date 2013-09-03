var requirejs = require('requirejs'); // fails when the path has a single quote in it... : (
requirejs.config({nodeRequire: require});

requirejs(['testModule', 'agnosticModule'], function(test, agnostic) {
	console.log(test.color);			
	console.log(agnostic());			
});