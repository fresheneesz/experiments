
// takes in an object that can have any of the following optional members:
	// make: creates a constructor for the proto class
	// mix: takes a list of objects and mixes in their prototypes
	// extend: a list of methods that extend their parent method
	// anything else adds members into the prototype directly (should only be used for functions and non-objects - other things should go in the constructor)
/* exmpale:
	var A = proto({x:5});
	var a = A();
	
	var B = proto({mix:[A],
		make: function(x) {
			this.x = x;
		},
		anotherMember: "hi"
	});
	
	var b = B(5);
	
	var C = proto({mix:[B],
		make: function(x,y) {
			B.make(this,x); // use parents constructor
			this.y = 7;
		}
	});
	
	var c = C(1)
	console.log(c.x);
	console.log(c.y);
//*/
function proto(objectProperties) {
	var prototype = {};
	var newPrototypeProperties = {};
		newPrototypeProperties.prototype = {};
	var constructor = null;
	for(k in objectProperties) {
		if(k === "make") {
			constructor = objectProperties[k];
		} else if(k === "mix") {
			for(n in objectProperties['mix']) {
				mergeIntoPrototype(objectProperties['mix'][n]);
			}
		} else if(k === "extend" || k === "static") {
			// do nothing yet - this is dealt with just below this
		} else {
			newPrototypeProperties.prototype[k] = objectProperties[k];
		}
	}
	
	if(objectProperties["extend"] !== undefined) {
		for(k in objectProperties['extend']) { 
			(function(newmethod, oldmethod) { // not sure why i have to put this here... it wasn't working when i just assigned to variables
				newPrototypeProperties.prototype[k] = function() {
					if(oldmethod !== undefined) {
						oldmethod.apply(this, arguments);	// call old method	
					}
					newmethod.apply(this, arguments);	// call new method
				};
			})(objectProperties['extend'][k], newPrototypeProperties[k]);
		}
	}	
	
	mergeIntoPrototype(newPrototypeProperties);
	
	if(constructor === null) {
		var mixins = objectProperties['mix'];
		if(mixins !== undefined) {
			for(var n = mixins.length-1; n>=0; n--) { // loop through mixins backwards
				if(mixins[n].constructoid !== undefined) {	 // apparently 'constructor' is some special member in javascript - was fucking up my shit
					// use one if its parents constructors
					constructor = mixins[n].constructoid; // todo: need to make this flexible and deterministic - its bad to just use a random parent constructor
				}
			}
		}
	}
	
	var emptyConstructor = false;
	if(constructor === null) { // still
		constructor = function(){ };	// empty contructor
		emptyConstructor = true;
	}
	
	constructor.prototype = prototype;
	var resultConstructor = createConstructor(constructor);
	resultConstructor.prototype = prototype;
	if( ! emptyConstructor) {
		resultConstructor.constructoid = constructor;
		
		resultConstructor.make = function(theThis) {
			var args = Array.prototype.slice.call(arguments);
			constructor.apply(theThis, args.slice(1));
		};
	}
	
	if(objectProperties["static"] !== undefined) {
		for(k in objectProperties["static"]) { 	
			resultConstructor[k] = objectProperties["static"][k];
		}
	}
	
	return resultConstructor;
	
	
	function mergeIntoPrototype(object) {
		for(n in object.prototype) {
			prototype[n] = object.prototype[n];
		}
	}
	
	function createConstructor(objConstructor) {
		return function() {
			var newObject = Object.create(objConstructor.prototype);
		    var returnValue = objConstructor.apply(newObject, arguments);
		    if(returnValue === undefined) 	return newObject;
		    else 							return returnValue;
	    };
	}
};