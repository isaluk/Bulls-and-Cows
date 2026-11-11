import type { GameRecord, GameSettings, GameState } from './types.js';

export const getRecordsKey = (_settings: GameSettings): string => {
  throw new Error('Not implemented');
};

export const compareRecords = (_a: GameRecord, _b: GameRecord): number => {
  throw new Error('Not implemented');
};

export const addRecord = (
  _records: readonly GameRecord[],
  _record: GameRecord,
  _limit: number,
): GameRecord[] => {
  throw new Error('Not implemented');
};

export const createRecord = (_game: GameState): GameRecord => {
  throw new Error('Not implemented');
};
