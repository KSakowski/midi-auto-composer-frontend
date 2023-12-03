<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Checkbox from 'primevue/checkbox';
  import ScrollPanel from 'primevue/scrollpanel';
  import { reactive, ref, watch } from 'vue';

  import Pattern from '@/components/pattern/index.vue';
  import Player from '@/components/player/index.vue';
  import AllScales from '@/components/scales/allScales/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import type { PatternMode } from '@/types/pattern';

  const player = ref();
  const toReload = ref(false);
  const form = reactive<PatternMode>({
    tempo: 70,
    scale: 'mixolydian',
    scale_tonation: 'a',
    pattern: [1, 2, 3],
    play_upwards: true,
    preview_pattern: true,
    pause_between: true,
    notes_range: [40, 81],
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['pattern'],
    queryFn: () => PlayModesService.pattern(form),
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
        <Tonation v-model="form.scale_tonation" />

        <h3 class="mb-0">Tempo</h3>
        <Tempo v-model="form.tempo" />

        <h3 class="mb-0">Scales</h3>
        <AllScales v-model="form.scale" />

        <h3 class="mb-0">Pattern</h3>
        <Pattern v-model="form.pattern" />

        <div class="mt-6 mb-2">
          <Checkbox v-model="form.play_upwards" inputId="play_upwards" :binary="true" />
          <label for="play_upwards" class="ml-2">Play upwards</label>
        </div>
        <div class="mb-2">
          <Checkbox v-model="form.preview_pattern" inputId="preview_pattern" :binary="true" />
          <label for="preview_pattern" class="ml-2">Peview pattern</label>
        </div>
        <div class="mb-2">
          <Checkbox v-model="form.pause_between" inputId="pause_between" :binary="true" />
          <label for="pause_between" class="ml-2">Pause between</label>
        </div>
      </ScrollPanel>
    </div>
    <div class="col-23 md:col-8 flex flex-column align-items-center justify-content-center">
      <Player ref="player" :file="data" :to-reload="toReload" :is-loading="isFetching" @loadFile="loadFile" />
    </div>
  </div>
</template>

<route lang="yaml">
name: home
meta:
  layout: default
</route>
