
try {
    var fs = require("fs")
    fs.writeFile('nonexistantFolder/test.txt')
} catch(e) {
    console.log('this never happens: '+e)
}
