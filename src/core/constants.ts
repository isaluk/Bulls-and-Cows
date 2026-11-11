import type { Base } from './types.js';

export const ALL_DIGITS = '0123456789abcdef';

export const MIN_LENGTH = 2;
export const MAX_LENGTH = 6;

export const RECORDS_LIMIT = 10;

export const BASE_OPTIONS: readonly { value: Base; label: string }[] = [
  { value: 2, label: 'bin' },
  { value: 8, label: 'oct' },
  { value: 10, label: 'dec' },
  { value: 16, label: 'hex' },
];
