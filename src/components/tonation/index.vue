<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Button from 'primevue/button';

  import { Tonations } from './tonations';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  useVModel(props, 'modelValue', emit);
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <Button
        v-for="(item, index) in Tonations"
        :key="index"
        size="small"
        class="flex justify-content-center w-1 mx-1 mb-2 p-0 uppercase text-xs"
        :severity="modelValue === item ? 'success' : 'primary'"
        @click="$emit('update:modelValue', item)"
      >
        {{ item }}
      </Button>
    </div>
    <Button
      class="flex justify-content-center mt-3 mx-1 py-0 px-2 uppercase text-xs"
      :severity="modelValue === 'random' ? 'success' : 'primary'"
      @click="$emit('update:modelValue', 'random')"
    >
      Random
    </Button>
  </div>
</template>
