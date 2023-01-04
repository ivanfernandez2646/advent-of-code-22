import Day from './classes/Day';

export default class Day8 extends Day {
  part1(): number {
    const trees: number[][] = this.inputString
      .split('\n')
      .map((a) => a.split('').map(Number));

    let currentTree: number,
      topTrees: number[] | undefined,
      rightTrees: number[] | undefined,
      bottomTrees: number[] | undefined,
      leftTrees: number[] | undefined,
      isVisible: boolean,
      countVisibleTrees: number = 0;

    for (let row = 0; row < trees.length; row++) {
      for (let column = 0; column < trees[row].length; column++) {
        currentTree = trees[row][column];
        (topTrees = (() => {
          if (trees[row - 1] === undefined) {
            return undefined;
          }

          let tmpRowCount = row,
            res: number[] = [];
          while (tmpRowCount >= 0) {
            res.push(trees[tmpRowCount][column]);
            tmpRowCount -= 1;
          }

          return res.reverse();
        })()),
          (rightTrees = (() => {
            if (trees[row][column + 1] === undefined) {
              return undefined;
            }

            let tmpColumnCount = column,
              res: number[] = [];
            while (tmpColumnCount < trees[row].length) {
              res.push(trees[row][tmpColumnCount]);
              tmpColumnCount += 1;
            }

            return res;
          })()),
          (bottomTrees = (() => {
            if (trees[row + 1] === undefined) {
              return undefined;
            }

            let tmpRowCount = row,
              res: number[] = [];
            while (tmpRowCount < trees[row].length) {
              res.push(trees[tmpRowCount][column]);
              tmpRowCount += 1;
            }

            return res;
          })()),
          (leftTrees = (() => {
            if (trees[row][column - 1] === undefined) {
              return undefined;
            }

            let tmpColumnCount = column,
              res: number[] = [];
            while (tmpColumnCount >= 0) {
              res.push(trees[row][tmpColumnCount]);
              tmpColumnCount -= 1;
            }

            return res.reverse();
          })());

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
    const trees: number[][] = this.inputString
        .split('\n')
        .map((a) => a.split('').map(Number)),
      calcMaxScenic = (
        boundTrees: number[] | undefined,
        currTree: number
      ): number => {
        if (!boundTrees) {
          return 1;
        }

        let scenic: number = 0;

        boundTrees.forEach((boundTree) => {
          if (boundTree >= currTree) {
            return;
          }
          scenic += 1;
        });

        return scenic === 0 ? 1 : scenic;
      };

    let currentTree: number,
      topTrees: number[] | undefined,
      rightTrees: number[] | undefined,
      bottomTrees: number[] | undefined,
      leftTrees: number[] | undefined,
      maxScenic: number = 0;

    for (let row = 0; row < trees.length; row++) {
      for (let column = 0; column < trees[row].length; column++) {
        currentTree = trees[row][column];
        (topTrees = (() => {
          if (trees[row - 1] === undefined) {
            return undefined;
          }

          let tmpRowCount = row,
            res: number[] = [];
          while (tmpRowCount >= 0) {
            res.push(trees[tmpRowCount][column]);
            tmpRowCount -= 1;
          }

          return res.reverse();
        })()),
          (rightTrees = (() => {
            if (trees[row][column + 1] === undefined) {
              return undefined;
            }

            let tmpColumnCount = column,
              res: number[] = [];
            while (tmpColumnCount < trees[row].length) {
              res.push(trees[row][tmpColumnCount]);
              tmpColumnCount += 1;
            }

            return res;
          })()),
          (bottomTrees = (() => {
            if (trees[row + 1] === undefined) {
              return undefined;
            }

            let tmpRowCount = row,
              res: number[] = [];
            while (tmpRowCount < trees[row].length) {
              res.push(trees[tmpRowCount][column]);
              tmpRowCount += 1;
            }

            return res;
          })()),
          (leftTrees = (() => {
            if (trees[row][column - 1] === undefined) {
              return undefined;
            }

            let tmpColumnCount = column,
              res: number[] = [];
            while (tmpColumnCount >= 0) {
              res.push(trees[row][tmpColumnCount]);
              tmpColumnCount -= 1;
            }

            return res.reverse();
          })());

        const tmpMaxScenic = [
          calcMaxScenic(topTrees ? topTrees.slice(-1) : undefined, currentTree),
          calcMaxScenic(
            leftTrees ? leftTrees.slice(-1) : undefined,
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
}
