import { parseInput, part1, part2 } from ".";

describe("Day 01 (1) - Trebuchet?!", () => {
  it("should return correct sum of combined numbers", () => {
    const input = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";

    const result = part1(parseInput(input));

    expect(result).toBe(142);
  });
});

describe("Day 01 (2) - Trebuchet?!", () => {
  it("should return correct sum of combined numbers", () => {
    const input =
      "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";

    const result = part2(parseInput(input));

    expect(result).toBe(281);
  });
});
