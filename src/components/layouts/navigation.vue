<script setup lang="ts">
  import { ref } from 'vue';

  const items = ref([
    {
      label: 'Pattern',
      icon: 'pi pi-link',
      route: '/',
    },
    {
      label: 'Random scales one chord',
      icon: 'pi pi-link',
      route: '/',
    },
    {
      label: 'One scales one chord',
      icon: 'pi pi-link',
      route: '/',
    },
    {
      label: 'Custom creator',
      icon: 'pi pi-link',
      route: '/',
    },
  ]);
</script>

<template>
  <ul class="m-0 p-0 list-none">
    <li v-for="(item, index) in items" :key="index" class="mb-2">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a class="text-xl text-white no-underline" :href="href" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </li>
  </ul>
</template>
