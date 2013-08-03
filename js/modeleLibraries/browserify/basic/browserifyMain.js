var browserify = require('browserify');
var fs = require('fs')

var b = browserify();
b.add('./main.js');

var file = fs.createWriteStream('bundle.js')

b.bundle().pipe(file);