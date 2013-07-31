package rescripted;

import javax.servlet._
import javax.servlet.http._

class RescriptedService extends HttpServlet{
  
  override def service(request:HttpServletRequest,response:HttpServletResponse){
    val url = request.getParameter("url")
    val source = readUrl(url)    
    val transformed = RescriptedTransformer.transform(source).getBytes("UTF-8")
    
    response.setContentType("text/javascript; charset=UTF-8")
    response.setContentLength(transformed.length)
    response.getOutputStream.write(transformed)
  }
  
  def openUrl(url:String) = {
    val connection = new java.net.URL(url).openConnection()
    connection.setConnectTimeout(500)
    connection.setReadTimeout(500)
    connection.getInputStream
  }
  
  def readUrl(url:String) = scala.io.Source.fromInputStream(openUrl(url)).getLines.mkString("\n")
}
