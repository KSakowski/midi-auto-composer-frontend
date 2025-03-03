<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Select from 'primevue/select';

  import { Scales } from './scales';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedScale = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Select v-model="selectedScale" :options="Scales" option-label="alias_eng" option-value="value" class="w-full" />
</template>
