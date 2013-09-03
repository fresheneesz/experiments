function Future() {
    this.resolved = false
    this.queue = []
}

// static methods

// takes either a bunch of futures, or a single array of futures
// returns a promise that resolves when all futures resolve
// either returns when one of them error, or when all of them succeeds
Future.all = function() {
    if(arguments[0] instanceof Array) {
        var args = arguments[0]
    } else {
        var args = arguments
    }

    var f = new Future()

    var count = args.length // will be decremented down to 0
    var results = []

    for(var n=0; n<args.length; n++) {
        var index = n // capture n for use in the callback
        args[n].wait(function(e,v) {
            if(!f.resolved) {
                if(e)
                    f.throw(e)
                else {
                    count--
                    results[index] = v
                    if(count === 0) {
                        f.return(results)
                    }
                }
            }
        })
    }

    return f
}

// either used like futureWrap(function(){ ... })(arg1,arg2,etc) or
//  futureWrap(object, 'methodName')(arg1,arg2,etc)
Future.wrap = function() {
    // function
    if(arguments.length === 1) {
        var fn = arguments[0]
        var object = undefined

    // object, function
    } else {
        var object = arguments[0]
        var fn = object[arguments[1]]
    }

	return function() {
		var args = Array.prototype.slice.call(arguments)
		var future = new Future
		args.push(future.resolver())
		var me = this
        if(object) me = object
        fn.apply(me, args)
		return future
	}
}

// instance methods

// returns a value for the future (can only be executed once)
// if there are callbacks waiting on this value, they are run in the next tick
    // (ie they aren't run immediately, allowing the current thread of execution to complete)
Future.prototype.return = function(v) {
    resolve(this, false, v)
}
Future.prototype.throw = function(e) {
    resolve(this, true, e)
}
Future.prototype.wait = function(errback) {
    if(this.resolved) {
        executeCallbacks(this, [errback])
    } else {
        this.queue.push(errback)
    }
}


function resolve(theThis, isError, value) {
    if(theThis.resolved)
        throw Error("Future resolved more than once! Resolution: "+value)

    theThis.resolved = true
    theThis.hasError = isError
    if(isError)
        theThis.error = value
    else
        theThis.result = value

    executeCallbacks(theThis, theThis.queue)
}

function executeCallbacks(theThis, callbacks) {
    setTimeout(function() {   // basically process.nextTick
        if(theThis.hasError)
            var args = [theThis.error]
        else
            var args = [undefined, theThis.result]

        callbacks.forEach(function(cb) {
            cb.apply(this, args)
        })
    },0)
}



// test

var f = new Future()
f.return(5)
f.wait(function(e,v) {
    console.log("After: "+v)
})

var f2 = new Future()
f2.wait(function(e,v) {
    console.log("Before: "+v)
})
f2.return(6)


var f3 = new Future()
f3.throw(Error("test1"))
f3.wait(function(e,v) {
    console.log("Throw after: "+e)
})

var f4 = new Future()
f4.wait(function(e,v) {
    console.log("Throw before: "+e)
})
f4.throw(Error("test2"))

Future.all(f,f2).wait(function(e,v){
    console.log("ALL After Success e: "+e+", v: "+v)
})

Future.all(f,f2,f3).wait(function(e,v){
    console.log("ALL After Error e: "+e+", v: "+v)
})

var f5 = new Future()
var f6 = new Future()
Future.all(f5, f6).wait(function(e,v){
    console.log("ALL Before Success e: "+e+", v: "+v)
})
f5.return("Ya")
f6.return("ok")

var f7 = new Future()
var f8 = new Future()
Future.all(f7, f8).wait(function(e,v){
    console.log("ALL Before Error e: "+e+", v: "+v)
})
f7.return("Ya")
f8.throw(Error("err"))



