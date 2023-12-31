<script setup lang="ts">
  import { ref } from 'vue';

  const items = ref([
    {
      label: 'Pattern',
      icon: 'pin',
      route: '/',
    },
    {
      label: 'Scales one chord',
      icon: 'share',
      route: '/scales-one-chord',
    },
    {
      label: 'Intervals',
      icon: 'diversity_2',
      route: '/intervals',
    },
    {
      label: 'Custom creator',
      icon: 'diversity_2',
      route: '/custom-creator',
    },
  ]);
</script>

<template>
  <ul class="m-0 p-0 list-none">
    <li v-for="(item, index) in items" :key="index" class="mb-2 pl-0">
      <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
        <a :class="isActive ? 'text-yellow-100' : 'text-white'" class="flex align-items-center no-underline"  :href="href" @click="navigate">
          <span :class="item.icon" />
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span class="pl-2">{{ item.label }}</span>
        </a>
      </router-link>
    </li>
  </ul>
</template>
