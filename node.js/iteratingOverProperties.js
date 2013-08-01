print({})
print(new Object())

function type() {}
	type.prototype = {a:1, b:2}
	
print(new type())

function print(x) {
	for(var n in x) {
		console.log(n+": "+x[n])
	}
}