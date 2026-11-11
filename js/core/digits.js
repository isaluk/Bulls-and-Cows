import { ALL_DIGITS } from './constants.js';
export const getAlphabet = (base) => ALL_DIGITS.slice(0, base);
export const normalizeDigit = (char) => char.toLowerCase();
export const createDigitValidator = (base) => {
    const alphabet = getAlphabet(base);
    return (char) => char.length === 1 && alphabet.includes(normalizeDigit(char));
};
//# sourceMappingURL=digits.js.map