import {reactive} from "vue";
import type {PatternMode} from "@/types/modes";

export const patternForm = reactive<PatternMode>({
    tempo: limits.tempo.defaultValue,
    scale_name: 'ionian',
    tonation: 'c',
    pattern: [1, 2, 3],
    play_upwards: true,
    preview_pattern: true,
    pause_between: true,
    notes_range: [40, 81],
});
