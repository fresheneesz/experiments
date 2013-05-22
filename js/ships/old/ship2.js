function Ship(x,y,type,size) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.draw = drawShip;
    this.update = updateShip;
    this.next = null;
    this.prev = null;
    this.lineHead = null;
    this.rotate = rotateShip;
    this.rot = 0;
    this.size = size;
    this.shipHead = null;
    this.posrot = 0;
    this.len = 0;
    this.weaponCoords = shipGetWeaponCoords;
    this.addTarget = shipFire;
    this.targets = new Array();
    this.isInside = shipIsInside;
    this.radius = 1;
    this.selected = false;
    this.free = true;
    
    
    this.click = function(canvas, handler) {
		canvas.click(function(event) {
			handler();
	    });	
	};
    this.clickOver = function(canvas, handler) {
		canvas.click(function(event) {
			handler();
	    });	
	};
    

    if (type == "fighter") {
		var line = addLine(size,120,150,5*size,this);
		line.weaponAt = "begin";
		line.weapon = new Weapon("laser",1,4,5,"#ff0000");
		line = addLine(size,240,30,5*size,this);
		line.weaponAt = "end";
		line.weapon = new Weapon("laser",1,4,5,"#ff0000");
		addLine(size,0,270,5*size,this);
		this.radius = 7;
    } else if (type == "station") {
		addShip(size,90,0,15*size,this,"fighter");
		addShip(size,30,60,15*size,this,"fighter");
		addShip(size,330,120,15*size,this,"fighter");
		addShip(size,270,180,15*size,this,"fighter");
		addShip(size,210,240,15*size,this,"fighter");
		addShip(size,150,300,15*size,this,"fighter");
		this.radius = 22;
    }
}

function drawShip() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    if (this.free && this.selected) {
	ctx.fillStyle = "#00ff00";
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.size*this.radius,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
    }

    var tmp = this.lineHead;
    while (tmp != null) {
	tmp.draw("#000000");
	tmp = tmp.next;
    }

    var tmp = this.shipHead;
    while (tmp != null) {
	tmp.draw();
	tmp = tmp.next;
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
	    
		 //alert(x + " " + y + " -> " + tx + " " + ty);

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
}

function rotateShip(deg) {
    this.rot += deg;

    var tmp = this.lineHead;
    while (tmp != null) {
	tmp.rot += deg;
	tmp.posrot -= deg;
	tmp.x = this.x+Math.cos(tmp.posrot*Math.PI/180)*tmp.len;
	tmp.y = this.y+Math.sin(tmp.posrot*Math.PI/180)*tmp.len;
	tmp = tmp.next;
    }

    var tmp = this.shipHead;
    while (tmp != null) {
	tmp.posrot -= deg;
	tmp.x = this.x+Math.cos(tmp.posrot*Math.PI/180)*tmp.len;
	tmp.y = this.y+Math.sin(tmp.posrot*Math.PI/180)*tmp.len;
	tmp.rotate(deg);
	tmp = tmp.next;
    }
}

function updateShip() {
    if (this.type == "station") {
	this.rotate(2);
    }

    var tmp = this.lineHead;
    while (tmp != null) {
	tmp.update();
	tmp = tmp.next;
    }

    var tmp = this.shipHead;
    while (tmp != null) {
	tmp.update();
	tmp = tmp.next;
    }

}


function addLine(size,rot,posrot,len,ship) {
    var pr = posrot*Math.PI/180;

    var lx = ship.x+Math.cos(pr)*len;
    var ly = ship.y+Math.sin(pr)*len;

    var line = new Line(size,rot,posrot,len,lx,ly, "#000000");

    if (ship.lineHead != null) {
	ship.lineHead.prev = line;
    }

    line.next = ship.lineHead;
    ship.lineHead = line;

    return line;
}

function addShip(size,rot,posrot,len,ship,type) {
    var pr = posrot*Math.PI/180;

    var lx = ship.x+Math.cos(pr)*len;
    var ly = ship.y+Math.sin(pr)*len;

    var newShip = new Ship(lx,ly,type,size);
    newShip.rotate(rot);
    newShip.posrot = posrot;
    newShip.len = len;
    newShip.free = false;
    
    if (ship.shipHead != null) {
	ship.shipHead.prev = newShip;
    }

    newShip.next = ship.shipHead;
    ship.shipHead = newShip;

    return newShip;
}

function shipGetWeaponCoords() {
    var weps = new Array();

    var tmp = this.lineHead;

    while (tmp != null) {
	var coord = tmp.weaponCoords();
	if (coord != null) {
	    weps.push(coord);
	}
	tmp = tmp.next;
    }

    var tmp = this.shipHead;

    while (tmp != null) {
	weps = weps.concat(tmp.weaponCoords());
	tmp = tmp.next;
    }

    return weps;
}

function shipFire(tx, ty) {
    var target = {};
    target.x = tx;
    target.y = ty;

    this.targets.push(target);
}

function shipIsInside(x,y) {
    if (!this.free) {
	return false;
    }

    var dist = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
    if (dist <= this.size*this.radius) {
	this.selected = !this.selected;
	return false;
    }

    return false;
}