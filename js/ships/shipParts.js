


var Ship = proto({ mix: [Drawable],
	make: function(p,rot, size) {
		Drawable.make(this, p, rot);
		
		this.size = size;
		this.color = xolor('red');
		this.subShips = [];
		
		// private members
			
		this.weapons = [];
		this.targets = [];
		
	},
		
	// public methods
		
	draw: function(view) {
		// draw targets
		for(n in this.targets) {
			view.rect({
				fillStyle: "red",
				p: this.targets[n],
				width:4, height:4
			});
		}
	},
	
	addWeapon: function (w) {
		this.weapons.push(w);
		this.add(w);	
		for(n in this.targets) {
			w.target(this.targets[n]);
		}	
	},
	
	target: function(p) {
		this.targets.push(p);
		for(n in this.weapons) {
			this.weapons[n].target(p);	
		}	
		for(n in this.subShips) {
			this.subShips[n].target(p);
		}
	},
	
	addShip: function(ship) {
		this.subShips.push(ship);	
		for(n in this.targets) {
			ship.target(targets[n]);
		}
	}
});


var Fighter = proto({ mix: [Ship],
	make: function(p,rot, size, mainColor) {
		Ship.make(this, p,rot, size);
		
		var colorA = mainColor, colorB = colorA.comp(); 
		colors = [colorA, colorB, colorB];
		var lines = [];
		for(var n=0; n<3; n++) {
			var distanceFromCenter = size*5;
			var lineWidth = size*5;
			var rotation = n*120;
			
			var line = 	Line(point(0,-distanceFromCenter),0, size,lineWidth, colors[n]);
				line.rotateAround(point(0,0), rotation);
			
			this.add(line);
			lines.push(line);
			
			//color = color.add('#004488');
		}
		
		var weapon = Weapon(point(20,20),0, 500,2000,210, size, xolor.rand().lighten(80));
			this.addWeapon(weapon);
			weapon.p(lines[1].start());
		
		weapon = Weapon(point(20,20),0, 500,2000,210, size, xolor('red').lighten(80));
			this.addWeapon(weapon);
			weapon.p(lines[2].end());
		
	}
});

var Station = proto({ mix: [Ship],
	make: function(p,rot, size, type) {
		if(type === undefined) {//type = 'normal'
			var distanceFromCenter = size*14;
		} else {
			var	distanceFromCenter = size*3;
		}
		
		Ship.make(this, p,rot, size);
		
		this.selected = false;
		
		var n=0;	
		for(var n=0; n<6; n++) {
			var rotation = 30+n*60;
			var secondaryRotation = 0;
			if(type === 'alien') {
				var secondaryRotation = rotation;
			}
			
			var fighter = Fighter(point(0,distanceFromCenter),secondaryRotation, size, xolor('#199EC6').relLightness(.8));
				fighter.rotateAround(point(0,0), rotation);
			this.add(fighter);
			this.subShips.push(fighter);
		}
		
		this.radiusIn = this.subShips[0].weapons[0].p().dist(this.p());
	},
	
	intersects: function(p, view) {
		return this.p().dist(p) < this.radius();
	},
	radius: function() {
		return this.radiusIn; //this.size*21;	
	},
		
	extend: {
		update: function() {
			this.rotate(2);
		},
		
		draw: function(view) {
			if(this.selected) {
				view.arc({
					fillStyle: "#00ff00",
					p: this.p(),
					radius: this.radius()
				});
			}
			
			view.rect({
				fillStyle: "#00FFFF",
				p: this.p(),
				width:4, height:4			
			});
		}
	}
});

// duration and cooldown are in milliseconds
// color should be an xolor object
var Weapon = proto({ mix: [Drawable],
	make: function(p,rot, duration,cooldown,range, size,color) {
		Drawable.make(this, p, rot);
		
		// private members
		
		this.firingAt = false; 	// is false when it isn't firing
		this.msLeft; 			// the number of milliseconds left - only defined when firingAt is not false
		
		this.lastFired = new Date(0);
		this.cooldown = cooldown;
		this.range = range;
		this.duration = duration;
		this.color = color;
		this.size = size;
		
		this.targets = [];	
	},
	
	target: function(p) {
		this.targets.push(p);	
	},
	
	update: function() {
		var me = this;		
		
		var msSinceLastFired = function() {
			return (new Date()).getTime() - me.lastFired.getTime();
		}
		
		var fire = function() {	// draw a firing event
			me.msLeft = me.duration-msSinceLastFired();
			if(me.msLeft < 0) {
				me.firingAt = false;
				return;	
			}
		};
		
		if(this.firingAt) {
			fire();
		} else if(msSinceLastFired() > this.cooldown) { // can fire again
			for(n in this.targets) {
				if(this.p().dist(this.targets[n]) < this.range) { // target is in range
					this.firingAt = this.targets[n];
					this.lastFired = new Date();
					fire();
					break; // only shoot at once target at a time	
				}
			}
		}	
	},
	
	draw: function(view) {
		view.rect({
			fillStyle: "green",
			p: this.p(),
			width:4, height:4
		})
		
		if(this.firingAt) {
			view.line({
				strokeStyle: this.color.css(),
				strokeWidth: this.size*(this.msLeft/this.duration),
				p1: this.p(),
				p2: this.firingAt
			});
		}
	}
});

var Line = proto({ mix:[Drawable],
	make: function(p,rot, width,len,color) {
		Drawable.make(this, p, rot);
		
	    this.width = width;
	    this.len = len;
	    this.color = color;
	},
		
	draw: function(view) {		    
		var p = this.p();
	    var rot = this.r();
	
	    var lineFactorA = 2.5*this.width;
	
	    var start = this.start();
	    var p2 = p.add(this.getPointAngle(-lineFactorA/2, lineFactorA, rot));
	    var p3 = p.add(this.getPointAngle( lineFactorA/2, lineFactorA, rot));
	    var end = this.end();
	
		view.bezier({
			strokeStyle: this.color.css(),
			strokeWidth: this.width,
			
			s:start,
			c1: p2, c2: p3,
			e: end
		
		});
	},
	
	end: function() {
		return this.getEnd('end');
	},
	start: function() {
		return this.getEnd('start');
	},
    
    // private
    
    getEnd: function(side) {
		var lenFactor = this.len;
		if(side === 'start') lenFactor = -lenFactor;
		
		return this.p().add(this.getPointAngle(lenFactor,0,this.r()));
	},
	
	// what is this?
    getPointAngle: function(x,y,rot) {
	    var a = Math.atan2(y,x);
	    var len = Math.max(Math.abs(x),Math.abs(y));
	
	    rot *= Math.PI/180;
	    var rotDiff = a-rot;
	
	    return point(Math.cos(rotDiff)*len, Math.sin(rotDiff)*len);
	}
});
