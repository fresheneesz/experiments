// renaming test (would be needed for Trait conflict resolution)

function useName() {
	this.name += 1
}

var object = {
	rename: 5
}

var newObject = {
	get name() {			// note that in real Traits, this would have to be done dynamically
		return object.rename	// which requires javascript that isn't available in IE8 : (
	},
	set name(x) {
		object.rename = x
	}
}

useName.call(newObject)
console.log(object.rename); // success!!



// Triats:

var A = Trait({
	x: 5,
	do: function() {
		console.log("sum: " + (this.x+1))
		this.x ++ 
	}
})

var B = Trait({
	x: "moo",
	talk: function() {
		console.log(this.x)	
	}	
})

	// conflict resolution methods:
// A. renaming
	
var AB = Trait(A, Trait.rename(B, {x: "x2"}))

// B. deferring (let another trait override the property)

var AB = Trait(A, B.defer('x'))

	// instantiating

var a = A()

	// equivalency
	
TraitA.eq(TraitB) // true or false


	// implementation
	
function Trait() {
	var resultTrait = function() {}
	for(var n in arguments) {
		var arg = arguments[n]
			
	}
}

function merge(obj1, obj2) {
    for(var key in obj2){
       if(Object.hasOwnProperty.call(obj2, key))
          obj1[key] = obj2[key]
    }
}

