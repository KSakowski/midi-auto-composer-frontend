<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Dropdown from 'primevue/dropdown';

  import { Chords } from './chords';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedChord = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Dropdown v-model="selectedChord" :options="Chords" option-label="alias_eng" option-value="value" class="w-full" />
</template>
