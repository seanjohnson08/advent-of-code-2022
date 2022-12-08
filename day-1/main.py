totals = [0]

with open('input', 'r') as inputFile:
    for line in inputFile:
        if line == '\n':
            totals.append(0)
        else:
            totals[-1] += int(line)

totals.sort()

print('Part 1: {}'.format(totals[-1]))
print('Part 2: {}'.format(sum(totals[-3:])))