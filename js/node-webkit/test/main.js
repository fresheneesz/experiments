console.log('test')
console.log('test')

var fs = require('fs')
var proto = require('proto')

console.log(fs.readdirSync('.'))

var Class = proto(function() {
	this.init = function(x) {
		this.x = x
	}	
	
	this.mate = function() {
		console.log(this.x)	
	}
})

var x = Class(5)
x.mate()

var extension = require('hello');
console.log(extension.hello());
/*
var Fiber = require('fibers')
var Future = require('fibers/future')

Fiber(function() {
	var f = new Future
	f.return(2)
	console.log(f.wait())
}).run()
*/
console.log('te')

var hello = require('hello')

hello()
