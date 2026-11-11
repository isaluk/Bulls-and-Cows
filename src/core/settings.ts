import { MAX_LENGTH, MIN_LENGTH } from './constants.js';
import type { Base, GameSettings } from './types.js';

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const ALL_LENGTHS = range(MIN_LENGTH, MAX_LENGTH);

export const isLengthAvailable = (length: number, base: Base): boolean =>
  length <= base;

export const changeBase = (
  settings: GameSettings,
  base: Base,
): GameSettings => ({
  base,
  length: isLengthAvailable(settings.length, base) ? settings.length : base,
});

export const changeLength = (
  settings: GameSettings,
  length: number,
): GameSettings =>
  isLengthAvailable(length, settings.base) ? { ...settings, length } : settings;
