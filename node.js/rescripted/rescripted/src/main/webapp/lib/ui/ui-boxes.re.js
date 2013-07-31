//rescripted-settings:{"legacy":true}
import rescripted.collections._
import rescripted.xml.dom._

package rescripted.ui{

  class Box(settings,boxType) extends Container(settings){
    def cells() = ???  
    override def render() = {
      return {<div class={|boxType+" container"|}><table class={|'ui-table '+boxType+'-ui-table'|} cellspacing='0' cellpadding='0'><tbody>{|self.cells()|}</tbody></table></div> }
    }
  }
  
  class VBox(settings) extends Box(settings,'vbox'){
    def cells() = {
      var index = 0
      return for(child <- self.children) yield {return {
        <tr class={|(index % 2 == 0?"even":"odd")+" child"+(index++)|}>
          <td class='vbox-cell'>{|child|}</td>
        </tr>
      }}
    }
  }
  
  class HBox(settings) extends Box(settings,'hbox'){
    def cells() = {
      return {
        <tr>
        {|
          for(child <- self.children) yield {return {
            <td class='hbox-cell'>{|child|}</td>
          }}
        |}
        </tr>
      }
    }
  }
  
}
