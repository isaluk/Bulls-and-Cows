import type { GameState } from '../core/types.js';
import { createElement } from './dom.js';
import { formatMode, padZero } from './format.js';

export interface StatsView {
  readonly element: HTMLElement;
  readonly timer: HTMLElement;
}

export const createStat = (
  label: string,
  value: string | HTMLElement,
): HTMLElement =>
  createElement('div', { className: 'stat' }, [
    createElement('span', { className: 'stat__label', textContent: label }),
    typeof value === 'string'
      ? createElement('span', { className: 'stat__value', textContent: value })
      : value,
  ]);

export const createStatsView = (
  game: GameState,
  onNewGame: () => void,
): StatsView => {
  const timer = createElement('span', {
    className: 'stat__value stat__value--timer',
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
