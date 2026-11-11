import { getAlphabet } from './digits.js';
import type { Base, RandomSource } from './types.js';

const pickUniqueDigits = (
  pool: readonly string[],
  count: number,
  random: RandomSource,
): string[] => {
  if (count === 0) {
    return [];
  }

  const index = Math.floor(random() * pool.length);
  const rest = pool.filter((_, i) => i !== index);

  return [pool[index], ...pickUniqueDigits(rest, count - 1, random)];
};

export const generateSecret = (
  length: number,
  base: Base,
  random: RandomSource = Math.random,
): string => {
  if (length > base) {
    throw new RangeError(`Length ${length} is greater than base ${base}`);
  }

  return pickUniqueDigits(getAlphabet(base).split(''), length, random).join('');
};
