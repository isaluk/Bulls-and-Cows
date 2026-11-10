import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../src/core/evaluate.js';

describe('evaluateGuess', () => {
  it('counts all bulls when the guess equals the secret', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('counts all cows when digits are right but places are wrong', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('returns zeros when there are no common digits', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
    expect(evaluateGuess('1234', '1560')).toEqual({ bulls: 1, cows: 0 });
    expect(evaluateGuess('1234', '5126')).toEqual({ bulls: 0, cows: 2 });
  });

  it('handles a leading zero', () => {
    expect(evaluateGuess('0123', '0132')).toEqual({ bulls: 2, cows: 2 });
  });

  it('compares hex digits case-insensitively', () => {
    expect(evaluateGuess('ab12', 'AB21')).toEqual({ bulls: 2, cows: 2 });
  });
});
