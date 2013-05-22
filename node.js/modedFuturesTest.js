var log = require('utils').log;
var domain = require('domain');
var Fiber = require('fibers');
var Future = require('./modedFutures');
var fs = require('fs');

Fiber(function() {
	
    log("\n");
    
	// normal return
	var future1 = new Future;
	setTimeout(function() {
        future1.return("test");
        log("hit anyway (1)");
    }, 10/*ms*/);
    
    log("resolved yet(1.0)?: "+future1.isResolved());
    
    log("[normal return]: "+future1.wait());
    log("resolved yet(1.1)?: "+future1.isResolved());
    
    log("\n");
    
	// throw error
	try {
		var future2 = new Future;
		setTimeout(function() {
	        future2.throw(new Error("test error 2")); // future.throw does not exit the function
	        log("hit anyway (2)");
	    }, 10/*ms*/);
	    
	    future2.wait();
	}catch(e) {
		log("[thrown error (2)]: "+e);
	}
    
    log("\n");
	
	// wrap future 1
	try {
		var future3 = new Future;
		fs.readFile("test.txt", future3.resolver());
	    
	    log("text loaded: "+future3.wait());
	}catch(e) {
		log("[thrown error (3)]: "+e);
	}
    
    log("\n");
    
    
	// detatch future before future.throw
	
	var d = domain.create();
	d.on('error', function(err) {
		log("[detach future domain error]: "+err);	
	});
	d.run(function() {
		try {
			var future4 = new Future;
			setTimeout(function() {
				future4.throw(new Error("test error 4")); // future.throw does not exit the function
		        log("hit anyway (4)");
		    }, 10);
		    
		    
		    future4.detach(); // note, detatch used to bolox things up (process.exit(1)) - it still hasthis behavior on the latest version on npm as of (2013-0516)
		    log("after detach");
		}catch(e) {
			log("Not hit "+e);
		}
	});
	
    log("\n");
    
	// detatch future after future.throw
	
	var d2 = domain.create();
	d2.on('error', function(err) {
		log("[detach future domain error (5)]: "+err);	
	});
	d2.run(function() {
		try {
			var future5 = new Future;
			setTimeout(function() {
				future5.throw(new Error("test error 5")); // future.throw does not exit the function
		        log("hit anyway (5)");
		    }, 10);
		    
		    Future.wait(future5);
		    
		    future5.detach(); // note, detatch used to bolox things up (process.exit(1)) - it still hasthis behavior on the latest version on npm as of (2013-0516)
		    log("after detach");
		}catch(e) {
			log("[thrown error (5)]: "+e);
		}
	});
	
	
    log("\n");
    
	// forget about future (not good practice)
	
	var d6 = domain.create();
	d6.on('error', function(err) {
		log("[detach future domain error (6)]: "+err);	
	});
	d6.run(function() {
		var future6 = new Future;
		setTimeout(function() {
			future6.throw(new Error("test error 6")); 
	    }, 10);
	    
	    // forget about future5
	});
	
	setTimeout(function() {
		// later...
		Future.forgottenErrors(function(e) {
			log("You forgot about this error: "+e);
		});
	}, 100);
	
}).run();