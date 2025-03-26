<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import ProgressSpinner from 'primevue/progressspinner';
  import { computed, ref, watch } from 'vue';
  import { onBeforeRouteLeave } from 'vue-router';

  import Play from '@/components/player/play.vue';
  import Stop from '@/components/player/stop.vue';

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
    currentSound.value = new Audio(file.value);

    currentSound.value?.load();
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

  onBeforeRouteLeave(() => stop());
</script>
<template>
  <transition name="fade" mode="out-in">
    <div v-if="!isLoading" class="text-white">
      <Play v-if="!file || toReload" @click="loadFile" />
      <template v-else>
        <Play v-if="!isPlaying" @click="play" />
        <Stop v-else @click="stop" />
      </template>
    </div>
    <ProgressSpinner
      v-else
      class="player-spinner flex m-auto"
      style="width: 34px; height: 34px"
      strokeWidth="8"
      fill="transparent"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </transition>
</template>

<style lang="scss">
  .player-spinner {
    width: 36px;
    height: 36px;
    .p-progressspinner-spin .p-progressspinner-circle {
      stroke: #fff !important;
    }
  }
</style>
