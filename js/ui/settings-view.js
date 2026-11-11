import { BASE_OPTIONS } from '../core/constants.js';
import { countPossibleSecrets } from '../core/count.js';
import { ALL_LENGTHS, isLengthAvailable } from '../core/settings.js';
import { createElement } from './dom.js';
import { formatNumber } from './format.js';
import { createIcon } from './images.js';
const BIN_NOTE = 'bin has only two digits, so the secret can be 2 long at most.';
const createChip = (name, label, checked, disabled, onSelect) => createElement('label', { className: 'chip' }, [
    createElement('input', {
        className: 'chip__input',
        type: 'radio',
        name,
        value: label,
        checked,
        disabled,
        onchange: onSelect,
    }),
    createElement('span', { className: 'chip__face', textContent: label }),
]);
const createChipGroup = (title, chips) => createElement('fieldset', { className: 'chip-group' }, [
    createElement('legend', { className: 'label', textContent: title }),
    createElement('div', { className: 'chip-group__chips' }, chips),
]);
const createLegend = () => createElement('ul', { className: 'legend' }, [
    createElement('li', { className: 'legend__item' }, [
        createIcon('bull'),
        'Bull — right digit, right grave',
    ]),
    createElement('li', { className: 'legend__item' }, [
        createIcon('cow'),
        'Cow — right digit, wrong grave',
    ]),
]);
const createSecretsCount = (possible) => createElement('p', { className: 'secrets', ariaLive: 'polite' }, [
    createIcon('cow', 40),
    createElement('span', { className: 'secrets__text' }, [
        createElement('span', {
            className: 'secrets__label',
            textContent: 'Possible secrets',
        }),
        createElement('span', { className: 'secrets__row' }, [
            createElement('strong', {
                className: 'secrets__value',
                textContent: formatNumber(possible),
            }),
            ' souls hidden in the crypt',
        ]),
    ]),
]);
export const createSettingsView = (settings, handlers) => {
    const possible = countPossibleSecrets(settings.length, settings.base);
    const baseChips = BASE_OPTIONS.map(({ value, label }) => createChip('base', label, settings.base === value, false, () => handlers.onBaseChange(value)));
    const lengthChips = ALL_LENGTHS.map((length) => createChip('length', String(length), settings.length === length, !isLengthAvailable(length, settings.base), () => handlers.onLengthChange(length)));
    return createElement('section', { className: 'card settings' }, [
        createElement('h2', {
            className: 'card__title',
            textContent: 'Summon a Secret',
        }),
        createElement('p', {
            className: 'card__text',
            textContent: 'Guess the secret number of unique digits. The crypt answers every guess with bulls and cows.',
        }),
        createLegend(),
        createElement('form', {
            className: 'settings__form',
            onsubmit: (event) => {
                event.preventDefault();
                handlers.onStart();
            },
        }, [
            createChipGroup('Number system', baseChips),
            createChipGroup('Secret length', lengthChips),
            settings.base === 2 &&
                createElement('p', { className: 'note', textContent: BIN_NOTE }),
            createSecretsCount(possible),
            createElement('button', {
                className: 'button button--primary',
                type: 'submit',
                textContent: 'Start digging',
            }),
        ]),
    ]);
};
//# sourceMappingURL=settings-view.js.map