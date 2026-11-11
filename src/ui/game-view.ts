import type { GameState, HistoryEntry } from '../core/types.js';
import { sanitizeGuess } from '../core/validation.js';
import { createElement } from './dom.js';
import { formatCount, formatIndex, formatSettings } from './format.js';
import { createIcon, type IconName } from './images.js';

export interface GameHandlers {
  readonly onGuess: (guess: string) => void;
}

export interface GameView {
  readonly element: HTMLElement;
  readonly input: HTMLInputElement | null;
}

const createBadge = (kind: IconName, count: number): HTMLSpanElement =>
  createElement('span', { className: `badge badge--${kind}` }, [
    createIcon(kind, 24),
    formatCount(count, kind),
  ]);

const createHistoryItem = (entry: HistoryEntry, index: number): HTMLLIElement =>
  createElement('li', { className: 'history__item' }, [
    createElement('span', {
      className: 'history__index',
      textContent: formatIndex(index),
    }),
    createElement('span', {
      className: 'history__guess',
      textContent: entry.guess,
    }),
    createElement('span', { className: 'history__result' }, [
      createBadge('bull', entry.bulls),
      createBadge('cow', entry.cows),
    ]),
  ]);

const createHistory = (history: readonly HistoryEntry[]): HTMLElement =>
  history.length > 0
    ? createElement(
        'ol',
        { className: 'history' },
        history.map(createHistoryItem),
      )
    : createElement('p', {
        className: 'note',
        textContent: 'No guesses yet. The crypt is waiting…',
      });

const createGuessForm = (
  game: GameState,
  onGuess: GameHandlers['onGuess'],
): { form: HTMLFormElement; input: HTMLInputElement } => {
  const { length, base } = game.settings;
  const input = createElement('input', {
    className: 'guess__input',
    type: 'text',
    inputMode: base === 16 ? 'text' : 'numeric',
    autocomplete: 'off',
    spellcheck: false,
    placeholder: '•'.repeat(length),
    ariaLabel: 'Your guess',
    oninput: () => {
      input.value = sanitizeGuess(input.value, base, length);
    },
  });

  const form = createElement(
    'form',
    {
      className: 'guess',
      onsubmit: (event: SubmitEvent) => {
        event.preventDefault();
        onGuess(input.value);
      },
    },
    [
      input,
      createElement('button', {
        className: 'button button--primary',
        type: 'submit',
        textContent: 'Dig!',
      }),
    ],
  );

  return { form, input };
};

export const createGameView = (
  game: GameState,
  message: string,
  handlers: GameHandlers,
): GameView => {
  const isPlaying = game.status === 'playing';
  const guessForm = isPlaying ? createGuessForm(game, handlers.onGuess) : null;

  const element = createElement('section', { className: 'card game' }, [
    createElement('div', { className: 'game__header' }, [
      createElement('h2', {
        className: 'card__title',
        textContent: isPlaying ? 'Round in progress' : 'Crypt cracked!',
      }),
      createElement('span', {
        className: 'tag',
        textContent: formatSettings(game.settings),
      }),
    ]),
    guessForm && guessForm.form,
    createElement('p', {
      className: message ? 'message message--error' : 'message',
      textContent: message,
      role: 'status',
    }),
    createElement('h3', { className: 'label', textContent: 'Grave log' }),
    createHistory(game.history),
  ]);

  return { element, input: guessForm ? guessForm.input : null };
};
