require('./a')
require('./c-same-as-a')

console.log(moose)


setTimeout(function() {
    require.ensure(['./b'], function() {
        require('./b')  
    })
}, 1000)
