import { describe, expect, it } from 'vitest';
import { generateSecret } from '../src/core/secret.js';
import { isValidGuess } from '../src/core/validation.js';

const createSequence = (values: readonly number[]) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe('generateSecret', () => {
  it('always picks the first remaining digit when random returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });

  it('always picks the last remaining digit when random is close to 1', () => {
    expect(generateSecret(4, 10, () => 0.999)).toBe('9876');
  });

  it('is deterministic for the same random sequence', () => {
    const first = generateSecret(4, 10, createSequence([0.5, 0.1, 0.9, 0.3]));
    const second = generateSecret(4, 10, createSequence([0.5, 0.1, 0.9, 0.3]));
    expect(first).toBe(second);
    expect(first).toBe('5093');
  });

  it('returns a valid secret for every base', () => {
    const random = createSequence([0.7, 0.2, 0.4, 0.95, 0.05, 0.6]);
    expect(isValidGuess(generateSecret(2, 2, random), 2, 2)).toBe(true);
    expect(isValidGuess(generateSecret(5, 8, random), 5, 8)).toBe(true);
    expect(isValidGuess(generateSecret(6, 16, random), 6, 16)).toBe(true);
  });

  it('throws when length is greater than the number of digits', () => {
    expect(() => generateSecret(3, 2, () => 0)).toThrow(RangeError);
  });
});
