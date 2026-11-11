import { createElement } from './dom.js';
import { createOutlinedText } from './outlined-text.js';
export const createLogo = (isCompact) => createElement('header', { className: isCompact ? 'logo logo--compact' : 'logo' }, [
    createElement('h1', { className: 'logo__title', ariaLabel: 'Bulls and Cows' }, [
        createOutlinedText('Bulls'),
        createOutlinedText('&', 'teal'),
        createOutlinedText('Cows'),
    ]),
    createElement('p', {
        className: 'logo__ribbon',
        textContent: '~ a midnight crypt of hidden digits ~',
    }),
]);
//# sourceMappingURL=logo-view.js.map