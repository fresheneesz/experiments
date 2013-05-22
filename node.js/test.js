var a = [1,2,3];

a.forEach(function(v, n, array) {
	array.push(v*2);
});

console.log(a);