import Day from './classes/Day';

export default class Day4 extends Day {
  part1(): number {
    const allSections: string[] = this.inputString.split('\n');

    const fullyContainPairs = allSections
      .map((section) => {
        const [elf1Start, elf1End] = section
            .split(',')[0]
            .split('-')
            .map(Number),
          [elf2Start, elf2End] = section.split(',')[1].split('-').map(Number),
          elf1Range = this.generateArrayFromBounds(elf1Start, elf1End),
          elf2Range = this.generateArrayFromBounds(elf2Start, elf2End),
          rangeWithoutDuplicates = Array.from(
            new Set(elf1Range.concat(elf2Range))
          ).sort((range1, range2) => range1 - range2);

        if (
          JSON.stringify(elf1Range) ===
            JSON.stringify(rangeWithoutDuplicates) ||
          JSON.stringify(elf2Range) === JSON.stringify(rangeWithoutDuplicates)
        ) {
          return 1 as number;
        }

        return 0 as number;
      })
      .reduce((prevValue, currValue) => prevValue + currValue);

    return fullyContainPairs;
  }

  part2(): number {
    const allSections: string[] = this.inputString.split('\n');

    const fullyOverlapPairs = allSections
      .map((section) => {
        const [elf1Start, elf1End] = section
            .split(',')[0]
            .split('-')
            .map(Number),
          [elf2Start, elf2End] = section.split(',')[1].split('-').map(Number),
          elf1Range = this.generateArrayFromBounds(elf1Start, elf1End),
          elf2Range = this.generateArrayFromBounds(elf2Start, elf2End),
          rangeWithoutDuplicates = Array.from(
            new Set(elf1Range.concat(elf2Range))
          ).sort((range1, range2) => range1 - range2);

        if (
          JSON.stringify(elf1Range) ===
            JSON.stringify(rangeWithoutDuplicates) ||
          JSON.stringify(elf2Range) ===
            JSON.stringify(rangeWithoutDuplicates) ||
          (elf2Start >= elf1Start && elf2Start <= elf1End) ||
          (elf1Start >= elf2Start && elf1Start <= elf2End)
        ) {
          return 1 as number;
        }

        return 0 as number;
      })
      .reduce((prevValue, currValue) => prevValue + currValue);

    return fullyOverlapPairs;
  }

  private generateArrayFromBounds(start: number, end: number): number[] {
    const result = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }
}
