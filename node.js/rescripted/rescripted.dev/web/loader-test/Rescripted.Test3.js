var Rescripted = (function(context){
		return function(name,definition){ name = "Rescripted."+name; return arguments.length == 1? (context[name] = context[name] || require("./"+name+".js")[name]) : (context[name] = definition); }
})(this);

console.log("Test3!")
console.log("Test1: "+Rescripted("Test1").Test1)
console.log("Test2: "+Rescripted("Test2").Test2())
console.log("Equal: "+(Rescripted("Test1") == Rescripted("Test2").GetTest1()))
console.log(Rescripted("Test1"))
console.log(Rescripted("Test2").GetTest1())
