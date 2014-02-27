var fs = require("fs")

var files = fs.readdirSync('images/').reduce(function(acc, file) {
    return acc+'","'+file
}, '')

console.log('["'+files+'"]')