import Day1 from '../src/Day1';

describe('Day1', () => {
  it('part1', async () => {
    const day1 = new Day1();

    await day1.readInputFile(`${Day1.name}.example`);
    const result = await day1.part1();

    expect(result).toBe(24000);
  });

  it('part2', async () => {
    const day1 = new Day1();

    await day1.readInputFile(`${Day1.name}.example`);
    const result = await day1.part2();

    expect(result).toBe(45000);
  });
});
