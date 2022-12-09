import re

lineParser = re.compile('(\d+)-(\d+),(\d+)-(\d+)')

part_1 = 0
part_2 = 0
with open('input', 'r') as file:
    for line in file:
        [range1Start, range1End, range2Start, range2End] = map(int, lineParser.match(line).groups())

        range1Overlaps = range1Start <= range2Start and range1End >= range2End
        range2Overlaps = range2Start <= range1Start and range2End >= range1End
        range1PartlyOverlaps = range1Start <= range2Start <= range1End
        range2PartlyOverlaps = range2Start <= range1Start <= range2End
        if range1Overlaps or range2Overlaps:
            part_1 += 1
        if range1PartlyOverlaps or range2PartlyOverlaps:
            part_2 += 1


print('Part 1: {}'.format(part_1))
print('Part 2: {}'.format(part_2))