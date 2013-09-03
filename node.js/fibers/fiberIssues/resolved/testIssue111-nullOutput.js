require('child_process')
var Fiber = require('./fibers')

new Fiber(function() {
  Fiber.yield();
}).run();