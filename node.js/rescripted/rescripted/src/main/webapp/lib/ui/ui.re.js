//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{

  object PropertyBinding{
    def create(args) = {
      if(args.length == 1 && typeOf(args[0]) == Function)
        return args[0]
      return __rescripted.util._bindProperty(args[0],List.fromArray(args).drop(1).toArray())
    }
  }
    
  class Event(component){
    self.listeners = List()
    
    def size() = ( self.listeners.size() )
    
    def add(func) = { self.listeners.append(func) }
    def remove(func) = { self.listeners = self.listeners.filter(_ != func) }
    
    def invoke(){
      var args = arguments;
      for(func <- self.listeners){
        try{ func.apply(null,args) } catch(e) {logError(e)}
      }
    }
    
    def apply(func) = {add(func); return component}
    
    self.valueHandler = {=> self.invoke(this.value) }
  }
  
  class BoundObject(obj){
    obj = obj || {}
    self.change = Event(self)
    def value() = (obj)
  
    def createBoundProperty(propertiesList,propertyRef) = {
      var binding = propertyRef(obj)
      var propertyName = propertiesList.join(".")
      return {value => 
        if(arguments.length == 1) change.invoke(propertyName,value);
        return binding.apply(null,arguments)
      }
    }
  }

  object Component{
    var currentId = 0
    def nextId() = ( currentId++ )
  }

  class Component(settings){
    self.settings = settings || {}
    self.componentId = self.settings.id || "componentId"+Component.nextId()
    self.classNames = self.settings.classNames
    self.styles = self.settings.styles
    self.domInserted = Event(self)
    
    def domMeasured(func) = {
      return self.domInserted{node=>
        var count = 0;
        var timeWindow = 125
        setTimeout({=>
          if(timeWindow < 2000) timeWindow *= 2;
          //println(self.componentId+": "+node.clientWidth+"x"+node.clientHeight+" - "+(count++)+" - "+timeWindow)
          if(node.clientWidth == 0 && node.clientHeight == 0){ setTimeout(arguments.callee,timeWindow) }
          else{ func(node) }
        },timeWindow)
      }
    }
    
    if(self.settings.captureRef) self.settings.captureRef(self)

    def settingsWithDefaults(o) = {
      var result = __rescripted.util.merge(self.settings,{});
      for(var property in o)
        if(!(property in result))
          result[property] = o[property]
      return result
    }

    def bindRef() = {
      PropertyBinding.create(arguments)(self)
      return self
    }

    def element() = ( document.getElementById(self.componentId) )

    def toXmlNode() = {
      
      //every control has an id
      var result = XmlSetAttribute(self.render(),'id',self.componentId)

      //support explicit width and height on all controls
      var width = Option(self.settings.width).map(UiTools.ensureUnits).map(width => "width:"+width+";")//max-width:"+width+"!important;min-width:"+width+"!important;
      var height = Option(self.settings.height).map(UiTools.ensureUnits).map(height => "height:"+height+";")//max-height:"+width+"!important;min-height:"+width+"!important;
      var style = List(self.styles,width,height,XmlGetAttribute(result,'style')).flatten().filter(_!=null).map{
        case s:String => s
        case o:Object => Map(o).map(item => item[0]+":"+item[1]+";").mkString("")
        case other => other
      }.filter(_!='').mkString("")
      if(style!='') XmlSetAttribute(result,'style',style)
        
      //detect explicit width and height and mark the control
      var hasExplicitWidth = (/width\s*:/i).test(style)? "explicit-width":""
      var hasExplicitHeight = (/height\s*:/i).test(style)? "explicit-height":""
      
      //every control supports adding in classNames
      XmlSetAttribute(result,'class',List(self.classNames,XmlGetAttribute(result,'class'),hasExplicitWidth,hasExplicitHeight).flatten().filter(_!='').filter(_!=null).mkString(" "))
      
      //trigger domInserted event if necessary
      if(self.domInserted.size() > 0){
        var timeWindow = 125;
        setTimeout({=>
          var componentNode = element()
          if(componentNode == null){
            timeWindow *= 2
            if(timeWindow > 16000){
              logError("failure to detect dom insertion for component with id:" +self.componentId)
              return;
            }
            setTimeout(arguments.callee,timeWindow)
          } else {
            self.domInserted.invoke(componentNode)
          }
        },timeWindow)
      }
      
      return result;
    }
    
    def render() = ???
    
    def remove() = {
      self.jquery().remove()
      return self
    }
    
    def appendTo(parent) = {
      remove()
      XmlResolveParent(parent).appendChild(self.toXmlNode())
      return self;
    }

    def jquery() = ( (arguments.length == 0)? $("#"+self.componentId):$(arguments[0],$("#"+self.componentId)) )
  }
  
  class Container(settings) extends Component(settings){
    self.children = ArraySeq()
    
    def apply(){
      self.children = Seq.fromArray(arguments).flatten().filter(_!=null)
      return self
    }
    
    override def render() = { <div class='container'>{|self.children|}</div> }
  }
    
  def lazy(func) = {
    var cached = false
    var cache = null
    return {=>
      if(!cached){
        cache = func()
        cached = true
      }
      return cache;
    }
  }
  
  def metaViewport(settings){ $("head").append{<meta name="viewport" id="viewport" content={|settings|}></meta>} }
  
  def useBodyScroll(){ $("body").addClass("use-body-scroll") }
  
  def isAndroid() = ( navigator.userAgent.toLowerCase().indexOf("android") != -1 )

  def isAndroidMobile() = {
    var uagent = navigator.userAgent.toLowerCase();
    return uagent.indexOf("android") != -1 && uagent.indexOf("mobile") != -1
  }
  def isAndroidTablet() = {
    var uagent = navigator.userAgent.toLowerCase();
    return uagent.indexOf("android") != -1 && uagent.indexOf("mobile") == -1
  }
  
  def isWebOS() = ( navigator.userAgent.toLowerCase().indexOf("webos") != -1 )

  def isIOS() = {
    var uagent = navigator.userAgent.toLowerCase();
    return uagent.indexOf("ios") != -1 || uagent.indexOf("iphone") != -1 || uagent.indexOf("ipad") != -1 || uagent.indexOf("ipod") != -1
  }
  
  def hasSvg() = (
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0") ||
    document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
  )
  
  def hasVml() = {
    if(typeof hasVml.supported == "undefined") {
      var a = document.body.appendChild(document.createElement('div'));
      a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
      var b = a.firstChild;
      b.style.behavior = "url(#default#VML)";
      hasVml.supported = b ? typeof b.adj == "object": true;
      a.parentNode.removeChild(a);
    }
    return hasVml.supported
  }
  
  def hasVectorSupport() = ( (hasSvg() || hasVml()) && !isIOS() )
  
  def isMobileBrowser() = {
    if(location.search.indexOf("mobile=false")!=-1)
      return false;
    if(location.search.indexOf("mobile=true")!=-1)
      return true;
    var mobileDevices = ["iphone","ipod","webos","android","ipad"];//"mobile"?
    var uagent = navigator.userAgent.toLowerCase();
    //println("user agent: "+uagent);
    for(var i=0;i<mobileDevices.length;i++){
      if(uagent.indexOf(mobileDevices[i])!=-1)
        return true;
    }
    return false;
  }
  
  def mobileViewports(settings){
    settings = settings || {}
    if(isMobileBrowser()){
      if(isWebOS() || isAndroidMobile() || screen.width <= 600 || screen.height <= 320){
        //iphones, android phones, any webos device (tablets included)
        useBodyScroll()
        metaViewport(settings.phone || "width=650")
        
        $("body").addClass("phone")
        
      } else {
        //ipad, android tablets
        metaViewport(settings.tablet || "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no")
        
        $("body").addClass("tablet")
        
      }
    } else {
      //pc
      $("body").addClass("desktop")
      
    }
  }
  
  class DelayedAction(delayInMillis,action){
    
    var timeoutHandle = -1
    
    def apply(){
      if(timeoutHandle != -1) clearTimeout(timeoutHandle)
      timeoutHandle = setTimeout({=> 
        timeoutHandle = -1
        action()
      },delayInMillis)
    }
    
  }
  
  class FrequencyThrottle(maxFrequencyInMillis){
    
    var timeoutHandle = -1
    var queuedAction = null
    
    private def checkForAction(){
      timeoutHandle = -1
      if(queuedAction != null){
        queuedAction()
        queuedAction = null
        timeoutHandle = setTimeout(checkForAction,maxFrequencyInMillis)
      }
    }
    
    def apply(action){
      if(timeoutHandle == -1){
        action()
        timeoutHandle = setTimeout(checkForAction,maxFrequencyInMillis)
      } else {
        queuedAction = action
      }
    }
  }

  class DataSource(source){
    self.load = match(source){
      case seq:Seq => {callback=>callback(seq)}
      case array:Array => {callback=>callback(array)}
      case func:Function => func
      case other => {callback=>callback([])}
    }
    
    def apply(dataCallback,errorCallback){
      load(dataCallback,errorCallback)
    }
  }
  
  class DataSourceCache(action){
    
    var errored = false
    var loaded = false
    var results = null
    
    def invalidate() = {
      errored = false
      loaded = false
      results = false
    }
    
    def apply(dataCallback,errorCallback) = {
      if(loaded) {
        dataCallback(results)
      } else if(errored){
        errorCallback(results)
      } else {
        action(
          { response =>
            loaded = true
            results = response
            dataCallback(results)
          },
          { errorResponse =>
            loaded = true
            results = response
            errorCallback(results)
          }
        )
      }
    }
    
  }
  
  
}
