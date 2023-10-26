function getPriority(item: string): number {
  const charCode = item.charCodeAt(0);
  if (97 <= charCode && charCode <= 122) {
    return charCode - 96;
  } else if (65 <= charCode && charCode <= 90) {
    return charCode - 38;
  }
  return 0;
}

let part_1 = 0;
const input = Deno.readTextFileSync('input');
const lines = input.split('\n');
for (const line of lines) {
  const stripped = line.trim();
  const midpoint = Math.floor(stripped.length / 2);
  const comp1 = new Set(stripped.slice(0, midpoint));
  const comp2 = new Set(stripped.slice(midpoint));
  const duplicateItem = Array.from(comp1).filter(item => comp2.has(item))[0];
  part_1 += getPriority(duplicateItem);
}

console.log(`Part 1: ${part_1}`);

let part_2 = 0;
for (let i = 0; i < lines.length; i += 3) {
  const line1 = lines[i].trim();
  const line2 = lines[i + 1]?.trim();
  const line3 = lines[i + 2]?.trim();
  if (line1 && line2 && line3) {
    const badge = Array.from(new Set(line1)).filter(item => line2.includes(item) && line3.includes(item))[0];
    part_2 += getPriority(badge);
  }
}

console.log(`Part 2: ${part_2}`);
