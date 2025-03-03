<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Card from 'primevue/card';
  import Select from 'primevue/select';
  import { reactive, ref, watch } from 'vue';

  import Intervals from '@/components/intervals/index.vue';
  import Player from '@/components/player/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { IntervalsMode } from '@/types/modes';

  const limits = Settings.page.intervals;
  const difficultyOptions = ['easy', 'normal', 'hard'];
  const player = ref();
  const toReload = ref(false);
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

  function loadFile() {
    refetch();
    toReload.value = false;
  }

  watch(form, () => {
    player.value?.stop();
    toReload.value = true;
  });
</script>

<template>
  <div>
    <div class="container sm:-mt-8 pb-8">
      <Player
        class="mb-4 text-center"
        ref="player"
        :file="data"
        :to-reload="toReload"
        :is-loading="isFetching"
        @loadFile="loadFile"
      />
      <div class="grid w-full">
        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Tempo</template>
            <template #content>
              <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Intervals</template>
            <template #content>
              <Intervals v-model="form.intervals" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Difficulty</template>
            <template #content>
              <Select v-model="form.difficulty" :options="difficultyOptions" class="w-full mb-5" />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: intervals
meta:
  layout: default
</route>
