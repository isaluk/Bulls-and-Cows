import { describe, expect, it, vi } from 'vitest';
import { memoize } from '../src/core/memoize.js';

describe('memoize', () => {
  it('returns the same result as the original function', () => {
    const add = (a: number, b: number) => a + b;
    expect(memoize(add)(2, 3)).toBe(5);
  });

  it('calls the original function only once for the same arguments', () => {
    const add = vi.fn((a: number, b: number) => a + b);
    const memoizedAdd = memoize(add);
    memoizedAdd(2, 3);
    memoizedAdd(2, 3);
    expect(add).toHaveBeenCalledTimes(1);
  });

  it('calls the original function again for different arguments', () => {
    const add = vi.fn((a: number, b: number) => a + b);
    const memoizedAdd = memoize(add);
    memoizedAdd(2, 3);
    memoizedAdd(3, 2);
    expect(add).toHaveBeenCalledTimes(2);
  });
});
