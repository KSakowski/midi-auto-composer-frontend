<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Select from 'primevue/select';

  import { Chords } from './chords';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedChord = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Select v-model="selectedChord" :options="Chords" option-label="alias_eng" option-value="value" class="w-full" />
</template>
