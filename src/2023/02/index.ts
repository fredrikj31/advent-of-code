export const parseInput = (rawInput: string) => rawInput.split("\n");

export const part1 = (input: string[]): number => {
  const maxCubes: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const possibleGameIds: number[] = [];
  // line example: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  for (const line of input) {
    const gameId = parseInt(line.split(":")[0].replace("Game ", ""));
    let isGamePossible: boolean = true;
    const roundCubes = line.split(":")[1].trim().split(";");

    for (const roundCube of roundCubes) {
      // example for roundCube string: " 3 blue, 4 red"
      const pickedCubes = roundCube.split(",");

      for (const pickedCube of pickedCubes) {
        // example for pickedCube string: " 3 blue"
        const [numberOfCubes, colorOfCube] = pickedCube.trim().split(" ");

        if (maxCubes[colorOfCube] >= parseInt(numberOfCubes)) {
          continue;
        } else {
          isGamePossible = false;
        }
      }
    }

    if (isGamePossible) {
      possibleGameIds.push(gameId);
    }
  }

  const sum = possibleGameIds.reduce((prev, curr) => prev + curr, 0);
  return sum;
};

export const part2 = (input: string[]): number => {
  const powers: number[] = [];

  // line example: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  for (const line of input) {
    const roundCubes = line.split(":")[1].trim().split(";");

    const minCubes: Record<string, number> = {};

    for (const roundCube of roundCubes) {
      // example for roundCube string: " 3 blue, 4 red"
      const pickedCubes = roundCube.split(",");

      for (const pickedCube of pickedCubes) {
        // example for pickedCube string: " 3 blue"
        const [numberOfCubes, colorOfCube] = pickedCube.trim().split(" ");

        if (!minCubes[colorOfCube]) {
          minCubes[colorOfCube] = parseInt(numberOfCubes);
          continue;
        }

        if (minCubes[colorOfCube] < parseInt(numberOfCubes)) {
          minCubes[colorOfCube] = parseInt(numberOfCubes);
        }
      }
    }

    let totalPower = 1;
    for (const minCube in minCubes) {
      const minCubeNumber = minCubes[minCube];
      totalPower *= minCubeNumber;
    }
    powers.push(totalPower);
  }

  const sumOfPowers = powers.reduce((prev, curr) => prev + curr, 0);

  return sumOfPowers;
};
