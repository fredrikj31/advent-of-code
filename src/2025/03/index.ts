export const parseInput = (rawInput: string) => rawInput.split("\n");

export const part1 = (input: string[]): number => {
  const totalJoltage: number[] = [];

  for (const line of input) {
    const parsedLine: number[] = line
      .split("")
      .map((character) => parseInt(character));

    // Find first largest number and their index;
    let largestNumber = 0;
    let largestNumberIndex = -1;

    for (let index = 0; index < parsedLine.length; index++) {
      const number = parsedLine[index];

      // Largest number cannot be at the end, then use the next largest number
      if (index === parsedLine.length - 1) continue;

      if (number > largestNumber) {
        largestNumber = number;
        largestNumberIndex = index;
        continue;
      }
    }

    // Slice array from largest number to end
    const slicedParsedLine = parsedLine.slice(largestNumberIndex);

    // Find second largest number
    let secondLargestNumber = 0;
    for (let index = 1; index < slicedParsedLine.length; index++) {
      const number = slicedParsedLine[index];

      if (number > secondLargestNumber) {
        secondLargestNumber = number;
        continue;
      }
    }

    totalJoltage.push(parseInt(`${largestNumber}${secondLargestNumber}`));
  }

  // Sum the Joltage numbers into a total
  return totalJoltage.reduce((prev, curr) => prev + curr, 0);
};
