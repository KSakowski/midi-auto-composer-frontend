<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import MultiSelect from 'primevue/multiselect';

  import { Intervals } from './intervals';

  const props = defineProps<{
    modelValue: string[];
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedIntervals = useVModel(props, 'modelValue', emit);
</script>

<template>
  <MultiSelect
    v-model="selectedIntervals"
    :options="Intervals"
    option-label="alias_eng"
    option-value="value"
    class="w-full"
  />
</template>
