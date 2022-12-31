import Day7 from '../src/Day7';

describe('Day7', () => {
  it('part1', async () => {
    const day7 = new Day7();

    await day7.readInputFile(`${Day7.name}.example`);
    const result = day7.part1();

    expect(result).toBe(95437);
  });

  it('part2', async () => {
    const day7 = new Day7();

    await day7.readInputFile(`${Day7.name}.example`);
    const result = day7.part2();

    expect(result).toBe(24933642);
  });
});
