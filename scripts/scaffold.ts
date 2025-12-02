import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import chalk from "chalk";

const [yearArg, dayArg] = process.argv.slice(2);

if (!yearArg || !dayArg) {
  console.error(chalk.red.bold("Error: Please provide a year and day."));
  console.log(chalk.white("Usage: npm run new <year> <day>"));
  process.exit(1);
}

const year = yearArg;
const day = dayArg.padStart(2, "0");
const baseDir = path.resolve(`./src/${year}/${day}`);

if (existsSync(baseDir)) {
  console.warn(chalk.yellow.bold(`⚠️  Day ${day} already exists at:`));
  console.warn(chalk.dim(baseDir));
  process.exit(0);
}

console.log(chalk.blue.bold(`\n📂 Scaffolding Day ${day} of ${year}...`));

// Create Directory
mkdirSync(baseDir, { recursive: true });

// Create the solution file
const solutionTemplate = `export const parseInput = (rawInput: string) => rawInput.split("\\n");

export const part1 = (input: string): string => {
  return "Solution 1";
};

export const part2 = (input: string): string => {
  return "Solution 2";
};
`;

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

try {
  writeFileSync(path.join(baseDir, "index.ts"), solutionTemplate.trim());
  console.log(chalk.green("  ✓ Created index.ts"));

  writeFileSync(path.join(baseDir, "index.test.ts"), testTemplate.trim());
  console.log(chalk.green("  ✓ Created index.test.ts"));

  writeFileSync(path.join(baseDir, "input.txt"), "");
  console.log(chalk.green("  ✓ Created input.txt"));

  writeFileSync(path.join(baseDir, "readme.md"), `# Day ${day}`);
  console.log(chalk.green("  ✓ Created readme.md"));

  console.log(chalk.blue.bold("\n🚀 Ready to go!"));
  console.log(chalk.dim(`   Run: npm run watch -- ${year} ${day}`));
} catch (error: any) {
  console.error(chalk.red.bold("❌ Error creating files:"));
  console.error(chalk.red(error.message));
}
