import re

commandParser = re.compile('^\$ (cd|ls) ?(.*)')
lsOutputParser = re.compile('^(dir|\d+) (.*)$')

class Directory:
    def __init__(self):
        self.files = {}
        self.dirs = {}
        self.size = 0

class FileSystem:
    cwd = Directory()
    root = cwd

    def cd(self, path):
        if path == '/':
            self.cwd = self.root
        else:
            self.cwd = self.cwd.dirs[path]

    def mkdir(self, path):
        newDir = Directory()
        newDir.dirs['..'] = self.cwd
        self.cwd.dirs[path] = newDir

    def touch(self, file, size):
        self.cwd.files[file] = size
        pointer = self.cwd
        self.root.size += size

        # Add size of file to all parent dirs
        while pointer != self.root:
            pointer.size += size
            pointer = pointer.dirs['..']

elfFileSystem = FileSystem()
readLSOutput = False

with open('input', 'r') as file:
    for line in file:
        line = line.rstrip()

        if readLSOutput:
            match = lsOutputParser.match(line)
            if (match):
                if match.group(1) == 'dir':
                    elfFileSystem.mkdir(match.group(2))
                else:
                    elfFileSystem.touch(match.group(2), int(match.group(1)))

                continue
            else:
                readLSOutput = False

        if line[0] == '$':
            [command, arg] = commandParser.match(line).groups()

            if command == 'cd':
                elfFileSystem.cd(arg)
            elif command == 'ls':
                readLSOutput = True


bytesToRemove = 30000000 - (70000000 - elfFileSystem.root.size)
part2Answer = 30000000

def Traverse(size, dir = elfFileSystem.root):
    global part2Answer
    result = 0
    if dir.size >= bytesToRemove and dir.size < part2Answer:
        part2Answer = dir.size
    if dir.size <= size:
        result += dir.size
    for cwd in dir.dirs:
        if cwd == '..': continue
        result += Traverse(size, dir.dirs[cwd])
    return result


print('Part 1: {}'.format(Traverse(100000)))
print('Part 2: {} - bytes to remove: {}'.format(part2Answer, bytesToRemove))