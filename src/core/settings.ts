import type { Base, GameSettings } from './types.js';

export const ALL_LENGTHS: number[] = [];

export const isLengthAvailable = (_length: number, _base: Base): boolean => {
  throw new Error('Not implemented');
};

export const changeBase = (
  _settings: GameSettings,
  _base: Base,
): GameSettings => {
  throw new Error('Not implemented');
};

export const changeLength = (
  _settings: GameSettings,
  _length: number,
): GameSettings => {
  throw new Error('Not implemented');
};
