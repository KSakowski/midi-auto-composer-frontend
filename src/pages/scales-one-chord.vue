<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Card from 'primevue/card';
  import Checkbox from 'primevue/checkbox';
  import Dropdown from 'primevue/dropdown';
  import ScrollPanel from 'primevue/scrollpanel';
  import {onMounted, reactive, ref, watch} from 'vue';

  import Chord from '@/components/chord/index.vue';
  import Player from '@/components/player/index.vue';
  import Scales from '@/components/scales/scales/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { RandomScalesOneChord } from '@/types/modes';

  const limits = Settings.page.scalesOneChord;
  const player = ref();
  const toReload = ref(false);
  const difficultyOptions = ['easy', 'normal', 'hard'];
  const form = reactive<RandomScalesOneChord>({
    tonation: 'c',
    tempo: limits.tempo.defaultValue,
    scales_names: ['ionian'],
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
    enabled: false
  });

  function loadFile() {
    refetch();
    toReload.value = false;
  }

  watch(form, () => {
    player.value?.stop();
    toReload.value = true;
  });

  const isMounted = ref(false);
  onMounted(() => (isMounted.value = true));
</script>

<template>
  <div>
    <Teleport v-if="isMounted" to=".player-container">
      <Player
          class="text-center"
          ref="player"
          :file="data"
          :to-reload="toReload"
          :is-loading="isFetching"
          @loadFile="loadFile"
      />
    </Teleport>
    <div class="container -mt-8 pb-8">
      <div class="grid w-full">
        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Tonation</template>
            <template #content>
              <Tonation v-model="form.tonation" />

              <div class="p-card-title mt-5" data-pc-section="title">Tempo</div>
              <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Scales</template>
            <template #content>
              <Scales v-model="form.scales_names" />

              <div class="p-card-title mt-5" data-pc-section="title">Chord name</div>
              <Chord v-model="form.chord_name" />

              <div class="p-card-title mt-5" data-pc-section="title">Move Scale Max</div>
              <Tempo
                  class="mb-5"
                  v-model="form.move_scale_max"
                  :min="limits.moveScaleMax.min"
                  :max="limits.moveScaleMax.max"
              />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Quartones</template>
            <template #content>
              <Tempo class="mb-5" v-model="form.quarternotes" :min="limits.quartones.min" :max="limits.quartones.max" />

              <div class="p-card-title mt-5" data-pc-section="title">Difficulty</div>
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
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: random-scales-one-chord
meta:
  layout: default
</route>
