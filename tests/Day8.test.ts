import Day8 from '../src/Day8';

describe('Day8', () => {
  it('part1', async () => {
    const day8 = new Day8();

    await day8.readInputFile(`${Day8.name}.example`);
    const result = day8.part1();

    expect(result).toBe(21);
  });

  it('part2', async () => {
    const day8 = new Day8();

    await day8.readInputFile(`${Day8.name}.example`);
    const result = day8.part2();

    expect(result).toBe(8);
  });
});
