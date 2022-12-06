import { readFile } from 'fs/promises';

export default abstract class Day {
  static readonly INPUT_BASE_PATH = 'src/inputs/<day>.txt';

  private _inputString!: string;

  protected get inputString(): String {
    return new String(this._inputString);
  }

  constructor() {
    this._inputString = '';
  }

  async readInputFile(day: string) {
    try {
      const result = await readFile(Day.INPUT_BASE_PATH.replace('<day>', day), {
        encoding: 'utf8',
      });
      this._inputString = result;
    } catch (ex) {
      console.error('Error reading file: ', ex);
      this._inputString = JSON.stringify(ex);
    }
  }

  protected abstract part1(): Promise<any>;

  protected abstract part2(): Promise<any>;
}
