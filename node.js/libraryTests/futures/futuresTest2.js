var log = require('utils').log;
var domain = require('domain');
var Fiber = require('fibers');
var Future = require('fibers/future');
var fs = require('fs');

function a() { return b(); }
function b() { return c(); }
function c() { return d(); }
var d = function() { 
	throw "ok";
}.future();

var someFunction2 = function() {
  var f = new Future;
  process.nextTick(function() { new Fiber(function() {
	f.throw(new Error("ko")); // whatever is undefined, as it was in your example :)
  }).run()});
  return f;
};

function x() { return y(); }
function y() { return z(); }
function z() { 
	//console.log(d().wait());		
	console.log(someFunction2().wait());
}

Fiber(function() {
	x();
}).run();

