
var fs = require("fs")
var path = require('path')
require('./Rescripted.Lang.Loader.js')


var AstUtil = Rescripted("Rescripted.Lang.AstUtil")
var ToJavascript = Rescripted("Rescripted.Lang.ToJavascript");
var ToRescripted = Rescripted("Rescripted.Lang.ToRescripted");
var println = AstUtil.println;

function test(folder,specificFiles, walker, doFinally){
	specificFiles = specificFiles || [];
	walker = walker || function(){}
	var files = fs.readdirSync(folder)
	
	var attempted = 0
	var passed = 0;
	
	var summary = []
	
	files.forEach(function(file){
		var extension = path.extname(file).toLowerCase()
		var name = path.basename(file,extension)
		
		if(extension == ".rescripted" && (specificFiles.length == 0 || specificFiles.indexOf(name) != -1)){
			var contents = fs.readFileSync(path.join(folder,file),'utf8')
					
			var entry = {name:name, message:"Skipped"}
			summary.push(entry)
			
			attempted++;

			println("")
			try{
				var result = AstUtil.RescriptedParse(contents)
				walker(result.tree,contents,name)
				println(" + "+name)
				passed++;
				entry.message = "Passed"
			} catch(e) {
				if(typeof e == "string")
					entry.message = e;
				else
					entry.message = e.message || ""+e;
				println(" - "+name)
				println(e)
				println("   "+(e.stack || ""))
			}
			if(doFinally != null)
				doFinally(name)
		}
	})
	
	if(attempted > 1){
		println("")
		summary.forEach(function(entry){
			var total = entry.message.length;
			var remove = total - Math.min(80,total);
			var message = entry.message.substring(0,entry.message.length - remove);
			var add = entry.name.length < 20? 20 - entry.name.length : 0;
			var name = entry.name + Array(add+1).join(" ");
			println(" "+name+" "+message);	
		})
		println("")
		println(" Total passing tests: " + passed + " / " + attempted);
	}
}

var typeRegistry = {"_root_":{type:"Package",name:"",members:{}}};
function checkIfTypeExists(name,current){
	if(typeRegistry[name] != null){
		current.printLine(AstUtil.FindTokens(current.tree.children,"ID"),"Attempt to redefine symbol '"+name+"'")
	}
}
function registerClass(type,name,current){
	var fullName = combineTypeNames("_root_",current.scope,name)
	checkIfTypeExists(fullName,current)
	
	typeRegistry[fullName] = {
		type:type,
		name:name,
		members:{}
	};
	
}
function registerPackage(name,current){
	var fullName = combineTypeNames("_root_",current.scope,name)
	checkIfTypeExists(fullName,current)
	typeRegistry[fullName] = {
		type:"Package",
		name:name,
		members:{}
	};
}
function registerMember(type,name,current){
	var fullName = combineTypeNames("_root_",current.scope)
	var destination = typeRegistry[fullName].members;
	if(destination[name] != null){
		current.printLine(AstUtil.FindTokens(current.tree.children,"ID"),"Attempt to redefine symbol '"+name+"' in scope '"+fullName+"'")
	}
	destination[name] = {
		type:type,
		name:name
	}
}

function combineTypeNames(){
	var args = Array.prototype.slice.call(arguments)
	var name = args.filter(function(arg){return arg != ""})
	return name.join(".")
}

var typeBuilder = AstUtil.TreeWalker({
  Def:function(metadata,name,isOperator,argDeclarations,type,current){ registerMember("Def", name, current) },
  Val:function(metadata,name,current){ registerMember("Val", name, current) },
  Var:function(metadata,name,current){ registerMember("Var", name, current) },
  Package:function(name,recurse,current){ registerPackage(name, current) },
  Class:function(metadata,name,argDeclarations,extendsList,recurse,current){ registerClass("Class", name, current) },
  CaseClass:function(metadata,name,argDeclarations,extendsList,recurse,current){ registerClass("CaseClass", name, current) },
  Object: function(metadata,name,argDeclarations,extendsList,recurse,current){ registerClass("Object", name, current) },
  CaseObject: function(metadata,name,argDeclarations,extendsList,recurse,current){ registerClass("CaseObject", name, current) },
  Trait: function(metadata,name,argDeclarations,extendsList,recurse,current){ registerClass("Trait", name, current) },
})


var args = process.argv.slice(2)
var command = args[0] || "test";

var commands = {
	"test":							RunParseTests,
	"walk":							RunWalkTests,
	
	"types":						RunTypes,
	"ast":							PrintAst,
	
	"to-rescripted":		PrintNormalizedCode,
	"to-javascript":		ConvertToJavascript,
		
	"parse-rescripted":	RunIdentityParseTests,
	"parse-javascript":	ConvertToJavascriptAndParse	
}

if(commands[command] == null){
	var available = Object.keys(commands);
	println("Unknown command: "+command)
	println("Available commands: \n\t"+ available.join("\n\t"))
} else {
	return commands[command](args)
}




function ConvertToJavascript(args){
	var converter = ToJavascript.Create()
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		converter.Walk(tree,source)
	},function(){
		converter.PrintCode();
	})	
}


function ConvertToJavascriptAndParse(args){
	var index = 0;
	test("../src/test/resources/grammar-tests", args.slice(1),
		function(tree,source){
			var converter = ToJavascript.Create({parseOnly:true})
			converter.Walk(tree,source)
			var code = converter.GetCode();
			var file = "./temp.parse."+(index++)+".js";
			
			try{
				fs.writeFileSync(file,code,'utf8')
				require(file)
			} catch (e) {
				throw e.message;
			} finally {
				try{ module.unCacheModule(file); } catch(e) {}
				fs.unlinkSync(file)
			}
		},function(){
			
		}
	)	
}

function RunParseTests(args){ test("../src/test/resources/grammar-tests", args.slice(1)) }

function RunWalkTests(args){ test("../src/test/resources/grammar-tests", args.slice(1),walk) }

function PrintNormalizedCode(args){
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		ToRescripted.CreateTreeWalker()(tree,source)
	},function(){
		ToRescripted.PrintCode();
	})
}

function RunTypes(args){
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		typeBuilder(tree,source)
		println("typeRegistry")
		println(typeRegistry)
	})
}
function PrintAst(args){ test("../src/test/resources/grammar-tests", args.slice(1),AstUtil.PrintAst) }

function RunIdentityParseTests(args){
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		ToRescripted.CreateTreeWalker()(tree,source)
		var firstPass = ToRescripted.GetCode()
		var parseResult = AstUtil.RescriptedParse(firstPass)
		ToRescripted.CreateTreeWalker()(parseResult.tree,firstPass)
		var secondPass = ToRescripted.GetCode()
		
		if(secondPass != firstPass)
			throw "Identity parse failed";
		
	})
}
