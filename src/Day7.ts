import Day from './classes/Day';

type Directory = {
  name: string;
  size: number;
};

export default class Day7 extends Day {
  private directories: Directory[] = [];

  part1(): number {
    const commands: string[] = this.inputString.split('\n'),
      directoriesSize: Map<string, number> = new Map<string, number>();

    let directoriesStack: string[] = [],
      currentDirectoryName: string = directoriesStack
        .join('/')
        .replace('//', '/');

    commands.forEach((command) => {
      if (command === '$ cd ..') {
        directoriesStack.pop();
        currentDirectoryName = directoriesStack.join('/').replace('//', '/');
      } else if (command.startsWith('$ cd')) {
        directoriesStack.push(command.split(' ')[2]);
        currentDirectoryName = directoriesStack.join('/').replace('//', '/');

        if (!directoriesSize.has(currentDirectoryName)) {
          directoriesSize.set(currentDirectoryName, 0);
        }
      } else if (command.startsWith('dir')) {
        const dirName = currentDirectoryName
          .concat(`/${command.split(' ')[1]}`)
          .replace('//', '/');

        if (!directoriesSize.has(dirName)) {
          directoriesSize.set(dirName, 0);
        }
      } else if (/^\d/.test(command)) {
        const currDirectorySize = directoriesSize.get(currentDirectoryName);

        if (currDirectorySize !== undefined) {
          directoriesSize.set(
            currentDirectoryName,
            currDirectorySize + Number(command.split(' ')[0])
          );
        }
      }
    });

    this.directories.push(
      ...Array.from(directoriesSize, ([name, size]) => ({
        name,
        size,
      })).map((directory, index, arr) => {
        const subDirectories = arr.filter(
          (d) => d.name.startsWith(directory.name) && d.name !== directory.name
        );

        let subDirectoriesSize: number = 0;

        if (subDirectories && subDirectories.length > 0) {
          subDirectoriesSize = subDirectories
            .map((subDirectory) => subDirectory.size)
            .reduce((prevSize, currSize) => prevSize + currSize);
        }

        return {
          name: directory.name,
          size: directory.size + subDirectoriesSize,
        };
      })
    );

    return this.directories
      .filter((d) => d.size <= 100000)
      .map((d) => d.size)
      .reduce((prev, curr) => prev + curr);
  }

  part2(): number {
    this.part1();

    const neededSizeToBeDeleted =
      30000000 -
      (70000000 - this.directories.find((d) => d.name === '/')!.size);

    return this.directories
      .filter((d) => d.size >= neededSizeToBeDeleted)
      .sort((a, b) => a.size - b.size)
      .shift()!.size;
  }
}
