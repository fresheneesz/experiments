var log = require('utils').log;
var domain = require('domain');
var Fiber = require('fibers');
var Future = require('fibers/future');
var fs = require('fs');

var error = new Error;
Error.captureStackTrace(error, exports);
log(error.stack);
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
    
    
	// detatch future - for this to work properly, you need to get the future.js code from github as of (2013-0516)
	
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
	
	// exception (stack trace) tests
	
	try {
		var f = new Future;
		process.nextTick(function() {
			f.throw(new Error("test"));	
		});
		f.wait();
		
	} catch(e) {
		var baseStack = e.stack.split('\n');
		var cobbledTogetherStack = 
							e.stack.split('\n')
							.concat('    - - - - -')
							.concat(error.stack.split('\n').slice(1))
							.join('\n');
		
		log(cobbledTogetherStack);
	}
	
	
}).run();