var fs = require('fs')
var browserify = require('browserify')

var stream = fs.createWriteStream("output.js")
browserify().add("./module.js").bundle().pipe(stream)

var stream2 = fs.createWriteStream("output2.js")
browserify().add("./module.js").bundle({standalone: "output2"}).pipe(stream2)

stream.on('close', function() {
    console.log("end")
})
stream2.on('close', function() {
    console.log("end")
})
