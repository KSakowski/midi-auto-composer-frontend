<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Card from 'primevue/card';
  import { onMounted, reactive, ref, watch } from 'vue';

  import Player from '@/components/player/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import type { MelodyMode } from '@/types/modes';

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
    <div class="container sm:-mt-8 pb-8">
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
