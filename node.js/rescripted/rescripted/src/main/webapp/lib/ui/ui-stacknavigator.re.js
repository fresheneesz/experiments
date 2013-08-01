//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{
  
  object StackNavigator{
    object Path{
      def unapply(str,wildcard,extractor) = (
        (typeOf(str) != String)? null : Seq.unapply(parts(str),wildcard,extractor)
      )
      def parts(path) = {return Seq.fromArray((path || "").split("/")).dropWhile(_=="")}
      def partCount(path) = {return parts(path).size()}
    }
    
    object Command{
      def unapply(str,wildcard,extractor) = (
       (typeOf(str) != String)? null : Seq.unapply(parts(str),wildcard,extractor)
      )
      def parts(path) = ( Seq.fromArray((path || "").split(":")) )
    }
  }
  
  class StackNavigator(settings) extends Component(settings){
    self.Path = StackNavigator.Path
    self.Command = StackNavigator.Command

    def defaultPath() = (settingsWithDefaults{path:"/"}.path)
    
    var children = List() //all children in the stack
    var activeChildren = List() //visible children in the stack
    
    var currentPath = null
    
    def navigateTo(path,options){
      options = options || {}
      if(path.charAt(0) != "/" && path.charAt(0) != "#"){
        path = "/"+currentPath+"/"+path
      }
      handleNavigation(path,undefined,undefined,options.force == true)
    }
    
    def refresh(){ handleNavigation(currentPath,true,true,true) }
    
    private def handleNavigation(path,refresh,rebuild,force){
      
      var hashNavigation = path == "#"
      
      //pull path from the hash
      if(hashNavigation) path = location.hash.substring(1)
        
      //parse the path
      var pathParts = Path.parts(path)
      var normalizedPath = pathParts.mkString("/")
        
      //undefined paths are resolved to the root path
      if(!resolve.isDefinedAt(path)) path = "/"
      
      //detect redirects
      if(!redirect.isAbstract && redirect.isDefinedAt(normalizedPath))
        return handleNavigation(redirect(normalizedPath),refresh,rebuild,force)
      
      //detect canceled navigation
      if(!force){
        var cancelledNavigation = false
        for(child <- children if !child.allowNavigation(normalizedPath)){ cancelledNavigation = true }
        if(cancelledNavigation) return;
      }

      //update the hash
      if(!refresh && defaultPath() == "#" && !hashNavigation) location.hash = path

      //detect attempt to renavigate
      if(normalizedPath == currentPath && !refresh) return;
      currentPath = normalizedPath
      
      //collect info on paths
      var allPaths = Range(0,pathParts.size()).inclusive().map(i => pathParts.take(i).mkString("/"))
      var childrenToRemove = rebuild ? children : children.filter(child => !allPaths.contains(child.currentPath))
      
      //only keep the children that are still part of the path
      children = rebuild ? List() : children.filter(child => allPaths.contains(child.currentPath))
      
      //find missing paths and generate the components
      for(unresolvedPath <- allPaths if !children.exists(_.currentPath == unresolvedPath)){
        if(!resolve.isDefinedAt(unresolvedPath))
          error("Unable to resolve path '"+unresolvedPath+"' while trying to navigate to '"+path+"'.")
        
        var child = resolve(unresolvedPath)
        child.currentPath = unresolvedPath
        child.navigator = self
        children.push(child)
      }
      
      //measure and select children
      var totalWidth = jquery().width()
      var availableWidth = totalWidth
      var currentIndex = 0
      activeChildren = List()
      for(var i=children.size() - 1;i>=0;i--){
        var child = children(i).changeState({depth:currentIndex,totalWidth:totalWidth,availableWidth:availableWidth})
        //don't break if we are on the first child, the first child is always active
        if(currentIndex!=0 && child.preferredWidth > availableWidth)
          break;
        activeChildren.append(child)
        availableWidth -= child.preferredWidth
        currentIndex++
      }
      activeChildren(0).preferredWidth += availableWidth
      
      //notify children of their new locations
      var areaRemaining = totalWidth
      for(child <- activeChildren){
        areaRemaining -= child.preferredWidth
        child.currentLeft = areaRemaining
      }
      
      //remove children that are no longer welcome
      for(child <- childrenToRemove if child.currentControl != null){
        child.jquery().animate({left:(Path.partCount(child.currentPath) >= Path.partCount(currentPath))?totalWidth:0,width:0},250,{=> child.remove()})
      }
      
      //shove children into their proper place if they survived
      var container = jquery("> .components")
      for(child <- activeChildren){
        if(child.element() == null){
          child.appendTo(container).jquery().css({left:(Path.partCount(child.currentPath) >= Path.partCount(currentPath))?totalWidth:0,width:0})
        }
        child.jquery().show()
        child.moveIntoPlace()
      }
      
      //hide the children that don't have enough room to be shown
      for(child <- children if !activeChildren.contains(child)){
        child.jquery().animate({left:0,width:0},250,{=> child.jquery().hide()})
      }
      
      //notify children of new sub paths
      for(child <- children.take(children.size()-1)){
        child.subPathNavigated.invoke(normalizedPath.substring(child.currentPath.length))
      }
      
      //breadcrumb
      var breadcrumb = jquery("> .stack-navigator-toolbar > .breadcrumb").empty()
      //var breadcrumbData = children.map(child => { label:child.label, action:{=> self.navigateTo("/"+child.currentPath)} })
      //ButtonBar{dataProvider:breadcrumbData}.appendTo(breadcrumb)
      var last = children.size() - 1
      var currentButton = 0
      Container()(
        children.map{child =>
          var index = currentButton++
          return Button{
                    label:child.label,
                    classNames:List("breadcrumb-button",(index == 0? "home":""),(index == last?"selected":""),"child"+index).filter(_!="")
                  }.click{=> self.navigateTo("/"+child.currentPath) }
        }
      ).appendTo(breadcrumb)
      
      //controls
      activeChildren(0).controls.appendTo(jquery("> .stack-navigator-toolbar > .controls").empty())
      
      setTimeout(detectMultilineNavigation,250)
    }
    
    def detectMultilineNavigation(){
      var breadcrumbWidth = jquery("> .stack-navigator-toolbar > .breadcrumb").width()
      var controlsWidth = jquery("> .stack-navigator-toolbar > .controls").width()
      var navigationWidth = jquery("> .stack-navigator-toolbar").width()
      if( (breadcrumbWidth + controlsWidth + 20) > navigationWidth)
        jquery().addClass("two-lines")
      else
        jquery().removeClass("two-lines")
    }
    
    def resolve(path) = ???
    def redirect(path) = ???
    
    domMeasured{=>
      if(defaultPath() == "#") $(window).bind('hashchange',{=> navigateTo("#")});
      navigateTo(defaultPath())
    }
        
    $(window).resize(DelayedAction(500,{=>
      handleNavigation(currentPath,true,false,true)
      detectMultilineNavigation()
    }))
        
    def render() = {
      <div class="stack-navigator">
        <div class="stack-navigator-toolbar">
          <div class="breadcrumb"></div>
          <div class="controls"></div>
        </div>
        <div class="components"></div>
      </div>
    }
    
  }
  
  class StackChild(settings) extends Component(settings){
    self.Path = StackNavigator.Path
    self.Command = StackNavigator.Command
    
    object State{
      def unapply(obj,wildcard,extractor) = {
        if(wildcard || extractor.length != 3) return null
        return extractor(obj.depth,obj.totalWidth,obj.availableWidth)
      }
    }
    
    self.currentPath = null
    self.currentControl = null
    self.currentLeft = null
    self.preferredWidth = null
    self.widthChanged = false
    self.controlChanged = false
    self.navigator = null
    
    def changeState(state){
      var result = createView(state)
      var preferredWidth = isInstanceOf(result,Component)? state.totalWidth:result.width
      var currentControl = isInstanceOf(result,Component)? result:result.control
    
      //mark the component if it changed visually
      self.widthChanged = self.widthChanged || preferredWidth != self.preferredWidth
      self.controlChanged = self.controlChanged || currentControl != self.currentControl
      
      self.preferredWidth = preferredWidth
      self.currentControl = currentControl
      
      //if(self.preferredWidth <= 0) error("the width of a rendered StackChild must be greated than 0")
      if(self.preferredWidth < 0) self.preferredWidth = 0
        
      return self
    }
    
    self.subPathNavigated = Event(self)
    def allowNavigation(path) = (true)
    
    self.label = BoundValue{value:null}.change(detectMultilineNavigation)
    self.controls = BoundValue{value:null}.change(detectMultilineNavigation)
    
    private def detectMultilineNavigation(){
      if(self.navigator != null){
        setTimeout(self.navigator.detectMultilineNavigation,500)
      }
    }
    
    def render() = {
      if(self.settings.type=="canvas"){
        self.container = Container{width:"0px"}
        self.content = self.container.jquery
      } else {
        self.container = ScrollableContainer{width:"0px",classNames:"stack-child-scrollable-container"}
        self.content = self.container.scrollableContent
        self.scrollableContainer = self.container
      }
      return {<div class="stack-child">{|self.container|}</div>}
    }
    
    def moveIntoPlace(){
      var animationComplete = {=>
        if(self.widthChanged) self.container.jquery().css({width:self.preferredWidth})
        if(self.controlChanged){
          if(self.scrollableContainer) self.scrollableContainer.scrollToY(0)
          LoadingMessage().appendTo(self.content().empty())
          setTimeout({=> self.currentControl.appendTo(self.content().empty()) },50)
        }
        self.widthChanged = false
        self.controlChanged = false
      }
      jquery().animate({left:self.currentLeft,width:self.preferredWidth},250,animationComplete)
    }
    
    def createView(state) = ???
  }
  
  class DefaultStackChild(settings) extends StackChild(settings){
    label(self.settings.label)
    var control = Container()(Label("Place Holder: DefaultStackChild"))
    def createView(state) = ( control )
  }
}

