var npm = require("npm")
var myConfigObject = {}
npm.load(myConfigObject, function (er) {
    if (er) throw er;
    
    npm.config.set("global", true);
    console.log("Prefix: "+npm.prefix);
});