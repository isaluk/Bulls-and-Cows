import { describe, expect, it } from 'vitest';
import { isValidGuess, sanitizeGuess } from '../src/core/validation.js';

describe('isValidGuess', () => {
  it('accepts a guess of correct length with unique valid digits', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects a guess of wrong length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('rejects digits that do not exist in the base', () => {
    expect(isValidGuess('1289', 4, 8)).toBe(false);
    expect(isValidGuess('12', 2, 2)).toBe(false);
    expect(isValidGuess('12a4', 4, 10)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  it('treats hex digits case-insensitively', () => {
    expect(isValidGuess('aB3f', 4, 16)).toBe(true);
    expect(isValidGuess('aA12', 4, 16)).toBe(false);
  });
});

describe('sanitizeGuess', () => {
  it('drops characters that are not digits of the base', () => {
    expect(sanitizeGuess('1x2-3', 10, 4)).toBe('123');
    expect(sanitizeGuess('0192', 2, 2)).toBe('01');
  });

  it('keeps hex letters in any case', () => {
    expect(sanitizeGuess('aZF1', 16, 4)).toBe('aF1');
  });

  it('cuts the value to the maximum length', () => {
    expect(sanitizeGuess('123456', 10, 4)).toBe('1234');
  });
});
