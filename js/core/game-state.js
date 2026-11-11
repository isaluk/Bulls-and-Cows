import { normalizeDigit } from './digits.js';
import { evaluateGuess } from './evaluate.js';
import { isValidGuess } from './validation.js';
const normalizeGuess = (guess) => guess.split('').map(normalizeDigit).join('');
export const createGame = (settings, secret, now) => ({
    settings,
    secret,
    history: [],
    status: 'playing',
    startedAt: now,
    finishedAt: null,
});
export const isRepeatedGuess = (history, guess) => history.some((entry) => normalizeGuess(entry.guess) === normalizeGuess(guess));
export const canAcceptGuess = (state, guess) => state.status === 'playing' &&
    isValidGuess(guess, state.settings.length, state.settings.base) &&
    !isRepeatedGuess(state.history, guess);
export const applyGuess = (state, guess, now) => {
    if (!canAcceptGuess(state, guess)) {
        return state;
    }
    const result = evaluateGuess(state.secret, guess);
    const entry = { guess, ...result };
    const isWon = result.bulls === state.settings.length;
    return {
        ...state,
        history: [...state.history, entry],
        status: isWon ? 'won' : 'playing',
        finishedAt: isWon ? now : null,
    };
};
//# sourceMappingURL=game-state.js.map