var AstUtil = require("./RescriptedAstUtil.js");
var println = AstUtil.println;

var code = {
	currentIndent:0,
	buffer: [],
	push:function(code){
		//this.write("\n")
		this.print(code)
		//this.write("\n")
		this.currentIndent++;
	},
	indent:function(){
		var spaces = this.currentIndent * 2
		this.write("\n"+Array(spaces + 1).join(" "))		
	},
	print:function(code){
		this.indent();
		this.write(code);
	},
	write:function(code){ this.buffer.push(code) },
	pop:function(code){
		this.currentIndent--;
		this.print(code)
		//this.write("\n")
	},
	toString:function(){return this.buffer.join("")}
}


function PrintObjectValues(values,current){
	values.forEach(function(entry,index){
		code.indent()
		code.write(entry.key)
		code.write(":")
		current.walk(entry.value)
		if(index < values.length - 1)
			code.write(",")
	})
}

function PrintStatements(statements, current){
	statements.forEach(function(child){
		code.indent()
		current.walk(child)
		code.write(";")
	})
}

function PrintComprehension(type,comprehension,isYield,body,current){
	if(comprehension.length == 1){
		code.write(type+"( ")
		comprehension.forEach(function(item){
			
			item.names.forEach(function(name){
				current.context.variables.put(name,"comprehension")
			})
			
			code.write(item.names.join(", "))
			code.write(" <- ")
			current.walk(item.expr);	
		})
		code.write(" ) ")
		if(isYield)
			code.write("yield ")
		current.walk(body)
	} else {
		code.push(type+"( ")
		comprehension.forEach(function(item){
			code.indent()
			if(item.guard){
				code.write("if ")
				current.walk(item.guard);
			} else {
				code.write(item.names.join(", "))
				code.write(" <- ")
				current.walk(item.expr);
			}
			code.write(";")	
		})
		code.pop(") ")
		if(isYield)
			code.write("yield ")
		current.walk(body)
	}
}

var expressionWalker = {
	Return:function(current){
		code.write("return")
		if(current.nodes.length > 0)
			code.write(" ")
		current.recurse()
	},
	Throw:function(current){
		code.write("throw ")
		current.recurse()
	},
  Expr:function(chain,current){
  	
    current.recurse()
    chain.forEach(function(item){
			if(item.select){
				code.write(".")
				code.write(item.select)
			} else if(item.bind){
				item.bind.forEach(function(binding){
					code.write("#")
					if(binding.expr){
						code.write("(")
						current.walk(binding.expr)
						code.write(")")
					} else if(binding.property) {
						code.write(binding.property)
					}
				})
			} else if (item.invoke) {
   			code.write("(");
				item.invoke.forEach(function(child,index){
					if(index > 0)
						code.write(", ")
					if(index == item.invoke.length - 1 && item.varargs)
						code.write("...")
					current.walk(child)

				})
				code.write(")");
			} else if (item.named) {
				code.push("(")
				PrintObjectValues(item.named,current)
				code.pop(")")
			} else if (item.namedSpread){
				code.write("(:")
				current.walk(item.namedSpread)
				code.write(")")
			}
    })
  },
  Id:function(id,current){
  	code.write(id)
  },
  Symbol:function(id,current){
  	code.write("#");
  	code.write(id)
  },
  This:function(id,current){
  	code.write("this")
  },
  Group:function(current){
    code.write("(")
    current.recurse()
    code.write(")")
  },
  Block:function(current){
  	code.push("{")
  	PrintStatements(current.nodes, current)
  	code.pop("}")
  },
  Val:function(name,current){
  	current.context.variables.put(name,"val")
  	code.print("val "+name+' = ')
  	current.recurse();
  },
  Var:function(name,current){
  	current.context.variables.put(name,"var")
  	code.print("val "+name+' = ')
  	current.recurse();
  },
  If:function(test,trueCase,falseCase,current){
  	code.write("if( ")
  	current.walk(test)
  	code.write(" ) ")
  	current.walk(trueCase)
  	if(falseCase != null){
  		code.write(" else ")
  		current.walk(falseCase)
  	}
  },
  While:function(condition,body,current){
  	code.write("while( ")
  	current.walk(condition)
  	code.write(" ) ")
  	current.walk(body)
  },
  Do:function(body,condition,current){
  	code.write("do ")
  	current.walk(body)
  	code.write(" while( ")
  	current.walk(condition)
		code.write(" )")  	
  },
  For:function(comprehension,isYield,body,current){
		PrintComprehension("for",comprehension,isYield,body,current)
  },
  Try:function(comprehension,isYield,body,catchExpr,finallyExpr,current){
  	if(comprehension){
  		PrintComprehension("try",comprehension,isYield,body,current)	
  	} else {
  		code.write("try ")
  		current.walk(body)
  	}
  	
  	if(catchExpr != null){
  		code.indent();
  		code.write("catch ")
  		current.walk(catchExpr)
  	}
  	
  	if(finallyExpr != null){
  		code.indent();
  		code.write("finally ")
  		current.walk(finallyExpr)
  	}
  },
  Eq: function(current){
//  	if(AstUtil.TokenName(current.tree.children[0].token) == "ID" && current.context.variables.get(current.tree.children[0].getText()) == "val")
//  		current.println(current.tree.children[0],"Attempt to assign to a val")
  		
  	current.recurse(0)
  	code.write(" = ")
  	current.recurse(1)
  },
  Unary:function(op,current){
  	code.write(op)
  	current.recurse()
  },
  Operator:function(op,current){
    current.recurse(0)
    code.write(" "+op+" ")
    current.recurse(1)
  },
  Lambda:function(args,current){
  	args.forEach(function(arg){
  		current.context.variables.put(arg,"lambda")	
  	})
  	if(current.nodes.length > 1){
			code.write("{" + args.join(", ") + "=>");
			code.push("")
			current.nodes.forEach(function(child){
				code.indent()
				current.walk(child)
				code.write(";")
			})
			code.pop("}")
  	} else {
			code.write("{" +args.join(", ") + " => ");
			current.recurse()
			code.write("}")
  	}
  },
  PartialFunction:function(cases,current){
  	code.push("{")
  	cases.forEach(function(caseStatement){
  		var block = caseStatement.body.length > 1;
  		var push = block? code.push : function(x){code.indent();code.write(x)};
  		var pop = block? code.pop : function(x){code.write(x);};
  		push.call(code,"case ")
  		
  		function processPattern(pattern){
  			switch(pattern.type){
  				case "extractor":
  					code.write(pattern.name+"@"+pattern.extractor+"(")
  					pattern.patterns.forEach(function(p,index){
  						if(index > 0)
  							code.write(", ")
  						if(index + 1 == pattern.patterns.length && pattern.varargs)
  							code.write(" ... ")
  						processPattern(p);
  					})
  					
  					code.write(")");
  					break;
  				case "typed": code.write(pattern.name+":"+pattern.requiredType); break;
  				case "equals":
  					if(pattern.qualifiedId)
  						code.write("`"+pattern.qualifiedId+"`")
  					else
  						current.walk(pattern.value);
  					break;
  				case "wildcard": code.write("_"); break;
  				case "named": code.write(pattern.name); break;
  				default: code.write("???");
  			}
  		}
  		
  		processPattern(caseStatement.pattern)
  		
			if(caseStatement.guard){
				code.write(" if ")
				current.walk(caseStatement.guard)
			}
			code.write(" => ")
			if(block)
				PrintStatements(caseStatement.body, current)
			else
				current.walk(caseStatement.body)
			pop.call(code,"")
  	})
  	code.pop("}")
  },
  ObjectLiteral:function(values,current){
  	code.push("{")
  	PrintObjectValues(values,current)
  	code.pop("}")
  },
  ArrayLiteral:function(values,current){
  	code.push("[")
  	values.forEach(function(value,index){
  		code.indent()
  		current.walk(value)	
  		if(index < values.length - 1)
  			code.write(",")
  	})
  	code.pop("]")
  },
  Xml:function(value){
  	code.write(value)
  },
  Bool:function(value){
  	code.write(""+value)
  },
  Int:function(value){
    code.write(value)
  },
  Float:function(value){
    code.write(value)
  },
  Null:function(current){
    code.write("null")
  },
  String:function(value){
  	code.write(value)
  },
  Unhandled:function(tokenName,treeText,current){
  	code.write("(-> Unhandled token: "+tokenName+" text: "+treeText+" token id:"+current.tree.token.type+")")//
  }
  
}

function PrintArgDeclarations(argDeclarations){
	var buffer = [];
	argDeclarations.forEach(function(argDeclaration){
		buffer.push("(")
		argDeclaration.forEach(function(arg,index){
			if(arg.isVarArgs)
				buffer.push("...")
			buffer.push(arg.name)
			buffer.push(":")
			buffer.push(arg.typeDeclaration.toString())
			if(index < argDeclaration.length - 1)
				buffer.push(", ")
		})
		buffer.push(")")
	})
	return buffer.join("")
}

function PrintExtendsList(extendsList,current){
	
	if(extendsList.length == 0)
		return;
	
	code.write(" extends ")
	extendsList.forEach(function(baseClass,i){
		if(i != 0)
			code.write(" with ")
			
		code.write(baseClass.toString())
		
		if(i == 0 && extendsList.args){
			code.write("(");
			var args = (extendsList.args.children || []);
			args.forEach(function(child,index){
				current.walk(expressionWalker,child)
				if(index + 1 < args.length)
					code.write(", ")
			})
			code.write(")")
		}
	})
}

this.walk = AstUtil.TreeWalker({
  Def:function(metadata,name,argDeclarations,type,current){
  	var buffer = [];
  	buffer.push(PrintArgDeclarations(argDeclarations))
  	buffer.push(":")
  	buffer.push(type.toString())
  	code.print(metadata.Visibility+" def " + name + buffer.join("") + " = ")
  	if(current.nodes.length == 0)
  		code.write("???")
  	else
  		current.walk(expressionWalker)
  	code.write(";\n")
  },
  Val:function(metadata,name,current){
    code.print(metadata.Visibility+" val "+name+' = ')
    current.walk(expressionWalker)
    code.write(";\n")
  },
  Var:function(metadata,name,current){
    code.print(metadata.Visibility+" var "+name+' = ')
    current.walk(expressionWalker)
    code.write(";\n")
  },
  Expr:function(node,current){
  	code.indent()
  	current.walk(expressionWalker,node)
  	code.write(";\n")
  },
  Import:function(name,isWildcard,isNative){
  	code.print("import "+(isNative?"native ":"")+name+(isWildcard?"._":""))
  },
  Package:function(name,recurse){
  	code.print("package " + name)
  	code.push("{")
  	recurse()
  	code.pop("}")
  },
  Class:function(metadata,name,argDeclarations,extendsList,recurse,current){
  	code.print("class "+name + PrintArgDeclarations(argDeclarations))
  	PrintExtendsList(extendsList,current)
  	code.push("{")
  	recurse()
  	code.pop("}")
  },
  CaseClass:function(metadata,name,argDeclarations,extendsList,recurse,current){
  	code.print("case class "+name + PrintArgDeclarations(argDeclarations))
  	PrintExtendsList(extendsList,current)
  	code.push("{")
  	recurse()
  	code.pop("}")
  },
  Object: function(metadata,name,argDeclarations,extendsList,recurse,current){
  	code.print("object "+name + PrintArgDeclarations(argDeclarations))
  	PrintExtendsList(extendsList,current)
  	code.push("{")
  	recurse()
  	code.pop("}")
  },
  CaseObject: function(metadata,name,argDeclarations,extendsList,recurse,current){
  	code.print("case object "+ name + PrintArgDeclarations(argDeclarations))
  	PrintExtendsList(extendsList,current)
  	code.push("{")
  	recurse()
  	code.pop("}")
  },
  Trait: function(metadata,name,argDeclarations,extendsList,recurse,current){
  	code.print("trait " + name + PrintArgDeclarations(argDeclarations))
  	PrintExtendsList(extendsList,current)
  	code.push("{")
  	recurse()
  	code.pop("}")
  }
})

this.printCode = function(){ console.log(code.toString()); code.buffer = []; code.currentIndent = 0; }
this.getCode = function(){ var result = code.toString(); code.buffer = []; code.currentIndent = 0; return result;}
