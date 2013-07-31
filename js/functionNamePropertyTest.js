

function proto(prototype) {
	return result
}

var prototype = function() {
	this.make = function(name) {
		this.name = name
	}
}

var Pirate = function() { 	// result object factory
	var x = new F()					// empty object
    Pirate.make.apply(x, arguments)	// populate object via the constructor
	return x
}

// run the prototype-building function on the resultant class-function to get an instantiated prototype object
prototype.call(Pirate)

// constructor for empty object which will be populated via the constructor
var F = function() {}

console.log("\n object")	
printDesciptors({})
console.log("\n functin")	
printDesciptors(function(){})
//console.log("\nnull")	
//printDesciptors(null) // non object
// printDesciptors(undefined) // non object
//console.log("\n number")	
// printDesciptors(5) // non object


var x = Pirate("moo")
console.log(x.name)


var A = function() {}
    A.prototype = function() {}
var x = new A()
x['name'] = "bob"
console.log("BOB: "+x.name)

Object.defineProperty( x, "name", {
    value: "bob"
});
console.log("BOB: "+x.name)

Object.defineProperty( prototype, "name", {
    value: "bob2"
});


console.log("BOB: "+prototype.name)      // still doesn't work on the prototype directly : (


function printDesciptors(v) {
	var keys = getAllPropertyNames(v)	
	keys.forEach(function(k) {
		console.log(k+":")	
		console.log(Object.getOwnPropertyDescriptor(v, k))	
	})
}

function getAllPropertyNames( obj ) {
    var props = [];

    do {
        Object.getOwnPropertyNames( obj ).forEach(function ( prop ) {
            if ( props.indexOf( prop ) === -1 ) {
                props.push( prop );
            }
        });
    } while ( obj = Object.getPrototypeOf( obj ) );

    return props;
}