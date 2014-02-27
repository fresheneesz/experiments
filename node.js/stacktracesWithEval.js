var stackTrace = require('stack-trace')

stuff(function() {
	var backTrace = stackTrace.get()
	
	var stackPosition = backTrace[0]

    var info = {filename: stackPosition.getFileName(),
    			lineNumber: stackPosition.getLineNumber(),
    			column: stackPosition.getColumnNumber()
	}
	
	console.dir(info)
})


function stuff(fn) {
	console.log(fn.toString())
	eval("("+fn.toString()+")()")
}