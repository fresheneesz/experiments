//rescripted-settings:{"legacy":true,"immediate":true}

import rescripted.collections._

package rescripted.lang {  
  class RescriptedToJavascript(){
    var g = RescriptedGrammar()
    
    var nameSeed = Math.round(Math.random() * 100)
    var namePrefix = "_rs"
    var nameIndex = 0;
    def nextName() = (namePrefix+nameSeed+(nameIndex++)+"_")
    var contextName = nextName();
    var provides = ArraySeq()
    var dependencies = ArraySeq()
    
    def transform(input,settings) = {
      settings = settings || {}
      
      var result = g.parse(input)
      if(!result.success)
        return "failure!"
      
      
      
      var code = match(result.output){
                  case Ast.Program(body) => processList(body)
                 };
                 
      if(settings.printGeneratedCode)
        println(code)
      if(settings.printSymbolTable)
        console.log(g.symbolsRoot)
      
      var quoted = (x => "'"+x+"'")
      return ("__rescripted.util._source(["+dependencies.map(quoted).mkString(",")+"],["+provides.map(quoted).mkString(",")+"],function(){"+
              "var self = this;"+
              "var "+contextName+" = {};with(this){with("+contextName+"){(function(){"+
              "var __rsu = __rescripted.util;"+
              "var from = __rsu.from;"+
              "var match = __rsu.match;"+
              "var typeOf = __rsu.typeOf;"+
              "var isInstanceOf = __rsu.isInstanceOf;"+
              code+
              "}).apply(__rescripted.script.root,[]);}}"+
              "},"+(settings.immediate === true)+");");
    }
    
    def load(input,settings) = (eval(transform(input,settings)))
    
    def run(input,settings) = (load(input,settings).apply(__rescripted.script.root,[]))
    
    def processList(items) = ( from(items).map(process).mkString(";\n") )
    
    def process = {
      case Ast.SimpleExpression(expr,Ast.ExpressionChain(chain)) => process(expr)+Seq.fromArray(chain).map(processExpressionChain).mkString("")
      case Ast.ReturnStatement(optExpr) => "return "+optExpr.map(process).getOrElse("")+";"
     
      case Ast.NewStatement(id,optArgs) => "new "+id+"("+processArgsList(optArgs)+")"
      case Ast.ThrowStatement(expr) => "__rsu._throw("+process(expr)+")"
      case Ast.DeleteStatement(id) => "delete "+id
      
      case Ast.ImportStatement(Seq(parts@_*)) =>{
        var packagePart = parts.take(parts.size() - 1).mkString(".")
        dependencies.push(packagePart)
        return "__rsu._import('"+packagePart+"',"+packagePart+",'"+parts.last()+"',"+contextName+")"
      }
      case Ast.PackageDeclaration(qualifiedId,body) =>
        (
          provides.push(qualifiedId),
          "__rsu._package('"+qualifiedId+"',this,function(){var self = this;with(this){(function(){"+processList(body)+"}).apply(this,[])}})"
        )
      case Ast.LambdaExpression(optArgs,optExpression) => "function("+processArgumentDeclarationList(optArgs)+"){\nreturn "+optExpression.map(process).getOrElse("null")+";\n}"
      case Ast.BinaryOperation(exprA,Ast.SimpleId(id),exprB) => process(exprA)+"."+id+"("+process(exprB)+")"
      case Ast.BinaryOperation(exprA,op,exprB) => "("+process(exprA)+" "+op+" "+process(exprB)+")"
      case Ast.UnaryOperation(operation,operand) => operation+""+process(operand)
      case Ast.ValDeclaration(id,expr) => "var "+id+" = ("+process(expr)+")"
      case Ast.VarDeclaration(id,expr) => "var "+id+" = ("+process(expr)+")"
      case Ast.MemberValDeclaration(annotations,modifiers,id,expr) => "self."+id+" = ("+process(expr)+")"
      case Ast.MemberVarDeclaration(annotations,modifiers,id,expr) => "self."+id+" = ("+process(expr)+")"
      case Ast.TripleQuotedString(value) => Json.encodeString(value)
      case Ast.SingleQuotedString(value) => "'"+value+"'"
      case Ast.DoubleQuotedString(value) => '"'+value+'"'
      case Ast.NumberLiteral(num) => num
      case Ast.BlockExpression(exprs) => processBlock(Seq.fromArray(exprs))
      case Ast.GroupExpression(expr) => "("+process(expr)+")"
      case Ast.AssignmentStatement(id,value) => id+" = "+process(value)
      case Ast.IfExpression(clause,body,optElseBody) => "(("+process(clause)+")? ("+process(body)+"):("+optElseBody.map(process).getOrElse("null")+"))"
      case Ast.ElseExpression(body) => process(body)
      case Ast.DoWhileExpression(body,clause) => "do{"+process(body)+"} while("+process(clause)+")"
      case Ast.WhileExpression(clause,body) => "while("+process(clause)+"){"+process(body)+"}"
      case Ast.ForComprehension(forIn,guards,`None`,expr) => forComprehension(forIn,guards,expr,"foreach","foreach","")
      case Ast.ForComprehension(forIn,guards,Some(y),expr) => forComprehension(forIn,guards,expr,"flatMap","map","return ")
      case Ast.TryExpression(body,`None`,`None`) => "(function(){try{ return "+process(body)+";}catch("+nextName()+"){return null;}})()"
      case Ast.TryExpression(body,optCatchHandler,optFinallyBody) => {
        var e = nextName()
        return "(function(){try{ return "+process(body)+";}" +
          optCatchHandler.map(handler => "catch("+e+"){return "+process(handler)+"("+e+");}").getOrElse("") + 
          optFinallyBody.map(finallyBody => "finally{"+process(finallyBody)+"}").getOrElse("") +
        "})()"
      }
      case Ast.ArgumentDeclaration(id,type,defaultValue) => id
      case Ast.MethodDeclaration(annotations,modifiers,id,args,Seq("???")) => "__rsu._abstractMethod('"+id+"',this,self);"
      case Ast.MethodDeclaration(annotations,modifiers,id,args,Ast.EmptyBlockExpression()) => methodDeclaration(modifiers,id,args,List(),false)
      case Ast.MethodDeclaration(annotations,modifiers,id,args,Ast.BlockExpression(statements)) => methodDeclaration(modifiers,id,args,Seq.fromArray(statements),false)
      case Ast.MethodDeclaration(annotations,modifiers,id,args,Seq(expression)) => methodDeclaration(modifiers,id,args,List(expression),true)
      
      case Ast.XmlLiteral(tag) => process(tag)
      case Ast.XmlAttribute(name,Ast.XmlRescriptedFragment(expr)) => "{name:"+Json.encodeString(name)+",value:XmlJavascriptFragment("+process(expr)+")}"
      case Ast.XmlAttribute(name,value) => "{name:"+Json.encodeString(name)+",value:("+Json.encodeString(decodeXmlEntities(value))+")}"
      case Ast.XmlEmptyElementTag(name, attrs) => "XmlElement("+Json.encodeString(name)+",["+attrs.map(process).join(",")+"],[])"
      case Ast.XmlStartEndTag(Seq(name,attrs),Seq(body)) => "XmlElement("+Json.encodeString(name)+",["+attrs.map(process).join(",")+"],["+body.map(process).join(",")+"])"
      case Ast.XmlText(text) => "XmlText("+Json.encodeString(text)+")"
      case Ast.XmlRescriptedFragment(expr) => "XmlJavascriptFragment("+process(expr)+")"
      case Ast.XmlEntityReference(ref) => "XmlText("+Json.encodeString(decodeXmlEntities("&"+ref+";"))+")"
      case Ast.XmlCData(cdata) => "XmlCdata("+Json.encodeString(cdata)+")"
      case Ast.XmlComment(comment) => "XmlComment("+Json.encodeString(comment)+")"
      
      case Ast.JsonLiteral(keyValuePairs) => Seq.fromArray(keyValuePairs).map(process).mkString("{",",","}")
      case Ast.JsonKeyValue(name,value) => ""+process(name)+":"+process(value)
      case Ast.ArrayLiteral(values) => Seq.fromArray(values).map(process).mkString("[",",","]")
      
      
      case Ast.ClassDeclaration(className,optArgList,optExtendsClause,optBody) => classDeclaration(className,optArgList,optExtendsClause,optBody)
      case Ast.CaseClassDeclaration(className,optArgList,optExtendsClause,optBody) => caseClass(className,optArgList,optExtendsClause,optBody)
      case Ast.ObjectDeclaration(objectName,optExtendsClause,optBody) => objectDeclaration(objectName,optExtendsClause,optBody)
      case Ast.CaseObjectDeclaration(objectName,optExtendsClause,optBody) => objectDeclaration(objectName,optExtendsClause,optBody) //finish this...
      case Ast.TraitDeclaration(traitName,optExtendsClause,optBody) => traitDeclaration(traitName,optExtendsClause,optBody)
      
      case Ast.PartialFunction(cases) => partialFunction(Seq.fromArray(cases))
      
      case a:Array  => "unknown array: name: "+a.nodeName+" length: "+a.length+" <"+a+">"
      case s:String => s
      case other => "unknown:"+(other.nodeName || other)
    }
    
    def methodDeclaration(modifiers,methodName,args,bodyStatements,returnValue) = {
      modifiers = from(modifiers)
      
      var body = processBlock(bodyStatements)
      var argNames = processArgumentDeclarationList(args);
      var argsList = args.map(Seq.fromArray).getOrElse(List())
      
      var processDefaultValue = (id,expr => "if("+id+" === undefined){"+id+" = "+process(expr)+"}")
      var processTypeCheck = (id,type => "__rsu._checkParameterType("+Json.encodeString(methodName)+","+Json.encodeString(id)+","+Json.encodeString(type)+","+id+","+type+")")
      var isVarArgs = false;
      var argHandlers = argsList.collect{
        case Ast.ArgumentDeclaration(id,Some(Seq(type,"*")),`None`) => {isVarArgs = true;return List()}
        case Ast.ArgumentDeclaration(id,Some("*"),`None`) => {isVarArgs = true;return List()}
        case Ast.ArgumentDeclaration(id,optTypeName,optDefaultValue) => List(optDefaultValue.map(v => processDefaultValue(id,v)),optTypeName.map(typeName => processTypeCheck(id,typeName))).flatten()        
      }
      
      //println("argHandlers:"+argHandlers.mkString("\n"))
      
      var argumentValidators = argHandlers.flatten().mkString(";\n");
      if(argHandlers.size() > 0)
        argumentValidators += ";\n__rsu._validateParameters("+Json.encodeString(methodName)+",["+from(argNames.split(",")).map(Json.encodeString).mkString(",")+"],["+argNames+"],arguments,"+isVarArgs+");\n"
      
      var namedParametersHandler = List(
        "var $$named = __rsu._namedParameters(arguments);",
        "if($$named !== undefined){",
        argsList.collect{
          case Ast.ArgumentDeclaration(id,type,defaultValue) => List("if($$named."+id+" !== undefined){"+id+" = $$named."+id+"}")
        },
        "}",
        argsList.collect{
          case Ast.ArgumentDeclaration(id,Some(Seq(type,"*")),`None`) => 
            List("else{",id + " = __rsu._typedVarArgs("+(argsList.size() - 1)+",arguments,"+type+");","}")
          case Ast.ArgumentDeclaration(id,Some("*"),`None`) => 
            List("else{",id + " = __rsu._varArgs("+(argsList.size() - 1)+",arguments);","}")
        }
      ).flatten().mkString("\n")
      
      var func = "function "+methodName+"("+argNames+"){"+namedParametersHandler+argumentValidators+(returnValue?"return ":"")+body+"}";
      if(modifiers.contains("private")) return func;
      return "__rsu._method('"+methodName+"',this,self,"+modifiers.contains("override")+","+func+")";
    }
    
    def decodeXmlEntities(str) = ($("<div/>").html(str).text())
    
    def forComprehension(forIns,guards,expr,method,lastMethod,returnExpr) = {
      
      private def buildGuards(id) = {
        if(guards.length == 0) return "";
        return ".filter(function("+id+"){return "+(from(guards).map{ case Ast.ForGuard(guard) => "("+process(guard)+")" }.mkString("&&"))+"})"
      }
      
      private def processForIns = {
        case Seq(Ast.ForInStatement(id,inExpr)) => 
          "from("+process(inExpr)+")"+buildGuards(id)+"."+lastMethod+"(function("+id+"){"+returnExpr+process(expr)+"})"
        case Seq(Ast.ForInStatement(id,inExpr),forIns@_*) =>
          "from("+process(inExpr)+")."+method+"(function("+id+"){"+returnExpr+processForIns(forIns)+"})"
      }
      
      return processForIns(forIns);
    }
    
    def processBlock(exprs) = (match(exprs){
      case Seq() => "null"
      case Seq(expr) if expr.isExpression => process(expr)
      case other => {
        
        var lastExpr = exprs.last()
        var needsReturn = lastExpr.isExpression;//!isInstanceOf(lastExpr,Ast.ReturnStatement)
        var bodyExprs = exprs.take(exprs.size() - 1).map(process).mkString("",";\n",";\n")
        
        return "(function(){"+
          bodyExprs+
          (needsReturn? "return ": "")+
          process(lastExpr)+
        "})()"
      }
    })
    
    def partialFunction(cases) = {
    
      private def partialFunctionCase = {
        case Ast.CaseStatement(pattern,optGuard,statements) => {
          var output = {guards: ArraySeq(), front:ArraySeq(), back:ArraySeq()}
          optGuard.foreach(output.guards.push);
          var generate = {id, other =>
            other = other || {}
            if(other.front) output.front.push(other.front);
            if(other.back) output.back.push(other.back);
            if(other.guard) output.guards.push(other.guard);
            return id
          }
          var id = processPattern(pattern,generate)
          return "function("+id+"){return "+output.front.mkString("")+buildCaseBody(output.guards,Seq.fromArray(statements))+output.back.reverse().mkString("")+"}";
        }
      }
      
      private def buildCaseBody(guards,statements) = {
        var result = "function(){return "+processBlock(statements)+";}"
        if(guards.size() > 0)
          return guards.map(process).mkString("(","&&",")?")+result +":null"
        else
          return result
      }
      
      private def processPattern(pattern,generate) = (match(pattern){
        case id:String =>
          generate(id)
        case Ast.CaseLiteralPattern(literal) => {
          var name = nextName()
          return generate(name,{guard:name + "===" + process(literal)})
        }
        case Seq("`",id,"`") => {
          var name = nextName()
          return generate(name,{guard:name + "===" + id})
        }
        case Seq(id,":",type) => 
          generate(id,{guard:"isInstanceOf("+id+","+type+")"})
        case Seq(name,"@",extractor,"(",patterns,wildcard,")") => 
          processExtractor(name,extractor,patterns,wildcard != None,generate)
        case Seq(extractor,"(",patterns,wildcard,")") => 
          processExtractor(nextName(),extractor,patterns,wildcard != None,generate)
      })
          
      private def processExtractor(name,extractor,patterns,wildcard,generate) = {
        var pending = ArraySeq()
        var capturedGenerate = {id, other => pending.push({id:id,other:other});return id; }
        var paramNames = from(patterns).map(p => processPattern(p,capturedGenerate));
        generate(name,{front:extractor+".unapply("+name+","+wildcard+",function("+paramNames.mkString(",")+"){return ",back:"})"});
        for(item <- pending){ generate(item.id,item.other) } 
        return name;
      }
      return "__rsu._partialFunction("+cases.map(partialFunctionCase).mkString(",\n")+")"
    }
    
    def classDeclaration(className,optArgList,optExtendsClause,optBody) = ( 
      [
      "__rsu._class('"+className+"',this,self,"+className+","+className+"\$class);",
      "function "+className+"(){return __rsu._construct(this,'"+className+"',"+className+"\$class,arguments.callee,arguments);};",
      "function "+className+"\$class("+processArgumentDeclarationList(optArgList)+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,"+
        optExtendsClause.map{ case Ast.ExtendsClause(extendsName,optArgs) =>
          extendsName+","+extendsName+"$class,["+processArgsList(optArgs)+"]"
        }.getOrElse("__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]")+");",
        "with(self){(function "+className+"\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")
    )
    
    def objectDeclaration(objectName,optExtendsClause,optBody) = (
      [
      "__rsu._object('"+objectName+"',this,self,"+objectName+","+objectName+"\$object);",
      "function "+objectName+"(){if(typeof("+objectName+"\$class) == 'undefined') return "+objectName+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+objectName+"',"+objectName+"\$class,arguments.callee,arguments);};",
      "function "+objectName+"\$object(){var self = __rsu._self(this);",
      "var base = __rsu._extend(this,self,"+
        optExtendsClause.map{ case Ast.ExtendsClause(extendsName,optArgs) =>
          extendsName+","+extendsName+"$class,["+processArgsList(optArgs)+"]"
        }.getOrElse("__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]")+");",
        "with(self){(function "+objectName+"\$object\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")
    )
    
    def traitDeclaration(traitName,optExtendsClause,optBody) = (
      [
      "__rsu._trait('"+traitName+"',this,self,"+traitName+","+traitName+"\$trait);",
      "function "+traitName+"(){if(typeof("+traitName+"\$class) == 'undefined') return "+traitName+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+traitName+"',"+traitName+"\$class,arguments.callee,arguments);};",
      "function "+traitName+"\$trait(){var self = __rsu._self(this);",
        optExtendsClause.map{ case Ast.ExtendsClause(extendsName,optArgs) =>
          "var base = __rsu._mixin(this,self,"+extendsName+","+extendsName+"$trait,["+processArgsList(optArgs)+"]"
        }.getOrElse("")+");",
        "with(self){(function "+traitName+"\$trait\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")      
    )
    
    def caseClass(className,optArgList,optExtendsClause,optBody) = (
      //currently ignoring the extends clause
      [
      "__rsu._caseClass('"+className+"',this,self,"+className+","+className+"\$class);",
      "function "+className+"(){return __rsu._construct(this,'"+className+"',"+className+"\$class,arguments.callee,arguments);};",
      "function "+className+"\$class("+processArgumentDeclarationList(optArgList)+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['"+className+"',"+Json.encodeString(processArgumentDeclarationList(optArgList))+",["+processArgumentDeclarationList(optArgList)+"]]);",  
        "with(self){(function "+className+"\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")      
    )
    
    def processExpressionChain = {
      case property:String => "."+property
      case args:Array => "("+processArgsList(Some(args))+")"
    }
    
    def processArgsList(optArgs) = {
      var args = Seq.fromArray(optArgs.getOrElse([]));
      var colon = ":"
      var named = args.collect{
        case Seq(id,expr) => (id+colon+process(expr))
      };
      
      if(named.size() > 0)
        return named.mkString("{$$named:{",",","}}")
        
      return args.map(process).mkString(",") 
    }
    
    def processArgumentDeclarationList = {
      case id:String => id
      case `None` => ""
      case Some(value) => processArgumentDeclarationList(value)
      case Seq(args@_*) => args.map(process).mkString(",")
      case other => "(untransformed arg list: "+other+")"
    }

    
    def processClassBody = {
      case Ast.ClassBody(Some(thisAlias),statements) => processClassBodyStatements(["this",thisAlias],statements)
      case Ast.ClassBody(`None`,statements) => processClassBodyStatements(["this"],statements)  
    }
    
    def processClassBodyStatements(aliases,statements) = {
      //println("statements: "+typeOf(from(statements).map))
      //return "aliases: "+aliases+" statements: "+
      return from(statements).map(process).mkString("",";\n",";\n")
    }
    
  }
}

