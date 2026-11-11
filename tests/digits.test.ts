import { describe, expect, it } from 'vitest';
import { createDigitValidator, getAlphabet } from '../src/core/digits.js';

describe('getAlphabet', () => {
  it('returns the first `base` digits', () => {
    expect(getAlphabet(2)).toBe('01');
    expect(getAlphabet(8)).toBe('01234567');
    expect(getAlphabet(10)).toBe('0123456789');
    expect(getAlphabet(16)).toBe('0123456789abcdef');
  });
});

describe('createDigitValidator', () => {
  it('returns a function (curried factory)', () => {
    expect(typeof createDigitValidator(10)).toBe('function');
  });

  it('accepts only 0 and 1 in binary', () => {
    const isBinaryDigit = createDigitValidator(2);
    expect(isBinaryDigit('0')).toBe(true);
    expect(isBinaryDigit('1')).toBe(true);
    expect(isBinaryDigit('2')).toBe(false);
  });

  it('rejects 8 and 9 in octal', () => {
    const isOctalDigit = createDigitValidator(8);
    expect(isOctalDigit('7')).toBe(true);
    expect(isOctalDigit('8')).toBe(false);
    expect(isOctalDigit('9')).toBe(false);
  });

  it('rejects letters in decimal', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('9')).toBe(true);
    expect(isDecimalDigit('a')).toBe(false);
  });

  it('accepts hex letters in any case', () => {
    const isHexDigit = createDigitValidator(16);
    expect(isHexDigit('a')).toBe(true);
    expect(isHexDigit('F')).toBe(true);
    expect(isHexDigit('g')).toBe(false);
  });

  it('rejects empty strings, multi-char strings and symbols', () => {
    const isDecimalDigit = createDigitValidator(10);
    expect(isDecimalDigit('')).toBe(false);
    expect(isDecimalDigit('12')).toBe(false);
    expect(isDecimalDigit(' ')).toBe(false);
    expect(isDecimalDigit('-')).toBe(false);
  });
});
