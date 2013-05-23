var mysql = require("mysql");
var Fiber = require('fibers');
var Future = require('fibers/future'), wait = Future.wait;

var config = require('config');

var profiles = {};

var init = exports.init = function() {
    var write = config.mysql.writeable;
    var read = config.mysql.readonly;
    var nodetest = config.mysql.nodetest;
	createProfile("stitch","localhost",nodetest.username,nodetest.password,nodetest.database);
    createProfile("monetization","localhost",read.username,read.password,read.database);

	console.log("Database init complete");
    
}

var createProfile = exports.createProfile = function(profile,host,user,password,db) {
 	var profileData = {
		"host":host,
		"user":user,
		"password":password,
		"database":db
	};

	profiles[profile] = profileData;
}

exports.select = function(queryText,profile) {
	var future = new Future;

	if (profile === undefined) {
		profile = defaultProfile;
	}

	var pd = profiles[profile];

	var connection = mysql.createConnection({
	  host     : pd.host,
	  user     : pd.user,
	  password : pd.password,
	  database : pd.database
	});

	connection.connect();
    query("use "+pd.database,"stitch").wait();

	connection.query(queryText,function(err,rows) {
		if (err) {
			throw err;
		}
		future.return(rows);
	});

	connection.end();
    
	return future;
}

var query = exports.query = function(queryText,profile) {
	var future = new Future;

	if (profile === undefined) {
		profile = defaultProfile;
	}

	var pd = profiles[profile];

	var connection = mysql.createConnection({
	  host     : pd.host,
	  user     : pd.user,
	  password : pd.password,
	  database : pd.database
	});

	connection.connect();

	connection.query(queryText,function(err,rows) {
		if (err) {
			console.log(err + " while executing " + queryText);
            console.log(" \n"+(new Error()).stack);
		}
		future.return();
	});

	connection.end();
    
	return future;
}
