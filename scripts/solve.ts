import { existsSync, readFileSync } from "fs";
import * as path from "path";
import chalk from "chalk";

// 1. Parse Args
const [yearArg, dayArg] = process.argv.slice(2);
if (!yearArg || !dayArg) {
  console.error(chalk.red("Error: Please provide a year and day."));
  console.log("Usage: npm run solve <year> <day>");
  process.exit(1);
}

const day = dayArg.padStart(2, "0");
const year = yearArg;

const baseDir = path.resolve(`./src/${year}/${day}`);
const solutionPath = path.join(baseDir, "index.ts");
const inputPath = path.join(baseDir, "input.txt");

// 2. Define the Shape of a Solution Module
type SolutionModule = {
  parseInput?: (raw: string) => any;
  part1?: (input: any) => any;
  part2?: (input: any) => any;
};

// Helper to colorize execution time
const formatTime = (ms: number) => {
  const timeStr = `${ms.toFixed(3)}ms`;
  if (ms < 1) return chalk.green(timeStr);
  if (ms < 1000) return chalk.yellow(timeStr);
  return chalk.red(timeStr);
};

(async () => {
  if (!existsSync(solutionPath)) {
    console.error(chalk.red(`❌ Solution file not found at: ${solutionPath}`));
    console.log(
      chalk.dim("Did you run the scaffold script? npm run new <year> <day>")
    );
    process.exit(1);
  }

  try {
    // 3. Dynamic Import (TSX handles the .ts extension automatically)
    const solution: SolutionModule = await import(`file://${solutionPath}`);

    const rawInput = readFileSync(inputPath, "utf-8");

    const input = solution.parseInput
      ? solution.parseInput(rawInput)
      : rawInput;

    console.log(
      chalk.bgBlue.bold(` 🎄 Advent of Code ${year} `) +
        chalk.bgWhite.black.bold(` Day ${day} `)
    );
    console.log(
      chalk.dim("---------------------------------------------------")
    );

    if (solution.part1) {
      const start = performance.now();
      const result = solution.part1(input);
      const time = performance.now() - start;

      console.log(chalk.cyan.bold("Part 1:"));
      console.log(chalk.white(result));
      console.log(chalk.dim(`Time: ${formatTime(time)}`));
    }

    if (solution.part2) {
      console.log(chalk.dim("-----------------")); // Line breaker - only if there is two puzzles

      const start = performance.now();
      const result = solution.part2(input);
      const time2 = performance.now() - start;

      console.log(chalk.magenta.bold("Part 2:"));
      console.log(chalk.white(result));
      console.log(chalk.dim(`Time: ${formatTime(time2)}`));
    }

    console.log(
      chalk.dim("---------------------------------------------------")
    );
  } catch (err: any) {
    console.error(chalk.red.bold("❌ Error executing solution:"));
    console.error(chalk.red(err.stack || err.message));
  }
})();
