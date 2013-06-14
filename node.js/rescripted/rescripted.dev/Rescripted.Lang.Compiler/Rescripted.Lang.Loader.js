var fs = require("fs")
var path = require('path')

global.RescriptedPrepare = function (filePath, name, imports, code){
	var modulePath = name+".js";
	var moduleUpToDate = path.existsSync(modulePath) && fs.statSync(modulePath).mtime.getTime() > fs.statSync(filePath).mtime.getTime();
	if(!moduleUpToDate){
		var importAliases = Object.keys(imports);
		var importPackages = importAliases.map(function(alias){return imports[alias]});
		function enclose(name){return "'"+name+"'";}
		var source = "Rescripted('"+name+"',["+importPackages.map(enclose)+"],function("+importAliases+"){";
		source += fs.readFileSync(filePath,'utf8');
		source += "\n" + (code || "");
		source += "})";
		fs.writeFileSync(modulePath,source,'utf8')
	}
}


global.Rescripted = (function(context){
	function Rescripted(name){
		if(arguments.length == 1){
			
			var r = null;
			try{ r = require } catch(e){}
			if(r != null) r("./"+name+".js")

			return context[name];
		} else {
			var imports = (arguments.length == 2)? [] : arguments[1];
			var definition = (arguments.length == 2)? arguments[1] : arguments[2];
			
			var imported = imports.map(function(name){return Rescripted(name)});
			
			if(typeof definition == "function")
				definition = definition.apply(null,imported)
			return (context[name] = definition);
		}
	}
	return Rescripted;
})({});
//var parts = name.split(".");context = parts.slice(0,-1).reduce(function(context,key){return (context[key] = context[key] || {})},context); name = parts.slice(-1)[0];

RescriptedPrepare("./grammar/antlr3-all.js",				"Rescripted.Lang.Antlr", {},"return org;")
RescriptedPrepare("./grammar/RescriptedLexer.js",		"Rescripted.Lang.Lexer", {org:"Rescripted.Lang.Antlr"},"return RescriptedLexer;")
RescriptedPrepare("./grammar/RescriptedParser.js",	"Rescripted.Lang.Parser", {org:"Rescripted.Lang.Antlr", RescriptedLexer:"Rescripted.Lang.Lexer"},"return RescriptedParser;")

