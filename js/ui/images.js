import { createElement } from './dom.js';
const ASSETS_PATH = './assets/';
// Real pixel sizes of the exported files: the browser reserves space before
// the image loads, so the layout does not jump.
const MASCOT_SIZES = {
    wave: [413, 600],
    hint: [350, 600],
    cheer: [536, 600],
};
export const createIcon = (name, size = 28) => createElement('img', {
    className: 'icon',
    src: `${ASSETS_PATH}${name}.svg`,
    alt: '',
    width: size,
    height: size,
});
export const createDecor = (name, index) => createElement('img', {
    className: `decor decor--${name} decor--${index + 1}`,
    src: `${ASSETS_PATH}${name}.svg`,
    alt: '',
    width: 32,
    height: 32,
});
export const createMascot = (pose) => {
    const [width, height] = MASCOT_SIZES[pose];
    return createElement('img', {
        className: `mascot mascot--${pose}`,
        src: `${ASSETS_PATH}mascot-${pose}.webp`,
        alt: '',
        width,
        height,
        decoding: 'async',
    });
};
//# sourceMappingURL=images.js.map