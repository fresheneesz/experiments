$(function() {
	var futures = []
    var countAsserts = 0
    var expectedAsserts = 0
	var Future = jQuery.Deferred
	t = {ok: function(v) { console.log(v) }}
	
	var f = new Future()
    f.resolve(5)
    f.then(function(v) {
        t.ok(v===5)  // return before
        countAsserts++
    }).done()

    var f2 = new Future()
    f2.then(function(v) {
        t.ok(v===6)  // return after
        countAsserts++
    }).done()
    f2.resolve(6)

    futures.push(f)
    futures.push(f2)

    expectedAsserts += 2

    var f3

        f3 = new Future()
        f3.reject(Error("test1"))
        f3.then(function(v) {
            t.ok(false) // should never happen
        }).fail(function(e) {
            t.ok(e.message === "test1") // throw before
            countAsserts++
        }).done()

        var f4 = new Future()
        f4.then(function(v) {
            t.ok(false) // should never happen
        }).fail(function(e) {
            t.ok(e.message === "test2")  // throw after
            countAsserts++
        }).done()
        f4.reject(Error("test2"))

        var f4 = new Future()
        f4.then(function(v) {
            //throw Error("NOT OK")
        }).fail(function(e) {
            //t.ok(e.message === 'NOT OK') // Throw inside then
            countAsserts++
        }).done()
        f4.resolve("ok?")

        var f4 = new Future()
        f4.fail(function(e) {
            //throw "noooo"
        }).fail(function(e) {
            //t.ok(e === 'noooo') // Throw inside catch
            countAsserts++
        }).done()
        f4.reject("blah")

        var f4 = new Future()
        f4.always(function(e) {
            //throw "nooootAgaaaaaaiin"
        }).fail(function(e) {
            t.ok(e === 'nooootAgaaaaaaiin') // Throw inside finally
            countAsserts++
        }).done()
        f4.reject("blah")



        expectedAsserts += 6
        futures.push(f3)
        futures.push(f4)


        var fs = [new Future, new Future, new Future]
        fs[0].then(function(v) {
            t.ok(v === 0)
            countAsserts++
            fs[1].resolve(1)
            return fs[1]      // resolved before
        }).then(function(v) {
            t.ok(v === 1) // Chained after
            countAsserts++
            return fs[2]      // resolved after
        }).then(function(v) {
            t.ok(v === 2)
            countAsserts++ // Chained before
        }).done()
        fs[0].resolve(0)
        fs[2].resolve(2)

        futures = futures.concat(fs)

        expectedAsserts += 3


        $.when(f,f2).then(function(v1, v2){
            t.ok(v1 === 5) // ALL After Success
            t.ok(v2 === 6)
            countAsserts+=2
        }).done()

        $.when(f,f2,f3).then(function(v){
            t.ok(false) // should never happen
        }).fail(function(e) {
            t.ok(e.message === 'test1') // ALL After Error
            countAsserts++
        }).done()

        var f5 = new Future()
        var f6 = new Future()
        $.when(f5, f6).then(function(v1, v2){
            t.ok(v1 === 'Ya') // ALL Before Success
            t.ok(v2 === 'ok')
            countAsserts+=2
        }).done()
        f5.resolve("Ya")
        f6.resolve("ok")

        var f7 = new Future()
        var f8 = new Future()
        $.when(f7, f8).then(function(v){
            t.ok(false)// Shouldn't happen
        }).fail(function(e) {
            t.ok(e.message === 'err') // ALL Before error
            countAsserts++
        })
        f7.resolve("Ya")
        f8.reject(Error("err"))

        futures.push(f6)
        futures.push(f7)
        futures.push(f8)

        expectedAsserts += 6

        function asyncFn(cb) {
            cb(undefined, "hi")
        }
        function asyncException(cb) {
            cb(Error("callbackException"))
        }

        // resolver

        /*var f9 = new Future
        asyncFn(f9.resolver())
        f9.then(function(x) {
            t.ok(x === 'hi')
            countAsserts++
        })
        futures.push(f9)

        var f10 = new Future
        asyncException(f10.resolver())
        f10.fail(function(e) {
            t.ok(e.message === 'callbackException')
            countAsserts++
        })
        futures.push(f10)

        // wrap

        var f11 = Future.wrap(asyncFn)()
        f11.then(function(x) {
            t.ok(x === 'hi')
            countAsserts++
        })
        futures.push(f11)

        var f12 = Future.wrap(asyncException)()
        f12.fail(function(e) {
            t.ok(e.message === 'callbackException')
            countAsserts++
        })
        futures.push(f12)

        expectedAsserts += 4*/
      /*

    // longtraces
    q.longStackSupport = true;
    q.call(function() {
        throw Error("test")
    }).catch(function(e) {
        console.log(e.stack)
    }).fin(function() {
        console.log("finally!")
    })
          */

    var x = $.when(futures)
    futures.push(x)
    x.always(function() {
        //t.equal(countAsserts, expectedAsserts)
    })
})