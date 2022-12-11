inputGrid = []

with open('input', 'r') as file:
    for line in file:
        inputGrid.append([int(c) for c in line.strip()])

## Iterate once through to find all trees visible from top or left
treesVisible = []
tallestTreeVertical = [-1 for i in inputGrid[0]]
for idy, row in enumerate(inputGrid):
    tallestTreeHorizontal = -1
    treesVisible.append([])
    for idx, tree in enumerate(row):
        visibility = 0

        # Tree is visible from left
        if tree > tallestTreeHorizontal:
            tallestTreeHorizontal = tree
            visibility = 1

        # Tree is visible from top
        if tree > tallestTreeVertical[idx]:
            tallestTreeVertical[idx] = tree
            visibility = 1

        treesVisible[idy].append(visibility)

# Iterate through again (reversed) to find trees visible from right or bottom
tallestTreeVertical = [-1 for i in inputGrid[0]]
for idy, row in reversed(list(enumerate(inputGrid))):
    tallestTreeHorizontal = -1
    for idx, tree in reversed(list(enumerate(row))):
        visibility = 0

        # Tree is visible from left
        if tree > tallestTreeHorizontal:
            tallestTreeHorizontal = tree
            visibility = 1

        # Tree is visible from top
        if tree > tallestTreeVertical[idx]:
            tallestTreeVertical[idx] = tree
            visibility = 1

        treesVisible[idy][idx] |= visibility

# count all 1s for part 1
print('Part 1: {}'.format(sum([sum(row) for row in treesVisible])))