console.log('Starting test');
var Fiber = require('./fibers');

Fiber(function() {
    Fiber.yield();
}).run();
console.log('back in main');