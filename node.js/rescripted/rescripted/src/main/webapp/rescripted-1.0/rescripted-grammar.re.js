//rescripted-settings:{"legacy":true,"immediate":true}

import rescripted.collections._

package rescripted.lang {

  /*
    upper ::= ‘A’ | ¢¢¢ | ‘Z’ | ‘$’ | ‘_’ and Unicode category Lu
    lower ::= ‘a’ | ¢¢¢ | ‘z’ and Unicode category Ll
    letter ::= upper | lower and Unicode categories Lo, Lt, Nl
    digit ::= ‘0’ | ¢¢¢ | ‘9’
    opchar ::= “all other characters in \u0020-007F and Unicode
    categories Sm, So except parentheses ([]) and periods”
    op ::= opchar {opchar}
    varid ::= lower idrest
    plainid ::= upper idrest
    | varid
    | op
    id ::= plainid
    | ‘\‘’ stringLit ‘\‘’
    idrest ::= {letter | digit} [‘_’ op
  */

//  var arrayToSting = Array.prototype.toString
//  Array.prototype.toString = (=> "["+arrayToSting.apply(this,[])+"]" )

  class RescriptedGrammar() extends TokenParser(){
    
    def SymbolTable(parent) = {
      var table = {scope:{}/*,children:[],collected:[]*/}
      table.findId = function(id){
        if(table.scope[id] !== undefined)
          return table.scope[id];
        else if(parent != null)
          return parent.findId(id);
        else
          return null;
      }
      
      table.toString = function toString(){
        return "SymbolTable()"
      }
      table.push = (=> SymbolTable(table) )
      table.pop = {parseResult =>
        if(!parseResult.success)
          return parent;
        
        var output = parseResult.output;
        if(output.id === undefined)
          return parent;
        
        var id = output.id;
        if(isInstanceOf(output,Ast.ObjectDeclaration) || isInstanceOf(output,Ast.CaseObjectDeclaration))
          id = id+"$";
        
        
        
        if(isInstanceOf(output,Ast.PackageDeclaration)){
          var outputScope = parent.scope;
          var packageParts = Seq.fromArray(id.split("."))
          id = packageParts.last()
          for(part <- packageParts.take(packageParts.size()-1)){
            var newScope = {}
            outputScope[part] = newScope;
            outputScope = newScope;
          }
          outputScope[id] = table.scope;
          
        } else {
          parent.scope[id] = table.scope;
        }

        table.scope.$$ = {ast:output};
        
        return parent;
      }
      table.collect = {value,parseInput,parseRemainder =>
        if(value.id === undefined)
          return value;
        
        if(isInstanceOf(value,Ast.AssignmentStatement)){
          var existingEntry = table.findId(value.id)
          if(existingEntry == null)
            throw parseFailure(parseInput,0,"Cannot assign to undefined variable '"+value.id+"'")
          
          if(isInstanceOf(existingEntry.$$.ast,Ast.VarDeclaration) || isInstanceOf(existingEntry.$$.ast,Ast.MemberVarDeclaration))
            return value;
          
          throw parseFailure(parseRemainder,0,"Cannot re-assign '"+value.id+"'")
        }
        
        if(table.scope[value.id] !== undefined)
          throw parseFailure(parseRemainder,0,"Cannot re-define '"+value.id+"'")
        
        table.scope[value.id] = {$$:{ast:value}};
        
        return value;
      }
      return table;
    }
    
    self.symbolsRoot = SymbolTable()
    self.symbols = parserStack(symbolsRoot);

    //entry point
    def parse(code) = {
      var result = Program.run(tokenize(code))
      if(!result.success) {
        printLineInfo(lineInfo(result.input,result.position))
        //var token = f.failureToken()
        //println("Bad token: '"+token+"', Reason: "+f.reason)
        println(result.reason)
      }
      return result;
    }
    
    var operatorTokens = "<>=:!@#%^&*/\\-+_|~?"
    
    //token handling
    var tokens = ["//","/*","*/","\\\"","\\\'","\\t","\\r","\\n","\\b",'"',"'","=>","<-","@_*"].concat("()[]{}.,;".split("")).concat(operatorTokens.split(""))
    var tokenizer = new RegExp("(\\n|[\\t ]+|"+from(tokens).map(RegExpEscape).mkString("|")+"|[0-9]+)")//|["+RegExpEscape(operatorTokens)+"]+
    def tokenize(code) = ( Seq.fromArray(code.split(tokenizer)).filter(_!='').toArray() )
    
    
    //line handling
    def lineInfo(input,position) = {
      position = input.start + position
      var tokens = input.tokens
      var end = tokens.length;
      var lineNumber = 1;
      var lineStart = 0;
      for(var i=0;i < position;i++){
        if(tokens[i] == "\n"){
          lineNumber++
          lineStart = i
        }
      }
      
      var lineEnd = 0
      for(var i=position+1;i<end;i++){
        if(tokens[i] == "\n"){
          lineEnd = i;
          break;
        }
      }
      
      var line = Range(lineStart+1,lineEnd).map(i => tokens[i]).mkString("")
      var offset = Range(lineStart+1,position).map(i => tokens[i]).mkString("")
      return {line:line,offset:offset.length,lineNumber:lineNumber}
    }
    
    def printLineInfo(info){
      println("error at: line "+info.lineNumber+", char "+info.offset)
      println(info.line)
      println(Range(0,info.offset).map(=>" ").mkString("")+"^")
    }
    
    //comments
    var singleLineComment = describe("single line comment")(sequence("//",repeat(0,negate("\n")),"\n"))
    var multiLineComment = describe("multi line comment")(sequence("/*",repeat(0,negate("*/")),"*/"))
    var comment = choice(singleLineComment,multiLineComment)
    
    //semicolons
    def optsemi(p) = (sequence(p,optwhitespace,expect(optional(";"))).mapHead());
    
    //whitespace
    var anyWhitespaceChar = regex(/^\s+$/,"whitespace")
    var whitespace = expect(repeat(1,choice(anyWhitespaceChar,singleLineComment,multiLineComment))).describe("whitespace")
    var optwhitespace = expect(repeat(0,choice(anyWhitespaceChar,singleLineComment,multiLineComment))).describe("optional whitespace")
    var simplewhitespace = expect(repeat(1,regex(/^( |\t)+$/,"simple whitespace"))).describe("spaces or tabs")
    var optsimplewhitespace = expect(repeat(0,regex(/^( |\t)+$/,"simple whitespace"))).describe("optional spaces or tabs")
    var whitespaceWithNewline = whitespace.butnot(simplewhitespace).describe("whitespace with newlines")
    
    def optwsequence() = {
      var args = []
      for(var i=0;i<arguments.length;i++){
        args.push(optwhitespace)
        args.push(arguments[i])
      }
      return sequence.apply(null,args)
    }
    
    def wsequence() = {
      var args = []
      for(var i=0;i<arguments.length;i++){
        args.push((i == 0)?optwhitespace:whitespace)
        args.push(arguments[i])
      }
      return sequence.apply(null,args)
    }
       
    def terminatedArgument(parser,terminal) = (
      sequence(
        optwhitespace,parser,
        choice(
          and(terminal).describe(terminal),
          sequence(optwhitespace,choice(",",";")).describe("comma or semicolon"),
          whitespaceWithNewline.describe("new line")
        )
      ).mapHead()
    )
    
    //keywords
    var keyword = choice(
                    "package", "class", "object", "trait", "extends", "with",
                    "base", "super",
                    "match", "case",
                    "if", "else",
                    "throw", "try", "catch", "finally",
                    "public","private", "protected", "override", "final", "native",
                    "def", "var", "val",
                    "for", "while", "do", "yield",
                    "this",
                    "return",
                    "new", "delete",
                    "=","=>", "<-", "@",
                    "null","true","false"
                  )
    
    //numeric literals
    var integerLiteral = regex(/^[1-9]\d*|0$/,"integer")
    var floatingPointLiteral = sequence(integerLiteral,".",regex(/^\d+$/,"number")).join()
    var hexLiteral = sequence("0",/^x[a-f]*$/i,repeat(0,regex(/^[0-9a-f]+$/i,"[0-9|a-f]"))).join()
    var number = choice(hexLiteral,floatingPointLiteral,integerLiteral).map(Ast.NumberLiteral)
    
    //string literals
    object SingleQuotedString extends AstParser(Ast.SingleQuotedString){
      parse(sequence(expect("'"),repeat(0,negate(choice("'","\n"))).join(),expect("'")))
    }
    object DoubleQuotedString extends AstParser(Ast.DoubleQuotedString){
      parse(sequence(expect('"'),repeat(0,negate(choice('"',"\n"))).join(),expect('"')))
    }
    var tripleQuote = describe('"""')(sequence('"','"','"'))
    object TripleQuotedString extends AstParser(Ast.TripleQuotedString){
      parse(sequence(expect(tripleQuote),repeat(0,negate(sequence(tripleQuote))).join(),expect(tripleQuote)))
    }
    var string = choice(SingleQuotedString,TripleQuotedString,DoubleQuotedString)
    
    //xml literal    
    var xmlName = sequence(/^([A-Z]|[a-z]|\$|_)+$/,repeat(0,/^([A-Z]|[a-z]|[0-9]|\$|_)+$/)).join()
    
    object XmlEntityReference extends AstParser(Ast.XmlEntityReference){
      parse(sequence(expect("&"),required(xmlName,expect(";"))).mapHead())
    }
    
    var xmlCharacterReference = choice(
                                  sequence(charseq('&#'),repeat(0,integerLiteral),';'),
                                  sequence(charseq('&#x'),repeat(1,regex(/^[0-9a-f]+$/i,"[0-9|a-f]")),';')
                                )
    
    var xmlReference = choice(XmlEntityReference,xmlCharacterReference) 
    
    var xmlAttributeValue = choice(
                                sequence(expect('"'),repeat(0, choice(negate(choice("<","&",'"')),xmlReference)),expect('"')).join(),
                                sequence(expect("'"),repeat(0, choice(negate(choice("<","&","'")),xmlReference)),expect("'")).join()
                              )
                            
    
    object XmlAttribute extends AstParser(Ast.XmlAttribute){
      parse(sequence(optwhitespace,xmlName,optwhitespace,expect("="),required(optwhitespace,choice(xmlAttributeValue,XmlRescriptedFragment)).mapHead()))
    }
    
    object XmlEmptyElementTag extends AstParser(Ast.XmlEmptyElementTag){
      parse(sequence(expect("<"),xmlName,repeat(0,XmlAttribute),optwhitespace,expect(charseq("/>"))))
    }
   
    object XmlStartEndTag extends AstParser(Ast.XmlStartEndTag){
      parse(
        andthen(
          sequence(expect("<"),xmlName,required(repeat(0,XmlAttribute),optwhitespace,expect(">")).mapHead()),
          (output => required(repeat(0,XmlNode),expect(charseq("</")),expect(token(output[0])),optwhitespace,expect(">")))
        )
      )
    }
    
    var xmlTag = choice(XmlEmptyElementTag, XmlStartEndTag)
    
    var xmlNotTextChar = choice("<","&","{")
    object XmlText extends AstParser(Ast.XmlText){
      parse(sequence(repeat(1,negate(xmlNotTextChar)).join()))
    }
    
    object XmlRescriptedFragment extends AstParser(Ast.XmlRescriptedFragment){
      parse(sequence(expect("{"),required(optwhitespace,Expression,optwhitespace,expect("}"))).mapHead())
    }

    object XmlComment extends AstParser(Ast.XmlComment){
      parse(
        sequence(
          expect(charseq("<!--")),
          required(optwhitespace,repeat(0,negate(charseq("-->"))).join(),optwhitespace,expect(charseq("-->")))
        ).mapHead()
      )
    }

    object XmlCData extends AstParser(Ast.XmlCData){
      parse(
        sequence(
          expect(sequence(charseq("<!["),"CDATA","[")),
          required(repeat(0,negate(charseq("]]>"))).join(),expect(charseq("]]>")))
        ).mapHead()
      )
    }
    
    object XmlNode extends Parser(choice(xmlReference,XmlComment,xmlTag,XmlCData,XmlText,XmlRescriptedFragment)){}
    
    object XmlLiteral extends AstParser(Ast.XmlLiteral){      
      parse(
        sequence(
          optwhitespace,and("<"), //lookahead for the < before we commit to this syntax
          required(xmlTag)
        ).mapHead()
      ) 
    }
        
    //other literals
    var trueLiteral = token("true")
    var falseLiteral = token("false")
    var nullLiteral = token("null")
    var literal = choice(
                    SingleQuotedString,TripleQuotedString,DoubleQuotedString,
                    number,
                    trueLiteral,falseLiteral,nullLiteral
                  )
    
    //identifiers
    var simpleId = sequence(/^([A-Z]|[a-z]|\$|_)+$/,repeat(0,/^([A-Z]|[a-z]|[0-9]|\$|_)+$/)).join().butnot(keyword)
    var operatorIdRegex = regex(new RegExp("^["+RegExpEscape(operatorTokens)+"]+$"),"operator token")
    var operatorId = repeat(1,operatorIdRegex).join().butnot(keyword)
    var id = choice(simpleId,operatorId)
    var qualifiedId = sequence(id,repeat(0,optwsequence(".",id))).join()//.map(Ast.QualifiedId)
    
    object ArgumentDeclaration extends AstParser(Ast.ArgumentDeclaration){
      parse(
        sequence(
          id,
          optional(sequence(optwhitespace,expect(":"),optwhitespace,choice("*",sequence(qualifiedId,optwhitespace,"*"),qualifiedId)).mapHead()),
          optional(sequence(optwhitespace,expect("="),optwhitespace,Expression).mapHead())
        )
      )
    }
    
    
    def argumentDeclarationParser(argumentParser) = (
      sequence(
        optwhitespace,
        expect("("),
        optwhitespace,
        repeat(0,argumentParser),
        optwhitespace,
        expect(")")
      ).mapHead()
    )
    
    var argumentDeclarationList = argumentDeclarationParser(terminatedArgument(symbols.collect(ArgumentDeclaration),")"))
    var simpleArgumentDeclarationList = argumentDeclarationParser(sequence(simpleId,optwhitespace,optional(",")).mapHead())

    
    var argument = Expression
    var argumentList = (
      sequence(
        expect("("),
        optwhitespace,
        choice(
          repeat(1,terminatedArgument(sequence(optwhitespace,simpleId,optwhitespace,expect("="),optwhitespace,argument),")")),
          repeat(1,terminatedArgument(argument,")")),
          sequence()
        ),
        optwhitespace,
        expect(")")
      ).mapHead()
    )
    
    object ImportStatement extends AstParser(Ast.ImportStatement){
      parse(wsequence(expect("import"),required(list(id,sequence(optwhitespace,".",optwhitespace))).mapHead()))
    }
    
    object PackageDeclaration extends AstParser(Ast.PackageDeclaration){
      parse(sequence(optwhitespace,expect("package"),required(whitespace,qualifiedId,optwhitespace,expect("{"),optwhitespace,TopLevelStatementList,optwhitespace,expect("}"))).mapHead())
    }

    object Annotation extends AstParser(Ast.Annotation){
      parse(sequence(optwhitespace,expect("@"),optwhitespace,qualifiedId,optwhitespace,optional(argumentList)))
    }
    
    var annotationList = repeat(0,Annotation)

    object ExtendsClause extends AstParser(Ast.ExtendsClause){
      parse(sequence(whitespace,expect("extends"),required(whitespace,qualifiedId,optwhitespace,optional(argumentList))).mapHead())
    }

    object ClassBody extends AstParser(Ast.ClassBody){
      parse(
        optwsequence(
          expect("{"),
          required(optional(sequence(id,optwhitespace,"=>").mapHead()),StatementList,optwhitespace,expect("}"))
        ).mapHead()
      )
    }

    class ClassParser(prefix,astType) extends AstParser(astType){
      parse(
        sequence(
          optwhitespace,expect(prefix),
          required(whitespace,id,optional(sequence(optwhitespace,argumentDeclarationList).mapHead()),optional(ExtendsClause),optwhitespace,optional(ClassBody))
        ).mapHead()
      )      
    }
    
    object ClassDeclaration extends ClassParser("class",Ast.ClassDeclaration){}
    object CaseClassDeclaration extends ClassParser(sequence("case",whitespace,"class"),Ast.CaseClassDeclaration){}
    
    class ConstructorlessTypeParser(prefix,astType) extends AstParser(astType){
      parse(sequence(optwhitespace,expect(prefix),required(whitespace,id,optional(ExtendsClause),optwhitespace,optional(ClassBody))).mapHead())
    }
    
    object ObjectDeclaration extends ConstructorlessTypeParser("object",Ast.ObjectDeclaration){}
    object CaseObjectDeclaration extends ConstructorlessTypeParser(sequence("case",whitespace,"object"),Ast.CaseObjectDeclaration){}
    object TraitDeclaration extends ConstructorlessTypeParser("trait",Ast.TraitDeclaration){}
    
    var modifier = choice("public","private", "protected", "override", "final")
    var modifierList = repeat(0,sequence(modifier,whitespace).mapHead())
    
    object MethodDeclaration extends AstParser(Ast.MethodDeclaration){
      parse(
        symbols.push(
          sequence(
            annotationList,optwhitespace,modifierList,optwhitespace,expect("def"),
            required(
              whitespace,id,
              optwhitespace,optional(argumentDeclarationList),
              optwhitespace,choice(
                              EmptyBlockExpression,
                              BlockExpression,
                              sequence(expect("="),optwhitespace,charseq("???").join()),
                              sequence(expect("="),optwhitespace,Expression)
                            )
            )
          ).map(ast => [ast[0],ast[1],ast[2][0],ast[2][1],ast[2][2]])
        )
      )
    }
    
    
    var variableAssignment = required(whitespace,id,optwhitespace,expect("="),optwhitespace,Expression)
    class VariableParser(prefix,astType) extends AstParser(astType){
      parse(sequence(optwhitespace,expect(prefix),variableAssignment).mapHead())
    }
    
    class MemberVariableParser(prefix,astType) extends AstParser(astType){
      parse(sequence(annotationList,optwhitespace,modifierList,optwhitespace,expect(prefix),variableAssignment).map(ast => [ast[0],ast[1],ast[2][0],ast[2][1]]))
    }
    
    object ValDeclaration extends VariableParser("val",Ast.ValDeclaration){}
    object VarDeclaration extends VariableParser("var",Ast.VarDeclaration){}
    object MemberValDeclaration extends MemberVariableParser("val",Ast.MemberValDeclaration){}
    object MemberVarDeclaration extends MemberVariableParser("var",Ast.MemberVarDeclaration){}
    
    object AssignmentStatement extends AstParser(Ast.AssignmentStatement){
      parse(sequence(optwhitespace,qualifiedId,optwhitespace,expect("="),not("="),optwhitespace,required(Expression).mapHead()))
    }
    
    object ReturnStatement extends AstParser(Ast.ReturnStatement){
      parse(sequence(optwhitespace,expect("return"), optional(sequence(whitespace,Expression).mapHead()),optwhitespace))
    }
    
    object NewStatement extends AstParser(Ast.NewStatement){
      parse(sequence(optwhitespace,expect("new"), required(whitespace,qualifiedId,optional(argumentList))).mapHead())
    }
    
    object ThrowStatement extends AstParser(Ast.ThrowStatement){
      parse(sequence(optwhitespace,expect("throw"), required(whitespace,Expression)).mapHead())
    }

    object DeleteStatement extends AstParser(Ast.DeleteStatement){
      parse(sequence(optwhitespace,expect("delete"), required(whitespace,qualifiedId)).mapHead())
    }
    
    object SimpleStatement extends Parser(sequence(choice(symbols.collect(ImportStatement),symbols.collect(MethodDeclaration),symbols.collect(ValDeclaration),symbols.collect(VarDeclaration),ReturnStatement,symbols.collect(AssignmentStatement),Expression),expect(optional(";"))).mapHead()){}
    object SimpleStatementList extends Parser(repeat(0,SimpleStatement)){}
    
    object Statement extends Parser(sequence(choice(symbols.push(ClassDeclaration),symbols.push(CaseClassDeclaration),symbols.push(ObjectDeclaration),symbols.push(CaseObjectDeclaration),symbols.push(TraitDeclaration),symbols.collect(MemberValDeclaration),symbols.collect(MemberVarDeclaration),SimpleStatement),expect(optional(";"))).mapHead()){}
    object StatementList extends Parser(repeat(0,Statement)){}
    
    object TopLevelStatement extends Parser(choice(symbols.push(PackageDeclaration),Statement)){}
    object TopLevelStatementList extends Parser(repeat(0,TopLevelStatement)){}
    
    
    object IfExpression extends AstParser(Ast.IfExpression){
      parse(
        sequence(
          optwhitespace,expect("if"),
          required(optwhitespace,expect("("),optwhitespace,Expression,optwhitespace,expect(")"),Expression,optional(ElseExpression))
        ).mapHead()
      )
    }
    
    object ElseExpression extends AstParser(Ast.ElseExpression){
      parse(sequence(optwhitespace,expect("else"),whitespace,required(Expression)).mapHead())
    }
    
    object DoWhileExpression extends AstParser(Ast.DoWhileExpression){
      parse(
        sequence(
          optwhitespace,expect("do"),
          required(
            choice(
              GroupExpression,
              BlockExpression,
              sequence(whitespace,Expression,whitespace).mapHead()     
            ),
            optwhitespace,expect("while"),optwhitespace,expect("("),Expression,expect(")")
          )
        ).mapHead()
      )
    }
    
    object WhileExpression extends AstParser(Ast.WhileExpression){
      parse(
        sequence(
          optwhitespace,expect("while"),optwhitespace,
          required(expect("("),Expression,expect(")"),Expression)
        ).mapHead()
      )
    }
    
    object ForComprehension extends AstParser(Ast.ForComprehension){
      parse(
        sequence(
          optwhitespace,expect("for"),
          required(
            optwhitespace,expect("("),
              optwhitespace,repeat(1,optsemi(ForInStatement)),optwhitespace,repeat(0,optsemi(ForGuard)),
            optwhitespace,expect(")"),optwhitespace,optional("yield"),optwhitespace,Expression
          )
        ).mapHead()
      )
    }
    
    object ForInStatement extends AstParser(Ast.ForInStatement){
      parse(sequence(optwhitespace,id,optwhitespace,expect("<-"),optwhitespace,Expression))
    }
    
    object ForGuard extends AstParser(Ast.ForGuard){
      parse(sequence(optwhitespace,expect("if"),optwhitespace,Expression))
    }
    
    var emptyBlock = sequence(optwhitespace,expect("{"),optwhitespace,expect("}"))
    object EmptyBlockExpression extends AstParser(Ast.EmptyBlockExpression){
      parse(emptyBlock)
    }
    
    object BlockExpression extends AstParser(Ast.BlockExpression){
      parse(symbols.push(sequence(optwhitespace,expect("{"),optwhitespace,required(repeat(1,SimpleStatement),optwhitespace,expect("}"))).map(_[0])))
    }
    
    object GroupExpression extends AstParser(Ast.GroupExpression){
      parse(sequence(optwhitespace,expect("("),optwhitespace,required(Expression,optwhitespace,expect(")")).mapHead()))
    }
    
    object ExpressionChain extends AstParser(Ast.ExpressionChain){
      parse(
        sequence(
          repeat(0,choice(
            sequence(optwhitespace,argumentList).mapHead(),
            sequence(optwhitespace,expect("."),optwhitespace,qualifiedId).mapHead()
          ))
        )
      )
    }
    
    object SimpleExpression extends AstParser(Ast.SimpleExpression){
      parse(sequence(choice(NewStatement,ThrowStatement,DeleteStatement,PartialFunction,LambdaExpression,XmlLiteral,JsonLiteral,ArrayLiteral,GroupExpression,BlockExpression,emptyBlock.map(ast => Ast.JsonLiteral([])),UnaryOperation,literal,qualifiedId),ExpressionChain))
    }
    
    object LambdaExpression extends AstParser(Ast.LambdaExpression){
      parse(sequence(choice(simpleArgumentDeclarationList,id),optwhitespace,expect("=>"),optional(Expression)))
    }

    object CaseLiteralPattern extends AstParser(Ast.CaseLiteralPattern){
      parse(sequence(literal))
    }
    var casePattern = choice(
                        CaseLiteralPattern,
                        sequence("`",qualifiedId,"`"),
                        sequence(simpleId,optwhitespace,":",optwhitespace,qualifiedId),
                        sequence(
                          optwhitespace,simpleId,
                          optwhitespace,"@",
                          optwhitespace,qualifiedId,
                          optwhitespace,"(",optwhitespace,casePatternList,optwhitespace,optional("@_*"),optwhitespace,")"
                        ),
                        sequence(
                          optwhitespace,qualifiedId,
                          optwhitespace,"(",optwhitespace,casePatternList,optwhitespace,optional("@_*"),optwhitespace,")"
                        ),
                        simpleId
                      )
    object casePatternList extends Parser(list(casePattern,sequence(optwhitespace,",",optwhitespace))){}
    
    object CaseStatement extends AstParser(Ast.CaseStatement){
      var caseGuard = sequence(whitespace,expect("if"),whitespace,CommonExpressions).mapHead()
      parse(symbols.push(sequence(optwhitespace,expect("case"),whitespace,casePattern,optional(caseGuard),optwhitespace,expect("=>"),optwhitespace,StatementList)))
    }
    
    object PartialFunction extends AstParser(Ast.PartialFunction){
      parse(sequence(optwhitespace,expect("{"),and(sequence(optwhitespace,"case")),required(repeat(1,CaseStatement),optwhitespace,"}")).mapHead())
    }
    
    object TryExpression extends AstParser(Ast.TryExpression){
      parse(
        sequence(
          optwhitespace,expect("try"),
          required(
            Expression,
            optional(sequence(optwhitespace,expect("catch"),optwhitespace,Expression).mapHead()),
            optional(sequence(optwhitespace,expect("finally"),optwhitespace,Expression).mapHead())
          )
        ).mapHead()
      )
    }
    
    object JsonLiteral extends AstParser(Ast.JsonLiteral){
      parse(sequence(optwhitespace,expect("{"),optwhitespace,repeat(1,JsonKeyValue),optwhitespace,required(expect("}"))))
    }
    
    object JsonKeyValue extends AstParser(Ast.JsonKeyValue){ 
      parse(sequence(optwhitespace,choice(string,simpleId),optwhitespace,expect(":"),optwhitespace,required(terminatedArgument(CommonExpressions,"}")).mapHead()))
    }
    
    object ArrayLiteral extends AstParser(Ast.ArrayLiteral){
      parse(sequence(expect("["),optwhitespace,required(repeat(0,terminatedArgument(CommonExpressions,"]")),optwhitespace,expect("]")).mapHead()))
    }
    
    object UnaryOperation extends AstParser(Ast.UnaryOperation){
      var unaryOperator = repeat(1,choice("+","-","~","!")).join()
      parse(sequence(unaryOperator,optsimplewhitespace,SimpleExpression))
    }
    
    /*

    1	 () []
    2	 ! ~ - + * & unary operator
    3	 * / %	Multiplication, division, modulo
    4	 + -	Addition and subtraction
    5	 << >>	Bitwise shift left and right
    6	 < <= > >=	Comparisons: less-than, ...
    7	 == !=	Comparisons: equal and not equal
    8	 &	Bitwise AND
    9	 ^	Bitwise exclusive OR
    10 |	Bitwise inclusive (normal) OR
    11 &&	Logical AND
    12 ||	Logical OR
    13 ?:	Conditional expression (ternary operator)
    14 = += -= *= /= %= &= |= ^= <<= >>= Assignment operators
    15 , Comma operator
    */
    
    object CommonExpressions extends Parser(choice(BinaryOperation,SimpleExpression)){}
    
    object BinaryOperation extends Parser(){
      def binary(op) = (
        sequence(optsimplewhitespace,op.butnot(keyword),optwhitespace).map(token =>
          (a,b => Ast.BinaryOperation(a,token[0],b) )
        )
      )
      
      def operators() = (
        choice.apply(null,
          from(arguments).map(arg => sequence(arg.length == 1? token(arg):charseq(arg),repeat(0,operatorIdRegex)).join()).toArray()
        )
      )
      
      parse(
        choice(
          sequence(SimpleExpression,simplewhitespace,simpleId.map(Ast.SimpleId),simplewhitespace,SimpleExpression).mapTo(Ast.BinaryOperation),
          precedence(SimpleExpression)(
            binary(operators("*","/","%")),
            binary(operators("+","-")),
            binary(operators("<<",">>")),
            binary(operators("<","<=",">",">=")),
            binary(operators("==","!=")),//.debugFailure("[== and !=]")
            binary(token("&")),
            binary(token("^")),
            binary(token("|")),
            binary(charseq("&&")),
            binary(charseq("||")),
            //binary(token("=")),
            binary(operatorId)
          )
        )
      )
    }

    object Expression extends Parser(sequence(optwhitespace,choice(TryExpression,IfExpression,ForComprehension,DoWhileExpression,WhileExpression,BinaryOperation,SimpleExpression)).mapHead()){}
    
    object Program extends AstParser(Ast.Program){
      parse(eof(sequence(TopLevelStatementList,optwhitespace)))
    }    
    
  }

}

