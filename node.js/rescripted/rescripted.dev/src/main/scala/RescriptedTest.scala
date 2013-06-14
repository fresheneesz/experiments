import org.antlr.runtime._
import java.io._
import scala.collection.JavaConversions._
import scala.collection.mutable.{ListBuffer,HashMap}

case class DebugInfo(errors:List[Error], tokens:String)

case class Error(message:String, line:Int, pos:Int,debug:String){
  override def toString = debug 
}

object RescriptedTest {
  
  def test(input:InputStream):DebugInfo = {
    val stream = new ANTLRInputStream(input)
    val lines = stream.toString.split("\n").toList
    val lexer = new CaptureLexer(stream, lines)
    val tokens = new CommonTokenStream(lexer)
    
    if(lexer.hasErrors) return DebugInfo(lexer.errors.toList, tokens.getTokens().map(_.toString).mkString("\n"))
    
    val parser = new CaptureParser(tokens,lines)
    val result = parser.program()
    
    if(lexer.hasErrors) return DebugInfo(lexer.errors.toList, tokens.getTokens().map(_.toString).mkString("\n"))
    if(parser.hasErrors) return DebugInfo(parser.errors.toList, tokens.getTokens().map(_.toString).mkString("\n"))
        
    return DebugInfo(Nil, tokens.getTokens().map(_.toString).mkString("\n"))
  }

  
  def errorinfo(message:String, line:Int, pos:Int,lines:List[String]):Error = {
    val trimmed = lines(line-1).trim()
    val debug = sourceCodeError(message, line, pos-lines(line-1).indexOf(trimmed), trimmed) // "  "+message+"  line:"+line+" pos:"+pos+"\n\n    "+lines(line-1).trim() +"\n    "+ (for(i <- 0 to (pos-1)) yield { "-" }).mkString +"^"+"\n\n"
    
    Error(message, line, pos, debug)
  }
  
  
  def sourceCodeError(message:String, line:Int, pos:Int, lineSource:String):String = {
    "  "+message+"  line:"+line+"\n\n    "+lineSource.replace("\t"," ")+"\n    "+ (for(i <- 0 to (pos-1)) yield { " " }).mkString +"^"+"\n\n"
  }
  
  
  class CaptureLexer(input:ANTLRInputStream, lines:List[String]) extends RescriptedLexer(input) {
    val errors = ListBuffer[Error]()
    def hasErrors():Boolean = {
      return !errors.isEmpty
    }
    
    override def displayRecognitionError(tokenNames:Array[String], e:RecognitionException){
      
      if(e.isInstanceOf[MismatchedSetException]){
        var msg = e.c match {
                          case 10 => "unexpected newline"
                          case 13 => "unexpected carriage return"
                          case z => "unexpected character '"+z.toChar+"'" }
                
        errors += errorinfo(msg,e.line,e.charPositionInLine,lines)
      } else 
        errors += errorinfo(getErrorMessage(e, tokenNames),e.line,e.charPositionInLine,lines)
    }
  }
  
  
  class CaptureParser(input:TokenStream, lines:List[String]) extends RescriptedParser(input) {
    val errors = ListBuffer[Error]()
    def hasErrors = !errors.isEmpty
    
    override def displayRecognitionError(tokenNames:Array[String], e:RecognitionException){
      errors += errorinfo(getErrorMessage(e, tokenNames),e.line,e.charPositionInLine,lines)
    }
  }
  

  def evalJavascript(js:String){
    import org.mozilla.javascript._
    
    val cx = Context.enter()
    cx.setErrorReporter(new RescriptedErrorReporter())
    try{
      val scope = cx.initStandardObjects()
      val result = cx.evaluateString(scope, js, "<cmd>", 1, null)
      //println(Context.toString(result))
    } catch{
      case e =>  
    } finally {
      Context.exit() 
    }
     
    class RescriptedErrorReporter extends ErrorReporter {
      def warning(message:String, sourceName:String, line:Int, lineSource:String, lineOffset:Int){
        println("warning")
      }
      
      def error(message:String, sourceName:String, line:Int, lineSource:String, lineOffset:Int){
        println("\n"+sourceCodeError(message, line, lineOffset, lineSource))
      }
      
      def runtimeError(message:String, sourceName:String, line:Int, lineSource:String, lineOffset:Int):EvaluatorException = {
        println(message)
        null
      }
    }
  }
  
  def evalRuby(code:String){
    import org.jruby.Ruby
    import org.jruby.RubyRuntimeAdapter
    import org.jruby.javasupport.JavaEmbedUtils
    import org.jruby.exceptions._

    val runtime = JavaEmbedUtils.initialize(List())
    //val evaler = JavaEmbedUtils.newRuntimeAdapter()
     
    try{
      //evaler.eval(runtime, code)
      runtime.executeScript(code, "somefile")
    } catch {
      case e:RaiseException => println(e.getException()) //println(runtime.getCurrentContext().getLine()) //println(runtime.getCurrentContext().getErrorInfo()) //
    }
    
    
    JavaEmbedUtils.terminate(runtime)
    
    
  }
  
}

