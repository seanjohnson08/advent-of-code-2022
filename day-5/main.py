import re

# [T]             [P]     [J]
# [F]     [S]     [T]     [R]     [B]
# [V]     [M] [H] [S]     [F]     [R]
# [Z]     [P] [Q] [B]     [S] [W] [P]
# [C]     [Q] [R] [D] [Z] [N] [H] [Q]
# [W] [B] [T] [F] [L] [T] [M] [F] [T]
# [S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
# [Q] [Q] [B] [D] [J] [W] [H] [R] [J]
#  1   2   3   4   5   6   7   8   9

stacks = list(map(list, [
    'QSWCZVFT',
    'QRB',
    'BZTQPMS',
    'DVFRQH',
    'JGLDBSTP',
    'WRTZ',
    'HQMNSFRJ',
    'RNFHW',
    'JZTQPRB'
]))

lineParser = re.compile('move (\d+) from (\d+) to (\d+)')

with open('input', 'r') as file:
    for line in file:
        [quantity, stack1, stack2] = map(int, lineParser.match(line).groups())
        for i in range(0, quantity):
            stacks[stack2 - 1].append(stacks[stack1 - 1].pop())


print('Part 1: {}'.format(''.join([stack[-1] for stack in stacks])))