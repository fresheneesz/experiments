//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{

  class LazyComponent(childBuilder) extends Component({}){
    domInserted{=>
      var dest = element()
      var replacement = XmlJavascriptFragment(childBuilder())
      dest.parentNode.replaceChild(replacement,dest)
    }
    override def render() = (defaultLoadingMessage())
  }
  
  class BoundValue(settings) extends Component(settings){
    self.change = Event(self)
    self.value = self.settings.value
    
    def apply(value) = {
      if(arguments.length == 1){
        self.value = value;
        self.change.invoke(self.value)
      }
      return self.value
    }
    
    override def toXmlNode() = { return BoundValueReference(settings,self).toXmlNode() }
  }
  
  class BoundValueReference(settings,bindable) extends Component(settings){
    bindable.change{value =>
      var dest = self.jquery().empty()
      if(dest != null && dest.length > 0) XmlAppendChildren(dest.get(0),[bindable()])
    }
    override def render() = {<span class='bound-value-reference'>{|bindable()|}</span>}
  }
  
  object Formatters{
    var startsWithHttp = new RegExp("^https?://","i")
    def http(value){
      if(value.replace(/\s*/g,"") == "") return value
      if(startsWithHttp.test(value)) return value;
      return "http://"+value
    }
  }
  
  object Validation{
    def lazyValue = {
      case f:Function => f
      case v => (=> v)
    }
    
    def greaterThan(min) = {
      min = lazyValue(min)
      return {value,label =>
        var currentMin = min()
        return failIf(value <= currentMin,label+" must be greater than: "+currentMin)
      } 
    }
    
    def lessThan(max) = {
      max = lazyValue(max)
      return {value,label =>
        var currentMax = max()
        return failIf(value >= currentMax, label+" must be less than: "+currentMax) 
      }
    }
    
    def isEmail(value,label) = ( failIf(/^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value) == false,label+" is not properly formatted ") )
    def isNumber(value,label) = ( failIf(isNaN(parseFloat(value)),label+" must be a number") )
    def notEmpty(value,label) = ( failIf(ensureString(value).replace(/\s*/g,"") == "",label+" must not be empty") )
    
    def failIf(value,message) = ( value? Some(message):None )
    
    def whitelist(chars) = {
      chars = lazyValue(chars)
      return {value,label =>
        var acceptableChars = StringSeq(chars())
        value = StringSeq(ensureString(value))
        println("value:" +typeOf(value))
        var remainingValue = value.filter(acceptableChars.contains)
        println("remainingValue:" +typeOf(remainingValue))
        return failIf(remainingValue.size() != value.size(),label + ' must only contain the following characters: "'+acceptableChars+'"')
      }
    }
    
    def stringLengthMin(min) = {
      min = lazyValue(min)
      return {value,label =>
        value = ensureString(value)
        var current = min()
        return failIf(value.length < current,label + " must be at least "+current+" characters")
      }
    }
    
    def stringLengthMax(max) = {
      max = lazyValue(max)
      return {value,label =>
        value = ensureString(value)
        var current = max()
        return failIf(value.length > current,label + " must be at most "+current+" characters")
      }
    }
    
    def stringLength(exactLength) = {
      exactLength = lazyValue(exactLength)
      return {value,label =>
        value = ensureString(value)
        var current = exactLength()
        return failIf(value.length != current,label + " must be "+current+" characters")
      }
    }
    
    private def ensureString(value) = (Option(value).map(_.toString()).getOrElse(""))
    
  }
  
  object FormValidators{
    def process(input,args){
      if(args.exists(_ == null))
        error("arguments to the validate method must not be null")
      var validators = args.collect{ case v:FormValidator => v }
      var validationFunctions = args.filter(arg => !validators.contains(arg))
      if(validationFunctions.collect{ case f:Function if f.length == 2 => f}.size() != validationFunctions.size())
        error("validation functions must be two parameter functions")

      for(validator <- validators){
        for(func <- validationFunctions){
          validator.add{input:input,func:func}
        }
      }
    }
  }
  
  class FormValidator(){
    var validators = List()
    def isValid() = { return validationErrors().size() == 0 }
    
    def validationErrors() = {
      return for(validator <- validators) yield {
        if(typeOf(validator) == Function && validator.length == 0)
          return validator()
        else
          return validator.func(validator.input.value(),validator.input.settings.label || validator.input.componentId)
      }.flatten()
    }
    
    def add(item) = { validators.append(item) }
  }
  
  def labelStringToSettings = {
    case label:String => {label:label}
    case label if IsDomNode(label) => {label:label}
    case other => other
  }
  
  class Label(settings) extends Component(labelStringToSettings(settings)){
    def text(value){ self.jquery().text(value);self.settings.label = value; }
    override def render() = { return {<span class='label'>{|self.settings.label|}</span>} }
  }
  
  class TextInput(settings) extends Component(settings){
    self.change = Event(self)
    self.keyup = Event(self)
    self.blur = Event(self)
    self.focus = Event(self)
    
    self.formatter = null
    
    def bindTo() = {
      var binding = PropertyBinding.create(arguments)
      if(self.settings.defaultValue) binding(self.settings.defaultValue)
      else self.settings.defaultValue = binding()
      self.change.add(binding)
      return self;
    }
    
    blur{newValue =>
      if(self.formatter)
        value( self.formatter(newValue) )
      
      if(shouldShowPrompt())
        jquery().addClass("show-prompt")
      else
        jquery().removeClass("show-prompt")
    }
    
    focus{newValue =>
      jquery().removeClass("show-prompt")
    }
    
    def format(formatter) = {
      self.formatter = formatter
      return self;
    }
    
    def validate() = {
      FormValidators.process(self,Seq.fromArray(arguments))
      return self
    }
    
    def value() = {
    	if(arguments.length == 1)	self.jquery("input").val(arguments[0])
    	return Option(self.jquery("input").val()).getOrElse(self.settings.defaultValue)
    }
    
    override def disabled(disable) = {
    	self.jquery("input").attr('disabled', disable);
    }
    
    private def shouldShowPrompt() = {
      var hasPrompt = (self.settings.prompt || "") != ""
      var hasValue = (value() || "") != ""
      return hasPrompt && !hasValue
    }
    
    override def render() = {
      <span class={|"text-input"+(shouldShowPrompt()?" show-prompt":"")|}>
        <span class="text-input-prompt">{|self.settings.prompt|}</span>
        <input name={|self.settings.formName|} type={|self.settings.hideText ? "password" : "text"|} value={|self.settings.defaultValue|} onblur={|self.blur.valueHandler|} onfocus={|self.focus.valueHandler|} onchange={|self.change.valueHandler|} onkeyup={|self.keyup.valueHandler|} disabled={|self.settings.disabled ? true : null|} />
      </span>
    }
  }
  
  class TextArea(settings) extends TextInput(settings){    
    override def render() = {
      return {
        <div class="text-area">
          <textarea name={|self.settings.formName|} onchange={|self.change.valueHandler|} onkeyup={|self.keyup.valueHandler|} onblur={|self.blur.valueHandler|} disabled={|self.settings.disabled ? true : null|}>{|self.settings.defaultValue|}</textarea>
        </div>
      }
    }
      
    override def value() = {
    	if(arguments.length == 1)	$(" > textarea", self.jquery()).val(arguments[0])
    	return $(" > textarea", self.jquery()).val()
    }
    
    override def disabled(disable) = {
    	$("> textarea",self.jquery()).attr('disabled', disable);
    }
    
  }
  
  class HtmlArea(settings) extends TextInput(settings){

    var editorId = self.componentId+"_htmleditor"
        
    self.domInserted{=>
      self.editor = new tinymce.Editor(editorId, self.settings)
      self.editor.onInit.add{=> 
        self.editor.setContent(self.settings.defaultValue); 
        self.editor.onChange.add{=> self.change.invoke(self.editor.getContent())}
      }
      self.editor.render();
    }
    
    override def value() = {
    	if(arguments.length == 1) self.editor.setContent(arguments[0])
    	return self.editor.getContent()
    }
        
    override def render() = { 
      if(isMobileBrowser())
        return {<div>This functionality is not supported on mobile devices.  To make changes use a Computer.</div>} 
      else
        return {<div><textarea id={|editorId|} style="width:100%"></textarea></div>} 
    }
  }
  
  class CheckBox(settings) extends Component(settings){
    self.change = Event(self)

    def bindTo() = {
      var binding = PropertyBinding.create(arguments)
      if(self.settings.defaultValue) binding(self.settings.defaultValue)
      else self.settings.defaultValue = binding()
      self.change.add(binding)
      return self;
    }
    
    override def render() = {
      return {<input name={|self.settings.formName|} checked={|(self.settings.defaultValue == true)?"true":null|} class='checkbox' type='checkbox' onclick={|{=> self.change.invoke(this.checked) }|}></input>}
    }
  }
  
  class Button(settings) extends Component(settings){

    def click(action) = {
      self.onclick = action
      return self
    }
    
    override def render() = {
      //don't add newlines between any elements, it breaks ie7...
      return {<a class={| "button not-native "+  (self.settings.disabled ? "disabled" : "") |} onclick={| self.settings.disabled ? {=>return false} : self.onclick |} href="javascript:void(0);"><span class='button-container'><span class='button-text'>{|self.settings.label|}</span></span></a>}
    }
    
    override def disabled() = {
    	if(arguments.length != 1) return    		
     	if(arguments[0]){
    	  self.jquery().addClass("disabled")  
    	  self.jquery().unbind("click")
    	} else {
    	  self.jquery().removeClass("disabled")  
    	  self.jquery().click(self.onclick)    		
     	}
    }
    
  }
  
  class NativeButton(settings) extends Button(settings){
    override def render() = {
      return {<input type='button' class='button native' onclick={|self.onclick|} value={|self.settings.label|}></input>}
    }
  }
  

  class ComboBox(settings) extends Component(settings){
    self.data = List()
    def apply(){
      self.data = List.fromArray(arguments).flatten()
      return self
    }
    
    self.change = Event(self)
    
    private def getFirstValue() = {
      if(self.data.size() > 0){
        var option = self.data(0)
        if(typeOf(option) == String){
          return option
        } else {
          return ("label" in option)? (("value" in option)? option.value:""):option.toString();
        }
      }
      return null
    }
    
    def bindTo() = {
      var binding = PropertyBinding.create(arguments)
      if(self.data.size() > 0){
        var firstValue = getFirstValue()
        var currentBoundValue = binding()
        if(self.settings.defaultValue) binding(self.settings.defaultValue)
        else self.settings.defaultValue = currentBoundValue || firstValue
        if(!currentBoundValue) binding(firstValue)
      }
      self.change.add(binding)
      return self;
    }

    def validate() = {
      FormValidators.process(self,Seq.fromArray(arguments))
      return self
    }
    
    def value() = {
    	if(arguments.length == 1) jquery().val(arguments[0])
    	return jquery().val()
    }
    
    def options() = {
      self.settings.defaultValue = self.settings.defaultValue || getFirstValue()
      return for(option <- self.data) yield{
        var label = null
        var value = null
        if(typeOf(option) == String){
          label = option
          value = option
        } else {
          label = ("label" in option)? option.label : option.toString();
          value = ("label" in option)? (("value" in option)? option.value:""):option.toString();
        }
        var selected = (self.settings.defaultValue != null && value == self.settings.defaultValue)? true:null
        return {label:label,value:value,selected:selected}
      }
    }
    
    override def render() = {
      return {
        <select name={|self.settings.formName|} onchange={|self.change.valueHandler|}>
        {|
          for(option <- self.options()) yield{
            return {<option value={|option.value|} selected={|option.selected|}>{|option.label|}</option>}
          }
        |}
        </select>
      }
    }
  }
  
  class RadioGroup(settings) extends ComboBox(settings){
    var formName = self.settings.formName || ("radiogroup"+Component.nextId())
    override def render() = {
      var index = 0;
      return {
        <div class='radio-group'>
        {|
          for(option <- self.options()) yield {
            var id = self.componentId+"_radioButtonId"+(index++)
            return {
              <span>
                <input
                  id={|id|} type='radio' class='radio-button' name={|formName|}
                  value={|option.value|} checked={|option.selected|} onchange={|self.change.valueHandler|} onclick="this.blur()"></input>
                <label for={|id|}>{|option.label|}</label>
              </span>
            }
          }
        |}
        </div>
      }
    }
  }
  
  class ButtonBar(settings) extends Component(settings){

    self.data = self.settings.dataProvider || List()
    
    private def selectButton(item,index) = {
      return {=>
        _selectedIndex = index
        $("> .button-bar-buttons > .button-bar-button.selected",self.jquery()).removeClass("selected")
        $("> .button-bar-buttons > .button-bar-button.child"+index,self.jquery()).addClass("selected")
        var action = item.action || item.onselected
        if(action) action()
      }
    }
    
    var _selectedIndex = self.settings.selectedIndex || 0
    def selectedIndex(index) = {
      if(arguments.length > 0) selectButton(self.data(index),index)()
      return _selectedIndex;
    }
    
    def refresh() = {
      var target = self.jquery()
      if(target.length > 0){
        $("> .button-bar-buttons",target).remove();
        target.append(body())
      }
    }
    
    def body() = { <div class="button-bar-buttons">{|buttons()|}</div> }
    def buttons() = {
      var index = 0;
      var first = 0;
      var last = self.data.size() - 1
      return for(item <- self.data) yield {
        return Button{
          label:item.label,
          classNames:["button-bar-button",(index == first?"first":index == last?"last":'middle'),(index%2==0?"even":"odd"),"child"+index,(index == _selectedIndex)?'selected':'']
        }.click(selectButton(item,index++))
      }
    }
    
    override def render() = {
      return {
        <div class="button-bar">
          {|body()|}
        </div>
      }
    }
  }
  
  def defaultLoadingMessage() = {
    <div class="loading-message">
      <div class="loading-container">
        <span class="loading-text">Loading...</span>
      </div>
    </div>
  }
  
  class LoadingMessage(settings) extends Component(settings){
    override def render() = (defaultLoadingMessage())
  }

  // see http://code.google.com/apis/maps/documentation/javascript/3.2/reference.html#MapOptions
  class GoogleMap(settings) extends Component(settings){
    
    self.mapReady = Event(self)
        
    domMeasured{ node =>
      $(node).bind('touchstart',{_.stopPropagation()})
      $(node).bind('touchmove',{_.stopPropagation()})
      self.map = new google.maps.Map(node,self.settings);
      self.mapReady.invoke(self.map,node)
    }
    
    def updateSettings(settings){ self.map.setOptions(settings) }
    
    override def render() = {
      return {<div class='google-map'>{|LoadingMessage()|}</div>}
    }
  }
  
  class ProgressBar(settings) extends Component(settings){
    
    var currentValue = 0
    var currentIsIndeterminate = false
    
    def value(value,total){
      currentIsIndeterminate = false
      //make value a percentage of total
      if(total) value = value / total
      //clamp value between 0.0 and 1.0
      currentValue = Math.min(1.0,Math.max(0.0,value))
      updateDisplay()
      return self
    }
    
    def indeterminate(){
      //if(currentIsIndeterminate) return;
      currentIsIndeterminate = true
      updateDisplay()
      return self
    }
    
    private def updateDisplay(){
      var overlay = $("> .progress-container > .progress-background > .overlay",jquery())
      function animateOverlay(){
        if(!currentIsIndeterminate) return;
        overlay.css({left:-50}).animate({left:0},750,"linear",animateOverlay)
      }
      
      //fix the decimal to 1 place
      function progress(value){ $("> .progress-container > .progress-background > .progress",jquery()).css({width:(Math.round(1000*value)/10.0)+"%"}) }
      if(currentIsIndeterminate){
        animateOverlay()
        progress(1.0)
        jquery().addClass("indeterminate")
      } else {
        progress(currentValue)
        jquery().removeClass("indeterminate")
      }
    }
    
    self.domInserted(updateDisplay)
    
    override def render() = {
      return {
        <div class="progress-bar">
          <div class="progress-container">
            <div class="progress-background">
              <div class="progress"></div>
              <div class="overlay"></div>
              <div class="label"></div>
            </div>
          </div>
        </div>
      }
    }
    
  }
  
  class FileUploadButton(settings) extends Component(settings){
    
    self.change = Event(self)
    self.complete = Event(self)
    
    var targetName = self.componentId+"_target"
    
    private def onFileSelected(){
      var fullName = this.value || ""
      var lastSlash = Math.max(fullName.lastIndexOf("/"),fullName.lastIndexOf("\\"))
      var name = lastSlash > 0? fullName.substring(lastSlash+1) : fullName
      var lastDot = name.lastIndexOf(".")
      var extension = lastDot > 0? name.substring(lastDot+1).toLowerCase() : ""
      
      var fileInfo = {size:-1,name:name,extension:extension,upload:self.upload}
      
      if(this.files && this.files[0])
        fileInfo.size = this.files[0].size || this.files[0].fileSize
      
      self.change.invoke(fileInfo)
    }
    
    def upload(){ jquery("> form").submit() }
    
    var loadCount = 0
    private def onLoad(){
      if(loadCount++ == 0) return;
      self.complete.invoke()
    }
    
    def render() = {
      return {
        <div class='file-upload-button'>
          <form target={|targetName|} method="post" action={|self.settings.url|} enctype="multipart/form-data">
            <input type='file' name={|self.settings.fieldname || "file"|} onchange={|onFileSelected|} />
          </form>
          <iframe name={|targetName|} src="about:blank" onload={|onLoad|} style='width:0px;height:0px;border:0px;visibility:hidden;position:absolute;'></iframe>
        </div>
      }
    }
  }
  
  class Popup(settings) extends Container(settings){
    override def render() = { return {<div class="popup">{|self.children|}</div>} }
    
    def showAt(x,y,autoHide) = {
      var popup = self.appendTo(document.body).jquery().addClass("show-popup").hide().css{position:"absolute", left: x, top: y}.fadeIn()
      if(autoHide) configureAutoHide(popup)
    }
    
    private def configureAutoHide(popup){
      popup.bind("mousewheel mousedown touchstart",{_.stopPropagation()})
      $("html").bind("mousewheel mousedown touchstart",close)
    }
    
    def close(){
      jquery().fadeOut(self.remove)
      $("html").unbind("mousedown touchstart mousewheel", close)
    }
    
    def showFor(component,position,autohide) = {
      autohide = autohide == null || autohide == true
      
      //insert the popup
      var popup = self.appendTo(document.body).jquery().addClass("show-popup").hide()
      
      //ensure we have a jquery object
      component = UiTools.jquery(component)
      position = Seq.fromString(position || "top-center")
      
      var offset = component.offset()
      
      var verticalAlign = position.takeWhile(_ != "-").toString()
      var horizontalAlign = position.dropWhile(_ != "-").drop(1).toString()
      
      var top = match(verticalAlign){
        case "top" => offset.top + component.outerHeight()
        case "center" => offset.top + ((component.outerHeight() - popup.outerHeight()) / 2)
        case "bottom" => offset.top - popup.outerHeight()
      }
      
      var left = match(horizontalAlign){
        case "left" => offset.left
        case "center" => offset.left + ((component.outerWidth() - popup.outerWidth()) / 2)
        case "right" => (offset.left + component.outerWidth()) - popup.outerWidth()
      }
      
      popup.addClass(verticalAlign).addClass(horizontalAlign).css{position:"absolute", left: left, top: top}.fadeIn()
      
      if(autohide)
        configureAutoHide(popup)
      
      return self
    }
    
  }
  
  class ToolTip(settings) extends Popup(settings){
    override def render() = {
      return {
        <div class="tooltip">
          <div class="tooltip-container">
            <div class="tooltip-arrow-container">
              <div class="tooltip-arrow"></div>
            </div>
            <div class="tooltip-content">
              {|self.children|}
            </div>
          </div>
        </div>
      }
    }
  }
}
