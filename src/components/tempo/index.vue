<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import InputNumber from 'primevue/inputnumber';
  import Slider from 'primevue/slider';

  const props = withDefaults(
    defineProps<{
      modelValue: number;
      min?: number;
      max?: number;
    }>(),
    {
      min: 80,
      max: 150,
    },
  );

  const emit = defineEmits(['update:modelValue']);

  const tempo = useVModel(props, 'modelValue', emit);
</script>

<template>
  <div class="tempo">
    <InputNumber v-model="tempo" :min="min" :max="max" class="w-full mb-4" />
    <Slider v-model="tempo" :min="min" :max="max" class="mx-3" />
  </div>
</template>

<style lang="scss">
.tempo {
  .p-inputtext {
    text-align: center;
  }
}
</style>
