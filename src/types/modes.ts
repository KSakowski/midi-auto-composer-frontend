export interface PatternMode {
  tempo: number;
  scale_name: string;
  scale_tonation: string;
  pattern: number[];
  play_upwards: boolean;
  preview_pattern: boolean;
  pause_between: boolean;
  notes_range: number[];
}

export type Difficulty = "easy" | "normal" | "hard";

export interface RandomScalesOneChord {
  tempo: number;
  scale: string[];
  chord_name: string;
  tonation: string;
  quarternotes: number;
  move_scale_max: number;
  difficulty: Difficulty;
  bassline: boolean;
  percussion: boolean;
  notes_range: number[];
}
