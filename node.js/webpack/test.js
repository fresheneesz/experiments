require('./a')
require('./c-same-as-a')
var text = require('raw-loader!./test.txt')  // raw-loader! references the raw-loader module (in node_modules)
            
console.log(moose) //global from module ./a
console.log(text)



setTimeout(function() {
    require.ensure(['./b', 'css-loader!./test.css'], function() {
        var css = require('css-loader!./test.css')  
        require('./b')  
        addStyle(css)   
    })
}, 1000)

function addStyle(css) {
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style')
    
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(style);   
}
