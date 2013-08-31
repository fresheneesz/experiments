var q = require('q')

module.exports = Future
function Future(deffered) {
    this.resolved = false
    if(deffered)
        this.deferred = deffered
    else
        this.deferred = q.defer()
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

    return new Future({promise: q.all(args)})
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
    if(this.resolved) throw Error("Future resolved more than once! Return value: "+v)
    this.resolved = true
    this.deferred.resolve(v)
}
Future.prototype.throw = function(e) {
    if(this.resolved) throw Error("Future resolved more than once! Exception: "+e)
    this.resolved = true
    this.deferred.reject(e)
}

Future.prototype.then = function(cb) {
    return new Future({promise: this.deferred.promise.then(cb)})
}
Future.prototype.catch = function(cb) {
    return new Future({promise: this.deferred.promise.catch(cb)})
}
Future.prototype.finally = function(cb) {
    return new Future({promise: this.deferred.promise.finally(cb)})
}

Future.prototype.resolver = function() {
    var me = this

    return function(e,v) {
        if(e) { // error argument
            me.throw(e)
        } else {
            me.return(v)
        }
    }
}

Future.prototype.isResolved = function() {
    return !this.deferred.promise.isPending()
}





// test

var f = new Future()
f.return(5)
f.then(function(v) {
    console.log("After: "+v)
})

var f2 = new Future()
f2.then(function(v) {
    console.log("Before: "+v)
})
f2.return(6)

var f3 = new Future()
f3.throw(Error("test1"))
f3.then(function(v) {
    console.log("should never happen")
}).catch(function(e) {
    console.log("Throw after: "+e)
})

var f4 = new Future()
f4.then(function(v) {
    console.log("should never happen")
}).catch(function(e) {
    console.log("Throw before: "+e)
})
f4.throw(Error("test2"))

Future.all(f,f2).then(function(v){
    console.log("ALL After Success: "+v[0]+" "+v[1])
})

Future.all(f,f2,f3).then(function(v){
    console.log("should never happen")
}).catch(function(e) {
    console.log("ALL After Error: "+e)
})

var f5 = new Future()
var f6 = new Future()
Future.all(f5, f6).then(function(v){
    console.log("ALL Before Success: "+v[0]+" "+v[1])
})
f5.return("Ya")
f6.return("ok")

var f7 = new Future()
var f8 = new Future()
Future.all(f7, f8).then(function(v){
    console.log("ALL Before: "+v)
})
f7.return("Ya")
f8.throw(Error("err"))