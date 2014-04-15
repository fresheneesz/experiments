var app  = express();

         io  = require('socket.io');
         var server  =   http.createServer(app).listen(app.get('port'), 
               function(){  console.log('Express server listening on port '
               + app.get('port'));
         });

        io  =   io.listen(server,{ log : true});

        io.on('connection', function (socket) {

           socket.on('something2',function(data){
               //DO SOMETHING
            });
        }
