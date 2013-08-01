/*
var processTripleQuotes = (function(){
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
  
  
  return function processTripleQuotes(code){
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
})();

var normalJs = processTripleQuotes('// """ is a triple quote\n'+
									'var x = """cat""";');
*/

var fs = require('fs');
//eval(fs.readFileSync('rescripted/src/main/webapp/dist/rescripted-complete.js').toString());
eval(fs.readFileSync('rescriptedBase.js').toString());

var normalJs = __rescripted.script.transform('// """ is a triple quote\n'+
									'var x = """cat""";');

console.log(normalJs);

