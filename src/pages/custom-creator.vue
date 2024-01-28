<script setup lang="ts">
  import { useQuery } from '@tanstack/vue-query';
  import { useSortable } from '@vueuse/integrations/useSortable';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import ScrollPanel from 'primevue/scrollpanel';
  import { reactive, ref, watch } from 'vue';

  import Chord from '@/components/chord/index.vue';
  import Player from '@/components/player/index.vue';
  import AllScales from '@/components/scales/allScales/index.vue';
  import Tempo from '@/components/tempo/index.vue';
  import Tonation from '@/components/tonation/index.vue';
  import PlayModesService from '@/services/playModes';
  import { Settings } from '@/settings';
  import type { ComponentForm, CustomCreatorParams } from '@/types/modes';

  const isDialogVisible = ref(false);
  const limits = Settings.page.customCreator;
  const player = ref();
  const toReload = ref(false);

  const defaultComponentValue: ComponentForm = {
    tonation: 'c',
    quarternotes: limits.quarternotes.defaultValue,
    scale_name: 'ionian',
    chord_name: 'major',
  };
  const componentsEl = ref<HTMLElement | null>(null);
  const components = ref<ComponentForm[]>([{ order: crypto.randomUUID(), ...defaultComponentValue }]);

  const paramsForm = reactive<CustomCreatorParams>({
    tempo: limits.tempo.defaultValue,
  });
  const componentForm = reactive<{ component: ComponentForm }>({
    component: {
      ...defaultComponentValue,
    },
  });

  const { isFetching, data, refetch } = useQuery({
    queryKey: ['customCreator'],
    queryFn: () =>
      PlayModesService.customCreator({
        tempo: paramsForm.tempo,
        components: components.value,
      }),
    enabled: false,
  });

  function loadFile() {
    refetch();
    toReload.value = false;
  }

  function addNewComponent() {
    components.value.push({
      order: crypto.randomUUID(),
      ...componentForm.component,
    });
    isDialogVisible.value = false;
    componentForm.component = { ...defaultComponentValue };
  }

  function removeComponent(index: number) {
    components.value = components.value.filter((component, componentIndex) => componentIndex !== index);
  }

  watch(() => [paramsForm, components.value], () => {
    player.value?.stop();
    toReload.value = true;
  });

  const { option } = useSortable(componentsEl, components);
  option('animation', 200)
</script>

<template>
  <div class="grid grid-nogutter">
    <div class="col-12 md:col-4">
      <ScrollPanel class="pr-3" style="width: 100%; height: calc(100vh - 180px)">
        <h3 class="mb-0">Tempo</h3>
        <Tempo v-model="paramsForm.tempo" :min="limits.tempo.min" :max="limits.tempo.max" />
      </ScrollPanel>
    </div>
    <div class="col-23 md:col-8 flex flex-column align-items-center justify-content-center">
      <Player
        ref="player"
        class="mb-5"
        :file="data"
        :to-reload="toReload"
        :is-loading="isFetching"
        @loadFile="loadFile"
      />

      <div ref="componentsEl" class="grid w-full px-4 mb-2">
        <div
          class="md:col-6 lg:col-3 relative cursor-pointer"
          v-for="(component, index) in components"
          :key="component.order"
        >
          <div class="bg-gray-800 hover:bg-gray-700 border-round p-2 text-center">
            <p class="m-0">{{ component.tonation }}</p>
            <p class="m-0">{{ component.quarternotes }} / 4</p>
            <p class="m-0">{{ component.scale_name }}</p>
            <p class="m-0">{{ component.chord_name }}</p>

            <Button
              class="absolute top-0 right-0 border-round p-0"
              severity="danger"
              size="small"
              @click="removeComponent(index)"
            >
              <span class="material-symbols-outlined">delete</span>
            </Button>
          </div>
        </div>
      </div>
      <Button class="p-0" size="small" @click="isDialogVisible = true">
        <span class="material-symbols-outlined">add</span>
      </Button>
    </div>

    <Dialog
      v-model:visible="isDialogVisible"
      modal
      header="Component"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <h3 class="mb-0">Tonation</h3>
      <Tonation class="mb-2" v-model="componentForm.component.tonation" />
      <h3 class="mb-0">Quarternotes</h3>
      <Tempo
        class="mb-5"
        v-model="componentForm.component.quarternotes"
        :min="limits.quarternotes.min"
        :max="limits.quarternotes.max"
      />
      <h3 class="mb-0">Scale</h3>
      <AllScales class="mb-2" v-model="componentForm.component.scale_name" />
      <h3 class="mb-0">Chord</h3>
      <Chord class="mb-2" v-model="componentForm.component.chord_name" />

      <Button class="mt-4" size="small" @click="addNewComponent">Add</Button>
    </Dialog>
  </div>
</template>

<route lang="yaml">
name: custom-creator
meta:
  layout: default
</route>
