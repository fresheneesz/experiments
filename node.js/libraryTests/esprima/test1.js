var esprima = require('esprima');
var fs = require('fs')

var program = fs.readFileSync("program2.js")
console.log(JSON.stringify(esprima.parse(program), null, 4));