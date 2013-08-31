var analyzer = require('require-analyzer');
var util = require('util');

  var deps = analyzer.analyze({target: './analyzeThis.js', reduce: false}, function (err, pkgs) {
    if(err) console.log(err)
	console.log("packages: "+util.inspect(pkgs))
  });

  // The call the `.analyze()` returns an `EventEmitter` which outputs data at various stages of the analysis operation.
  deps.on('dependencies', function (raw) {
    console.log(raw); // Log the raw list of dependencies (no versions)
  });

  deps.on('search', function (pkgs) {
    // Log the results from the npm search operation with the current
    // active version for each dependency
    console.log(pkgs);
  });

  deps.on('reduce', function (reduced) {
    // Logs the dependencies after they have been cross-referenced with 
    // sibling dependencies. (i.e. if 'foo' requires 'bar', 'bar' will be removed).
    console.log(reduced);
  });