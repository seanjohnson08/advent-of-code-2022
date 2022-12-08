def getPriority(item):
    charCode = ord(item)
    if 97 <= charCode <= 122:
        return charCode - 96
    elif 65 <= charCode <= 90:
        return charCode - 38

part_1 = 0
with open('input', 'r') as inputFile:
    for line in inputFile:
        stripped = line.strip()
        midpoint = len(stripped) // 2
        comp1 = set(stripped[0:midpoint])
        comp2 = set(stripped[midpoint:])
        duplicateItem = comp1.intersection(comp2).pop()
        part_1 += getPriority(duplicateItem)

print('Part 1: {}'.format(part_1))

part_2 = 0
with open('input', 'r') as inputFile:
    for line1 in inputFile:
        line2 = inputFile.readline().strip()
        line3 = inputFile.readline().strip()
        badge = set(line1.strip()).intersection(set(line2)).intersection(set(line3)).pop()
        part_2 += getPriority(badge)

print('Part 2: {}'.format(part_2))