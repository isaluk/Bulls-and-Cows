import { createElement } from './dom.js';
import { formatMode, padZero } from './format.js';
export const createStat = (label, value) => createElement('div', { className: 'stat' }, [
    createElement('span', { className: 'stat__label', textContent: label }),
    typeof value === 'string'
        ? createElement('span', { className: 'stat__value', textContent: value })
        : value,
]);
export const createStatsView = (game, onNewGame) => {
    const timer = createElement('span', {
        className: 'stat__value',
        textContent: '00:00',
        role: 'timer',
    });
    const element = createElement('div', { className: 'stats' }, [
        createStat('Attempts', padZero(game.history.length)),
        createStat('Time', timer),
        createStat('Mode', formatMode(game.settings)),
        createElement('button', {
            className: 'button button--secondary',
            type: 'button',
            textContent: 'New game',
            onclick: onNewGame,
        }),
    ]);
    return { element, timer };
};
//# sourceMappingURL=stats-view.js.map