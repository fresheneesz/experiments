function Line(size,rot,posrot,len,x,y, color) {
    this.size = size;
    this.rot = rot;
    this.posrot = posrot;
    this.update = updateLine;
    this.draw = drawLine;
    this.next = null;
    this.prev = null;
    this.len = len;
    this.x = x;
    this.y = y;
    this.weaponAt = "";
    this.weaponCoords = lineGetWeaponCoords;
    this.weapon = null;
    
    this.color=color;
}

function lineGetWeaponCoords() {
    if (this.weapon == null) {
	return null;
    }
    if (this.weaponAt == "begin") {
	var p1 = getPointAngle(-5*this.size,0,this.rot);
	p1.x += this.x;
	p1.y += this.y;
	p1.weapon = this.weapon;
	return p1;
    } else if (this.weaponAt == "end") {
	var p1 = getPointAngle(5*this.size,0,this.rot);
	p1.x += this.x;
	p1.y += this.y;
	p1.weapon = this.weapon;
	return p1;
    }

    return null;
}

function drawLine(color) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var x = this.x;
    var y = this.y;

    var lineFactor = 2.5;

    var p1 = getPointAngle(-5*this.size,0,this.rot);
    var p2 = getPointAngle(-lineFactor/2*this.size,lineFactor*this.size,this.rot);
    var p3 = getPointAngle(lineFactor/2*this.size,lineFactor*this.size,this.rot);
    var p4 = getPointAngle(5*this.size,0,this.rot);

    ctx.lineWidth = this.size;
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(x+p1.x,y+p1.y);
    ctx.bezierCurveTo(x+p2.x,y+p2.y,x+p3.x,y+p3.y,x+p4.x,y+p4.y);
    ctx.stroke();
}

function updateLine() {
    if (this.weapon != null) {
	this.weapon.update();
    }
}

function getPointAngle(x,y,rot) {
    var a = Math.atan2(y,x);

    var len = Math.max(Math.abs(x),Math.abs(y));

    rot *= Math.PI/180;

    var rotDiff = a-rot;

    var ret = {};

    ret.x = Math.cos(rotDiff)*len;
    ret.y = Math.sin(rotDiff)*len;

    return ret;
}