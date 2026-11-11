import { describe, expect, it } from 'vitest';
import {
  ALL_LENGTHS,
  changeBase,
  changeLength,
  isLengthAvailable,
} from '../src/core/settings.js';

describe('ALL_LENGTHS', () => {
  it('contains lengths from 2 to 6', () => {
    expect(ALL_LENGTHS).toEqual([2, 3, 4, 5, 6]);
  });
});

describe('isLengthAvailable', () => {
  it('allows only length 2 in binary', () => {
    expect(
      ALL_LENGTHS.filter((length) => isLengthAvailable(length, 2)),
    ).toEqual([2]);
  });

  it('allows every length in other bases', () => {
    expect(ALL_LENGTHS.every((length) => isLengthAvailable(length, 8))).toBe(
      true,
    );
  });
});

describe('changeBase', () => {
  it('switches length to 2 when binary is selected', () => {
    expect(changeBase({ length: 5, base: 10 }, 2)).toEqual({
      length: 2,
      base: 2,
    });
  });

  it('keeps the length when it is available', () => {
    expect(changeBase({ length: 5, base: 10 }, 16)).toEqual({
      length: 5,
      base: 16,
    });
  });
});

describe('changeLength', () => {
  it('ignores a length that is not available for the base', () => {
    const settings = { length: 2, base: 2 } as const;
    expect(changeLength(settings, 4)).toBe(settings);
  });

  it('returns new settings with the new length', () => {
    expect(changeLength({ length: 4, base: 10 }, 6)).toEqual({
      length: 6,
      base: 10,
    });
  });
});
