export const parseInput = (rawInput: string) => rawInput.split("\n");

export const part1 = (input: string[]): number => {
  const results: number[] = [];

  // find digits in string
  const numbersRegex = /\d/g;

  for (const line of input) {
    const matches = [...line.matchAll(numbersRegex)];

    // find first and last number of the matches
    const firstNumber = matches[0];
    const lastNumber = matches[matches.length - 1];

    // convert to string numbers into number
    results.push(parseInt(`${firstNumber[0]}${lastNumber[0]}`));
  }

  // sum all numbers
  const sum = results.reduce((prev, curr) => prev + curr, 0);
  return sum;
};

export const part2 = (input: string[]): number => {
  enum Numbers {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
  }

  const results: number[] = [];

  // match numbers in string
  const numbersRegex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

  for (const line of input) {
    const matches = [...line.matchAll(numbersRegex)];
    const firstNumberWord = matches[0];
    const lastNumberWord = matches[matches.length - 1];

    let firstNumber: number = 0;
    let lastNumber: number = 0;

    // if number is not a number, then match it in enum
    if (Number.isNaN(parseInt(firstNumberWord[1]))) {
      firstNumber = Numbers[firstNumberWord[1] as keyof typeof Numbers];
    } else {
      firstNumber = parseInt(firstNumberWord[1]);
    }
    if (Number.isNaN(parseInt(lastNumberWord[1]))) {
      lastNumber = Numbers[lastNumberWord[1] as keyof typeof Numbers];
    } else {
      lastNumber = parseInt(lastNumberWord[1]);
    }

    results.push(parseInt(`${firstNumber}${lastNumber}`));
  }

  // calculate sum of numbers in array
  const sum = results.reduce((prev, curr) => prev + curr, 0);
  return sum;
};
