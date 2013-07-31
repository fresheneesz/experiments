//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{
  
  $.fn.animate2 = function(css, speed, fn) {
        if(speed === 0) { // differentiate 0 from null
          this.css(css)
          window.setTimeout(fn, 0)
        } else {
          if($.browser.safari) {
            var s = []
            for(var i in css) 
                s.push(i)
          
            this.css({ webkitTransitionProperty: s.join(", "),
                      webkitTransitionDuration: speed+ "ms" });
          
            window.setTimeout(function(x,y) {
              x.css(y)
            },0, this, css) // have to wait for the above CSS to get applied
            window.setTimeout(fn, speed)
          } else {
            this.animate(css, speed, fn)
          }
        }
      }
  
  class Dialog(settings) extends Container(settings){
    var _controls = List()
    
    def controls(){
      _controls = List.fromArray(arguments).flatten()
      return self
    }
    
    def showIn(parent){
      self.appendTo(parent)
      setTimeout({=>
          $("> .dialog-background",self.jquery()).animate2({opacity:0.8},250,{=>})
        $("> .dialog-body",self.jquery()).animate2({top:0},250,{=>})
      },10)
      return self;
    }
    def close(){
      $("> .dialog-background",self.jquery()).animate2({opacity:0.0},250,{=>})
      $("> .dialog-body",self.jquery()).animate2({top:"-1000px"},250,{=>
        self.jquery().remove()
      })
    }
    
    def renderControls() = {
      if(_controls.size() == 0) return null;
      return Container({classNames:"dialog-controls"})(_controls)
    }
    
    override def render() = {
      var title = self.settings.label? {<div class='dialog-title'>{|self.settings.label|}</div>} : null
      var classNames = List("dialog","container",self.settings.label?"has-title":null,_controls.size() > 0?"has-controls":null).filter({_!=null}).mkString(" ")
      return {
        <div class={|classNames|}>
          <div class='dialog-background'></div>
          <div class='dialog-body'>
            <div class='dialog-contents'>
              {|title|}
              <div class='dialog-children'>{|self.children|}</div>
              {|renderControls()|}
            </div>
          </div>
        </div>
      }
    }
  }
   
  class Form(settings) extends Container(settings){
    def submit(action) = {
      self.onsubmit = action
      return self
    }
    
    private def rows() = {
      var index = 0;
      return for(child <- self.children) yield {
        var className = List('form-row',(index%2==0?'odd':'even'),'row'+(index++),(child.settings || {}).labelClass).filter({_!=null}).mkString(" ")
        if(IsDomNode(child) || child.settings.noLabel == true){
          return {
            <tr class={|className|}>
              <td colspan="2">{|child|}</td>
            </tr>
          }
        }
        return {
          <tr class={|className|}>
            <td class='form-label-cell'><div class='form-label'><label for={|child.settings.formName|}>{|child.settings.label|}</label></div></td>
            <td class='form-value-cell'><div class='form-value'>{|child|}</div></td>
          </tr>
        }
      }
    }
    
    override def render() = {
      <div class='form container'>
        <form
          class='form-element'
          onsubmit={|self.onsubmit|} name={|self.settings.formName|} target={|self.settings.formTarget|}
          method={|self.settings.httpMethod|} action={|self.settings.url|}>
          
          <table class='ui-table' cellspacing='0' cellpadding='0'>
            <tbody>
            {|rows()|}
            </tbody>
          </table>
          
        </form>
      </div>
    }
  }
  
  class FormGroup(settings) extends Container(labelStringToSettings(settings)){
    override def render() = {
      <div class='form-group container'>
        {|self.settings.label? {<h2>{|self.settings.label|}</h2>}:null|}
        {|self.children|}
      </div>
    }
  }
  
}
