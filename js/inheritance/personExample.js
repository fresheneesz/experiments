function Person(numberLegs, numberArms) {
	this.heads = 1;
	this.legs = numberLegs;
	this.arms = numberArms;	
}

Person.prototype = {
	getCaughtInBearTrap: function() {
		this.legs = this.legs-1;	
	},
	
	numberLimbs: function() {
		return this.arms + this.legs;
	}
}

function Girl() {
	Person.apply(this, arguments)
}

Girl.prototype = new Person()
Girl.prototype.haveBaby = function() {
	return new Person(2,2)
}


var p = new Person(2, 2);
testPerson(p);

console.log()

var g = new Girl(2, 2);
testPerson(g);

console.log()

var baby = g.haveBaby()
testPerson(baby);


function testPerson(p) {	
	console.log("p has "+p.legs+" legs") // p has 2 legs
	p.getCaughtInBearTrap();
	console.log("p has "+p.legs+" legs") // p has 1 legs
	
	console.log("p has "+p.numberLimbs()+" limbs")		
}


/*class Person {
 public:
	int legs;
	int arms;
	int heads;
	
	Person(int numberLegs, int numberArms) {
		heads = 1;
		legs = nnumberLegs;
		arms = numberArms;
	}
	
	void getCaughtInBearTrap() {
		legs = legs-1;	
	}
	
	int numberLimbs() {
		return arms + legs;
	}
}	

class Girl inherits Person {
 public:
	Person haveBaby() {
		return new person(2,2)
	}		
}

void testPerson(Person p) {	
	print("p has "p.legs" legs") // p has 2 legs
	p.getCaughtInBearTrap();
	print("p has "p.legs" legs") // p has 1 legs
	
	print("p has "p.numberLimbs()" limbs")		
}

main() {
	Person p = new Person(2, 2);
	testPerson(p);
	
	Person g = new Girl(2, 2);
	testPerson(g);
}

*/