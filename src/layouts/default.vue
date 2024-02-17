<script setup lang="ts">
  import Card from 'primevue/card';

  import Logo from '@/components/layouts/logo.vue';
  import Navigation from "@/components/layouts/navigation.vue";

  console.log('test env');
  console.log(import.meta.env);
</script>

<template>
  <Card class="container">
    <template #content>
      <header class="mb-4 text-center">
        <Logo />
      </header>
      <div class="grid grid-nogutter">
        <main class="col-12 md:col-9">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <nav class="col-12 md:col-3">
          <h3>Mode</h3>
          <Navigation />
        </nav>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
</style>
