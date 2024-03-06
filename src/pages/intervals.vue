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
  import Card from "primevue/card";

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
  <div>
    <div class="at-header">
      <div class="container py-3">
        <h1 class="text-white text-center">Intervals</h1>
        <p class="text-white max-w-30rem text-center mx-auto">
          This excercise helps you to train your musical hearing. Select which intervals will be played randomly, upwards or downwards, one after another.
        </p>
        <Player
            class="text-center"
            ref="player"
            :file="data"
            :to-reload="toReload"
            :is-loading="isFetching"
            @loadFile="loadFile"
        />
      </div>
    </div>
    <div class="container -mt-8 pb-8">
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
              <Dropdown v-model="form.difficulty" :options="difficultyOptions" class="w-full mb-5" />
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
