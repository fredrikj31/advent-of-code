export const parseInput = (rawInput: string) => rawInput.split("\n");

// Custom implementation of the modulus operator to handle negative numbers
const mod = (n: number, m: number) => ((n % m) + m) % m;

export const part1 = (input: string[]): number => {
  let startDial = 50;

  let numberOfZeros = 0;
  for (const line of input) {
    const direction = line.split("", 1)[0];
    const dialCount = parseInt(line.replaceAll(/L|R/g, ""));

    if (direction === "R") {
      startDial = mod(startDial + dialCount, 100);
    } else if (direction === "L") {
      startDial = mod(startDial - dialCount, 100);
    } else {
      continue;
    }
    if (startDial === 0) numberOfZeros++;
  }

  return numberOfZeros;
};
