var redirect = require("./redirect.js"); 
var database = require("./database.js");
var Fiber = require('fibers');
var util = require('util')

exports.Redirect = redirect;
exports.Database = database;

exports.init = function() {
	Fiber(function() {	
		util.log("Stich systems init");
		database.init();
		redirect.init();
	}).run();
}
