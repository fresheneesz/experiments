var http = require('http')
var url = require('url')
var querystring = require('querystring')
var fs = require('fs')

http.createServer(function (request, res) {
    var requestUrl = url.parse(request.url)
    var path = requestUrl.pathname
    var params = querystring.parse(requestUrl.query)

    if(path === "/") {
        writeResponse({
            body: fs.readFileSync("curlTest_use.html")
        }, res)
    } else if(path === "/script/") {
        var modules = []
        var modulesToLoad = JSON.parse(params.new)

        if(modulesToLoad.indexOf("A") !== -1) modules.push(fs.readFileSync("A.js"))
        if(modulesToLoad.indexOf("B") !== -1) modules.push(fs.readFileSync("B.js"))

        writeResponse({
            body: modules.join(";"),
            'content-type': 'text/javascript'
        }, res)
    } else {
        writeResponse({
            code: 404, body: ''
        }, res)
    }

}).listen(80)

function writeResponse(result, response) {
    if(!result.code) result.code = 200
    if(result.headers === undefined) result.headers = {}
    if(!result.headers['content-type']) result.headers['content-type'] = 'text/html'
    result.headers['content-length'] = result.body.length

	response.writeHead(result.code, result.headers)
    if(result.body)
        response.write(result.body)
    response.end()
}