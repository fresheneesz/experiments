Rescripted("Rescripted.Lang.Json",[],function(){
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
	return Json;
});
