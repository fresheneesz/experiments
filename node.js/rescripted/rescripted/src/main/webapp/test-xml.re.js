import rescripted.collections._
import rescripted.xml._

private def output(item) = { {<div class='log'>{|(""+item)|}</div>}.appendTo("output") }

var list = List({name:"Dan"},{name:"Nick"})

var x = {
  <div id={|"test&test"|}>
    <div>text 1</div>
    some text between &amp; some more text between
    <div>text 2</div>
    <!-- comment body -->
    <![CDATA[
    [cdata body... & < >]
    ]]>
    <div>text 3</div>
    {|
    for(x <- list) yield {
      return {<li>{|x.name|}</li>}
    }
    |}
    
    {|
    for(x <- list) yield {
      return {<div>{|x.name|}</div>}
    }
    |}
    
    {|null|}
  </div>
}

var y = {
  <xsl:template xmlns:xsl="bla">
  
  </xsl:template>
}

def test() = {
  var className = "test-class"
  var items = List(1,2,3)
  return {
    <div id="test" class={|className|}>
    <bla:test xmlns:bla="x://bla" />
    {|
      for(item <- items if item%2==0) yield {return {<b>{|item*item|}</b>}}
    |}
    
    </div>
  }
}

output(x)
output(y)

var text = "bla";
output(
  {
  <td class='datagrid-column-heading'>
    <span>a b c {|text|} 1 2 3 {|text|} d e f</span>
    <span class='sort ascending'><span class='symbol'>&#9660;</span></span>
    <span class='sort descending'><span class='symbol'>&#9650;</span></span>
  </td>
  }
)

var click = {=>alert("hola")}
{
  <div id="id-test">
    <button onclick={|click|}>Test</button>
  </div>
}.appendTo(document.body)

{<div style='width:10px;height:10px;background:red;'></div>}.appendTo(document.body)
{<div style='width:10px;height:10px;background:green;'></div>}.appendTo(document.body)
{<div style='width:10px;height:10px;background:blue;'></div>}.appendTo(document.body)
