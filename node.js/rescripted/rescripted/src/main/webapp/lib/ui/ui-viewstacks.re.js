//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{

  class ViewStack(settings,viewStackType) extends Container(settings){
    viewStackType = viewStackType || "viewstack"

    var _selectedIndex = self.settings.selectedIndex || 0
    
    self.change = Event(self)
    
    private def showChild(index) = {
      return {=>
        _selectedIndex = index
        var child = children(index)
        var toHide = jquery("> ."+viewStackType+"-children > ."+viewStackType+"-child.selected")
        var toShow = jquery("> ."+viewStackType+"-children > ."+viewStackType+"-child.child"+index)
        
        if(toShow.hasClass("lazy")){
         	child.appendTo(toShow)
        	toShow.removeClass("lazy")
        }
        
        toHide.removeClass("visible").removeClass("selected")
        toShow.addClass("visible").addClass("selected")
        
        change.invoke(child,_selectedIndex)
      }
    }

    def bindData() = {
      var index = 0
      return for(child <- self.children) yield{
        return {label:child.settings.label,action:showChild(index++)}
      }
    }
    
    def selectedIndex(index) = {
      if(arguments.length > 0) showChild(index)()
      return _selectedIndex
    }
    
    def selectedChild() = { return children(_selectedIndex) }
    
    def body() = { return childContainer() }
    
    def childContainer() = {
      var index = 0;
      return {
        <div class={|viewStackType+'-children'|}>
        {|
          for(child <- self.children) yield {
            var className = List(viewStackType+'-child',"child"+index,index == 0?'visible':'',(index++ == _selectedIndex)?'selected':'',"lazy").filter({_!=''}).mkString(" ")
            return {<div class={|className|}></div>}
          }
        |}
        </div>
      }
    }
    
    domInserted{=> selectedIndex(_selectedIndex) }
    
    override def render() = {
      return {
        <div class={|viewStackType+'-container'|}>
          {|body()|}
        </div>
      }
    }
  }
  
  class TabContainer(settings) extends Container(settings){
    var showChildEffect = self.settings.showChildEffect || {onComplete,toHide,toShow =>
      toHide.removeClass("visible")
      toShow.addClass("visible")
      onComplete()
    }

    var selectedIndex = self.settings.selectedIndex || 0

    var tabcontrols = BoundValue{value:null}
    
    private def tabs() = {
      var index = 0;
      return self.children.map{tab =>
        return Button({label:tab.settings.label,classNames:["tab-button",(index%2==0?"even":"odd"),"child"+index,(index == selectedIndex)?'selected':'']}).click(showChild(index++))
      }
    }
    
    private def showChild(index) = {
      return {=>
        selectedIndex = index
        var child = children(index)
        
        var toHide = jquery("> .tab-children > .tab-child.selected")
        var toShow = jquery("> .tab-children > .tab-child.child"+index)
        
        if(toShow.hasClass("lazy")){
         	child.appendTo(toShow)
        	toShow.removeClass("lazy")
        }

        tabcontrols(child.settings.controls)
        
				showChildEffect(
					{=>toHide.removeClass("selected");toShow.addClass("selected")},
					toHide,toShow,jquery()
				)
			 
				
        jquery("> .tab-list > .tab-button.selected").removeClass("selected")
        jquery("> .tab-list > .tab-button.child"+index).addClass("selected")
      }
    }
    
    private def tabBodies() = {
      var index = 0;
      return for(child <- self.children) yield {
        var isSelected = index == selectedIndex
      	var className = List('tab-child',"child"+index, (isSelected)?'selected':'',"lazy").filter(_!='').mkString(" ")
        
      	index++

        return {<div class={|className|}></div>}
      }
    }
    
    domInserted{=> showChild(selectedIndex)() }
    
    override def render() = {
      return {
        <div class='tab-container'>
          <div class='tab-list'>
            {|tabs()|}
          </div>
          <div class="tab-controls">
            {|tabcontrols|}
          </div>
          <div class='tab-children'>
            {|tabBodies()|}
          </div>
        </div>
      }
    }
  }
  
  class Wizard(settings) extends ViewStack(settings,"wizard"){
    var controls = BoundValue{value:null}
    var title = BoundValue{value:self.settings.title}
    
    self.finish = Event(self)
    
    change{ child,index =>
      title(child.settings.title || self.settings.title)
      controls(child.settings.controls)
      if(child.settings.controls){
        jquery(".wizard-controls").show()
      } else {
        jquery(".wizard-controls").hide()
      }
    }
    
    override def selectedIndex(index){
      if(arguments.length > 0){
        if(index > 0) jquery(".previous-button").show()
        else jquery(".previous-button").hide()
        
        if(index < children.size() - 1) jquery(".next-button").show()
        else jquery(".next-button").hide()
        
        if(index == children.size() - 1) jquery(".finish-button").show()
        else jquery(".finish-button").hide()
      }
      
      return base.selectedIndex(index)
    }
    
    private def moveForward(action) = {
      return {=>
        var errorMessages = Option(selectedChild().settings.validator).map(_.validationErrors()).getOrElse(List())
        
        if(errorMessages.size() == 0)
          return action()

        ToolTip{classNames:"error",styles:{"max-width":"400px"}}{<ul>{| errorMessages.map(message => {<li>{|message|}</li>}) |}</ul>}.showFor(this,"top-right")
      }
    }
    
    def navigationControls() = {
      return List(
        Button{label:"Previous",classNames:"previous-button"}.click{=> selectedIndex(base.selectedIndex() - 1)},
        Button{label:"Next",classNames:"next-button highlight"}.click(moveForward{=> selectedIndex(base.selectedIndex() + 1)}),
        Button{label:self.settings.finishLabel || "Finish",classNames:"finish-button highlight pulse"}.click(moveForward{=> self.finish.invoke() })
      )
    }
    
    override def body() = {
      return List(
        {<h1 class="wizard-title">{|title|}</h1>},
        {
          <div class="wizard-control-container">
            <div class="wizard-controls">{|controls|}</div>
            <div class="wizard-navigation">{|navigationControls()|}</div>
          </div>
        },
        childContainer()
      )
    }
  }
  
}
