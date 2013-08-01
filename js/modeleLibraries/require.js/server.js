var http = require('http');
var Fiber = require('fibers');

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
}).listen(config.port)
