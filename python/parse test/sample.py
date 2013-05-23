import re, fileinput
from pyPEG import parse
from pyPEG import keyword, _and, _not, ignore

# pyPEG:
#
#   basestring:     terminal symbol (characters)
#   keyword:        terminal symbol (keyword)
#   matchobj:       terminal symbols (regex, use for scanning symbols)
#   function:       named non-terminal symbol, recursive definition
#                   if you don't want naming in output, precede name with an underscore
#   tuple:          production sequence
#   integer:        count in production sequence:
#                    0: following element is optional
#                   -1: following element can be omitted or repeated endless
#                   -2: following element is required and can be repeated endless
#   list:           options, choose one of them
#   _not:           next element in production sequence is matched only if this would not
#   _and:           next element in production sequence is matched only if this would, too

def comment():          return [re.compile(r"//.*"), re.compile("/\*.*?\*/", re.S)]
def literal():          return re.compile(r'\d*\.\d*|\d+|".*?"')
def symbol():           return re.compile(r"\w+")
def operator():         return re.compile(r"\+|\-|\*|\/|\=\=")
def operation():        return symbol, operator, [literal, functioncall]
def expression():       return [literal, operation, functioncall]
def expressionlist():   return expression, -1, (",", expression)
def returnstatement():  return keyword("return"), expression
def ifstatement():      return keyword("if"), "(", expression, ")", block, keyword("else"), block
def statement():        return [ifstatement, returnstatement], ";"
def block():            return "{", -2, statement, "}"
def parameterlist():    return "(", symbol, -1, (",", symbol), ")"
def functioncall():     return symbol, "(", expressionlist, ")"
def function():         return keyword("function"), symbol, parameterlist, block
def simpleLanguage():   return function


result = parse(simpleLanguage(), fileinput.input(), True, comment)
print result
print 'done'
raw_input()
