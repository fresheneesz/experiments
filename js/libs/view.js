// uses jCanvas for its drawing functions, but replaces x,y with pairs [x,y]
var view = proto({
	make: function(width, height, fps) {
		this.canvas = $('<canvas width="'+width+'px" height="'+height+'px">'+
				'Your browser does not support HTML5 canvas.'+
			'</canvas>'
		);
		
		this.drawLoop(fps);
		this.clearBeforeDraw = true;
		
		// private members
	
		this.context = this.canvas[0].getContext("2d");
		this.drawables = [];
	},
		
	click: function(handler) {
		return this.canvas.click(function(event) {
			var p = point(event.offsetX,event.offsetY);
			handler.call(handler, p, event);
	    });
	},
		
	add: function(/*drawable1, ... */) {
		var args = Array.prototype.slice.call(arguments);
		for(var n in args) {
			this.drawables.push(args[n]);
		}
		return this;
	},
		
		// drawing functions
		
	line: function(options) {
		for(key in options) { // options can contain any number of points
			if(key[0] === 'p') {
				var number = key.slice(1);
				options[key].setXY(options, 'x'+number, 'y'+number);
			}
		}
		
		this.canvas.drawLine(options);
	},
		
	rect: function(options) {
		/*var ctx = this.context;
		
		ctx.beginPath();
		ctx.fillStyle = options.fillStyle;
		ctx.lineWidth = 1;
		ctx.rect(options.p.x, options.p.y, options.width, options.height);
		ctx.closePath();
		ctx.fill();
		*/
		options.p.setXY(options, 'x','y');	// p for point
		this.canvas.drawRect(options);
		return this; // for chaining
	},
		
		// uses pairs [x,y] instead of individual numbers
	bezier: function(options) {
		options.s.setXY(options, 'x1','y1');	// s for start
		options.c1.setXY(options, 'cx1','cy1');	// c1 for control point 1
		options.c2.setXY(options, 'cx2','cy2');	// c2 for control point 2
		options.e.setXY(options, 'x2','y2');	// e for end
			
		this.canvas.drawBezier(options);	
		
		return this; // for chaining
	},
		
	arc: function(options) {
		options.p.setXY(options, 'x','y');	// p for point				
		this.canvas.drawArc(options);	
		return this;
	},
	
	draw: function(func) {
		this.canvas.draw(func);
		return this;	
	},
	
	// private methods
	
	// draw loop
	drawLoop: function(fps) {
		var me = this;
		
		if(this.drawLoopStarted !== undefined) {
			loopFunction();
			return;
		}
		else this.drawLoopStarted = true;
		
		function update(drawables) {
			for(var n in drawables) { var d = drawables[n];
				d.update();
				update(d.drawables);
			}
		};
		// returns a list of drawables ordered by their intended draw order
		function buildOrderedDrawlist(drawables, drawablesMap) {
			var addToDrawablesMap = function(z, object) {
				if(drawablesMap[z] === undefined) drawablesMap[z] = [];
				drawablesMap[z].push(object);
			};
			
			for(var n in drawables) { var d = drawables[n];
				
				// override position and rotation (for performance reasons)
				d.positionOverride = Drawable.absolutePositionFromParent(d, d.parent);
				d.rotationOverride = d.relr() + d.parent.r();
				d.zOverride = d.relz() + d.parent.z();
				
				
				addToDrawablesMap(d.z(), d); //d.draw(me);
				buildOrderedDrawlist(d.drawables, drawablesMap);//draw(d.drawables);
				
				// remove override
				d.positionOverride = null;
				d.rotationOverride = null;
				d.zOverride = null;
			}
		};
		function draw(drawablesMap) {
			var keys = [];
			for(key in drawablesMap) { // get keys
				keys.push(key);
			}
			
			keys.sort();
			
			// loop through drawables in z-index order
			for(var n in keys) { var key=keys[n];
				for(var m in drawablesMap[key]) {
					drawablesMap[key][m].draw(me);
				}
			}	
		};
		
		function loopFunction() {
			//try {				
				var drawablesMap = {};
				buildOrderedDrawlist(me.drawables, drawablesMap);
				
				if(me.clearBeforeDraw) me.canvas.clearCanvas();
				draw(drawablesMap); // i want to put this before update, but right now it causes the first frame to blip - figure out how to fix that
				
				update(me.drawables);
			//} catch(e) {
			//	console.log("Warning - "+e);		
			//}	
		}
		
		loopFunction();
		setInterval(loopFunction, 1000/fps);	
	}
});


var point = proto({
	make: function(/* point or x,y */) {
		var args = arguments;			
		if(args.length == 1) {
			this.x = args[0].x;
			this.y = args[0].y;	
		} else { // args.length == 2
			this.x = args[0];
			this.y = args[1];
		}	
	},
	
	neg: function() {
		return point(-this.x, -this.y);	
	},
	add: function(b) {
		return point(this.x+b.x, this.y+b.y);	
	},
	sub: function(b) {
		return this.add(b.neg());	
	},	
	
	// less than - both coordinates are less than the corresponding coordinatesin p
	// useful for defining a bounds
	lt: function(p) {
		return this.x < p.x && this.y < p.y;	
	},
	// greater than - both coordinates are greater than the corresponding coordinatesin p
	gt: function() {
		return this.x > p.x && this.y > p.y;
	},
	
	// rotates around another point
	rotateAround: function(p, deg) {
		var angle = this.angleFrom(p);
		var distance = this.dist(p);
		var posrotRadians =  angle - deg*Math.PI/180;
		
		return point(p.x+Math.cos(posrotRadians)*distance, p.y+Math.sin(posrotRadians)*distance)
	},
	
	// gets the angle from the point p
	angleFrom: function(p) {
		var difference = this.sub(p);	
		return Math.atan2(difference.y,difference.x);
	},
	
	// gets the distance to the point p
	dist: function(p) {
		var difference = this.sub(p);
		return Math.sqrt(Math.pow(difference.x,2)+Math.pow(difference.y,2));	// h = (x^2+y^2)^.5
	},
	
	// sets x and y coordinates on an object
	setXY: function(object, xName, yName) {
		object[xName] = this.x;
		object[yName] = this.y;
	}
});

var Drawable = proto({
	make: function(relativeP,relativeRot, z) { 
    	if(z == undefined) z=1;	// default to being in front of parent 
    	
		// private members
		
    	this.pIn = relativeP;
		this.rIn = relativeRot;
		this.zIn = z;
		this.isoZ = true;	// default to treating the z index as isolated from objects other than its parent and its parent's descendents
		
		this.positionOverride = null;
		this.rotationOverride = null;
		this.zOverride = null;
		
		this.parent = {	// orphan :( - also can only have maximum one parent :(
			p: function() { return point(0,0); },
			r: function() { return 0; },
			z: function() { return 0; }
		};      	
    	this.drawables = [];
	},
	
	static: {
		absolutePositionFromParent: function(drawable, parent) {
			var parentPosition = parent.p();
			var unrotatedAbsolutePosition = drawable.relp().add(parentPosition);
			return unrotatedAbsolutePosition.rotateAround(parentPosition, parent.r());		
		},
		// basically the inverse of absolutePositionFromParent
		relativePositionFromParent: function(point, parent) {
			var parentPosition = parent.p();
			var unrotatedAbsolutePosition = point.rotateAround(parentPosition, -parent.r());
			return unrotatedAbsolutePosition.sub(parentPosition);
		},
		
		// relativeMemberName should be the member in question, which should be a value indicating a difference from its parent
		// newRelativeValue is the new relative value to set it to
		relativeValue: function(me, relativeMemberName, newRelativeValue) {
			if(newRelativeValue !== undefined) 
				me[relativeMemberName] = newRelativeValue;
			else 
				return me[relativeMemberName];
		},
		
		// relativeMemberMethodName is the name of the method used to get and set the relative value
		// relativeValueFromParent is a function that returns the relative difference of an absolute value from the object's parent
		// absoluteValueFromParent is a function that returns the absolute value of the value given the object and the object's parent
		// newAbsoluteValue is the new absolute value to set it to
		absoluteValue: function(me, relativeMemberMethodName, overrideMemberName, 
								relativeValueFromParent, absoluteValueFromParent, newAbsoluteValue) {
			if(newAbsoluteValue !== undefined) {
				me[relativeMemberMethodName](relativeValueFromParent(newAbsoluteValue, me.parent));
			} else {
				if(me[overrideMemberName] !== null)
					return me[overrideMemberName];
				return absoluteValueFromParent(me, me.parent);
			}
		}
	},
	
	// requires
		// intersects: function(p, view)
	
	// defaults
	update: function() {/*nothing*/},
	draw: function(view) {/* nothing */},
	/*intersects: function(p, view) {
		var context = view.canvas[0].getContext('2d');
		this.draw(view);
		return context.isPointInPath(p.x, p.y);
	},*/
	
	// standard public methods	
	
	// position
    p: function(newPosition) {
		return Drawable.absoluteValue(this, "relp", "positionOverride", Drawable.relativePositionFromParent, 
									  Drawable.absolutePositionFromParent, newPosition);
	},
	
	// position relative to its parent
	relp: function(newRelativePosition) {
		return Drawable.relativeValue(this, "pIn", newRelativePosition);
	},
	
	// rotation
	r: function(newRotation) {
		return Drawable.absoluteValue(this, "relr", "rotationOverride", function(newRotation, parent) {return newRotation.sub(parent.r()); }, 
									  function(me, parent) {return me.relr() + parent.r();}, newRotation);
	},
	
	// rotation relative to its parent
	relr: function(newRelativeRotation) {
		return Drawable.relativeValue(this, "rIn", newRelativeRotation);
	},
	
    rotate: function(deg) {
	    this.relr(this.relr()+deg);		
		return this; // for chaining
	},
	
	rotateAround: function(p,deg) {
		this.relp(this.relp().rotateAround(p, deg));
		this.rotate(deg); // must be after this object's position is rotated around because point.rotate depends on this.p that is changed above
						
		return this; // for chaining
	},
	
	relz: function(newRelZ) {
		return Drawable.relativeValue(this, "zIn", newRelZ);	
	},
	
	z: function(newZ) {
		return Drawable.absoluteValue(this, "relz", "zOverride", function(newZ, parent) {return newZ - parent.r(); }, 
									  function(me, parent) {return me.relz() + parent.z();}, newZ);
	},
	
	
    clickOver: function(view, handler) {
		var me = this;
		
		view.click(function(p, event) {
			if( me.intersects(p, view) ) {
				handler.call(me, p, event);
			}
	    });	
	    
		return this; // for chaining
	},
	
    click: function(view/*, [includeSubObject], handler*/) {
		var me = this;
		
		var includeSubObject = false; // default
		var handler = arguments[1];
		if(arguments.length > 2) {
			includeSubObject = arguments[1];	
			handler = arguments[2];
		}
		return this.clickOver(view, function(event) {
			handler.call(me, event);
			event.stopPropagation();
		});
	},
	
	
	add: function(/*drawable1, ... */) {
		var args = Array.prototype.slice.call(arguments);
		for(var n in args) {
			this.drawables.push(args[n]);
			args[n].parent = this;
		}
		return this; // chaining
	},
});