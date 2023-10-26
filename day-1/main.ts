const totals: number[] = [0];

const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8').split('\n');

input.forEach((line: string) => {
  if (line === '') {
    totals.push(0);
  } else {
    totals[totals.length - 1] += parseInt(line);
  }
});

totals.sort();

console.log(`Part 1: ${totals[totals.length - 1]}`);
console.log(`Part 2: ${totals.slice(-3).reduce((a, b) => a + b, 0)}`);
