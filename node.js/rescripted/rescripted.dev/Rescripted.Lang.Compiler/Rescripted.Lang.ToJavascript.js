
Rescripted("Rescripted.Lang.ToJavascript",["Rescripted.Lang.CodePrinter","Rescripted.Lang.AstUtil","Rescripted.Lang.Json"],function(CodePrinter,AstUtil,Json){

	return {
		Create:function(settings){
			settings = settings || {};
			var selectedRuntime = settings.runtime || "Rescripted.Lang.Runtime";
			
			var code = CodePrinter.Create()
			var println = AstUtil.println;
			
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
				statements.forEach(function(child, index){
					if(statements.length > 1)
						code.indent()
					
					if(index == statements.length - 1){
						var tokenName = AstUtil.TokenName(child.token)
						if(tokenName == "DEF" || tokenName == "VAL" || tokenName == "VAR")
							code.printLine(child,"Declarations aren't allowed in the final position of a statement list")
						if(tokenName != "RETURN" && tokenName != "TRY")
							code.write("return ")
					}
					
					current.walk(child)
					code.write(";")
				})
			}
			
			
			function PrintForComprehension(comprehension,isYield,body,current){
					
				function processComprehensions(remaining,currentIteratorId){
					if(remaining.length == 0){
						if(isYield)
							code.write("return ")
						current.walk(body);
						return;
					}
					var item = remaining[0];
					remaining = remaining.slice(1)
					var isLast = remaining.length == 0;
					
					if(item.guard){
						code.indent()
						//deal with map, can't return zero from map :P
						
						code.write("if(! (")
						current.walk(item.guard);
						code.write(") ) return $$$.Any.Zero("+currentIteratorId+");")
						processComprehensions(remaining,currentIteratorId)
					} else {
						var method = isYield? isLast? "Map" : "FlatMap" : "ForEach";
						code.indent()
						code.write("var "+currentIteratorId+" = ");
						current.walk(item.expr)
						code.write(";")
						code.indent();
						code.push("return $$$.Any."+method+"("+currentIteratorId+", function("+item.names.join(", ")+"){")
						processComprehensions(remaining,current.nextId())
						code.pop("})");
					}
				}
				
				code.push("(function(){");
				processComprehensions(comprehension, current.nextId())
				code.pop("})()");
			}
			
			function PrintTryComprehension(comprehension,isYield,body,catchExpr,finallyExpr,current){
					
				function processComprehensions(remaining,currentIteratorId){
					if(remaining.length == 0){
						if(isYield){
							code.indent();
							code.write("return (")
						}
						current.walk(body);
						if(isYield)
							code.write(")")
						return;
					}
					var item = remaining[0];
					remaining = remaining.slice(1)
					var isLast = remaining.length == 0;
					
					if(item.guard){
						code.indent()
						//deal with map, can't return zero from map :P
						
						code.write("if(! (")
						current.walk(item.guard);
						code.write(") ) return $$$.Any.Zero("+currentIteratorId+");")
						processComprehensions(remaining,currentIteratorId)
					} else {
						var method = isYield? isLast? "TryMap" : "TryFlatMap" : "TryForEach";
						code.indent()
						code.write("var "+currentIteratorId+" = ");
						current.walk(item.expr)
						code.write(";")
						code.indent();
						code.push("return $$$.Any."+method+"("+currentIteratorId+", function("+item.names.join(", ")+"){")
						processComprehensions(remaining,current.nextId())
						code.pop("})");
					}
				}
				
				code.push("(function(){");
				processComprehensions(comprehension, current.nextId())
				code.pop("})()");
			}
			
			var expressionWalker = {
				Return:function(current){
					
					if(!current.context.settings.hadValue("in","method"))
						current.printLine(current.tree,"'return' is only allowed in methods")
					
		
					if(current.context.settings.hadValue("in","finally"))
						current.printLine(current.tree,"'return' is not allowed in a finally block")
					
					if(current.context.settings.hadValue("in","lambda")) {
						code.write("$$$.NonLocalReturn(")
						if(current.nodes.length > 0)
							current.recurse()
						else 
							code.write("null")
						code.write(")");
					} else {
						code.write("return ")
						if(current.nodes.length > 0)
							current.recurse()
						else 
							code.write("null")
					}
		
				},
				Throw:function(current){
					code.write("throw ")
					current.recurse()
				},
				Expr:function(chain,current){
					
					//go through backwards
					chain.reverse().forEach(function(item){
						if(item.select){
							code.write("$$$.Select(")
						} else if(item.bind){
							code.write("$$$.Bind(");
						} else if (item.invoke){
							code.write("$$$.Invoke(");
						} else if (item.named){
							code.write("$$$.InvokeNamed(")
						} else if (item.namedSpread){
							code.write("$$$.InvokeNamed(")
						}
					})
					
					current.recurse()
					
					//go through forwards
					chain.reverse().forEach(function(item){
						if(item.select){
							code.write(", "+Json.encodeString(item.select)+")")
						} else if(item.bind){
							code.write(", [")
							item.bind.forEach(function(binding,index){
								if(index > 0)
									code.write(", ")
								
								if(binding.expr){
									code.write("{expr:")
									current.walk(binding.expr)
									code.write("}")
								} else if(binding.property) {
									code.write("{property:"+Json.encodeString(binding.property)+"}")
								} else {
									code.write("null")
								}
							})
							code.write("])")
						} else if (item.invoke) {
							code.write(", [")
							item.invoke.forEach(function(child,index){
								if(index > 0)
									code.write(", ")
								
								//fix this up to create varargs spread
								//if(index == item.invoke.length - 1 && item.varargs)
								//	code.write("...")
								current.walk(child)
			
							})
							code.write("])");
						} else if (item.named) {
							code.push(",{")
							PrintObjectValues(item.named,current)
							code.pop("})")
						} else if (item.namedSpread){
							//fix this up to create named parameter call...
							code.write(",")
							current.walk(item.namedSpread)
							code.write(")")
						}
					})
					
				},
				Id:function(id,current){
					if(!current.context.variables.contains(id))
						code.write(" /* non local */ ")
					code.write(id)
				},
				Symbol:function(id,current){
					code.write("$$$.Symbol("+Json.encodeString(id)+")")
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
					//this code is hokey and probably broken when annotations are present, due to declarations being nested in annotations, fix it!
					var lastNode = current.nodes[current.nodes.length - 1];
					var isDeclaration = AstUtil.FindTokens([lastNode],"VAL","VAR","DEF","ANNOTATIONS").length > 0;
					if(isDeclaration)
						current.printLine(lastNode.children[0],"Declarations aren't allowed at the end of a block");
					
					if(current.nodes.length > 1){
						code.push("(function(){")
						PrintStatements(current.nodes, current)
						code.pop("})()")
					} else {
						code.write("(function(){")
						PrintStatements(current.nodes, current)
						code.write("})()")				
					}
				},
				Val:function(name,current){
					if(current.context.variables.contains(name))
						current.printLine(current.tree,"Attempting to redefine symbol '"+name+"'");
					current.context.variables.put(name,"val")
					code.print("var /* val */ "+name+' = ')
					current.recurse();
				},
				Var:function(name,current){
					if(current.context.variables.contains(name))
						current.printLine(current.tree,"Attempting to redefine symbol '"+name+"'");
					current.context.variables.put(name,"var")
					code.print("var "+name+' = ')
					current.recurse();
				},
				If:function(test,trueCase,falseCase,current){
					code.write("( ( ")
					current.walk(test)
					code.write(" ) ? (")
					current.walk(trueCase)
					code.write(") : (")
					if(falseCase != null){
						current.walk(falseCase)
					} else {
						code.write("null")
					}
					code.write(") )");
				},
				While:function(condition,body,current){
					code.write("while( ")
					current.walk(condition)
					code.write(" ) ")
					current.walk(body)
				},
				Do:function(body,condition,current){
					code.write("do{ ")
					current.walk(body)
					code.write("} while( ")
					current.walk(condition)
					code.write(" )")
				},
				For:function(comprehension,isYield,body,current){
					PrintForComprehension(comprehension,isYield,body,current)
				},
				Try:function(comprehension,isYield,body,catchExpr,finallyExpr,current){
					code.write("(function()")
					code.push("{")
					
					code.indent()
					if(comprehension){
						PrintTryComprehension(comprehension,isYield,body,catchExpr,finallyExpr,current)	
					} else {
						
						var catchId = current.nextId();
						
						if(catchExpr != null){
							code.indent()
							code.write("var "+catchId+" = ")
							current.walk(catchExpr)
							code.write(";");
						}
						
						code.indent()
						code.write("try")
						code.push("{")
						code.indent()
						current.walk(body)
						code.pop("}")
							
						//we need to figure out how we return a value from the try body / catch body when a try is used as an expression
						
						if(catchExpr != null){
							var id = current.nextId()
							code.push("catch ("+id+") {")
							code.indent();
							code.write("if($$$.IsInstanceOf("+id+",NonLocalReturn)) throw "+id+";");
							code.indent();
							code.write("return "+catchId+"("+id+")");
							code.pop("}")
						}
						
						if(finallyExpr != null){
							code.indent();
							code.push("finally { ");
							current.walk(finallyExpr,current.context.create({in:"finally"}))
							code.pop("}")
						}
						
						//suppress the error
						if(catchExpr == null && finallyExpr == null){
							code.indent()
							code.write("catch ("+current.nextId()+"){}");
						}	
					}
					
					code.pop("})()")
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
					var builtInOps = ["+","-","/","*"];
					if(builtInOps.indexOf(op) != -1){
						current.recurse(0)
						code.write(" "+op+" ")
						current.recurse(1)	
					} else {
						code.write("$$$.Operator(")
						code.write(Json.encodeString(op))
						code.write(",")
						current.recurse(0)
						code.write(",")
						current.recurse(1)
						code.write(")")
					}
				},
				Lambda:function(args,current){
					args.forEach(function(arg){
						current.context.variables.put(arg,"lambda")	
					})
					if(current.nodes.length > 1){
						code.write("function "+current.nextId()+"(" + args.join(", ") + "){");
						code.push("")
						current.nodes.forEach(function(child){
							code.indent()
							code.write("return ")
							current.walk(child)
							code.write(";")
						})
						code.pop("}")
					} else {
						code.write("function "+current.nextId()+"(" +args.join(", ") + "){");
						PrintStatements(current.nodes, current)
						//current.recurse()
						code.write("}")
					}
				},
				PartialFunction:function(cases,current){
					code.push("$$$.PartialFunction(")
					cases.forEach(function(caseStatement,index){
						if(index > 0)
							code.write(", ")
						var block = caseStatement.body.length > 1;
						var push = block? code.push : function(x){code.indent();code.write(x)};
						var pop = block? code.pop : function(x){code.write(x);};
						caseStatement.pattern.name = caseStatement.pattern.name || current.nextId()
						var name = caseStatement.pattern.name;
						code.push("function("+name+"){")
						
						function processPattern(pattern){
							pattern.name = pattern.name || current.nextId();
							var name = pattern.name;
							switch(pattern.type){
								case "extractor":
									var extractedName = current.nextId();
									code.indent();
									code.write("var "+extractedName+" = "+pattern.extractor+".unapply("+name+");");
									code.indent();
									code.write("if("+extractedName+" == null) return null;");
		
									//ensure that each sub pattern has a name...
									pattern.patterns.forEach(function(p){ p.name = p.name || current.nextId()});
									
									pattern.patterns.forEach(function(p,index){
										code.indent();
										var isVarArgs = index + 1 == pattern.patterns.length && pattern.varargs;
										
										if(isVarArgs)
											code.write("var "+p.name+" = Array.prototype.slice.call("+extractedName+","+index+");");
										else
											code.write("var "+p.name+" = "+extractedName+"["+index+"];");
		
										processPattern(p);
									})
		
									break;
								case "typed":
									code.indent();
									//this accounts for nullability and the outer type, but no type params
									code.write("if(!$$$.IsInstanceOf("+name+","+pattern.requiredType.name+","+pattern.requiredType.nullable+")) return null;");
									break;
								case "equals":
									code.indent()
									//should use Rescripted ==, not javascript === ...
									if(pattern.qualifiedId)
										code.write("if(! ("+name+" === "+pattern.qualifiedId+") ) return null;")
									else
										code.write("if(! ("+name+" === "+pattern.value+") ) return null;")
									break;
								case "wildcard": break;
								case "named": break;
								default: code.write("???");
							}
						}
						
						processPattern(caseStatement.pattern)
						
						if(caseStatement.guard){
							code.indent();
							code.write("if(! ( ")
							current.walk(caseStatement.guard)
							code.write(" ) ) return null;")
						}
						
						push.call(code,"return function(){")
						PrintStatements(caseStatement.body, current)
						pop.call(code,"}")
						
						code.pop("}")
					})
					code.pop(")")
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
					code.write("$$$.Xml("+Json.encodeString(value)+")")
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
					code.write(Json.encodeString(value))
				},
				Unhandled:function(tokenName,treeText,current){
					code.write("(-> Unhandled token: "+tokenName+" text: "+treeText+" token id:"+current.tree.token.type+")")//
				}
				
			}
			
			function PrintArgDeclarations(argDeclarations){
				function prepareDeclaration(argDeclaration){
					var buffer = [];
					buffer.push("(")
					argDeclaration.forEach(function(arg,index){
						if(arg.isVarArgs)
							buffer.push(" /* ... */")
						buffer.push(arg.name)
						buffer.push(" /* ")
						buffer.push(arg.typeDeclaration.toString())
						buffer.push(" */ ")
						if(index < argDeclaration.length - 1)
							buffer.push(", ")
					})
					buffer.push(")")
					return buffer.join("")
				}
				
				
				if(argDeclarations.length == 0)
					return "()";
				else if (argDeclarations.length == 1)
					return prepareDeclaration(argDeclarations[0])
				
				/*
				argDeclarations.forEach(function(argDeclaration){
				})
				*/
				return "() /* unhandled multiple arg declarations */"
				
			}
			
			function PrintExtendsList(extendsList,current){
				
				if(extendsList.length == 0)
					return;
				
				
				extendsList.forEach(function(baseClass,i){
					code.write("$$$.Extend(self, ")	
					code.write(baseClass.toString())
					
					if(i == 0 && extendsList.args){
						code.write(", [");
						var args = (extendsList.args.children || []);
						args.forEach(function(child,index){
							current.walk(expressionWalker,child)
							if(index + 1 < args.length)
								code.write(", ")
						})
						code.write("]")
					}
					code.write(")")
				})
			}
			
			function CreateTreeWalker(){
				return AstUtil.TreeWalker({
					Def:function(metadata,name,isOperator,argDeclarations,type,current){
						var buffer = [];
						buffer.push(PrintArgDeclarations(argDeclarations))
						buffer.push(" /* ")
						buffer.push(type.toString())
						buffer.push(" */ ")
						code.print(" /* "+metadata.Visibility+" def */ self[" + Json.encodeString(name) + "] = function" + buffer.join("") + "{")
						if(current.nodes.length == 0)
							code.write("throw new Error('Not implemented')")
						else
							current.walk(expressionWalker)
						code.write("};\n")
					},
					Val:function(metadata,name,current){
						code.print(" /* "+metadata.Visibility+" val */ self."+name+' = ')
						current.walk(expressionWalker)
						code.write(";\n")
					},
					Var:function(metadata,name,current){
						code.print(" /* "+metadata.Visibility+" var */ self."+name+' = ')
						current.walk(expressionWalker)
						code.write(";\n")
					},
					Expr:function(node,current){
						code.indent()
						current.walk(expressionWalker,node)
						code.write(";\n")
					},
					Import:function(name,isWildcard,isNative){},
					Package:function(name,recurse){
						//code.print("package " + name)
						//code.push("{")
						recurse()
						//code.pop("}")
					},
					Class:function(metadata,name,argDeclarations,extendsList,recurse,current){
						GenerateRegisterClass("class",name,argDeclarations, extendsList, {}, recurse, current)
					},
					CaseClass:function(metadata,name,argDeclarations,extendsList,recurse,current){
						GenerateRegisterClass("class",name,argDeclarations, extendsList, {}, recurse, current)
					},
					Object: function(metadata,name,argDeclarations,extendsList,recurse,current){
						GenerateRegisterClass("object",name,argDeclarations, extendsList, {}, recurse, current)
					},
					CaseObject: function(metadata,name,argDeclarations,extendsList,recurse,current){
						GenerateRegisterClass("object",name,argDeclarations, extendsList, {}, recurse, current)
					},
					Trait: function(metadata,name,argDeclarations,extendsList,recurse,current){
						GenerateRegisterClass("trait",name,argDeclarations, extendsList, {}, recurse, current)
					}
				})
			}
			
			function GenerateRegisterClass(type,name,argDeclarations, extendsList, typeDescription, recurse, current){
				var mangledName = "$$$"+name+"$"+type+"$ctor"
				
				code.print("function " + mangledName + PrintArgDeclarations(argDeclarations))
				code.push("{")
				PrintExtendsList(extendsList,current)
				code.indent("var self = this;")
				recurse()
				code.pop("}")
				code.print("$$$.RegisterClass("+JSON.stringify(typeDescription)+", "+mangledName+");");		
			}
			
			function PrintCode(){ console.log(GetCode()); }
			function GetCode(){
				var generated = [
					"(function($$$){",
						code.getCode(),
					"})" 
				].join("\n");
				
				if(settings.parseOnly)
					return generated;
				else
					return generated+"("+selectedRuntime+");"
				
			};
				
			return {
				Walk:CreateTreeWalker(),
				PrintCode:PrintCode,
				GetCode:GetCode
			}
		}
	}
});

