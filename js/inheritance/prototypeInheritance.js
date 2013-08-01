var A = function() {}
    A.five = 5
    A.prototype = A

var B = function() {
    this.six = 6
}
    B.prototype = new A()

var C = function() {
    this.seven = 7
}
    C.prototype = new B()

var c = new C();
console.log(c.five)
console.log(c.six)
console.log(c.seven)

console.log(c instanceof C)
console.log(c instanceof B)
console.log(c instanceof A)

// constructor that returns something
var reconstructor = function() {
    this.moose = 5
    return null
}

var x = new reconstructor()

console.log(x.moose)
console.log(x)
console.log(Type(null))
