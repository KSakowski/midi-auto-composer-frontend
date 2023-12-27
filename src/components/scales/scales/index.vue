<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import MultiSelect from 'primevue/multiselect';

  import { Scales } from '../scales';

  const props = defineProps<{
    modelValue: string[];
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedScale = useVModel(props, 'modelValue', emit);
</script>

<template>
  <MultiSelect v-model="selectedScale" :options="Scales" option-label="alias_eng" option-value="value" class="w-full" />
</template>
