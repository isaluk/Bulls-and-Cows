import type { GameRecord } from '../core/types.js';

const STORAGE_PREFIX = 'bulls-and-cows:records:';

const isGameRecord = (value: unknown): value is GameRecord =>
  typeof value === 'object' &&
  value !== null &&
  'attempts' in value &&
  typeof value.attempts === 'number' &&
  'timeMs' in value &&
  typeof value.timeMs === 'number';

export const loadRecords = (key: string): GameRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed.filter(isGameRecord) : [];
  } catch {
    return [];
  }
};

export const saveRecords = (key: string, records: readonly GameRecord[]) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(records));
  } catch {
    // Storage can be unavailable (private mode, quota). The game still works.
  }
};
