import type { Base } from './types.js';

export const getAlphabet = (_base: Base): string => {
  throw new Error('Not implemented');
};

export const createDigitValidator =
  (_base: Base) =>
  (_char: string): boolean => {
    throw new Error('Not implemented');
  };
