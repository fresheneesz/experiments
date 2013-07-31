package rescripted;
  
import scala.io._
import java.io._
import org.mozilla.javascript._

  
object RescriptedTransformer{
  
  def main(args:Array[String]){
    args.toList match {
      case "transform" :: source :: dest :: Nil =>
        transform(new File(source),new File(dest))
      case "minify" :: source :: dest :: Nil =>
        minify(new File(source),new File(dest))
      case "combine-files-into" :: dest :: sources =>
        combineFilesInto(new File(dest))(sources.map(new File(_)):_*)
      case "build" :: dest :: sources =>
        build(new File(dest))((sources map (new File(_))):_*)
      case _ =>
        usage()
    }
  }
  
  def usage(){
    println(
"""
 rescripted usage:
  rescripted transform [sourceFile] [destFile]
    transform a rescripted source file into plain javascript
  rescripted minify [sourceFile] [destFile]
    minify a normal javascript file
  rescripted combine-files-into [destFile] [sourceFiles]...
    combine a set of files into a single file
"""
    )
  }
  
 
  def transform(source:File,destination:File){
    //val destWriter = new FileWriter(destination)
    val destWriter = new OutputStreamWriter(new FileOutputStream(destination),"UTF-8")
    try{      
      destWriter.append(transform(fileContents(source)))
    } finally {
      destWriter.close()
    }
  }
  
  def transform(source:String):String = (new RescriptedTransformer).transform(source)
  
  def combineFilesInto(destination:File)(sourceFiles:File*){
    
    //val destWriter = new FileWriter(destination)
    val destWriter = new OutputStreamWriter(new FileOutputStream(destination),"UTF-8")
    try{
      for(sourceFile <- sourceFiles)
        destWriter.append(fileContents(sourceFile))
    } finally {
      destWriter.close()
    }
  
  }
  
  def minify(source:File,destination:File){
    //val compressor = new com.yahoo.platform.yui.compressor.JavaScriptCompressor()
    //com.yahoo.platform.yui.compressor.YUICompressor.main(Array("-o",destination.getAbsolutePath,source.getAbsolutePath))//"-v",
  }
  
  def build(destination:File)(sourceFiles:File*){
    //val destWriter = new FileWriter(destination)
    val destWriter = new OutputStreamWriter(new FileOutputStream(destination),"UTF-8")
    val transformer = new RescriptedTransformer
    try{
      for(sourceFile <- sourceFiles){
        try{
          destWriter.append(transformer.transform(fileContents(sourceFile)))
        } catch {
          case e => throw new Exception("error transforming file: "+sourceFile,e)
        }
      }
    } finally {
      destWriter.close()
      transformer.destroy()
    }
  }
  
  private def fileContents(file:File):String = {
    val reader = new BufferedReader(new InputStreamReader(new FileInputStream(file),"UTF-8"))
    val buffer = new StringBuffer()
    try{
      while(true){
        val line = reader.readLine();
        if(line == null)
          return buffer.toString()
        buffer.append(line)
        buffer.append("\n")
      }
      buffer.toString()
    } finally {
      reader.close()
    }
  }

}

class RescriptedTransformer{
  private val context = Context.enter()
  private val scope = context.initStandardObjects()
  private val transformFunction:Function = {
                                    val reader = new FileReader("src/main/webapp/rescripted-bootstrap.js")
                                    try{
                                      context.evaluateReader(scope,reader,"rescripted-bootstrap.js",1,null)
                                      
                                      val transformFunction = context.evaluateString(scope, "__rescripted.script.transform", "<cmd>", 1, null) //scope.get("__rescripted.script.transform", scope)
                                      if(!transformFunction.isInstanceOf[Function])
                                        error("'rescripted-bootstrap.js' was not loaded properly, unable to continue.")
                                    
                                      transformFunction.asInstanceOf[Function]
                                    } finally {
                                      reader.close()
                                    }
                                  }

  def transform(source:String):String =
    try{
      Context.toString(transformFunction.call(context, scope, scope, Array(source)))
    } catch {
      case e:org.mozilla.javascript.JavaScriptException => error("javascript exception:\n"+e.details)
    }
                                    
  def destroy() = Context.exit()
}

