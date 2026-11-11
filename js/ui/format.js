import { BASE_OPTIONS } from '../core/constants.js';
export const padZero = (value) => String(value).padStart(2, '0');
export const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    return `${padZero(Math.floor(totalSeconds / 60))}:${padZero(totalSeconds % 60)}`;
};
export const formatIndex = (index) => padZero(index + 1);
export const formatNumber = (value) => value.toLocaleString('en-US');
export const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('en-GB');
export const formatCount = (count, noun) => `${count} ${count === 1 ? noun : `${noun}s`}`;
export const getBaseLabel = (base) => BASE_OPTIONS.find((option) => option.value === base)?.label ?? String(base);
export const formatSettings = ({ length, base }) => `${length} digits · ${getBaseLabel(base)}`;
export const formatMode = ({ length, base }) => `${length} · ${getBaseLabel(base)}`;
//# sourceMappingURL=format.js.map