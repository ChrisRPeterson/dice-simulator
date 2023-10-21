const SIMULATIONS = 100000000;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const distribution: any = {};

enum Dice {
  D100 = 100,
  D20 = 20,
  D12 = 12,
  D10 = 10,
  D8 = 8,
  D6 = 6,
  D4 = 4,
}

function main() {
  const result = simulateAdvantage(SIMULATIONS, Dice.D20);

  logDistribution();

  console.log(`SIMULATIONS: ${SIMULATIONS}`);
  console.log(`AVERAGE ROLL: ${result}`);
}

// Logs the key value pairs in the distribution object.
function logDistribution() {
  console.log("DISTRIBUTION LOGGING:");
  for (const key in distribution) {
    if (Object.prototype.hasOwnProperty.call(distribution, key)) {
      const value = distribution[key];
      console.log(
        `Key: ${key}, Value: ${((value / SIMULATIONS) * 100).toFixed(2)}%`
      );
    }
  }
  console.log("***************");
}

// Simulate a single dice roll.
function rollDice(dice: Dice) {
  return getRandomNumber(1, dice);
}

// Get a random number between min and max
function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error(
      "Minimum value must be less than or equal to the maximum value."
    );
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
}

// Simulate X number of dice rolls.
function simulateRoll(rolls: number, dice: Dice) {
  if (rolls < 0) {
    throw new Error("Rolls value must greater than or equal to 0.");
  }

  let sum = 0;
  for (let i = 0; i < rolls; i++) {
    sum += rollDice(dice);
  }
  return sum / rolls;
}

// Increment distribution values for all numbers lower than the input value.
function updateDistribution(value: number) {
  for (let i = 1; i <= 20; i++) {
    if (value >= i) {
      if (!distribution[i]) {
        distribution[i] = 1;
      } else {
        distribution[i] += 1;
      }
    }
  }
}

function simulateAdvantage(rolls: number, dice: Dice) {
  if (rolls < 0) {
    throw new Error("Rolls value must greater than or equal to 0.");
  }

  let sum = 0;
  for (let i = 0; i < rolls; i++) {
    const pips = rollAdvantage(dice);
    sum += pips;
    updateDistribution(pips);
  }

  return sum / rolls;
}

function rollAdvantage(dice: Dice) {
  const diceAPips = rollDice(dice);
  const diceBPips = rollDice(dice);
  return diceAPips > diceBPips ? diceAPips : diceBPips;
}

main();
