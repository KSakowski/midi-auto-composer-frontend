<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Checkbox from 'primevue/checkbox';
  import Dropdown from 'primevue/dropdown';
  import ScrollPanel from 'primevue/scrollpanel';
  import { reactive, ref, watch } from 'vue';

  import Chord from '@/components/chord/index.vue';
  import Player from '@/components/player/index.vue';
  import Scales from '@/components/scales/scales/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { RandomScalesOneChord } from '@/types/modes';

  const limits = Settings.page.sacalesOneChord;
  const player = ref();
  const toReload = ref(false);
  const difficultyOptions = ['easy', 'normal', 'hard'];
  const form = reactive<RandomScalesOneChord>({
    tonation: 'a',
    tempo: limits.tempo.defaultValue,
    scales: ['mixolydian'],
    chord_name: 'major',
    quarternotes: limits.quartones.defaultValue,
    move_scale_max: limits.moveScaleMax.defaultValue,
    difficulty: 'normal',
    bassline: true,
    percussion: true,
    random_sequence: true,
    notes_range: [40, 81],
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['randomScalesOneChord'],
    queryFn: () => PlayModesService.scalesOneChord(form),
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
        <h3 class="mb-0">Tonation</h3>
        <Tonation v-model="form.tonation" />

        <h3 class="mb-0">Tempo</h3>
        <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />

        <h3 class="mb-0">Scales</h3>
        <Scales v-model="form.scales" />

        <h3 class="mb-0">Chord name</h3>
        <Chord v-model="form.chord_name" />

        <h3 class="mb-0">Move Scale Max</h3>
        <Tempo
          class="mb-5"
          v-model="form.move_scale_max"
          :min="limits.moveScaleMax.min"
          :max="limits.moveScaleMax.max"
        />

        <h3 class="mb-0">Quartones</h3>
        <Tempo class="mb-5" v-model="form.quarternotes" :min="limits.quartones.min" :max="limits.quartones.max" />

        <h3 class="mb-0">Difficulty</h3>
        <Dropdown v-model="form.difficulty" :options="difficultyOptions" class="w-full mb-5" />

        <div class="flex align-items-center mb-2">
          <Checkbox v-model="form.bassline" inputId="bassline" :binary="true" />
          <label for="bassline" class="ml-2">Bassline</label>
        </div>
        <div class="flex align-items-center mb-2">
          <Checkbox v-model="form.percussion" inputId="percussion" :binary="true" />
          <label for="percussion" class="ml-2">Percussion</label>
        </div>
        <div class="flex align-items-center mb-2">
          <Checkbox v-model="form.random_sequence" inputId="random_sequence" :binary="true" />
          <label for="random_sequence" class="ml-2">Random sequence</label>
        </div>
      </ScrollPanel>
    </div>
    <div class="col-23 md:col-8 flex flex-column align-items-center justify-content-center">
      <Player ref="player" :file="data" :to-reload="toReload" :is-loading="isFetching" @loadFile="loadFile" />
    </div>
  </div>
</template>

<route lang="yaml">
name: random-scales-one-chord
meta:
  layout: default
</route>
