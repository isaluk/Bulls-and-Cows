export const getRecordsKey = ({ length, base }) => `${length}-${base}`;
export const compareRecords = (a, b) => a.attempts - b.attempts || a.timeMs - b.timeMs;
export const addRecord = (records, record, limit) => [...records, record].sort(compareRecords).slice(0, limit);
export const createRecord = (game) => {
    const finishedAt = game.finishedAt ?? game.startedAt;
    return {
        length: game.settings.length,
        base: game.settings.base,
        attempts: game.history.length,
        timeMs: finishedAt - game.startedAt,
        date: finishedAt,
    };
};
//# sourceMappingURL=records.js.map