<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Select from 'primevue/select';

  const props = defineProps<{
    modelValue: string;
    melodies: Record<string, string>[];
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedScale = useVModel(props, 'modelValue', emit);

  // TODO
  const options = [
    {
      id: 1,
      name: 'Fur Elise',
    },
  ];
</script>

<template>
  <Select v-model="selectedScale" :options="options" class="w-full" :option-value="'id'" :option-label="'name'" />
</template>
