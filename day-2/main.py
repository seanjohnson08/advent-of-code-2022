scores = {
    'A X': 1 + 3, # Rock, Draw
    'A Y': 2 + 6, # Rock vs Paper, Win
    'A Z': 3 + 0, # Rock vs Scissors, Loss

    'B X': 1 + 0, # Paper vs Rock, Loss
    'B Y': 2 + 3, # Paper vs Paper, Draw
    'B Z': 3 + 6, # Paper vs Scissors, Win

    'C X': 1 + 6, # Scissors vs Rock, Win
    'C Y': 2 + 0, # Scissors vs Paper, Loss
    'C Z': 3 + 3, # Scissors vs Scissors, Draw
}

remapped_outcomes = {
    'A X': 'A Z', # Rock, Loss
    'A Y': 'A X', # Rock, Draw
    'A Z': 'A Y', # Rock, Win

    'B X': 'B X', # Paper, Loss
    'B Y': 'B Y', # Paper, Draw
    'B Z': 'B Z', # Paper, Win

    'C X': 'C Y', # Scissors, Loss
    'C Y': 'C Z', # Scissors, Draw
    'C Z': 'C X', # Scissors, Win
}

part_1_score = 0
part_2_score = 0
with open('input', 'r') as inputFile:
    for line in inputFile:
        stripped = line.strip()
        part_1_score += scores[stripped]
        part_2_score += scores[remapped_outcomes[stripped]]


print('Part 1: {}'.format(part_1_score))
print('Part 2: {}'.format(part_2_score))
