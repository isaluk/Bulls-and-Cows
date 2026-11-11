import { getRecordsKey } from './core/records.js';
import { changeBase, changeLength } from './core/settings.js';
import type { GameSettings } from './core/types.js';
import { createElement } from './ui/dom.js';
import { createMascot } from './ui/images.js';
import { createLogo } from './ui/logo-view.js';
import { createRecordsView } from './ui/records-view.js';
import { createSettingsView } from './ui/settings-view.js';
import { loadRecords } from './ui/storage.js';

interface AppState {
  readonly settings: GameSettings;
}

let appState: AppState = {
  settings: { length: 4, base: 10 },
};

const root = createElement('div', { className: 'app' });
document.body.append(root);

const setState = (changes: Partial<AppState>) => {
  appState = { ...appState, ...changes };
  render();
};

const focusCheckedRadio = (name: string) => {
  root
    .querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
    ?.focus();
};

const createSidebar = (settings: GameSettings) =>
  createElement('aside', { className: 'sidebar' }, [
    createRecordsView(settings, loadRecords(getRecordsKey(settings))),
    createMascot('wave'),
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
    onStart: () => {},
  });

  root.className = 'app app--settings';
  root.replaceChildren(
    createLogo(false),
    createElement('main', { className: 'layout' }, [
      settingsView,
      createSidebar(settings),
    ]),
  );
};

function render() {
  renderSettingsScreen(appState.settings);
}

render();
