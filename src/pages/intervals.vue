<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Dropdown from 'primevue/dropdown';
  import ScrollPanel from 'primevue/scrollpanel';
  import { reactive, ref, watch } from 'vue';

  import Intervals from '@/components/intervals/index.vue';
  import Player from '@/components/player/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { IntervalsMode } from '@/types/modes';

  const limits = Settings.page.intervals;
  const player = ref();
  const toReload = ref(false);
  const difficultyOptions = ['easy', 'normal', 'hard'];
  const form = reactive<IntervalsMode>({
    tempo: limits.tempo.defaultValue,
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
  <div class="grid grid-nogutter">
    <div class="col-12 md:col-4">
      <ScrollPanel class="pr-3" style="width: 100%; height: calc(100vh - 180px)">
        <h3 class="mb-0">Tempo</h3>
        <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />

        <h3 class="mb-0">Intervals</h3>
        <Intervals v-model="form.intervals" />

        <h3 class="mb-0">Difficulty</h3>
        <Dropdown v-model="form.difficulty" :options="difficultyOptions" class="w-full mb-5" />
      </ScrollPanel>
    </div>
    <div class="col-23 md:col-8 flex flex-column align-items-center justify-content-center">
      <Player ref="player" :file="data" :to-reload="toReload" :is-loading="isFetching" @loadFile="loadFile" />
    </div>
  </div>
</template>

<route lang="yaml">
name: intervals
meta:
  layout: default
</route>
