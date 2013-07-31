var Trait = require('traits').Trait

var TEquality = Trait({
	equals: Trait.required,
	differs: function(x) { 
		return !this.equals(x); 
	}
});

var TMagnitude = Trait.compose(TEquality, Trait({
  	smaller: Trait.required,
  	greater: function(x) { 
		return !this.smaller(x) && this.differs(x) 
	},
	between: function(min, max) {
    	return min.smaller(this) && this.smaller(max);
	}
}));

function TCircle(center, radius) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    Trait({
       center: center,
       radius: radius,
         area: function() { return Math.PI * this.radius * this.radius; },
       equals: function(c) { return c.center === this.center &&
                                    r.radius === this.radius },
      smaller: function(c) { return this.radius < c.radius }
  }));
}

function TColor(rgb) {
  return Trait.compose(TEquality, Trait({
    get rgb() { return rgb; },
    equals: function(col) { return col.rgb.equals(this.rgb); }
  }));
}

function TCircle(center, radius, rgb) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    TColor(rgb),
    Trait({
       center: center,
       radius: radius,
         area: function() { return Math.PI * this.radius * this.radius; },
       equals: function(c) { return c.center === this.center &&
                                    r.radius === this.radius },
      smaller: function(c) { return this.radius < c.radius }
  }));
}

function TCircle1(center, radius, rgb) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    Trait.resolve({ equals: 'equalColors' }, TColor(rgb)),
    Trait({
       center: center,
       radius: radius,
         area: function() { return Math.PI * this.radius * this.radius; },
       equals: function(c) { return c.center === this.center &&
                                    r.radius === this.radius },
      smaller: function(c) { return this.radius < c.radius }
  }));
}

function TCircle2(center, radius, rgb) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    Trait.resolve({ equals: undefined }, TColor(rgb)),
    Trait({
       center: center,
       radius: radius,
         area: function() { return Math.PI * this.radius * this.radius; },
       equals: function(c) { return c.center === this.center &&
                                    r.radius === this.radius },
      smaller: function(c) { return this.radius < c.radius }
  }));
}

function TCircle3(center, radius, rgb) {
  return Trait.compose(
    TMagnitude,
    TEquality,
    Trait.override(
      Trait({
         center: center,
         radius: radius,
           area: function() { return Math.PI * this.radius * this.radius; },
         equals: function(c) { return c.center === this.center &&
                                      r.radius === this.radius },
        smaller: function(c) { return this.radius < c.radius }
      }),
      TColor(rgb)));
}

try {
	Trait.create(Object.prototype, TCircle(5, 10, 0x101010));
} catch(e) {
	console.log(e) 
}

var x = Trait.create(Object.prototype, TCircle3(5, 10, 0x101010));

console.log(x.center)






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