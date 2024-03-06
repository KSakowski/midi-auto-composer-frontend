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
  import Card from "primevue/card";

  const limits = Settings.page.pattern;
  const player = ref();
  const toReload = ref(false);
  const form = reactive<MelodyMode>({
    tempo: 60,
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
  <div>
    <div class="at-header">
      <div class="container py-3">
        <h1 class="text-white text-center">Melody</h1>
        <p class="text-white max-w-30rem text-center mx-auto">
          Choose one of the most wisely known melody its tonation and tempo.
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
            <template #title>Tonation</template>
            <template #content>
              <Tonation v-model="form.tonation" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Tempo</template>
            <template #content>
              <Tempo v-model="form.tempo" :min="20" :max="80" />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: melody
meta:
  layout: default
</route>
