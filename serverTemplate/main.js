var http = require('http');
var Fiber = require('fibers');

require('utils');
var config = require('config');
var cache = require("cache");
var Stitch = require("./stitch/Stitch.js");

Stitch.init();

// basically does the same thing as process.on('uncaughtException'
// see http://nodejs.org/api/domain.html
var d = require('domain').create();
d.on('error', function(err) {
    console.log("Uncaught exception! Dying : (", err);
    process.exit(1); // dying is the only safe thing to do here
});

d.run(function() {
    http.createServer(function (req, res) {
        Fiber(function() {
            try {
                cache.reloadCaches();
                Stitch.Redirect.redirect(req,res);
                res.end();

            } catch(e) {
                console.log("Uncaught exception in request: "+e);
            }
        }).run();
    }).listen(config.port);
});
