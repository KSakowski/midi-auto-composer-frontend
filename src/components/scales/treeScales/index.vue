<script setup lang="ts">
  import { TreeSelect } from 'primevue';
  import type { TreeNode } from 'primevue/treenode';
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';

  import { TreeScales } from '@/components/scales/scales';

  const props = withDefaults(
    defineProps<{
      values: string[];
      selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
    }>(),
    {
      selectionMode: 'checkbox',
    },
  );
  const emit = defineEmits(['update:modelValue']);

  const TreeSelectConstants = {
    toggleContent: 'p-tree-node-content',
    toggleButton: 'p-tree-node-toggle-button',
    input: 'p-tree-filter-input',
  };

  const selectedScales = ref({});
  const defaultValues = ref(Object.fromEntries(props.values.map(value => [value, { checked: true }])));
  const expandedKeys = ref<Record<string, boolean>>({});
  const inputElement = ref<HTMLInputElement | null>(null);

  async function onExpand() {
    await nextTick();
    attachFilterEvent();
  }

  function onFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    expandFilteredNodes(target.value);
  }

  function expandFilteredNodes(keyword: string) {
    if (!keyword) {
      expandedKeys.value = {};
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    expandedKeys.value = TreeScales.reduce(
      (result, { key, children }) => {
        if (
          children.some(({ label, data }) => [label, data].some(field => field.toLowerCase().includes(lowerKeyword)))
        ) {
          result[key] = true;
        }
        return result;
      },
      {} as Record<string, boolean>,
    );
  }

  function attachFilterEvent() {
    nextTick(() => {
      inputElement.value = document.querySelector(`.${TreeSelectConstants.input}`);
      inputElement.value?.addEventListener('keyup', onFilter);
    });
  }

  function detachFilterEvent() {
    inputElement.value?.removeEventListener('keyup', onFilter);
  }

  function onNodeSelect(event: TreeNode) {
    const value = event.key;
    const multipleValues = props.values.includes(value)
      ? props.values.filter(item => item !== value)
      : [...props.values, value];

    emit('update:modelValue', props.selectionMode !== 'single' ? multipleValues : value);
  }

  function toggleExpand(e: Event): void {
    const target = e.target as HTMLElement;
    const item = target.closest(`.${TreeSelectConstants.toggleContent}`) as HTMLElement | null;

    if (item) {
      const toggleButton = item.querySelector(`.${TreeSelectConstants.toggleButton}`) as HTMLElement | null;
      toggleButton?.click();
    }
  }

  onMounted(attachFilterEvent);
  onUnmounted(detachFilterEvent);
</script>

<template>
  <TreeSelect
    v-model="selectedScales"
    :default-value="defaultValues"
    :options="TreeScales"
    :selection-mode="selectionMode"
    filter
    filterMode="strict"
    placeholder="Select scales"
    class="at-tree-select md:w-80 w-full"
    :display="'comma'"
    :expandedKeys="expandedKeys"
    @node-select="onNodeSelect"
    @node-unselect="onNodeSelect"
    @show="onExpand"
  >
    <template #option="{ node }">
      <span v-if="!!node?.children" class="cursor-pointer" @click="e => toggleExpand(e)">
        {{ node?.label }}
      </span>
      <template v-else>
        {{ node?.label }}
      </template>
    </template>
  </TreeSelect>
</template>
