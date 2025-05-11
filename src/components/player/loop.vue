<script setup lang="ts">
defineProps<{
  active: boolean;
}>();
</script>


<template>
  <span
    class="material-symbols-outlined text-4xl cursor-pointer"
    :class="active ? 'text-primary-300' : ''"
    :title="'Repeat'"
  >repeat</span>
</template>
