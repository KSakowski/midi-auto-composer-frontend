<script setup lang="ts">
  import { navigationItems } from '@/components/layouts/navigation/navigationItems';
</script>

<template>
  <nav class="at-nav bg-gray-50 opacity-90 shadow-1 py-2 z-5">
    <ul class="flex column-gap-4 justify-content-center p-0 m-0 list-none">
      <li v-for="(item, index) in navigationItems" :key="index">
        <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
          <a
            :class="isActive ? 'active text-primary-500' : 'text-gray-900'"
            class="no-underline text-center"
            :href="href"
            @click="navigate"
          >
            <Component class="at-nav__icon m-auto flex" :class="isActive ? 'active' : ''" :is="item.icon" />
            <p class="p-0 m-0 max-w-5rem text-sm">{{ item.label }}</p>
          </a>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .at-nav {
    position: sticky;
    bottom: 0;
    width: 100%;

    &__icon {
      height: 20px;
      width: 20px;
      fill: var(--p-gray-900);

      &.active {
        fill: var(--p-primary-color);
      }
    }
  }
</style>
