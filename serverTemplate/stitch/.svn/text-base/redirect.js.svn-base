var util = require('util');

var database = require("./database.js");
var url = require('url');

var forwards = {};

exports.init = function() {

	var pathList = {
        show: 'Show'
    }

	pathList.foreach(function(file, path) {
        var filePath = "./resources/"+file;
        console.log("requiring '"+filePath+"'");
		forwards['/'+path] = require(filePath);
	});

	console.log("Redirect init complete.");
}

exports.redirect = function(request,response) {
	var urlObj = url.parse(request.url);
	var path = urlObj.pathname;
	var query = urlObj.query;

	var queryObject = {};

	if (query !== null) {	
		var pairArr = query.split("&");

		for (var i=0;i<pairArr.length;i++) {
			var pair = pairArr[i];
			var pairData = pair.split("=");
			var key = pairData[0];
			var value = pairData[1];

			if (queryObject.hasOwnProperty(key)) {
				var obj = queryObject[key];

				if (typeof obj !== Array) {
					newObj = [];
					newObj.push(obj);
					obj = newObj;
				}

				obj.push(value);
				queryObject[key] = obj;
			} else {
				queryObject[key] = value;
			}
		}
	}

	console.log("path " + path);

    var forward = forwards[path];
    if (forward !== undefined) {
        response.writeHead(200, {'Content-Type': 'text/plain'});

        var dataObj = forward.getData(queryObject);
        if (dataObj === undefined || dataObj == null) {
            dataObj = {};
        }

        response.end();
        return;
    }

	console.log("Could not find a redirect for " + path);
	response.writeHead(404, {'Content-Type': 'text/plain'});
}
