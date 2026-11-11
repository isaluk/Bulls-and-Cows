export const createElement = (tag, props = {}, children = []) => {
    const element = Object.assign(document.createElement(tag), props);
    const nodes = children.filter((child) => child !== null && child !== false);
    element.append(...nodes);
    return element;
};
//# sourceMappingURL=dom.js.map