if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(function(require) {
    var dep = require('testModule.node.js');

    //The value returned from the function is
    //used as the module export visible to Node.
    return function () { 
		return dep.color
	};
});