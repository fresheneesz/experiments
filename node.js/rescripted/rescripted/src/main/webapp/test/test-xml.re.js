import rescripted.collections._
import rescripted.xml._

module("Xml Literals")

var text = (new Date()).getTime()

function testNode(){ return {<div class={|text|}><span>a b c {|text|} 1 2 3 {|text|} d e f</span><span>&#9660;</span><span>&#9650;</span></div>} }

test("xml generation and mutation",{=>
  var node = testNode()
  equal(node("class"),text)
  equal(node.toString(),"<div class=\""+text+"\"><span>a b c "+text+" 1 2 3 "+text+" d e f</span><span>▼</span><span>▲</span></div>")
  node.nodeName = "span"
  equal(node.toString(),"<span class=\""+text+"\"><span>a b c "+text+" 1 2 3 "+text+" d e f</span><span>▼</span><span>▲</span></span>")
  node.update("class","asdf")
  equal(node.toString(),"<span class=\"asdf\"><span>a b c "+text+" 1 2 3 "+text+" d e f</span><span>▼</span><span>▲</span></span>")
  node.update("class",null)
  node.update("id","test")
  equal(node.toString(),"<span id=\"test\"><span>a b c "+text+" 1 2 3 "+text+" d e f</span><span>▼</span><span>▲</span></span>")
  node.append{<span class='appended'>appended</span>}
  equal(node.toString(),"<span id=\"test\"><span>a b c "+text+" 1 2 3 "+text+" d e f</span><span>▼</span><span>▲</span><span class=\"appended\">appended</span></span>")
  //node.children = node.children.drop(1)
  //equal(node.toString(),"<span id=\"test\"><span>▼</span><span>▲</span><span class=\"appended\">appended</span></span>")
  //node.children = node.children.filter(_("class") == "appended")
  //equal(node.toString(),"<span id=\"test\"><span class=\"appended\">appended</span></span>")
})
