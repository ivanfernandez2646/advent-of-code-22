import Day5 from "../src/Day5";

describe("Day5", () => {
  it("part1", async () => {
    const day5 = new Day5();

    await day5.readInputFile(`${Day5.name}.example`);
    const result = day5.part1();

    expect(result).toBe("CMZ");
  });

  it("part2", async () => {
    const day5 = new Day5();

    await day5.readInputFile(`${Day5.name}`);
    const result = day5.part2();

    expect(result).toBe("MCD");
  });
});
