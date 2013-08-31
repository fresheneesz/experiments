var http = require('http')
  , socketIO = require('socket.io')

var app = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('<script src="/socket.io/socket.io.js"></script>'
			+"<script>\
			  var socket = io.connect('http://localhost');\
			  socket.on('news', function (data) {\
			    console.log(data);\
			    socket.emit('my other event', { my: 'data' });\
			  });\
			</script>");
})
app.listen(90);

socketIO.listen(app).sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
  var n = 1; // instead of using socket's stupid get/set interface, just set members...
  
  socket.on('my other event', function (data, fn) {
    console.log(data);
    fn("over"); // optionally send an awknowlegement with (again optional) data
    
    setTimeout(function() {		
		socket.volatile.emit('news', "moo"+n); // volatile sends (don't ensure receipt)
		n++;
	}, 1000);
  });
});