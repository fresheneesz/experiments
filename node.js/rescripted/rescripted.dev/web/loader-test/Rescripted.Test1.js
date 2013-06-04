var Rescripted = (function(context){
		return function(name,definition){ name = "Rescripted."+name; return arguments.length == 1? (context[name] = context[name] || require("./"+name+".js")[name]) : (context[name] = definition); }
})(this);

console.log("Test1!")
Rescripted("Test1",{Test1:"a:"+(new Date().getTime())})
