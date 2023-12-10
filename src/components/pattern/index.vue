<script lang="ts" setup>
  import { useVModel } from '@vueuse/core';
  import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable';
  import Button from 'primevue/button';
  import { computed, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue: number[];
      options?: number[];
      maxLength?: number;
    }>(),
    {
      options: () => [1, 2, 3, 4, 5, 6, 7],
      maxLength: 7,
    },
  );

  const emit = defineEmits(['update:modelValue']);
  const pattern = useVModel(props, 'modelValue', emit);
  const patternOptions = computed(() =>
    props.options.map(option => {
      return { value: option, key: Math.random() };
    }),
  );

  const el = ref<HTMLElement | null>(null);
  const isDisabled = computed(() => props.modelValue?.length >= props.maxLength);

  function updatePattern(value: string | number) {
    if (isDisabled.value) return;

    emit('update:modelValue', [...pattern.value, value]);
  }

  function deletePattern(index: number) {
    pattern.value.splice(index, 1);
    emit('update:modelValue', pattern.value);
  }

  useSortable(el, pattern.value, {
    onUpdate: (e: { oldIndex: number; newIndex: number }) => {
      moveArrayElement(pattern.value, e.oldIndex, e.newIndex);
    },
  });
</script>

<template>
  <div class="pattern">
    {{ pattern }}
    <div ref="el" class="flex flex-wrap mb-4">
      <Button
        v-for="item in patternOptions"
        :key="item.key"
        size="small"
        class="py-0 px-2 mx-1 my-1 text-xs relative overflow-visible"
      >
        {{ item.value }}
        <span class="remove-btn flex align-items-center justify-content-center bg-red-300" @click="deletePattern(item)">
          x
        </span>
      </Button>
    </div>

    <Button
      v-for="item in options"
      :key="item"
      size="small"
      class="py-0 px-2 mx-1 text-xs relative overflow-visible"
      :disabled="isDisabled"
      @click="updatePattern(item)"
    >
      {{ item }}
      <span class="add-btn flex align-items-center justify-content-center bg-yellow-100">+</span>
    </Button>
  </div>
</template>

<style lang="scss" scoped>
  .pattern {
    .add-btn,
    .remove-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 15px;
      height: 15px;
      border-radius: 100%;
    }
  }
</style>
