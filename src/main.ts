import { RECORDS_LIMIT } from './core/constants.js';
import { applyGuess, createGame, isRepeatedGuess } from './core/game-state.js';
import { addRecord, createRecord, getRecordsKey } from './core/records.js';
import { generateSecret } from './core/secret.js';
import { changeBase, changeLength } from './core/settings.js';
import type { GameSettings, GameState } from './core/types.js';
import { isValidGuess } from './core/validation.js';
import { createElement } from './ui/dom.js';
import { formatTime } from './ui/format.js';
import { createGameView } from './ui/game-view.js';
import { createMascot, type MascotPose } from './ui/images.js';
import { createLogo } from './ui/logo-view.js';
import { createRecordsView } from './ui/records-view.js';
import { createSettingsView } from './ui/settings-view.js';
import { createStatsView } from './ui/stats-view.js';
import { loadRecords, saveRecords } from './ui/storage.js';

interface AppState {
  readonly settings: GameSettings;
  readonly game: GameState | null;
  readonly message: string;
}

const TICK_MS = 1000;

let appState: AppState = {
  settings: { length: 4, base: 10 },
  game: null,
  message: '',
};
let timerId: number | undefined;

const root = createElement('div', { className: 'app' });
document.body.append(root);

const setState = (changes: Partial<AppState>) => {
  appState = { ...appState, ...changes };
  render();
};

const stopTimer = () => {
  window.clearInterval(timerId);
  timerId = undefined;
};

const startTimer = (timer: HTMLElement, game: GameState) => {
  const update = () => {
    timer.textContent = formatTime(Date.now() - game.startedAt);
  };

  stopTimer();
  update();
  timerId = window.setInterval(update, TICK_MS);
};

const saveResult = (game: GameState) => {
  const key = getRecordsKey(game.settings);

  saveRecords(
    key,
    addRecord(loadRecords(key), createRecord(game), RECORDS_LIMIT),
  );
};

const getGuessError = (game: GameState, guess: string): string | null => {
  const { length, base } = game.settings;

  if (!isValidGuess(guess, length, base)) {
    return `Enter ${length} different digits.`;
  }

  if (isRepeatedGuess(game.history, guess)) {
    return `You have already tried ${guess}.`;
  }

  return null;
};

const handleGuess = (guess: string) => {
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

  if (nextGame.status === 'won') {
    saveResult(nextGame);
  }

  setState({ game: nextGame, message: '' });
};

const handleStart = () => {
  const { settings } = appState;
  const secret = generateSecret(settings.length, settings.base);

  setState({ game: createGame(settings, secret, Date.now()), message: '' });
};

const handleNewGame = () => {
  stopTimer();
  setState({ game: null, message: '' });
};

const focusCheckedRadio = (name: string) => {
  root
    .querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
    ?.focus();
};

const createSidebar = (settings: GameSettings, pose: MascotPose) =>
  createElement('aside', { className: 'sidebar' }, [
    createRecordsView(settings, loadRecords(getRecordsKey(settings))),
    createMascot(pose),
  ]);

const renderSettingsScreen = (settings: GameSettings) => {
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
  root.replaceChildren(
    createLogo(false),
    createElement('main', { className: 'layout' }, [
      settingsView,
      createSidebar(settings, 'wave'),
    ]),
  );
};

const renderGameScreen = (game: GameState, message: string) => {
  const stats = createStatsView(game, handleNewGame);
  const gameView = createGameView(game, message, { onGuess: handleGuess });

  root.className = 'app app--game';
  root.replaceChildren(
    createElement('div', { className: 'topbar' }, [
      createLogo(true),
      stats.element,
    ]),
    createElement('main', { className: 'layout' }, [
      gameView.element,
      createSidebar(game.settings, 'hint'),
    ]),
  );

  if (game.status === 'playing') {
    startTimer(stats.timer, game);
    gameView.input?.focus();
    return;
  }

  stopTimer();
  stats.timer.textContent = formatTime(
    (game.finishedAt ?? game.startedAt) - game.startedAt,
  );
};

function render() {
  const { settings, game, message } = appState;

  if (game) {
    renderGameScreen(game, message);
  } else {
    renderSettingsScreen(settings);
  }
}

render();
