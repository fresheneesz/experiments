var shipHead = null;
var rotate = false;

    $(function() {
	    init();

	    $("#canvas").click(function(event) {
		    handleMouseClick(event.offsetX,event.offsetY);
	    });
    });

function init() {
	    setInterval(main,100);
	    var ship = createShip(400,400,"station",4);
	    ship.addTarget(200,200);
	    ship.addTarget(600,600);
	    draw();
   
}

function main() {
    update();
    draw();
}

    function update() {
	var tmp = shipHead;
	while (tmp != null) {
	    tmp.update();
	    tmp = tmp.next;
	}
    }

function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    var tmp = shipHead;
    while (tmp != null) {
	tmp.draw();
	tmp = tmp.next;
    }
}

function createShip(x,y,type,size) {
    var ship = generateShip(x,y,type,size);

    if (shipHead != null) {
	shipHead.prev = ship;
    }
    ship.next = shipHead;
    shipHead = ship;

    return ship;
}

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    alert(canvasX + " " + canvasY);

    return {x:canvasX, y:canvasY};
}

function handleMouseClick(x,y) {
    var tmp = shipHead;

    tmp = shipHead;

    while (tmp != null) {
	if (tmp.isInside(x,y)) {
	    return;
	}
	tmp = tmp.next;
    }
}