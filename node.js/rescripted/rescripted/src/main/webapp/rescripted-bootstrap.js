//rescripted is an in-browser syntax extension for javascript
//http://www.opensource.org/licenses/mit-license.php

//borrowed from: XRegExp 1.5.0 <xregexp.com> MIT License
function RegExpEscape(p){return p.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}

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
    return function(successHandler,errorHandler){
      $.ajax({
        url:url,
        type:method,
        dataType:dataType,
        data:data,
        contentType:contentType,
        success:function(data,stat,xhr){successHandler(data); },
        error:function(req,status,error){
          if(errorHandler)
            errorHandler(req,status,error,url)
          else
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
      text:function(){Http.prepare(url,"POST","text",data,contentType).apply(null,arguments)},
      json:function(){Http.prepare(url,"POST","json",data,contentType).apply(null,arguments)}
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
  bootstrapping:true,
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
    if(__rescripted.util.typeOf(obj) == String) return _root_.rescripted.collections.StringSeq(obj);
    if(_root_.rescripted.collections.Seq.isArrayLike(obj)) return _root_.rescripted.collections.Seq.fromArray(obj);
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
  _source:function(requires,provides,body,immediate){
    if(immediate){
      body.apply(_root_,[])
      body = function(){}
    }
    __rescripted.script.sources.push({requires:requires,provides:provides,body:body});
    return body;
  },
  _throw:function(obj){throw obj;},
  _namedParameters:function(args){
    if(args.length != 1) return undefined;
    if(args[0].$$named === undefined) return undefined;
    return args[0].$$named;
  },
  _checkParameterType:function(methodName,argName,typeName,value,type){
    if(!__rescripted.util.isInstanceOf(value,type))
      error(methodName+": "+argName+" must be of type "+typeName)
  },
  _validateParameters:function(methodName,names,values,args,isVarArgs){
    if(!isVarArgs && args.length > names.length)
      error(methodName+" only expected "+names.length+" parameter(s), but received "+args.length+" parameter(s)")
    var bad = []
    for(var i=0;i<values.length;i++)
      if(values[i] == undefined)
        bad.push(names[i]);
    if(bad.length > 0)
      error(methodName+" expected "+names.length+" parameters but some were missing: "+names.join(","))
  },
  _typedVarArgs:function(position,args,type){
    var result = [];
    for(var i=position;i<args.length;i++){
      var value = args[i];
      if(!__rescripted.util.isInstanceOf(value,type))
        error("Argument "+i+" must be of type "+type)
      
      result.push(value);
    }
    return _root_.rescripted.collections.Seq.fromArray(result);
  },
  _varArgs:function(position,args){
    var result = [];
    for(var i=position;i<args.length;i++)
      result.push(args[i]);
    return _root_.rescripted.collections.Seq.fromArray(result);
  },
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
    if(__rescripted.util.bootstrapping && packageName == "rescripted.lang")
      packageName = "rescripted.lang.bootstrap"
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
  _propertyReference:function(propertiesList){
    var lastProp = propertiesList[propertiesList.length - 1]
    return function(obj){
      return function(value){
        if(arguments.length == 0){
          var current = obj
          for(var i=0; i < propertiesList.length - 1 ;i++){
            prop = propertiesList[i];
            if(current == null) continue;
            current = current[prop]
          }
          return (current == null)?null:current[lastProp];
        } else if(arguments.length == 1) {
          var current = obj
          for(var i=0; i < propertiesList.length - 1 ;i++){
            prop = propertiesList[i];
            if(!(prop in current)) current[prop] = {}
            current = current[prop]
          }
          current[lastProp] = value
          return value;          
        }
      }
    }
  },
  _bindProperty:function(obj,propertiesList){
    var propertyRef = __rescripted.util._propertyReference(propertiesList)
    if(obj != null && typeof obj.createBoundProperty == "function"){
      return obj.createBoundProperty(propertiesList,propertyRef)
    } else {
      return propertyRef(obj)
    }
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

(function(){
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
    
  function nestedPairMatcher(chars,reverse){
    if(chars.length % 2 != 0) throw new Error("nestedPairMatcher requires an even number of characters to be treated as pairs")
    return function(code,index){
      var firstIndex = index
      var advanceBy = reverse? -1:1;
      var firstChar = code.charAt(index)
      index+=advanceBy;
      if(chars.indexOf(firstChar) == -1) throw new Error("specified char '"+firstChar+"' isn't supported for pair matching, supported chars: "+chars)
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
              throw new Error("improperly nested character, expected '"+chars.charAt(chars.indexOf(opener)+1)+"', but found '"+currentChar+"' on line number: "+(info.line+1)+" '"+line+"'")
            }
            break;
          default:
            throw new Error("nestedPairMatcher: How did we get here?")
        }

        if(stack.length <= 0) return index;
        
        index+=advanceBy;
      }
      throw new Error("the character you were looking for ('"+firstChar+"' on line number "+(lineInfo(code,firstIndex).line+1)+") didn't have a matching end character")
    }
  }
  
  __rescripted.util.bracketMatcher = nestedPairMatcher("{}()[]")
  __rescripted.util.reverseBracketMatcher = nestedPairMatcher("}{)(][",true)
})();

__rescripted.script = {
  root:_root_,
  entryPoints:[],
  sources:[],
  transformLegacy:function(code,settings){
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
    
    var bracketMatcher = __rescripted.util.bracketMatcher;
    var reverseBracketMatcher = __rescripted.util.reverseBracketMatcher;
    
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
              
              return "XmlElement("+Json.encodeString(n.tagName)+",["+attributes.join(",")+"],["+children.join(",")+"])";
              break;
            default: return "XmlUnknownNodeType("+n.nodeType+")"; break;
          }
        }
  
        return "("+encodeNode(node)+")";
      }
      
      return beginProcessingXmlLiterals(code);
    }
    
    function functionBody(name,args,body,expression){ return "function"+(name == null?"":" "+name)+"("+args+"){"+ ( expression? "return ("+body+")": body )+ "}" }

    var importStatementPattern = /import\s+((?:\w|\.)*)\.(\w*)/
    var packageStatementPattern = /package\s+((?:\w|\.)*)\s*{/
    function getPackageList(code,pattern){
      var result = []
      var statement = null
      var regex = new RegExp(pattern.source,"g")
      while( (statement = regex.exec(code)) != null)
        result.push(statement[1])
      return result;
    }
    
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
      //property binding
      createSyntax({regex:/(\w+)#(\w+)#(\w+)#(\w+)#(\w+)#(\w+)/,template:"__rsu._bindProperty($1,['$2','$3','$4','$5','$6'])"}),
      createSyntax({regex:/(\w+)#(\w+)#(\w+)#(\w+)#(\w+)/,template:"__rsu._bindProperty($1,['$2','$3','$4','$5'])"}),
      createSyntax({regex:/(\w+)#(\w+)#(\w+)#(\w+)/,template:"__rsu._bindProperty($1,['$2','$3','$4'])"}),
      createSyntax({regex:/(\w+)#(\w+)#(\w+)/,template:"__rsu._bindProperty($1,['$2','$3'])"}),
      createSyntax({regex:/(\w+)#(\w+)/,template:"__rsu._bindProperty($1,['$2'])"}),
      //import statement
      createSyntax({regex:importStatementPattern,template:"__rsu._import('$1',$1,'$2',"+contextName+")"}),
      //package statement
      createBodyCaptureSyntax("packages",packageStatementPattern,function(match,body){
        return "__rsu._package('"+match[1]+"',this,function(){var self = this;with(this){(function(){"+body+"}).apply(this,[])}})"
      }),
      //object with extends statement
      createBodyCaptureSyntax("object-with-extends",/object\s+(\w*)\s+extends\s+(\w*)\((.*)\)\s*{/,function(match,body){
        return (
          "__rsu._object('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$object);"+
          "function "+match[1]+"(){if(typeof("+match[1]+"\$class) == 'undefined') return "+match[1]+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
          "function "+match[1]+"\$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,"+match[2]+","+match[2]+"$class,["+match[3]+"]);"+
            "with(self){(function "+match[1]+"\$object\$ctor(){"+body+"}).apply(this,[])}"+
          "}"
        )
      }),
      //object
      createBodyCaptureSyntax("object",/object\s+(\w*)\s*{/,function(match,body){
        return (
          "__rsu._object('"+match[1]+"',this,self,"+match[1]+","+match[1]+"\$object);"+
          "function "+match[1]+"(){if(typeof("+match[1]+"\$class) == 'undefined') return "+match[1]+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+match[1]+"',"+match[1]+"\$class,arguments.callee,arguments);};"+
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
        ],extractedSnippets)(code);

    var dependencies = getPackageList(code,importStatementPattern);
    var provides = getPackageList(code,packageStatementPattern);
    
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
      
      var dependencyList = [];
      var providesList = [];
      for(var i=0;i<dependencies.length;i++)
        dependencyList.push("'"+dependencies[i]+"'");
      for(var i=0;i<provides.length;i++)
        providesList.push("'"+provides[i]+"'");
      
      code = ("__rescripted.util._source(["+dependencyList.join(",")+"],["+providesList.join(",")+"],function(){"+
              "var self = this;"+
              "var "+contextName+" = {};with(this){with("+contextName+"){(function(){"+
              "var __rsu = __rescripted.util;"+
              "var from = __rsu.from;"+
              "var match = __rsu.match;"+
              "var typeOf = __rsu.typeOf;"+
              "var isInstanceOf = __rsu.isInstanceOf;"+
              code+
              "}).apply(__rescripted.script.root,[]);}}"+
              "},"+(settings.immediate === true)+");");
    }
    
    return code;
  },
  transform:function(code,settings){  
    //prepare our settings
    settings = __rescripted.script.extractSettings(code,settings);
    if(settings.legacy) {
      return __rescripted.script.transformLegacy(code,settings)
    } else {
      if(__rescripted.script.rescriptedToJavascript == null)
        __rescripted.script.rescriptedToJavascript = _root_.rescripted.lang.bootstrap.RescriptedToJavascript()
      return __rescripted.script.rescriptedToJavascript.transform(code,settings)
    }
  },
  load:function(code,settings){
    return eval(__rescripted.script.transform(code,settings));

    // try{
    //   //println(code);//before
    //   code = __rescripted.script.transform(code);
    //   //println(code);//and after!
    //   return eval(code);
    // } catch(e) {
    //   println(code);
    //   throw e;
    // }

  },
  run:function(code,settings){ __rescripted.script.load(code,settings).apply(__rescripted.script.root,[]); },
  extractSettings:function(code,defaultSettings){
    defaultSettings = defaultSettings || {}
    try{
      var match = /^\s*\/[\/\*]\s*rescripted-settings\s*:\s*({.*})/.exec(code);
      return match == null? defaultSettings : __rescripted.util.merge(defaultSettings,Json.parse(match[1]));
    } catch(e) {
      logError("Error parsing settings: "+e);
      return defaultSettings;
    }
  },
  processScriptTags:function(){
    __rescripted.util.bootstrapping = false;
    
    var scriptQueue = [];
    var scripts = document.getElementsByTagName("script");
    for(var i=0;i<scripts.length;i++){
      if(scripts[i].type != 'text/rescripted')
        continue;

      var script = scripts[i];
      if(script.src)
        scriptQueue.push(loadScriptAsync(resolveUrl(script.src)));
      else
        scriptQueue.push({code:script.innerHTML,available:true,url:"[embedded script tag: "+location.href+"]"});
    }
    
    function resolveUrl(url){
      //detect and resolve rooted or relative urls without protocol
      var currentUrl = location.href
      if(currentUrl.indexOf("#") != -1) currentUrl = currentUrl.substring(0,currentUrl.indexOf("#"))
      if(url.indexOf("://") == -1)
        url = ((url.charAt(0) == '/') ?
                (currentUrl.substring(0,currentUrl.indexOf("/",currentUrl.indexOf("://")+3))+url):
                (currentUrl.substring(0,currentUrl.lastIndexOf("/")+1)+url));
      return url;
    }
    
    function loadScriptAsync(url){
      var item = {code:null,available:false,loaded:false,url:url};
      Http.get(url).text(function(code){
        item.code = code;
        item.available = true;
        processQueue();
      });
      return item;
    }
    
    processQueue();
    function processQueue(){
      for(var i=0;i<scriptQueue.length;i++){
        var item = scriptQueue[i];
        if(!item.available)
          return;
      }
      queueComplete();
    }
    
    function queueComplete(){
      //load all code first
      for(var i=0;i<scriptQueue.length;i++){
        var item = scriptQueue[i];
        __rescripted.script.load(item.code,{file:item.url});
      }
      
      //run code, in dependency order
      var sources = sortDependencies(__rescripted.script.sources)
      for(var i=0;i<sources.length;i++)
        sources[i].body.apply(__rescripted.script.root,[]);
      __rescripted.script.sources = [];

      //run entry points      
      for(var i=0;i<__rescripted.script.entryPoints.length;i++){
        try{ __rescripted.script.entryPoints[i]() } catch(e) { logError(e) }
      }

      function sortDependencies(sources){
        var packages = {};
        for(var i=0;i<sources.length;i++){
          var source = sources[i];
          for(var j=0;j<source.provides.length;j++){
            var name = source.provides[j];
            if(name in packages) packages[name] += 1
            else packages[name] = 1
          }
        }
        return sort(sources);
        
        function filter(input,predicate){
          var results = []
          for(var i=0;i<input.length;i++){
            var item = input[i];
            if(predicate(item))
              results.push(item);
          }
          return results;
        }
        
        function find(input,predicate){
          for(var i=0;i<input.length;i++){
            var item = input[i];
            if(predicate(item))
              return item;
          }
          return null;
        }
        
        function removeRequirement(input,name){
          for(var i=0;i<input.length;i++){
            var item = input[i];
            item.requires = filter(item.requires,function(req){return req != name})
          }
        }
              
        function sort(sources){
          var found = find(sources,function(item){return item.requires.length == 0});
          if(found == null){
            if(sources.length == 0)
              return []
            else
              return sources;//throw new Error("circular dependencies:" + Json.toString(sources))
          }
          
          //remove count from children of the found item...
          for(var i=0;i<found.provides.length;i++){
            var name = found.provides[i]
            packages[name] -= 1;
            if(packages[name] <= 0)
              removeRequirement(sources,name)
          }
          
          return [found].concat(sort(filter(sources,function(item){return item!=found})));
        }
      }
    }

  }
};

if(this["$"]){ $(__rescripted.script.processScriptTags) }
__rescripted.util._source([],['rescripted.collections'],function(){var self = this;var _rs200_ = {};with(this){with(_rs200_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;/*rescripted-settings:{"legacy":true,"immediate":true}*/

__rsu._package('rescripted.collections',this,function(){var self = this;with(this){(function(){
  
  __rsu._class('Pair',this,self,Pair,Pair$class);function Pair(){return __rsu._construct(this,'Pair',Pair$class,arguments.callee,arguments);};function Pair$class(a,b){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Pair$ctor(){
    self[0] = self._1 = self.key = a
    self[1] = self._2 = self.value = b
    self.length = 2
    self.isPair = true
  }).apply(this,[])}}
  
  __rsu._object('List',this,self,List,List$object);function List(){if(typeof(List$class) == 'undefined') return List.$apply.apply(null,arguments);return __rsu._construct(this,'List',List$class,arguments.callee,arguments);};function List$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function List$object$ctor(){
    __rsu._method('fromArray',this,self,false,function(array){return ( List.apply(null,array || []) )});
    
    __rsu._method('unapply',this,self,false,function(list,wildcard,extractor){
      /*convert arrays into lists*/
      if(Seq.isArrayLike(list)) list = fromArray(list)
      
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
  
  __rsu._object('Seq',this,self,Seq,Seq$object);function Seq(){if(typeof(Seq$class) == 'undefined') return Seq.$apply.apply(null,arguments);return __rsu._construct(this,'Seq',Seq$class,arguments.callee,arguments);};function Seq$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Seq$object$ctor(){
    self.Break = {seqBreakObject:true}
    
    __rsu._method('mkStringArguments',this,self,false,(__rsu._partialFunction(
      function(_rs20113_){return Seq.unapply(_rs20113_,false,function(prefix,delim,suffix){return (isInstanceOf(prefix,String) && isInstanceOf(delim,String) && isInstanceOf(suffix,String))?function(){return ( {prefix:prefix,suffix:suffix,delim:delim})}:null})}
      ,function(_rs20114_){return Seq.unapply(_rs20114_,false,function(delim){return (isInstanceOf(delim,String))?function(){return ( {prefix:"",suffix:"",delim:delim})}:null})}
      ,function(_rs20115_){return Seq.unapply(_rs20115_,false,function(named){return (isInstanceOf(named,Object) && ("delim" in named ))?function(){return ( {prefix:named.prefix || "",suffix:named.suffix || "",delim:named.delim})}:null})} 
      ,function(_rs20116_){return Seq.unapply(_rs20116_,false,function(){return function(){return ( {prefix:"",suffix:"",delim:","})}})}
      ,function(_rs20117_){return Seq.unapply(_rs20117_,true,function(args){return function(){return ( error("invalid arguments: "+args.mkString(","))
    )}})})));
    
    __rsu._method('isArrayLike',this,self,false,function(value){
      if(value == null) return false
      if(typeOf(value) == Array) return true
      if(isArguments(value)) return true
      return false
    });
    
    __rsu._method('isArguments',this,self,false,function(value){return (
      !!(value && Object.prototype.hasOwnProperty.call(value, 'callee'))
    )});
    __rsu._method('fromArray',this,self,false,function(array){ return ArraySeq(array) });
    __rsu._method('fromString',this,self,false,function(value){ return StringSeq(value || "") });
    __rsu._method('unapply',this,self,false,function(seq,wildcard,extractor){
      /*convert arrays to Seq*/
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
  
  __rsu._object('Stack',this,self,Stack,Stack$object);function Stack(){if(typeof(Stack$class) == 'undefined') return Stack.$apply.apply(null,arguments);return __rsu._construct(this,'Stack',Stack$class,arguments.callee,arguments);};function Stack$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Stack$object$ctor(){
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
        return StringSeq("")
      /*assume the list is homogenous*/
      var isString = typeOf(results[0]) == String
      return (isString)?
                StringSeq(results.join("")):
                Seq.fromArray(results)
    });
    __rsu._method('toString',this,self,true,function(){return (source)});
    __rsu._method('size',this,self,false,function(){return (source.length)});
    
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
    
    __rsu._method('keys',this,self,false,function(){return map(function(_rs20118_){return (_rs20118_.key)})});
    __rsu._method('values',this,self,false,function(){return map(function(_rs20119_){return (_rs20119_.value)})});
    
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
  
  __rsu._object('Some',this,self,Some,Some$object);function Some(){if(typeof(Some$class) == 'undefined') return Some.$apply.apply(null,arguments);return __rsu._construct(this,'Some',Some$class,arguments.callee,arguments);};function Some$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Some$object$ctor(){
    __rsu._method('unapply',this,self,false,function(obj,wildcard,extractor){
      if(isInstanceOf(obj,Some) && extractor.length == 1 && wildcard == false)
        return extractor(obj.get())
      return null;
    });
  }).apply(this,[])}}
  
  __rsu._object('None',this,self,None,None$object);function None(){if(typeof(None$class) == 'undefined') return None.$apply.apply(null,arguments);return __rsu._construct(this,'None',None$class,arguments.callee,arguments);};function None$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Optional,Optional$class,[]);with(self){(function None$object$ctor(){
    __rsu._method('get',this,self,false,function(){error("No Such Element 'None.get'")});
    __rsu._method('toString',this,self,true,function(){return "None"});
    
    __rsu._method('unapply',this,self,false,function(obj,wildcard,extractor){
      if(obj == None && extractor.length == 0 && wildcard == false)
        return extractor();
      return null;
    });
  }).apply(this,[])}}
  
}).apply(this,[])}})
}).apply(__rescripted.script.root,[]);}}},true);
__rescripted.util._source(['rescripted.collections'],['rescripted.xml','rescripted.xml.dom'],function(){var self = this;var _rs790_ = {};with(this){with(_rs790_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;/*rescripted-settings:{"legacy":true,"immediate":true}*/

__rsu._import('rescripted.collections',rescripted.collections,'_',_rs790_)

/*http://james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/*/
var ie = (function(){
  var v = 3
  try{
    var div = document.createElement('div'), all = div.getElementsByTagName('i');
    while( div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0] );
    
  } catch(e) {}
  
  return ({version: (v > 4 ? v : 0) });
}());

__rsu._package('rescripted.xml',this,function(){var self = this;with(this){(function(){
  
  __rsu._class('XmlNode',this,self,XmlNode,XmlNode$class);function XmlNode(){return __rsu._construct(this,'XmlNode',XmlNode$class,arguments.callee,arguments);};function XmlNode$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function XmlNode$ctor(){}).apply(this,[])}}
  
  var emptyNode = (function(parent){ })
  
  function XmlChildren(value){
    
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
        return (ArraySeq(attributes).filter(function(_rs79111_){return (_rs79111_.name == name)}).headOrNull() || {value:null}).value;
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
      if(!attrs.exists(function(_rs79112_){return (_rs79112_.name == name)}))
        attrs.append({name:name,value:value})
      else
        attrs.filter(function(_rs79113_){return (_rs79113_.name == name)}).head().value = value
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
      var n = _self.nodeName 
      var elem = parent.ownerDocument.createElement(n)
      
      /*handle attributes*/
      for(var i=0;i<attributes.length;i++){
        var attr = attributes[i]
        if(attr.value != null){
          
          /*event helpers*/
          if(typeOf(attr.value) == Function)
            elem[attr.name] = attr.value
          else
            elem.setAttribute(attr.name,attr.value.toString())
          
          /*ie6/ie7 weirdness fixes*/
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
}).apply(this,[])}})

__rsu._package('rescripted.xml.dom',this,function(){var self = this;with(this){(function(){
  
  /*Returns true if it is a DOM node*/
  __rsu._method('IsDomNode',this,self,false,function(o){return (
    typeof Node === "object" ? o instanceof Node : 
    typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  )});
  
  /*Returns true if it is a DOM element    */
  __rsu._method('IsDomElement',this,self,false,function(o){return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : /*DOM2*/
    typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
  )});
    
  __rsu._method('XmlSetAttribute',this,self,false,function(elem,name,value){
    /*event helpers*/
    if(typeOf(value) == Function)
      elem[name] = value
    else
      elem.setAttribute(name,value.toString())
    
    /*ie6/ie7 weirdness fixes*/
    if(ie.version != 0 && ie.version <= 7){
      if(name == "class" && "className" in elem)
        elem.className = value
      if(name == "style" && "style" in elem && "setAttribute" in elem.style)
        elem.style.setAttribute('cssText', value, 0);
    }
    return elem;
  });
  
  __rsu._method('XmlGetAttribute',this,self,false,function(elem,name){
    if(ie.version != 0 && ie.version <= 7){
      if(name == "class")
        return elem.className
      if(name == "style" && "style" in elem && "getAttribute" in elem.style)
        return elem.style.getAttribute('cssText');
    }
    return elem.getAttribute(name)
  });
  
  __rsu._method('XmlResolveParent',this,self,false,function(parent){
    if(parent.jquery && parent.length > 0) parent = parent.get(0)
    if(parent.jquery && parent.length == 0) error("jquery parent passed to appendTo, but the jquery object had no elements");
    if(typeOf(parent) == String) parent = document.getElementById(parent)
    return parent
  });
  
  __rsu._method('XmlAppendChildren',this,self,false,function(elem,children){
    for(var i=0;i<children.length;i++){
      var child = XmlJavascriptFragment(children[i])
      if(child == null)
        continue;
      
      if(typeOf(child) == Array)
        XmlAppendChildren(elem,child)
      else
        elem.appendChild(child)
    }    
  });
  
  
  __rsu._method('XmlUnknownNodeType',this,self,false,function(type){return (document.createTextNode("XmlUnknownNodeType("+type+")"))});
  __rsu._method('XmlText',this,self,false,function(value){return (document.createTextNode(value))});
  __rsu._method('XmlComment',this,self,false,function(value){return (document.createComment(value))});
  __rsu._method('XmlCdata',this,self,false,function(value){
    try{ return document.createCDATASection(text) }
    catch(e) { return document.createTextNode(text) }
  });
  
  __rsu._method('XmlElement',this,self,false,function(tagName,attributes,children){
    var elem = document.createElement(tagName)
    for(var i=0;i<attributes.length;i++){
      var attr = attributes[i]
      if(attr.value != null)
        XmlSetAttribute(elem,attr.name,attr.value)
    }
    
    XmlAppendChildren(elem,children);
    
    return elem
  });
  
  
  __rsu._method('XmlJavascriptFragment',this,self,false,function(value){
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
  });

}).apply(this,[])}})
}).apply(__rescripted.script.root,[]);}}},true);
__rescripted.util._source(['rescripted.collections'],['rescripted.lang'],function(){var self = this;var _rs110_ = {};with(this){with(_rs110_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;/*rescripted-settings:{"legacy":true,"immediate":true}*/

__rsu._import('rescripted.collections',rescripted.collections,'_',_rs110_)

__rsu._package('rescripted.lang',this,function(){var self = this;with(this){(function(){
  
  __rsu._class('TokenParser',this,self,TokenParser,TokenParser$class);function TokenParser(){return __rsu._construct(this,'TokenParser',TokenParser$class,arguments.callee,arguments);};function TokenParser$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function TokenParser$ctor(){
    
    __rsu._object('NoOutput',this,self,NoOutput,NoOutput$object);function NoOutput(){if(typeof(NoOutput$class) == 'undefined') return NoOutput.$apply.apply(null,arguments);return __rsu._construct(this,'NoOutput',NoOutput$class,arguments.callee,arguments);};function NoOutput$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function NoOutput$object$ctor(){}).apply(this,[])}}
    
    __rsu._method('ReverseTokenSeq',this,self,false,function(tokens,start,end){
      start = start || 0
      end = end || tokens.length
      return ({
        tokens:tokens,
        start:start,
        end:end,
        reverse:(function(){return ( TokenSeq(tokens,start,end))}),
        toString:(function(){return ( Range(start,end).map(function(i){return (tokens[i])}).mkString(""))}),
        eof:(function(){return ( start >= end)}),
        rewind:(function(count){return ( ReverseTokenSeq(tokens,Math.min(end,start + Math.abs(count)),end))}),
        token:(function(n){return ( (start - n > 0)?tokens[start-n]:"")}),
        head:(function(){return ( start < end? tokens[start]:"")}),
        drop:(function(n){return ( ReverseTokenSeq(tokens,Math.max(start-n,0),end))}),
        cache:{}
      })      
    });
    __rsu._method('TokenSeq',this,self,false,function(tokens,start,end){
      start = start || 0
      end = end || tokens.length
      return ({
        tokens:tokens,
        start:start,
        end:end,
        reverse:(function(){return ( ReverseTokenSeq(tokens,start,end))}),
        toString:(function(){return ( Range(start,end).map(function(i){return (tokens[i])}).mkString(""))}),
        eof:(function(){return ( start >= end)}),
        rewind:(function(count){return ( TokenSeq(tokens,Math.max(0,start - Math.abs(count)),end))}),
        token:(function(n){return ( tokens[start+n])}),
        head:(function(){return ( start < end? tokens[start]:"")}),
        drop:(function(n){return ( TokenSeq(tokens,Math.min(start+n,end),end))}),
        cache:{}
      })
    });
    
      /*
      take:(n => TokenSeq(tokens,start,Math.min(start+n,end))),
      last:(=> tokens[end - 1]),
      dropWhile:{predicate =>
        var i = start
        while(predicate(tokens[i])) i++
        return TokenSeq(tokens,i,end)
      },
      takeWhile:{predicate =>
        var i=start
        while(predicate(tokens[i])) i++
        return TokenSeq(tokens,start,i)
      }
      */
    
    __rsu._method('runParser',this,self,false,function(parser,tokens){
      try{
        return parser(TokenSeq(tokens));
      } catch(e) {
        if(e.parseResult) {
          return e;
        } else {
          throw e;
        }
      }
    });
    
    __rsu._method('parseFailure',this,self,false,function(input,position,reason,parentFailure){
      var result = {parseResult:true,input:input,position:position,reason:reason,parentFailure:parentFailure,success:false,failureToken:(function(){return ( input.token(position) )}),map:(function(){return ( result)}),toString:(function(){return ( "parseFailure("+position+","+reason+")")})}
      return result
    });
    __rsu._method('parseSuccess',this,self,false,function(remainder,output){return (
      {parseResult:true,remainder:remainder,output:output,success:true,map:(function(func){return ( parseSuccess(remainder,func(output)) )}),toString:(function(){return ( "parseSuccess("+output+")")})}
    )});
    
    __rsu._method('toParser',this,self,false,function(parser){
      if(parser instanceof RegExp)
        return regex(parser)
      else if(typeof(parser) == "string")
        return token(parser)
      else if(Seq.isArrayLike(parser))
        return from(parser).map(toParser).toArray()
      else
        return parser
    });
    
    __rsu._method('memoize',this,self,false,function(parser){
      if(parser.memoized)
        return parser
      var memoized = (function(input){
        if(input.cache[parser.parserId] == null)
          input.cache[parser.parserId] = parser(input)
        return input.cache[parser.parserId]
      })
      memoized.memoized = true
      createParser(memoized)
      return memoized;
    });
    
    __rsu._method('createParser',this,self,false,function(parser){
      parser.map = (function(func){return ( describe(parser.description)(function(input){return ( parser(input).map(func))}) )})
      parser.mapTo = (function(constructor){return ( parser.map(function(ast){return ( constructor.apply(null,ast))}))})
      parser.debug = (function(label){return ( parser.map(function(x){return ( (println(label+": "+x),x))}) )})
      parser.debugFailure = (function(label){return ( parser.onFailure(function(result){return ( println(label+": "+result))}))})
      parser.butnot = (function(parser2){return ( butnot(parser,parser2))})
      parser.run = (function(tokens){return ( runParser(parser,tokens))})
      parser.memoize = (function(){return ( memoize(parser))})
      parser.leftRecursive = (function(){return ( leftRecursive(parser) )})
      parser.reverse = (function(){return ( describe(parser.description)(function(input){return ( parser(input.reverse()))}))})
      parser.onFailure = (function(func){return ( describe(parser.description)(function(input){
          var result = parser(input);
          if(!result.success) func(result);
          return result;
        })
      )})
      parser.describe = (function(desc){return ( (parser.description = desc,parser))})
    });
    
    var parserId = 0
    __rsu._method('describe',this,self,false,function(description){return ((function(parser){
      parser.parserId = parserId++
      parser.description = description
      createParser(parser)
      return memoize(parser)
      /*return parser*/
    }))});

    /*token matchers*/
    __rsu._method('token',this,self,false,function(s){return (describe("token '"+s+"'")(function(input){return (
                      input.head() == s?
                        parseSuccess(input.drop(1),s):
                        parseFailure(input,0,"found: '"+input.head()+"' expected: '"+s+"'")
                   )}))});
    
    __rsu._method('startsWith',this,self,false,function(s){return (describe("starts with '"+s+"'")(function(input){return (
                          input.head().indexOf(s) == 0?
                            parseSuccess(input.drop(1),input.head()):
                            parseFailure(input,0,"found: '"+input.head()+"' expected it to start with: '"+s+"'")
                        )}))});
    
    __rsu._method('startsWithAny',this,self,false,function(){
      var parsers = from(arguments).map(startsWith).toArray()
      return choice.apply(null,parsers)
    });
    
    __rsu._method('regex',this,self,false,function(r,desc){return (describe(desc || r)(function(input){return (
                          r.test(input.head())?
                            parseSuccess(input.drop(1),input.head()):
                            parseFailure(input,0,"regex failure:"+input.head()+" did not match: RegExp("+r+")")
                        )}))});
    
    /*sequences*/
    __rsu._method('sequence',this,self,false,function(){
      var parsers = toParser(arguments);
      return arrayParser(describe("seq[\n"+from(parsers).map(function(_rs11152_){return (_rs11152_.description)}).mkString("\n")+"\n]")(function(input){
        var remainder = input
        var output = []
        for(var i=0;i<parsers.length;i++){
          var parser = parsers[i];
          var result = parser(remainder)
          if(result.success){
            if(result.output != NoOutput)
              output.push(result.output)
            remainder = result.remainder
          } else {
            return parseFailure(input,remainder.start - input.start,"sequence failure: "+result.reason,result)
          }
        }
        return parseSuccess(remainder,output)
      }))
    });
    
    __rsu._method('required',this,self,false,function(){
      var parser = arrayParser(sequence.apply(null,arguments).onFailure(function(result){
        if(parser.description != null)
          result.parentFailure.reason = parser.description + " " + result.parentFailure.reason
        throw result.parentFailure
      }))
      return parser;
    });
    
    __rsu._method('arrayParser',this,self,false,function(parser){
      var flatten = (function(item){
        if(!(item instanceof Array))
          return item;
        var result = []
        for(var i=0;i<item.length;i++)
          result = result.concat(flatten(item[i]))
        return result
      })
      parser.join = (function(sep){return ( parser.map(function(input){return ( flatten(input).join(sep || ""))}))})
      parser.flatten = (function(){return ( parser.map(flatten))})
      parser.mapHead = (function(){return ( parser.map(function(_rs11153_){return (_rs11153_[0])}))})
      return parser
    });
    
    __rsu._method('charseq',this,self,false,function(chars){return (sequence.apply(null,chars.split("")))});
    
    __rsu._method('repeat',this,self,false,function(n,p){
      var parser = toParser(p);
      return arrayParser(describe("repeat "+n+": "+parser.description)(function(input){
        var remainder = input
        var output = []
        var result = null
        var count = 0
        while( true ){
          if(remainder.eof())
            break;
          
          result = parser(remainder)
          if(!result.success)
            break;
          
          if(result.output != NoOutput)
            output.push(result.output)
          remainder = result.remainder
          count++;
        }
        if(count >= n)
          return parseSuccess(remainder,output)
        
        if(remainder.eof())
          return parseFailure(remainder,0,"expected "+n+" occurances and found "+count+" then hit eof while parsing: "+parser.description)
        
        return parseFailure(result.input,result.position,"expected "+n+" occurances and found "+count+": "+result.reason)
      }))
    });

    __rsu._method('list',this,self,false,function(parser,delimiter){return ( sequence(parser,repeat(0,sequence(expect(delimiter),parser).mapHead())).map(function(values){return ( [values[0]].concat(values[1]))}) )});
    
    /*misc*/
    __rsu._method('expect',this,self,false,function(p){
      var parser = toParser(p)
      return describe(p.description)(function(input){
        var result = parser(input)
        if(result.success)
          return parseSuccess(result.remainder,NoOutput)
        return result
      })
    });
    
    __rsu._method('optional',this,self,false,function(p){
      var parser = toParser(p)
      return describe("["+parser.description+"]")(function(input){       
        var result = parser(input)
        return result.success? result.map(Option) : parseSuccess(input,None)
      })
    });
    
    __rsu._method('choice',this,self,false,function(){
      var parsers = toParser(arguments);
      return describe("choices: "+from(parsers).map(function(_rs11154_){return (_rs11154_.description)}).mkString(",")+"")(function(input){
        for(var i=0;i<parsers.length;i++){
          var parser = parsers[i];
          var result = parser(input)
          if(result.success)
            return result
        }
        return parseFailure(input,0,arguments.callee.description)
      })
    });
    
    __rsu._method('negate',this,self,false,function(p){
      var parser = toParser(p)
      return describe("not: "+parser.description)(function(input){return ( parser(input).success? parseFailure(input,0,"negate failure") : parseSuccess(input.drop(1),input.head()) )})
    });
    
    __rsu._method('butnot',this,self,false,function(parserA,parserB){
      parserA = toParser(parserA)
      parserB = toParser(parserB)
      return describe(parserA.description+" but not "+parserB.description)(function(input){
        var b = parserB(input)
        if(!b.success){
          return parserA(input)
        } else {
          var a = parserA(input)
          if(a.success){
            if(a.remainder.start > b.remainder.start){
              return a
            } else {
              return parseFailure(input,0,"but not 1 ...")
            }
          } else {
            /*respond with a's failure object*/
            return a
          }
        }
      })
    });
    
    __rsu._method('eof',this,self,false,function(p){
      var parser = toParser(p)
      return describe("eof")(function(input){
        var result = parser(input)
        if(!result.success)
          return result
        
        if(result.remainder.start == result.remainder.end)
          return result
        
        return parseFailure(result.remainder,0,"unexpected token: '"+result.remainder.head()+"'")
      })
    });
    
    __rsu._method('leftRecursive',this,self,false,function(p){
      var parser = toParser(p)
      var callStack = [];
      return describe(parser.description)(function(input){
        if(callStack.length > 0 && callStack[callStack.length-1] == input.start){
          /*println("stopping left recursion:"+input.start+" head:"+input.head()+" callstack: "+callStack)*/
          return parseFailure(input,0,"not allowed to left recurse: "+parser.description)
        }
        callStack.push(input.start);
        var result = parser(input)
        callStack.pop();
        return result
      })
    });
    
    __rsu._method('precedence',this,self,false,function(term){
      return (function(){
        var parsers = from(arguments).reverse().map(toParser).toArray()
        var combine = (function(level){
          if(level > parsers.length - 1)
            return term
          else
            return chainl(combine(level+1),parsers[level])
        })
        return combine(0)
      })
    });
    
    __rsu._method('chainl',this,self,false,function(p, s){
      var parser = toParser(p);
      var sep = toParser(s);
      
      var foldl = (function(f, initial, seq){
                    for(var i=0; i< seq.length; ++i)
                      initial = f(initial, seq[i]);
                    return initial;
                  })
      
      return sequence(parser, repeat(0,sequence(sep, parser))).map(function(ast){return ( foldl((function(v,action){return ( action[0](v, action[1]) )}), ast[0], ast[1]) )})
    });
    
    
    /*lookahead parsers*/
    __rsu._method('and',this,self,false,function(p){
      var parser = toParser(p);
      return describe("and: "+parser.description)(function(input){return ( parser(input).success? parseSuccess(input,NoOutput):parseFailure(input,0,"expected to find "+p) )})
    });
    
    __rsu._method('not',this,self,false,function(p){
      var parser = toParser(p);
      return describe("not: "+parser.description)(function(input){return ( !parser(input).success? parseSuccess(input,NoOutput):parseFailure(input,0,"expected to not find "+p) )})
    });
    
    __rsu._method('andthen',this,self,false,function(p1,func){
           
      var parser = toParser(p1)
            
      return describe("and then:"+parser.description)(function(input){
          var p = parser(input)
          if(p.success){
            var nextParser = toParser(func(p.output))
            /*println(p.remainder)*/
            if(nextParser){
              var nextResult = nextParser(p.remainder)
              if(nextResult.success) 
                return parseSuccess(nextResult.remainder,[p.output, nextResult.output])
              else
                return parseFailure(p.remainder,0,"then part of andthen fail: "+nextParser)
            } else {
             return parseFailure(p.remainder,0,"no then parser") 
            }
          } else {
            return parseFailure(input,0,"and then fail: "+p) 
          }
          
      })
    });
    
    /*lookbehind*/
    __rsu._method('lookbehind',this,self,false,function(p,count){
      var parser = toParser(p);
      count = count || 1
      return describe(parser.description)(function(input){return ( parser(input.rewind(count)) )})
    });
    
    /*capture an ast, and possibly add a require branch*/
    __rsu._class('Node',this,self,Node,Node$class);function Node(){return __rsu._construct(this,'Node',Node$class,arguments.callee,arguments);};function Node$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Node$ctor(){
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      describe(self.nodeName.split(/([A-Z][a-z]*)/g).join(" "))(self)
      __rsu._method('parse',this,self,false,function(parser){return (self.parser = parser)});
      __rsu._method('apply',this,self,false,function(input){return (self.parser(input).map(output))});
      
      __rsu._method('output',this,self,false,function(result){
        result.nodeName = self.nodeName
        var oldToString = result.toString
        result.toString = (function(){return ( self.nodeName+"("+oldToString.apply(result)+")" )})
        return result
      });
      
      __rsu._method('unapply',this,self,false,function(node,wildcard,extractor){
        if(node.nodeName != self.nodeName) return null
          
        if(Seq.isArrayLike(node) || isInstanceOf(node,Seq))
          return Seq.unapply(node,wildcard,extractor)
        
        if(wildcard) error("wild card node extractor only works with sequences")
          
        return extractor(node)
      });
    }).apply(this,[])}}
    
    
    var actualRequired = required;
    __rsu._class('AstParser',this,self,AstParser,AstParser$class);function AstParser(){return __rsu._construct(this,'AstParser',AstParser$class,arguments.callee,arguments);};function AstParser$class(astType){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function AstParser$ctor(){
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      self.description = self.nodeName.split(/([A-Z][a-z]*)/g).join(" ");
      describe(self.description)(self)
      __rsu._method('required',this,self,false,function(){
        var parser = actualRequired.apply(null,arguments)
        parser.description = self.description + ": " + parser.description
        return parser;
      });
      
      __rsu._method('parse',this,self,false,function(parser){return (self.parser = parser.mapTo(astType))});
      __rsu._method('apply',this,self,false,function(input){return (self.parser(input))});
    }).apply(this,[])}}
    
    /*prevent need for forward declaration*/
    __rsu._class('Parser',this,self,Parser,Parser$class);function Parser(){return __rsu._construct(this,'Parser',Parser$class,arguments.callee,arguments);};function Parser$class(parser){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function Parser$ctor(){
      self.parser=parser;
      self.nodeName = self.__rescriptedClassName.substring(0,self.__rescriptedClassName.length - 1)
      describe(self.nodeName.split(/([A-Z][a-z]*)/g).join(" "))(self)
      __rsu._method('parse',this,self,false,function(parser){return (self.parser = parser)});
      __rsu._method('apply',this,self,false,function(input){return (self.parser(input))});
    }).apply(this,[])}}
    
    
  }).apply(this,[])}}

}).apply(this,[])}})
}).apply(__rescripted.script.root,[]);}}},true);
__rescripted.util._source([],['rescripted.lang'],function(){var self = this;var _rs740_ = {};with(this){with(_rs740_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;__rsu._package('rescripted.lang',this,function(){var self = this;with(this){(function(){__rsu._object('Ast',this,self,Ast,Ast$object);
function Ast(){if(typeof(Ast$class) == 'undefined') return Ast.$apply.apply(null,arguments);return __rsu._construct(this,'Ast',Ast$class,arguments.callee,arguments);};
function Ast$object(){var self = __rsu._self(this);
var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);
with(self){(function Ast$object$ctor(){__rsu._caseClass('TripleQuotedString',this,self,TripleQuotedString,TripleQuotedString$class);
function TripleQuotedString(){return __rsu._construct(this,'TripleQuotedString',TripleQuotedString$class,arguments.callee,arguments);};
function TripleQuotedString$class(str){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['TripleQuotedString',"str",[str]]);
with(self){(function TripleQuotedString$ctor(){}).apply(this,[])}
};
__rsu._caseClass('DoubleQuotedString',this,self,DoubleQuotedString,DoubleQuotedString$class);
function DoubleQuotedString(){return __rsu._construct(this,'DoubleQuotedString',DoubleQuotedString$class,arguments.callee,arguments);};
function DoubleQuotedString$class(str){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['DoubleQuotedString',"str",[str]]);
with(self){(function DoubleQuotedString$ctor(){}).apply(this,[])}
};
__rsu._caseClass('SingleQuotedString',this,self,SingleQuotedString,SingleQuotedString$class);
function SingleQuotedString(){return __rsu._construct(this,'SingleQuotedString',SingleQuotedString$class,arguments.callee,arguments);};
function SingleQuotedString$class(str){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['SingleQuotedString',"str",[str]]);
with(self){(function SingleQuotedString$ctor(){}).apply(this,[])}
};
__rsu._caseClass('NumberLiteral',this,self,NumberLiteral,NumberLiteral$class);
function NumberLiteral(){return __rsu._construct(this,'NumberLiteral',NumberLiteral$class,arguments.callee,arguments);};
function NumberLiteral$class(value){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['NumberLiteral',"value",[value]]);
with(self){(function NumberLiteral$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ArrayLiteral',this,self,ArrayLiteral,ArrayLiteral$class);
function ArrayLiteral(){return __rsu._construct(this,'ArrayLiteral',ArrayLiteral$class,arguments.callee,arguments);};
function ArrayLiteral$class(exprs){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ArrayLiteral',"exprs",[exprs]]);
with(self){(function ArrayLiteral$ctor(){}).apply(this,[])}
};
__rsu._caseClass('JsonKeyValue',this,self,JsonKeyValue,JsonKeyValue$class);
function JsonKeyValue(){return __rsu._construct(this,'JsonKeyValue',JsonKeyValue$class,arguments.callee,arguments);};
function JsonKeyValue$class(id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['JsonKeyValue',"id,expr",[id,expr]]);
with(self){(function JsonKeyValue$ctor(){}).apply(this,[])}
};
__rsu._caseClass('JsonLiteral',this,self,JsonLiteral,JsonLiteral$class);
function JsonLiteral(){return __rsu._construct(this,'JsonLiteral',JsonLiteral$class,arguments.callee,arguments);};
function JsonLiteral$class(jsonKeyValuePairs){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['JsonLiteral',"jsonKeyValuePairs",[jsonKeyValuePairs]]);
with(self){(function JsonLiteral$ctor(){}).apply(this,[])}
};
__rsu._caseClass('SimpleId',this,self,SimpleId,SimpleId$class);
function SimpleId(){return __rsu._construct(this,'SimpleId',SimpleId$class,arguments.callee,arguments);};
function SimpleId$class(id){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['SimpleId',"id",[id]]);
with(self){(function SimpleId$ctor(){}).apply(this,[])}
};
__rsu._caseClass('QualifiedId',this,self,QualifiedId,QualifiedId$class);
function QualifiedId(){return __rsu._construct(this,'QualifiedId',QualifiedId$class,arguments.callee,arguments);};
function QualifiedId$class(id){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['QualifiedId',"id",[id]]);
with(self){(function QualifiedId$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlLiteral',this,self,XmlLiteral,XmlLiteral$class);
function XmlLiteral(){return __rsu._construct(this,'XmlLiteral',XmlLiteral$class,arguments.callee,arguments);};
function XmlLiteral$class(node){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlLiteral',"node",[node]]);
with(self){(function XmlLiteral$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlText',this,self,XmlText,XmlText$class);
function XmlText(){return __rsu._construct(this,'XmlText',XmlText$class,arguments.callee,arguments);};
function XmlText$class(text){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlText',"text",[text]]);
with(self){(function XmlText$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlComment',this,self,XmlComment,XmlComment$class);
function XmlComment(){return __rsu._construct(this,'XmlComment',XmlComment$class,arguments.callee,arguments);};
function XmlComment$class(text){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlComment',"text",[text]]);
with(self){(function XmlComment$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlCData',this,self,XmlCData,XmlCData$class);
function XmlCData(){return __rsu._construct(this,'XmlCData',XmlCData$class,arguments.callee,arguments);};
function XmlCData$class(text){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlCData',"text",[text]]);
with(self){(function XmlCData$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlRescriptedFragment',this,self,XmlRescriptedFragment,XmlRescriptedFragment$class);
function XmlRescriptedFragment(){return __rsu._construct(this,'XmlRescriptedFragment',XmlRescriptedFragment$class,arguments.callee,arguments);};
function XmlRescriptedFragment$class(expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlRescriptedFragment',"expr",[expr]]);
with(self){(function XmlRescriptedFragment$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlStartEndTag',this,self,XmlStartEndTag,XmlStartEndTag$class);
function XmlStartEndTag(){return __rsu._construct(this,'XmlStartEndTag',XmlStartEndTag$class,arguments.callee,arguments);};
function XmlStartEndTag$class(nameAndAttrs,bodySeq){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlStartEndTag',"nameAndAttrs,bodySeq",[nameAndAttrs,bodySeq]]);
with(self){(function XmlStartEndTag$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlEmptyElementTag',this,self,XmlEmptyElementTag,XmlEmptyElementTag$class);
function XmlEmptyElementTag(){return __rsu._construct(this,'XmlEmptyElementTag',XmlEmptyElementTag$class,arguments.callee,arguments);};
function XmlEmptyElementTag$class(tagName,attributes){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlEmptyElementTag',"tagName,attributes",[tagName,attributes]]);
with(self){(function XmlEmptyElementTag$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlAttribute',this,self,XmlAttribute,XmlAttribute$class);
function XmlAttribute(){return __rsu._construct(this,'XmlAttribute',XmlAttribute$class,arguments.callee,arguments);};
function XmlAttribute$class(name,value){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlAttribute',"name,value",[name,value]]);
with(self){(function XmlAttribute$ctor(){}).apply(this,[])}
};
__rsu._caseClass('XmlEntityReference',this,self,XmlEntityReference,XmlEntityReference$class);
function XmlEntityReference(){return __rsu._construct(this,'XmlEntityReference',XmlEntityReference$class,arguments.callee,arguments);};
function XmlEntityReference$class(name){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['XmlEntityReference',"name",[name]]);
with(self){(function XmlEntityReference$ctor(){}).apply(this,[])}
};
__rsu._caseClass('CaseLiteralPattern',this,self,CaseLiteralPattern,CaseLiteralPattern$class);
function CaseLiteralPattern(){return __rsu._construct(this,'CaseLiteralPattern',CaseLiteralPattern$class,arguments.callee,arguments);};
function CaseLiteralPattern$class(literal){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['CaseLiteralPattern',"literal",[literal]]);
with(self){(function CaseLiteralPattern$ctor(){}).apply(this,[])}
};
__rsu._caseClass('CaseStatement',this,self,CaseStatement,CaseStatement$class);
function CaseStatement(){return __rsu._construct(this,'CaseStatement',CaseStatement$class,arguments.callee,arguments);};
function CaseStatement$class(pattern,optGuard,statementList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['CaseStatement',"pattern,optGuard,statementList",[pattern,optGuard,statementList]]);
with(self){(function CaseStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('PartialFunction',this,self,PartialFunction,PartialFunction$class);
function PartialFunction(){return __rsu._construct(this,'PartialFunction',PartialFunction$class,arguments.callee,arguments);};
function PartialFunction$class(caseStatements){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['PartialFunction',"caseStatements",[caseStatements]]);
with(self){(function PartialFunction$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ArgumentDeclaration',this,self,ArgumentDeclaration,ArgumentDeclaration$class);
function ArgumentDeclaration(){return __rsu._construct(this,'ArgumentDeclaration',ArgumentDeclaration$class,arguments.callee,arguments);};
function ArgumentDeclaration$class(id,optType,optDefaultValue){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ArgumentDeclaration',"id,optType,optDefaultValue",[id,optType,optDefaultValue]]);
with(self){(function ArgumentDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('LambdaExpression',this,self,LambdaExpression,LambdaExpression$class);
function LambdaExpression(){return __rsu._construct(this,'LambdaExpression',LambdaExpression$class,arguments.callee,arguments);};
function LambdaExpression$class(arguments,optExpression){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['LambdaExpression',"arguments,optExpression",[arguments,optExpression]]);
with(self){(function LambdaExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('MethodDeclaration',this,self,MethodDeclaration,MethodDeclaration$class);
function MethodDeclaration(){return __rsu._construct(this,'MethodDeclaration',MethodDeclaration$class,arguments.callee,arguments);};
function MethodDeclaration$class(annotations,modifiers,id,optArgs,body){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['MethodDeclaration',"annotations,modifiers,id,optArgs,body",[annotations,modifiers,id,optArgs,body]]);
with(self){(function MethodDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ExpressionChain',this,self,ExpressionChain,ExpressionChain$class);
function ExpressionChain(){return __rsu._construct(this,'ExpressionChain',ExpressionChain$class,arguments.callee,arguments);};
function ExpressionChain$class(chainedItems){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ExpressionChain',"chainedItems",[chainedItems]]);
with(self){(function ExpressionChain$ctor(){}).apply(this,[])}
};
__rsu._caseClass('SimpleExpression',this,self,SimpleExpression,SimpleExpression$class);
function SimpleExpression(){return __rsu._construct(this,'SimpleExpression',SimpleExpression$class,arguments.callee,arguments);};
function SimpleExpression$class(expr,exprChain){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['SimpleExpression',"expr,exprChain",[expr,exprChain]]);
with(self){(function SimpleExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('BinaryOperation',this,self,BinaryOperation,BinaryOperation$class);
function BinaryOperation(){return __rsu._construct(this,'BinaryOperation',BinaryOperation$class,arguments.callee,arguments);};
function BinaryOperation$class(exprA,op,exprB){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['BinaryOperation',"exprA,op,exprB",[exprA,op,exprB]]);
with(self){(function BinaryOperation$ctor(){}).apply(this,[])}
};
__rsu._caseClass('UnaryOperation',this,self,UnaryOperation,UnaryOperation$class);
function UnaryOperation(){return __rsu._construct(this,'UnaryOperation',UnaryOperation$class,arguments.callee,arguments);};
function UnaryOperation$class(unaryOperator,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['UnaryOperation',"unaryOperator,expr",[unaryOperator,expr]]);
with(self){(function UnaryOperation$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ForComprehension',this,self,ForComprehension,ForComprehension$class);
function ForComprehension(){return __rsu._construct(this,'ForComprehension',ForComprehension$class,arguments.callee,arguments);};
function ForComprehension$class(forInStatements,forGuards,optYield,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ForComprehension',"forInStatements,forGuards,optYield,expr",[forInStatements,forGuards,optYield,expr]]);
with(self){(function ForComprehension$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ForInStatement',this,self,ForInStatement,ForInStatement$class);
function ForInStatement(){return __rsu._construct(this,'ForInStatement',ForInStatement$class,arguments.callee,arguments);};
function ForInStatement$class(id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ForInStatement',"id,expr",[id,expr]]);
with(self){(function ForInStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ForGuard',this,self,ForGuard,ForGuard$class);
function ForGuard(){return __rsu._construct(this,'ForGuard',ForGuard$class,arguments.callee,arguments);};
function ForGuard$class(expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ForGuard',"expr",[expr]]);
with(self){(function ForGuard$ctor(){}).apply(this,[])}
};
__rsu._caseClass('WhileExpression',this,self,WhileExpression,WhileExpression$class);
function WhileExpression(){return __rsu._construct(this,'WhileExpression',WhileExpression$class,arguments.callee,arguments);};
function WhileExpression$class(clauseExpr,bodyExpr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['WhileExpression',"clauseExpr,bodyExpr",[clauseExpr,bodyExpr]]);
with(self){(function WhileExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('DoWhileExpression',this,self,DoWhileExpression,DoWhileExpression$class);
function DoWhileExpression(){return __rsu._construct(this,'DoWhileExpression',DoWhileExpression$class,arguments.callee,arguments);};
function DoWhileExpression$class(bodyExpr,clauseExpr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['DoWhileExpression',"bodyExpr,clauseExpr",[bodyExpr,clauseExpr]]);
with(self){(function DoWhileExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('EmptyBlockExpression',this,self,EmptyBlockExpression,EmptyBlockExpression$class);
function EmptyBlockExpression(){return __rsu._construct(this,'EmptyBlockExpression',EmptyBlockExpression$class,arguments.callee,arguments);};
function EmptyBlockExpression$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['EmptyBlockExpression',"",[]]);
with(self){(function EmptyBlockExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('Annotation',this,self,Annotation,Annotation$class);
function Annotation(){return __rsu._construct(this,'Annotation',Annotation$class,arguments.callee,arguments);};
function Annotation$class(id,optArgs){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['Annotation',"id,optArgs",[id,optArgs]]);
with(self){(function Annotation$ctor(){}).apply(this,[])}
};
__rsu._caseClass('NewStatement',this,self,NewStatement,NewStatement$class);
function NewStatement(){return __rsu._construct(this,'NewStatement',NewStatement$class,arguments.callee,arguments);};
function NewStatement$class(id,optArguments){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['NewStatement',"id,optArguments",[id,optArguments]]);
with(self){(function NewStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ClassDeclaration',this,self,ClassDeclaration,ClassDeclaration$class);
function ClassDeclaration(){return __rsu._construct(this,'ClassDeclaration',ClassDeclaration$class,arguments.callee,arguments);};
function ClassDeclaration$class(id,optArgsList,optExtendsClause,optClassBody){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ClassDeclaration',"id,optArgsList,optExtendsClause,optClassBody",[id,optArgsList,optExtendsClause,optClassBody]]);
with(self){(function ClassDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('CaseClassDeclaration',this,self,CaseClassDeclaration,CaseClassDeclaration$class);
function CaseClassDeclaration(){return __rsu._construct(this,'CaseClassDeclaration',CaseClassDeclaration$class,arguments.callee,arguments);};
function CaseClassDeclaration$class(id,optArgsList,optExtendsClause,optClassBody){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['CaseClassDeclaration',"id,optArgsList,optExtendsClause,optClassBody",[id,optArgsList,optExtendsClause,optClassBody]]);
with(self){(function CaseClassDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ObjectDeclaration',this,self,ObjectDeclaration,ObjectDeclaration$class);
function ObjectDeclaration(){return __rsu._construct(this,'ObjectDeclaration',ObjectDeclaration$class,arguments.callee,arguments);};
function ObjectDeclaration$class(id,optExtends,optBody){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ObjectDeclaration',"id,optExtends,optBody",[id,optExtends,optBody]]);
with(self){(function ObjectDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('CaseObjectDeclaration',this,self,CaseObjectDeclaration,CaseObjectDeclaration$class);
function CaseObjectDeclaration(){return __rsu._construct(this,'CaseObjectDeclaration',CaseObjectDeclaration$class,arguments.callee,arguments);};
function CaseObjectDeclaration$class(id,optExtends,optBody){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['CaseObjectDeclaration',"id,optExtends,optBody",[id,optExtends,optBody]]);
with(self){(function CaseObjectDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('TraitDeclaration',this,self,TraitDeclaration,TraitDeclaration$class);
function TraitDeclaration(){return __rsu._construct(this,'TraitDeclaration',TraitDeclaration$class,arguments.callee,arguments);};
function TraitDeclaration$class(id,optExtends,optBody){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['TraitDeclaration',"id,optExtends,optBody",[id,optExtends,optBody]]);
with(self){(function TraitDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ExtendsClause',this,self,ExtendsClause,ExtendsClause$class);
function ExtendsClause(){return __rsu._construct(this,'ExtendsClause',ExtendsClause$class,arguments.callee,arguments);};
function ExtendsClause$class(id,optArgsList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ExtendsClause',"id,optArgsList",[id,optArgsList]]);
with(self){(function ExtendsClause$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ClassBody',this,self,ClassBody,ClassBody$class);
function ClassBody(){return __rsu._construct(this,'ClassBody',ClassBody$class,arguments.callee,arguments);};
function ClassBody$class(id,statementList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ClassBody',"id,statementList",[id,statementList]]);
with(self){(function ClassBody$ctor(){}).apply(this,[])}
};
__rsu._caseClass('IfExpression',this,self,IfExpression,IfExpression$class);
function IfExpression(){return __rsu._construct(this,'IfExpression',IfExpression$class,arguments.callee,arguments);};
function IfExpression$class(clause,expr,optElseExpression){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['IfExpression',"clause,expr,optElseExpression",[clause,expr,optElseExpression]]);
with(self){(function IfExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ElseExpression',this,self,ElseExpression,ElseExpression$class);
function ElseExpression(){return __rsu._construct(this,'ElseExpression',ElseExpression$class,arguments.callee,arguments);};
function ElseExpression$class(expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ElseExpression',"expr",[expr]]);
with(self){(function ElseExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ValDeclaration',this,self,ValDeclaration,ValDeclaration$class);
function ValDeclaration(){return __rsu._construct(this,'ValDeclaration',ValDeclaration$class,arguments.callee,arguments);};
function ValDeclaration$class(id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ValDeclaration',"id,expr",[id,expr]]);
with(self){(function ValDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('VarDeclaration',this,self,VarDeclaration,VarDeclaration$class);
function VarDeclaration(){return __rsu._construct(this,'VarDeclaration',VarDeclaration$class,arguments.callee,arguments);};
function VarDeclaration$class(id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['VarDeclaration',"id,expr",[id,expr]]);
with(self){(function VarDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('MemberValDeclaration',this,self,MemberValDeclaration,MemberValDeclaration$class);
function MemberValDeclaration(){return __rsu._construct(this,'MemberValDeclaration',MemberValDeclaration$class,arguments.callee,arguments);};
function MemberValDeclaration$class(annotations,modifiers,id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['MemberValDeclaration',"annotations,modifiers,id,expr",[annotations,modifiers,id,expr]]);
with(self){(function MemberValDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('MemberVarDeclaration',this,self,MemberVarDeclaration,MemberVarDeclaration$class);
function MemberVarDeclaration(){return __rsu._construct(this,'MemberVarDeclaration',MemberVarDeclaration$class,arguments.callee,arguments);};
function MemberVarDeclaration$class(annotations,modifiers,id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['MemberVarDeclaration',"annotations,modifiers,id,expr",[annotations,modifiers,id,expr]]);
with(self){(function MemberVarDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('AssignmentStatement',this,self,AssignmentStatement,AssignmentStatement$class);
function AssignmentStatement(){return __rsu._construct(this,'AssignmentStatement',AssignmentStatement$class,arguments.callee,arguments);};
function AssignmentStatement$class(id,expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['AssignmentStatement',"id,expr",[id,expr]]);
with(self){(function AssignmentStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('BlockExpression',this,self,BlockExpression,BlockExpression$class);
function BlockExpression(){return __rsu._construct(this,'BlockExpression',BlockExpression$class,arguments.callee,arguments);};
function BlockExpression$class(statementList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['BlockExpression',"statementList",[statementList]]);
with(self){(function BlockExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('GroupExpression',this,self,GroupExpression,GroupExpression$class);
function GroupExpression(){return __rsu._construct(this,'GroupExpression',GroupExpression$class,arguments.callee,arguments);};
function GroupExpression$class(expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['GroupExpression',"expr",[expr]]);
with(self){(function GroupExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('TryExpression',this,self,TryExpression,TryExpression$class);
function TryExpression(){return __rsu._construct(this,'TryExpression',TryExpression$class,arguments.callee,arguments);};
function TryExpression$class(tryBody,optCatchExpr,optFinallyExpr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['TryExpression',"tryBody,optCatchExpr,optFinallyExpr",[tryBody,optCatchExpr,optFinallyExpr]]);
with(self){(function TryExpression$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ReturnStatement',this,self,ReturnStatement,ReturnStatement$class);
function ReturnStatement(){return __rsu._construct(this,'ReturnStatement',ReturnStatement$class,arguments.callee,arguments);};
function ReturnStatement$class(optExpr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ReturnStatement',"optExpr",[optExpr]]);
with(self){(function ReturnStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ThrowStatement',this,self,ThrowStatement,ThrowStatement$class);
function ThrowStatement(){return __rsu._construct(this,'ThrowStatement',ThrowStatement$class,arguments.callee,arguments);};
function ThrowStatement$class(expr){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ThrowStatement',"expr",[expr]]);
with(self){(function ThrowStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('DeleteStatement',this,self,DeleteStatement,DeleteStatement$class);
function DeleteStatement(){return __rsu._construct(this,'DeleteStatement',DeleteStatement$class,arguments.callee,arguments);};
function DeleteStatement$class(qualifiedId){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['DeleteStatement',"qualifiedId",[qualifiedId]]);
with(self){(function DeleteStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('ImportStatement',this,self,ImportStatement,ImportStatement$class);
function ImportStatement(){return __rsu._construct(this,'ImportStatement',ImportStatement$class,arguments.callee,arguments);};
function ImportStatement$class(idParts){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['ImportStatement',"idParts",[idParts]]);
with(self){(function ImportStatement$ctor(){}).apply(this,[])}
};
__rsu._caseClass('PackageDeclaration',this,self,PackageDeclaration,PackageDeclaration$class);
function PackageDeclaration(){return __rsu._construct(this,'PackageDeclaration',PackageDeclaration$class,arguments.callee,arguments);};
function PackageDeclaration$class(id,statementList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['PackageDeclaration',"id,statementList",[id,statementList]]);
with(self){(function PackageDeclaration$ctor(){}).apply(this,[])}
};
__rsu._caseClass('Program',this,self,Program,Program$class);
function Program(){return __rsu._construct(this,'Program',Program$class,arguments.callee,arguments);};
function Program$class(statementList){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['Program',"statementList",[statementList]]);
with(self){(function Program$ctor(){}).apply(this,[])}
};
}).apply(this,[])}
}}).apply(this,[])}})}).apply(__rescripted.script.root,[]);}}},true);
__rescripted.util._source(['rescripted.collections'],['rescripted.lang'],function(){var self = this;var _rs590_ = {};with(this){with(_rs590_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;/*rescripted-settings:{"legacy":true,"immediate":true}*/

__rsu._import('rescripted.collections',rescripted.collections,'_',_rs590_)

__rsu._package('rescripted.lang',this,function(){var self = this;with(this){(function(){

  /*
    upper ::= ‘A’ | ¢¢¢ | ‘Z’ | ‘$’ | ‘_’ and Unicode category Lu
    lower ::= ‘a’ | ¢¢¢ | ‘z’ and Unicode category Ll
    letter ::= upper | lower and Unicode categories Lo, Lt, Nl
    digit ::= ‘0’ | ¢¢¢ | ‘9’
    opchar ::= “all other characters in \u0020-007F and Unicode
    categories Sm, So except parentheses ([]) and periods”
    op ::= opchar {opchar}
    varid ::= lower idrest
    plainid ::= upper idrest
    | varid
    | op
    id ::= plainid
    | ‘\‘’ stringLit ‘\‘’
    idrest ::= {letter | digit} [‘_’ op
  */

/*  var arrayToSting = Array.prototype.toString*/
/*  Array.prototype.toString = (=> "["+arrayToSting.apply(this,[])+"]" )*/

  __rsu._class('RescriptedGrammar',this,self,RescriptedGrammar,RescriptedGrammar$class);function RescriptedGrammar(){return __rsu._construct(this,'RescriptedGrammar',RescriptedGrammar$class,arguments.callee,arguments);};function RescriptedGrammar$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,TokenParser,TokenParser$class,[]);with(self){(function RescriptedGrammar$ctor(){

    /*entry point*/
    __rsu._method('parse',this,self,false,function(code){
      var result = Program.run(tokenize(code))
      if(!result.success) {
        printLineInfo(lineInfo(result.input,result.position))
        /*var token = f.failureToken()*/
        /*println("Bad token: '"+token+"', Reason: "+f.reason)*/
        println(result.reason)
      }
      return result;
    });
    
    var operatorTokens = "<>=:!@#%^&*/\\-+_|~?"
    
    /*token handling*/
    var tokens = ["//","/*","*/","\\\"","\\\'","\\t","\\r","\\n","\\b",'"',"'","=>","<-","@_*"].concat("()[]{}.,;".split("")).concat(operatorTokens.split(""))
    var tokenizer = new RegExp("(\\n|[\\t ]+|"+from(tokens).map(RegExpEscape).mkString("|")+"|[0-9]+)")/*|["+RegExpEscape(operatorTokens)+"]+*/
    __rsu._method('tokenize',this,self,false,function(code){return ( Seq.fromArray(code.split(tokenizer)).filter(function(_rs59580_){return (_rs59580_!='')}).toArray() )});
    
    
    /*line handling*/
    __rsu._method('lineInfo',this,self,false,function(input,position){
      position = input.start + position
      var tokens = input.tokens
      var end = tokens.length;
      var lineNumber = 1;
      var lineStart = 0;
      for(var i=0;i < position;i++){
        if(tokens[i] == "\n"){
          lineNumber++
          lineStart = i
        }
      }
      
      var lineEnd = 0
      for(var i=position+1;i<end;i++){
        if(tokens[i] == "\n"){
          lineEnd = i;
          break;
        }
      }
      
      var line = Range(lineStart+1,lineEnd).map(function(i){return ( tokens[i])}).mkString("")
      var offset = Range(lineStart+1,position).map(function(i){return ( tokens[i])}).mkString("")
      return ({line:line,offset:offset.length,lineNumber:lineNumber})
    });
    
    __rsu._method('printLineInfo',this,self,false,function(info){
      println("error at: line "+info.lineNumber+", char "+info.offset)
      println(info.line)
      println(Range(0,info.offset).map(function(){return (" ")}).mkString("")+"^")
    });
    
    /*comments*/
    var singleLineComment = describe("single line comment")(sequence("//",repeat(0,negate("\n")),"\n"))
    var multiLineComment = describe("multi line comment")(sequence("/*",repeat(0,negate("*/")),"*/"))
    var comment = choice(singleLineComment,multiLineComment)
    
    /*semicolons*/
    __rsu._method('optsemi',this,self,false,function(p){return (sequence(p,optwhitespace,expect(optional(";"))).mapHead())});;
    
    /*whitespace*/
    var anyWhitespaceChar = regex(/^\s+$/,"whitespace")
    var whitespace = expect(repeat(1,choice(anyWhitespaceChar,singleLineComment,multiLineComment))).describe("whitespace")
    var optwhitespace = expect(repeat(0,choice(anyWhitespaceChar,singleLineComment,multiLineComment))).describe("optional whitespace")
    var simplewhitespace = expect(repeat(1,regex(/^( |\t)+$/,"simple whitespace"))).describe("spaces or tabs")
    var optsimplewhitespace = expect(repeat(0,regex(/^( |\t)+$/,"simple whitespace"))).describe("optional spaces or tabs")
    var whitespaceWithNewline = whitespace.butnot(simplewhitespace).describe("whitespace with newlines")
    
    __rsu._method('optwsequence',this,self,false,function(){
      var args = []
      for(var i=0;i<arguments.length;i++){
        args.push(optwhitespace)
        args.push(arguments[i])
      }
      return sequence.apply(null,args)
    });
    
    __rsu._method('wsequence',this,self,false,function(){
      var args = []
      for(var i=0;i<arguments.length;i++){
        args.push((i == 0)?optwhitespace:whitespace)
        args.push(arguments[i])
      }
      return sequence.apply(null,args)
    });
       
    __rsu._method('terminatedArgument',this,self,false,function(parser,terminal){return (
      sequence(
        optwhitespace,parser,
        choice(
          and(terminal).describe(terminal),
          sequence(optwhitespace,choice(",",";")).describe("comma or semicolon"),
          whitespaceWithNewline.describe("new line")
        )
      ).mapHead()
    )});
    
    /*keywords*/
    var keyword = choice(
                    "package", "class", "object", "trait", "extends", "with",
                    "base", "super",
                    "match", "case",
                    "if", "else",
                    "throw", "try", "catch", "finally",
                    "public","private", "protected", "override", "final", "native",
                    "def", "var", "val",
                    "for", "while", "do", "yield",
                    "this",
                    "return",
                    "new", "delete",
                    "=","=>", "<-", "@"
                  )
    
    /*numeric literals*/
    var integerLiteral = regex(/^[1-9]\d*|0$/,"integer")
    var floatingPointLiteral = sequence(integerLiteral,".",regex(/^\d+$/,"number")).join()
    var hexLiteral = sequence("0",/^x[a-f]*$/i,repeat(0,regex(/^[0-9a-f]+$/i,"[0-9|a-f]"))).join()
    var number = choice(hexLiteral,floatingPointLiteral,integerLiteral).map(Ast.NumberLiteral)
    
    /*string literals*/
    __rsu._object('SingleQuotedString',this,self,SingleQuotedString,SingleQuotedString$object);function SingleQuotedString(){if(typeof(SingleQuotedString$class) == 'undefined') return SingleQuotedString.$apply.apply(null,arguments);return __rsu._construct(this,'SingleQuotedString',SingleQuotedString$class,arguments.callee,arguments);};function SingleQuotedString$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.SingleQuotedString]);with(self){(function SingleQuotedString$object$ctor(){
      parse(sequence(expect("'"),repeat(0,negate(choice("'","\n"))).join(),expect("'")))
    }).apply(this,[])}}
    __rsu._object('DoubleQuotedString',this,self,DoubleQuotedString,DoubleQuotedString$object);function DoubleQuotedString(){if(typeof(DoubleQuotedString$class) == 'undefined') return DoubleQuotedString.$apply.apply(null,arguments);return __rsu._construct(this,'DoubleQuotedString',DoubleQuotedString$class,arguments.callee,arguments);};function DoubleQuotedString$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.DoubleQuotedString]);with(self){(function DoubleQuotedString$object$ctor(){
      parse(sequence(expect('"'),repeat(0,negate(choice('"',"\n"))).join(),expect('"')))
    }).apply(this,[])}}
    var tripleQuote = describe('"""')(sequence('"','"','"'))
    __rsu._object('TripleQuotedString',this,self,TripleQuotedString,TripleQuotedString$object);function TripleQuotedString(){if(typeof(TripleQuotedString$class) == 'undefined') return TripleQuotedString.$apply.apply(null,arguments);return __rsu._construct(this,'TripleQuotedString',TripleQuotedString$class,arguments.callee,arguments);};function TripleQuotedString$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.TripleQuotedString]);with(self){(function TripleQuotedString$object$ctor(){
      parse(sequence(expect(tripleQuote),repeat(0,negate(sequence(tripleQuote))).join(),expect(tripleQuote)))
    }).apply(this,[])}}
    var string = choice(SingleQuotedString,TripleQuotedString,DoubleQuotedString)
    
    /*xml literal    */
    var xmlName = sequence(/^([A-Z]|[a-z]|\$|_)+$/,repeat(0,/^([A-Z]|[a-z]|[0-9]|\$|_)+$/)).join()
    
    __rsu._object('XmlEntityReference',this,self,XmlEntityReference,XmlEntityReference$object);function XmlEntityReference(){if(typeof(XmlEntityReference$class) == 'undefined') return XmlEntityReference.$apply.apply(null,arguments);return __rsu._construct(this,'XmlEntityReference',XmlEntityReference$class,arguments.callee,arguments);};function XmlEntityReference$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlEntityReference]);with(self){(function XmlEntityReference$object$ctor(){
      parse(sequence(expect("&"),required(xmlName,expect(";"))).mapHead())
    }).apply(this,[])}}
    
    var xmlCharacterReference = choice(
                                  sequence(charseq('&#'),repeat(0,integerLiteral),';'),
                                  sequence(charseq('&#x'),repeat(1,regex(/^[0-9a-f]+$/i,"[0-9|a-f]")),';')
                                )
    
    var xmlReference = choice(XmlEntityReference,xmlCharacterReference) 
    
    var xmlAttributeValue = choice(
                                sequence(expect('"'),repeat(0, choice(negate(choice("<","&",'"')),xmlReference)),expect('"')).join(),
                                sequence(expect("'"),repeat(0, choice(negate(choice("<","&","'")),xmlReference)),expect("'")).join()
                              )
                            
    
    __rsu._object('XmlAttribute',this,self,XmlAttribute,XmlAttribute$object);function XmlAttribute(){if(typeof(XmlAttribute$class) == 'undefined') return XmlAttribute.$apply.apply(null,arguments);return __rsu._construct(this,'XmlAttribute',XmlAttribute$class,arguments.callee,arguments);};function XmlAttribute$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlAttribute]);with(self){(function XmlAttribute$object$ctor(){
      parse(sequence(optwhitespace,xmlName,optwhitespace,expect("="),required(optwhitespace,choice(xmlAttributeValue,XmlRescriptedFragment)).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('XmlEmptyElementTag',this,self,XmlEmptyElementTag,XmlEmptyElementTag$object);function XmlEmptyElementTag(){if(typeof(XmlEmptyElementTag$class) == 'undefined') return XmlEmptyElementTag.$apply.apply(null,arguments);return __rsu._construct(this,'XmlEmptyElementTag',XmlEmptyElementTag$class,arguments.callee,arguments);};function XmlEmptyElementTag$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlEmptyElementTag]);with(self){(function XmlEmptyElementTag$object$ctor(){
      parse(sequence(expect("<"),xmlName,repeat(0,XmlAttribute),optwhitespace,expect(charseq("/>"))))
    }).apply(this,[])}}
   
    __rsu._object('XmlStartEndTag',this,self,XmlStartEndTag,XmlStartEndTag$object);function XmlStartEndTag(){if(typeof(XmlStartEndTag$class) == 'undefined') return XmlStartEndTag.$apply.apply(null,arguments);return __rsu._construct(this,'XmlStartEndTag',XmlStartEndTag$class,arguments.callee,arguments);};function XmlStartEndTag$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlStartEndTag]);with(self){(function XmlStartEndTag$object$ctor(){
      parse(
        andthen(
          sequence(expect("<"),xmlName,required(repeat(0,XmlAttribute),optwhitespace,expect(">")).mapHead()),
          (function(output){return ( required(repeat(0,XmlNode),expect(charseq("</")),expect(token(output[0])),optwhitespace,expect(">")))})
        )
      )
    }).apply(this,[])}}
    
    var xmlTag = choice(XmlEmptyElementTag, XmlStartEndTag)
    
    var xmlNotTextChar = choice("<","&","{")
    __rsu._object('XmlText',this,self,XmlText,XmlText$object);function XmlText(){if(typeof(XmlText$class) == 'undefined') return XmlText.$apply.apply(null,arguments);return __rsu._construct(this,'XmlText',XmlText$class,arguments.callee,arguments);};function XmlText$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlText]);with(self){(function XmlText$object$ctor(){
      parse(sequence(repeat(1,negate(xmlNotTextChar)).join()))
    }).apply(this,[])}}
    
    __rsu._object('XmlRescriptedFragment',this,self,XmlRescriptedFragment,XmlRescriptedFragment$object);function XmlRescriptedFragment(){if(typeof(XmlRescriptedFragment$class) == 'undefined') return XmlRescriptedFragment.$apply.apply(null,arguments);return __rsu._construct(this,'XmlRescriptedFragment',XmlRescriptedFragment$class,arguments.callee,arguments);};function XmlRescriptedFragment$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlRescriptedFragment]);with(self){(function XmlRescriptedFragment$object$ctor(){
      parse(sequence(expect("{"),required(optwhitespace,Expression,optwhitespace,expect("}"))).mapHead())
    }).apply(this,[])}}

    __rsu._object('XmlComment',this,self,XmlComment,XmlComment$object);function XmlComment(){if(typeof(XmlComment$class) == 'undefined') return XmlComment.$apply.apply(null,arguments);return __rsu._construct(this,'XmlComment',XmlComment$class,arguments.callee,arguments);};function XmlComment$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlComment]);with(self){(function XmlComment$object$ctor(){
      parse(
        sequence(
          expect(charseq("<!--")),
          required(optwhitespace,repeat(0,negate(charseq("-->"))).join(),optwhitespace,expect(charseq("-->")))
        ).mapHead()
      )
    }).apply(this,[])}}

    __rsu._object('XmlCData',this,self,XmlCData,XmlCData$object);function XmlCData(){if(typeof(XmlCData$class) == 'undefined') return XmlCData.$apply.apply(null,arguments);return __rsu._construct(this,'XmlCData',XmlCData$class,arguments.callee,arguments);};function XmlCData$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlCData]);with(self){(function XmlCData$object$ctor(){
      parse(
        sequence(
          expect(sequence(charseq("<!["),"CDATA","[")),
          required(repeat(0,negate(charseq("]]>"))).join(),expect(charseq("]]>")))
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('XmlNode',this,self,XmlNode,XmlNode$object);function XmlNode(){if(typeof(XmlNode$class) == 'undefined') return XmlNode.$apply.apply(null,arguments);return __rsu._construct(this,'XmlNode',XmlNode$class,arguments.callee,arguments);};function XmlNode$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[choice(xmlReference,XmlComment,xmlTag,XmlCData,XmlText,XmlRescriptedFragment)]);with(self){(function XmlNode$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('XmlLiteral',this,self,XmlLiteral,XmlLiteral$object);function XmlLiteral(){if(typeof(XmlLiteral$class) == 'undefined') return XmlLiteral.$apply.apply(null,arguments);return __rsu._construct(this,'XmlLiteral',XmlLiteral$class,arguments.callee,arguments);};function XmlLiteral$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.XmlLiteral]);with(self){(function XmlLiteral$object$ctor(){      
      parse(
        sequence(
          optwhitespace,and("<"), /*lookahead for the < before we commit to this syntax*/
          required(xmlTag)
        ).mapHead()
      ) 
    }).apply(this,[])}}
        
    /*other literals*/
    var trueLiteral = token("true")
    var falseLiteral = token("false")
    var nullLiteral = token("null")
    var literal = choice(
                    SingleQuotedString,TripleQuotedString,DoubleQuotedString,
                    number,
                    trueLiteral,falseLiteral,nullLiteral
                  )
    
    /*identifiers*/
    var simpleId = sequence(/^([A-Z]|[a-z]|\$|_)+$/,repeat(0,/^([A-Z]|[a-z]|[0-9]|\$|_)+$/)).join().butnot(keyword)
    var operatorIdRegex = regex(new RegExp("^["+RegExpEscape(operatorTokens)+"]+$"),"operator token")
    var operatorId = repeat(1,operatorIdRegex).join().butnot(keyword)
    var id = choice(simpleId,operatorId)
    var qualifiedId = sequence(id,repeat(0,optwsequence(".",id))).join()/*.map(Ast.QualifiedId)*/
    
    __rsu._object('ArgumentDeclaration',this,self,ArgumentDeclaration,ArgumentDeclaration$object);function ArgumentDeclaration(){if(typeof(ArgumentDeclaration$class) == 'undefined') return ArgumentDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'ArgumentDeclaration',ArgumentDeclaration$class,arguments.callee,arguments);};function ArgumentDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ArgumentDeclaration]);with(self){(function ArgumentDeclaration$object$ctor(){
      parse(
        sequence(
          id,
          optional(sequence(optwhitespace,expect(":"),optwhitespace,choice("*",sequence(qualifiedId,optwhitespace,"*"),qualifiedId)).mapHead()),
          optional(sequence(optwhitespace,expect("="),optwhitespace,Expression).mapHead())
        )
      )
    }).apply(this,[])}}
    
    
    __rsu._method('argumentDeclarationParser',this,self,false,function(argumentParser){return (
      sequence(
        optwhitespace,
        expect("("),
        optwhitespace,
        repeat(0,argumentParser),
        optwhitespace,
        expect(")")
      ).mapHead()
    )});
    
    var argumentDeclarationList = argumentDeclarationParser(terminatedArgument(ArgumentDeclaration,")"))
    var simpleArgumentDeclarationList = argumentDeclarationParser(sequence(simpleId,optwhitespace,optional(",")).mapHead())

    
    var argument = Expression
    var argumentList = (
      sequence(
        expect("("),
        optwhitespace,
        choice(
          repeat(1,terminatedArgument(sequence(optwhitespace,simpleId,optwhitespace,expect("="),optwhitespace,argument),")")),
          repeat(1,terminatedArgument(argument,")")),
          sequence()
        ),
        optwhitespace,
        expect(")")
      ).mapHead()
    )
    
    __rsu._object('ImportStatement',this,self,ImportStatement,ImportStatement$object);function ImportStatement(){if(typeof(ImportStatement$class) == 'undefined') return ImportStatement.$apply.apply(null,arguments);return __rsu._construct(this,'ImportStatement',ImportStatement$class,arguments.callee,arguments);};function ImportStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ImportStatement]);with(self){(function ImportStatement$object$ctor(){
      parse(wsequence(expect("import"),required(list(id,sequence(optwhitespace,".",optwhitespace))).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('PackageDeclaration',this,self,PackageDeclaration,PackageDeclaration$object);function PackageDeclaration(){if(typeof(PackageDeclaration$class) == 'undefined') return PackageDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'PackageDeclaration',PackageDeclaration$class,arguments.callee,arguments);};function PackageDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.PackageDeclaration]);with(self){(function PackageDeclaration$object$ctor(){
      parse(sequence(optwhitespace,expect("package"),required(whitespace,qualifiedId,optwhitespace,expect("{"),optwhitespace,TopLevelStatementList,optwhitespace,expect("}"))).mapHead())
    }).apply(this,[])}}

    __rsu._object('Annotation',this,self,Annotation,Annotation$object);function Annotation(){if(typeof(Annotation$class) == 'undefined') return Annotation.$apply.apply(null,arguments);return __rsu._construct(this,'Annotation',Annotation$class,arguments.callee,arguments);};function Annotation$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.Annotation]);with(self){(function Annotation$object$ctor(){
      parse(sequence(optwhitespace,expect("@"),optwhitespace,qualifiedId,optwhitespace,optional(argumentList)))
    }).apply(this,[])}}
    
    var annotationList = repeat(0,Annotation)

    __rsu._object('ExtendsClause',this,self,ExtendsClause,ExtendsClause$object);function ExtendsClause(){if(typeof(ExtendsClause$class) == 'undefined') return ExtendsClause.$apply.apply(null,arguments);return __rsu._construct(this,'ExtendsClause',ExtendsClause$class,arguments.callee,arguments);};function ExtendsClause$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ExtendsClause]);with(self){(function ExtendsClause$object$ctor(){
      parse(sequence(whitespace,expect("extends"),required(whitespace,qualifiedId,optwhitespace,optional(argumentList))).mapHead())
    }).apply(this,[])}}

    __rsu._object('ClassBody',this,self,ClassBody,ClassBody$object);function ClassBody(){if(typeof(ClassBody$class) == 'undefined') return ClassBody.$apply.apply(null,arguments);return __rsu._construct(this,'ClassBody',ClassBody$class,arguments.callee,arguments);};function ClassBody$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ClassBody]);with(self){(function ClassBody$object$ctor(){
      parse(
        optwsequence(
          expect("{"),
          required(optional(sequence(id,optwhitespace,"=>").mapHead()),StatementList,optwhitespace,expect("}"))
        ).mapHead()
      )
    }).apply(this,[])}}

    __rsu._class('ClassParser',this,self,ClassParser,ClassParser$class);function ClassParser(){return __rsu._construct(this,'ClassParser',ClassParser$class,arguments.callee,arguments);};function ClassParser$class(prefix,astType){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[astType]);with(self){(function ClassParser$ctor(){
      parse(
        sequence(
          optwhitespace,expect(prefix),
          required(whitespace,id,optional(sequence(optwhitespace,argumentDeclarationList).mapHead()),optional(ExtendsClause),optwhitespace,optional(ClassBody))
        ).mapHead()
      )      
    }).apply(this,[])}}
    
    __rsu._object('ClassDeclaration',this,self,ClassDeclaration,ClassDeclaration$object);function ClassDeclaration(){if(typeof(ClassDeclaration$class) == 'undefined') return ClassDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'ClassDeclaration',ClassDeclaration$class,arguments.callee,arguments);};function ClassDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ClassParser,ClassParser$class,["class",Ast.ClassDeclaration]);with(self){(function ClassDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('CaseClassDeclaration',this,self,CaseClassDeclaration,CaseClassDeclaration$object);function CaseClassDeclaration(){if(typeof(CaseClassDeclaration$class) == 'undefined') return CaseClassDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'CaseClassDeclaration',CaseClassDeclaration$class,arguments.callee,arguments);};function CaseClassDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ClassParser,ClassParser$class,[sequence("case",whitespace,"class"),Ast.CaseClassDeclaration]);with(self){(function CaseClassDeclaration$object$ctor(){}).apply(this,[])}}
    
    __rsu._class('ConstructorlessTypeParser',this,self,ConstructorlessTypeParser,ConstructorlessTypeParser$class);function ConstructorlessTypeParser(){return __rsu._construct(this,'ConstructorlessTypeParser',ConstructorlessTypeParser$class,arguments.callee,arguments);};function ConstructorlessTypeParser$class(prefix,astType){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[astType]);with(self){(function ConstructorlessTypeParser$ctor(){
      parse(sequence(optwhitespace,expect(prefix),required(whitespace,id,optional(ExtendsClause),optwhitespace,optional(ClassBody))).mapHead())
    }).apply(this,[])}}
    
    __rsu._object('ObjectDeclaration',this,self,ObjectDeclaration,ObjectDeclaration$object);function ObjectDeclaration(){if(typeof(ObjectDeclaration$class) == 'undefined') return ObjectDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'ObjectDeclaration',ObjectDeclaration$class,arguments.callee,arguments);};function ObjectDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ConstructorlessTypeParser,ConstructorlessTypeParser$class,["object",Ast.ObjectDeclaration]);with(self){(function ObjectDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('CaseObjectDeclaration',this,self,CaseObjectDeclaration,CaseObjectDeclaration$object);function CaseObjectDeclaration(){if(typeof(CaseObjectDeclaration$class) == 'undefined') return CaseObjectDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'CaseObjectDeclaration',CaseObjectDeclaration$class,arguments.callee,arguments);};function CaseObjectDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ConstructorlessTypeParser,ConstructorlessTypeParser$class,[sequence("case",whitespace,"object"),Ast.CaseObjectDeclaration]);with(self){(function CaseObjectDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('TraitDeclaration',this,self,TraitDeclaration,TraitDeclaration$object);function TraitDeclaration(){if(typeof(TraitDeclaration$class) == 'undefined') return TraitDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'TraitDeclaration',TraitDeclaration$class,arguments.callee,arguments);};function TraitDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,ConstructorlessTypeParser,ConstructorlessTypeParser$class,["trait",Ast.TraitDeclaration]);with(self){(function TraitDeclaration$object$ctor(){}).apply(this,[])}}
    
    var modifier = choice("public","private", "protected", "override", "final")
    var modifierList = repeat(0,sequence(modifier,whitespace).mapHead())
    
    __rsu._object('MethodDeclaration',this,self,MethodDeclaration,MethodDeclaration$object);function MethodDeclaration(){if(typeof(MethodDeclaration$class) == 'undefined') return MethodDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'MethodDeclaration',MethodDeclaration$class,arguments.callee,arguments);};function MethodDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.MethodDeclaration]);with(self){(function MethodDeclaration$object$ctor(){
      parse(
        sequence(
          annotationList,optwhitespace,modifierList,optwhitespace,expect("def"),
          required(
            whitespace,id,
            optwhitespace,optional(argumentDeclarationList),
            optwhitespace,choice(
                            EmptyBlockExpression,
                            BlockExpression,
                            sequence(expect("="),optwhitespace,charseq("???").join()),
                            sequence(expect("="),optwhitespace,Expression)
                          )
          )
        ).map(function(ast){return ( [ast[0],ast[1],ast[2][0],ast[2][1],ast[2][2]])})
      )
    }).apply(this,[])}}
    
    
    var variableAssignment = required(whitespace,id,optwhitespace,expect("="),optwhitespace,Expression)
    __rsu._class('VariableParser',this,self,VariableParser,VariableParser$class);function VariableParser(){return __rsu._construct(this,'VariableParser',VariableParser$class,arguments.callee,arguments);};function VariableParser$class(prefix,astType){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[astType]);with(self){(function VariableParser$ctor(){
      parse(sequence(optwhitespace,expect(prefix),variableAssignment).mapHead())
    }).apply(this,[])}}
    
    __rsu._class('MemberVariableParser',this,self,MemberVariableParser,MemberVariableParser$class);function MemberVariableParser(){return __rsu._construct(this,'MemberVariableParser',MemberVariableParser$class,arguments.callee,arguments);};function MemberVariableParser$class(prefix,astType){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[astType]);with(self){(function MemberVariableParser$ctor(){
      parse(sequence(annotationList,optwhitespace,modifierList,optwhitespace,expect(prefix),variableAssignment).map(function(ast){return ( [ast[0],ast[1],ast[2][0],ast[2][1]])}))
    }).apply(this,[])}}
    
    __rsu._object('ValDeclaration',this,self,ValDeclaration,ValDeclaration$object);function ValDeclaration(){if(typeof(ValDeclaration$class) == 'undefined') return ValDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'ValDeclaration',ValDeclaration$class,arguments.callee,arguments);};function ValDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,VariableParser,VariableParser$class,["val",Ast.ValDeclaration]);with(self){(function ValDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('VarDeclaration',this,self,VarDeclaration,VarDeclaration$object);function VarDeclaration(){if(typeof(VarDeclaration$class) == 'undefined') return VarDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'VarDeclaration',VarDeclaration$class,arguments.callee,arguments);};function VarDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,VariableParser,VariableParser$class,["var",Ast.VarDeclaration]);with(self){(function VarDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('MemberValDeclaration',this,self,MemberValDeclaration,MemberValDeclaration$object);function MemberValDeclaration(){if(typeof(MemberValDeclaration$class) == 'undefined') return MemberValDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'MemberValDeclaration',MemberValDeclaration$class,arguments.callee,arguments);};function MemberValDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,MemberVariableParser,MemberVariableParser$class,["val",Ast.MemberValDeclaration]);with(self){(function MemberValDeclaration$object$ctor(){}).apply(this,[])}}
    __rsu._object('MemberVarDeclaration',this,self,MemberVarDeclaration,MemberVarDeclaration$object);function MemberVarDeclaration(){if(typeof(MemberVarDeclaration$class) == 'undefined') return MemberVarDeclaration.$apply.apply(null,arguments);return __rsu._construct(this,'MemberVarDeclaration',MemberVarDeclaration$class,arguments.callee,arguments);};function MemberVarDeclaration$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,MemberVariableParser,MemberVariableParser$class,["var",Ast.MemberVarDeclaration]);with(self){(function MemberVarDeclaration$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('AssignmentStatement',this,self,AssignmentStatement,AssignmentStatement$object);function AssignmentStatement(){if(typeof(AssignmentStatement$class) == 'undefined') return AssignmentStatement.$apply.apply(null,arguments);return __rsu._construct(this,'AssignmentStatement',AssignmentStatement$class,arguments.callee,arguments);};function AssignmentStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.AssignmentStatement]);with(self){(function AssignmentStatement$object$ctor(){
      parse(sequence(optwhitespace,qualifiedId,optwhitespace,expect("="),not("="),optwhitespace,required(Expression).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('ReturnStatement',this,self,ReturnStatement,ReturnStatement$object);function ReturnStatement(){if(typeof(ReturnStatement$class) == 'undefined') return ReturnStatement.$apply.apply(null,arguments);return __rsu._construct(this,'ReturnStatement',ReturnStatement$class,arguments.callee,arguments);};function ReturnStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ReturnStatement]);with(self){(function ReturnStatement$object$ctor(){
      parse(sequence(optwhitespace,expect("return"), optional(sequence(whitespace,Expression)),optwhitespace))
    }).apply(this,[])}}
    
    __rsu._object('NewStatement',this,self,NewStatement,NewStatement$object);function NewStatement(){if(typeof(NewStatement$class) == 'undefined') return NewStatement.$apply.apply(null,arguments);return __rsu._construct(this,'NewStatement',NewStatement$class,arguments.callee,arguments);};function NewStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.NewStatement]);with(self){(function NewStatement$object$ctor(){
      parse(sequence(optwhitespace,expect("new"), required(whitespace,qualifiedId,optional(argumentList))).mapHead())
    }).apply(this,[])}}
    
    __rsu._object('ThrowStatement',this,self,ThrowStatement,ThrowStatement$object);function ThrowStatement(){if(typeof(ThrowStatement$class) == 'undefined') return ThrowStatement.$apply.apply(null,arguments);return __rsu._construct(this,'ThrowStatement',ThrowStatement$class,arguments.callee,arguments);};function ThrowStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ThrowStatement]);with(self){(function ThrowStatement$object$ctor(){
      parse(sequence(optwhitespace,expect("throw"), required(whitespace,Expression)).mapHead())
    }).apply(this,[])}}

    __rsu._object('DeleteStatement',this,self,DeleteStatement,DeleteStatement$object);function DeleteStatement(){if(typeof(DeleteStatement$class) == 'undefined') return DeleteStatement.$apply.apply(null,arguments);return __rsu._construct(this,'DeleteStatement',DeleteStatement$class,arguments.callee,arguments);};function DeleteStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.DeleteStatement]);with(self){(function DeleteStatement$object$ctor(){
      parse(sequence(optwhitespace,expect("delete"), required(whitespace,qualifiedId)).mapHead())
    }).apply(this,[])}}
    
    __rsu._object('SimpleStatement',this,self,SimpleStatement,SimpleStatement$object);function SimpleStatement(){if(typeof(SimpleStatement$class) == 'undefined') return SimpleStatement.$apply.apply(null,arguments);return __rsu._construct(this,'SimpleStatement',SimpleStatement$class,arguments.callee,arguments);};function SimpleStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[sequence(choice(ImportStatement,MethodDeclaration,ValDeclaration,VarDeclaration,ReturnStatement,AssignmentStatement,Expression),expect(optional(";"))).mapHead()]);with(self){(function SimpleStatement$object$ctor(){}).apply(this,[])}}
    __rsu._object('SimpleStatementList',this,self,SimpleStatementList,SimpleStatementList$object);function SimpleStatementList(){if(typeof(SimpleStatementList$class) == 'undefined') return SimpleStatementList.$apply.apply(null,arguments);return __rsu._construct(this,'SimpleStatementList',SimpleStatementList$class,arguments.callee,arguments);};function SimpleStatementList$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[repeat(0,SimpleStatement)]);with(self){(function SimpleStatementList$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('Statement',this,self,Statement,Statement$object);function Statement(){if(typeof(Statement$class) == 'undefined') return Statement.$apply.apply(null,arguments);return __rsu._construct(this,'Statement',Statement$class,arguments.callee,arguments);};function Statement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[sequence(choice(ClassDeclaration,CaseClassDeclaration,ObjectDeclaration,CaseObjectDeclaration,TraitDeclaration,MemberValDeclaration,MemberVarDeclaration,SimpleStatement),expect(optional(";"))).mapHead()]);with(self){(function Statement$object$ctor(){}).apply(this,[])}}
    __rsu._object('StatementList',this,self,StatementList,StatementList$object);function StatementList(){if(typeof(StatementList$class) == 'undefined') return StatementList.$apply.apply(null,arguments);return __rsu._construct(this,'StatementList',StatementList$class,arguments.callee,arguments);};function StatementList$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[repeat(0,Statement)]);with(self){(function StatementList$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('TopLevelStatement',this,self,TopLevelStatement,TopLevelStatement$object);function TopLevelStatement(){if(typeof(TopLevelStatement$class) == 'undefined') return TopLevelStatement.$apply.apply(null,arguments);return __rsu._construct(this,'TopLevelStatement',TopLevelStatement$class,arguments.callee,arguments);};function TopLevelStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[choice(PackageDeclaration,Statement)]);with(self){(function TopLevelStatement$object$ctor(){}).apply(this,[])}}
    __rsu._object('TopLevelStatementList',this,self,TopLevelStatementList,TopLevelStatementList$object);function TopLevelStatementList(){if(typeof(TopLevelStatementList$class) == 'undefined') return TopLevelStatementList.$apply.apply(null,arguments);return __rsu._construct(this,'TopLevelStatementList',TopLevelStatementList$class,arguments.callee,arguments);};function TopLevelStatementList$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[repeat(0,TopLevelStatement)]);with(self){(function TopLevelStatementList$object$ctor(){}).apply(this,[])}}
    
    
    __rsu._object('IfExpression',this,self,IfExpression,IfExpression$object);function IfExpression(){if(typeof(IfExpression$class) == 'undefined') return IfExpression.$apply.apply(null,arguments);return __rsu._construct(this,'IfExpression',IfExpression$class,arguments.callee,arguments);};function IfExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.IfExpression]);with(self){(function IfExpression$object$ctor(){
      parse(
        sequence(
          optwhitespace,expect("if"),
          required(optwhitespace,expect("("),optwhitespace,Expression,optwhitespace,expect(")"),Expression,optional(ElseExpression))
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('ElseExpression',this,self,ElseExpression,ElseExpression$object);function ElseExpression(){if(typeof(ElseExpression$class) == 'undefined') return ElseExpression.$apply.apply(null,arguments);return __rsu._construct(this,'ElseExpression',ElseExpression$class,arguments.callee,arguments);};function ElseExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ElseExpression]);with(self){(function ElseExpression$object$ctor(){
      parse(sequence(optwhitespace,expect("else"),whitespace,required(Expression)).mapHead())
    }).apply(this,[])}}
    
    __rsu._object('DoWhileExpression',this,self,DoWhileExpression,DoWhileExpression$object);function DoWhileExpression(){if(typeof(DoWhileExpression$class) == 'undefined') return DoWhileExpression.$apply.apply(null,arguments);return __rsu._construct(this,'DoWhileExpression',DoWhileExpression$class,arguments.callee,arguments);};function DoWhileExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.DoWhileExpression]);with(self){(function DoWhileExpression$object$ctor(){
      parse(
        sequence(
          optwhitespace,expect("do"),
          required(
            choice(
              GroupExpression,
              BlockExpression,
              sequence(whitespace,Expression,whitespace).mapHead()     
            ),
            optwhitespace,expect("while"),optwhitespace,expect("("),Expression,expect(")")
          )
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('WhileExpression',this,self,WhileExpression,WhileExpression$object);function WhileExpression(){if(typeof(WhileExpression$class) == 'undefined') return WhileExpression.$apply.apply(null,arguments);return __rsu._construct(this,'WhileExpression',WhileExpression$class,arguments.callee,arguments);};function WhileExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.WhileExpression]);with(self){(function WhileExpression$object$ctor(){
      parse(
        sequence(
          optwhitespace,expect("while"),optwhitespace,
          required(expect("("),Expression,expect(")"),Expression)
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('ForComprehension',this,self,ForComprehension,ForComprehension$object);function ForComprehension(){if(typeof(ForComprehension$class) == 'undefined') return ForComprehension.$apply.apply(null,arguments);return __rsu._construct(this,'ForComprehension',ForComprehension$class,arguments.callee,arguments);};function ForComprehension$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ForComprehension]);with(self){(function ForComprehension$object$ctor(){
      parse(
        sequence(
          optwhitespace,expect("for"),
          required(
            optwhitespace,expect("("),
              optwhitespace,repeat(1,optsemi(ForInStatement)),optwhitespace,repeat(0,optsemi(ForGuard)),
            optwhitespace,expect(")"),optwhitespace,optional("yield"),optwhitespace,Expression
          )
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('ForInStatement',this,self,ForInStatement,ForInStatement$object);function ForInStatement(){if(typeof(ForInStatement$class) == 'undefined') return ForInStatement.$apply.apply(null,arguments);return __rsu._construct(this,'ForInStatement',ForInStatement$class,arguments.callee,arguments);};function ForInStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ForInStatement]);with(self){(function ForInStatement$object$ctor(){
      parse(sequence(optwhitespace,id,optwhitespace,expect("<-"),optwhitespace,Expression))
    }).apply(this,[])}}
    
    __rsu._object('ForGuard',this,self,ForGuard,ForGuard$object);function ForGuard(){if(typeof(ForGuard$class) == 'undefined') return ForGuard.$apply.apply(null,arguments);return __rsu._construct(this,'ForGuard',ForGuard$class,arguments.callee,arguments);};function ForGuard$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ForGuard]);with(self){(function ForGuard$object$ctor(){
      parse(sequence(optwhitespace,expect("if"),optwhitespace,Expression))
    }).apply(this,[])}}
    
    var emptyBlock = sequence(optwhitespace,expect("{"),optwhitespace,expect("}"))
    __rsu._object('EmptyBlockExpression',this,self,EmptyBlockExpression,EmptyBlockExpression$object);function EmptyBlockExpression(){if(typeof(EmptyBlockExpression$class) == 'undefined') return EmptyBlockExpression.$apply.apply(null,arguments);return __rsu._construct(this,'EmptyBlockExpression',EmptyBlockExpression$class,arguments.callee,arguments);};function EmptyBlockExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.EmptyBlockExpression]);with(self){(function EmptyBlockExpression$object$ctor(){
      parse(emptyBlock)
    }).apply(this,[])}}
    
    __rsu._object('BlockExpression',this,self,BlockExpression,BlockExpression$object);function BlockExpression(){if(typeof(BlockExpression$class) == 'undefined') return BlockExpression.$apply.apply(null,arguments);return __rsu._construct(this,'BlockExpression',BlockExpression$class,arguments.callee,arguments);};function BlockExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.BlockExpression]);with(self){(function BlockExpression$object$ctor(){
      parse(sequence(optwhitespace,expect("{"),optwhitespace,required(repeat(1,SimpleStatement),optwhitespace,expect("}"))).map(function(_rs59581_){return (_rs59581_[0])}))
    }).apply(this,[])}}
    
    __rsu._object('GroupExpression',this,self,GroupExpression,GroupExpression$object);function GroupExpression(){if(typeof(GroupExpression$class) == 'undefined') return GroupExpression.$apply.apply(null,arguments);return __rsu._construct(this,'GroupExpression',GroupExpression$class,arguments.callee,arguments);};function GroupExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.GroupExpression]);with(self){(function GroupExpression$object$ctor(){
      parse(sequence(optwhitespace,expect("("),optwhitespace,required(Expression,optwhitespace,expect(")")).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('ExpressionChain',this,self,ExpressionChain,ExpressionChain$object);function ExpressionChain(){if(typeof(ExpressionChain$class) == 'undefined') return ExpressionChain.$apply.apply(null,arguments);return __rsu._construct(this,'ExpressionChain',ExpressionChain$class,arguments.callee,arguments);};function ExpressionChain$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ExpressionChain]);with(self){(function ExpressionChain$object$ctor(){
      parse(
        sequence(
          repeat(0,choice(
            sequence(optwhitespace,argumentList).mapHead(),
            sequence(optwhitespace,expect("."),optwhitespace,qualifiedId).mapHead()
          ))
        )
      )
    }).apply(this,[])}}
    
    __rsu._object('SimpleExpression',this,self,SimpleExpression,SimpleExpression$object);function SimpleExpression(){if(typeof(SimpleExpression$class) == 'undefined') return SimpleExpression.$apply.apply(null,arguments);return __rsu._construct(this,'SimpleExpression',SimpleExpression$class,arguments.callee,arguments);};function SimpleExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.SimpleExpression]);with(self){(function SimpleExpression$object$ctor(){
      parse(sequence(choice(NewStatement,ThrowStatement,DeleteStatement,PartialFunction,LambdaExpression,XmlLiteral,JsonLiteral,ArrayLiteral,GroupExpression,BlockExpression,emptyBlock.map(function(ast){return ( Ast.JsonLiteral([]))}),UnaryOperation,literal,qualifiedId),ExpressionChain))
    }).apply(this,[])}}
    
    __rsu._object('LambdaExpression',this,self,LambdaExpression,LambdaExpression$object);function LambdaExpression(){if(typeof(LambdaExpression$class) == 'undefined') return LambdaExpression.$apply.apply(null,arguments);return __rsu._construct(this,'LambdaExpression',LambdaExpression$class,arguments.callee,arguments);};function LambdaExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.LambdaExpression]);with(self){(function LambdaExpression$object$ctor(){
      parse(sequence(choice(simpleArgumentDeclarationList,id),optwhitespace,expect("=>"),optional(Expression)))
    }).apply(this,[])}}

    __rsu._object('CaseLiteralPattern',this,self,CaseLiteralPattern,CaseLiteralPattern$object);function CaseLiteralPattern(){if(typeof(CaseLiteralPattern$class) == 'undefined') return CaseLiteralPattern.$apply.apply(null,arguments);return __rsu._construct(this,'CaseLiteralPattern',CaseLiteralPattern$class,arguments.callee,arguments);};function CaseLiteralPattern$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.CaseLiteralPattern]);with(self){(function CaseLiteralPattern$object$ctor(){
      parse(sequence(literal))
    }).apply(this,[])}}
    var casePattern = choice(
                        CaseLiteralPattern,
                        sequence("`",qualifiedId,"`"),
                        sequence(simpleId,optwhitespace,":",optwhitespace,qualifiedId),
                        /*
                        sequence(
                          optwhitespace,simpleId,
                          optwhitespace,"@_*"
                        ),
                        */
                        sequence(
                          optwhitespace,simpleId,
                          optwhitespace,"@",
                          optwhitespace,qualifiedId,
                          optwhitespace,"(",optwhitespace,casePatternList,optwhitespace,optional("@_*"),optwhitespace,")"
                        ),
                        sequence(
                          optwhitespace,qualifiedId,
                          optwhitespace,"(",optwhitespace,casePatternList,optwhitespace,optional("@_*"),optwhitespace,")"
                        ),
                        simpleId
                      )
    __rsu._object('casePatternList',this,self,casePatternList,casePatternList$object);function casePatternList(){if(typeof(casePatternList$class) == 'undefined') return casePatternList.$apply.apply(null,arguments);return __rsu._construct(this,'casePatternList',casePatternList$class,arguments.callee,arguments);};function casePatternList$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[list(casePattern,sequence(optwhitespace,",",optwhitespace))]);with(self){(function casePatternList$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('CaseStatement',this,self,CaseStatement,CaseStatement$object);function CaseStatement(){if(typeof(CaseStatement$class) == 'undefined') return CaseStatement.$apply.apply(null,arguments);return __rsu._construct(this,'CaseStatement',CaseStatement$class,arguments.callee,arguments);};function CaseStatement$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.CaseStatement]);with(self){(function CaseStatement$object$ctor(){
      var caseGuard = sequence(whitespace,expect("if"),whitespace,CommonExpressions).mapHead()
      parse(sequence(optwhitespace,expect("case"),whitespace,casePattern,optional(caseGuard),optwhitespace,expect("=>"),optwhitespace,StatementList))
    }).apply(this,[])}}
    
    __rsu._object('PartialFunction',this,self,PartialFunction,PartialFunction$object);function PartialFunction(){if(typeof(PartialFunction$class) == 'undefined') return PartialFunction.$apply.apply(null,arguments);return __rsu._construct(this,'PartialFunction',PartialFunction$class,arguments.callee,arguments);};function PartialFunction$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.PartialFunction]);with(self){(function PartialFunction$object$ctor(){
      parse(sequence(optwhitespace,expect("{"),and(sequence(optwhitespace,"case")),required(repeat(1,CaseStatement),optwhitespace,"}")).mapHead())
    }).apply(this,[])}}
    
    __rsu._object('TryExpression',this,self,TryExpression,TryExpression$object);function TryExpression(){if(typeof(TryExpression$class) == 'undefined') return TryExpression.$apply.apply(null,arguments);return __rsu._construct(this,'TryExpression',TryExpression$class,arguments.callee,arguments);};function TryExpression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.TryExpression]);with(self){(function TryExpression$object$ctor(){
      parse(
        sequence(
          optwhitespace,expect("try"),
          required(
            Expression,
            optional(sequence(optwhitespace,expect("catch"),optwhitespace,Expression).mapHead()),
            optional(sequence(optwhitespace,expect("finally"),optwhitespace,Expression).mapHead())
          )
        ).mapHead()
      )
    }).apply(this,[])}}
    
    __rsu._object('JsonLiteral',this,self,JsonLiteral,JsonLiteral$object);function JsonLiteral(){if(typeof(JsonLiteral$class) == 'undefined') return JsonLiteral.$apply.apply(null,arguments);return __rsu._construct(this,'JsonLiteral',JsonLiteral$class,arguments.callee,arguments);};function JsonLiteral$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.JsonLiteral]);with(self){(function JsonLiteral$object$ctor(){
      parse(sequence(optwhitespace,expect("{"),optwhitespace,repeat(1,JsonKeyValue),optwhitespace,required(expect("}"))))
    }).apply(this,[])}}
    
    __rsu._object('JsonKeyValue',this,self,JsonKeyValue,JsonKeyValue$object);function JsonKeyValue(){if(typeof(JsonKeyValue$class) == 'undefined') return JsonKeyValue.$apply.apply(null,arguments);return __rsu._construct(this,'JsonKeyValue',JsonKeyValue$class,arguments.callee,arguments);};function JsonKeyValue$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.JsonKeyValue]);with(self){(function JsonKeyValue$object$ctor(){ 
      parse(sequence(optwhitespace,choice(string,simpleId),optwhitespace,expect(":"),optwhitespace,required(terminatedArgument(CommonExpressions,"}")).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('ArrayLiteral',this,self,ArrayLiteral,ArrayLiteral$object);function ArrayLiteral(){if(typeof(ArrayLiteral$class) == 'undefined') return ArrayLiteral.$apply.apply(null,arguments);return __rsu._construct(this,'ArrayLiteral',ArrayLiteral$class,arguments.callee,arguments);};function ArrayLiteral$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.ArrayLiteral]);with(self){(function ArrayLiteral$object$ctor(){
      parse(sequence(expect("["),optwhitespace,required(repeat(0,terminatedArgument(CommonExpressions,"]")),optwhitespace,expect("]")).mapHead()))
    }).apply(this,[])}}
    
    __rsu._object('UnaryOperation',this,self,UnaryOperation,UnaryOperation$object);function UnaryOperation(){if(typeof(UnaryOperation$class) == 'undefined') return UnaryOperation.$apply.apply(null,arguments);return __rsu._construct(this,'UnaryOperation',UnaryOperation$class,arguments.callee,arguments);};function UnaryOperation$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.UnaryOperation]);with(self){(function UnaryOperation$object$ctor(){
      var unaryOperator = repeat(1,choice("+","-","~","!")).join()
      parse(sequence(unaryOperator,optsimplewhitespace,SimpleExpression))
    }).apply(this,[])}}
    
    /*

    1	 () []
    2	 ! ~ - + * & unary operator
    3	 * / %	Multiplication, division, modulo
    4	 + -	Addition and subtraction
    5	 << >>	Bitwise shift left and right
    6	 < <= > >=	Comparisons: less-than, ...
    7	 == !=	Comparisons: equal and not equal
    8	 &	Bitwise AND
    9	 ^	Bitwise exclusive OR
    10 |	Bitwise inclusive (normal) OR
    11 &&	Logical AND
    12 ||	Logical OR
    13 ?:	Conditional expression (ternary operator)
    14 = += -= *= /= %= &= |= ^= <<= >>= Assignment operators
    15 , Comma operator
    */
    
    __rsu._object('CommonExpressions',this,self,CommonExpressions,CommonExpressions$object);function CommonExpressions(){if(typeof(CommonExpressions$class) == 'undefined') return CommonExpressions.$apply.apply(null,arguments);return __rsu._construct(this,'CommonExpressions',CommonExpressions$class,arguments.callee,arguments);};function CommonExpressions$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[choice(BinaryOperation,SimpleExpression)]);with(self){(function CommonExpressions$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('BinaryOperation',this,self,BinaryOperation,BinaryOperation$object);function BinaryOperation(){if(typeof(BinaryOperation$class) == 'undefined') return BinaryOperation.$apply.apply(null,arguments);return __rsu._construct(this,'BinaryOperation',BinaryOperation$class,arguments.callee,arguments);};function BinaryOperation$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[]);with(self){(function BinaryOperation$object$ctor(){
      __rsu._method('binary',this,self,false,function(op){return (
        sequence(optsimplewhitespace,op.butnot(keyword),optwhitespace).map(function(token){return (
          (function(a,b){return ( Ast.BinaryOperation(a,token[0],b) )})
        )})
      )});
      
      __rsu._method('operators',this,self,false,function(){return (
        choice.apply(null,
          from(arguments).map(function(arg){return ( sequence(arg.length == 1? token(arg):charseq(arg),repeat(0,operatorIdRegex)).join())}).toArray()
        )
      )});
      
      parse(
        choice(
          sequence(SimpleExpression,simplewhitespace,simpleId.map(Ast.SimpleId),simplewhitespace,SimpleExpression).mapTo(Ast.BinaryOperation),
          precedence(SimpleExpression)(
            binary(operators("*","/","%")),
            binary(operators("+","-")),
            binary(operators("<<",">>")),
            binary(operators("<","<=",">",">=")),
            binary(operators("==","!=")),/*.debugFailure("[== and !=]")*/
            binary(token("&")),
            binary(token("^")),
            binary(token("|")),
            binary(charseq("&&")),
            binary(charseq("||")),
            /*binary(token("=")),*/
            binary(operatorId)
          )
        )
      )
    }).apply(this,[])}}

    __rsu._object('Expression',this,self,Expression,Expression$object);function Expression(){if(typeof(Expression$class) == 'undefined') return Expression.$apply.apply(null,arguments);return __rsu._construct(this,'Expression',Expression$class,arguments.callee,arguments);};function Expression$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,Parser,Parser$class,[sequence(optwhitespace,choice(TryExpression,IfExpression,ForComprehension,DoWhileExpression,WhileExpression,BinaryOperation,SimpleExpression)).mapHead()]);with(self){(function Expression$object$ctor(){}).apply(this,[])}}
    
    __rsu._object('Program',this,self,Program,Program$object);function Program(){if(typeof(Program$class) == 'undefined') return Program.$apply.apply(null,arguments);return __rsu._construct(this,'Program',Program$class,arguments.callee,arguments);};function Program$object(){var self = __rsu._self(this);var base = __rsu._extend(this,self,AstParser,AstParser$class,[Ast.Program]);with(self){(function Program$object$ctor(){
      parse(eof(sequence(TopLevelStatementList,optwhitespace)))
    }).apply(this,[])}}    
    
  }).apply(this,[])}}

}).apply(this,[])}})

}).apply(__rescripted.script.root,[]);}}},true);
__rescripted.util._source(['rescripted.collections'],['rescripted.lang'],function(){var self = this;var _rs820_ = {};with(this){with(_rs820_){(function(){var __rsu = __rescripted.util;var from = __rsu.from;var match = __rsu.match;var typeOf = __rsu.typeOf;var isInstanceOf = __rsu.isInstanceOf;/*rescripted-settings:{"legacy":true,"immediate":true}*/

__rsu._import('rescripted.collections',rescripted.collections,'_',_rs820_)

__rsu._package('rescripted.lang',this,function(){var self = this;with(this){(function(){  
  __rsu._class('RescriptedToJavascript',this,self,RescriptedToJavascript,RescriptedToJavascript$class);function RescriptedToJavascript(){return __rsu._construct(this,'RescriptedToJavascript',RescriptedToJavascript$class,arguments.callee,arguments);};function RescriptedToJavascript$class(){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]);with(self){(function RescriptedToJavascript$ctor(){
    var g = RescriptedGrammar()
    
    var nameSeed = Math.round(Math.random() * 100)
    var namePrefix = "_rs"
    var nameIndex = 0;
    __rsu._method('nextName',this,self,false,function(){return (namePrefix+nameSeed+(nameIndex++)+"_")});
    var contextName = nextName();
    var provides = ArraySeq()
    var dependencies = ArraySeq()
    
    __rsu._method('transform',this,self,false,function(input,settings){
      settings = settings || {}
      
      var result = g.parse(input)
      if(!result.success)
        return "failure!"
      
      var code = match(result.output)(__rsu._partialFunction(
                  function(_rs82743_){return Ast.Program.unapply(_rs82743_,false,function(body){return function(){return ( processList(body)
                 )}})}));
      
      var quoted = (function(x){return ( "'"+x+"'")})
      return ("__rescripted.util._source(["+dependencies.map(quoted).mkString(",")+"],["+provides.map(quoted).mkString(",")+"],function(){"+
              "var self = this;"+
              "var "+contextName+" = {};with(this){with("+contextName+"){(function(){"+
              "var __rsu = __rescripted.util;"+
              "var from = __rsu.from;"+
              "var match = __rsu.match;"+
              "var typeOf = __rsu.typeOf;"+
              "var isInstanceOf = __rsu.isInstanceOf;"+
              code+
              "}).apply(__rescripted.script.root,[]);}}"+
              "},"+(settings.immediate === true)+");");
    });
    
    __rsu._method('load',this,self,false,function(input,settings){return (eval(transform(input,settings)))});
    
    __rsu._method('run',this,self,false,function(input,settings){return (load(input,settings).apply(__rescripted.script.root,[]))});
    
    __rsu._method('processList',this,self,false,function(items){return ( from(items).map(process).mkString(";\n") )});
    
    __rsu._method('process',this,self,false,(__rsu._partialFunction(
      function(_rs82744_){return Ast.SimpleExpression.unapply(_rs82744_,false,function(expr,_rs82745_){return Ast.ExpressionChain.unapply(_rs82745_,false,function(chain){return function(){return ( process(expr)+Seq.fromArray(chain).map(processExpressionChain).mkString(""))}})})}
      ,function(_rs82746_){return Ast.ReturnStatement.unapply(_rs82746_,false,function(optExpr){return function(){return ( "return "+optExpr.map(process).getOrElse("")+";")}})}
     
      ,function(_rs82747_){return Ast.NewStatement.unapply(_rs82747_,false,function(id,optArgs){return function(){return ( "new "+id+"("+processArgsList(optArgs)+")")}})}
      ,function(_rs82748_){return Ast.ThrowStatement.unapply(_rs82748_,false,function(expr){return function(){return ( "__rsu._throw("+process(expr)+")")}})}
      ,function(_rs82749_){return Ast.DeleteStatement.unapply(_rs82749_,false,function(id){return function(){return ( "delete "+id)}})}
      
      ,function(_rs82750_){return Ast.ImportStatement.unapply(_rs82750_,false,function(_rs82751_){return Seq.unapply(_rs82751_,true,function(parts){return function(){
        var packagePart = parts.take(parts.size() - 1).mkString(".")
        dependencies.push(packagePart)
        return "__rsu._import('"+packagePart+"',"+packagePart+",'"+parts.last()+"',"+contextName+")"
      }})})}
      ,function(_rs82752_){return Ast.PackageDeclaration.unapply(_rs82752_,false,function(qualifiedId,body){return function(){return (
        (
          provides.push(qualifiedId),
          "__rsu._package('"+qualifiedId+"',this,function(){var self = this;with(this){(function(){"+processList(body)+"}).apply(this,[])}})"
        ))}})}
      ,function(_rs82753_){return Ast.LambdaExpression.unapply(_rs82753_,false,function(optArgs,optExpression){return function(){return ( "function("+processArgumentDeclarationList(optArgs)+"){\nreturn "+optExpression.map(process).getOrElse("null")+";\n}")}})}
      ,function(_rs82754_){return Ast.BinaryOperation.unapply(_rs82754_,false,function(exprA,_rs82755_,exprB){return Ast.SimpleId.unapply(_rs82755_,false,function(id){return function(){return ( process(exprA)+"."+id+"("+process(exprB)+")")}})})}
      ,function(_rs82756_){return Ast.BinaryOperation.unapply(_rs82756_,false,function(exprA,op,exprB){return function(){return ( "("+process(exprA)+" "+op+" "+process(exprB)+")")}})}
      ,function(_rs82757_){return Ast.UnaryOperation.unapply(_rs82757_,false,function(operation,operand){return function(){return ( operation+""+process(operand))}})}
      ,function(_rs82758_){return Ast.ValDeclaration.unapply(_rs82758_,false,function(id,expr){return function(){return ( "var "+id+" = ("+process(expr)+")")}})}
      ,function(_rs82759_){return Ast.VarDeclaration.unapply(_rs82759_,false,function(id,expr){return function(){return ( "var "+id+" = ("+process(expr)+")")}})}
      ,function(_rs82760_){return Ast.MemberValDeclaration.unapply(_rs82760_,false,function(annotations,modifiers,id,expr){return function(){return ( "self."+id+" = ("+process(expr)+")")}})}
      ,function(_rs82761_){return Ast.MemberVarDeclaration.unapply(_rs82761_,false,function(annotations,modifiers,id,expr){return function(){return ( "self."+id+" = ("+process(expr)+")")}})}
      ,function(_rs82762_){return Ast.TripleQuotedString.unapply(_rs82762_,false,function(value){return function(){return ( Json.encodeString(value))}})}
      ,function(_rs82763_){return Ast.SingleQuotedString.unapply(_rs82763_,false,function(value){return function(){return ( "'"+value+"'")}})}
      ,function(_rs82764_){return Ast.DoubleQuotedString.unapply(_rs82764_,false,function(value){return function(){return ( '"'+value+'"')}})}
      ,function(_rs82765_){return Ast.NumberLiteral.unapply(_rs82765_,false,function(num){return function(){return ( num)}})}
      ,function(_rs82766_){return Ast.BlockExpression.unapply(_rs82766_,false,function(exprs){return function(){return ( processBlock(Seq.fromArray(exprs)))}})}
      ,function(_rs82767_){return Ast.GroupExpression.unapply(_rs82767_,false,function(expr){return function(){return ( "("+process(expr)+")")}})}
      ,function(_rs82768_){return Ast.AssignmentStatement.unapply(_rs82768_,false,function(id,value){return function(){return ( id+" = "+process(value))}})}
      ,function(_rs82769_){return Ast.IfExpression.unapply(_rs82769_,false,function(clause,body,optElseBody){return function(){return ( "(("+process(clause)+")? ("+process(body)+"):("+optElseBody.map(process).getOrElse("null")+"))")}})}
      ,function(_rs82770_){return Ast.ElseExpression.unapply(_rs82770_,false,function(body){return function(){return ( process(body))}})}
      ,function(_rs82771_){return Ast.DoWhileExpression.unapply(_rs82771_,false,function(body,clause){return function(){return ( "do{"+process(body)+"} while("+process(clause)+")")}})}
      ,function(_rs82772_){return Ast.WhileExpression.unapply(_rs82772_,false,function(clause,body){return function(){return ( "while("+process(clause)+"){"+process(body)+"}")}})}
      ,function(_rs82773_){return Ast.ForComprehension.unapply(_rs82773_,false,function(forIn,guards,_rs82774_,expr){return ((_rs82774_ === None))?function(){return ( forComprehension(forIn,guards,expr,"foreach","foreach",""))}:null})}
      ,function(_rs82775_){return Ast.ForComprehension.unapply(_rs82775_,false,function(forIn,guards,_rs82776_,expr){return Some.unapply(_rs82776_,false,function(y){return function(){return ( forComprehension(forIn,guards,expr,"flatMap","map","return "))}})})}
      ,function(_rs82777_){return Ast.TryExpression.unapply(_rs82777_,false,function(body,_rs82778_,_rs82779_){return ((_rs82778_ === None) && (_rs82779_ === None))?function(){return ( "(function(){try{ return "+process(body)+";}catch("+nextName()+"){return null;}})()")}:null})}
      ,function(_rs82780_){return Ast.TryExpression.unapply(_rs82780_,false,function(body,optCatchHandler,optFinallyBody){return function() {
        var e = nextName()
        return "(function(){try{ return "+process(body)+";}" +
          optCatchHandler.map(function(handler){return ( "catch("+e+"){return "+process(handler)+"("+e+");}")}).getOrElse("") + 
          optFinallyBody.map(function(finallyBody){return ( "finally{"+process(finallyBody)+"}")}).getOrElse("") +
        "})()"
      }})}
      ,function(_rs82781_){return Ast.ArgumentDeclaration.unapply(_rs82781_,false,function(id,type,defaultValue){return function(){return ( id)}})}
      ,function(_rs82782_){return Ast.MethodDeclaration.unapply(_rs82782_,false,function(annotations,modifiers,id,args,_rs82783_){return Seq.unapply(_rs82783_,false,function(_rs82784_){return ((_rs82784_ === "???"))?function(){return ( "__rsu._abstractMethod('"+id+"',this,self);")}:null})})}
      ,function(_rs82785_){return Ast.MethodDeclaration.unapply(_rs82785_,false,function(annotations,modifiers,id,args,_rs82786_){return Ast.EmptyBlockExpression.unapply(_rs82786_,false,function(){return function(){return ( methodDeclaration(modifiers,id,args,List(),false))}})})}
      ,function(_rs82787_){return Ast.MethodDeclaration.unapply(_rs82787_,false,function(annotations,modifiers,id,args,_rs82788_){return Ast.BlockExpression.unapply(_rs82788_,false,function(statements){return function(){return ( methodDeclaration(modifiers,id,args,Seq.fromArray(statements),false))}})})}
      ,function(_rs82789_){return Ast.MethodDeclaration.unapply(_rs82789_,false,function(annotations,modifiers,id,args,_rs82790_){return Seq.unapply(_rs82790_,false,function(expression){return function(){return ( methodDeclaration(modifiers,id,args,List(expression),true))}})})}
      
      ,function(_rs82791_){return Ast.XmlLiteral.unapply(_rs82791_,false,function(tag){return function(){return ( process(tag))}})}
      ,function(_rs82792_){return Ast.XmlAttribute.unapply(_rs82792_,false,function(name,_rs82793_){return Ast.XmlRescriptedFragment.unapply(_rs82793_,false,function(expr){return function(){return ( "{name:"+Json.encodeString(name)+",value:XmlJavascriptFragment("+process(expr)+")}")}})})}
      ,function(_rs82794_){return Ast.XmlAttribute.unapply(_rs82794_,false,function(name,value){return function(){return ( "{name:"+Json.encodeString(name)+",value:("+Json.encodeString(decodeXmlEntities(value))+")}")}})}
      ,function(_rs82795_){return Ast.XmlEmptyElementTag.unapply(_rs82795_,false,function(name,attrs){return function(){return ( "XmlElement("+Json.encodeString(name)+",["+attrs.map(process).join(",")+"],[])")}})}
      ,function(_rs82796_){return Ast.XmlStartEndTag.unapply(_rs82796_,false,function(_rs82797_,_rs82798_){return Seq.unapply(_rs82797_,false,function(name,attrs){return Seq.unapply(_rs82798_,false,function(body){return function(){return ( "XmlElement("+Json.encodeString(name)+",["+attrs.map(process).join(",")+"],["+body.map(process).join(",")+"])")}})})})}
      ,function(_rs82799_){return Ast.XmlText.unapply(_rs82799_,false,function(text){return function(){return ( "XmlText("+Json.encodeString(text)+")")}})}
      ,function(_rs82800_){return Ast.XmlRescriptedFragment.unapply(_rs82800_,false,function(expr){return function(){return ( "XmlJavascriptFragment("+process(expr)+")")}})}
      ,function(_rs82801_){return Ast.XmlEntityReference.unapply(_rs82801_,false,function(ref){return function(){return ( "XmlText("+Json.encodeString(decodeXmlEntities("&"+ref+";"))+")")}})}
      ,function(_rs82802_){return Ast.XmlCData.unapply(_rs82802_,false,function(cdata){return function(){return ( "XmlCdata("+Json.encodeString(cdata)+")")}})}
      ,function(_rs82803_){return Ast.XmlComment.unapply(_rs82803_,false,function(comment){return function(){return ( "XmlComment("+Json.encodeString(comment)+")")}})}
      
      ,function(_rs82804_){return Ast.JsonLiteral.unapply(_rs82804_,false,function(keyValuePairs){return function(){return ( Seq.fromArray(keyValuePairs).map(process).mkString("{",",","}"))}})}
      ,function(_rs82805_){return Ast.JsonKeyValue.unapply(_rs82805_,false,function(name,value){return function(){return ( ""+process(name)+":"+process(value))}})}
      ,function(_rs82806_){return Ast.ArrayLiteral.unapply(_rs82806_,false,function(values){return function(){return ( Seq.fromArray(values).map(process).mkString("[",",","]"))}})}
      
      
      ,function(_rs82807_){return Ast.ClassDeclaration.unapply(_rs82807_,false,function(className,optArgList,optExtendsClause,optBody){return function(){return ( classDeclaration(className,optArgList,optExtendsClause,optBody))}})}
      ,function(_rs82808_){return Ast.CaseClassDeclaration.unapply(_rs82808_,false,function(className,optArgList,optExtendsClause,optBody){return function(){return ( caseClass(className,optArgList,optExtendsClause,optBody))}})}
      ,function(_rs82809_){return Ast.ObjectDeclaration.unapply(_rs82809_,false,function(objectName,optExtendsClause,optBody){return function(){return ( objectDeclaration(objectName,optExtendsClause,optBody))}})}
      ,function(_rs82810_){return Ast.CaseObjectDeclaration.unapply(_rs82810_,false,function(objectName,optExtendsClause,optBody){return function(){return ( objectDeclaration(objectName,optExtendsClause,optBody) /*finish this...*/)}})}
      ,function(_rs82811_){return Ast.TraitDeclaration.unapply(_rs82811_,false,function(traitName,optExtendsClause,optBody){return function(){return ( traitDeclaration(traitName,optExtendsClause,optBody))}})}
      
      ,function(_rs82812_){return Ast.PartialFunction.unapply(_rs82812_,false,function(cases){return function(){return ( partialFunction(Seq.fromArray(cases)))}})}
      
      ,function(a){return (isInstanceOf(a,Array))?function(){return ( "unknown array: name: "+a.nodeName+" length: "+a.length+" <"+a+">")}:null}
      ,function(s){return (isInstanceOf(s,String))?function(){return ( s)}:null}
      ,function(other){return function(){return ( "unknown:"+(other.nodeName || other)
    )}})));
    
    __rsu._method('methodDeclaration',this,self,false,function(modifiers,methodName,args,bodyStatements,returnValue){
      modifiers = from(modifiers)
      
      var body = processBlock(bodyStatements)
      var argNames = processArgumentDeclarationList(args);
      var argsList = args.map(Seq.fromArray).getOrElse(List())
      
      var processDefaultValue = (function(id,expr){return ( "if("+id+" === undefined){"+id+" = "+process(expr)+"}")})
      var processTypeCheck = (function(id,type){return ( "__rsu._checkParameterType("+Json.encodeString(methodName)+","+Json.encodeString(id)+","+Json.encodeString(type)+","+id+","+type+")")})
      var isVarArgs = false;
      var argHandlers = argsList.collect(__rsu._partialFunction(
        function(_rs82813_){return Ast.ArgumentDeclaration.unapply(_rs82813_,false,function(id,_rs82814_,_rs82815_){return Some.unapply(_rs82814_,false,function(_rs82816_){return Seq.unapply(_rs82816_,false,function(type,_rs82817_){return ((_rs82815_ === None) && (_rs82817_ === "*"))?function() {isVarArgs = true;return List()}:null})})})}
        ,function(_rs82818_){return Ast.ArgumentDeclaration.unapply(_rs82818_,false,function(id,_rs82819_,_rs82820_){return Some.unapply(_rs82819_,false,function(_rs82821_){return ((_rs82820_ === None) && (_rs82821_ === "*"))?function() {isVarArgs = true;return List()}:null})})}
        ,function(_rs82822_){return Ast.ArgumentDeclaration.unapply(_rs82822_,false,function(id,optTypeName,optDefaultValue){return function(){return ( List(optDefaultValue.map(function(v){return ( processDefaultValue(id,v))}),optTypeName.map(function(typeName){return ( processTypeCheck(id,typeName))})).flatten()        
      )}})}))
      
      /*println("argHandlers:"+argHandlers.mkString("\n"))*/
      
      var argumentValidators = argHandlers.flatten().mkString(";\n");
      if(argHandlers.size() > 0)
        argumentValidators += ";\n__rsu._validateParameters("+Json.encodeString(methodName)+",["+from(argNames.split(",")).map(Json.encodeString).mkString(",")+"],["+argNames+"],arguments,"+isVarArgs+");\n"
      
      var namedParametersHandler = List(
        "var $$named = __rsu._namedParameters(arguments);",
        "if($$named !== undefined){",
        argsList.collect(__rsu._partialFunction(
          function(_rs82823_){return Ast.ArgumentDeclaration.unapply(_rs82823_,false,function(id,type,defaultValue){return function(){return ( List("if($$named."+id+" !== undefined){"+id+" = $$named."+id+"}")
        )}})})),
        "}",
        argsList.collect(__rsu._partialFunction(
          function(_rs82824_){return Ast.ArgumentDeclaration.unapply(_rs82824_,false,function(id,_rs82825_,_rs82826_){return Some.unapply(_rs82825_,false,function(_rs82827_){return Seq.unapply(_rs82827_,false,function(type,_rs82828_){return ((_rs82826_ === None) && (_rs82828_ === "*"))?function(){return ( 
            List("else{",id + " = __rsu._typedVarArgs("+(argsList.size() - 1)+",arguments,"+type+");","}"))}:null})})})}
          ,function(_rs82829_){return Ast.ArgumentDeclaration.unapply(_rs82829_,false,function(id,_rs82830_,_rs82831_){return Some.unapply(_rs82830_,false,function(_rs82832_){return ((_rs82831_ === None) && (_rs82832_ === "*"))?function(){return ( 
            List("else{",id + " = __rsu._varArgs("+(argsList.size() - 1)+",arguments);","}")
        )}:null})})}))
      ).flatten().mkString("\n")
      
      var func = "function "+methodName+"("+argNames+"){"+namedParametersHandler+argumentValidators+(returnValue?"return ":"")+body+"}";
      if(modifiers.contains("private")) return func;
      return "__rsu._method('"+methodName+"',this,self,"+modifiers.contains("override")+","+func+")";
    });
    
    __rsu._method('decodeXmlEntities',this,self,false,function(str){return ($("<div/>").html(str).text())});
    
    __rsu._method('forComprehension',this,self,false,function(forIns,guards,expr,method,lastMethod,returnExpr){
      
      function buildGuards(id){
        if(guards.length == 0) return "";
        return ".filter(function("+id+"){return "+(from(guards).map(__rsu._partialFunction( function(_rs82833_){return Ast.ForGuard.unapply(_rs82833_,false,function(guard){return function(){return ( "("+process(guard)+")" )}})})).mkString("&&"))+"})"
      }
      
      var _rs82740_ = (__rsu._partialFunction(
        function(_rs82834_){return Seq.unapply(_rs82834_,false,function(_rs82835_){return Ast.ForInStatement.unapply(_rs82835_,false,function(id,inExpr){return function(){return ( 
          "from("+process(inExpr)+")"+buildGuards(id)+"."+lastMethod+"(function("+id+"){"+returnExpr+process(expr)+"})")}})})}
        ,function(_rs82836_){return Seq.unapply(_rs82836_,true,function(_rs82837_,forIns){return Ast.ForInStatement.unapply(_rs82837_,false,function(id,inExpr){return function(){return (
          "from("+process(inExpr)+")."+method+"(function("+id+"){"+returnExpr+processForIns(forIns)+"})"
      )}})})}));function processForIns(_rs82739_){ return _rs82740_(_rs82739_) };processForIns.isDefinedAt = _rs82740_.isDefinedAt;
      
      return processForIns(forIns);
    });
    
    __rsu._method('processBlock',this,self,false,function(exprs){return (match(exprs)(__rsu._partialFunction(
      function(_rs82838_){return Seq.unapply(_rs82838_,false,function(){return function(){return ( "null")}})}
      ,function(_rs82839_){return Seq.unapply(_rs82839_,false,function(expr){return function(){return ( process(expr))}})}
      ,function(other){return function(){return (
        "(function(){"+
          exprs.take(exprs.size() - 1).map(process).mkString("",";\n",";\n")+
          "return "+process(exprs.last())+";"+
        "})()"
    )}})))});
    
    __rsu._method('partialFunction',this,self,false,function(cases){
    
      var _rs82742_ = (__rsu._partialFunction(
        function(_rs82840_){return Ast.CaseStatement.unapply(_rs82840_,false,function(pattern,optGuard,statements){return function() {
          var output = {guards: ArraySeq(), front:ArraySeq(), back:ArraySeq()}
          optGuard.foreach(output.guards.push);
          var generate = (function(id, other){
            other = other || {}
            if(other.front) output.front.push(other.front);
            if(other.back) output.back.push(other.back);
            if(other.guard) output.guards.push(other.guard);
            return id
          })
          var id = processPattern(pattern,generate)
          return "function("+id+"){return "+output.front.mkString("")+buildCaseBody(output.guards,Seq.fromArray(statements))+output.back.reverse().mkString("")+"}";
        }
      })}));function partialFunctionCase(_rs82741_){ return _rs82742_(_rs82741_) };partialFunctionCase.isDefinedAt = _rs82742_.isDefinedAt;
      
      function buildCaseBody(guards,statements){
        var result = "function(){return "+processBlock(statements)+";}"
        if(guards.size() > 0)
          return guards.map(process).mkString("(","&&",")?")+result +":null"
        else
          return result
      }
      
      function processPattern(pattern,generate){return (match(pattern)(__rsu._partialFunction(
        function(id){return (isInstanceOf(id,String))?function(){return (
          generate(id))}:null}
        ,function(_rs82841_){return Ast.CaseLiteralPattern.unapply(_rs82841_,false,function(literal){return function() {
          var name = nextName()
          return generate(name,{guard:name + "===" + process(literal)})
        }})}
        ,function(_rs82842_){return Seq.unapply(_rs82842_,false,function(_rs82843_,id,_rs82844_){return ((_rs82843_ === "`") && (_rs82844_ === "`"))?function() {
          var name = nextName()
          return generate(name,{guard:name + "===" + id})
        }:null})}
        ,function(_rs82845_){return Seq.unapply(_rs82845_,false,function(id,_rs82846_,type){return ((_rs82846_ === ":"))?function(){return ( 
          generate(id,{guard:"isInstanceOf("+id+","+type+")"}))}:null})}
        ,function(_rs82847_){return Seq.unapply(_rs82847_,false,function(name,_rs82848_,extractor,_rs82849_,patterns,wildcard,_rs82850_){return ((_rs82848_ === "@") && (_rs82849_ === "(") && (_rs82850_ === ")"))?function(){return ( 
          processExtractor(name,extractor,patterns,wildcard != None,generate))}:null})}
        ,function(_rs82851_){return Seq.unapply(_rs82851_,false,function(extractor,_rs82852_,patterns,wildcard,_rs82853_){return ((_rs82852_ === "(") && (_rs82853_ === ")"))?function(){return ( 
          processExtractor(nextName(),extractor,patterns,wildcard != None,generate)
      )}:null})})))}
          
      function processExtractor(name,extractor,patterns,wildcard,generate){
        var pending = ArraySeq()
        var capturedGenerate = (function(id, other){ pending.push({id:id,other:other});return id; })
        var paramNames = from(patterns).map(function(p){return ( processPattern(p,capturedGenerate))});
        generate(name,{front:extractor+".unapply("+name+","+wildcard+",function("+paramNames.mkString(",")+"){return ",back:"})"});
        from(pending).foreach(function(item){ generate(item.id,item.other) }) 
        return name;
      }
      return "__rsu._partialFunction("+cases.map(partialFunctionCase).mkString(",\n")+")"
    });
    
    __rsu._method('classDeclaration',this,self,false,function(className,optArgList,optExtendsClause,optBody){return ( 
      [
      "__rsu._class('"+className+"',this,self,"+className+","+className+"\$class);",
      "function "+className+"(){return __rsu._construct(this,'"+className+"',"+className+"\$class,arguments.callee,arguments);};",
      "function "+className+"\$class("+processArgumentDeclarationList(optArgList)+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,"+
        optExtendsClause.map(__rsu._partialFunction( function(_rs82854_){return Ast.ExtendsClause.unapply(_rs82854_,false,function(extendsName,optArgs){return function(){return (
          extendsName+","+extendsName+"$class,["+processArgsList(optArgs)+"]"
        )}})})).getOrElse("__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]")+");",
        "with(self){(function "+className+"\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")
    )});
    
    __rsu._method('objectDeclaration',this,self,false,function(objectName,optExtendsClause,optBody){return (
      [
      "__rsu._object('"+objectName+"',this,self,"+objectName+","+objectName+"\$object);",
      "function "+objectName+"(){if(typeof("+objectName+"\$class) == 'undefined') return "+objectName+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+objectName+"',"+objectName+"\$class,arguments.callee,arguments);};",
      "function "+objectName+"\$object(){var self = __rsu._self(this);",
      "var base = __rsu._extend(this,self,"+
        optExtendsClause.map(__rsu._partialFunction( function(_rs82855_){return Ast.ExtendsClause.unapply(_rs82855_,false,function(extendsName,optArgs){return function(){return (
          extendsName+","+extendsName+"$class,["+processArgsList(optArgs)+"]"
        )}})})).getOrElse("__rescripted.RescriptedObject,__rescripted.RescriptedObject,[]")+");",
        "with(self){(function "+objectName+"\$object\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")
    )});
    
    __rsu._method('traitDeclaration',this,self,false,function(traitName,optExtendsClause,optBody){return (
      [
      "__rsu._trait('"+traitName+"',this,self,"+traitName+","+traitName+"\$trait);",
      "function "+traitName+"(){if(typeof("+traitName+"\$class) == 'undefined') return "+traitName+"\.$apply.apply(null,arguments);return __rsu._construct(this,'"+traitName+"',"+traitName+"\$class,arguments.callee,arguments);};",
      "function "+traitName+"\$trait(){var self = __rsu._self(this);",
        optExtendsClause.map(__rsu._partialFunction( function(_rs82856_){return Ast.ExtendsClause.unapply(_rs82856_,false,function(extendsName,optArgs){return function(){return (
          "var base = __rsu._mixin(this,self,"+extendsName+","+extendsName+"$trait,["+processArgsList(optArgs)+"]"
        )}})})).getOrElse("")+");",
        "with(self){(function "+traitName+"\$trait\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")      
    )});
    
    __rsu._method('caseClass',this,self,false,function(className,optArgList,optExtendsClause,optBody){return (
      /*currently ignoring the extends clause*/
      [
      "__rsu._caseClass('"+className+"',this,self,"+className+","+className+"\$class);",
      "function "+className+"(){return __rsu._construct(this,'"+className+"',"+className+"\$class,arguments.callee,arguments);};",
      "function "+className+"\$class("+processArgumentDeclarationList(optArgList)+"){var self = __rsu._self(this);var base = __rsu._extend(this,self,__rescripted.Product,__rescripted.Product,['"+className+"',"+Json.encodeString(processArgumentDeclarationList(optArgList))+",["+processArgumentDeclarationList(optArgList)+"]]);",  
        "with(self){(function "+className+"\$ctor(){"+optBody.map(processClassBody).getOrElse("")+"}).apply(this,[])}",
      "}"
      ].join("\n")      
    )});
    
    __rsu._method('processExpressionChain',this,self,false,(__rsu._partialFunction(
      function(property){return (isInstanceOf(property,String))?function(){return ( "."+property)}:null}
      ,function(args){return (isInstanceOf(args,Array))?function(){return ( "("+processArgsList(Some(args))+")"
    )}:null})));
    
    __rsu._method('processArgsList',this,self,false,function(optArgs){
      var args = Seq.fromArray(optArgs.getOrElse([]));
      var colon = ":"
      var named = args.collect(__rsu._partialFunction(
        function(_rs82857_){return Seq.unapply(_rs82857_,false,function(id,expr){return function(){return ( (id+colon+process(expr))
      )}})}));
      
      if(named.size() > 0)
        return named.mkString("{$$named:{",",","}}")
        
      return args.map(process).mkString(",") 
    });
    
    __rsu._method('processArgumentDeclarationList',this,self,false,(__rsu._partialFunction(
      function(id){return (isInstanceOf(id,String))?function(){return ( id)}:null}
      ,function(_rs82858_){return ((_rs82858_ === None))?function(){return ( "")}:null}
      ,function(_rs82859_){return Some.unapply(_rs82859_,false,function(value){return function(){return ( processArgumentDeclarationList(value))}})}
      ,function(_rs82860_){return Seq.unapply(_rs82860_,true,function(args){return function(){return ( args.map(process).mkString(","))}})}
      ,function(other){return function(){return ( "(untransformed arg list: "+other+")"
    )}})));

    
    __rsu._method('processClassBody',this,self,false,(__rsu._partialFunction(
      function(_rs82861_){return Ast.ClassBody.unapply(_rs82861_,false,function(_rs82862_,statements){return Some.unapply(_rs82862_,false,function(thisAlias){return function(){return ( processClassBodyStatements(["this",thisAlias],statements))}})})}
      ,function(_rs82863_){return Ast.ClassBody.unapply(_rs82863_,false,function(_rs82864_,statements){return ((_rs82864_ === None))?function(){return ( processClassBodyStatements(["this"],statements)  
    )}:null})})));
    
    __rsu._method('processClassBodyStatements',this,self,false,function(aliases,statements){
      /*println("statements: "+typeOf(from(statements).map))*/
      /*return "aliases: "+aliases+" statements: "+*/
      return from(statements).map(process).mkString("",";\n",";\n")
    });
    
  }).apply(this,[])}}
}).apply(this,[])}})

}).apply(__rescripted.script.root,[]);}}},true);
