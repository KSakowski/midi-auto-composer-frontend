<script lang="ts" setup>
  import { useVModel } from '@vueuse/core';
  import { useSortable } from '@vueuse/integrations/useSortable';
  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown';
  import { ref } from 'vue';

  const props = withDefaults(
      defineProps<{
        modelValue: number[];
        options?: number[];
        maxLength?: number;
      }>(),
      {
        options: () => [1,2,3,4,5,6,7],
        maxLength: 7
      },
  );

  const emit = defineEmits(['update:modelValue']);
  const pattern = useVModel(props, 'modelValue', emit);

  const el = ref<HTMLElement | null>(null);

  function updatePattern(value: string | number) {
    emit('update:modelValue', [...pattern.value, value]);
  }

  function deletePattern(index: number) {
    pattern.value.splice(index, 1);
    emit('update:modelValue', pattern.value);
  }

  useSortable(el, pattern.value);
</script>

<template>
  <div ref="el" class="flex flex-wrap mb-4">
    <div v-for="(item, index) in pattern" :key="item" class="px-1 py-1 b-1 bg-grey-3 cursor-pointer">
      <Button size="small" class="p-2 m-0">
        {{ item }}
        <span class="absolute top-0 right-0 text-red-500" @click="deletePattern(index)">x</span>
      </Button>
    </div>
  </div>

  <Dropdown :options="options" class="w-full">
    <template #option="slotProps">
      <div @click.stop="updatePattern(slotProps?.option)">{{ slotProps?.option }}</div>
    </template>
  </Dropdown>
</template>

<style lang="scss">
  .pattern-form {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
