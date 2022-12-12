import Day from "./classes/Day";

export default class Day6 extends Day {
  part1(): number {
    const packets: string[] = this.inputString.split("");
    const res: number = this.getResult(packets, 4);
    return res;
  }

  part2(): number {
    const packets: string[] = this.inputString.split("");
    const res: number = this.getResult(packets, 14);
    return res;
  }

  private getResult(packets: string[], subroutineCriteria: number): number {
    for (let i = 0; i < packets.length; i++) {
      const nextFourValues = packets.slice(i, i + subroutineCriteria);
      if (
        Array.from(new Set(nextFourValues)).length === nextFourValues.length
      ) {
        return i + subroutineCriteria;
      }
    }

    return 0;
  }
}
