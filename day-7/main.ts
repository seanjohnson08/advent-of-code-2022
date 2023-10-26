import * as re from 're';

class Directory {
    files: { [key: string]: number };
    dirs: { [key: string]: Directory };
    size: number;

    constructor() {
        this.files = {};
        this.dirs = {};
        this.size = 0;
    }
}

class FileSystem {
    cwd: Directory;
    root: Directory;

    constructor() {
        this.cwd = new Directory();
        this.root = this.cwd;
    }

    cd(path: string): void {
        if (path === '/') {
            this.cwd = this.root;
        } else {
            this.cwd = this.cwd.dirs[path];
        }
    }

    mkdir(path: string): void {
        const newDir = new Directory();
        newDir.dirs['..'] = this.cwd;
        this.cwd.dirs[path] = newDir;
    }

    touch(file: string, size: number): void {
        this.cwd.files[file] = size;
        let pointer = this.cwd;
        this.root.size += size;

        // Add size of file to all parent dirs
        while (pointer !== this.root) {
            pointer.size += size;
            pointer = pointer.dirs['..'];
        }
    }
}

const elfFileSystem = new FileSystem();
let readLSOutput = false;

// Read input file
const input = `...`; // Replace with the contents of the input file

const lines = input.split('\n');
for (const line of lines) {
    const trimmedLine = line.trim();

    if (readLSOutput) {
        const match = lsOutputParser.match(trimmedLine);
        if (match) {
            if (match.group(1) === 'dir') {
                elfFileSystem.mkdir(match.group(2));
            } else {
                elfFileSystem.touch(match.group(2), parseInt(match.group(1)));
            }
            continue;
        } else {
            readLSOutput = false;
        }
    }

    if (trimmedLine.startsWith('$')) {
        const [command, arg] = commandParser.match(trimmedLine).groups();

        if (command === 'cd') {
            elfFileSystem.cd(arg);
        } else if (command === 'ls') {
            readLSOutput = true;
        }
    }
}

const bytesToRemove = 30000000 - (70000000 - elfFileSystem.root.size);
let part2Answer = 30000000;

function traverse(size: number, dir: Directory = elfFileSystem.root): number {
    if (dir.size >= bytesToRemove && dir.size < part2Answer) {
        part2Answer = dir.size;
    }
    let result = 0;
    if (dir.size <= size) {
        result += dir.size;
    }
    for (const cwd in dir.dirs) {
        if (cwd === '..') continue;
        result += traverse(size, dir.dirs[cwd]);
    }
    return result;
}

console.log(`Part 1: ${traverse(100000)}`);
console.log(`Part 2: ${part2Answer} - bytes to remove: ${bytesToRemove}`);