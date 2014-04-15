
// this mostly works, but there are some bugs - file-loader doesn't work because emitFile isn't supported
// this is probably ok tho because node.js modules wouldn't want to use a file loader anyway
var erequire = require("enhanced-require")(module,{recursive: true})
erequire('./test')
