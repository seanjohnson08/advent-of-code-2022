import re
import pprint

commandParser = re.compile('^\$ (cd|ls) ?(.*)')
lsOutputParser = re.compile('^(dir|\d+) (.*)$')


class FileSystem:
    cwd = {
        'path': '/',
        'files': {},
        'dirs': {},
        'size': 0,
    }
    root = cwd

    def __init__(self):
        pass

    def cd(self, path):
        if path == '/':
            self.cwd = self.root
        else:
            self.cwd = self.cwd['dirs'][path]

    def mkdir(self, path):
        self.cwd['dirs'][path] = {
            'path': self.cwd['path'] + path + '/',
            'files': {},
            'dirs': {
                '..': self.cwd
            },
            'size': 0
        }

    def touch(self, file, size):
        self.cwd['files'][file] = size
        pointer = self.cwd
        self.root['size'] += size

        # Add size of file to all parent dirs
        while '..' in pointer['dirs']:
            pointer['size'] += size
            pointer = pointer['dirs']['..']

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

def Part1(size, dir = elfFileSystem.root):
    result = 0
    if dir['size'] <= size:
        result += dir['size']
    for cwd in dir['dirs']:
        if cwd == '..': continue
        result += Part1(size, dir['dirs'][cwd])
    return result


print('Part 1: {}'.format(Part1(100000)))