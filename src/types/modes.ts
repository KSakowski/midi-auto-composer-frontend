export interface PatternMode {
  tempo: number;
  scale_name: string;
  tonation: string;
  pattern: number[];
  play_upwards: boolean;
  preview_pattern: boolean;
  pause_between: boolean;
  notes_range: number[];
}

export type Difficulty = "easy" | "normal" | "hard";

export interface RandomScalesOneChord {
  tempo: number;
  scales_names: string[];
  chord_name: string;
  tonation: string;
  quarternotes: number;
  move_scale_max: number;
  difficulty: Difficulty;
  bassline: boolean;
  percussion: boolean;
  random_sequence: boolean;
  notes_range: number[];
}

export interface IntervalsMode {
  tempo: number;
  intervals: string[];
  difficulty: Difficulty;
  notes_range: number[];
}
