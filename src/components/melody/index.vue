<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Select from 'primevue/select';

  const props = defineProps<{
    modelValue: number;
    melodies: Record<string, string>[];
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedScale = useVModel(props, 'modelValue', emit);
</script>

<template>
  <Select v-model="selectedScale" :options="melodies" class="w-full" :option-value="'id'" :option-label="'name'" />
</template>
