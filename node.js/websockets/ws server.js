var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 9999});
wss.on('connection', function(ws) {
    console.log('connected')
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
