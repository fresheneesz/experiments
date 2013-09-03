var fs = require('fs')
var resolve = require('resolve');

function print(msg) {
    fs.writeSync(process.stdout.fd, msg+"\n");
}

 /*


resolve('doom', { basedir: __dirname+'/testFiles' }, function (err, res) {
    if (err) console.error(err)
    else console.log(res)
});

console.log("\nand\n")
*/

// resolving files without the filesystem!:


var fileManifest = {
    "H:\\billy's file\\code\\tests\\node.js\\libraryTests\\resolve\\whatgever\\node_modules\\doom.js": "",
    "H:\\billy's file\\code\\tests\\node.js\\libraryTests\\resolve\\whatgever\\node_modules\\x\\index.js": "",
    "H:\\billy's file\\code\\tests\\node.js\\libraryTests\\resolve\\whatgever\\node_modules\\y\\package.json": JSON.stringify({main: "y"}),
    "H:\\billy's file\\code\\tests\\node.js\\libraryTests\\resolve\\whatgever\\node_modules\\y\\y.js": ""
}


var readFile = function(file, cb) {
    //print("Read: "+file)

    if(file in fileManifest) {
        cb(undefined, fileManifest[file])
    } else {
        cb(Error("File not in manifest :("))
    }
}

var isFile = function (file, cb) {
    //print("Is: "+file)
    cb(undefined, file in fileManifest)
}



resolve('doom', { basedir: __dirname+'/whatgever', readFile:readFile, isFile: isFile }, function (err, res) {
    if (err) print(err.stack)
    else print("Resolved: "+res)
});

resolve('x', { basedir: __dirname+'/whatgever', readFile:readFile, isFile: isFile }, function (err, res) {
    if (err) print(err.stack)
    else print("Resolved: "+res)
});

resolve('y', { basedir: __dirname+'/whatgever', readFile:readFile, isFile: isFile }, function (err, res) {
    if (err) print(err.stack)
    else print("Resolved: "+res)
});
