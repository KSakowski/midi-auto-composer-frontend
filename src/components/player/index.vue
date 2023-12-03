<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import ProgressSpinner from 'primevue/progressspinner';
  import { computed, ref, watch } from 'vue';

  import Play from "@/components/player/play.vue";
  import Stop from "@/components/player/stop.vue";

const props = defineProps<{
    file?: ArrayBuffer;
    toReload: boolean;
    isLoading: boolean;
  }>();

  const emit = defineEmits(['loadFile']);

  defineExpose({
    stop,
  });

  const currentSound = ref();
  const isPlaying = ref(false);

  const file = computed(() => {
    if (!props.file) return;
    const blob = new Blob([props.file], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  });

  function play() {
    currentSound.value?.play();
    isPlaying.value = true;
  }

  function stop() {
    currentSound.value?.pause();
    isPlaying.value = false;
  }

  function loadFile() {
    stop();
    currentSound.value = null;
    emit('loadFile');
  }

  watch(file, () => {
    currentSound.value = new Audio(file.value);
    play();
    useEventListener(currentSound.value, 'ended', () => (isPlaying.value = false));
  });
</script>
<template>
  <div v-if="!isLoading" class="text-primary text-center">
    <Play v-if="!file || toReload" @click="loadFile" />
    <template v-else>
      <Play v-if="!isPlaying" @click="play" />
      <Stop v-else @click="stop" />
    </template>
  </div>
  <ProgressSpinner v-else strokeWidth="4" />
</template>
