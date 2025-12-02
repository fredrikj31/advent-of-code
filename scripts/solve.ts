import { existsSync, readFileSync } from "fs";
import * as path from "path";

// 1. Parse Args
const [yearArg, dayArg] = process.argv.slice(2);
if (!yearArg || !dayArg) {
  console.error(
    "Usage: npm run solve <year> <day>. Example: pnpm run solve 2025 01"
  );
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

(async () => {
  if (!existsSync(solutionPath)) {
    console.error(`Solution not found: ${solutionPath}`);
    process.exit(1);
  }

  // 3. Dynamic Import (TSX handles the .ts extension automatically)
  const solution: SolutionModule = await import(`file://${solutionPath}`);
  const rawInput = readFileSync(inputPath, "utf-8");

  const input = solution.parseInput ? solution.parseInput(rawInput) : rawInput;

  console.log(`🎄 ${year} Day ${day} 🎄`);
  console.log("-------------------------");

  if (solution.part1) {
    const start1 = performance.now();
    console.log("Part 1:");
    console.log("Output:", JSON.stringify(solution.part1(input)));
    console.log(`(Time: ${(performance.now() - start1).toFixed(2)}ms)`);
  }

  if (solution.part2) {
    console.log("-------------------------"); // Line breaker - only if there is two puzzles

    const start2 = performance.now();
    console.log("Part 2:");
    console.log("Output:", JSON.stringify(solution.part2(input)));
    console.log(`(Time: ${(performance.now() - start2).toFixed(2)}ms)`);
  }
})();
