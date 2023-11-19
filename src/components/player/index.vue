<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    file?: ArrayBuffer;
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
  <div class="text-primary text-center">
    <span v-if="!file" class="material-symbols-outlined text-8xl cursor-pointer" @click="loadFile">play_circle</span>
    <template v-else>
      <span v-if="!isPlaying" class="material-symbols-outlined text-8xl cursor-pointer" @click="play">play_circle</span>
      <span v-else class="material-symbols-outlined text-8xl cursor-pointer" @click="stop">stop_circle</span>
    </template>
  </div>
</template>
