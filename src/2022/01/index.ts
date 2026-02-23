export const parseInput = (rawInput: string) => rawInput.split(",");

export const part1 = (input: string[]): number => {
  let maxTotal = 0;
  let tempTotal = 0;

  for (const line of input) {
    if (line === "") {
      if (tempTotal > maxTotal) {
        maxTotal = tempTotal;
      }
      tempTotal = 0;
    } else {
      tempTotal += parseInt(line);
    }
  }
  return maxTotal;
};

export const part2 = (input: string[]): number => {
  const totals: number[] = [];
  let tempTotal = 0;

  for (const line of input) {
    if (line === "") {
      totals.push(tempTotal);
      tempTotal = 0;
    } else {
      tempTotal += parseInt(line);
    }
  }

  // Order the list
  totals
    .sort((a: number, b: number) => {
      return a - b;
    })
    .reverse()
    .splice(3, totals.length - 3);

  // Calculation total result
  let result = 0;
  totals.forEach((num) => {
    result += num;
  });

  return result;
};
