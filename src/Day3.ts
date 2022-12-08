import Day from './classes/Day';

export default class Day3 extends Day {
  part1(): number {
    const rucksacks: string[][] = this.inputString
        .split('\n')
        .map((r) => Array.from(r)),
      sumOfPriorities: number = rucksacks
        .map((rucksack) => {
          const firstPart = Array.from(rucksack.slice(0, rucksack.length / 2)),
            secondPart = Array.from(rucksack.slice(rucksack.length / 2)),
            uniqueCharRepeated = firstPart.find((l) => secondPart.includes(l))!;

          return this.getNumberByCharUsingCriteria(uniqueCharRepeated);
        })
        .reduce((prevPriority, currPriority) => prevPriority + currPriority);

    return sumOfPriorities;
  }

  part2(): number {
    const rucksacks: string[][] = this.inputString
      .split('\n')
      .map((r) => Array.from(r));

    const elfGroups: string[][][] = rucksacks
      .map((r, index, arr) =>
        index % 3 === 0 ? arr.slice(index, index + 3) : undefined
      )
      .filter((r) => !!r) as string[][][];

    const sumOfPriorities: number = elfGroups
      .map((group) => {
        const uniqueCharRepeatedInGroup = group[0].find(
          (character) =>
            group[1].includes(character) && group[2].includes(character)
        )!;

        return this.getNumberByCharUsingCriteria(uniqueCharRepeatedInGroup);
      })
      .reduce((prevPriority, currPriority) => prevPriority + currPriority);

    return sumOfPriorities;
  }

  private getNumberByCharUsingCriteria(character: string): number {
    if (this.isLowerCase(character)) {
      return character.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
      return character.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 27;
    }
  }

  private isLowerCase(character: string): boolean {
    return character.toLowerCase() === character;
  }
}
