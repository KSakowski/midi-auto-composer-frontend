import { apiClient } from '@/plugins/axios';
import type { PatternMode } from '@/types/pattern';

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
}
