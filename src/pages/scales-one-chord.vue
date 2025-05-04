<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Card from 'primevue/card';
  import Checkbox from 'primevue/checkbox';
  import Select from 'primevue/select';
  import { reactive, ref, watch } from 'vue';

  import Chord from '@/components/chord/index.vue';
  import Player from '@/components/player/index.vue';
  import TreeScales from '@/components/scales/treeScales/index.vue';
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
    difficulty: 'normal',
    bassline: true,
    percussion: true,
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
  <div>
    <div class="container -mt-8 pb-8">
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
            <template #title>Tonation</template>
            <template #content>
              <Tonation v-model="form.tonation" />

              <div class="p-card-title mt-5 mb-3" data-pc-section="title">Tempo</div>
              <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Scales</template>
            <template #content>
              <TreeScales
                :values="form.scales_names"
                @update:model-value="(values: string[]) => (form.scales_names = values)"
              />

              <div class="p-card-title mt-5 mb-3" data-pc-section="title">Chord name</div>
              <Chord v-model="form.chord_name" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Difficulty</template>
            <template #content>
              <Select v-model="form.difficulty" :options="difficultyOptions" class="w-full mb-5" />

              <div class="flex align-items-center mb-2">
                <Checkbox v-model="form.bassline" inputId="bassline" :binary="true" />
                <label for="bassline" class="ml-2">Bassline</label>
              </div>
              <div class="flex align-items-center mb-2">
                <Checkbox v-model="form.percussion" inputId="percussion" :binary="true" />
                <label for="percussion" class="ml-2">Percussion</label>
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
