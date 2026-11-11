type Child = Node | string | null | false;

export const createElement = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  props: Partial<HTMLElementTagNameMap[Tag]> = {},
  children: readonly Child[] = [],
): HTMLElementTagNameMap[Tag] => {
  const element = Object.assign(document.createElement(tag), props);
  const nodes = children.filter(
    (child): child is Node | string => child !== null && child !== false,
  );

  element.append(...nodes);

  return element;
};
