import { normalizeDigit } from './digits.js';
const toDigits = (value) => value.split('').map(normalizeDigit);
export const evaluateGuess = (secret, guess) => {
    const secretDigits = toDigits(secret);
    const guessDigits = toDigits(guess);
    const secretSet = new Set(secretDigits);
    const bulls = guessDigits.filter((digit, index) => digit === secretDigits[index]).length;
    const matches = guessDigits.filter((digit) => secretSet.has(digit)).length;
    return { bulls, cows: matches - bulls };
};
//# sourceMappingURL=evaluate.js.map