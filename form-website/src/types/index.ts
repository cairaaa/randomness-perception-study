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