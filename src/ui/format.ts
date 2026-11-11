import { BASE_OPTIONS } from '../core/constants.js';
import type { Base, GameSettings } from '../core/types.js';

export const padZero = (value: number): string =>
  String(value).padStart(2, '0');

export const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);

  return `${padZero(Math.floor(totalSeconds / 60))}:${padZero(totalSeconds % 60)}`;
};

export const formatIndex = (index: number): string => padZero(index + 1);

export const formatNumber = (value: number): string =>
  value.toLocaleString('en-US');

export const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleDateString('en-GB');

export const formatCount = (count: number, noun: string): string =>
  `${count} ${count === 1 ? noun : `${noun}s`}`;

export const getBaseLabel = (base: Base): string =>
  BASE_OPTIONS.find((option) => option.value === base)?.label ?? String(base);

export const formatSettings = ({ length, base }: GameSettings): string =>
  `${length} digits · ${getBaseLabel(base)}`;

export const formatMode = ({ length, base }: GameSettings): string =>
  `${length} · ${getBaseLabel(base)}`;
