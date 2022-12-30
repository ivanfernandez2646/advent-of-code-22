import Day from './classes/Day';

type Directory = {
  name: string;
  size: number;
};

// TODO: refactor and clean code
export default class Day7 extends Day {
  private directories: Directory[] = [];

  part1(): number {
    const commands: string[] = this.inputString.split('\n'),
      directoriesSize: Map<string, number> = new Map<string, number>();

    let directoriesStack: string[] = [];
    let currentDirectoryName: string = directoriesStack
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
        const innerDirectories = arr.filter(
          (d) => d.name.startsWith(directory.name) && d.name !== directory.name
        );

        let innerDirectoriesSize: number = 0;

        if (innerDirectories && innerDirectories.length > 0) {
          innerDirectoriesSize = innerDirectories
            .map((iD) => iD.size)
            .reduce((prev, curr) => prev + curr);
        }

        return {
          name: directory.name,
          size: directory.size + innerDirectoriesSize,
        };
      })
    );

    return this.directories
      .filter((d) => d.size <= 100000)
      .map((d) => d.size)
      .reduce((prev, curr) => prev + curr);
  }

  // // TODO: remove duplicated code
  // part2(): number {
  //   this.part1();

  //   const neededSizeToDeleted = 8381165;

  //   console.log(this.directories);

  //   return this.directories
  //     .filter((d) => d.size >= neededSizeToDeleted)
  //     .sort((a, b) => a.size - b.size)
  //     .shift()!.size;
  // }
}
