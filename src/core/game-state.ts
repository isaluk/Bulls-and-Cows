import { normalizeDigit } from './digits.js';
import { evaluateGuess } from './evaluate.js';
import type { GameSettings, GameState, HistoryEntry } from './types.js';
import { isValidGuess } from './validation.js';

const normalizeGuess = (guess: string): string =>
  guess.split('').map(normalizeDigit).join('');

export const createGame = (
  settings: GameSettings,
  secret: string,
  now: number,
): GameState => ({
  settings,
  secret,
  history: [],
  status: 'playing',
  startedAt: now,
  finishedAt: null,
});

export const isRepeatedGuess = (
  history: readonly HistoryEntry[],
  guess: string,
): boolean =>
  history.some(
    (entry) => normalizeGuess(entry.guess) === normalizeGuess(guess),
  );

export const canAcceptGuess = (state: GameState, guess: string): boolean =>
  state.status === 'playing' &&
  isValidGuess(guess, state.settings.length, state.settings.base) &&
  !isRepeatedGuess(state.history, guess);

export const applyGuess = (
  state: GameState,
  guess: string,
  now: number,
): GameState => {
  if (!canAcceptGuess(state, guess)) {
    return state;
  }

  const result = evaluateGuess(state.secret, guess);
  const entry: HistoryEntry = { guess, ...result };
  const isWon = result.bulls === state.settings.length;

  return {
    ...state,
    history: [...state.history, entry],
    status: isWon ? 'won' : 'playing',
    finishedAt: isWon ? now : null,
  };
};
