export const Tonations = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const TonationSettings: { [key: string]: { label: string; offset?: boolean } } = {
  C: { label: 'C', offset: true },
  'C#': { label: 'C# D♭' },
  D: { label: 'D', offset: true },
  'D#': { label: 'D# E♭' },
  E: { label: 'E', offset: true },
  F: { label: 'F' },
  'F#': { label: 'F# G♭' },
  G: { label: 'G', offset: true },
  'G#': { label: 'G# A♭' },
  A: { label: 'A', offset: true },
  'A#': { label: 'A# B♭' },
  B: { label: 'B', offset: true },
};
