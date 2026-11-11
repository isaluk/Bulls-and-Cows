import type { GameSettings, GameState, HistoryEntry } from './types.js';

export const createGame = (
  _settings: GameSettings,
  _secret: string,
  _now: number,
): GameState => {
  throw new Error('Not implemented');
};

export const isRepeatedGuess = (
  _history: readonly HistoryEntry[],
  _guess: string,
): boolean => {
  throw new Error('Not implemented');
};

export const applyGuess = (
  _state: GameState,
  _guess: string,
  _now: number,
): GameState => {
  throw new Error('Not implemented');
};
