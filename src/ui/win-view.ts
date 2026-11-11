import type { GameState } from '../core/types.js';
import { createElement } from './dom.js';
import { formatTime, padZero } from './format.js';
import { createMascot } from './images.js';
import { createOutlinedText } from './outlined-text.js';
import { createStat } from './stats-view.js';

export interface WinHandlers {
  readonly onPlayAgain: () => void;
  readonly onChangeSettings: () => void;
}

export interface WinView {
  readonly element: HTMLElement;
  readonly focusTarget: HTMLButtonElement;
}

export const createWinView = (
  game: GameState,
  rank: number | null,
  handlers: WinHandlers,
): WinView => {
  const time = formatTime((game.finishedAt ?? game.startedAt) - game.startedAt);
  const playAgain = createElement('button', {
    className: 'button button--primary',
    type: 'button',
    textContent: 'Play again',
    onclick: handlers.onPlayAgain,
  });

  const element = createElement('div', { className: 'overlay' }, [
    createElement(
      'section',
      {
        className: 'card win',
        role: 'dialog',
        ariaModal: 'true',
        ariaLabel: 'You won',
      },
      [
        createMascot('cheer'),
        createElement('h2', { className: 'win__title' }, [
          createOutlinedText('The dead arise!'),
        ]),
        createElement('p', {
          className: 'card__text',
          textContent: 'You won! The secret was',
        }),
        createElement(
          'p',
          { className: 'win__secret' },
          game.secret.split('').map((digit) =>
            createElement('span', {
              className: 'win__digit',
              textContent: digit,
            }),
          ),
        ),
        createElement('div', { className: 'stats' }, [
          createStat('Attempts', padZero(game.history.length)),
          createStat('Time', time),
        ]),
        rank !== null &&
          createElement('p', {
            className: 'ribbon',
            textContent: `New record · #${rank} in the Hall of Bones`,
          }),
        createElement('div', { className: 'win__actions' }, [
          playAgain,
          createElement('button', {
            className: 'button button--secondary',
            type: 'button',
            textContent: 'Change settings',
            onclick: handlers.onChangeSettings,
          }),
        ]),
      ],
    ),
  ]);

  return { element, focusTarget: playAgain };
};
