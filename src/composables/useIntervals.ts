import { useQuery } from '@tanstack/vue-query';
import { reactive } from 'vue';

import PlayModesService from '@/services/playModes';
import { Settings } from '@/settings';
import type { IntervalsMode } from '@/types/modes';

export const useIntervals = () => {
  const form = reactive<IntervalsMode>({
    tempo: Settings.page.intervals.tempo.defaultValue,
    intervals: ['m2'],
    difficulty: 'normal',
    notes_range: [40, 81],
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['intervals'],
    queryFn: () => PlayModesService.intervals(form),
    enabled: false,
  });

  return { form, data, isFetching, refetch };
};
