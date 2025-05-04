import { apiClient } from '@/plugins/axios';
import type { CustomCreator, IntervalsMode, MelodyMode, PatternMode, RandomScalesOneChord } from '@/types/modes';

export default class PlayModesService {
  static async pattern(form: PatternMode): Promise<ArrayBuffer> {
    return (await apiClient.post<ArrayBuffer>('pattern', { ...form })).data;
  }

  static async scalesOneChord(form: RandomScalesOneChord): Promise<ArrayBuffer> {
    return (await apiClient.post<ArrayBuffer>('scales_one_chord', { ...form })).data;
  }

  static async intervals(form: IntervalsMode): Promise<ArrayBuffer> {
    return (await apiClient.post<ArrayBuffer>('intervals', { ...form })).data;
  }

  static async customCreator(form: CustomCreator): Promise<ArrayBuffer> {
    return (await apiClient.post<ArrayBuffer>('custom_creator', { ...form })).data;
  }

  static async melody(form: MelodyMode): Promise<ArrayBuffer> {
    return (await apiClient.post<ArrayBuffer>('melody', { ...form })).data;
  }

  static async melodies(): Promise<Record<string, string>[]> {
    return (await apiClient.get('all_melodies_struct/')).data;
  }
}
