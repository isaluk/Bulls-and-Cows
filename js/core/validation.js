import { createDigitValidator, normalizeDigit } from './digits.js';
const hasUniqueChars = (chars) => new Set(chars.map(normalizeDigit)).size === chars.length;
export const isValidGuess = (guess, length, base) => {
    const isDigit = createDigitValidator(base);
    const chars = guess.split('');
    return (chars.length === length && chars.every(isDigit) && hasUniqueChars(chars));
};
export const sanitizeGuess = (value, base, maxLength) => {
    const isDigit = createDigitValidator(base);
    return value.split('').filter(isDigit).slice(0, maxLength).join('');
};
//# sourceMappingURL=validation.js.map