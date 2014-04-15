//*
var ws = require('websocket').server
var http = require('http')

var server = http.createServer(function(request, response) {
	console.log("connection received for "+request.url)
	response.writeHead(404)
	response.end()	
})
server.listen(8080, function() {
	console.log("now listening")	
})

wsServer = new ws({httpServer:server, autoAcceptConnections: false})

wsServer.on('request', function(request) {
	console.log("got request")
	var connection = request.accept('a', request.origin)
	console.log("got connection")
	
	connection.on('message', function(message) {
		console.log("got message: "+message)
	})		
	
	connection.on("close", function() {
		console.log("closed")	
	})
	
	connection.on('error', function(e) {
		console.log('Error: '+ e.stack)
	})
})
//*/
/*
var net = require("net")

net.createServer(function(socket) {
  //just added
  socket.on("error", function(err) {
    console.log("Caught flash policy server socket error: ")
    console.log(err.stack)
  })
  
  socket.on("data", function(data) {
     console.log(data.toString())
  })
  socket.on("close", function(data) {
     console.log("crosed")
  })

  socket.write("HTTP/1.1 101 WebSocket Protocol Handshake\r\n")
  socket.write("Upgrade: WebSocket\r\n")
  socket.write("Connection: Upgrade\r\n")
  socket.write("Sec-WebSocket-Origin: null\r\n")
  socket.write("Sec-WebSocket-Location: ws://localhost:8080/test\r\n")
  socket.write("Sec-WebSocket-Protocol: a\r\n")
  socket.write("Sec-WebSocket-Accept: h+AeDBLyMiRwzhhU6rolIxTVpXI=\r\n")
  
  socket.write("server moose\n")
  
  socket.end()
}).listen(8080)
*/
