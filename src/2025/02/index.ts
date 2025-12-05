export const parseInput = (rawInput: string) => rawInput.split(",");

export const part1 = (input: string[]): number => {
  const sequenceNumbers: number[] = [];

  for (const sequence of input) {
    const [startNumber, endNumber] = sequence.split("-");

    const parsedStartNumber = parseInt(startNumber);
    const parsedEndNumber = parseInt(endNumber);

    for (let index = parsedStartNumber; index <= parsedEndNumber; index++) {
      const numberString = index.toString();
      const numberStringLength = numberString.length;
      if (numberStringLength % 2 !== 0) continue;

      const numberPartOne = numberString.slice(0, numberString.length / 2);
      const numberPartTwo = numberString.slice(
        numberString.length / 2,
        numberString.length
      );
      if (numberPartOne === numberPartTwo) {
        sequenceNumbers.push(parseInt(numberString));
      }
    }
  }

  return sequenceNumbers.reduce((prev, curr) => prev + curr, 0);
};

export const part2 = (input: string[]): number => {
  const sequenceNumbers: Set<number> = new Set();

  for (const sequence of input) {
    const [startNumber, endNumber] = sequence.split("-");

    const parsedStartNumber = parseInt(startNumber);
    const parsedEndNumber = parseInt(endNumber);

    for (let index = parsedStartNumber; index <= parsedEndNumber; index++) {
      const numberString = index.toString();
      const numberStringLength = numberString.length;

      for (let part = 1; part < numberStringLength; part++) {
        const regex = new RegExp(String.raw`[\s\S]{1,${part}}`, "g");
        const characterParts = numberString.match(regex) ?? [];
        const characterPartsSet: Set<string> = new Set(characterParts);

        if (characterPartsSet.size === 1) {
          sequenceNumbers.add(parseInt(numberString));
        }
      }
    }
  }

  return [...sequenceNumbers].reduce((prev, curr) => prev + curr, 0);
};
