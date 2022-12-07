import Day from './classes/Day';

type Shapes = {
  [key in 'PAPER' | 'ROCK' | 'SCISSORS']: {
    score: number;
    defeats: keyof Shapes;
  };
};

type Shape = keyof typeof SHAPES;

const SHAPES: Shapes = {
  ROCK: { score: 1, defeats: 'SCISSORS' },
  PAPER: { score: 2, defeats: 'ROCK' },
  SCISSORS: { score: 3, defeats: 'PAPER' },
};

enum RESULT {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

export default class Day2 extends Day {
  async part1(): Promise<number> {
    const encryptedGuide: string[][] = this.inputString
      .split('\n')
      .map((e) => e.split(' ').map(String));

    const totalScore = this.calcScore(encryptedGuide);

    return totalScore;
  }

  async part2(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  private calcScore(encryptedGuide: string[][]): number {
    return encryptedGuide
      .map((movements) => {
        const oponentShape = this.getShape(movements[0]);
        const myShape = this.getShape(movements[1]);

        const result = this.getResult(oponentShape, myShape);
        return result + SHAPES[myShape].score;
      })
      .reduce((prevScore, currScore) => prevScore + currScore);
  }

  private getShape(values: string): Shape {
    if (values === 'A' || values === 'X') {
      return 'ROCK';
    } else if (values === 'B' || values === 'Y') {
      return 'PAPER';
    }

    return 'SCISSORS';
  }

  private getResult(openentShape: Shape, myShape: Shape): RESULT {
    if (SHAPES[openentShape].defeats === myShape) {
      return RESULT.LOSE;
    } else if (SHAPES[myShape].defeats === openentShape) {
      return RESULT.WIN;
    }

    return RESULT.DRAW;
  }
}
