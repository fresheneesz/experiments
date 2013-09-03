
var Fiber1 = require('./node-fibers');

console.log("here");
new Fiber1(function() {}).run();

var Fiber2 = require("./node-fibers2");
new Fiber2(function() {		
    new Fiber1(function() {}).run();
    console.log("test");
}).run();