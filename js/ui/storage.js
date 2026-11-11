import { BASE_OPTIONS } from '../core/constants.js';
import { ALL_LENGTHS, isLengthAvailable } from '../core/settings.js';
const STORAGE_PREFIX = 'bulls-and-cows:records:';
const SETTINGS_KEY = 'bulls-and-cows:settings';
const isGameRecord = (value) => typeof value === 'object' &&
    value !== null &&
    'attempts' in value &&
    typeof value.attempts === 'number' &&
    'timeMs' in value &&
    typeof value.timeMs === 'number';
const isBase = (value) => BASE_OPTIONS.some((option) => option.value === value);
const isGameSettings = (value) => typeof value === 'object' &&
    value !== null &&
    'base' in value &&
    isBase(value.base) &&
    'length' in value &&
    typeof value.length === 'number' &&
    ALL_LENGTHS.includes(value.length) &&
    isLengthAvailable(value.length, value.base);
const readJson = (key) => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
};
const writeJson = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        // Storage can be unavailable (private mode, quota). The game still works.
    }
};
export const loadRecords = (key) => {
    const parsed = readJson(STORAGE_PREFIX + key);
    return Array.isArray(parsed) ? parsed.filter(isGameRecord) : [];
};
export const saveRecords = (key, records) => {
    writeJson(STORAGE_PREFIX + key, records);
};
export const loadSettings = (fallback) => {
    const parsed = readJson(SETTINGS_KEY);
    return isGameSettings(parsed)
        ? { length: parsed.length, base: parsed.base }
        : fallback;
};
export const saveSettings = (settings) => {
    writeJson(SETTINGS_KEY, settings);
};
//# sourceMappingURL=storage.js.map