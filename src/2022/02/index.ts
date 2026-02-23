export const parseInput = (rawInput: string) => rawInput.split(",");

export const part1 = (input: string[]): number => {
  const choicesWithPoints: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
  };

  let totalPoints: number = 0;

  for (const round of input) {
    const choices = round.split(" ");
    const opponentChoice: string = choices[0];
    const opponentPoints: number = choicesWithPoints[opponentChoice];
    const ourChoice: string = choices[1];
    const ourPoints: number = choicesWithPoints[ourChoice];

    // Check for draw
    if (opponentPoints === ourPoints) {
      totalPoints += ourPoints + 3;
      continue;
    }

    // Cases we win
    if (opponentChoice === "A" && ourChoice === "Y") {
      totalPoints += ourPoints + 6;
      continue;
    } else if (opponentChoice === "B" && ourChoice === "Z") {
      totalPoints += ourPoints + 6;
      continue;
    } else if (opponentChoice === "C" && ourChoice === "X") {
      totalPoints += ourPoints + 6;
      continue;
    } else {
      totalPoints += ourPoints;
      continue;
    }
  }

  return totalPoints;
};
