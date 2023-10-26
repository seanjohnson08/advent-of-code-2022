import * as deepcopy from 'deepcopy';

// [T]             [P]     [J]
// [F]     [S]     [T]     [R]     [B]
// [V]     [M] [H] [S]     [F]     [R]
// [Z]     [P] [Q] [B]     [S] [W] [P]
// [C]     [Q] [R] [D] [Z] [N] [H] [Q]
// [W] [B] [T] [F] [L] [T] [M] [F] [T]
// [S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
// [Q] [Q] [B] [D] [J] [W] [H] [R] [J]
//  1   2   3   4   5   6   7   8   9

const stacks: string[][] = [
    ['Q', 'S', 'W', 'C', 'Z', 'V', 'F', 'T'],
    ['Q', 'R', 'B'],
    ['B', 'Z', 'T', 'Q', 'P', 'M', 'S'],
    ['D', 'V', 'F', 'R', 'Q', 'H'],
    ['J', 'G', 'L', 'D', 'B', 'S', 'T', 'P'],
    ['W', 'R', 'T', 'Z'],
    ['H', 'Q', 'M', 'N', 'S', 'F', 'R', 'J'],
    ['R', 'N', 'F', 'H', 'W'],
    ['J', 'Z', 'T', 'Q', 'P', 'R', 'B']
];
const stacks2 = deepcopy(stacks);

const lineParser = /move (\d+) from (\d+) to (\d+)/;

const instructions: number[][] = [];
// Read instructions from file
// ...

// Part 1
for (const [quantity, stack1, stack2] of instructions) {
    for (let i = 0; i < quantity; i++) {
        stacks[stack2 - 1].push(stacks[stack1 - 1].pop());
    }
}

// Part 2
for (const [quantity, stack1, stack2] of instructions) {
    stacks2[stack2 - 1].push(...stacks2[stack1 - 1].slice(-quantity));
    stacks2[stack1 - 1].splice(-quantity);
}

console.log(`Part 1: ${stacks.map(stack => stack[stack.length - 1]).join('')}`);
console.log(`Part 2: ${stacks2.map(stack => stack[stack.length - 1]).join('')}`);