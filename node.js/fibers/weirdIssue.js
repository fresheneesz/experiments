var Fiber = require('./node-fibers/fibers');
var Future = require('./node-fibers/future');
var utils = require('./weirdIssueHelper');

new Fiber(function() {
    utils.log("fe");
    utils.log(utils.exec("forever git/main.js").wait());
    utils.log("what");
}).run();
