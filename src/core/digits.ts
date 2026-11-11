import { ALL_DIGITS } from './constants.js';
import type { Base } from './types.js';

export const getAlphabet = (base: Base): string => ALL_DIGITS.slice(0, base);

export const normalizeDigit = (char: string): string => char.toLowerCase();

export const createDigitValidator = (base: Base) => {
  const alphabet = getAlphabet(base);

  return (char: string): boolean =>
    char.length === 1 && alphabet.includes(normalizeDigit(char));
};
