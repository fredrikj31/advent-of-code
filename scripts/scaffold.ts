import * as fs from "fs";
import * as path from "path";

// 1. Parse Args
const [yearArg, dayArg] = process.argv.slice(2);
if (!yearArg || !dayArg) {
  console.error(
    "Usage: npm run scaffold -- <year> <day>. Example: pnpm run -- scaffold 2025 01"
  );
  process.exit(1);
}

const day = dayArg.padStart(2, "0");
const targetDir = path.resolve(`./src/${yearArg}/${day}`);

if (fs.existsSync(targetDir)) {
  console.log(`Day ${day} already exists!`);
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

// Create empty input files
fs.writeFileSync(path.join(targetDir, "input.txt"), "");
fs.writeFileSync(path.join(targetDir, "example.txt"), "");

// Create the solution file
const solutionTemplate = `export const parseInput = (rawInput: string) => rawInput.split("\\n");

export const part1 = (input: string): string => {
  return "Solution 1";
};

export const part2 = (input: string): string => {
  return "Solution 2";
};
`;
fs.writeFileSync(path.join(targetDir, "index.ts"), solutionTemplate);

// Create the test file
const testTemplate = `import { part1, part2 } from './index';

describe('${yearArg} Day ${day}', () => {
  test('Part 1', () => {
    expect(part1('example input')).toBe("Solution 1");
  });

  test('Part 2', () => {
    expect(part2('example input')).toBe("Solution 2");
  });
});
`;
fs.writeFileSync(path.join(targetDir, "index.test.ts"), testTemplate);

console.log(`Created template for Year ${yearArg} Day ${day}`);
