//rescripted-settings:{"legacy":true}
package rescripted.ui {
  object UiTools{
    def ensureUnits(value,unitType) = ( (typeOf(value) == Number)? value+(unitType || "px") : value )
    
    //get a jquery reference to a Component, element by id, or existing jquery reference or element
    def jquery = {
      case c:Component => c.jquery()
      case id:String => $("#"+id)
      case elem => $(elem)
    }
    
  }
  
  object QueryString{
    def decode(value) = ( value == null? value:unescape(value) )
    def param(name) = ( params(name).headOption() )
    def params(name) = ( from(location.search.substring(1).split("&")).map(_.split("=")).filter(_[0] == name).map(_[1]).map(decode) )
  }
  
}
