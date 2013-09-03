var detective = require('detective');
var fs = require('fs');

var src = fs.readFileSync('./analyzeThis.js');
var requires = detective.find(src);
console.dir(requires);