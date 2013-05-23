from billys import *
from functools import *
from simpleparse import generator
from simpleparse.stt import TextTools




parser = generator.buildParser("""
	things			:= things*
	thing			:= alphanums, separator
	alphanums		:= [a-zA-Z0-9]+
	whitespace		:= [ \t\r]
	separator		:= whitespace, whitespace+ / [\n]
""").parserbyname('things')

print 'done'

taglist = TextTools.tag("""
	test
""", parser)
print 'done2'

for tag, beg, end, parts in taglist:
    print tag, beg, end, parts


raw_input()
