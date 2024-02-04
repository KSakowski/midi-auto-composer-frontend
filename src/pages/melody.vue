<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import ScrollPanel from 'primevue/scrollpanel';
  import { reactive, ref, watch } from 'vue';

  import Player from '@/components/player/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { MelodyMode } from '@/types/modes';

  const limits = Settings.page.pattern;
  const player = ref();
  const toReload = ref(false);
  const form = reactive<MelodyMode>({
    tempo: limits.tempo.defaultValue,
    tonation: 'c',
    melody_id: '0',
    notes_range: [40, 81],
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['melody'],
    queryFn: () => PlayModesService.melody(form),
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
      </ScrollPanel>
    </div>
    <div class="col-23 md:col-8 flex flex-column align-items-center justify-content-center">
      <Player ref="player" :file="data" :to-reload="toReload" :is-loading="isFetching" @loadFile="loadFile" />
    </div>
  </div>
</template>

<route lang="yaml">
name: melody
meta:
  layout: default
</route>
