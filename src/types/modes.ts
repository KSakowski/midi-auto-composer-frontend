export interface PatternMode {
  tempo: number;
  scale_name: string;
  tonation: string;
  pattern: number[];
  play_upwards: boolean;
  notes_range: number[];
}

export type Difficulty = "easy" | "normal" | "hard";

export interface RandomScalesOneChord {
  tempo: number;
  scales_names: string[];
  chord_name: string;
  tonation: string;
  difficulty: Difficulty;
  bassline: boolean;
  percussion: boolean;
  notes_range: number[];
}

export interface IntervalsMode {
  tempo: number;
  intervals: string[];
  difficulty: Difficulty;
  notes_range: number[];
}

export interface ComponentForm {
  order?: string;
  tonation: string;
  quarternotes: number;
  scale_name: string;
  chord_name: string;
}

export interface CustomCreatorParams {
  tempo: number;
}

export interface CustomCreator extends CustomCreatorParams {
  components: ComponentForm[];
}

export interface MelodyMode {
  tempo: number;
  tonation: string;
  melody_id: string;
  notes_range: number[];
}
