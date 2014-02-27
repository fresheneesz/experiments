var fs = require("fs");
var Fiber = require('fibers');
var Future = require('fibers/future');
var sleep = require('sleep').sleep;
var log = require('utils').log;
var domain = require('domain');

var mainD = require('domain').create();
mainD.on('error', function(err) {
    log("Uncaught Exception from fiber!", err);
});

var tri = function(tryFn, catchOptions) {
	var runFn = function() {
		if(catchOptions.acatch) {
			var d = domain.create();
			d.on('error', function(err) {
			   catchOptions.acatch(err);
			});
			d.run(function() {
				tryFn();
			});
		} else {
			tryFn();	
		}
	};	
	
	if(catchOptions['catch']) {
		try {
			runFn();
		} catch(e) {
			catchOptions['catch'](e);	
		}
	} else {
		runFn();
	}
}; 	// wraps a callback so thrown errors get passed to the future
	tri.wrap = function(future, fn) {
		return function() {
			try {
				fn();
			} catch(e) {
				future.throw(e);	
			}
		};
	};


mainD.run(function() {Fiber(function() {
	
	var d = require('domain').create();
	d.on('error', function(err) {
	    log("Uncaught exception!", err);
	    //process.exit(1); // dying is the only safe thing to do here
	});
	
	// synchronous exception
	try {
		d.run(function() {
			log("SE1");
			throw Error("SE2"); 
			
		});
	} catch(e) {
		log("synchronous exception 1: "+e);	// note that the domain does *not* also catch the exception - only caught in once place
	}
	
	// asynchronous exception
	try {
		var asDomain = require('domain').create();
		asDomain.on('error', function(err) {
		    log("Asynchronous exception: "+ err);
		    //process.exit(1); // dying is the only safe thing to do here
		});
		asDomain.run(function() {
			fs.readFile("test.txt", function(err, data) {
				if(err) log("readFile err: "+err);
				else 	log("readFile data: "+data);
				
				throw Error("whatever");
			});
		});
	} catch(e) {
		log("Asynchronous Exception: "+e);	// doesn't happen
	}
	
	log("");
	
	// asynchronous exception where you don't wait for result - fire and forget
	var d2 = domain.create();
	d2.on('error', function(err) {
	    log("That thing you forgot about failed: "+ err);
	});
	d2.run(function() {
		setTimeout((function() {
			throw new Error("forget THIS");	
		}), 0);
	});
		    
		
	// asynchronous exception where you always wait for the result
	var future1 = new Future;
	setTimeout((function() {
		try {
			throw new Error("wait for me");	
		} catch(e) {
			future1.throw(e); // what happens if the future is thrown but never waited on or detatched? To close this loop, there needs to be something that detaches all futures before the program quits
		}
	}), 0);
	
	try {
		future1.wait();
	} catch(e) {
		log("Asynchronous exception, always wait: "+e);
	}
	
	
	// asynchronous exception where you sometimes wait for the result
	var d2 = domain.create();
	d2.on('error', function(err) {
	    log("Did you forget about this?: "+ err);
	});
	var future2 = new Future;
	d2.run(function() {
		setTimeout((function() {
			try {
				throw new Error("wait for me?");	
			} catch(e) {
				future2.throw(e);
			}
		}), 0);
	});
	
	try {
		if(false) {
			future2.wait();
		} else {
			future2.detach(); // ideally, detatch would *always* cause the future.throw to throw the error, but unfortunately it allows the detatch call itself to sometimes throw the error if its called after the future has resolved
		}	
	} catch(e) {
		log("Asynchronous exception, sometimes wait: "+e);
	}
	
	Future.wait(future1, future2);
	log("");
	
		// Again using tri
	
	// asynchronous exception where you don't wait for result - fire and forget
	tri(function() {
		setTimeout((function() {
			throw new Error("forget THIS");	
		}), 0);
	}, {
	acatch: function(err) {
		log("That thing you forgot about failed: "+ err);	
	}});
		    
		
	// asynchronous exception where you always wait for the result
	future1 = new Future;
	setTimeout(tri.wrap(future1, function() {
		throw new Error("wait for me");	
	}), 0);
	
	try {
		future1.wait();
	} catch(e) {
		log("Asynchronous exception, always wait: "+e);
	}
	
	
	// asynchronous exception where you sometimes wait for the result
	future2 = new Future;
	tri(function() {
		setTimeout(tri.wrap(future2, function() {
			throw new Error("wait for me?");	
		}), 0);
	}, {
	acatch: function(err) {
		log("Did you forget about this?: "+ err);
	}});
	
	try {
		if(false) {
			future2.wait();
		} else {
			future2.detach(); // ideally, detatch would *always* cause the future.throw to throw the error, but unfortunately it allows the detatch call itself to sometimes throw the error if its called after the future has resolved
		}	
	} catch(e) {
		log("Asynchronous exception, sometimes wait: "+e);
	}

    var d2 = domain.create();
	d2.on('error', function(err) {
	    log("Did you forget about this?: "+ err);
	});
	var future2 = new Future;
	d2.run(function() {
		setTimeout((function() {
			try {
				throw new Error("wait for me?");
			} catch(e) {
				future2.throw(e);
			}
		}), 0);
	});

    var dA = domain.create();
    dA.on('error', function(err) {
	    console.log("dA: "+ err);
	});
    dA.run(function() {
	    var dB = domain.create();
        dB.on('error', function(err) {
            console.log('dB')
            setTimeout(function() {
                throw err
            }, 0)
        });
        dB.run(function() {
            setTimeout(function() {
                throw 'moo'
            },0)
        });
	});

	
}).run()});
