//*
var ws = require('websocket').client

client = new ws

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket client connected')
    
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        } else {
            console.log("Received: '" + message + "'");
        }
    });

    connection.sendUTF("test sending");
});

client.connect('ws://localhost:8080/', 'a');
//*/
/*
var net = require("net")

var socket = net.createConnection(8080, "localhost")

socket.on('connect', function() {
  
  socket.write("client moose\n")
  
 
})

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
*/
