<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import InputText from 'primevue/inputtext';
  import Slider from 'primevue/slider';

  const props = defineProps<{
    modelValue: number;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const tempo = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div>
    <InputText v-model.number="tempo" type="number" class="w-full mb-4 text-center" />
    <Slider v-model="tempo" :min="40" :max="70" class="mx-3" />
  </div>
</template>
