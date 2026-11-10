export const memoize = <Args extends readonly (string | number)[], Result>(
  fn: (...args: Args) => Result,
): ((...args: Args) => Result) => fn;
