import { apiClient } from '@/plugins/axios';
import type { CustomCreator, IntervalsMode, MelodyMode, PatternMode, RandomScalesOneChord } from '@/types/modes';

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

  static async scalesOneChord(form: RandomScalesOneChord): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'scales_one_chord',
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

  static async intervals(form: IntervalsMode): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'intervals',
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

  static async customCreator(form: CustomCreator): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'custom_creator',
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

  static async melody(form: MelodyMode): Promise<ArrayBuffer> {
    return (
      await apiClient.post<ArrayBuffer>(
        'melody',
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
