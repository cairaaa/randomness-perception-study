export type CoinSide = "H" | "T";

export interface Flip {
  position: number;
  value: CoinSide;
  elapsedMs: number;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface SurveySubmission {
  survey: {
    surveyVersion: string;
    startedAt: number | null;
    completedAt: number | null;
  };

  responses: {
    confidence: string | null;
    difficulty: string | null;
    avoidPatterns: string | null;
    avoidStreaks: string | null;
    ageGroup: string | null;
    education: string | null;
    statisticsExperience: string | null;
  };

  coinFlip: {
    flips: Flip[];
    startTime: number | null;
  };
}
