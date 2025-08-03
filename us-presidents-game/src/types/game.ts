export interface President {
  id: number;
  name: string;
  yearsInService: string;
  imageUrl: string;
  order: number;
}

export interface GameState {
  currentLevel: number;
  score: number;
  answers: GameAnswer[];
  playerName: string;
  gameStarted: boolean;
  gameCompleted: boolean;
}

export interface GameAnswer {
  level: number;
  targetPresident: President;
  selectedPresident: President | null;
  isCorrect: boolean;
  timeToAnswer?: number;
}

export interface HallOfFameEntry {
  playerName: string;
  score: number;
  totalLevels: number;
  date: string;
}