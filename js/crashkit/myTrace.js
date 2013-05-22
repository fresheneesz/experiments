function myTrace(e) {
	if(e === undefined) {
		try {throw "cannedException";}catch(e){
			return myTrace(e);
		}
	} else {
		//alert(BrowserDetect.browser);
		if(BrowserDetect.browser === 'Firefox') {
			return myTrace.computeStackTraceFromFirefoxStackProp(e);//e.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');;	
		} else {
			return [e.stack];	
		}
	}
}

myTrace.computeStackTraceFromFirefoxStackProp = function(ex) {
    if (!ex.stack)
        return null;
        
    // In Firefox, ex.stack contains a stack trace as a string. Example value is:
    //
    // qqq("hi","hi","hi")@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.js:7
    // ("hi","hi","hi")@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.js:3
    // ppp("hi","hi","hi")@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.html#:17
    // ("hi","hi","hi")@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.html#:12
    // xxx("hi")@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.html#:8
    // onclick([object MouseEvent])@file:///Users/andreyvit/Projects/crashkit/javascript-client/sample.html#:1        
    
    var lineRE = /^\s*(?:(\w*)\(.*\))?@((?:file|http).*):(\d+)\s*$/i;
    var lines = ex.stack.split("\n");
    var stack = [];
    for(var i in lines) {
        var line = lines[i];
        if (lineRE.test(line)) {
            var element = {'url': RegExp.$2, 'func': RegExp.$1, 'line': RegExp.$3};
            //if (!element.func && element.line)	element.func = myTrace.guessFunctionName(element.url, element.line);
            //if (element.line)	element.context = myTrace.gatherContext(element.url, element.line);
            stack.push(element);
        }
    }
    if(!stack.length)
        return null; // ex.stack is defined, but cannot be parsed
    return stack;
};

myTrace.guessFunctionName = function(url, lineNo) {      
    var source = getSource(url);
    return myTrace.guessFunctionNameFromLines(lineNo, source);
};

myTrace.guessFunctionNameFromLines = function(lineNo, source) {
	var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/;
	var reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/;
	// Walk backwards from the first line in the function until we find the line which
	// matches the pattern above, which is the function definition
	var line = "";
	var maxLines = 10;
	for (var i = 0; i < maxLines; ++i) {
        line = source[lineNo-i] + line;
        if (line !== undefined)
        {
            var m = reGuessFunction.exec(line);
            if (m) {
                return m[1];
            } else {
                m = reFunctionArgNames.exec(line);
            } if (m && m[1]) {
                return m[1];
            }
        }
    }
    return "?";
};

myTrace.gatherContext = function(url, lineNo) {
    var source = getSource(url);
    var context = [], anyDefined = false;
    lineNo = lineNo - 1; // convert to int and to 0-based indexes
    for(var l = lineNo - 2; l <= lineNo + 2; l++) {
        var item = source[l];
        if (typeof item != "undefined")
            anyDefined = true;
        context.push(item);
    }
    return (anyDefined ? context : null);
};