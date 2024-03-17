<script setup lang="ts">
  import { useRoute } from 'vue-router';

  import Logo from '@/components/layouts/logo.vue';
  import FooterNavigation from '@/components/layouts/navigation/footerNavigation.vue';
  import HeaderNavigation from '@/components/layouts/navigation/headerNavigation.vue';

  const route = useRoute();
  console.log('test env #3');
  // @ts-ignore
  console.log(__DUMMY__);
  console.log(import.meta.env);
</script>

<template>
  <div class="">
    <header class="fixed bg-white opacity-90 w-full py-3 shadow-1 z-5">
      <div class="container">
        <Logo />
      </div>
    </header>
    <main class="at-main">
      <HeaderNavigation :key="route.path" />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterNavigation />
  </div>
</template>

<style lang="scss" scoped>
  .at-main {
    padding-top: 55px;

    min-height: calc(100vh - 55px);
  }
</style>
