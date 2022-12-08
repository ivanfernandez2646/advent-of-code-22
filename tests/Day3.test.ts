import Day3 from '../src/Day3';

describe('Day3', () => {
  it('part1', async () => {
    const day3 = new Day3();

    await day3.readInputFile(`${Day3.name}.example`);
    const result = day3.part1();

    expect(result).toBe(157);
  });

  it('part2', async () => {
    const day3 = new Day3();

    await day3.readInputFile(`${Day3.name}.example`);
    const result = day3.part2();

    expect(result).toBe(70);
  });
});
