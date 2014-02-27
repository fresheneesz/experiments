var e = Error("test")
    e.a = 5
    e.b = {whatever: 'what'}

for(var n in e) {
    console.log(e.hasOwnProperty(n)+' - '+n+": "+e[n])
}

function CustomError(msg) {
    Error.apply(this, arguments);
    this.message = msg
    this.b = 'B'
}

function MiddleError(){
    this.name = 'CustomError'
    this.a = 'A'
}
MiddleError.prototype = Error
CustomError.prototype = new MiddleError()

var e2 = new CustomError('test')

console.log('break')

for(var n in e2) {
    console.log(e2.hasOwnProperty(n)+' - '+n+": "+e2[n])
}