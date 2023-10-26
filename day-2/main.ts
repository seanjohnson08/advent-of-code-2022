const scores: { [key: string]: number } = {
  'A X': 1 + 3, // Rock, Draw
  'A Y': 2 + 6, // Rock vs Paper, Win
  'A Z': 3 + 0, // Rock vs Scissors, Loss

  'B X': 1 + 0, // Paper vs Rock, Loss
  'B Y': 2 + 3, // Paper vs Paper, Draw
  'B Z': 3 + 6, // Paper vs Scissors, Win

  'C X': 1 + 6, // Scissors vs Rock, Win
  'C Y': 2 + 0, // Scissors vs Paper, Loss
  'C Z': 3 + 3, // Scissors vs Scissors, Draw
};

const remappedOutcomes: { [key: string]: string } = {
  'A X': 'A Z', // Rock, Loss
  'A Y': 'A X', // Rock, Draw
  'A Z': 'A Y', // Rock, Win

  'B X': 'B X', // Paper, Loss
  'B Y': 'B Y', // Paper, Draw
  'B Z': 'B Z', // Paper, Win

  'C X': 'C Y', // Scissors, Loss
  'C Y': 'C Z', // Scissors, Draw
  'C Z': 'C X', // Scissors, Win
};

let part1Score = 0;
let part2Score = 0;
const input = `A X
A Y
A Z
B X
B Y
B Z
C X
C Y
C Z`;

const lines = input.split('\n');
for (const line of lines) {
  const stripped = line.trim();
  part1Score += scores[stripped];
  part2Score += scores[remappedOutcomes[stripped]];
}

console.log(`Part 1: ${part1Score}`);
console.log(`Part 2: ${part2Score}`);
