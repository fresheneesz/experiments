function Ship(x,y,type,size) {
    var me = this;
	
	this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
    
    this.next = null;
    this.prev = null;
    
    this.posrot = 0;
    this.len = 0;
    this.targets = [];
    this.radius = 1;
    this.selected = false;
    this.free = true;
    
    var lines = [];
    var ships = [];
    
    var rot = 0;
    
    var construct = function() {
	    
		if (type == "fighter") {
			var line = addLine(size,120,150,5*size);
				line.weaponAt = "begin";
				line.weapon = new Weapon("laser",1,4,5,"#ff0000");
			
			line = addLine(size,240,30,5*size);
				line.weaponAt = "end";
				line.weapon = new Weapon("laser",1,4,5,"#ff0000");
			addLine(size,0,270,5*size);
			this.radius = 7;
	    } else if (type == "station") {
			addShip(size,90,0,15*size,"fighter");
			addShip(size,30,60,15*size,"fighter");
			addShip(size,330,120,15*size,"fighter");
			addShip(size,270,180,15*size,"fighter");
			addShip(size,210,240,15*size,"fighter");
			addShip(size,150,300,15*size,"fighter");
			this.radius = 22;
	    }	
	}
    
    this.draw = function(canvas, ctx) {
	
			console.log("len x: "+lines.length);
		if(lines.length > 0) console.log("len x: "+lines.length+" "+lines[0].x);
			
	    if (this.free && this.selected) {
			ctx.fillStyle = "#00ff00";
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.size*this.radius,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
	    }
	    
		//console.log(lines[0]);
		
		for(n in lines) {
			lines[n].draw();
		}

		for(n in ships) {
			ships[n].draw(canvas, ctx);
		}
		
	    var i,j;
	    for (j=0;j<this.targets.length;j++) {
			var weps = this.weaponCoords();
		
			var tx = this.targets[j].x;
			var ty = this.targets[j].y;
		
			for (i=0;i<weps.length;i++) {
			    var coord = weps[i];
			    var x = coord.x;
			    var y = coord.y;
			    var wep = coord.weapon;
		
			    
			    if (!wep.firing || (wep.target.x == tx && wep.target.y == ty)) {
		
					var nx = x-this.x;
					var ny = y-this.y;
			
					var ta = Math.atan2(tx-this.x,ty-this.x)*180/Math.PI;
					var wa = Math.atan2(nx,ny)*180/Math.PI;
			
					var canShoot = wep.canShoot();
			
					if (Math.abs(wa-ta) > 45 || Math.abs(wa-ta) < -45) {
						canShoot = false;
						wep.firing = false;
						wep.target = null;
					}
			
					ctx.strokeStyle = wep.color;
					 if (canShoot) {
					     if (wep.left > wep.duration) wep.left = wep.duration;
					     ctx.lineWidth = wep.left/wep.duration*this.size;
					     
					     wep.firing = true;
					     wep.target = this.targets[j];
					     ctx.beginPath();
					     ctx.moveTo(x,y);
					     ctx.lineTo(tx,ty);
					     ctx.stroke();
					}
			    }
			}
	    }
	};
	
    this.update = function() {
	    if (this.type == "station") {
			this.rotate(2);
	    }
		
		for(n in lines) {
			lines[n].update();
		}
	
	    for(n in ships) {
			ships[n].update();
		}
	
	};
    this.rotate = function rotateShip(deg) {
	    rot += deg;
	
		for(n in lines) { var line = lines[n];
			line.rot += deg;
			line.posrot -= deg;
			line.x = this.x+Math.cos(line.posrot*Math.PI/180)*line.len;
			line.y = this.y+Math.sin(line.posrot*Math.PI/180)*line.len;
		}
	
	    for(n in ships) { var ship = ships[n];
			ship.rotate(deg);
			ship.posrot -= deg;
			ship.x = this.x+Math.cos(ship.posrot*Math.PI/180)*ship.len;
			ship.y = this.y+Math.sin(ship.posrot*Math.PI/180)*ship.len;
		}
	};
    this.weaponCoords = function() {
	    var weps = [];
	
		for(n in lines) { var line = lines[n];
			var coord = line.weaponCoords();
			if (coord != null) {
			    weps.push(coord);
			}
		}
	
	    for(n in ships) { var ship = ships[n];
			weps = weps.concat(ship.weaponCoords());
		}
	
	    return weps;
	};
    this.addTarget = function(tx, ty) {	
	    this.targets.push({x:tx, y:ty});
	};
	
    this.isInside = function shipIsInside(x,y) {
	    if (!this.free) {
		return false;
	    }
	
	    var dist = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
	    if (dist <= this.size*this.radius) {
		this.selected = !this.selected;
		return false;
	    }
	
	    return false;
	};
    
    this.click = function(canvas, handler) {
		canvas.click(function(event) {
			handler();
	    });	
	}
    this.clickOver = function(canvas, handler) {
		canvas.click(function(event) {
			handler();
	    });	
	}
	
	
	var addLine = function(size,rot,posrot,len) {
	    var pr = posrot*Math.PI/180;
	
	    var lx = me.x+Math.cos(pr)*len;
	    var ly = me.y+Math.sin(pr)*len;
		    
	    var line = new Line(size,rot,len,lx,ly, "#000000");
		
		lines.push(line);
	
	    return line;
	}
	
	var addShip = function(size,rot,posrot,len,type) {
	    var pr = posrot*Math.PI/180;
	
	    var lx = me.x+Math.cos(pr)*len;
	    var ly = me.y+Math.sin(pr)*len;
	
	    var newShip = new Ship(lx,ly,type,size);
	    newShip.rotate(rot);
	    newShip.posrot = posrot;
	    newShip.len = len;
	    newShip.free = false;
	    
	    ships.push(newShip);
	
	    return newShip;
	}
	
	construct();
}

