import Day4 from '../src/Day4';

describe('Day4', () => {
  it('part1', async () => {
    const day4 = new Day4();

    await day4.readInputFile(`${Day4.name}.example`);
    const result = day4.part1();

    expect(result).toBe(2);
  });

  it('part2', async () => {
    const day4 = new Day4();

    await day4.readInputFile(`${Day4.name}.example`);
    const result = day4.part2();

    expect(result).toBe(4);
  });
});
