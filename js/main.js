import { RECORDS_LIMIT } from './core/constants.js';
import { applyGuess, createGame, isRepeatedGuess } from './core/game-state.js';
import { addRecord, createRecord, getRecordsKey } from './core/records.js';
import { generateSecret } from './core/secret.js';
import { changeBase, changeLength } from './core/settings.js';
import { isValidGuess } from './core/validation.js';
import { createElement } from './ui/dom.js';
import { formatTime } from './ui/format.js';
import { createGameView } from './ui/game-view.js';
import { createMascot } from './ui/images.js';
import { createLogo } from './ui/logo-view.js';
import { createRecordsView } from './ui/records-view.js';
import { createSettingsView } from './ui/settings-view.js';
import { createStatsView } from './ui/stats-view.js';
import { loadRecords, loadSettings, saveRecords, saveSettings, } from './ui/storage.js';
import { createWinView } from './ui/win-view.js';
const TICK_MS = 1000;
const DEFAULT_SETTINGS = { length: 4, base: 10 };
let appState = {
    settings: loadSettings(DEFAULT_SETTINGS),
    game: null,
    message: '',
    rank: null,
};
let timerId;
const root = createElement('div', { className: 'app' });
document.body.append(root);
const setState = (changes) => {
    appState = { ...appState, ...changes };
    if (changes.settings) {
        saveSettings(changes.settings);
    }
    render();
};
const stopTimer = () => {
    window.clearInterval(timerId);
    timerId = undefined;
};
const startTimer = (timer, game) => {
    const update = () => {
        timer.textContent = formatTime(Date.now() - game.startedAt);
    };
    stopTimer();
    update();
    timerId = window.setInterval(update, TICK_MS);
};
const saveResult = (game) => {
    const key = getRecordsKey(game.settings);
    const record = createRecord(game);
    const records = addRecord(loadRecords(key), record, RECORDS_LIMIT);
    saveRecords(key, records);
    const index = records.indexOf(record);
    return index === -1 ? null : index + 1;
};
const getGuessError = (game, guess) => {
    const { length, base } = game.settings;
    if (!isValidGuess(guess, length, base)) {
        return `Enter ${length} different digits.`;
    }
    if (isRepeatedGuess(game.history, guess)) {
        return `You have already tried ${guess}.`;
    }
    return null;
};
const handleGuess = (guess) => {
    const { game } = appState;
    if (!game) {
        return;
    }
    const error = getGuessError(game, guess);
    if (error) {
        setState({ message: error });
        return;
    }
    const nextGame = applyGuess(game, guess, Date.now());
    const rank = nextGame.status === 'won' ? saveResult(nextGame) : null;
    setState({ game: nextGame, message: '', rank });
};
const handleStart = () => {
    const { settings } = appState;
    const secret = generateSecret(settings.length, settings.base);
    setState({
        game: createGame(settings, secret, Date.now()),
        message: '',
        rank: null,
    });
};
const handleNewGame = () => {
    stopTimer();
    setState({ game: null, message: '', rank: null });
};
const focusCheckedRadio = (name) => {
    root
        .querySelector(`input[name="${name}"]:checked`)
        ?.focus();
};
const createSidebar = (settings, pose) => createElement('aside', { className: 'sidebar' }, [
    createRecordsView(settings, loadRecords(getRecordsKey(settings))),
    createMascot(pose),
]);
const renderSettingsScreen = (settings) => {
    const settingsView = createSettingsView(settings, {
        onBaseChange: (base) => {
            setState({ settings: changeBase(settings, base) });
            focusCheckedRadio('base');
        },
        onLengthChange: (length) => {
            setState({ settings: changeLength(settings, length) });
            focusCheckedRadio('length');
        },
        onStart: handleStart,
    });
    root.className = 'app app--settings';
    root.replaceChildren(createLogo(false), createElement('main', { className: 'layout' }, [
        settingsView,
        createSidebar(settings, 'wave'),
    ]));
};
const renderGameScreen = (game, message, rank) => {
    const isWon = game.status === 'won';
    const stats = createStatsView(game, handleNewGame);
    const gameView = createGameView(game, message, { onGuess: handleGuess });
    const win = isWon
        ? createWinView(game, rank, {
            onPlayAgain: handleStart,
            onChangeSettings: handleNewGame,
        })
        : null;
    root.className = 'app app--game';
    root.replaceChildren(createElement('div', { className: 'topbar', inert: isWon }, [
        createLogo(true),
        stats.element,
    ]), createElement('main', { className: 'layout', inert: isWon }, [
        gameView.element,
        createSidebar(game.settings, 'hint'),
    ]), ...(win ? [win.element] : []));
    if (!isWon) {
        startTimer(stats.timer, game);
        gameView.input?.focus();
        return;
    }
    stopTimer();
    stats.timer.textContent = formatTime((game.finishedAt ?? game.startedAt) - game.startedAt);
    win?.focusTarget.focus();
};
function render() {
    const { settings, game, message, rank } = appState;
    if (game) {
        renderGameScreen(game, message, rank);
    }
    else {
        renderSettingsScreen(settings);
    }
}
render();
//# sourceMappingURL=main.js.map