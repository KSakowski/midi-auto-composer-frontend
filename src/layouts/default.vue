<script setup lang="ts">
  import Logo from '@/components/layouts/logo.vue';
  import FooterNavigation from '@/components/layouts/navigation/footerNavigation.vue';
  import HeaderNavigation from '@/components/layouts/navigation/headerNavigation.vue';
</script>

<template>
  <div class="">
    <header class="fixed bg-white opacity-90 w-full py-3 shadow-1 z-5">
      <div class="container">
        <Logo />
      </div>
    </header>
    <main class="at-main">
      <HeaderNavigation />

      <router-view v-slot="{ Component }">
        <component :is="Component" />
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
