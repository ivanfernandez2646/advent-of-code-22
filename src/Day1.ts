import Day from './classes/Day';

export default class Day1 extends Day {
  async part1(): Promise<number> {
    const elfsCalories: number[][] = this.inputString
      .split('\n\n')
      .map((e) => e.split('\n').map(Number));

    let maxElfCalories: number = 0;

    for (const elfCalories of elfsCalories) {
      const sumElfCalories = elfCalories.reduce(
        (prevCalories, currCalory) => prevCalories + currCalory
      );

      if (sumElfCalories > maxElfCalories) {
        maxElfCalories = sumElfCalories;
      }
    }

    return maxElfCalories;
  }

  async part2(): Promise<number> {
    const elfsCalories: number[][] = this.inputString
      .split('\n\n')
      .map((e) => e.split('\n').map(Number));

    const allCalories: number[] = [];

    for (const elfCalories of elfsCalories) {
      allCalories.push(
        elfCalories.reduce(
          (prevCalories, currCalorie) => prevCalories + currCalorie
        )
      );
    }

    const threeMaxElfCalories: number = allCalories
      .sort((a, b) => (a > b ? -1 : 1))
      .splice(0, 3)
      .reduce(
        (prevElfCalories, currElfCalories) => prevElfCalories + currElfCalories
      );

    return threeMaxElfCalories;
  }
}
