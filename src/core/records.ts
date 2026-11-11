import type { GameRecord, GameSettings, GameState } from './types.js';

export const getRecordsKey = ({ length, base }: GameSettings): string =>
  `${length}-${base}`;

export const compareRecords = (a: GameRecord, b: GameRecord): number =>
  a.attempts - b.attempts || a.timeMs - b.timeMs;

export const addRecord = (
  records: readonly GameRecord[],
  record: GameRecord,
  limit: number,
): GameRecord[] => [...records, record].sort(compareRecords).slice(0, limit);

export const createRecord = (game: GameState): GameRecord => {
  const finishedAt = game.finishedAt ?? game.startedAt;

  return {
    length: game.settings.length,
    base: game.settings.base,
    attempts: game.history.length,
    timeMs: finishedAt - game.startedAt,
    date: finishedAt,
  };
};
