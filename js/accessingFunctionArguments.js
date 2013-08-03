var x = function(a,/*testing,f,g,h,*/b,c) {
	
}

console.log(x.toString())

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
function getParamNames(func) {
    var funStr = func.toString();
    funStr = funStr.replace(STRIP_COMMENTS, '');
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

console.log(getParamNames(x))
