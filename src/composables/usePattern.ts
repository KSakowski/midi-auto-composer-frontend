import { useQuery } from '@tanstack/vue-query';
import { reactive } from 'vue';

import PlayModesService from '@/services/playModes';
import { Settings } from '@/settings';
import type { PatternMode } from '@/types/modes';

export const usePattern = () => {
  const form = reactive<PatternMode>({
    tempo: Settings.page.pattern.tempo.defaultValue,
    scale_name: 'ionian',
    tonation: 'c',
    pattern: [1, 2, 3],
    play_upwards: true,
    preview_pattern: true,
    pause_between: true,
    notes_range: [40, 81],
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['pattern'],
    queryFn: () => PlayModesService.pattern(form),
    enabled: false,
  });

  return { form, data, isFetching, refetch };
};
