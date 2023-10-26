const lineParser = /(\d+)-(\d+),(\d+)-(\d+)/;

let part_1 = 0;
let part_2 = 0;
const fs = require('fs');
const file = fs.readFileSync('input', 'utf-8');
const lines = file.split('\n');

lines.forEach((line) => {
  const [range1Start, range1End, range2Start, range2End] = line.match(lineParser).slice(1).map(Number);

  const range1Overlaps = range1Start <= range2Start && range1End >= range2End;
  const range2Overlaps = range2Start <= range1Start && range2End >= range1End;
  const range1PartlyOverlaps = range1Start <= range2Start && range2Start <= range1End;
  const range2PartlyOverlaps = range2Start <= range1Start && range1Start <= range2End;

  if (range1Overlaps || range2Overlaps) {
    part_1 += 1;
  }
  if (range1PartlyOverlaps || range2PartlyOverlaps) {
    part_2 += 1;
  }
});

console.log(`Part 1: ${part_1}`);
console.log(`Part 2: ${part_2}`);
