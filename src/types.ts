export type ScreenTab = 'explore-and-hub' | 'daily-arena' | 'results-debrief' | 'leaderboard' | 'badges-and-quests';

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  codeId: string;
  category: string;
  phase: number;
  totalPhases: number;
  tier: string;
  baseXp: number;
  question: string;
  schematicTitle?: string;
  schematicFile?: string;
  hasSchematicSvg?: boolean;
  options: QuizOption[];
  correctOptionId: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  correctChoiceTitle: string;
  userSubmission?: string;
  isCorrect?: boolean;
  solveTimeSeconds?: number;
  specimenImage?: string;
  specimenFig?: string;
  specimenBadge?: string;
  primarySource?: {
    name: string;
    url: string;
  };
  lesson?: string;
}

export interface QuizArena {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorScheme: 'primary' | 'secondary' | 'tertiary' | 'error';
  quizzesCount: number;
  tagline?: string;
  tags: string[];
  activePlayers: number;
  maxXP: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  accuracy: number;
  tag: string;
  avatar?: string;
  isCurrentUser?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  rewardXp: number;
  icon: string;
  completed: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  tier: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  rarityPercent: number;
}
