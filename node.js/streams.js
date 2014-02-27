var fs = require('fs')

var x = fs.createReadStream('nonexistant.whatever')
var y = fs.createWriteStream('streamtestfile.txt')

x.on('end', function(e) {
    console.log('x end')
})
y.on('end', function(e) {
    console.log('y end')
})
x.on('error', function(e) {
    console.log(e)
})

x.pipe(y)