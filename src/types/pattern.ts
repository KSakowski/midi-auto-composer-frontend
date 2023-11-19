export interface PatternMode {
  tempo: number;
  scale: string;
  scale_tonation: string;
  pattern: number[];
  play_upwards: boolean;
  preview_pattern: boolean;
  pause_between: boolean;
  notes_range: number[];
}
