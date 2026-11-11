import { describe, expect, it } from 'vitest';
import {
  addRecord,
  compareRecords,
  createRecord,
  getRecordsKey,
} from '../src/core/records.js';
import type { GameRecord, GameState } from '../src/core/types.js';

const record = (attempts: number, timeMs: number): GameRecord => ({
  length: 4,
  base: 10,
  attempts,
  timeMs,
  date: 0,
});

describe('compareRecords', () => {
  it('puts fewer attempts first', () => {
    expect(compareRecords(record(3, 9000), record(5, 1000))).toBeLessThan(0);
  });

  it('compares time when attempts are equal', () => {
    expect(compareRecords(record(5, 1000), record(5, 2000))).toBeLessThan(0);
  });
});

describe('addRecord', () => {
  it('returns a new sorted array and does not mutate the old one', () => {
    const records = [record(5, 1000), record(8, 1000)];
    const next = addRecord(records, record(6, 1000), 10);
    expect(next.map((r) => r.attempts)).toEqual([5, 6, 8]);
    expect(records).toHaveLength(2);
  });

  it('keeps only the top N records', () => {
    const records = [record(1, 1), record(2, 1), record(3, 1)];
    const next = addRecord(records, record(4, 1), 3);
    expect(next.map((r) => r.attempts)).toEqual([1, 2, 3]);
  });
});

describe('createRecord', () => {
  it('builds a record from a finished game', () => {
    const game: GameState = {
      settings: { length: 4, base: 10 },
      secret: '1234',
      history: [
        { guess: '5678', bulls: 0, cows: 0 },
        { guess: '1234', bulls: 4, cows: 0 },
      ],
      status: 'won',
      startedAt: 1000,
      finishedAt: 31000,
    };
    expect(createRecord(game)).toEqual({
      length: 4,
      base: 10,
      attempts: 2,
      timeMs: 30000,
      date: 31000,
    });
  });
});

describe('getRecordsKey', () => {
  it('builds a key from length and base', () => {
    expect(getRecordsKey({ length: 4, base: 16 })).toBe('4-16');
  });
});
