<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Dropdown from 'primevue/dropdown';

  import { Scales } from './scales';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedScale = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Dropdown v-model="selectedScale" :options="Scales" option-label="alias_eng" option-value="value" class="w-full" />
</template>
