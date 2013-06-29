var fs = require('fs');
var SourceMapIndexGenerator = require('source-map-index-generator');


var srcFile = 'original.js',
	destFile = 'compiled.js',
    coordmap = {0:89, 1:90, 2:91, 3:92, 4:93, 5:94, 6:95, 7:96, 8:97};

// Generate source map via SourceMapIndexGenerator
var generator = new SourceMapIndexGenerator({file:destFile});

// Add the index coordinate mapping
generator.addIndexMapping({
  src: srcFile,
  input: fs.readFileSync(srcFile).toString(),
  output: fs.readFileSync(destFile).toString(),
  map: coordmap
});

// Collect our source-map
fs.writeFileSync("original.sourcemap.json",generator.toString());