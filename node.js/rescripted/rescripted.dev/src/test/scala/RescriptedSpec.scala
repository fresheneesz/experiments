import org.specs2._
import org.specs2.execute._
import org.specs2.specification._
import java.io._

class GrammarSpec extends Specification { 
 
  val grammarFiles = new File("./src/test/resources/grammar-tests/").listFiles()
  
  def is =
    (for(file <- grammarFiles) yield {
      file.getName() ! test(file) ^ p ^ end 
    }).reduceLeft{(a,b) => new Fragments(None, a.middle++b.middle, a.arguments, None, a.seeOnly)} 
     
  def test(file:File):Result = {
    val debuginfo = RescriptedTest.test(new FileInputStream(file))
                
    val tokenfile = new File("./target/tokens/"+file.getName())
    if(tokenfile.exists())
      tokenfile.delete()
    else
      tokenfile.getParentFile().mkdirs()
          
    val filestream = new FileOutputStream(tokenfile)
    filestream.write(debuginfo.tokens.getBytes())
    filestream.close()
    
    if(debuginfo.errors == Nil)
      return new Success("yay!") 
    else{
      val message = debuginfo.errors.map(_.debug).mkString("")
      return new Failure("\n"+message,"sdfdsf")
    }
  }
}

