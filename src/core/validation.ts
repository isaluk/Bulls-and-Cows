import { createDigitValidator, normalizeDigit } from './digits.js';
import type { Base } from './types.js';

const hasUniqueChars = (chars: readonly string[]): boolean =>
  new Set(chars.map(normalizeDigit)).size === chars.length;

export const isValidGuess = (
  guess: string,
  length: number,
  base: Base,
): boolean => {
  const isDigit = createDigitValidator(base);
  const chars = guess.split('');

  return (
    chars.length === length && chars.every(isDigit) && hasUniqueChars(chars)
  );
};

export const sanitizeGuess = (
  value: string,
  base: Base,
  maxLength: number,
): string => {
  const isDigit = createDigitValidator(base);

  return value.split('').filter(isDigit).slice(0, maxLength).join('');
};
