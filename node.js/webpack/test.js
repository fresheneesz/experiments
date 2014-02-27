require('./a')

console.log(moose)


setTimeout(function() {
    require.ensure(['./b'], function() {
        require('./b')  
    })
}, 1000)
