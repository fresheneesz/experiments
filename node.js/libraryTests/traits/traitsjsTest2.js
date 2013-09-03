var Trait = require('traits').Trait

var Person = Trait({
	legs: 5,
	walk: function() {
		console.log("Walk: "+this.legs)
	}
})

var Pirate = Trait({
	legs: 1,
	grow: function() {
		console.log("Grow: "+this.legs)
	}
})

var Parrson = Trait.compose(Person, Trait.resolve({legs: 'thirdLeg'}, Pirate))

var x = Trait.create(Object.prototype, Parrson);

console.log(x.legs+' and '+x.thirdLeg)
x.walk()
console.log(x.legs+' and '+x.thirdLeg)
x.grow()
console.log(x.legs+' and '+x.thirdLeg)

var Paulson = Trait.compose(Parrson, Trait({
	food: Trait.required, 
	eat: function() {
		this.food -= 1	
	}
}))

var y = Trait.create({food: 50}, Paulson);

console.log(y.food)
y.eat()
console.log(y.food)

var Holder = Trait({
	can: 'beans',
	inventory: function() {
		return this.can // number of steps to build
	}
})

var Doer = Trait({
	can: function(action) {
		if(action === 'grow')
			return true
		else 
			return false
	},
	grow: function() {
		if(this.can('grow'))
			console.log("Growing...")
	}
})

var Person = Trait.compose(Holder, Trait.resolve({can: "canDo"},Doer))
var guy = Trait.create({}, Person);

console.log(guy.inventory())
guy.grow()


/*
// no function sharing : (

var points = new Array(10000);
for (var i = 0; i < points.length; i++) { 
	points[i] = Trait.create(Object.prototype, TPoint2D)
}


// function sharing : )

function Point2D(x,y) { 
	this.x = x; 
	this.y = y; 
}
Point2D.prototype = Object.create(Object.prototype, TPoint2D);
for(var i = 0; i < points.length; i++) { 
	points[i] = new Point2D(...); 
}
*/