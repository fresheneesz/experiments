a = 5
b = 'boae'

items = [[a], [b], [a, b], [a, b]]

singles = []
group = []
for item in items:
	if item not in group:
		group.append(item)
	for x in item:
		if x not in singles:
			singles.append(x)

print(group)
print(singles)
