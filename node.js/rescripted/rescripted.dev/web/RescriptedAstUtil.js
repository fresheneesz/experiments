var Rescripted = require("./RescriptedModules.js").Rescripted;
var RescriptedLexer = Rescripted.Lexer;
var RescriptedParser = Rescripted.Parser;
var org = Rescripted.Antlr.org;


this.println = println;
function println() {
    try {
        console.log.apply(console, Array.prototype.slice.apply(arguments))
    } catch (e) {
        try {
            if (arguments.length > 1)
                console.log("===============")
            for (var i = 0; i < arguments.length; i++)
                console.log(arguments[i]);
            if (arguments.length > 1)
                console.log("===============")
        } catch (e) {
            //console unavailable
        }
    }
}

this.RescriptedParse = function RescriptedParse(source){

  var inputStream = new org.antlr.runtime.ANTLRStringStream(source)
  var lexer = new RescriptedLexer(inputStream)
  var tokenStream = new org.antlr.runtime.CommonTokenStream(lexer)

  var parseErrors = 0
  
  //stupid global variable
  input = tokenStream;
  
  var parser = new RescriptedParser(tokenStream)
  lexer.emitErrorMessage = parser.emitErrorMessage = function(msg){throw new Error(msg)}//function(msg){println(msg)}
  //displayRecognitionError: function(tokenNames, e) {
  //getErrorMessage: function(e, tokenNames) {
  //getNumberOfSyntaxErrors: function() {
  //reportError: function(e) {
  //displayRecognitionError: function(tokenNames, e) {
  
/*
  parser.getErrorHeader = function(e) {
        // handle null input 
        if (!org.antlr.lang.isNumber(e.line)) {
            e.line = 0;
        }
        println("getErrorHeader",Object.keys(e))
        printCurrentLine(source.split(/\r?\n/),e.token)("Parse error")
        return "!!line "+e.line+":"+e.charPositionInLine;
  }
  */
	lexer.displayRecognitionError = parser.displayRecognitionError = function(tokenNames, e) {
		parseErrors++
		/*
		var hdr = this.getErrorHeader(e),
				msg = this.getErrorMessage(e, tokenNames);
		this.emitErrorMessage(hdr+" "+msg);
		*/
		//println("keys",Object.keys(e))
    printCurrentLine(source.split(/\r?\n/),e.token || e.input || e)("Parse error: " + this.getErrorMessage(e, tokenNames))
		
	}

  var r = parser.program();
  
  if(parseErrors > 0)
  	throw parseErrors+" parse error(s)."
  
  //var nodes = new org.antlr.runtime.tree.CommonTreeNodeStream(r.getTree());
  //nodes.setTokenStream(tokenStream);
  
  return r;
}


this.PrintAst = function(tree){
	var depth = 0;
	printNode(tree)

	function printNode(node){
		
		var hasChildren = node.children && node.children.length > 0;
		var name = node.token == null? "Unknown":TokenName(node.token);
		var text = [name,node.getText()].filter(function(value){return value != null && value != ""}).join(": ");
		var indent = Array(depth + 1).join("  |")
		
		println(indent+"-"+text)
		
		if(hasChildren){	
			//println(indent+"  |")
			depth++;
			node.children.forEach(printNode);
			depth--;
		}

	}
}

var tokenNames = {}
Object.keys(RescriptedLexer).map(function(key){
	if(typeof RescriptedLexer[key] == "number") tokenNames[RescriptedLexer[key]] = key;
})

this.TokenName = TokenName;
function TokenName(token){
	if(typeof token == "number")
		return tokenNames[token] || "UNKNOWN";
	return tokenNames[token.type] || "UNKNOWN";
}

this.FindTokens = this.IncludeTokens = IncludeTokens;
function IncludeTokens(nodes){
	var types = Array.prototype.slice.call(arguments,1).map(function(name){return RescriptedLexer[name]});
	return nodes.filter(function(node){
		if(node == null || node.token == null)
			return false;
		return types.indexOf(node.token.type)!=-1
	})
}

this.ExcludeTokens = ExcludeTokens;
function ExcludeTokens(nodes){
	var types = Array.prototype.slice.call(arguments,1).map(function(name){return RescriptedLexer[name]});
	return nodes.filter(function(node){
		if(node == null || node.token == null)
			return true;
		return types.indexOf(node.token.type)==-1
	})
}

function findFirstToken(tree){
	if(tree == null)
		return null
	if(Array.isArray(tree))
		return findFirstToken(tree[0])
	return tree;
}

function isFunction(functionToCheck) { return functionToCheck && {}.toString.call(functionToCheck) == '[object Function]'; }

function tokenInfo(lines){
	return function(token){
		try{
			if(token == null)
				return null;

			var lineNumber = (token.getLine() || 1) -1
			return {
				//index: token.getTokenIndex(),
				text: token.getText? token.getText() : "",
				type: token.getType? token.getType() : -1,
				charPositionInLine: token.getCharPositionInLine() || 0,
				lineNumber: lineNumber,
				line: lines[lineNumber]
			}
		} catch(e) {
			println("Error getting token info",e)
			return null
		}
	}
}

function idGenerator(){
	var id = 0;
	return function nextId(){
		return "__"+(++id)+"";
	}
}

function printCurrentLine(lines,nodes){
	return function(message){
		
		if(message)
			println(message)
		
		var token = findFirstToken(nodes)
		var info = tokenInfo(lines)(token)
		if(info == null){
			println("No information available for this line")
			println()
			return;
		}
		
		var emptyLine = info.line.replace(/[^\t]/g," ");
		var charPosition = info.charPositionInLine
		var indicator = "^";
		if(info.text && info.text.length > 1)
			indicator = Array(info.text.length + 1).join("^")
		
		println("Line #"+(info.lineNumber+1)+", char #"+(charPosition+1))
		println(info.line);
		println(emptyLine.substr(0, charPosition) + indicator)
		println()
		
		
	}
}


this.ExpressionWalker = ExpressionWalker;
function ExpressionWalker(visitor){
	var tokens = RescriptedLexer;
	var lines = null
	var nextId = idGenerator()
	
	return function(tree,_lines,context){
		lines = _lines;
		Walk(tree,context || {})
	}
	function Walk(tree,context){
		if(tree == null){
			println("Warning!!!! You can't pass null to walk")
			tree.token == null;
			return;
		} else if(Array.isArray(tree)){
      return tree.map(function(x){return Walk(x,context)});
      return;
    } else if(tree.token == null) {
      return Walk(tree.children || [],context);
    }
    function Text(index,nodes){ return (nodes || tree.children)[index].getText() }
		function Visit(type,newContext,node){
    	if(!visitor[type])
    		return;
    	var args = Array.prototype.slice.call(arguments,3)
    	
    	//node = node || tree;
    	var nodes = (Array.isArray(node)? node : node.children) || [];
    	
    	args.push({
    		context: newContext || context,
    		nextId: idGenerator(),
    		tree: tree,
    		nodes: nodes,
    		lines: lines,
    		tokenInfo: tokenInfo(lines),
    		printCurrentLine: printCurrentLine(lines,nodes),
    		printLine:function(token,message){printCurrentLine(lines,token)(message)},
    		recurse: function(index){ return index == null ? Walk(nodes,newContext || context) : Walk(nodes[index],newContext || context) },
    		walk:function(n){return Walk(n,newContext || context)}
    	})
    	return visitor[type].apply(visitor,args);
    }
    
    function isWildcard(x){
    	if(x == null)
    		return false;
    	return x.token.type == tokens.WILDCARD || 
    					(
    						x.token.type == tokens.EXPR &&
    						x.children &&
    						x.children.length == 1 &&
    						x.children[0].token.type == tokens.WILDCARD
    					)
    }
    
    function fillArray(length,value){
    	var result = []
    	for(var i=0;i<length;i++)
    		result.push(value)
    	return result;
    }
    
    function createNode(type,text){
    	var children = Array.prototype.slice.call(arguments,2)
    	while(children.length == 1 && Array.isArray(children[0]))
    		children = children[0]
    	
    	function getText(){return text}
    	return {
    		tokenName: TokenName(type),
    		tokenText: text,
    		children:children,
    		getText:getText,
    		generated:true,
    		token:{
    			type:type,
    			getText:getText
    		}
    	}
    }
    
    function ObjectPairs(tree){
    	return (tree.children || []).map(function(pair){
				return {key:pair.children[0].getText(),value:pair.children[1]}	
			});
    }
    
    function PrepareComprehension(comprehension){
			return comprehension.children.map(function(child){
				switch(child.token.type){
					case tokens.FOR_IN:
						return {
							names:IncludeTokens(child.children,"ID").map(function(n){return n.getText()}),
							expr:child.children.slice(-1)[0]
						}
					case tokens.GUARD:
						return { guard: child.children[0] }
				}
			})
		}
    
		switch(tree.token.type){
			case tokens.ANNOTATIONS: 
				//println("annotations: ",tree)
				//DO SOMETHING WITH THESE ANNOTATIONS
				return Walk(tree.children[tree.children.length-1],context);
			case tokens.EXPR:
				
				var expr = tree.children[0];
				var exprChain = tree.children.slice(1);
				
				var wildcards = (isWildcard(expr)? 1:0);
				var argumentLists = exprChain.filter(function(x){return x.token.type == tokens.ARGUMENT_LIST});
				argumentLists.forEach(function(x){
					wildcards += (x.children || []).filter(isWildcard).length;
				});

				var isLambda = wildcards > 0;
				
				if(isLambda){
					var generatedArgs = []
					
					var body = createNode(tokens.EXPR,null,
						(tree.children).map(function(child){
							if(child == null)
								return null;
							if(isWildcard(child)){
								var id = nextId()
								generatedArgs.push(id)
								return createNode(tokens.ID,id)
							}
							if(child.token.type == tokens.ARGUMENT_LIST){
								return createNode(tokens.ARGUMENT_LIST,null,
									(child.children || []).map(function(childArg){
										if(childArg == null)
											return null;
										if(isWildcard(childArg)){
											var id = nextId()
											generatedArgs.push(id)
											return createNode(tokens.ID,id) 
										}
										return childArg;
									})
								)
							}
							return child;
						})
					)
					var args = createNode(tokens.ARGUMENT_DECLARATION,null,generatedArgs.map(function(name){return createNode(tokens.ID,name)}))
					
					var lambdaNode = createNode(tokens.LAMBDA,null,args,body)
					return Walk(lambdaNode,context)
				}
				
				var chain = exprChain.map(function(node){
					switch(node.token.type){
						case tokens.DOT: return {select:node.children[0].getText()};
						case tokens.BINDING:
							return {
								bind: node.children.map(function(binding){
									switch(binding.token.type){
										case tokens.BIND_EXPRESSION: return {expr:binding.children[0]};
										case tokens.BIND_PROPERTY: return {property:binding.children[0].getText()};
										case tokens.POUND: return {};
										default:
											println("Unknown binding:",TokenName(binding.token.type),binding.getText(),binding);
											return {unknown:binding,name:TokenName(binding.token)};
									}
								})
							}
						case tokens.OBJECT_LITERAL:
							return {named:ObjectPairs(node)};
						case tokens.ARGUMENT_LIST:
							return {invoke:ExcludeTokens(node.children || [],"VARARGS"), varargs:IncludeTokens(node.children || [],"VARARGS").length > 0};
						case tokens.COLON:
							return {namedSpread:node.children[0]};						
						default:
							println("Unknown chain type:",TokenName(node.token.type),node.getText(),node);
							return {unknown:node,name:TokenName(node.token)};
					}
				})
				return Visit("Expr",null,tree.children.slice(0,1),chain);
			case tokens.GROUP: return Visit("Group",null,tree);
			case tokens.BLOCK: return Visit("Block",null,tree);
					
			case tokens.VAL: return Visit("Val",null,tree.children.slice(1),Text(0));
			case tokens.VAR: return Visit("Var",null,tree.children.slice(1),Text(0));
				
			case tokens.EQ: return Visit("Eq",null,tree);

			case tokens.EXCLAMATION: case tokens.PLUS: case tokens.MINUS: case tokens.DIV: case tokens.STAR: case tokens.MOD:
			case tokens.OPERATOR:
				
				if(tree.children.length == 1){
					if(isWildcard(tree.children[0])){
						var id = nextId()
						return Walk(
							createNode(tokens.LAMBDA,null,
								createNode(tokens.ARGUMENT_DECLARATION,null,createNode(tokens.ID,id)),
								createNode(tokens.EXPR,null,
									createNode(tree.token.type,tree.getText(),createNode(tokens.ID,id))
								)
							),
							context
						);
					}
					return Visit("Unary",null,tree,tree.getText());
				} else {
					//TODO: enable lambda detection for one level deep on binary operations
					var wildcards = (isWildcard(tree.children[0])?1:0) + (isWildcard(tree.children[1])?1:0)
					if(wildcards > 0){
						var idA = null
						var idB = null
						var expr = createNode(tokens.EXPR,null,
									createNode(tree.token.type,tree.getText(),
										isWildcard(tree.children[0])? createNode(tokens.ID,idA = nextId()) : tree.children[0], 
										isWildcard(tree.children[1])? createNode(tokens.ID,idB = nextId()) : tree.children[1]
									)
								)
						var ids = [idA,idB].filter(function(id){return id != null})
						
						return Walk(
							createNode(tokens.LAMBDA,null,
								createNode(tokens.ARGUMENT_DECLARATION,null,ids.map(function(id){return createNode(tokens.ID,id)})),
								expr
							),
							context
						);
					}
					return Visit("Operator",null,tree,tree.getText())
				}
				
			case tokens.IF: return Visit("If",null,tree,tree.children[0],tree.children[1],tree.children[2]);
				
			case tokens.WHILE: return Visit("While",null,tree,tree.children[0],tree.children[1]);
			case tokens.DO: return Visit("Do",null,tree,tree.children[0],tree.children[1]);
				
			case tokens.FOR:
				var children = tree.children;
				var expr = children[children.length - 1];
				var isYield = children[children.length-2].token.type == tokens.YIELD
				var comprehension = PrepareComprehension(children[0])
				return Visit("For",null,tree,comprehension,isYield,expr);
				
			case tokens.TRY:
				var children = tree.children;
				var comprehension = IncludeTokens(children,"COMPREHENSION_BODY").map(PrepareComprehension)[0];
				var isYield = IncludeTokens(children,"YIELD").length > 0;
				var catchExpr = IncludeTokens(children,"CATCH").map(function(x){return x.children[0]})[0];
				var finallyExpr = IncludeTokens(children,"FINALLY").map(function(x){return x.children[0]})[0];
				var body = ExcludeTokens(children,"COMPREHENSION_BODY","YIELD","CATCH","FINALLY")[0];
				return Visit("Try",context.create({in:"try"}),tree,comprehension,isYield,body,catchExpr,finallyExpr);
				
			case tokens.LAMBDA:
				var argsDeclarations = tree.children.filter(function(child){ return child.token.type == tokens.ARGUMENT_DECLARATION});
				var args = ((argsDeclarations.length > 0)? argsDeclarations[0].children || [] : []).map(function(arg){return arg.getText()});
				var statements = tree.children.filter(function(child){ return child.token.type != tokens.ARGUMENT_DECLARATION})
				return Visit("Lambda",context.create({in:"lambda"}),statements,args);
				
			case tokens.PARTIAL_FUNCTION:
				var cases = tree.children.map(function(caseStatement){
					var guard = IncludeTokens(caseStatement.children,"GUARD")[0];
					if(guard != null)
						guard = guard.children[0]
					
					function preparePattern(pattern){
						switch(pattern.token.type){
							case tokens.EXTRACTOR_PATTERN:
								return {
									type: "extractor",
									name: IncludeTokens(pattern.children,"ID").map(function(id){return id.getText()})[0] || nextId(),
									extractor: Id(IncludeTokens(pattern.children,"QUALIFIED_ID")[0]),
									patterns: IncludeTokens(pattern.children,"EXTRACTOR_PATTERN","TYPED_PATTERN","EQUALS_PATTERN","WILDCARD","NAME_PATTERN").map(preparePattern),
									varargs:IncludeTokens(pattern.children,"VARARGS").length > 0
								}
							case tokens.TYPED_PATTERN: return {type:"typed",name:IncludeTokens(pattern.children,"ID")[0].getText(),requiredType:Type(IncludeTokens(pattern.children,"TYPE")[0]).toString()};
							case tokens.EQUALS_PATTERN: return {type:"equals", name:nextId(), value:pattern.children[0], qualifiedId:pattern.children[0].token.type == tokens.QUALIFIED_ID? Id(pattern.children[0]) : null}
							case tokens.WILDCARD: return {type:"wildcard", name:nextId()}
							case tokens.NAME_PATTERN: return {type:"named", name:Text(0,pattern.children)}
							default: throw new Error("Unhandled pattern")
						}
					}
					
					return {
						guard:guard,
						pattern:IncludeTokens(caseStatement.children,"EXTRACTOR_PATTERN","TYPED_PATTERN","EQUALS_PATTERN","WILDCARD","NAME_PATTERN").map(preparePattern)[0],
						body:ExcludeTokens(caseStatement.children,"EXTRACTOR_PATTERN","TYPED_PATTERN","EQUALS_PATTERN","WILDCARD","NAME_PATTERN","GUARD")
					};
				});
				
				return Visit("PartialFunction",null,tree,cases);
				
			case tokens.OBJECT_LITERAL:
				var pairs = ObjectPairs(tree)
								
				return Visit("ObjectLiteral",null,tree,pairs);
				
			case tokens.ARRAY_LITERAL:
				return Visit("ArrayLiteral",null,tree,tree.children || []);
			
			case tokens.RETURN: return Visit("Return",null,tree);
			case tokens.THROW: return Visit("Throw",null,tree);
				
			case tokens.XML_ELEM: return Visit("Xml",null,tree,tree.getText());
			case tokens.ID: return Visit("Id",null,tree,tree.getText());
			case tokens.POUND: return Visit("Symbol",null,tree,tree.children[0].getText());
			case tokens.NULL: return Visit("Null",null,tree);
			case tokens.THIS: return Visit("This",null,tree);
			case tokens.SELF: return Visit("This",null,tree);
			case tokens.FALSE: return Visit("Bool",null,tree,false);
			case tokens.TRUE: return Visit("Bool",null,tree,true);
			case tokens.HEX_INT:
			case tokens.INT:
				return Visit("Int",null,tree,tree.getText());

			case tokens.FLOAT: return Visit("Float",null,tree,tree.getText());
			case tokens.STRING: return Visit("String",null,tree,tree.getText());
				
			default:
				return Visit("Unhandled",null,tree,TokenName(tree.token),tree.getText())
		}
	}
}

function Type(node){
	if(node == null)
		return {name:"Any",params:[],nullable:true, toString:function(){return "Any"}}
	return {
		name:Id(node.children[0]),
		params:IncludeTokens(node.children,"TYPE").map(Type),
		nullable:IncludeTokens(node.children,"EXCLAMATION").length == 0,
		toString:function(){
			var buffer = [];
			buffer.push(this.name)
			if(this.params.length > 0){
				buffer.push("[")
				buffer.push(this.params.map(function(p){return p.toString()}).join(", "))
				buffer.push("]")
			}
			if(this.nullable == false)
				buffer.push("!")
			return buffer.join("")
		}
	}
}

function Id(node){
	if(node.token.type == RescriptedLexer.QUALIFIED_ID)
		return node.children.map(function(n){return n.getText()}).join(".")
	return node.getText()
}

function ScopedContext(dataSource,parent){
	var data = dataSource || {};
	var self = {
		get:function(key){
			if(data.hasOwnProperty(key))
				return data[key]
			
			if(parent != null)
				return parent.get(key);
			
			return null;
		},
		put:function(key, value){
			data[key] = value;
		},
		contains:function(key){
			if(data.hasOwnProperty(key))
				return true
			
			if(parent != null)
				return parent.contains(key);
			
			return false;
		},
		hasValue:function(key,value){
			return get(key) == value;
		},
		hadValue:function(key,value){
			if(data[key] == value)
				return true;
			
			if(parent != null)
				return parent.hadValue(key,value)
			
			return false;
		},
		create:function(dataSource){
			return ScopedContext(dataSource || {},self);
		}
	};
	return self;
}

function TreeContext(settings,parent){
	var self = {
		settings:ScopedContext(settings,parent == null? null : parent.settings),
		variables:ScopedContext({},parent == null? null : parent.variables),
		create:function(newSettings){
			return TreeContext(newSettings || {}, self);
		}
	}
	
	return self;
}

this.TreeWalker = function TreeWalker(visitor){
  var tokens = RescriptedLexer;
  var lines = []
  return function(tree,source){
  	lines = source.split(/\r?\n/);
  	Walk(tree,TreeContext())
  }
  
  function Walk(tree,context,metadata,parent,imports,scope){
  	imports = imports  || []
  	scope = scope || ""
  	
    if(Array.isArray(tree)){
      return tree.map(function(t){return Walk(t,context,metadata,parent,imports,scope)});
    } if(tree.token == null) {
      return (tree.children || []).map(function(t){return Walk(t,context,metadata,parent,imports,scope)});
    }
    
    function Scope(name){
    	if(!scope)
    		return name;
    	return scope+"."+name
    }
    
    function Metadata(){
      var visibilityModifierTokens = [tokens.PUBLIC,tokens.PRIVATE,tokens.PROTECTED]
      var modifierTokens = visibilityModifierTokens.concat([tokens.OVERRIDE,tokens.FINAL,tokens.NATIVE])
      
      function contains(values){
        return function(node){
          if(node == null || node.token == null)
            return false;
          return values.indexOf(node.token.type) != -1
        }
      }
      function not(func){ return function(value){ return !func(value) } }
      
      //check for duplicate modifier tokens
      
      //check for multiple visibility tokens
      var visibilityModifiers = metadata.filter(contains(visibilityModifierTokens))
      if(visibilityModifiers.length > 1)
        throw new Error("Only one visibility modifier is allowed at a time")
      
      var modifiers = metadata.filter(contains(modifierTokens)).map(function(n){return TokenName(n.token)});
      return {
        Annotations: metadata.filter(not(contains(modifierTokens))).map(function(annotation){return {Name:Id(annotation.children[0]),Parameters:annotation.children[1]}}),
        Visibility: (visibilityModifiers.map(function(n){return TokenName(n.token)})[0] || "PUBLIC").toLowerCase(),
        Native: modifiers.indexOf("NATIVE") != -1,
        Final: modifiers.indexOf("FINAL") != -1,
        Override: modifiers.indexOf("OVERRIDE") != -1
      };
    }
    
    function Text(index,nodes){ return (nodes || tree.children)[index].getText() }
    function Visit(type,newContext,node){
    	if(!visitor[type])
    		return;
    	var args = Array.prototype.slice.call(arguments,3)
    	var nodes = (Array.isArray(node)? node : node.children) || [];
    	var walker = null;
    	args.push({
    		scope: scope,
    		imports: imports,
    		nextId: idGenerator(),
    		tree: tree,
    		nodes:nodes,
    		lines: lines,
    		tokenInfo: tokenInfo(lines),
    		printCurrentLine: printCurrentLine(lines,tree),
    		printLine:function(token,message){printCurrentLine(lines,token)(message)},
    		walk:function(visitor, node){
    			//println("scope",scope,"imports",imports)
    			if(visitor)
    				walker = ExpressionWalker(visitor, lines)
    			return walker(node || nodes, lines, newContext || context)
    		},
    		recurse:function(subTree){
    			return walker(subTree, lines, newContext || context)
    		}
    		
    	})
    	return visitor[type].apply(visitor,args);
    }
     
    function VisitClass(type,children){
			var isCase = IncludeTokens(children,"CASE").length > 0; 
			var name = Text(0,IncludeTokens(children,"ID"))
			var newScope = Scope(name)
			var extendsClause = IncludeTokens(children,"EXTENDS")
			var argumentDeclarations = IncludeTokens(children,"ARGUMENT_DECLARATION").map(PrepareArgumentDeclaration)
			var extendsList = [];
			if(extendsClause.length > 0){
				extendsClause[0].children.forEach(function(child){
					switch(child.token.type){
						case tokens.TYPE:
							extendsList.push(Type(child))
							break;
						case tokens.ARGUMENT_LIST:
							extendsList.args = child;
							break;
					}
				})
			}
			return Visit(isCase?"Case"+type:type,context.create({in:"class"}),tree,Metadata(),name,argumentDeclarations,extendsList,function recurse(){
				Walk(ExcludeTokens(children,"CASE","ID","ARGUMENT_DECLARATION","EXTENDS"),context,null,tree,imports.concat({name:newScope,wildcard:true}),newScope);			
			})
    }
    
    function PrepareArgumentDeclaration(node){
    	var nodes = (node.children || [])
    	var isVarArgs = IncludeTokens(nodes,"VARARGS").length > 0;
    	var args = ExcludeTokens(nodes,"VARARGS");
			return args.map(function(arg,index){
				var data = arg.children || []
				switch(arg.token.type){
					case tokens.ARGUMENT_DEFINITION:
						return {
							name: Text(0,IncludeTokens(data,"ID")),
							defaultValue: IncludeTokens(data,"EXPR")[0],
							isVarArgs: isVarArgs && index == args.length - 1,
							typeDeclaration: Type(IncludeTokens(data,"TYPE")[0])
						}
						break;
					case tokens.ID:
						return {name:Text(0,data),isVarArgs:false}
					default:
						throw new Error("Unhandled argument definition:" +TokenName(arg.token))
				}
			})
    }
    
    switch(tree.token.type){
      case tokens.ANNOTATIONS:
        return Walk(tree.children[tree.children.length-1],context,tree.children.slice(0,-1),parent,imports,scope);
 
      case tokens.VAL:
      	var children = ExcludeTokens(tree.children,"ID","TYPE")
        return Visit("Val",context.create({in:"member-val"}),children,Metadata(),Text(0));//tree.children[1]

      case tokens.VAR:
      	var children = ExcludeTokens(tree.children,"ID","TYPE")
        return Visit("Var",context.create({in:"member-var"}),children,Metadata(),Text(0));

      case tokens.DEF:
        var argDeclarations = IncludeTokens(tree.children,"ARGUMENT_DECLARATION").map(PrepareArgumentDeclaration)
        var name = IncludeTokens(tree.children,"METHOD_NAME")[0].children[0].getText()
        var type = Type(IncludeTokens(tree.children,"TYPE")[0])
        var children = ExcludeTokens(tree.children,"ARGUMENT_DECLARATION","METHOD_NAME","TYPE")
        return Visit("Def",context.create({in:"method"}),children,Metadata(),name,argDeclarations,type);

      case tokens.IMPORT:
        if(tree.children[0].token.type == tokens.NATIVE){
        	var name = Id(tree.children[1])
        	imports.push({name:name,wildcard:false})
          return Visit("Import",null,tree,name,false,true)
        } else {
        	var name = Id(tree.children[0])
        	var wildcard = tree.children.length > 1;
        	imports.push({name:name,wildcard:wildcard})
          return Visit("Import",null,tree,name,wildcard,false)
        }
        
      case tokens.PACKAGE:
      	var name = Id(tree.children[0])
      	var newScope = Scope(name)
        return Visit("Package",context.create({in:"package"}),tree,name, function recurse(){
        	Walk(tree.children.slice(1),context,null,tree,imports.concat({name:newScope,wildcard:true}),newScope);		
        });
        
      case tokens.CLASS: return VisitClass("Class",tree.children);
      case tokens.OBJECT: return VisitClass("Object",tree.children);
      case tokens.TRAIT: return VisitClass("Trait",tree.children);

      //everything else is an expression in the body of a class / package...
      default: return Visit("Expr",null,tree,tree);
    }
  }
}


