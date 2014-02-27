var fs = require('fs')
var tar = require('tar-stream')

var pack = tar.pack()

// add a file called my-test.txt with the content "Hello World!"
pack.entry({ name: 'fake.txt' }, 'Hello World!', function() {
    console.log("test")
});

// add a file called my-test.txt with the content "Hello World!"
pack.entry({ name: 'fake.txt', type: 'directory' }, 'moo', function() {
    console.log("test")
});

/*
// add a file called my-stream-test.txt from a stream
var entry = pack.entry({ name: 'my-stream-test.txt' }, function(err) {
    console.log("test2")
});
fs.createReadStream('test.txt').pipe(entry);
*/


// add a directory
var entry2 = pack.entry({ name: 'directory', type: 'directory' }, function(err) {
    if(err) console.log("ERROR: "+err)
    console.log("test3")
    // the stream was added
    // no more entries
    pack.finalize();
});
fs.createReadStream('directory').pipe(entry2);

// pipe the pack stream somewhere
pack.pipe(process.stdout);