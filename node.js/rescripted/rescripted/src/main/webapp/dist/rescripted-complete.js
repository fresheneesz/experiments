//rescripted is an in-browser syntax extension for javascript
//http://www.opensource.org/licenses/mit-license.php

//json handling based on code at: https://github.com/douglascrockford/JSON-js/raw/master/json2.js
var Json = {
  escapable:/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  meta: { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\' },
  encodeString:function(value){
    Json.escapable.lastIndex = 0;
    if(Json.escapable.test(value)){
      return '"' +
              value.replace(Json.escapable, function (a) {
                var c = Json.meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"';
    } else {
      return '"' + value + '"';
    }
  },
  toString:function(obj){ try{ return JSON.stringify(obj) } catch(e) { return "Json.toString failed: "+e } }
};

(function(){
  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function (key) {
      function f(n) { return n < 10 ? '0' + n : n; }
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) +
                  'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
    };
    String.prototype.toJSON = Number.prototype.toJSON  = Boolean.prototype.toJSON = function (key) { return this.valueOf(); };
  }
  var _json_ = (this.JSON)? JSON : {};
  var gap,indent,rep;
  function str(key, holder) {
    // Produce a string from holder[key].
    var i, k, v, length, mind = gap, partial, value = holder[key];
    if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); }
    if (typeof rep === 'function') { value = rep.call(holder, key, value); }
    switch (typeof value) {
    case 'string': return Json.encodeString(value);
    case 'number': return isFinite(value) ? String(value) : 'null';
    case 'boolean':
    case 'null': return String(value);
    case 'object':
      if (!value) { return 'null'; }
      gap += indent;
      partial = [];
      if (Object.prototype.toString.apply(value) === '[object Array]') {
        length = value.length;
        for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; }
        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
        gap = mind;
        return v;
      }
      if (rep && typeof rep === 'object') {
        length = rep.length;
        for (i = 0; i < length; i += 1) {
          if (typeof rep[i] === 'string') {
            k = rep[i];
            v = str(k, value);
            if (v) { partial.push(Json.encodeString(k) + (gap ? ': ' : ':') + v); }
          }
        }
      } else {
        for (k in value) {
          if (Object.prototype.hasOwnProperty.call(value, k)) {
            v = str(k, value);
            if (v) { partial.push(Json.encodeString(k) + (gap ? ': ' : ':') + v); }
          }
        }
      }
      v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
      gap = mind;
      return v;
    }
  }
  if (typeof _json_.stringify !== 'function') {
    Json.toString = function (value, replacer, space) {
      var i;
      gap = '';
      indent = '';
      if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; }
      rep = replacer;
      if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
      }
      return str('', {'': value});
    };
  } else {
    Json.toString = _json_.stringify
  }

  if (typeof _json_.parse !== 'function') {
    Json.parse = function (text, reviver) {
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var j;
      function walk(holder, key) {
        var k, v, value = holder[key];
        if (value && typeof value === 'object') {
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) { value[k] = v; } else { delete value[k]; }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); }
      if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        j = eval('(' + text + ')');
        return typeof reviver === 'function' ? walk({'': j}, '') : j;
      }
      throw new SyntaxError('JSON.parse');
    };
  } else {
    Json.parse = _json_.parse;
  }
})();


var Http = {
  prepare:function(url,method,dataType,data,contentType){
    return function(handler){
      $.ajax({
        url:url,
        type:method,
        dataType:dataType,
        data:data,
        contentType:contentType,
        success:function(data,stat,xhr){handler(data); },
        error:function(req,status,error){
          alert("error loading resource: "+url+"\nstatus: "+status+"\nerror: "+error)
        }
      });
    }
  },
  get:function(url){
    return {
      text:Http.prepare(url,"GET","text"),
      json:Http.prepare(url,"GET","json")
    }
  },
  post:function(url){
    var data = null
    var contentType = null
    var result = {
      body:function(_data,_contentType){
        data = _data
        contentType = _contentType
        return result
      },
      text:function(handler){Http.prepare(url,"POST","text",data,contentType)(handler)},
      json:function(handler){Http.prepare(url,"POST","json",data,contentType)(handler)}
    }
    return result;
  }
}

function error(message){
  if(arguments.callee.customHandler) return arguments.callee.customHandler(message)
  
  throw new Error(""+message)
}
println.throwMessages = false;
function println(message){
  if(arguments.callee.customHandler) return arguments.callee.customHandler(message);

  if("console" in this && "log" in this.console){ console.log(""+message) }
  if("java" in this && "lang" in this.java && "System" in this.java.lang){ java.lang.System.out.println(""+message) }
  if(println.throwMessages){ setTimeout(function(){ throw new Error(""+message) },1); }
}

function logError(e){
  setTimeout(function(){ throw e },1);
  if(e.stack){
    if("console" in this && "log" in this.console){ console.log(e.stack) }
    else setTimeout(function(){ throw e.stack },1);
  }
}

var Xml = {
  nodeTypes:{
    element: 1,
    attribute: 2,
    text: 3,
    cdata: 4,
    entitiyReference: 5,
    entity: 6,
    processingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
  },
  parse:function(xml){
    try{ return (new DOMParser()).parseFromString(xml,"text/xml"); } catch(e) {}
    try{
      // Internet Explorer
      var doc = new ActiveXObject("Microsoft.XMLDOM");
      doc.async="false";
      doc.loadXML(xml);
      return doc;
    } catch(e) { }
    
    return javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new org.xml.sax.InputSource(new java.io.StringReader(xml)))

    //throw "unable to find xml parser"
  },
  toString:function(node){
    try { return (new XMLSerializer()).serializeToString(node); } 
    catch (e) { return node.xml; }
  },
  createDocument:function(){
    try{ return new ActiveXObject("Microsoft.XMLDOM") }
    catch(e){ return Xml.parse("<doc />"); }
    //return document.implementation.createDocument(null, "doc", null)
    //javax.xml.parsers.DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument()
  }
}


var _root_ = {rescripted:{}};

if(!this["__rescripted"]) __rescripted = {}
__rescripted.RescriptedObject = __rescripted.RescriptedObject$class = function(){
  var self = __rescripted.util._self(this);
  
  __rescripted.util._method("toString",this,self,true,function toString(){
    return "'class "+(self.__rescriptedClassName || "RescriptedObject")+"'"
  });
};

__rescripted.Product = __rescripted.Product$class = function(name,argNames,args){
  var self = __rescripted.util._self(this);
  var base = __rescripted.util._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);
  
  self.productElements = args
  
  var argsList = argNames.split(",")
  for(var i=0;i<argsList.length;i++){
    self[argsList[i].replace(/\s/g,"")] = args[i];
  }
  
  __rescripted.util._method("toString",this,self,true,function toString(){
    return name+"("+args+")"
  });
};

__rescripted.util = {
  objectKeys: (function(){
    var hasOwnProperty = Object.prototype.hasOwnProperty
    var hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString")
    var dontEnums = [ 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor' ]
    var dontEnumsLength = dontEnums.length

    if(!Object.keys){
      return function(o){
        if(typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for(var name in o)
          if(hasOwnProperty.call(o, name))
            result.push(name);

        if(hasDontEnumBug)
          for(var i = 0; i < dontEnumsLength; i++)
            if(hasOwnProperty.call(o, dontEnums[i]))
              result.push(dontEnums[i]);
        return result;
      }
    } else {
      return Object.keys;
    }
  })(),
  from:function(obj){
    if(obj == null) return null;
    if(obj.isRescriptedEnhanced == true) return obj;
    if(__rescripted.util.typeOf(obj) == Array) return _root_.rescripted.collections.Seq.fromArray(obj);
    if(__rescripted.util.typeOf(obj) == String) return _root_.rescripted.collections.StringSeq(obj)
    //if(__rescripted.util.typeOf(obj) == Object) return _root_.rescripted.collections.Map(obj)
    return obj;
  },
  typeOf:function(obj){
    if(obj == null) return null;
    if(obj.__rescriptedConstructor) return obj.__rescriptedConstructor;
    if(obj.constructor) return obj.constructor;
    return Object;
  },
  isInstanceOf:function(obj,type){
    if(obj == null) return false;
    if(__rescripted.util.typeOf(obj) == type) return true;
    if(obj instanceof type) return true;
    if(obj.__rescriptedTypes) return __rescripted.util.from(obj.__rescriptedTypes).contains(type);
    return false;
  },
  match:function(arg){ return function(partialFunction){ return partialFunction(arg) } },
  _partialFunction:function(){
    var cases = __rescripted.util.toArray(arguments);
    var func = function(arg){
      for(var i=0;i<cases.length;i++){
        var caseBody = cases[i](arg)
        if(caseBody != null)
          return caseBody();
      }
      error("MatchError: "+arg)
    }
    func.isDefinedAt = function(arg){
      for(var i=0;i<cases.length;i++)
        if(cases[i](arg) != null)
          return true;
      return false;
    }
    //add this in when we get an Option class :D
    //func.lift = function(arg){}
    return func;
  },
  _package:function(packageName,context,body){
    var nameParts = packageName.split(".")
    for(var i=0;i<nameParts.length;i++){
      var name = nameParts[i];
      if(!context[name])
        context[name] = {}
      context = context[name]
    }
    body.apply(context,[]);
  },
  _class:function(className,_this,_self,classPublicConstructor,classPrivateConstructor){
    if(_this[className+"$class"])
      throw new Error("attempt to redefine existing symbol with new class '"+className+"'")
    _this[className] = _self[className] = classPublicConstructor;
    _this[className+"$class"] = _self[className+"$class"] = classPrivateConstructor;
  },
  _caseClass:function(className,_this,_self,classPublicConstructor,classPrivateConstructor){
    __rescripted.util._class(className,_this,_self,classPublicConstructor,classPrivateConstructor)
    classPublicConstructor.unapply = function(item,wildcard,extractor){
      //verify type
      if(!__rescripted.util.isInstanceOf(item,classPublicConstructor)) return null
        
      //can't wildcard
      if(wildcard) return null
      
      //must match arg count exactly
      if(extractor.length != item.productElements.length) return null
        
      return extractor.apply(null,item.productElements)
    }
  },
  _object:function(objectName,_this,_self,objectTarget,objectClassFunction){
    if(_this[objectName+"$object"])
      throw new Error("attempt to redefine existing symbol with new object '"+objectName+"'")
    objectTarget.__rescriptedObject = true
    objectTarget.__rescriptedTypes = [];
    objectTarget.__rescriptedClassName = objectName+"$";
    _this[objectName] = _self[objectName] = objectTarget;
    _this[objectName+"$object"] = _self[objectName+"$object"] = objectClassFunction;
    objectClassFunction.apply(objectTarget,[]);
  },
  _construct:function(self,className,classFunction,constructFunction,args){
    var isCalledWithNew = (!!self.constructor) && self instanceof constructFunction;
    
    var instance = function(){
      if(!instance.$apply)
        throw new Error("method 'apply' isn't defined for '"+className+"'")
      return instance.$apply.apply(null,arguments)
    }
    instance.__rescriptedTypes = [constructFunction];
    instance.__rescriptedClassName = className;
    instance.__rescriptedConstructor = constructFunction;
    classFunction.apply(instance,__rescripted.util.toArray(args));
    return instance;
  },
  _extend:function(_this,_self,classFunction,constructFunction,params){
    var _base = {__rescriptedSelfReference:_self};
    _self.__rescriptedTypes.push(classFunction);
    constructFunction.apply(_base,params);
    delete _base.__rescriptedSelfReference;
    return _base;
  },
  _self:function(_this){
    var depth = 0;
    while(_this.__rescriptedSelfReference){
      if(depth > 100)
        throw new Error("Can't find self, recursed 100 times...")
      _this = _this.__rescriptedSelfReference;
      depth++;
    }
    return _this;
  },
  _method:function(methodName,_this,_self,override,body){
    if(methodName=="apply")
      methodName = "$apply";
    
    var existingMethod = _this[methodName]
    if(existingMethod != null && existingMethod.isAbstract != true && override!=true)
      throw new Error("attempt to redefine existing symbol with new method '"+methodName+"' in class '"+_this.__rescriptedClassName+"'")
    
    if(methodName == "main" && _this["__rescriptedObject"] == true)
      __rescripted.script.entryPoints.push(body)
    
    //should an exception be thrown if override is true and there is no existing method?
    
    _self[methodName] = _this[methodName] = body;
  },
  _abstractMethod:function(methodName,_this,_self){
    var method = function(){throw new Error("Method '"+methodName+"' of class '"+_this.__rescriptedClassName+"' is abstract.")}
    method.isAbstract = true
    __rescripted.util._method(methodName,_this,_self,false,method)
  },
  _import:function(packageName,packageReference,symbolName,context){
    if(symbolName == "_"){
      for(var property in packageReference)
        __rescripted.util._import(packageName,packageReference,property,context)
      return;
    }
    if(typeof(context[symbolName]) != "undefined")
      throw new Error("cannot import '"+symbolName+"' from '"+packageName+"' because an existing symbol with the same name exists in the same context")
    context[symbolName] = packageReference[symbolName]
  },
  toArray:function(arrayLike){
    var result = [];
    for(var i=0;i<arrayLike.length;i++)
      result.push(arrayLike[i])
    return result;
  },
  merge:function(src,dest){
    for(var property in src)
      dest[property] = src[property];
    return dest;
  },
  mergeAll:function(src,dest){
    var keys = __rescripted.util.objectKeys(src)
    for(var i=0;i<keys.length;i++){
      var key = keys[i]
      dest[key] = src[key]
    }
    return dest;
  },
  copyProperties:function(src,dest,properties){
    for(var i=0;i<properties.length;i++){
      var property = properties[i];
      dest[property] = src[property];
    }
    return dest;
  }
};
__rescripted.script = {
  externalTransformer:null,
  root:_root_,
  entryPoints:[],
  transform:function(code,settings){
    settings = settings || {}
    var forDisplay = settings.forDisplay
    var debug = settings.debug
    
    var currentPhase = "init"
    function parseError(message,code){
      if(settings.file) message = settings.file+":\n"+message
      if(debug && code){
        throw new Error(message+"\nPhase: '"+currentPhase+"', Code:\n"+code)
      } else {
        throw new Error(message+"\nPhase: '"+currentPhase+"'")
      }
    }
    
    var nameSeed = Math.round(Math.random() * 100)
    var namePrefix = "_rs"
    var nameIndex = 0;
    function nextName(){ return namePrefix+nameSeed+(nameIndex++)+"_"; }
    function nextStringName(){ return namePrefix+"str"+nameSeed+(nameIndex++)+"_";  }
    function nextCommentName(){ return namePrefix+"comment"+nameSeed+(nameIndex++)+"_";  }

    function findExpression(code,expression){
      var match = expression.exec(code)
      if(match == null) return {index:-1};
      return {index:code.indexOf(match[0]),match:match};
    }
    
    function lineInfo(code,index){
      var currentIndex = 0;
      var lineIndex = -1;
      var lineCount = 0
      while( (lineIndex = code.indexOf("\n",currentIndex)) != -1 && lineIndex < index ){
        currentIndex = lineIndex+1;
        lineCount++;
      }
      return {line:lineCount,column:index - currentIndex}
    }
    
    function getLine(code,line){
      var currentIndex = 0
      var lineIndex = -1
      var lineCount = 0
      while( (lineIndex = code.indexOf("\n",currentIndex)) != -1 && lineCount < line ){
        currentIndex = lineIndex+1;
        lineCount++;
      }
      var end = code.indexOf("\n",currentIndex)
      return code.substring(currentIndex, end == -1? code.length: end)
    }
    
    function nestedPairMatcher(chars,reverse){
      if(chars.length % 2 != 0) parseError("nestedPairMatcher requires an even number of characters to be treated as pairs")
      return function(code,index){
        var firstIndex = index
        var advanceBy = reverse? -1:1;
        var firstChar = code.charAt(index)
        index+=advanceBy;
        if(chars.indexOf(firstChar) == -1) parseError("specified char '"+firstChar+"' isn't supported for pair matching, supported chars: "+chars,code)
        var stack = [firstChar];
        var lastIndex = reverse? -1:code.length
        while(index != lastIndex){
          var currentChar = code.charAt(index)
          var charIndex = chars.indexOf(currentChar)
          var moddedCharIndex = charIndex % 2

          switch(moddedCharIndex){
            //not a character we're looking for
            case -1: break;
            //an opening character
            case 0: stack.push(currentChar); break;
            //a closing character
            case 1:
              var opener = stack.pop()
              if(chars.indexOf(opener) != charIndex - 1){
                var info = lineInfo(code,index)
                var line = info.line >= 0? getLine(code,info.line): "unknown line"
                moddedCharIndex+=0 //avoid some sort of strange chrome JIT error
                parseError("improperly nested character, expected '"+chars.charAt(chars.indexOf(opener)+1)+"', but found '"+currentChar+"' on line number: "+(info.line+1)+" '"+line+"'",code)
              }
              break;
            default:
              parseError("nestedPairMatcher: How did we get here?",code)
          }

          if(stack.length <= 0) return index;
          
          index+=advanceBy;
        }
        parseError("the character you were looking for ('"+firstChar+"' on line number "+(lineInfo(code,firstIndex).line+1)+") didn't have a matching end character",code)
      }
    }
    
    var bracketMatcher = nestedPairMatcher("{}()[]")
    var reverseBracketMatcher = nestedPairMatcher("}{)(][",true)
    
    function createTemplate(syntax){
      var template = syntax.template;
      for(var i=0;i<syntax.names || 0;i++){
        template = template.replace(new RegExp("__name"+i+"__","g"),nextName());
      }
      return template;
    }
    function syntaxMatches(code,syntax){
      if(syntax.validateMatch)
        return syntax.regex.test(code) && syntax.validateMatch(code,syntax.regex);
      return syntax.regex.test(code);
    }
    function createSyntax(syntax){
      return function(code){
        while(syntaxMatches(code,syntax)){
          code = code.replace(syntax.regex,createTemplate(syntax))
        }
        return code;
      }
    }
    
    function createBodyCaptureSyntax(name,syntax,generator,fromBeginning){
      var func = function(code){
        while(syntax.test(code)){
          var expressionLocation = findExpression(code,syntax)
          var index = expressionLocation.index
          var match = expressionLocation.match
          var bodyStart = index+match[0].length-1
          var bodyEnd = bracketMatcher(code,fromBeginning?index:bodyStart)+1
          var body = code.substring(bodyStart+1,bodyEnd-1)
          var newCode = generator(match,body,index,code);
          code = code.substring(0,index)+newCode+code.substring(bodyEnd,code.length)
        }
        return code;
      }
      func.phase = name
      return func
    }
    
    function collectGroups(expressions,collected){
      function nextExpression(data){
        var expression = null
        var lowestIndex = -1
        for(var i=0;i<expressions.length;i++){
          var index = findExpression(data,expressions[i].regex).index
          if(index != -1 && (lowestIndex == -1 || index < lowestIndex) ){
            lowestIndex = index
            expression = expressions[i]
          }
        }
        return expression
      }
      return function(data){
        var expression = null
        while( (expression = nextExpression(data)) != null){
          data = data.replace(expression.regex,function(value){
            var name = expression.namer? expression.namer():nextName();
            var newlines = value.replace(/[^\n]/g,"") //create a copy of the matched value with only newlines intact
            collected.push({name:name,value:value})
            return "<<<"+name+newlines+name+">>>";
          })
        }
        return data
      }
    }
    
    function processTripleQuotes(code){
      var index = -1;
      while((index = code.indexOf('"""'))!=-1){
        var endIndex = code.indexOf('"""',index+3)
        if(endIndex == -1)
          return code;

        var selectedEndIndex = endIndex+3;
        while(selectedEndIndex < code.length && code.charAt(selectedEndIndex) == '"')
          selectedEndIndex++;
        
        var stringContent = code.substring(index+3,selectedEndIndex-3);
        var newlines = stringContent.replace(/[^\n]/g,"")
        
        code = code.substring(0,index)+Json.encodeString(stringContent)+newlines+code.substring(selectedEndIndex,code.length);
      }
      return code;
    }
    
    function processXmlLiterals(code){
      
      var xmlLiteralExpressionStart = /{(\s*)<((?:\w|:)+)(\W)/
      
      function beginProcessingXmlLiterals(code){
        var result = null
  
        while((result = processXmlLiteral(code)) != null){
          code = code.substring(0,result.start.index)+
                  transformLiteral(result.literalFragment)+
                  code.substring(result.end.index+result.end.matchedString.length,code.length);
        }
        
        return code;
      }
      
      function processXmlLiteral(code){
        
        try{
          var startData = xmlLiteralExpressionStart.exec(code)
          if(startData == null)
            return null;
          
          var extractedInfo = {start:{index:code.indexOf(startData[0]),matchedString:startData[0],terminator:startData[3]},tagName:startData[2]};
          
          var currentPosition = extractedInfo.start.index+extractedInfo.start.matchedString.length;
          //fix this, doesn't handle multiple levels of nesting, just one level of nesting, needs to be a stack :(
          var remainingCode = code.substring(currentPosition);
          var currentExpressionStart = new RegExp("{\\s*<"+extractedInfo.tagName+"\\W","");
          var currentExpressionEnd = new RegExp("</"+extractedInfo.tagName+">\\s*}","");
          while(
              findExpression(remainingCode,currentExpressionStart).index != -1 && //we have another expression representing the same start tag
              findExpression(remainingCode,currentExpressionEnd).index > findExpression(remainingCode,currentExpressionStart).index //the first matching end tag occurs after the matching start tag, indicating that we have nested tags of the same name
              ){
            var nestedEndTagInfo = findExpression(remainingCode,currentExpressionEnd)
            currentPosition += nestedEndTagInfo.index+nestedEndTagInfo.match[0].length;
            remainingCode = code.substring(currentPosition);
          }
          
          var endData = currentExpressionEnd.exec(remainingCode)
          if(endData == null)
            return null;
          
          extractedInfo.end = {index:currentPosition+remainingCode.indexOf(endData[0]),matchedString:endData[0]}
          extractedInfo.literalFragment = code.substring(extractedInfo.start.index,extractedInfo.end.index+extractedInfo.end.matchedString.length)
          return extractedInfo;
        } catch(e) {
          return null;
        }
      }
      
      function transformLiteral(code){
        var javascriptAttributeFragments = {};
        var javascriptAttributeFragmentPrefix = "__rescriptedJavascriptAttributeFragment";
        var javascriptFragments = {};
        var javascriptFragmentPrefix = "__rescriptedJavascriptFragment";
        function collectAttributeFragments(text){
          var attributeFragmentPattern = /(\w+\s*=\s*){\|((?:\s|.)*?)\|}/
          var index = 0;
          var match = null
          while( (match = attributeFragmentPattern.exec(text)) != null ){
            var fragmentId = javascriptAttributeFragmentPrefix+(index++);
            javascriptAttributeFragments[fragmentId] = match[2];
            text = text.replace(attributeFragmentPattern,'$1"'+fragmentId+'"')
          }
          return text;
        }
        function collectionFragments(text){
          var fragmentPattern = /{\|((?:\s|.)*?)\|}/
          var index = 0;
          var match = null;
          while( (match = fragmentPattern.exec(text)) != null ){
            var fragmentId = javascriptFragmentPrefix+(index++);
            javascriptFragments[fragmentId] = match[1];
            text = text.replace(fragmentPattern,fragmentId)
          }
          return text;
        }
        var xml = collectionFragments(collectAttributeFragments(processXmlLiterals(code.substring(1,code.length-1))));
  
        var node = Xml.parse(xml).firstChild
        
        function encodeNode(n){
          if(n == null)
            return null;
          switch(n.nodeType){
            case Xml.nodeTypes.text:
              var fragmentIdPattern = /__rescriptedJavascriptFragment\d+/
              var value = ""+n.nodeValue;
              var results = [];
              var found = null;
              
              //look for javascript fragments
              while( (found = findExpression(value,fragmentIdPattern)).index != -1 ){
                //don't add empty strings
                if(found.index > 0)
                  results.push("XmlText("+Json.encodeString(value.substring(0,found.index))+")")
                results.push("XmlJavascriptFragment("+javascriptFragments[value.substring(found.index,found.index+found.match[0].length)]+")")
                value = value.substring(found.index+found.match[0].length,value.length);
              }
              
              //add any remaining text
              if(value.length > 0)
                results.push("XmlText("+Json.encodeString(value)+")")             
              
              if(results.length == 0){
                return "XmlText("+Json.encodeString(value)+")";
              } else {
                return results.join(",");
              }
              break;
            case Xml.nodeTypes.cdata: return "XmlCdata("+Json.encodeString(n.nodeValue)+")"; break;
            case Xml.nodeTypes.comment: return "XmlComment("+Json.encodeString(n.nodeValue)+")"; break;
            case Xml.nodeTypes.element:
              var attributes = [];
              for(var i=0;i<n.attributes.length;i++){
                var value = n.attributes.item(i).value;
                if(value.indexOf(javascriptAttributeFragmentPrefix) == 0)
                  value = javascriptAttributeFragments[value];
                else
                  value = Json.encodeString(value)
                attributes.push("{name:"+Json.encodeString(n.attributes.item(i).name)+",value:("+value+")}");
              }
              
              var children = [];
              var childNodes = n.childNodes;
              for(var i=0;i<childNodes.length;i++){
                children.push(encodeNode(childNodes.item(i)))
              }
              
              return "(XmlElement("+Json.encodeString(n.tagName)+",["+attributes.join(",")+"],["+children.join(",")+"]))";
              break;
            default: return "XmlUnknownNodeType("+n.nodeType+")"; break;
          }
        }
  
        return encodeNode(node);
      }
      
      return beginProcessingXmlLiterals(code);
    }
    
    function functionBody(name,args,body,expression){ return "function"+(name == null?"":" "+name)+"("+args+"){"+ ( expression? "return ("+body+")": body )+ "}" }
    
    //
    // list of phases
    //
    
    var contextName = nextName();
    var phases = [
      //allow method bodies to be partial functions that match on the arguments
      createBodyCaptureSyntax("partial-functions-as-methods",/(private\s+|override\s+|)def\s+(\w*)\s*=\s*{/,function(match,body){
        var modifier = match[1]
        var name = match[2]
        var isPartial = /^\s*(?:<<<_rscomment\d+__rscomment\d+_>>>\s*)*case/.test(body)
        if(!isPartial) throw new Error("methods that aren't partial functions must have an argument list.")
        if(/^private/.test(modifier)){
          var arg = nextName()
          var temp = nextName()
          return "var "+temp+" = {"+body+"};function "+name+"("+arg+"){ return "+temp+"("+arg+") };"+name+".isDefinedAt = "+temp+".isDefinedAt;"
        } else if(/^override/.test(modifier)) {
          return "__rsu._method('"+name+"',this,self,true,{"+body+"});"
        } else {
          return "__rsu._method('"+name+"',this,self,false,{"+body+"});"
        }
      }),
      //handle partial functions
      function(code){
        var partialFunctionParser = createBodyCaptureSyntax("partial-functions",/{(\s*(?:<<<_rscomment\d+__rscomment\d+_>>>\s*)*)case\s+.*(?:\s+if|\s*=>)/,function(partialFunctionMatch,body,index,code){
            //find the close paren and search backwards for the open paren, then look to see if it is the word switch...
            function isSwitch(){
              var switchEndParen = index-1;
              //eat whitespace
              while(switchEndParen >= 0 && /\s/.test(code.charAt(switchEndParen))){switchEndParen--}
              //make sure we have a close paren
              if(code.charAt(switchEndParen) != ")") return false;
              //find the open paren
              var switchOpenParen = reverseBracketMatcher(code,switchEndParen)
              //eat whitespace
              var switchKeywordEnd = switchOpenParen
              while(switchKeywordEnd >= 0 && /\s/.test(code.charAt(switchKeywordEnd))){switchKeywordEnd--}
              //make sure we have enough characters for the word "switch"
              if(switchKeywordEnd < 6) return false;
              //check if it is the word switch, if not, we can process as a partial function
              if(code.substring(switchOpenParen-6,switchOpenParen) == "switch") return true;
              return false;
            }
            //mark switch statements as being processed, but don't transform them into partial functions
            //the special mark prevents the parser from reprocessing this same code repeatedly, we'll fix it up later
            if(isSwitch()) return ("{_[switch]_"+partialFunctionMatch[0].substring(1)+body+"}")
              
            //deal with inner partial functions
            body = partialFunctionParser(body)
            //reincorporate the first case statement into the body (it was removed as part of the body capture process)
            body = partialFunctionMatch[0].substring(partialFunctionMatch[1].length+1)+body
            
            var remainingBody = body
            var caseStartExpression = /^\s*case\s+/
            var nextCaseExpression = /(\s+)case\s+/
            var guardExpression = /^if\s+(.*?)=>/
            var rootValueMatchExpression = /^(null|true|false|`\w+`|[+-]?\d*\.?\d+|<<<_rsstr\d+__rsstr\d+_>>>)\s*(?:=>|if)/
            var rootTypeMatchExpression = /^(\w+)\s*:\s*(\w+)\s*(?:=>|if)/
            var rootVariableMatchExpression = /^(\w+)\s*(?:=>|if)/
            var rootLabeledExtractExpression = /^(\w+)\s*\@\s*([\w\.]+)\((.*)\)\s*(?:=>|if)/
            var rootExtractExpression = /^([\w\.]+)\((.*)\)\s*(?:=>|if)/
            
            var caseClauses = []
            
            while(caseStartExpression.test(remainingBody)){
              remainingBody = remainingBody.replace(caseStartExpression,"")
              var matched = null;
              
              var guards = []
              var variableName = null
              var extractors = []
              
              //collect the extractor
              if( ( matched = rootValueMatchExpression.exec(remainingBody) ) !=null ){
                variableName = nextName()
                guards.push("("+variableName+" === "+matched[1].replace(/`/g,"")+")")
                remainingBody = remainingBody.substring(matched[0].length-2)
              } else if( ( matched = rootTypeMatchExpression.exec(remainingBody) ) !=null ){
                variableName = matched[1]
                guards.push("isInstanceOf("+matched[1]+","+matched[2]+")")
                remainingBody = remainingBody.substring(matched[0].length-2)
              } else if( ( matched = rootVariableMatchExpression.exec(remainingBody) ) !=null ){
                variableName = matched[1]
                remainingBody = remainingBody.substring(matched[0].length-2)
              } else if( ( matched = rootLabeledExtractExpression.exec(remainingBody) ) !=null ){
                variableName = matched[1]
                //queue the extractor to be handled
                extractors.push({
                  variableName: variableName,
                  unapply: matched[2],
                  body: matched[3]
                })
                remainingBody = remainingBody.substring(matched[0].length-2)
              } else if( ( matched = rootExtractExpression.exec(remainingBody) ) !=null ){
                variableName = nextName()
                //queue the extractor to be handled
                extractors.push({
                  variableName: variableName,
                  unapply: matched[1],
                  body: matched[2]
                })
                remainingBody = remainingBody.substring(matched[0].length-2)
              } else {
                parseError("Unhandled case clause in a partial function:" + remainingBody)
              }
              
              var extractorsFront = []
              var extractorsEnd = []
              //process extractors
              var valueMatchExpression = /^\s*(null|true|false|`\w+`|[+-]?\d*\.?\d+|<<<_rsstr\d+__rsstr\d+_>>>)\s*(?:$|,)/
              var variableMatchExpression = /^\s*(\w+)\s*(|@\s*_\*)\s*(?:$|,)/
              var typeMatchExpression = /^\s*(\w+)\s*:\s*(\w+)\s*(?:$|,)/
              var labeledExtractExpression = /^\s*(\w+)\s*\@\s*([\w\.]+)\(/
              var extractExpression = /^\s*([\w\.]+)\(/
              for(var i=0;i<extractors.length;i++){
                var current = extractors[i];
                var args = [];
                
                //we have args
                var currentBody = current.body
                var currentVariableName = null
                var isWildcard = false
                while(!/^\s*$/.test(currentBody)){
                  if(isWildcard) parseError("wildcard extractor can only be specified at the end of the argument list",currentBody)
                  
                  //collect the extractor
                  if( ( matched = valueMatchExpression.exec(currentBody) ) !=null ){
                    currentVariableName = nextName()
                    args.push(currentVariableName)
                    guards.push("("+currentVariableName+" === "+matched[1].replace(/`/g,"")+")")
                    currentBody = currentBody.substring(matched[0].length)
                  } else if( ( matched = typeMatchExpression.exec(currentBody) ) !=null ){
                    currentVariableName = matched[1]
                    args.push(currentVariableName)
                    guards.push("isInstanceOf("+matched[1]+","+matched[2]+")")
                    currentBody = currentBody.substring(matched[0].length)
                  } else if( ( matched = variableMatchExpression.exec(currentBody) ) !=null ){
                    currentVariableName = matched[1]
                    
                    if(!/^\s*$/.test(matched[2])) isWildcard = true
                    
                    args.push(currentVariableName)
                    currentBody = currentBody.substring(matched[0].length)
                  } else if( ( matched = labeledExtractExpression.exec(currentBody) ) !=null ){
                    currentVariableName = matched[1]
                    var currentUnapply = matched[2]
                    args.push(currentVariableName)
                    
                    var bodyStart = matched[0].length-1
                    var bodyEnd = bracketMatcher(currentBody,bodyStart)
                    var innerBody = currentBody.substring(bodyStart+1,bodyEnd)
                    
                    //trim out the body and the )
                    currentBody = currentBody.substring(bodyEnd+1)
                    
                    //trim off the , and whitespace
                    matched = /^\s*(?:$|,)/.exec(currentBody)
                    if(matched == null) parseError("Error finding terminator for inner extract expression",currentBody)
                    currentBody = currentBody.substring(matched[0].length)
                    
                    //queue the extractor to be handled
                    extractors.push({
                      variableName: currentVariableName,
                      unapply: currentUnapply,
                      body: innerBody
                    })

                  } else if( ( matched = extractExpression.exec(currentBody) ) !=null ){
                    currentVariableName = nextName()
                    var currentUnapply = matched[1]
                    args.push(currentVariableName)
                    
                    var bodyStart = matched[0].length-1
                    var bodyEnd = bracketMatcher(currentBody,bodyStart)
                    var innerBody = currentBody.substring(bodyStart+1,bodyEnd)
                    
                    //trim out the body and the )
                    currentBody = currentBody.substring(bodyEnd+1)
                    
                    //trim off the , and whitespace
                    matched = /^\s*(?:$|,)/.exec(currentBody)
                    if(matched == null) parseError("Error finding terminator for inner extract expression",currentBody)
                    currentBody = currentBody.substring(matched[0].length)
                    
                    //queue the extractor to be handled
                    extractors.push({
                      variableName: currentVariableName,
                      unapply: currentUnapply,
                      body: innerBody
                    })
                    
                  } else {
                    parseError("Unhandled inner clause from a case clause in a partial function: Remaining clause: " + currentBody,current.body)
                  }
                }
                
                extractorsFront.push(current.unapply)
                extractorsFront.push(".unapply(")
                extractorsFront.push(current.variableName)
                if(isWildcard) extractorsFront.push(",true,function(")
                else extractorsFront.push(",false,function(")
                extractorsFront.push(args.join(","))
                extractorsFront.push("){return ")
                
                extractorsEnd.push("})")
              }
              
              //collect the guard
              if( (matched = guardExpression.exec(remainingBody)) != null){
                var guard = matched[1]
                //debug("Guard: "+guard)
                guards.push("("+guard+")")
                remainingBody = remainingBody.substring(matched[0].length-2)
              }
              
              //collect the body
              var nextCase = findExpression(remainingBody,nextCaseExpression)
              var caseTrailingWhitespace = ""
              var caseClauseBody = null
              if(nextCase.index == -1){
                caseClauseBody = remainingBody.substring(2)
                remainingBody = ""
              } else {
                caseTrailingWhitespace = nextCase.match[1]
                caseClauseBody = remainingBody.substring(2,nextCase.index)
                remainingBody = remainingBody.substring(nextCase.index)
              }
              
              
              
              var isBlockClause = (
                /^\s*{/.test(caseClauseBody) && !(
                  /^\s*{\s*\w+\s*:/.test(caseClauseBody) ||                         //json object with symbol for key
                  /^\s*{\s*<<<_rsstr\d+__rsstr\d+_>>>\s*:/.test(caseClauseBody) ||  //json object with string for key
                  /^\s*{\s*(?:\w|,)*?\s*=>/.test(caseClauseBody)                    //lambda function
                )
              )
              
              var caseClauseBodyFunction = isBlockClause?
                                              "function()"+caseClauseBody:
                                              "function(){return ("+caseClauseBody+")}"
              
              //build the final function
              caseClauses.push(
                [
                  "function(",variableName,"){return ",
                  extractorsFront.join(""),
                  (
                    (guards.length > 0)?
                      ["(",guards.join(" && "),")?",caseClauseBodyFunction,":null"].join(""):
                      caseClauseBodyFunction
                  ),
                  extractorsEnd.join(""),
                  "}",
                  caseTrailingWhitespace
                ].join("")
              )
              
              
            }
            
            return "(__rsu._partialFunction("+partialFunctionMatch[1]+caseClauses.join(",")+"))";
          },true)
        
        code = partialFunctionParser(code)
        
        //fix marked switch bodies leftover from building partial functions...
        return createSyntax({regex:/{_\[switch\]_/,template:"{"})(code)
      },
      //import statement
      createSyntax({regex:/import\s+((?:\w|\.)*)\.(\w*)/,template:"__rsu._import('$1',$1,'$2',"+contextName+")"}),
      //package statement
      createBodyCaptureSyntax("packages",/package\s+((?:\w|\.)*)\s*{/,function(match,body){
        return "__rsu._package('"+match[1]+"',this,function(){var self = this;with(this){(function(){"+body+"}).apply(this,[])}})"
      }),
      //object with extends statement
      createBodyCaptureSyntax("object-with-extends",/object\s+(\w*)\s+extends\s+(\w*)\((.*)\)\s*{/,function(match,body){
        return (
          "__rsu._object('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$object);"+
          "function "+match[1]+"(){return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,"+match[2]+","+match[2]+"$class,["+match[3]+"]);"+
            "with(self){(function "+match[1]+"\$object\$ctor(){"+body+"}).apply(this,[])}"+
          "}"
        )
      }),
      //object
      createBodyCaptureSyntax("object",/object\s+(\w*)\s*{/,function(match,body){
        return (
          "__rsu._object('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$object);"+
          "function "+match[1]+"(){return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);"+
            "with(self){(function "+match[1]+"\$object\$ctor(){"+body+"}).apply(this,[])}"+
          "}"
        )
      }),
      createBodyCaptureSyntax("case-class",/case\s+class\s+(\w*)\s*\(/,function(match,body){
        return (
          "__rsu._caseClass('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$class);"+
          "function "+match[1]+"(){return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$class("+body+"){var base = __rsu._extend(this,__rsu._self(this),__rescripted.Product,__rescripted.Product,['"+match[1]+"',"+Json.encodeString(body)+",["+body+"]]);}"
        )
      }),
      //class with extends statement
      createBodyCaptureSyntax("class-with-extends",/class\s+(\w*)\s*\((.*)\)\s+extends\s+(\w*)\((.*)\)\s*{/,function(match,body){
        return (
          "__rsu._class('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$class);"+
          "function "+match[1]+"(){return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$class("+match[2]+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,"+match[3]+","+match[3]+"$class,["+match[4]+"]);"+
            "with(self){(function "+match[1]+"\$ctor(){"+body+"}).apply(this,[])}"+
          "}"
        )
      }),
      //class statement
      createBodyCaptureSyntax("class",/class\s+(\w*)\s*\((.*)\)\s*{/,function(match,body){
        return (
          "__rsu._class('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$class);"+
          "function "+match[1]+"(){return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$class("+match[2]+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);"+
            "with(self){(function "+match[1]+"\$ctor(){"+body+"}).apply(this,[])}"+
          "}"
        )
      }),
      //abstract / not implemented method definition
      createSyntax({regex:/def\s+(\w+)\s*(?:\([\w\s,<>]*\))?\s*=\s*\?\?\?/,template:"__rsu._abstractMethod('$1',this,self);"}),
      //private method definition
      createBodyCaptureSyntax("private-method",/private\s+def\s+(\w+)\s*\(([\w\s,<>]*)\)(?:\s*=\s*)?\s*[{\(]/,function(match,body){
        return functionBody(match[1],match[2],body,match[0].charAt(match[0].length - 1) == "(")
      }),
      //public override method definition
      createBodyCaptureSyntax("public-override-method",/override\s+def\s+(\w+)\s*\(([\w\s,<>]*)\)(?:\s*=\s*)?\s*[{\(]/,function(match,body){
        return "__rsu._method('"+match[1]+"',this,self,true,"+functionBody(null,match[2],body,match[0].charAt(match[0].length - 1) == "(")+");"
      }),
      //public method definition
      createBodyCaptureSyntax("public-method",/def\s+(\w+)\s*\(([\w\s,<>]*)\)(?:\s*=\s*)?\s*[{\(]/,function(match,body){
        return "__rsu._method('"+match[1]+"',this,self,false,"+functionBody(null,match[2],body,match[0].charAt(match[0].length - 1) == "(")+");"
      }),
      //single implicit parameter lambda with implicit return
      createBodyCaptureSyntax("lambda-implicit-param",/[{\(]\s*_(\W)/,function(match,body){
        var name = nextName()
        return "(function("+name+"){return ("+name+match[1]+body+")})"
      },true),
      //standard lambdas, wrapped in () means that the body is an expression, wrapped in {} means a normal function
      createBodyCaptureSyntax("lambda",/[{\(]\s*((?:\w|,|\s)*?)\s*=>/,function(match,body){
        return "("+functionBody(null,match[1],body,match[0].charAt(0) == "(")+")"
      },true),
      //foreach with filter expression (use odd negative lookahead for "){" to avoid accidentally matching an if at the beginning of a normal foreach )
      createBodyCaptureSyntax("foreach-with-filter",/for\s*\(\s*(\w*)\s+<-\s+((?:(?!\)\s*{).)*)\s+if\s+(.*)\s*\)\s*\{/,function(match,body){
        return "from("+match[2]+").filter(function("+match[1]+"){return "+match[3]+";}).foreach(function("+match[1]+"){"+body+"})"
      }),
      //foreach expression
      createBodyCaptureSyntax("foreach",/for\s*\(\s*(\w*)\s+<-\s+(.*)\s*\)\s*{/,function(match,body){
        return "from("+match[2]+").foreach(function("+match[1]+"){"+body+"})"
      }),
      //map with filter expression
      createBodyCaptureSyntax("map-with-filter",/for\s*\(\s*(\w*)\s+<-\s+(.*)\s+if\s+(.*)\s*\)\s*yield\s*\{/,function(match,body){//escape the last curly for rhino compat...
        return "from("+match[2]+").filter(function("+match[1]+"){return "+match[3]+";}).map(function("+match[1]+"){"+body+"})"
      }),
      //map expression
      createBodyCaptureSyntax("map",/for\s*\(\s*(\w*)\s+<-\s+(.*)\s*\)\s*yield\s*\{/,function(match,body){//escape the last curly for rhino compat...
        return "from("+match[2]+").map(function("+match[1]+"){"+body+"})"
      }),
      //filter expression
      createSyntax({regex:/for\s*\(\s*(\w*)\s+<-\s+(.*)\s+if\s+(.*)\s*\)\s*yield\s+\1/,template:"from($2).filter(function($1){return $3;})"}),
      //json objects as params with no parens
      createBodyCaptureSyntax("json-as-params",/(\w+)(\s*)\{/,function(match,body){
        switch(match[1]){
          case "do": case "else": case "try": case "finally": case "throw": case "yield":
            return "<<<"+match[1]+match[2]+">>>{"+body+"}";
          default:
            return match[1]+match[2]+"({"+body+"})";
        }
      }),
      createSyntax({regex:/<<<(\w+\s*)>>>\{/,template:"$1{"})
    ]
    
    currentPhase = "triple-quotes"
    //process triple quotes first, so they can be treated as normal strings below
    code = processTripleQuotes(code)
    
    currentPhase = "remove-comments"
    //capture and remove all comments, strings and regexes here to be reinsterted at the end    
    var extractedSnippets = []
    code = collectGroups([
        {regex:/\/\/[^\n]*/,namer:nextCommentName},                                 //single line comments
        {regex:/\/\*[^*]*\*+([^\/][^*]*\*+)*\//,namer:nextCommentName},             //multiline comments
        //{regex:/\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/,namer:nextStringName}, //regexes
        {regex:/'(\\.|[^'\\\r\n])*'/,namer:nextStringName},                         //single quoted strings, was /'(\\.|[^'\\])*'/
        {regex:/"(\\.|[^"\\\r\n])*"/,namer:nextStringName}                          //double quoted strings, no need to handle triple quotes, they've all been converted to double quotes by now, was /"(\\.|[^"\\])*"/
        ],extractedSnippets)(code)
    
    currentPhase = "reinsert-strings"
    //reinsert strings and regexes, this will keep xml literals from being broken, what a hack :(
    var tempSnippets = []
    for(var i=0;i<extractedSnippets.length;i++){
      var snippet = extractedSnippets[i];
      if(/^_rsstr/.test(snippet.name))
        code = code.replace(new RegExp("<<<"+snippet.name+"\\s*"+snippet.name+">>>"),function(match){return snippet.value})
      else
        tempSnippets.push(snippet)
    }
    extractedSnippets = tempSnippets
    
    currentPhase = "xml-literals"
    //process xml literals before other syntax extensions
    code = processXmlLiterals(code);
    
    currentPhase = "remove-strings"
    //take the strings and regexes back out...
    code = collectGroups([
        //{regex:/\/(\\[\/\\]|[^*\/])(\\.|[^\/\n\\])*\/[gim]*/},  //regexes
        {regex:/'(\\.|[^'\\\r\n])*'/,namer:nextStringName},     //single quoted strings, was /'(\\.|[^'\\])*'/
        {regex:/"(\\.|[^"\\\r\n])*"/,namer:nextStringName}      //double quoted strings, no need to handle triple quotes, they've all been converted to double quotes by now, was /"(\\.|[^"\\])*"/
        ],extractedSnippets)(code)

    //apply all syntax modifications
    for(var i=0;i<phases.length;i++){
      currentPhase = phases[i].phase || "phase-"+i
      code = phases[i](code)
    }
    
    currentPhase = "reinsert-all"
    //reinsert comments, regexes and strings
    for(var i=0;i<extractedSnippets.length;i++){
      var snippet = extractedSnippets[i];
      if(snippet.value.substring(0,2) == "//") snippet.value = "/*"+snippet.value.substring(2).split("/*").join("|*").split("*/").join("*|")+"*/"
      code = code.replace(new RegExp("<<<"+snippet.name+"\\s*"+snippet.name+">>>"),function(match){return snippet.value})
    }
    
    //code = (new NjsCompiler({exceptions:true})).compile(code, settings.file || "unknown file")
    
    //the with statement helps to scope import statements,
    //the extra wrapping function prevents there from being
    //strange errors where later defined functions can't be
    //accessed immediately (appears to be a firefox only problem).
    if(!forDisplay){
      code = ("(function(){"+
              "var self = this;"+
              "var "+contextName+" = {};with(this){with("+contextName+"){(function(){"+
              "var __rsu = __rescripted.util;"+
              "var from = __rsu.from;"+
              "var match = __rsu.match;"+
              "var typeOf = __rsu.typeOf;"+
              "var isInstanceOf = __rsu.isInstanceOf;"+
              code+
              "}).apply(__rescripted.script.root,[]);}}"+
              "}).apply(__rescripted.script.root,[]);");
    }
    
    return code;
  },
  load:function(code,settings){
    return eval(__rescripted.script.transform(code,settings));

    // try{
    //   //alert(code);//before
    //   code = __rescripted.script.transform(code);
    //   //println(code);//and after!
    //   return eval(code);
    // } catch(e) {
    //   println(code);
    //   throw e;
    // }

  },
  evaluateEmbeddedScriptTags:function(){
    var rescriptedTags = [];
    var evalQueue = [];
    var scripts = document.getElementsByTagName("script");
    var entryPointsExecuted = false
    for(var i=0;i<scripts.length;i++)
      if(scripts[i].type == 'text/rescripted')
        rescriptedTags.push(scripts[i]);
      
    function processQueue(){
      for(var i=0;i<evalQueue.length;i++){
        var item = evalQueue[i];
        if(!item.loaded)
          return;
        if(item.evaluated)
          continue;
        item.evaluated = true;
        __rescripted.script.load(item.code,{file:item.url});
      }
      
      if(!entryPointsExecuted){
        entryPointsExecuted = true;
        for(var i=0;i<__rescripted.script.entryPoints.length;i++){
          try{ __rescripted.script.entryPoints[i]() } catch(e) { logError(e) }
        }
      }
      
    }
      
    function beginAsyncLoad(url){
      //detect and resolve rooted or relative urls without protocol
      var currentUrl = location.href
      if(currentUrl.indexOf("#") != -1) currentUrl = currentUrl.substring(0,currentUrl.indexOf("#"))
      if(url.indexOf("://") == -1)
        url = ((url.charAt(0) == '/') ?
                (currentUrl.substring(0,currentUrl.indexOf("/",currentUrl.indexOf("://")+3))+url):
                (currentUrl.substring(0,currentUrl.lastIndexOf("/")+1)+url));
      
      var item = {code:null,loaded:false,evaluated:false,url:url};
        
      if(__rescripted.script.externalTransformer != null){
        jQuery.getScript(__rescripted.script.externalTransformer+"?cachebuster="+(new Date().getTime())+"&url="+url, function(){
          item.loaded = true
          item.evaluated = true
          processQueue()
        });
      } else {
        Http.get(url).text(function(code){item.code = code;item.loaded = true;processQueue();});
      }
      return item;
    }

    for(var i=0;i<rescriptedTags.length;i++){
      var script = rescriptedTags[i];
      if(script.src)
        evalQueue.push(beginAsyncLoad(script.src));
      else
        evalQueue.push({code:script.innerHTML,loaded:true,evaluated:false,url:"[embedded script tag]"});
    }
    
    processQueue();
  }
};

if(this["$"]){ $(__rescripted.script.evaluateEmbeddedScriptTags) }

  
(function(){var self = this;var _rs110_ = {};with(this){with(_rs110_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;
__rsu._package('rescripted.collections',this,function(){var self = this;with(this){(function(){
  
  __rsu._class('Pair',this,self,Pair,Pair$class);function Pair(){return __rsu._construct(this,'Pair',Pair$class,arguments.callee,arguments);};function Pair$class(a,b){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Pair$ctor(){
    self[0] = self._1 = self.key = a
    self[1] = self._2 = self.value = b
    self.length = 2
    self.isPair = true
  }).apply(this,[])}}
  
  __rsu._object('List',this,self,List,List$object);function List(){return __rsu._construct(this,'List',List$class,arguments.callee,arguments);};function List$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function List$object$ctor(){
    __rsu._method('fromArray',this,self,false,function(array){return List.apply(null,array || []);});
    
    __rsu._method('unapply',this,self,false,function(list,wildcard,extractor){
      /*convert arrays into lists*/
      if(typeOf(list) == Array) list = fromArray(list)
      /*convert arguments "array" into lists*/
      if(list.hasOwnProperty("callee") && list.hasOwnProperty("length")) list = fromArray(list)
      
      /*fail on non-lists*/
      if(!isInstanceOf(list,List)) return null
      
      if(wildcard){
        /*the list is too small to match the extractor*/
        if(list.size() < extractor.length - 1) return null
          
        /*collect our params*/
        var params = list.take(extractor.length - 1).unwrap()
        /*pass the wildcards as a List*/
        params.push(list.drop(extractor.length - 1))
        /*we have a match, apply it*/
        return extractor.apply(null,params)
      } else {
        /*list doesn't match the extractor*/
        if(list.size() != extractor.length) return null
          
        /*we have a match, apply it*/
        return extractor.apply(null,list.unwrap())
      }
      
    });
  }).apply(this,[])}}
  
  __rsu._object('Seq',this,self,Seq,Seq$object);function Seq(){return __rsu._construct(this,'Seq',Seq$class,arguments.callee,arguments);};function Seq$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Seq$object$ctor(){
    self.Break = {seqBreakObject:true}
    
    __rsu._method('mkStringArguments',this,self,false,(__rsu._partialFunction(
      function(_rs11119_){return Seq.unapply(_rs11119_,false,function(prefix,delim,suffix){return (isInstanceOf(prefix,String) && isInstanceOf(delim,String) && isInstanceOf(suffix,String))?function(){return ( {prefix:prefix,suffix:suffix,delim:delim})}:null})}
      ,function(_rs11120_){return Seq.unapply(_rs11120_,false,function(delim){return (isInstanceOf(delim,String))?function(){return ( {prefix:"",suffix:"",delim:delim})}:null})}
      ,function(_rs11121_){return Seq.unapply(_rs11121_,false,function(named){return (isInstanceOf(named,Object) && ("delim" in named ))?function(){return ( {prefix:named.prefix || "",suffix:named.suffix || "",delim:named.delim})}:null})} 
      ,function(_rs11122_){return Seq.unapply(_rs11122_,false,function(){return function(){return ( {prefix:"",suffix:"",delim:","})}})}
      ,function(_rs11123_){return Seq.unapply(_rs11123_,true,function(args){return function(){return ( error("invalid arguments: "+args.mkString(","))
    )}})})));
    
    __rsu._method('isArrayLike',this,self,false,function(value){
      if(value == null) return false
      if(typeOf(value) == Array) return true
      if(isArguments(value)) return true
      return false
    });
    __rsu._method('isArguments',this,self,false,function(value){ return value.hasOwnProperty("callee") && value.hasOwnProperty("length") });
    __rsu._method('fromArray',this,self,false,function(array){ return ArraySeq(array) });
    __rsu._method('fromString',this,self,false,function(value){ return StringSeq(value || "") });
    __rsu._method('unapply',this,self,false,function(seq,wildcard,extractor){
      /*convert arrays a Seq*/
      if(isArrayLike(seq)) seq = fromArray(seq)
      
      /*fail on non-Seqs*/
      if(!isInstanceOf(seq,Seq)) return null
      
      /*can't extract a seq with unknown size*/
      if(!("size" in seq)) return null
    
      if(wildcard){
        /*the seq is too small to match the extractor*/
        if(seq.size() < extractor.length - 1) return null
          
        /*collect our params*/
        var params = seq.take(extractor.length - 1).toArray()
        /*pass the wildcards as a Seq*/
        params.push(seq.drop(extractor.length - 1))
        /*we have a match, apply it*/
        return extractor.apply(null,params)
      } else {
        /*seq doesn't match the extractor*/
        if(seq.size() != extractor.length) return null
          
        /*we have a match, apply it*/
        return extractor.apply(null,seq.toArray())
      }
      
    });
  }).apply(this,[])}}
  
  __rsu._class('Seq',this,self,Seq,Seq$class);function Seq(){return __rsu._construct(this,'Seq',Seq$class,arguments.callee,arguments);};function Seq$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Seq$ctor(){
    self.isRescriptedEnhanced = true
    
    __rsu._abstractMethod('foreach',this,self);
    __rsu._method('finalizeResults',this,self,false,function(results){return ArraySeq(results)});

    __rsu._method('toArray',this,self,false,function(){
      var results = []
      foreach(function(item){ results.push(item) })
      return results
    });
    
    __rsu._method('drop',this,self,false,function(n){
      var results = [];
      var index = 0
      foreach(function(item){ if(index++ >= n){ results.push(item) } })
      return finalizeResults(results);
    });
    
    __rsu._method('dropWhile',this,self,false,function(predicate){
      var results = [];
      var stillDropping = true
      foreach(function(item){
        if(stillDropping) stillDropping = predicate(item)
        if(!stillDropping) results.push(item)
      })
      return finalizeResults(results);
    });
    
    __rsu._method('take',this,self,false,function(n){
      var results = [];
      var index = 0
      foreach(function(item){
        if(index++ < n){ results.push(item) }
        else return Seq.Break;
      })
      return finalizeResults(results);
    });
    
    __rsu._method('takeWhile',this,self,false,function(predicate){
      var results = [];
      var stillTaking = true
      foreach(function(item){
        stillTaking = predicate(item)
        if(stillTaking) results.push(item)  
        else return Seq.Break
      })
      return finalizeResults(results);
    });
    
    __rsu._method('filter',this,self,false,function(predicate){
      var results = [];
      foreach(function(item){ if(predicate(item)){ results.push(item) } })
      return finalizeResults(results);
    });
    
    __rsu._method('map',this,self,false,function(func){
      var results = [];
      foreach(function(item){ results.push(func(item)) })
      return finalizeResults(results);
    });
    
    __rsu._method('collect',this,self,false,function(partialFunction){ return filter(partialFunction.isDefinedAt).map(partialFunction) });
    
    __rsu._method('contains',this,self,false,function(value){
      var result = false
      foreach(function(item){
        if(item == value){
          result = true
          return Seq.Break;
        }
      })
      return result;
    });
    
    __rsu._method('exists',this,self,false,function(predicate){
      var result = false
      foreach(function(item){
        if(predicate(item)){
          result = true
          return Seq.Break;
        }
      })
      return result;
    });
    
    __rsu._method('flatten',this,self,false,function(){
      var results = []
      function append(item){
        if(item == null){
          results.push(null)
        } else if(Seq.isArrayLike(item)){
          Seq.fromArray(item).foreach(append)
        } else if(item.isRescriptedEnhanced) {
          item.foreach(append)
        } else {
          results.push(item)
        }
      }
      foreach(append)
      return finalizeResults(results)
    });
    
    __rsu._method('reverse',this,self,false,function(){
      var results = []
      foreach(function(item){ results.push(item)})
      results.reverse()
      return finalizeResults(results)
    });
    
    __rsu._method('head',this,self,false,function(){
      var result = headOption()
      return result.isDefined? result.get() : error("attempted to access head on an empty Seq")
    });
    
    __rsu._method('headOrNull',this,self,false,function(){
      var result = null
      foreach(function(item){
        result = item
        return Seq.Break
      })
      return result
    });
    
    __rsu._method('headOption',this,self,false,function(){
      var result = None
      foreach(function(item){
        result = Some(item)
        return Seq.Break
      })
      return result
    });
    
    __rsu._method('last',this,self,false,function(){
      var result = lastOption()
      return result.isDefined? result.get() : error("attempted to access last on an empty Seq")
    });
    
    __rsu._method('lastOrNull',this,self,false,function(){
      var result = null
      foreach(function(item){ result = item })
      return result
    });
    
    __rsu._method('lastOption',this,self,false,function(){
      var result = null
      var found = false
      foreach(function(item){
        found = true
        result = item
      })
      if(!found) return None
      return Some(result)
    });
   
    __rsu._method('mkString',this,self,false,function(){
      var args = Seq.mkStringArguments(arguments)
      return args.prefix+self.toArray().join(args.delim)+args.suffix
    });
    
    __rsu._method('foldLeft',this,self,false,function(init){
      return (function(func){
        var current = init
        foreach(function(item){ current = func(current,item) })
        return current
      })
    });
    
    __rsu._method('reduceLeft',this,self,false,function(func){
      var current = null
      var first = true
      foreach(function(item){
        if(first){
          current = item
          first = false
        } else {
          current = func(current,item)
        }
      })
      return current
    });
    
    __rsu._method('min',this,self,false,function(func){ return reduceLeft(func || (function(a,b){return ( (a<=b)? a:b )}) ) });
    __rsu._method('max',this,self,false,function(func){ return reduceLeft(func || (function(a,b){return ( (a>=b)? a:b )}) ) });
    __rsu._method('sum',this,self,false,function(func){ return reduceLeft(func || (function(a,b){return ( a+b )}) ) });
    
    __rsu._method('toString',this,self,true,function(){ return mkString("Seq(",",",")") });
  }).apply(this,[])}}
  
  __rsu._class('ArraySeq',this,self,ArraySeq,ArraySeq$class);function ArraySeq(){return __rsu._construct(this,'ArraySeq',ArraySeq$class,arguments.callee,arguments);};function ArraySeq$class(source){var self = __rsu._self(this);var base = __rsu._extend(this,self,Seq,Seq$class,[]);with(self){(function ArraySeq$ctor(){
    if(source == null) source = [];
    
    __rsu._method('foreach',this,self,true,function(func){
      for(var i=0;i<source.length;i++)
        if(func(source[i]) == Seq.Break)
          return;
    });
    __rsu._method('finalizeResults',this,self,true,function(results){return ArraySeq(results)});
    __rsu._method('toArray',this,self,true,function(){ return source });
    __rsu._method('toString',this,self,true,function(){ return mkString("ArraySeq(",",",")") });
    
    __rsu._method('last',this,self,true,function(){
      if(source.length == 0) error("attempted to access last on an empty Seq")
      return source[source.length - 1]
    });
    
    __rsu._method('lastOrNull',this,self,true,function(){
      if(source.length == 0) return null
      return source[source.length - 1]
    });
    
    __rsu._method('unwrap',this,self,false,function(){ return source });
    
    __rsu._method('apply',this,self,false,function(index){ return source[index] });
    __rsu._method('update',this,self,false,function(index,value){source[index] = value});
    __rsu._method('push',this,self,false,function(value){
      var length = source.length
      source[length] = value
      source.length = length + 1
      return self
    });
    __rsu._method('append',this,self,false,function(value){return push(value)});
    
    __rsu._method('size',this,self,false,function(){return source.length});
    
    __rsu._method('sort',this,self,false,function(func,direction){
      var defaultSort = (function(a,b){
        if(a == null && b == null) return 0;
        if(a == null) return -1;
        if(b == null) return 1;
        return (a < b)? -1: (a > b)? 1: 0;
      })
      var sortFunc = func || defaultSort
      var isDescending = direction == "desc" || direction == "desc" || direction < 0
      if(sortFunc.length == 1){
        if(isDescending){
          source.sort(function(a,b){return ( defaultSort(func(b),func(a)))})
        } else {
          source.sort(function(a,b){return ( defaultSort(func(a),func(b)))})
        }
      } else {
        if(isDescending){
          source.sort(function(a,b){return ( sortFunc(b,a))})
        } else {
          source.sort(sortFunc)
        }
      }
      return self;
    });
  }).apply(this,[])}}
  
  __rsu._class('List',this,self,List,List$class);function List(){return __rsu._construct(this,'List',List$class,arguments.callee,arguments);};function List$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ArraySeq,ArraySeq$class,[__rescripted.util.toArray(arguments)]);with(self){(function List$ctor(){
    __rsu._method('finalizeResults',this,self,true,function(results){return List.fromArray(results)});
    __rsu._method('toString',this,self,true,function(){return mkString("List(",",",")")});
  }).apply(this,[])}}
  
  __rsu._object('Stack',this,self,Stack,Stack$object);function Stack(){return __rsu._construct(this,'Stack',Stack$class,arguments.callee,arguments);};function Stack$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Stack$object$ctor(){
    __rsu._method('fromArray',this,self,false,function(array){return Stack.apply(null,array || []);});
  }).apply(this,[])}}
  
  __rsu._class('Stack',this,self,Stack,Stack$class);function Stack(){return __rsu._construct(this,'Stack',Stack$class,arguments.callee,arguments);};function Stack$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ArraySeq,ArraySeq$class,[__rescripted.util.toArray(arguments)]);with(self){(function Stack$ctor(){
    __rsu._method('pop',this,self,false,function(){
      var raw = unwrap()
      var result = raw[raw.length-1]
      raw.length--;
      return result
    });
    __rsu._method('peek',this,self,false,function(){
      var raw = unwrap()
      return raw[raw.length-1]
    });
    
    __rsu._method('finalizeResults',this,self,true,function(results){return Stack.fromArray(results)});
    __rsu._method('toString',this,self,true,function(){return mkString("Stack(",",",")")});    
  }).apply(this,[])}}
  
  /*5 to 1 by -1 == Range(5,1,-1).inclusive()*/
  /*5 until 1 by -1 == Range(5,1,-1)*/
  
  __rsu._class('Range',this,self,Range,Range$class);function Range(){return __rsu._construct(this,'Range',Range$class,arguments.callee,arguments);};function Range$class(start,end,by){var self = __rsu._self(this);var base = __rsu._extend(this,self,Seq,Seq$class,[]);with(self){(function Range$ctor(){
    by = by || 1
    /*if(by == 0) error("Range error: 'by' must be non-zero")*/
    __rsu._method('foreach',this,self,true,function(func){
      if(by == 0) return
      if(end > start && by < 0) return
      if(end < start && by > 0) return
      if(by > 0)
        for(var i=start;i<end;i+=by) func(i)
      else
        for(var i=start;i>end;i+=by) func(i)
    });
    __rsu._method('toString',this,self,true,function(){return mkString("Range(",",",")")});
    
    __rsu._method('inclusive',this,self,false,function(){
      return Range(start,end + ((by > 0)? 1:-1),by)
    });
  }).apply(this,[])}}
  
  __rsu._class('StringSeq',this,self,StringSeq,StringSeq$class);function StringSeq(){return __rsu._construct(this,'StringSeq',StringSeq$class,arguments.callee,arguments);};function StringSeq$class(source){var self = __rsu._self(this);var base = __rsu._extend(this,self,Seq,Seq$class,[]);with(self){(function StringSeq$ctor(){
    __rsu._method('foreach',this,self,true,function(func){
      for(var i=0;i<source.length;i++)
        if(func(source.charAt(i)) == Seq.Break)
          return;
    });
    __rsu._method('finalizeResults',this,self,true,function(results){
      if(results.length == 0)
        return ""
      /*assume the list is homogenous*/
      var isString = typeOf(results[0]) == String
      return (isString)?
                StringSeq(results.join("")):
                Seq.fromArray(results)
    });
    __rsu._method('toString',this,self,true,function(){ return source });
    
    __rsu._method('last',this,self,true,function(){
      if(source.length == 0) error("attempted to access last on an empty StringSeq")
      return source.charAt(source.length - 1)
    });
    
    __rsu._method('lastOrNull',this,self,true,function(){
      if(source.length == 0) return null
      return source.charAt(source.length - 1)
    });
  }).apply(this,[])}}
  
  __rsu._class('Map',this,self,Map,Map$class);function Map(){return __rsu._construct(this,'Map',Map$class,arguments.callee,arguments);};function Map$class(initData){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Map$ctor(){
    self.isRescriptedEnhanced = true
    
    var data = __rescripted.util.merge(initData || {},{});
    
    __rsu._method('keys',this,self,false,function(){return map(function(_rs11124_){return (_rs11124_.key)})});
    __rsu._method('values',this,self,false,function(){return map(function(_rs11125_){return (_rs11125_.value)})});
    
    __rsu._method('apply',this,self,false,function(key){ return data[key] });
    __rsu._method('update',this,self,false,function(key,value){data[key] = value;});
    
    __rsu._method('foreach',this,self,false,function(func){
      for(var key in data)
        if(data.hasOwnProperty(key))
          func(Pair(key,data[key]))
      return self;
    });
    
    __rsu._method('contains',this,self,false,function(key){return (data.hasOwnProperty(key))});
    
    __rsu._method('filter',this,self,false,function(func){
      var results = Map();
      foreach(function(item){ if(func(item)) results.update(item.key,item.value) })
      return results;
    });

    __rsu._method('map',this,self,false,function(func){
      var results = [];
      var isResultAMap = true
      from(self).foreach(function(item){
        var result = func(item)
        results.push(result)
        if(!result || !(result.isPair)){ isResultAMap = false; }
      })

      if(!isResultAMap || results.length == 0)
        return List.fromArray(results);
      
      var map = Map();
      for(var i=0;i<results.length;i++){
        var item = results[i];
        map.update(item.key,item.value);
      }
      return map;
    });
    
    __rsu._method('mkString',this,self,false,function(){
      return map((function(item){ return item.key+" -> "+item.value})).mkString.apply(null,arguments)
    });
    
    __rsu._method('toString',this,self,true,function(){return mkString("Map(",",",")")});

    __rsu._method('unwrap',this,self,false,function(){return data;});
  }).apply(this,[])}}  
  
  __rsu._method('Option',this,self,false,function(value){ return (value == null)? None : Some(value) });
  
  __rsu._class('Optional',this,self,Optional,Optional$class);function Optional(){return __rsu._construct(this,'Optional',Optional$class,arguments.callee,arguments);};function Optional$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Optional$ctor(){
    self.isRescriptedEnhanced = true
    
    self.isEmpty = true  
    self.isDefined = false
  
    __rsu._abstractMethod('get',this,self);

    __rsu._method('getOrElse',this,self,false,function(defaultValue){ return isEmpty? defaultValue : get() });
    __rsu._method('orNull',this,self,false,function(){return getOrElse(null) });
    __rsu._method('map',this,self,false,function(f){ return isEmpty? None : Some(f(get())) });
    __rsu._method('flatMap',this,self,false,function(f /*: A => Option[B]*/){ return isEmpty? None : f(get()) });
    __rsu._method('filter',this,self,false,function(p){ return (isEmpty || p(get()))? self : None });
    __rsu._method('exists',this,self,false,function(p){ return isDefined && p(get()) });
    __rsu._method('foreach',this,self,false,function(f){ if(isDefined) f(get()) });
    __rsu._method('collect',this,self,false,function(pf){ return (isDefined && pf.isDefinedAt(get()))? Some(pf(get())) : None });
    __rsu._method('orElse',this,self,false,function(alternative /*: => Option[B]*/ ){return isEmpty? alternative : self});
  }).apply(this,[])}}
  
  __rsu._class('Some',this,self,Some,Some$class);function Some(){return __rsu._construct(this,'Some',Some$class,arguments.callee,arguments);};function Some$class(x){var self = __rsu._self(this);var base = __rsu._extend(this,self,Optional,Optional$class,[]);with(self){(function Some$ctor(){
    self.isEmpty = false
    self.isDefined = true
    __rsu._method('get',this,self,false,function(){ return x });
    __rsu._method('toString',this,self,true,function(){return "Some("+x+")"});
  }).apply(this,[])}}
  
  __rsu._object('None',this,self,None,None$object);function None(){return __rsu._construct(this,'None',None$class,arguments.callee,arguments);};function None$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Optional,Optional$class,[]);with(self){(function None$object$ctor(){
    __rsu._method('get',this,self,false,function(){error("No Such Element 'None.get'")});
    __rsu._method('toString',this,self,true,function(){return "None"});
  }).apply(this,[])}}
  
}).apply(this,[])}})}).apply(__rescripted.script.root,[]);}}}).apply(__rescripted.script.root,[]);
(function(){var self = this;var _rs140_ = {};with(this){with(_rs140_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;__rsu._import('rescripted.collections',rescripted.collections,'_',_rs140_)
__rsu._package('rescripted.xml',this,function(){var self = this;with(this){(function(){
  
  /*http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/*/
  var ie = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while( div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0] );
    return ({version: (v > 4 ? v : 0) });
  }());
  
  __rsu._class('XmlNode',this,self,XmlNode,XmlNode$class);function XmlNode(){return __rsu._construct(this,'XmlNode',XmlNode$class,arguments.callee,arguments);};function XmlNode$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function XmlNode$ctor(){}).apply(this,[])}}
  
  function XmlChildren(value){
    var emptyNode = (function(parent){ })
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
      return (function(parent){
        for(var i=0;i<value.length;i++){
          XmlChildren(value[i])(parent)
        }
      })
      
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
  
  __rsu._method('XmlElement',this,self,false,function(name,attributes,children){
    var _self = (function(name,value){
      if(value) {
        _self.update(name,value)
        return value;
      } else {
        return (ArraySeq(attributes).filter(function(_rs1460_){return (_rs1460_.name == name)}).headOrNull() || {value:null}).value;
      }
    })
    
    _self.nodeName = name
    /*_self.attributes = ArraySeq(attributes)*/
    /*_self.children = ArraySeq(children)*/
    
    _self.appendChildrenTo = (function(parent){ XmlChildren(children)(XmlResolveParent(parent));return _self})
    
    var onDomReady = []
    
    _self.append = (function(child){ children.push(child);return _self })
    
    _self.domReady = (function(func){ onDomReady.push(func);return _self })
    _self.update = (function(name,value){
      var attrs = ArraySeq(attributes)
      if(!attrs.exists(function(_rs1461_){return (_rs1461_.name == name)}))
        attrs.append({name:name,value:value})
      else
        attrs.filter(function(_rs1462_){return (_rs1462_.name == name)}).head().value = value
      return _self
    })
    
    _self.toDom = (function(doc){
      var node = doc.createElement("root")
      _self.appendToDom(node)
      var result = node.childNodes.item(0)
      node.removeChild(result)
      return result
    })

    var appendToDom = (function(parent){
      /*var elem = parent.ownerDocument.createElement(name)*/
      var n = _self.nodeName 
      var elem = parent.ownerDocument.createElement(n)
      
      /*handle attributes*/
      for(var i=0;i<attributes.length;i++){
        var attr = attributes[i]
        if(attr.value != null){
          elem.setAttribute(attr.name,attr.value.toString())
          
          /*ie6/ie7 weirdness fixes*/
          if(ie.version != 0 && ie.version <= 7){
            if(attr.name == "class" && "className" in elem)
              elem.className = attr.value
            if(attr.name == "style" && "style" in elem && "setAttribute" in elem.style)
              elem.style.setAttribute('cssText', attr.value, 0);
          }
          
          /*event helpers*/
          if(typeOf(attr.value) == Function)
            elem[attr.name] = attr.value
        }
      }
      
      XmlChildren(children)(elem)
      
      parent.appendChild(elem)
      
      for(var i=0;i<onDomReady.length;i++){ onDomReady[i](elem) }
    })
    return XmlNode(
      (function(){return ( Xml.toString(_self.toDom(Xml.createDocument())) )}),
      appendToDom,
      _self
    )
  });
  __rsu._method('XmlText',this,self,false,function(value){
    return XmlNode(
      (function(){return (  "XmlText("+text+")")}),
      (function(parent){ parent.appendChild(parent.ownerDocument.createTextNode(value.toString()))})
    )
  });
  
  __rsu._method('XmlComment',this,self,false,function(text){
    return XmlNode(
      (function(){return ("XmlComment("+text+")")}),
      (function(parent){ parent.appendChild(parent.ownerDocument.createComment(text))})
    )
  });
  __rsu._method('XmlCdata',this,self,false,function(text){
    return XmlNode(
      (function(){return ("XmlCdata("+text+")")}),
      (function(parent){
        try{ parent.appendChild(parent.ownerDocument.createCDATASection(text)) }
        catch(e) { parent.appendChild(parent.ownerDocument.createTextNode(text)) }
      })
    )
  });
  __rsu._method('XmlJavascriptFragment',this,self,false,function(stuff){
    return XmlNode(
      (function(){return ("XmlJavascriptFragment("+stuff+")")}),
      XmlChildren(stuff)
    )
  });
  __rsu._method('XmlUnknownNodeType',this,self,false,function(nodeType){
    return XmlNode(
      (function(){return ("XmlUnknownNodeType("+nodeType+")")}),
      (function(parent){ parent.appendChild(parent.ownerDocument.createTextNode("XmlUnknownNodeType("+nodeType+")"))})
    )
  });
  
  function XmlNode(toString,appendToDom,_self){
    _self = _self || {}
    _self.__rescriptedTypes = [XmlNode];
    _self.toString = toString
    _self.appendToDom = appendToDom
    _self.appendTo = (function(parent){ appendToDom(XmlResolveParent(parent));return _self})    
    return _self
  }
  
  function XmlResolveParent(parent){
    if(parent.jquery && parent.length > 0) parent = parent.get(0)
    if(parent.jquery && parent.length == 0) error("jquery parent passed to appendTo, but the jquery object had no elements");
    if(typeOf(parent) == String) parent = document.getElementById(parent)
    return parent
  }
}).apply(this,[])}})}).apply(__rescripted.script.root,[]);}}}).apply(__rescripted.script.root,[]);
