import Day2 from '../src/Day2';

describe('Day2', () => {
  it('part1', async () => {
    const day2 = new Day2();

    await day2.readInputFile(`${Day2.name}.example`);
    const result = await day2.part1();

    expect(result).toBe(15);
  });

  it('part2', async () => {
    const day2 = new Day2();

    await day2.readInputFile(`${Day2.name}.example`);
    const result = await day2.part2();

    expect(result).toBe(12);
  });
});
