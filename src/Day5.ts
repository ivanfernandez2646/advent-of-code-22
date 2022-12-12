import Day from "./classes/Day";

type Step = {
  move: number;
  from: number;
  to: number;
};

export default class Day5 extends Day {
  part1(): string {
    const [stacksString, stepsString] = this.inputString.split(
      new RegExp(/^(?:[\t ]*(?:\r?\n|\r))+/gm)
    );

    const stacksMap = this.getStacks(stacksString);
    const steps = this.getSteps(stepsString);

    // reorder items
    steps.forEach((s) => {
      const itemsToMove: string[] = stacksMap
        .get(s.from)!
        .splice(0, s.move)
        .reverse() as string[];
      stacksMap.get(s.to)!.unshift(...itemsToMove);
    });

    // get final string result
    let result: string = "";
    for (let i = 1; i <= stacksMap.size; i++) {
      result += stacksMap.get(i)![0];
    }

    return result;
  }

  part2(): string {
    const [stacksString, stepsString] = this.inputString.split(
      new RegExp(/^(?:[\t ]*(?:\r?\n|\r))+/gm)
    );

    const stacksMap = this.getStacks(stacksString);
    const steps = this.getSteps(stepsString);

    // reorder items
    steps.forEach((s) => {
      const itemsToMove: string[] = stacksMap
        .get(s.from)!
        .splice(0, s.move) as string[];
      stacksMap.get(s.to)!.unshift(...itemsToMove);
    });

    // get final string result
    let result: string = "";
    for (let i = 1; i <= stacksMap.size; i++) {
      result += stacksMap.get(i)![0];
    }

    return result;
  }

  private getStacks(stacksString: string): Map<number, string[]> {
    const resultMap = new Map<number, string[]>();
    stacksString
      .split("\n")
      .filter((v) => isNaN(v as unknown as number) || v === " " || v === "\n")
      .slice(0, -1)
      .map((v) => v.trimEnd().replace(/\s{4}|\s{1}/gm, "x"))
      .slice(0)
      .forEach((v) => {
        const withoutBoxBrackets = v.replace(/\[|\]/g, "");
        const values = withoutBoxBrackets.split("x");
        values.forEach((v, index) => {
          if (v) {
            if (resultMap.has(index + 1)) {
              resultMap.get(index + 1)!.push(v);
            } else {
              resultMap.set(index + 1, [v]);
            }
          }
        });
      });

    return resultMap;
  }

  private getSteps(stepsString: string): Step[] {
    return stepsString.split("\n").map((v) => {
      const values = v.match(/\d+/gm)!.map(Number) as unknown as number[];
      return { move: values[0], from: values[1], to: values[2] };
    });
  }
}
