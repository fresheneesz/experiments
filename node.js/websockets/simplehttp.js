var http = require("http")

http.createServer(function(request, response) {
    console.log("got request")
    response.write("hi")
    response.end()
}).listen(9876)
