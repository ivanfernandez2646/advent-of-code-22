import Day from './classes/Day';

export default class Day8 extends Day {
  private trees: number[][] = [];

  part1(): number {
    this.trees = this.inputString
      .split('\n')
      .map((a) => a.split('').map(Number));

    let countVisibleTrees: number = 0;

    for (let row = 0; row < this.trees.length; row++) {
      for (let column = 0; column < this.trees[row].length; column++) {
        const currentTree = this.trees[row][column],
          { topTrees, rightTrees, bottomTrees, leftTrees } = this.getTrees(
            row,
            column
          ),
          isVisible =
            [topTrees, rightTrees, bottomTrees, leftTrees].some(
              (boundTrees) => boundTrees === undefined
            ) ||
            [topTrees, leftTrees, bottomTrees, rightTrees]
              .filter((boundTrees) => boundTrees !== undefined)
              .some((boundTrees) => {
                return boundTrees!.filter((t) => t >= currentTree).length <= 1;
              });

        if (isVisible) {
          countVisibleTrees += 1;
        }
      }
    }

    return countVisibleTrees;
  }

  part2(): number {
    this.trees = this.inputString
      .split('\n')
      .map((a) => a.split('').map(Number));

    const calcMaxScenic = (
      boundTrees: number[] | undefined,
      currTree: number
    ): number => {
      if (!boundTrees) {
        return 1;
      }

      let scenic: number = 0;

      boundTrees.every((boundTree) => {
        if (currTree <= boundTree) {
          scenic += 1;
          return false;
        } else {
          scenic += 1;
        }
        return true;
      });

      return scenic === 0 ? 1 : scenic;
    };

    let maxScenic: number = 0;

    for (let row = 0; row < this.trees.length; row++) {
      for (let column = 0; column < this.trees[row].length; column++) {
        const currentTree = this.trees[row][column],
          { topTrees, rightTrees, bottomTrees, leftTrees } = this.getTrees(
            row,
            column
          ),
          isInEdge = [topTrees, rightTrees, bottomTrees, leftTrees].some(
            (boundTrees) => boundTrees === undefined
          );

        if (isInEdge) {
          continue;
        }

        const tmpMaxScenic = [
          calcMaxScenic(
            topTrees ? topTrees.slice(0, -1).reverse() : undefined,
            currentTree
          ),
          calcMaxScenic(
            leftTrees ? leftTrees.slice(0, -1).reverse() : undefined,
            currentTree
          ),
          calcMaxScenic(
            bottomTrees ? bottomTrees.slice(1) : undefined,
            currentTree
          ),
          calcMaxScenic(
            rightTrees ? rightTrees.slice(1) : undefined,
            currentTree
          ),
        ].reduce((prev, curr) => prev * curr);

        if (tmpMaxScenic > maxScenic) {
          maxScenic = tmpMaxScenic;
        }
      }
    }

    return maxScenic;
  }

  private getTrees(
    row: number,
    column: number
  ): {
    topTrees: number[] | undefined;
    rightTrees: number[] | undefined;
    bottomTrees: number[] | undefined;
    leftTrees: number[] | undefined;
  } {
    const topTrees = (() => {
        if (this.trees[row - 1] === undefined) {
          return undefined;
        }

        let tmpRowCount = row,
          res: number[] = [];
        while (tmpRowCount >= 0) {
          res.push(this.trees[tmpRowCount][column]);
          tmpRowCount -= 1;
        }

        return res.reverse();
      })(),
      rightTrees = (() => {
        if (this.trees[row][column + 1] === undefined) {
          return undefined;
        }

        let tmpColumnCount = column,
          res: number[] = [];
        while (tmpColumnCount < this.trees[row].length) {
          res.push(this.trees[row][tmpColumnCount]);
          tmpColumnCount += 1;
        }

        return res;
      })(),
      bottomTrees = (() => {
        if (this.trees[row + 1] === undefined) {
          return undefined;
        }

        let tmpRowCount = row,
          res: number[] = [];
        while (tmpRowCount < this.trees[row].length) {
          res.push(this.trees[tmpRowCount][column]);
          tmpRowCount += 1;
        }

        return res;
      })(),
      leftTrees = (() => {
        if (this.trees[row][column - 1] === undefined) {
          return undefined;
        }

        let tmpColumnCount = column,
          res: number[] = [];
        while (tmpColumnCount >= 0) {
          res.push(this.trees[row][tmpColumnCount]);
          tmpColumnCount -= 1;
        }

        return res.reverse();
      })();

    return { topTrees, rightTrees, bottomTrees, leftTrees };
  }
}
