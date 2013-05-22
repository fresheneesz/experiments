var A = proto({
	x:5
});

var a = A();
console.log(a.x);
		
var B = proto({mix:[A]});
var b = B();
console.log(b.x);

var C = proto({mix:[B],
	make: function(a) {
		this.a = a;
	}
});

var c = C(4);
console.log(c.x);
console.log(c.a);


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
		} else {
			newPrototypeProperties.prototype[k] = objectProperties[k];
		}
	}
	
	mergeIntoPrototype(newPrototypeProperties);
	
	if(constructor === null) {
		var mixins = objectProperties['mix'];
		if(mixins !== undefined) {
			for(var n = mixins.length-1; n>=0; n--) { // loop through mixins backwards
				if(mixins[n].constructoid !== undefined) {	 // apparently 'constructor' is some special member in javascript - was fucking up my shit
					constructor = mixins[n].constructoid;	// use one if its parents constructors
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
	}
	
	return resultConstructor;
	
	
	function mergeIntoPrototype(object) {
		for(n in object.prototype) {
			prototype[n] = object.prototype[n];
		}
	}
	
	function createConstructor(objConstructor) {
		function F(args) {
	        return objConstructor.apply(this, args);
	    }
	    F.prototype = objConstructor.prototype;
	    
	    return function() {
	        return new F(arguments);
	    };
	}
};