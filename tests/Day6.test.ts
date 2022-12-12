import Day6 from "../src/Day6";

describe("Day6", () => {
  it("part1", async () => {
    const day6 = new Day6();

    await day6.readInputFile(`${Day6.name}.example`);
    const result = day6.part1();

    expect(result).toBe(10);
  });

  it("part2", async () => {
    const day6 = new Day6();

    await day6.readInputFile(`${Day6.name}.example`);
    const result = day6.part2();

    expect(result).toBe(29);
  });
});
