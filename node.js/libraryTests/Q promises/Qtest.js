var q = require('q')
q.call = q.fcall

var f = q.call(function () {
    return 10;
});

f.then(function(v) {
    console.log(v)
}).catch(function(e) {
    console.log(e)
})

// working with callbacks

function asyncFn(cb) {
    cb(undefined, "hi")
}

var f4 = q.nfcall(asyncFn)
f4.then(function(v,v2) {
    console("callback: "+v+v2)
})

// chaining
q.call(function() {
    return 10
}).then(function(v) {
    return v+5
}).then(function(v) {
    return v+2
}).then(function(v) {
    console.log(v)
})

// combining
var f2 = q("moo")
var f3 = q("moo2")

q.all(f2, f3)

// exceptions
q.longStackSupport = true;
q.call(function() {
    throw Error("test")
}).catch(function(e) {
    console.log(e.stack)
    return 12
}).fin(function(v) { // i guess finally doesn't get an input - makes sense
    console.log("finally! "+v)
    return 13
}).then(function(v) {      // gets passed the value of last executed then or catch looks like
    console.log("And this again: "+v)
}).catch(function(e) {
    console.log("wut: "+e.stack)
})

// deferred

var d = q.defer()
d.promise.then(function(v) {
    console.log("defer this! "+v)
})
d.resolve("that")
d.resolve("that2")  // nothing happens...

var d2 = q.defer()
d2.promise.then(function(v) {
    console.log("this doesn't happen")
}).catch(function(e) {
    console.log("Deferred exception: "+e)
})
d2.reject(Error("defered test"))