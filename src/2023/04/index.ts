export const parseInput = (rawInput: string) => rawInput.split("\n");

export const part1 = (input: string[]): number => {
  const listOfSumOFCorrectNumbers: number[] = [];
  for (const line of input) {
    // line example: "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    const numbers = line.split(":")[1];
    // numbers example: "41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    const [chosenNumbers, winnerNumbers] = numbers.split("|");
    const choseNumbersRegex = [...chosenNumbers.matchAll(/\d+/g)].map(
      (temp) => temp[0],
    );
    const winnerNumbersRegex = [...winnerNumbers.matchAll(/\d+/g)].map(
      (temp) => temp[0],
    );

    const numbersOfCorrectNumbers = choseNumbersRegex.filter(
      (choseNumberRegex) => winnerNumbersRegex.includes(choseNumberRegex),
    );

    let sumOfCorrectNumbers = numbersOfCorrectNumbers.length > 0 ? 1 : 0;
    if (numbersOfCorrectNumbers.length > 0) {
      for (let index = 0; index < numbersOfCorrectNumbers.length - 1; index++) {
        sumOfCorrectNumbers *= 2;
      }
    }
    listOfSumOFCorrectNumbers.push(sumOfCorrectNumbers);
  }

  return listOfSumOFCorrectNumbers.reduce((prev, curr) => prev + curr, 0);
};
