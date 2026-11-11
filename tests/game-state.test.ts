import { describe, expect, it } from 'vitest';
import {
  applyGuess,
  createGame,
  isRepeatedGuess,
} from '../src/core/game-state.js';
import type { GameState } from '../src/core/types.js';

const settings = { length: 4, base: 10 } as const;
const createTestGame = (): GameState => createGame(settings, '1234', 1000);

describe('createGame', () => {
  it('creates a game with empty history and playing status', () => {
    expect(createTestGame()).toEqual({
      settings,
      secret: '1234',
      history: [],
      status: 'playing',
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe('applyGuess', () => {
  it('adds a history entry with bulls and cows', () => {
    const next = applyGuess(createTestGame(), '1243', 2000);
    expect(next.history).toEqual([{ guess: '1243', bulls: 2, cows: 2 }]);
  });

  it('does not mutate the previous state', () => {
    const game = createTestGame();
    const next = applyGuess(game, '5678', 2000);
    expect(game.history).toEqual([]);
    expect(next).not.toBe(game);
    expect(next.history).not.toBe(game.history);
  });

  it('keeps old entries unchanged', () => {
    const first = applyGuess(createTestGame(), '5678', 2000);
    const second = applyGuess(first, '1243', 3000);
    expect(second.history[0]).toBe(first.history[0]);
    expect(second.history).toHaveLength(2);
  });

  it('marks the game as won when all digits are bulls', () => {
    const next = applyGuess(createTestGame(), '1234', 5000);
    expect(next.status).toBe('won');
    expect(next.finishedAt).toBe(5000);
  });

  it('ignores invalid guesses', () => {
    const game = createTestGame();
    expect(applyGuess(game, '1123', 2000)).toBe(game);
  });

  it('ignores repeated guesses (case-insensitive)', () => {
    const hexGame = createGame({ length: 2, base: 16 }, 'ab', 0);
    const first = applyGuess(hexGame, 'a1', 1);
    expect(applyGuess(first, 'A1', 2)).toBe(first);
  });

  it('ignores guesses after the game is won', () => {
    const won = applyGuess(createTestGame(), '1234', 2000);
    expect(applyGuess(won, '5678', 3000)).toBe(won);
  });
});

describe('isRepeatedGuess', () => {
  it('finds a guess that is already in history', () => {
    const game = applyGuess(createTestGame(), '5678', 2000);
    expect(isRepeatedGuess(game.history, '5678')).toBe(true);
    expect(isRepeatedGuess(game.history, '5679')).toBe(false);
  });
});
