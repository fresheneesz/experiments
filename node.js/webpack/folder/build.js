var webpack = require("webpack");
webpack({
    // configuration
    context: __dirname,
    entry: "./test",
    output: {
        path: __dirname,
        filename: "test.bundle"/*.[chunkhash]*/+".js",
        //,pathinfo: true // do not use this in production
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin(),    // minify
      new webpack.optimize.OccurenceOrderPlugin(/*preferEntry=*/true), // does .. something, and makes the entry chunk smaller (at the cost of making later chunks bigger)
      new webpack.optimize.DedupePlugin()       // removes duplicate files - even if they have no logical connection
    ]
    
}, function(err, stats) {
    if(err) {
        console.log("Can haz error: "+errorToString(err))
    } else {
        var jsonStats = stats.toJson();
            
        if(jsonStats.warnings.length > 0)    
            jsonStats.warnings.forEach(function(w) {
                console.log("Warning: "+w)
            })
            
        if(jsonStats.errors.length > 0)
            jsonStats.errors.forEach(function(e) {
                console.log(errorToString(e))
            })
        else 
            console.log('Success!')
    }
});

function errorToString(e) {
    if(e.stack) return e.stack
    else return e.toString()
}
