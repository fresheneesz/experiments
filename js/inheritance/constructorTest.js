

A.prototype = {y:9}
function A() {
	this.x = 5	
}
B.prototype = {y:9}
function B() {
	return {x:6}
}
C.prototype = {y:9}
function C() {
	return null
}
D.prototype = {y:9}
function D() {
	return []
}

E.prototype = {y:9}
function E() {
	return function() { console.log('yo')}
}

console.log(new A())
console.log(new B())
console.log(new C())
console.log(new D())
new E()()

console.log("---")

console.log(new A().y)
console.log(new B().y)
console.log(new C().y)
console.log(new D().y)
console.log(new E().y)