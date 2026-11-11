import { MAX_LENGTH, MIN_LENGTH } from './constants.js';
const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
export const ALL_LENGTHS = range(MIN_LENGTH, MAX_LENGTH);
export const isLengthAvailable = (length, base) => length <= base;
export const changeBase = (settings, base) => ({
    base,
    length: isLengthAvailable(settings.length, base) ? settings.length : base,
});
export const changeLength = (settings, length) => isLengthAvailable(length, settings.base) ? { ...settings, length } : settings;
//# sourceMappingURL=settings.js.map