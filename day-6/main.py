startMarkerLength = 4
endMarkerLength = 14

start = False
end = False

with open('input', 'r') as file:
    stream = file.readline()
    for i in range(startMarkerLength - 1, len(stream)):
        # Find start marker
        if not start and len(set(stream[i - startMarkerLength:i])) == startMarkerLength:
            start = i

        # Find end marker
        if not end and i > endMarkerLength and len(set(stream[i - endMarkerLength:i])) == endMarkerLength:
            end = i
            break


print('Part 1: {}'.format(start))
print('Part 2: {}'.format(end))