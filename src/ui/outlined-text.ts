import { createElement } from './dom.js';

export const createOutlinedText = (
  text: string,
  modifier = 'gold',
): HTMLSpanElement => {
  const element = createElement('span', {
    className: `outlined outlined--${modifier}`,
    textContent: text,
  });

  element.dataset.text = text;

  return element;
};
