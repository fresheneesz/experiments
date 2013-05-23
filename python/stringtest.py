from billys import * 
from functools import reduce

for  x in "boom": 
	wout(x)


if reduce(lambda x,y: x and y, map(lambda x: x in "moose", "oosm")):
	print("YES!")
else:
	print("no")

input()









