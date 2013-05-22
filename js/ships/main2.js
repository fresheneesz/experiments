var v4;
$(function() {
    //try {	
	
		//*
		v = addCanvas(600,600, 20);
		
		var ship = Station(point(400,400),0, 4, undefined);
			ship.click(v, function() {
				ship.selected = !ship.selected;
			});
			
			ship.target(point(200,200));
			ship.target(point(600,600));
			ship.target(point(600,200));
			
		v.add(ship);
		//*/
		
		//*
		v4 = addCanvas(100,100, 20);
		
		var f1 = Fighter(point(50,50),0, 4, xolor('red').lightness(200));
			f1.target(point(200,200));
			f1.target(point(600,600));
			f1.target(point(600,200));
		var f2 = Fighter(point(60,60),0, 4, xolor('green').lightness(200));
			f2.z(-1);
		v4.add(f1, f2);
		//*/
		
		/*
		var c = xolor("#00FF00");
		console.log(c.lightness());
		console.log(c.lightness(.5).lightness());
		console.log(c.lightness(.01).relLighten(1).lightness());
		
		var what = xolor('#199EC6').lightness(.7).xc;
		console.log(what.r+", "+what.g+", "+what.b);
		//*/
		
	//} catch(e) {
	//	console.log("Warning - "+e);	
	//}
});

var addCanvas = function(height, width, fps) {
	var v = view(height,width, fps);
		v.canvas.css({border: '1px solid'});
	$('body').append(v.canvas);
	
	return v;	
}
