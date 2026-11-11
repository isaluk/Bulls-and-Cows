import { createElement } from './dom.js';
export const createOutlinedText = (text, modifier = 'gold') => {
    const element = createElement('span', {
        className: `outlined outlined--${modifier}`,
        textContent: text,
    });
    element.dataset.text = text;
    return element;
};
//# sourceMappingURL=outlined-text.js.map