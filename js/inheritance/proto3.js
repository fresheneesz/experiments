"use strict";

/*  usage:
    var Parent = proto(object, function() {
        this.make           // sets constructor
        this.anythingElse   // sets class methods/properties (on the prototype)
    })

    // inherit from a proto-created class (or any object that has the __proto__ property
    var Dad = proto(Parent, function() {
        Parent.call(this,arguments) // super-class method call
    })

    // create instance
    var x = new Dad()

    // note: instanceof doesn't work for these
    // note2: you can't access the 'name' property from parent classes (the Function.name property gets in the way),
    //   though the name property will work correctly on objects
*/
function proto() {
	if(arguments.length == 1) {
		var parent = {}
		var constructor = arguments[0]

	} else { // length == 2
		var parent = arguments[0]
		var constructor = arguments[1]
	}

    constructor.prototype = {}

	// add parent prototype properties
	for(var n in parent) {
        prototype[n] = parent.prototype[n]
	}

	// add reference to the returned object factory
    prototype.self = result;

    return result;
}

