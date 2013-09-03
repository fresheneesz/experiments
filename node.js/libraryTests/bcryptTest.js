
var bcrypt = require("bcrypt")

bcrypt.genSalt(10, 30, function(err, salt) {})

// "somehash" isn't a valid hash so should throw exception - tho as of 2013-07-25, it just silently gives back the wrong result (true)
bcrypt.compare("somepassword", "somehash", function(err, result) {
    console.log("Async: "+result)
})

var result = bcrypt.compareSync("somepassword", "somehash")
console.log("Sync: "+result)
