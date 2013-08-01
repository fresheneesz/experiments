var m = require('./module')

var Object = {}
Object.prototype = {
    toString: function() {
        return "moo"
    }
}

var x = {}

console.log(x)
m()

