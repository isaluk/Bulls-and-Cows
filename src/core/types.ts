export type Base = 2 | 8 | 10 | 16;

export type RandomSource = () => number;

export interface GuessResult {
  readonly bulls: number;
  readonly cows: number;
}

export interface GameSettings {
  readonly length: number;
  readonly base: Base;
}

export interface HistoryEntry extends GuessResult {
  readonly guess: string;
}

export type GameStatus = 'playing' | 'won';

export interface GameState {
  readonly settings: GameSettings;
  readonly secret: string;
  readonly history: readonly HistoryEntry[];
  readonly status: GameStatus;
  readonly startedAt: number;
  readonly finishedAt: number | null;
}

export interface GameRecord {
  readonly length: number;
  readonly base: Base;
  readonly attempts: number;
  readonly timeMs: number;
  readonly date: number;
}
