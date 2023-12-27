import { apiClient } from '@/plugins/axios';
import type { PatternMode, RandomScalesOneChord } from '@/types/modes';

export default class PlayModesService {
  static async pattern(form: PatternMode): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'pattern',
        { ...form },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      )
    ).data;
  }

  static async randomScalesOneChord(form: RandomScalesOneChord): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'random_scales_one_chord',
        { ...form },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        },
      )
    ).data;
  }
}
