var fs = require("fs")
var path = require('path')

function load(filePath,code){eval(fs.readFileSync(path.resolve(__dirname, filePath),'utf8') + (code || ""))}
load("./antlr3-all.js")
load("./RescriptedLexer.js","this.RescriptedLexer = RescriptedLexer")
load("./RescriptedParser.js","this.RescriptedParser = RescriptedParser")
load("./RescriptedAstUtil.js")
load("./TestWalkers.js")

/*
var antlr = LoadModule("./antlr3-all.js","module.exports = org;")
console.log(antlr)
*/

/*
var walk = TreeWalker({
					Def: function(metadata,name,args,expr){println("def",name,metadata)},
					Val:function(metadata,name,expr){println("val",name,metadata)},
					Var:function(metadata,name,expr){println("var",name,metadata)},
					Import:function(name,isWildcard,isNative){println("import",name,isWildcard,isNative)},
					Package:function(name){println("package",name)},
					Class:function(metadata,name){println("class",name,metadata)},
					CaseClass:function(metadata,name){println("case class",name,metadata)},
					Object: function(metadata,name){println("object",name,metadata)},
					CaseObject: function(metadata,name){println("case object", name,metadata)}
			})
*/


function test(folder,specificFiles, walker, doFinally){
	specificFiles = specificFiles || [];
	walker = walker || function(){}
	var files = fs.readdirSync(folder)
	files.forEach(function(file){
		var extension = path.extname(file).toLowerCase()
		var name = path.basename(file,extension)
		
		if(extension == ".rescripted" && (specificFiles.length == 0 || specificFiles.indexOf(name) != -1)){
			var contents = fs.readFileSync(path.join(folder,file),'utf8')
			
			println("")
			try{
				var result = RescriptedParse(contents)
				walker(result.tree,contents,name)
				println(" + "+name)
			} catch(e) {
				println(" - "+name)
				println(e)
				println("   "+(e.stack || ""))
			}
			if(doFinally != null)
				doFinally(name)
		}
	})
}

var typeRegistry = {"_root_":{type:"Package",name:"",members:{}}};
function checkIfTypeExists(name,current){
	if(typeRegistry[name] != null){
		current.printLine(FindTokens(current.tree.children,"ID"),"Attempt to redefine symbol '"+name+"'")
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
		current.printLine(FindTokens(current.tree.children,"ID"),"Attempt to redefine symbol '"+name+"' in scope '"+fullName+"'")
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

var typeBuilder = TreeWalker({
  Def:function(metadata,name,argDeclarations,type,current){ registerMember("Def", name, current) },
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
if(command == "test")
	test("../src/test/resources/grammar-tests", args.slice(1))
if(command == "walk")
	test("../src/test/resources/grammar-tests", args.slice(1),walk)
if(command == "print")
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		walk(tree,source)
	},function(){
		printCode();
	})
if(command == "types")
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		typeBuilder(tree,source)
		println("typeRegistry")
		println(typeRegistry)
	})
if(command == "ast")
	test("../src/test/resources/grammar-tests", args.slice(1),PrintAst)
if(command == "identity-parse"){
	test("../src/test/resources/grammar-tests", args.slice(1),function(tree,source){
		walk(tree,source)
		var firstPass = getCode()
		var parseResult = RescriptedParse(firstPass)
		walk(parseResult.tree,firstPass)
		var secondPass = getCode()
		
		if(secondPass != firstPass)
			throw "Identity parse failed";
		
	})
}
