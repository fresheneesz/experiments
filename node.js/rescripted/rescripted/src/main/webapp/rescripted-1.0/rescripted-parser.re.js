//rescripted-settings:{"legacy":true,"immediate":true}

import rescripted.collections._

package rescripted.lang {
  
  class TokenParser(){
    
    object NoOutput{}
    
    def ReverseTokenSeq(tokens,start,end) = {
      start = start || 0
      end = end || tokens.length
      return {
        tokens:tokens,
        start:start,
        end:end,
        reverse:(=> TokenSeq(tokens,start,end)),
        toString:(=> Range(start,end).map(i=>tokens[i]).mkString("")),
        eof:(=> start >= end),
        rewind:(count => ReverseTokenSeq(tokens,Math.min(end,start + Math.abs(count)),end)),
        token:(n => (start - n > 0)?tokens[start-n]:""),
        head:(=> start < end? tokens[start]:""),
        drop:(n => ReverseTokenSeq(tokens,Math.max(start-n,0),end)),
        cache:{}
      }      
    }
    def TokenSeq(tokens,start,end) = {
      start = start || 0
      end = end || tokens.length
      return {
        tokens:tokens,
        start:start,
        end:end,
        reverse:(=> ReverseTokenSeq(tokens,start,end)),
        toString:(=> Range(start,end).map(i=>tokens[i]).mkString("")),
        eof:(=> start >= end),
        rewind:(count => TokenSeq(tokens,Math.max(0,start - Math.abs(count)),end)),
        token:(n => tokens[start+n]),
        head:(=> start < end? tokens[start]:""),
        drop:(n => TokenSeq(tokens,Math.min(start+n,end),end)),
        cache:{}
      }
    }
    
      /*
      take:(n => TokenSeq(tokens,start,Math.min(start+n,end))),
      last:(=> tokens[end - 1]),
      dropWhile:{predicate =>
        var i = start
        while(predicate(tokens[i])) i++
        return TokenSeq(tokens,i,end)
      },
      takeWhile:{predicate =>
        var i=start
        while(predicate(tokens[i])) i++
        return TokenSeq(tokens,start,i)
      }
      */
    
    def runParser(parser,tokens) = {
      try{
        return parser(TokenSeq(tokens));
      } catch(e) {
        if(e.parseResult) {
          return e;
        } else {
          throw e;
        }
      }
    }
    
    def parseFailure(input,position,reason,parentFailure) = {
      var result = {parseResult:true,input:input,position:position,reason:reason,parentFailure:parentFailure,success:false,failureToken:(=> input.token(position) ),map:(=> result),toString:(=> "parseFailure("+position+","+reason+")")}
      return result
    }
    def parseSuccess(input,remainder,output) = (
      {parseResult:true,input:input,remainder:remainder,output:output,success:true,map:(func=> parseSuccess(input,remainder,func(output,input,remainder)) ),toString:(=> "parseSuccess("+output+")")}
    )
    
    def toParser(parser) = {
      if(parser instanceof RegExp)
        return regex(parser)
      else if(typeof(parser) == "string")
        return token(parser)
      else if(Seq.isArrayLike(parser))
        return from(parser).map(toParser).toArray()
      else
        return parser
    }
    
    def memoize(parser) = {
      if(parser.memoized)
        return parser
      var memoized = {input =>
        if(input.cache[parser.parserId] == null)
          input.cache[parser.parserId] = parser(input)
        return input.cache[parser.parserId]
      }
      memoized.memoized = true
      createParser(memoized)
      return memoized;
    }
    
    def createParser(parser) = {
      parser.map = (func => describe(parser.description)(input => parser(input).map(func)) )
      parser.mapTo = (constructor => parser.map(ast => constructor.apply(null,ast)))
      parser.debug = (label => parser.map(x => (println(label+": "+x),x)) )
      parser.debugFailure = (label => parser.onFailure(result => println(label+": "+result)))
      parser.butnot = (parser2 => butnot(parser,parser2))
      parser.run = (tokens => runParser(parser,tokens))
      parser.memoize = (=> memoize(parser))
      parser.leftRecursive = (=> leftRecursive(parser) )
      parser.reverse = (=> describe(parser.description)(input => parser(input.reverse())))
      parser.onFailure = (func => describe(parser.description){input =>
          var result = parser(input);
          if(!result.success) func(result);
          return result;
        }
      )
      parser.describe = (desc => (parser.description = desc,parser))
    }
    
    var parserId = 0
    def describe(description) = ({parser=>
      parser.parserId = parserId++
      parser.description = description
      createParser(parser)
      return memoize(parser)
      //return parser
    })

    //token matchers
    def token(s) = (describe("token '"+s+"'")(input =>
                      input.head() == s?
                        parseSuccess(input,input.drop(1),s):
                        parseFailure(input,0,"found: '"+input.head()+"' expected: '"+s+"'")
                   ))
    
    def startsWith(s) = (describe("starts with '"+s+"'")(input =>
                          input.head().indexOf(s) == 0?
                            parseSuccess(input,input.drop(1),input.head()):
                            parseFailure(input,0,"found: '"+input.head()+"' expected it to start with: '"+s+"'")
                        ))
    
    def startsWithAny() = {
      var parsers = from(arguments).map(startsWith).toArray()
      return choice.apply(null,parsers)
    }
    
    def regex(r,desc) = (describe(desc || r)(input =>
                          r.test(input.head())?
                            parseSuccess(input,input.drop(1),input.head()):
                            parseFailure(input,0,"regex failure:"+input.head()+" did not match: RegExp("+r+")")
                        ))
    
    //sequences
    def sequence() = {
      var parsers = toParser(arguments);
      return arrayParser(describe("seq[\n"+from(parsers).map(_.description).mkString("\n")+"\n]"){input =>
        var remainder = input
        var output = []
        for(var i=0;i<parsers.length;i++){
          var parser = parsers[i];
          var result = parser(remainder)
          if(result.success){
            if(result.output != NoOutput)
              output.push(result.output)
            remainder = result.remainder
          } else {
            return parseFailure(input,remainder.start - input.start,"sequence failure: "+result.reason,result)
          }
        }
        return parseSuccess(input,remainder,output)
      })
    }
    
    def required() = {
      var parser = arrayParser(sequence.apply(null,arguments).onFailure{result =>
        if(parser.description != null)
          result.parentFailure.reason = parser.description + " " + result.parentFailure.reason
        throw result.parentFailure
      })
      return parser;
    }
    
    def arrayParser(parser) = {
      var flatten = {item =>
        if(!(item instanceof Array))
          return item;
        var result = []
        for(var i=0;i<item.length;i++)
          result = result.concat(flatten(item[i]))
        return result
      }
      parser.join = (sep=> parser.map(input => flatten(input).join(sep || "")))
      parser.flatten = (=> parser.map(flatten))
      parser.mapHead = (=> parser.map(_[0]))
      return parser
    }
    
    def charseq(chars) = (sequence.apply(null,chars.split("")))
    
    def repeat(n,p) = {
      var parser = toParser(p);
      return arrayParser(describe("repeat "+n+": "+parser.description){input =>
        var remainder = input
        var output = []
        var result = null
        var count = 0
        while( true ){
          if(remainder.eof())
            break;
          
          result = parser(remainder)
          if(!result.success)
            break;
          
          if(result.output != NoOutput)
            output.push(result.output)
          remainder = result.remainder
          count++;
        }
        if(count >= n)
          return parseSuccess(input,remainder,output)
        
        if(remainder.eof())
          return parseFailure(remainder,0,"expected "+n+" occurances and found "+count+" then hit eof while parsing: "+parser.description)
        
        return parseFailure(result.input,result.position,"expected "+n+" occurances and found "+count+": "+result.reason)
      })
    }

    def list(parser,delimiter) = ( sequence(parser,repeat(0,sequence(expect(delimiter),parser).mapHead())).map(values => [values[0]].concat(values[1])) )
    
    //misc
    def expect(p) = {
      var parser = toParser(p)
      return describe(p.description){input =>
        var result = parser(input)
        if(result.success)
          return parseSuccess(input,result.remainder,NoOutput)
        return result
      }
    }
    
    def optional(p) = {
      var parser = toParser(p)
      return describe("["+parser.description+"]"){input =>       
        var result = parser(input)
        return result.success? result.map(Option) : parseSuccess(input,input,None)
      }
    }
    
    def choice() = {
      var parsers = toParser(arguments);
      return describe("choices: "+from(parsers).map(_.description).mkString(",")+""){input =>
        for(var i=0;i<parsers.length;i++){
          var parser = parsers[i];
          var result = parser(input)
          if(result.success)
            return result
        }
        return parseFailure(input,0,arguments.callee.description)
      }
    }
    
    def negate(p) = {
      var parser = toParser(p)
      return describe("not: "+parser.description)(input => parser(input).success? parseFailure(input,0,"negate failure") : parseSuccess(input,input.drop(1),input.head()) )
    }
    
    def butnot(parserA,parserB) = {
      parserA = toParser(parserA)
      parserB = toParser(parserB)
      return describe(parserA.description+" but not "+parserB.description){input =>
        var b = parserB(input)
        if(!b.success){
          return parserA(input)
        } else {
          var a = parserA(input)
          if(a.success){
            if(a.remainder.start > b.remainder.start){
              return a
            } else {
              return parseFailure(input,0,"but not 1 ...")
            }
          } else {
            //respond with a's failure object
            return a
          }
        }
      }
    }
    
    def eof(p) = {
      var parser = toParser(p)
      return describe("eof"){input=>
        var result = parser(input)
        if(!result.success)
          return result
        
        if(result.remainder.start == result.remainder.end)
          return result
        
        return parseFailure(result.remainder,0,"unexpected token: '"+result.remainder.head()+"'")
      }
    }
    
    def leftRecursive(p) = {
      var parser = toParser(p)
      var callStack = [];
      return describe(parser.description){input=>
        if(callStack.length > 0 && callStack[callStack.length-1] == input.start){
          //println("stopping left recursion:"+input.start+" head:"+input.head()+" callstack: "+callStack)
          return parseFailure(input,0,"not allowed to left recurse: "+parser.description)
        }
        callStack.push(input.start);
        var result = parser(input)
        callStack.pop();
        return result
      }
    }
    
    def precedence(term) = {
      return {=>
        var parsers = from(arguments).reverse().map(toParser).toArray()
        var combine = {level =>
          if(level > parsers.length - 1)
            return term
          else
            return chainl(combine(level+1),parsers[level])
        }
        return combine(0)
      }
    }
    
    def chainl(p, s){
      var parser = toParser(p);
      var sep = toParser(s);
      
      var foldl = {f, initial, seq =>
                    for(var i=0; i< seq.length; ++i)
                      initial = f(initial, seq[i]);
                    return initial;
                  }
      
      return sequence(parser, repeat(0,sequence(sep, parser))).map(ast => foldl((v,action => action[0](v, action[1]) ), ast[0], ast[1]) )
    }
    
    
    //lookahead parsers
    def and(p) = {
      var parser = toParser(p);
      return describe("and: "+parser.description)(input => parser(input).success? parseSuccess(input,input,NoOutput):parseFailure(input,0,"expected to find "+p) )
    }
    
    def not(p) = {
      var parser = toParser(p);
      return describe("not: "+parser.description)(input => !parser(input).success? parseSuccess(input,input,NoOutput):parseFailure(input,0,"expected to not find "+p) )
    }
    
    def andthen(p1,func) = {
           
      var parser = toParser(p1)
            
      return describe("and then:"+parser.description){input =>
          var p = parser(input)
          if(p.success){
            var nextParser = toParser(func(p.output))
            //println(p.remainder)
            if(nextParser){
              var nextResult = nextParser(p.remainder)
              if(nextResult.success) 
                return parseSuccess(input,nextResult.remainder,[p.output, nextResult.output])
              else
                return parseFailure(p.remainder,0,"then part of andthen fail: "+nextParser)
            } else {
             return parseFailure(p.remainder,0,"no then parser") 
            }
          } else {
            return parseFailure(input,0,"and then fail: "+p) 
          }
          
      }
    }
    
    //lookbehind
    def lookbehind(p,count) = {
      var parser = toParser(p);
      count = count || 1
      return describe(parser.description)(input=> parser(input.rewind(count)) )
    }
    
    //symbol table
    def parserStack(root) = {
      var current = root
      return {
        push:(parser => 
          describe(parser.description){input =>
            current = current.push();
            var result = parser(input);
            current = current.pop(result);
            return result;
          }
        ),
        collect:(parser => parser.map(value,parseInput,parseOutput => current.collect(value,parseInput,parseOutput)) )
      }
    }
    
    //capture an ast, and possibly add a require branch
    class Node(){
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      describe(self.nodeName.split(/([A-Z][a-z]*)/g).join(" "))(self)
      def parse(parser) = (self.parser = parser)
      def apply(input) = (self.parser(input).map(output))
      
      def output(result) = {
        result.nodeName = self.nodeName
        var oldToString = result.toString
        result.toString = (=> self.nodeName+"("+oldToString.apply(result)+")" )
        return result
      }
      
      def unapply(node,wildcard,extractor) = {
        if(node.nodeName != self.nodeName) return null
          
        if(Seq.isArrayLike(node) || isInstanceOf(node,Seq))
          return Seq.unapply(node,wildcard,extractor)
        
        if(wildcard) error("wild card node extractor only works with sequences")
          
        return extractor(node)
      }
    }
    
    
    var actualRequired = required;
    class AstParser(astType){
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      self.description = self.nodeName.split(/([A-Z][a-z]*)/g).join(" ");
      describe(self.description)(self)
      def required() = {
        var parser = actualRequired.apply(null,arguments)
        parser.description = self.description + ": " + parser.description
        return parser;
      }
      
      def parse(parser) = (self.parser = parser.mapTo(astType))
      def apply(input) = (self.parser(input))
    }
    
    //prevent need for forward declaration
    class Parser(parser){
      self.parser=parser;
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      describe(self.nodeName.split(/([A-Z][a-z]*)/g).join(" "))(self)
      def parse(parser) = (self.parser = parser)
      def apply(input) = (self.parser(input))
    }
    
    
  }

}
