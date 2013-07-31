function NotImplementedError() { 
  Error.apply(this, arguments); 
}
NotImplementedError.prototype = Error.prototype;

var nie = new NotImplementedError("some message");
console.log("The message is: '"+nie.message+"'")

var x = new Error("a")
x.msg = "b"
console.log("The message is: '"+x.message+"'")

var y = Error.call(x, "c"); 
console.log(x.msg)
console.log(y)


var z = new Error("z") 
console.log(z)
console.log(z.message)

function MyError() {
    return Error.apply(this, arguments);
}

var myError = new MyError("message");
console.log("The message is: '"+myError.message+"'")
console.log(myError instanceof Error)