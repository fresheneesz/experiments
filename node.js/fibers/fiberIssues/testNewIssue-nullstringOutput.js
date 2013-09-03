
var Fiber1 = require('./fibersCopy2/fibers.js');

console.log("here");
new Fiber1(function() {}).run();

var Fiber2 = require("./fibersCopy1/fibers.js");
new Fiber2(function() {		
    new Fiber1(function() {}).run();
}).run();