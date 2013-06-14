var fs = require("fs")
var path = require('path')

exports.Rescripted = {
	LoadModule: LoadModule,
	Antlr:LoadModule("./antlr3-all.js","module.exports = {org:org};"),
	Lexer:LoadModule("./RescriptedLexer.js","module.exports = RescriptedLexer"),
	Parser:LoadModule("./RescriptedParser.js","module.exports = RescriptedParser"),
};

function LoadModule(filePath,code){
	var modulePath = filePath+".module.js";
	var moduleUpToDate = fs.existsSync(modulePath) && fs.statSync(modulePath).mtime.getTime() > fs.statSync(filePath).mtime.getTime();
	if(!moduleUpToDate){
		var source = fs.readFileSync(filePath,'utf8') + "\n" + (code || "");
		fs.writeFileSync(modulePath,source,'utf8')
	}
	return require(modulePath);
}
