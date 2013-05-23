from billys import *
from functools import reduce
	
filename = "movies.txt"

file = open(filename, 'r')
list = []

char = file.read(1)
curword = ""
while char != "":
		
	if char in [' ', "\t", "\n"]:
		if ! reduce(lambda x,y: x and y, map(lambda x: x in " \t\n", curword), False):	# in lima: curword[[{v}<" /t/n"]]{[&]}
			list.append(curword)
		curword = ""
	else :
		curword += char
	
	char = file.read(1)

list.append(curword)
	
output = open("outputMovies.txt",'w')
output.write("\n".join(list))
