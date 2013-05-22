$(function() {
		
	jss('canvas', {
	    border: '1px solid transparent'
	});
	jss('canvas.selected', {
	    border: '1px solid green'
	});

	var goStopButton = $('<input type="button" value="Go"></input>');
	var stepButton = $('<input type="button" value="Step"></input>');
	var aliveListButton = $('<input type="button" value="Get Alive List"></input>');
	var clearButton = $('<input type="button" value="clear"></input>');
	
	$('body').append('<span class="aspan">testing</span>');
	
	$('body').append(goStopButton);
	$('body').append(stepButton);
	$('body').append(aliveListButton);
	$('body').append(clearButton);
	$('body').append("<br>");

	var selectedPreset = {s:null};
	
	$('body').append("Still Life:");
	var square = addPreset(2,2, selectedPreset, [[0,0]]); // square		
		square.v.canvas.click();	
	
	addPreset(2,2, selectedPreset, [[0,0],[0,1],[1,0],[1,1]]); // block
	addPreset(3,3, selectedPreset, [[0,1],[1,0],[1,2],[2,1]]); // tub
	addPreset(3,3, selectedPreset, [[0,0],[0,1],[1,0],[1,2],[2,1]]); // boat
	addPreset(3,3, selectedPreset, [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]); // ship
	addPreset(4,4, selectedPreset, [[0,1],[1,0],[1,2],[2,0],[2,2],[3,1]]); // beehive
	addPreset(5,5, selectedPreset, [[0,1],[1,0],[1,2],[2,0],[2,3],[3,1],[3,2]]); // beehive
	addPreset(5,5, selectedPreset, [[0,0],[0,1],[1,0],[1,2],[2,3],[3,4],[4,3],[4,4]]); // canoe
	
	
	$('body').append("<br>Eaters:");
	addPreset(5,5, selectedPreset, [[0,0],[0,1],[1,0],[2,1],[2,2],[2,3],[3,3]]); // fish-hook
	
	
	$('body').append("<br>Oscillators: ");
	addPreset(3,3, selectedPreset, [[0,1],[1,1],[2,1]]); // blinker
	// "clock 2"
	addPreset(12,12, selectedPreset, [[0,4],[0,5],[1,4],[1,5],[3,4],[3,5],[3,6],[3,7],[4,3],[4,8],[4,10],[4,11],[5,3],[5,7],[5,8],[5,10],[5,11],[6,0],[6,1],[6,3],[6,5],[6,6],[6,8],[7,0],[7,1],[7,3],[7,8],[8,4],[8,5],[8,6],[8,7],[10,6],[10,7],[11,6],[11,7]]);	
	// Kok's galaxy
	addPreset(9,9, selectedPreset, [[0,2],[0,5],[0,7],[1,0],[1,1],[1,3],[1,5],[1,6],[1,7],[2,1],[2,8],[3,0],[3,1],[3,7],[5,1],[5,7],[5,8],[6,0],[6,7],[7,1],[7,2],[7,3],[7,5],[7,7],[7,8],[8,1],[8,3],[8,6]]); 
	// octagon
	addPreset(8,8, selectedPreset, [[0,2],[0,5],[1,2],[1,5],[2,0],[2,1],[2,3],[2,4],[2,6],[2,7],[3,2],[3,5],[4,2],[4,5],[5,0],[5,1],[5,3],[5,4],[5,6],[5,7],[6,2],[6,5],[7,2],[7,5]]);
	// pentadecathlon
	addPreset(12,12, selectedPreset, [[0,1],[0,2],[0,3],[1,0],[1,4],[2,0],[2,4],[3,1],[3,2],[3,3],[8,1],[8,2],[8,3],[9,0],[9,4],[10,0],[10,4],[11,1],[11,2],[11,3]]);
	
	$('body').append("<br>Bombs/Methuselahs: ");
	addPreset(5,5, selectedPreset, [[0,3],[1,1],[1,2],[2,0],[2,3],[3,1],[3,2],[4,3]]); // pulsar bom
	addPreset(7,7, selectedPreset, [[0,2],[1,0],[1,2],[3,1],[4,2],[5,2],[6,2]]); // acorn
	addPreset(8,8, selectedPreset, [[0,1],[1,1],[1,2],[5,2],[6,0],[6,2],[7,2]]); // die hard
	
	$('body').append("<br>Spaceships: ");
	addPreset(3,3, selectedPreset, [[0,2],[1,0],[1,2],[2,1],[2,2]]); // glider
	addPreset(5,5, selectedPreset, [[0,1],[0,3],[1,0],[2,0],[3,0],[3,3],[4,0],[4,1],[4,2]]); // lightweight spaceship
	
	$('body').append("<br>Guns: ");
	// Gosper glider gun
	addPreset(40,10, selectedPreset, [[2,4],[2,5],[3,4],[3,5],[12,4],[12,5],[12,6],[13,3],[13,7],[14,2],[14,8],[15,2],[15,8],[16,5],[17,3],[17,7],[18,4],[18,5],[18,6],[19,5],[22,2],[22,3],[22,4],[23,2],[23,3],[23,4],[24,1],[24,5],[26,0],[26,1],[26,5],[26,6],[36,2],[36,3],[37,2],[37,3]]); 
	
	$('body').append("<br>Infinite growth: ");
	addPreset(8,6, selectedPreset, [[0,5],[2,4],[2,5],[4,1],[4,2],[4,3],[6,0],[6,1],[6,2],[7,1]]);
	
	$('body').append("<br>Other: ");
	//addPreset(5,5, selectedPreset, [[0,0],[0,2],[1,0],[1,1],[1,2],[2,3],[3,2]]); // part of a kok's galaxy
	
	
	//var block = addCanvas(5,5, 1);

	$('body').append("<br>");

	var b = addBoard(100, 100, 15, [], selectedPreset);
	var v = b.v;
	var board = b.board;
	v.drawLoop();
	
	$('body').append("<br>");
	
	goStopButton.click(function() {
		var go = $(this).val() === 'Go';
		if(go) {
			$(this).val("Stop");
			board.go = true;
		} else {
			$(this).val("Go");
			board.go = false;
		}	
	});
	stepButton.click(function() {
		board.step();	
	});
	aliveListButton.click(function() {
		$('body').append(JSON.stringify(board.onList())+"<br>");
	});
	clearButton.click(function() {
		b.board.clear();	
	});
});


var addPreset = function(height, width, selectedPreset, onList) {
	var b = addBoard(height, width, 1, onList, null, false);
	
	b.v.canvas.addClass("preset");
	b.v.canvas.click(function(event) {
		$('.preset').removeClass("selected");
		$(this).addClass("selected");
		selectedPreset.s = b.board;
	});
	return b;
};

var addBoard = function(height, width, fps, onList, selectedPreset, changeable) {
	var v = addCanvas((height)*(Board.cellSize+1)+.5,(width)*(Board.cellSize+1)+.5, fps);
		v.clearBeforeDraw = false;
					
	var board = Board(point(.5,.5),0, v, height, width, changeable, selectedPreset);	
		if(onList) board.toggleGroup(onList, [0,0]);
	v.add(board);
	
	return {board:board, v:v};
};

var addCanvas = function(height, width, fps) {
	var v = view(height,width, fps);
	$('body').append(v.canvas).append(" ");
	
	return v;	
};


var Board = proto({ mix:[Drawable],
	make: function(p,rot, view, width, height, changable, selectedPreset) { // width and height are in number of cells
		var me = this;
		Drawable.make(this, p, rot);
		if(changable === undefined) changable = true;
		
		this.go = false;
		
		var cellSize = Board.cellSize;
		
	    //this.width = width;
	    //this.height = height;
	    
	    var cells = [];
	    for(var w=0; w<width; w++) {
			if(cells[w] === undefined) cells[w] = [];
			
			for(var h=0; h<height; h++) {
				(function() {
					var cell = Cell(p.add(point(cellSize*w,cellSize*h)),0, cellSize);
						/*if(changable) {
							cell.clickOver(view, function(p) {
								cell.alive(!cell.alive());	
								cell.changed = true;
							});
						}*/
						/*v.click(function(p) {
							cell.p(p);	
							cell.changed = true;
						});*/
					
					cells[w][h] = cell;
				})();
			}	
		} 
		
		if(changable) {
			view.click(function(p) {
				// get cell indexes
				var indexes;				
				Board.matrixForEach(me.cells, function(cell, w, h) {
					if(cell.intersects(p)) {
						indexes = [w,h];
						return false;	
					}
				});
				
				/*var myp = this.p();
				var mypCorner = myp.add(point(this.cellSize,this.cellSize));
				return myp.lt(p) && p.lt(mypCorner);
				*/
				// toggle the group 
				me.toggleGroup(selectedPreset.s.onList(), indexes);	
			});
		}
		
		var putNeighbor = function(neighbors, x, y) {
			if(0<=x&&x<width & 0<=y&&y<height) {
				neighbors.push(cells[x][y]);
			}
		}
				
		Board.matrixForEach(cells, function(cell, w, h) {
			for(var x=w-1; x<=w+1; x++) {	
				for(var y=h-1; y<=h+1; y++) {
					if(x!=w || y!=h) putNeighbor(cell.neighbors, x, y);
				}
			}
			me.add(cell);	
		});		
		
		this.cells = cells;
	},
	
	toggleGroup: function(toggleList, offset) {
		for(var n=0; n<toggleList.length; n++) { var c = toggleList[n]; //coordinates
			var cell = this.cells[c[0]+offset[0]][c[1]+offset[1]];
			if(cell !== undefined) 
				cell.alive(!cell.alive());
		}
	},
	// gets a toggleList based on what's on on the board at the time
	onList: function() {
		var list = [];
		Board.matrixForEach(this.cells, function(c, x,y) {
			if(c.alive())
				list.push([x,y]);	
		});
		return list;
	},
	
	clear: function() {
		Board.matrixForEach(this.cells, function(cell) {	
			cell.alive(false);
		});
	},
	
	step: function() {
		var changedCells = [];
		Board.matrixForEach(this.cells, function(cell, w, h) {
			var change = cell.step();
			if(change) changedCells.push(cell);
		});	
		
		for(var n=0; n<changedCells.length; n++) { var c = changedCells[n];
			c.alive(!c.alive());
		}
	},
	
	update: function() {
		if(this.go) {
			this.step();
		}
	},
	
	static: {
		matrixForEach: function(matrix, handler) {
			for(var x=0; x<matrix.length; x++) { var secondDimension = matrix[x];
				for(var y=0; y<secondDimension.length; y++) {
					if(false === handler(secondDimension[y], x, y)) {
						break;
					}
				}
			}
		}
	}
});
	Board.cellSize = 10;

var Cell = proto({ mix:[Drawable],
	make: function(p,rot, cellSize, strokeWidth) {
		Drawable.make(this, p, rot);
		
		this.cellSize = cellSize;
		this.strokeWidth = 2;
		this.neighbors = [];
		
		// private
		
		this.aliveIn = false;
		this.changed = true; // redraw
		
		this.aliveColor = xolor.rand().lightness(230);//("#45AAFF");//.lighten(-50);
		//this.deadColor = this.aliveColor.lightness(255);
		this.grayColor = xolor('gray').css();
	},
	
	alive: function(val) {
		var me = this;
		return Cell.accessor(this, val, "aliveIn", function() {
			me.changed = true;
		});
	},
	
	static: {
		accessor: function(theThis, val, internalName, onSet) {
			if(val !== undefined) {
				theThis[internalName] = val	
				if(onSet) onSet(val);
			} else {
				return theThis[internalName];
			}	
		}
	},	
	
	aliveNeighbors: function() {
		var aliveNeighbors = [];
		for(var n in this.neighbors) {
			if(this.neighbors[n].alive()) 
				aliveNeighbors.push(this.neighbors[n]);
		}		
		return aliveNeighbors;
	},
	
	// returns whether or not the cell changes this round
	step: function() {
		var aliveNeighbors = this.aliveNeighbors();
		var n = aliveNeighbors.length;
		var newValue;
		
		if(n < 2 || 3 < n) newValue = false;
		else if(n == 3) {
			newValue = true;
			var newColor = aliveNeighbors[0].aliveColor;
			if(Math.random()>.92) {
				newColor = xolor.rand().lightness(230);
			}
			
			for(var n=0; n<aliveNeighbors.length; n++) {
				newColor = newColor.breed(aliveNeighbors[n].aliveColor)	
			}
			this.aliveColor = newColor;
		}
		else /*n==2*/ return false; // no change
		
		return this.alive() !== newValue;
	},
	
	draw: function(view) {
		if(this.changed) {
			var strokeWidth = this.strokeWidth;
			var extra = strokeWidth/2;
			
			var color;
			if(this.alive()) {
				color = this.aliveColor.css();
			} else {
				color = this.aliveColor.lightness(50).css();	
			}
			
			var position = this.p();
			
			view.line({
				strokeStyle: this.grayColor,
				fillStyle: color,
				strokeWidth: strokeWidth,
				p1: position.add(point(0,-extra)),
				p2: position.add(point(0, this.cellSize)),
				p3: position.add(point(this.cellSize, this.cellSize)),
				p4: position.add(point(this.cellSize, 0)),
				p5: position.add(point(-extra, 0))
			});
			/*
			view.rect({
				fillStyle: "green",
				p: this.p(),
				width:4, height:4
			});
			view.rect({
				fillStyle: "green",
				p: this.p().add(point(this.cellSize,this.cellSize)),
				width:4, height:4
			});
			*/
			
			
			this.changed = false;
		} 
	},
	
	intersects: function(p) {
		var myp = this.p();
		var mypCorner = myp.add(point(this.cellSize,this.cellSize));
		return myp.lt(p) && p.lt(mypCorner);
	}
	
});