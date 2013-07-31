import sbt._
import Process._
import java.io._
import java.util.Date
import java.net.{URL, URLClassLoader}
import scala.xml.NodeSeq

class RescriptedProject(info: ProjectInfo) extends DefaultWebProject(info){
  currentProject =>
  
  /******************
  | app config      |
  ******************/
  
  
  /******************
  | dependencies    |
  ******************/

  override def repositories = Set(
    "java.net" at "http://download.java.net/maven/2/",
    ScalaToolsSnapshots
  )

  override def libraryDependencies = Set(
    "org.eclipse.jetty" % "jetty-server" % "7.0.1.v20091125" % "test->default",
    "org.eclipse.jetty" % "jetty-webapp" % "7.0.1.v20091125" % "test->default",
    "org.eclipse.jetty" % "jetty-plus" % "7.0.1.v20091125" % "test->default",
    "org.apache.tomcat" % "jasper" % "6.0.18" % "provided"
  )
  
  /******************
  | jetty config    |
  ******************/
  
  override def jettyPort = 12345
  override def jettyWebappPath = webappPath
  override def scanDirectories = super.jettyWebappPath / "WEB-INF" :: Nil
  
  
  /******************
  | misc            |
  ******************/
  
  override def consoleInit =
    """
    import java.io._
    """
  

  /******************
  | building        |
  ******************/
  
  var currentPaths = None:Option[PathFinder]
  
  override def watchPaths = currentPaths getOrElse {(webappPath ** "*.re.js") +++ (webappPath * "rescripted.js")}
  override def javaCompileOptions = super.javaCompileOptions ++ (Seq("-Xlint:unchecked","-Xlint:deprecation") map JavaCompileOption)  
  override def compileOptions = super.compileOptions ++ (Seq("-unchecked","-g:vars") map CompileOption)
  
  lazy val prepare = task{
    prepareScriptAction.run
    prepareLibsAction.run
    currentPaths = None
    None
  }.dependsOn(compile)
  
  lazy val prepareScript = prepareScriptAction.dependsOn(compile)
  
  def prepareScriptAction = task{
    val rescriptedSource = "src/main/webapp/rescripted.js"
    val rescriptedComplete = "src/main/webapp/rescripted-complete.js"
    val rescriptedCompleteFile = new File(rescriptedComplete)
    val rescriptedMin = "src/main/webapp/rescripted-min.js"
    val libFiles = Array(
                    "src/main/webapp/collections.re.js",
                    "src/main/webapp/xml.re.js",
                    "src/main/webapp/rescripted-1.0/rescripted-parser.re.js",
                    "src/main/webapp/rescripted-1.0/rescripted-ast.re.js",
                    "src/main/webapp/rescripted-1.0/rescripted-grammar.re.js",
                    "src/main/webapp/rescripted-1.0/rescripted-javascript.re.js"
                    )
    val preparedFiles = libFiles map (_ replace (".re.js",".pre.js"))
    val toCombine = Array(rescriptedSource) ++ preparedFiles
    val inputFiles = (List(rescriptedSource) ++ libFiles) map (new File(_)) 
    
    if(!sourcesModified(inputFiles,rescriptedCompleteFile)){
      log.info("No modified input files, skipping '"+rescriptedCompleteFile.getAbsolutePath+"'")
    } else {
    
      try{
        //transform
        libFiles zip preparedFiles foreach {case (src,dest) => transform(src,dest) }
        log.success("transformation complete.")
        println("")
    
        //combine
        combine(toCombine:_*)(rescriptedComplete)
        log.success("combination complete.")
        println("")
        
        //minify
        minify(rescriptedComplete,rescriptedMin)
        log.success("minification complete.")
        println("")
      } finally {
        preparedFiles map (new File(_)) foreach (_.delete)
      }

    }
    
    currentPaths = None
    
    None
  }
  
  def listFiles(file:File) = Some(file.listFiles) filter (_!=null) getOrElse Array[File]()
  
  def rescriptedLibsPath = (webappPath / "lib")
  def rescriptedLibFiles = rescriptedLibsPath * "*.js"
  def rescriptedLibsFolders = listFiles(rescriptedLibsPath.asFile) filter (_.isDirectory)
  
  lazy val prepareLibs = prepareLibsAction.dependsOn(compile)
  
  def prepareLibsAction = compileLibsAction(rescriptedLibsPath.asFile.getAbsolutePath)
  
  lazy val compileLibs = task{ args => compileLibsAction(args(0)).dependsOn(compile) }
  
  def compileLibsAction(libsFolderPath:String) = task{
    var libFolder = new File(libsFolderPath)
    val libFolders = Some(libFolder.listFiles) filter (_!=null) getOrElse (Array[File]()) filter (_.isDirectory)
    
    for(folder <- libFolders){
      compileLibAction(folder.getAbsolutePath,new File(libFolder,folder.getName+".js").getAbsolutePath).run
    }
    
    currentPaths = Some(Path.fromFile(libFolder) ** "*.re.js")

    None
  }
  
  lazy val compileLib = task{ args => compileLibAction(args(0),args(1)).dependsOn(compile) }
  
  def sourcesModified(sources:List[File],dest:File) = {
    val sourcesLatestModified:Long = ( sources map (_.lastModified) sort (_ > _) ).head
    sourcesLatestModified > dest.lastModified
  }
  
  def compileLibAction(folder:String,dest:String) = task{
    val libFolder = new File(folder)
    val pathFinder = Path.fromFile(folder) ** "*.re.js"
    val inputFiles = pathFinder.getFiles.toList
    val rescriptedFiles = (inputFiles map (_.getAbsolutePath)).sort(_ < _)
    
    val completeFile = new File(dest)
    
    if(!sourcesModified(inputFiles,completeFile)){
      log.info("No modified input files, skipping '"+completeFile.getAbsolutePath+"'")
    } else {
      build(rescriptedFiles:_*)(completeFile.getAbsolutePath)
    }

    currentPaths = Some(pathFinder)

    None
  }
  
  def transform(source:String,dest:String){
    log.info("transforming '"+source+"' -> '"+dest+"'")
    rescriptedTransformer("transform",source,dest)
  }
  
  def combine(sources:String*)(dest:String){
    for(path <- sources) log.info("combining '"+path+"' -> '"+dest+"'")
    rescriptedTransformer((Array("combine-files-into",dest) ++ sources):_*)
  }
  
  def minify(source:String,dest:String){
    log.info("minifying '"+source+"' -> '"+dest+"'")
    (new java.lang.ProcessBuilder("java", "-jar","tools/yuicompressor-2.4.2.jar","-o",dest,source)) ! log
  }
  
  def build(sources:String*)(dest:String){
    for(path <- sources) log.info("building '"+path+"' -> '"+dest+"'")
    rescriptedTransformer((Array("build",dest) ++ sources):_*)
  
    val minFile = new File(dest.replace(".js","-min.js")).getAbsolutePath
    minify(dest,minFile)
  }
  
  def rescriptedTransformer(args:String*) = {
    //new Fork.ForkScala("rescripted.RescriptedTransformer")(None,Nil,runClasspath.getFiles,args,log)
    //runTask(Some("rescripted.RescriptedTransformer"), runClasspath, args:_*).run
    Run.run("rescripted.RescriptedTransformer",runClasspath.get,args,log) foreach println
  }
  
  def copyFile(src:File,dest:File){
    if(src.isFile) {
      rawCopyFile(src,dest)
    } else if(src.isDirectory) {
      if(!dest.exists) dest.mkdirs()
        
      for(file <- listFiles(src)){
        copyFile(file,new File(dest,file.getName))
      }
    }
  }
  
  def rawCopyFile(in:File,out:File){
    val input = new FileInputStream(in)
    val output = new FileOutputStream(out)
    val buffer = new Array[Byte](32*1024)
    try{
      while(true){
        val readCount = input.read(buffer,0,buffer.size)
        if(readCount == -1) return;
        output.write(buffer,0,readCount)
      }
    } finally {
      input.close()
      output.close()
    }
  }
  
  def delete(toDelete:File){
    if(toDelete.isFile) {
      toDelete.delete()
    } else if(toDelete.isDirectory){
      for(file <- listFiles(toDelete))
        delete(file)
      
      toDelete.delete()
    }
  }
  
  override def cleanAction = task{
    //remove everything in dist
    for(file <- listFiles(distFolder)) delete(file)
      
    //delete generated lib files
    for(file <- rescriptedLibFiles.getFiles) delete(file)
      
    //delete generated rescripted files
    delete(new File("src/main/webapp/rescripted-complete.js"))
    delete(new File("src/main/webapp/rescripted-min.js"))
    
    super.cleanAction.run
  }
  
  val distFolder = (webappPath / "dist").asFile
  def distAction = task{
    distFolder.mkdirs()
    
    //delete files in dist folder
    for(file <- listFiles(distFolder)) delete(file)
    
    //copy rescripted files
    copyFile(new File("src/main/webapp/rescripted-complete.js"),new File("src/main/webapp/dist/rescripted-complete.js"))
    copyFile(new File("src/main/webapp/rescripted-min.js"),new File("src/main/webapp/dist/rescripted-min.js"))
    
    //copy lib files
    for(file <- rescriptedLibFiles.getFiles) copyFile(file,new File(distFolder,file.getName))
      
    def shouldCopy(filename:String) = !filename.endsWith(".re.js") && !filename.endsWith("#") && !filename.endsWith(".orig")
    
    //copy resources
    for(folder <- rescriptedLibsFolders;file <- listFiles(folder) if shouldCopy(file.getName)){
      copyFile(file,new File(distFolder,file.getName))
    }
      
    None
  } dependsOn prepare
  
  lazy val dist = distAction
  
  def distCopyAction(dest:String) = task{
    val destFolder = new File(dest)
    destFolder.mkdirs()
    
    //delete files in dest folder
    for(file <- listFiles(destFolder)) delete(file)
      
    //copy files
    for(file <- listFiles(distFolder)) copyFile(file,new File(destFolder,file.getName))
    
    None
  }
  
  lazy val distCopy = task{ args => distCopyAction(args(0)).dependsOn(dist) }
  
  
  override def packageAction = super.packageAction dependsOn distAction

  
  /******************
  | testing         |
  ******************/
  
  def runClassTask(className:String) = task{args => runTask(Some(className), runClasspath, args:_*).dependsOn(compile) }
  lazy val runClass = task{args => runTask(args.firstOption, runClasspath, args.drop(1):_*).dependsOn(compile) }

}
