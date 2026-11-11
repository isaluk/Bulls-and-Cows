import { createElement } from './dom.js';
import { formatDate, formatSettings, formatTime } from './format.js';
const COLUMNS = ['#', 'Attempts', 'Time', 'Date'];
const createRow = (record, index) => createElement('tr', {}, [
    createElement('td', {
        className: 'records__rank',
        textContent: String(index + 1),
    }),
    createElement('td', { textContent: String(record.attempts) }),
    createElement('td', { textContent: formatTime(record.timeMs) }),
    createElement('td', {
        className: 'records__date',
        textContent: formatDate(record.date),
    }),
]);
const createTable = (records) => createElement('table', { className: 'records' }, [
    createElement('thead', {}, [
        createElement('tr', {}, COLUMNS.map((title) => createElement('th', { scope: 'col', textContent: title }))),
    ]),
    createElement('tbody', {}, records.map(createRow)),
]);
export const createRecordsView = (settings, records) => createElement('section', { className: 'tombstone' }, [
    createElement('h2', {
        className: 'tombstone__title',
        textContent: 'Hall of Bones',
    }),
    createElement('span', {
        className: 'tag',
        textContent: formatSettings(settings),
    }),
    records.length > 0
        ? createTable(records)
        : createElement('p', {
            className: 'tombstone__empty',
            textContent: 'No records yet. Be the first!',
        }),
]);
//# sourceMappingURL=records-view.js.map