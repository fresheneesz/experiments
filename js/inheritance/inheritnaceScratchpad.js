// create
var Pirate = proto(function() {
	this.maxLegs = 2	// don't bother with static variables, just prototype variables

	// constructor
	this.construct = function(name, legs) {
		this.name = name
		this.legs = legs	
	}
	
	this.eat = function() {
		this.legs += 1
		this.static.maxLegs = 1
	}	
})

// subclass
var Captain = proto(Pirate, More, function() {
	this.construct = function(name, legs) {
		Pirate.construct.call(this, name, 1)
		More.call(this, legs)
	}	
	
	this.eyepatch = true
})

// multiple inheritance
var FirstMate = proto(Pirate, Captain, function() {
	this.construct = function(name, legs) {
		Pirate.call(this, name, legs)
		More.call(this, 6)
	}	
	
	this.eyepatch = true
})

// check instance of

proto.isa(x, FirstMate) // probably not


	
// create	
var Pirate = Class.$extend({
	__classvars__ : { // static (class) variables
		maxLegs: 2
	},	
	__init__: function(name, legs) { // constructor
		this.name = name
		this.legs = legs
	},
	
	eat: function() {		// method
		this.legs += 1	
		Pirate.maxLegs += 1
	}
}

// subclass
var Captain = Pirate.$extend({
	__init__: function(name, legs) {
		// always 1
		this.$super(name, 1)  // calling superclass methods
		this.eyepatch = true
	}
		
})



var Pirate = proto(function(static) {
	
}