<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import Card from 'primevue/card';
  import Checkbox from 'primevue/checkbox';
  import { onMounted, reactive, ref, watch } from 'vue';

  import Pattern from '@/components/pattern/index.vue';
  import Player from '@/components/player/index.vue';
  import AllScales from '@/components/scales/allScales/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { PatternMode } from '@/types/modes';

  const limits = Settings.page.pattern;
  const player = ref();
  const toReload = ref(false);

  const form = reactive<PatternMode>({
    tempo: Settings.page.pattern.tempo.defaultValue,
    scale_name: 'ionian',
    tonation: 'c',
    pattern: [1, 2, 3],
    play_upwards: true,
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
              <Tempo v-model="form.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />

              <div class="p-card-title mt-5" data-pc-section="title">Scales</div>
              <AllScales v-model="form.scale_name" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-4">
          <Card class="w-full h-full">
            <template #title>Pattern</template>
            <template #content>
              <Pattern v-model="form.pattern" :max-length="limits.pattern.maxLength" />

              <div class="flex align-items-center mt-6 mb-2">
                <Checkbox v-model="form.play_upwards" inputId="play_upwards" :binary="true" />
                <label for="play_upwards" class="ml-2">Play upwards</label>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: home
meta:
  layout: default
</route>
