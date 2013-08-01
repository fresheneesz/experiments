//rescripted-settings:{"legacy":true,"immediate":true}

import rescripted.collections._

//http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/
var ie = (function(){
  var v = 3
  try{
    var div = document.createElement('div'), all = div.getElementsByTagName('i');
    while( div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0] );
    
  } catch(e) {}
  
  return {version: (v > 4 ? v : 0) };
}());

package rescripted.xml{
  
  class XmlNode(){}
  
  var emptyNode = {parent => }
  
  private def XmlChildren(value) = {
    
    if(value == null)
      return emptyNode
    
    if(typeOf(value["toXmlNode"]) == Function)
      value = value.toXmlNode() || emptyNode
    
    if(typeOf(value["appendToDom"]) == Function)
      return value.appendToDom
    
    if(isInstanceOf(value,Seq))
      value = value.toArray()
    
    if(isInstanceOf(value,Optional))
      return value == None? emptyNode : XmlChildren(value.get())
    
    if(typeOf(value) == Array)
      return {parent =>
        for(var i=0;i<value.length;i++){
          XmlChildren(value[i])(parent)
        }
      }
      
    switch(typeOf(value)){
      case Number:
      case Boolean:
      case String:
        return XmlText(value).appendToDom
        break;
      default:
        return value;
        break;
    }
  }
  
  def XmlElement(name,attributes,children) = {
    var _self = {name,value =>
      if(value) {
        _self.update(name,value)
        return value;
      } else {
        return (ArraySeq(attributes).filter(_.name == name).headOrNull() || {value:null}).value;
      }
    }
    
    _self.nodeName = name
    //_self.attributes = ArraySeq(attributes)
    //_self.children = ArraySeq(children)
    
    _self.appendChildrenTo = {parent=> XmlChildren(children)(XmlResolveParent(parent));return _self}
    
    var onDomReady = []
    
    _self.append = {child => children.push(child);return _self }
    
    _self.domReady = {func => onDomReady.push(func);return _self }
    _self.update = {name,value =>
      var attrs = ArraySeq(attributes)
      if(!attrs.exists(_.name == name))
        attrs.append({name:name,value:value})
      else
        attrs.filter(_.name == name).head().value = value
      return _self
    }
    
    _self.toDom = {doc =>
      var node = doc.createElement("root")
      _self.appendToDom(node)
      var result = node.childNodes.item(0)
      node.removeChild(result)
      return result
    }

    var appendToDom = {parent =>
      var n = _self.nodeName 
      var elem = parent.ownerDocument.createElement(n)
      
      //handle attributes
      for(var i=0;i<attributes.length;i++){
        var attr = attributes[i]
        if(attr.value != null){
          
          //event helpers
          if(typeOf(attr.value) == Function)
            elem[attr.name] = attr.value
          else
            elem.setAttribute(attr.name,attr.value.toString())
          
          //ie6/ie7 weirdness fixes
          if(ie.version != 0 && ie.version <= 7){
            if(attr.name == "class" && "className" in elem)
              elem.className = attr.value
            if(attr.name == "style" && "style" in elem && "setAttribute" in elem.style)
              elem.style.setAttribute('cssText', attr.value, 0);
          }
          
        }
      }
      
      XmlChildren(children)(elem)
      
      parent.appendChild(elem)
      
      for(var i=0;i<onDomReady.length;i++){ onDomReady[i](elem) }
    }
    return XmlNode(
      (=> Xml.toString(_self.toDom(Xml.createDocument())) ),
      appendToDom,
      _self
    )
  }
  def XmlText(value) = {
    return XmlNode(
      (=>  "XmlText("+text+")"),
      {parent => parent.appendChild(parent.ownerDocument.createTextNode(value.toString()))}
    )
  }
  
  def XmlComment(text) = {
    return XmlNode(
      (=>"XmlComment("+text+")"),
      {parent => parent.appendChild(parent.ownerDocument.createComment(text))}
    )
  }
  def XmlCdata(text) = {
    return XmlNode(
      (=>"XmlCdata("+text+")"),
      {parent =>
        try{ parent.appendChild(parent.ownerDocument.createCDATASection(text)) }
        catch(e) { parent.appendChild(parent.ownerDocument.createTextNode(text)) }
      }
    )
  }
  def XmlJavascriptFragment(stuff) = {
    return XmlNode(
      (=>"XmlJavascriptFragment("+stuff+")"),
      XmlChildren(stuff)
    )
  }
  def XmlUnknownNodeType(nodeType) = {
    return XmlNode(
      (=>"XmlUnknownNodeType("+nodeType+")"),
      {parent => parent.appendChild(parent.ownerDocument.createTextNode("XmlUnknownNodeType("+nodeType+")"))}
    )
  }
  
  private def XmlNode(toString,appendToDom,_self) = {
    _self = _self || {}
    _self.__rescriptedTypes = [XmlNode];
    _self.toString = toString
    _self.appendToDom = appendToDom
    _self.appendTo = {parent => appendToDom(XmlResolveParent(parent));return _self}    
    return _self
  }
  
  private def XmlResolveParent(parent) = {
    if(parent.jquery && parent.length > 0) parent = parent.get(0)
    if(parent.jquery && parent.length == 0) error("jquery parent passed to appendTo, but the jquery object had no elements");
    if(typeOf(parent) == String) parent = document.getElementById(parent)
    return parent
  }
}

package rescripted.xml.dom {
  
  //Returns true if it is a DOM node
  def IsDomNode(o) = (
    typeof Node === "object" ? o instanceof Node : 
    typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  )
  
  //Returns true if it is a DOM element    
  def IsDomElement(o) = (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
  )
    
  def XmlSetAttribute(elem,name,value) = {
    //event helpers
    if(typeOf(value) == Function)
      elem[name] = value
    else
      elem.setAttribute(name,value.toString())
    
    //ie6/ie7 weirdness fixes
    if(ie.version != 0 && ie.version <= 7){
      if(name == "class" && "className" in elem)
        elem.className = value
      if(name == "style" && "style" in elem && "setAttribute" in elem.style)
        elem.style.setAttribute('cssText', value, 0);
    }
    return elem;
  }
  
  def XmlGetAttribute(elem,name) = {
    if(ie.version != 0 && ie.version <= 7){
      if(name == "class")
        return elem.className
      if(name == "style" && "style" in elem && "getAttribute" in elem.style)
        return elem.style.getAttribute('cssText');
    }
    return elem.getAttribute(name)
  }
  
  def XmlResolveParent(parent) = {
    if(parent.jquery && parent.length > 0) parent = parent.get(0)
    if(parent.jquery && parent.length == 0) error("jquery parent passed to appendTo, but the jquery object had no elements");
    if(typeOf(parent) == String) parent = document.getElementById(parent)
    return parent
  }
  
  def XmlAppendChildren(elem,children){
    for(var i=0;i<children.length;i++){
      var child = XmlJavascriptFragment(children[i])
      if(child == null)
        continue;
      
      if(typeOf(child) == Array)
        XmlAppendChildren(elem,child)
      else
        elem.appendChild(child)
    }    
  }
  
  
  def XmlUnknownNodeType(type) = (document.createTextNode("XmlUnknownNodeType("+type+")"))
  def XmlText(value) = (document.createTextNode(value))
  def XmlComment(value) = (document.createComment(value))
  def XmlCdata(value) = {
    try{ return document.createCDATASection(text) }
    catch(e) { return document.createTextNode(text) }
  }
  
  def XmlElement(tagName,attributes,children) = {
    var elem = document.createElement(tagName)
    for(var i=0;i<attributes.length;i++){
      var attr = attributes[i]
      if(attr.value != null)
        XmlSetAttribute(elem,attr.name,attr.value)
    }
    
    XmlAppendChildren(elem,children);
    
    return elem
  }
  
  
  def XmlJavascriptFragment(value) = {
    if(value == null)
      return null
      
    if(typeOf(value["toXmlNode"]) == Function)
      value = value.toXmlNode()
      
    if(isInstanceOf(value,Seq))
      value = value.toArray()
      
    if(isInstanceOf(value,Optional)){
      if(value == None) return null;
      value = value.get();
    }

    switch(typeOf(value)){
      case Number:
      case Boolean:
        return document.createTextNode(""+value)
      case String:
        return document.createTextNode(value)
        break;
      default:
        return value;
        break;
    }
  }

}
