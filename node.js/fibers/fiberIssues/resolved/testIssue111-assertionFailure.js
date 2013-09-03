require('child_process')
var Fiber = require('./fibers')

Fiber(function() {
  Fiber.yield();
}).run();

process.nextTick(function() {
});