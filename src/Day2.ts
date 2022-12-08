import Day from './classes/Day';

type AvailableLetter = 'A' | 'B' | 'C' | 'Y' | 'X' | 'Z';

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
        .map((e) => e.split(' ').map(String)),
      totalScore = this.calcScorePart1(encryptedGuide);

    return totalScore;
  }

  async part2(): Promise<number> {
    const encryptedGuide: string[][] = this.inputString
        .split('\n')
        .map((e) => e.split(' ').map(String)),
      totalScore = this.calcScorePart2(encryptedGuide);

    return totalScore;
  }

  private calcScorePart1(encryptedGuide: string[][]): number {
    return encryptedGuide
      .map((movements) => {
        const oponentShape = this.getShape(movements[0] as AvailableLetter),
          myShape = this.getShape(movements[1] as AvailableLetter),
          result = this.getResult(oponentShape, myShape);

        return result + SHAPES[myShape].score;
      })
      .reduce((prevScore, currScore) => prevScore + currScore);
  }

  private getShape(letter: AvailableLetter): Shape {
    switch (letter) {
      case 'A':
      case 'X':
        return 'ROCK';
      case 'B':
      case 'Y':
        return 'PAPER';
      case 'C':
      case 'Z':
        return 'SCISSORS';
      default:
        throw new Error(`getShape(). letter is invalid <${letter}>`);
    }
  }

  private getResult(openentShape: Shape, myShape: Shape): RESULT {
    if (SHAPES[openentShape].defeats === myShape) {
      return RESULT.LOSE;
    } else if (SHAPES[myShape].defeats === openentShape) {
      return RESULT.WIN;
    }

    return RESULT.DRAW;
  }

  private calcScorePart2(encryptedGuide: string[][]): number {
    return encryptedGuide
      .map((movements) => {
        const oponentShape = this.getShape(movements[0] as AvailableLetter),
          neededResult = this.getNeededResult(movements[1] as AvailableLetter),
          neededShape = this.getNeededShape(oponentShape, neededResult);

        return neededResult + SHAPES[neededShape].score;
      })
      .reduce((prevScore, currScore) => prevScore + currScore);
  }

  private getNeededResult(letter: AvailableLetter): RESULT {
    switch (letter) {
      case 'Y':
        return RESULT.DRAW;
      case 'X':
        return RESULT.LOSE;
      case 'Z':
        return RESULT.WIN;
      default:
        throw new Error(`getNeededResult(). letter is invalid <${letter}>`);
    }
  }

  private getNeededShape(oponentShape: Shape, neededResult: RESULT): Shape {
    switch (neededResult) {
      case RESULT.WIN:
        return Object.entries(SHAPES).find(
          ([key, value]) => value.defeats === oponentShape
        )?.[0] as Shape;
      case RESULT.DRAW:
        return oponentShape;
      case RESULT.LOSE:
        return Object.entries(SHAPES).find(
          ([key, value]) =>
            value.defeats !== oponentShape && key !== oponentShape
        )?.[0] as Shape;
      default:
        throw new Error(
          `getNeededShape(). neededResult is invalid <${neededResult}>`
        );
    }
  }
}
