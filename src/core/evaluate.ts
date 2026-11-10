import { normalizeDigit } from './digits.js';
import type { GuessResult } from './types.js';

const toDigits = (value: string): string[] =>
  value.split('').map(normalizeDigit);

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const secretDigits = toDigits(secret);
  const guessDigits = toDigits(guess);
  const secretSet = new Set(secretDigits);

  const bulls = guessDigits.filter(
    (digit, index) => digit === secretDigits[index],
  ).length;
  const matches = guessDigits.filter((digit) => secretSet.has(digit)).length;

  return { bulls, cows: matches - bulls };
};
