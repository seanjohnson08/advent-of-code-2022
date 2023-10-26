const startMarkerLength: number = 4;
const endMarkerLength: number = 14;

let start: number | false = false;
let end: number | false = false;

const fs = require('fs');
const stream: string = fs.readFileSync('input', 'utf-8');

for (let i = startMarkerLength - 1; i < stream.length; i++) {
  // Find start marker
  if (!start && new Set(stream.slice(i - startMarkerLength + 1, i + 1)).size === startMarkerLength) {
    start = i;
  }

  // Find end marker
  if (!end && i > endMarkerLength && new Set(stream.slice(i - endMarkerLength + 1, i + 1)).size === endMarkerLength) {
    end = i;
    break;
  }
}

console.log(`Part 1: ${start}`);
console.log(`Part 2: ${end}`);
