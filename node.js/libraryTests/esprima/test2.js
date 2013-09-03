var esprima = require('esprima');
var fs = require('fs')

var program = fs.readFileSync("program2.js")
console.log(findAllRequires(program));

function findAllRequires(program) {
    var requireArguments = []

    var code = JSON.stringify(esprima.parse(program), null, 4)
    code.body.forEach(function(statement) {
        if(statement.type === 'ExpressionStatement' && statement.expression.type === 'CallExpression') {
            processRequireCallExpression(statement.expression)
        } else if(statement.type === 'VariableDeclaration' && ) {

        }
    })

    function processRequireCallExpression(expression) {
        if(expression.callee.name === 'require') {
            if(expression.arguments[0].type === 'Literal') {
                requireArguments.push(expression.arguments[0].value)
            } else {
                throw Error("findAllRequires doesn't support require called with non-literals")
            }
        }
    }
}
