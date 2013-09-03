require('sugar')

var x = Object.extended({x:1,y:2,z:3})

x.each(function(v,k) {
    console.log(k+": "+v)
})

var y = {x:1,y:2,z:3}
y.each(function(v,k) {
    console.log(k+": "+v)
})