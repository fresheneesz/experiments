var Rescripted = (function(context){
		return function(name,definition){ name = "Rescripted."+name; return arguments.length == 1? (context[name] = context[name] || require("./"+name+".js")[name]) : (context[name] = definition); }
})(this);
console.log("Test2!")
Rescripted("Test2",{Test2:function(){return Rescripted("Test1").Test1},GetTest1:function(){return Rescripted("Test1")}})
