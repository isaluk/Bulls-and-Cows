import { getAlphabet } from './digits.js';
const pickUniqueDigits = (pool, count, random) => {
    if (count === 0) {
        return [];
    }
    const index = Math.floor(random() * pool.length);
    const rest = pool.filter((_, i) => i !== index);
    return [pool[index], ...pickUniqueDigits(rest, count - 1, random)];
};
export const generateSecret = (length, base, random = Math.random) => {
    if (length > base) {
        throw new RangeError(`Length ${length} is greater than base ${base}`);
    }
    return pickUniqueDigits(getAlphabet(base).split(''), length, random).join('');
};
//# sourceMappingURL=secret.js.map