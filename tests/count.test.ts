import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/core/count.js';

describe('countPossibleSecrets', () => {
  it('returns P(base, length) = base! / (base - length)!', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
    expect(countPossibleSecrets(2, 10)).toBe(90);
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('returns 2 for binary secrets of length 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('returns 1 for length 0 (the base case)', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns 0 when length is greater than base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns the same value on repeated calls', () => {
    expect(countPossibleSecrets(5, 16)).toBe(countPossibleSecrets(5, 16));
  });
});
