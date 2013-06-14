var fs = require("fs")
var repl = require("repl")
var path = require('path')
var http = require("http")
var url = require("url")
var os = require("os")

function load(path,code){eval(fs.readFileSync(path,'utf8') + (code || ""))}
load("./antlr3-all.js")
load("./RescriptedLexer.js","this.RescriptedLexer = RescriptedLexer")
load("./RescriptedParser.js","this.RescriptedParser = RescriptedParser")
load("./RescriptedUtil.js")


//utility
var mkpath = function(dir){
  
  var separator = "/"
  
  if(os.type().indexOf("Windows") != -1)
    separator = "\\"
    
  var parts = path.resolve(dir).split(separator) 
  var temppath = parts[0]
  parts.slice(1).forEach(function(part){
    temppath += separator+part  
    
    if(!path.existsSync(temppath))
      fs.mkdirSync(temppath)    
    
  })
  
}


var config = {
  rescripted: {srcdir: "./src/main/rescripted"},
  webapp: {srcdir: "./src/main/webapp"},
  webserver: { port:8181} 
}

var buildproject = function(){
  mkpath(config.rescripted.srcdir)
  mkpath(config.webapp.srcdir)
  
  if(!path.exists(config.webapp.srcdir+"/index.html"))
    fs.writeFileSync(config.webapp.srcdir+"/index.html", "MR STUBBS!")
  
  fs.writeFileSync("./rescripted.json", JSON.stringify(config))
  console.log("built!")
}


var checkandstartbuild = function() {
       
  if(!path.existsSync("./rescripted.json") && !path.existsSync("./rescripted.rson")){
      process.stdout.write('Would you like to create a Rescripted project here? y or (n) ');
      
      process.stdin.once('data', function(val){
        var response = val.toString().trim()  
        if(response == 'y' || response == 'yes'){
          buildproject()
          startrepl("build")
        } else {
          process.exit()
        }

      }).resume();
  
  } else {
    config = JSON.parse(fs.readFileSync("./rescripted.json",'utf8'))
    
    startrepl("build")
  }
  
}


var buildeval = function eval(cmd, cont, name, callback) {
  var command = cmd.substring(1,cmd.length-1).trim() // remove extraneous parantheses and \n
  
  switch(command){
  	case "undefined":
  		callback()
  		break;
    case "compile": compile(); callback(null, "done");
      break;
    case "test": test(); callback(null, "done"); 
      break;
    case "startserver": startwebserver(); callback(null, "done"); 
      break;
    case "console": startrepl("console"); callback(null, "done");
      break;
    default:
      callback(null, "unknown command: "+command);
    
  }
}

 var rescriptedEval = function eval(cmd, cont, name, callback) {
 	 											var command = cmd.substring(1,cmd.length-1).trim() // remove extraneous parantheses
 	 											if(command == "undefined"){
													callback()
													return;
  											}
 	 
                        try{
                          var code = cmd.substring(1,cmd.length-1) // remove extraneous parantheses
                          var result = RescriptedParse(code)
                          callback(null, "success");
                        } catch(e) {
                          callback(null, e);
                        }
                      }
  

var buildrepl = null
var consolerepl = null

var startrepl = function(type){
  if(type == "build")
    buildrepl = repl.start(">", process, buildeval,false,true)
  else if(type == "console"){
    buildrepl.rli.pause()
    //buildrepl.inputStream.destroy()
    
    //process.stdin.resume();
    repl.start("rescripted>", process, rescriptedEval,false,false) 
  }
  
}


var startwebserver = function(){
  //from https://raw.github.com/gist/701407/6db19d14ba4e731a3caf5f634079c43bc4d663fe/static_server.js
  
  http.createServer(function(request, response) {
  
    var uri = url.parse(request.url).pathname
    var filename = path.join(process.cwd(), config.webapp.srcdir, uri);
 
    path.exists(filename, function(exists) {
      if(!exists) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }
  
      if (fs.statSync(filename).isDirectory()) filename += '/index.html';
      
      fs.readFile(filename, "binary", function(err, file) {
        if(err) {        
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }
      
        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }).listen(config.webserver.port);
  
}

var compile = function(){
  var files = fs.readdirSync(config.rescripted.srcdir)
	files.forEach(function(file){
		var extension = path.extname(file).toLowerCase()
		
		if(extension == ".rescripted"){
			var contents = fs.readFileSync(path.join(config.rescripted.srcdir,file),'utf8')
			
			println("")
			try{
				var result = RescriptedParse(contents)
				//println(result)
				println(" + "+path.basename(file,extension))
				//walk(result.tree)
			} catch(e) {
				println(" - "+path.basename(file,extension))
				println("   "+e)
			}
		}
	})
}

var test = function(){}

checkandstartbuild()



