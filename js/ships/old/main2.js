
$(function() {
    try {
		var canvas = $("#canvas")[0];
	    var context = canvas.getContext("2d");
		var drawables = [];
		
		var ship = new Ship(400,400,"station",4);
		    ship.addTarget(200,200);
		    ship.addTarget(600,600);   
		    ship.click(canvas, function() { // todo: this should only select 1 ship (granted only one ship exists right now...)
				ship.isInside(event.offsetX,event.offsetY);
			});
		drawables.push(ship);
		
	    mainLoop(canvas, context, 100, drawables);
	} catch(e) {
		console.log("Warning - "+e);	
	}
});

// needs drawable elements of the form {draw: function(){}, update:function(){}}
function mainLoop(canvas, context, millisecondsBetweenUpdate, drawables) {
	setInterval(function() {
		try {
			context.clearRect(0,0,canvas.width,canvas.height);
			for(n in drawables) { var d = drawables[n]
				d.draw(canvas, context)
				d.update();
			}
		} catch(e) {
			console.log("Warning - "+e);		
		}
	}, millisecondsBetweenUpdate);	
}
