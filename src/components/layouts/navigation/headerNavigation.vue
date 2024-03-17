<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  import { navigationItems } from '@/components/layouts/navigation/navigationItems';

  const route = useRoute();
  const router = useRouter();
  const firstRoute = navigationItems[0];
  const lastRoute = navigationItems[navigationItems.length - 1];
  const currentRoute = computed(() => navigationItems.find(item => item.route === route.path) || firstRoute);

  function back() {
    const previousRoute =
      currentRoute.value.index !== firstRoute.index
        ? navigationItems.find(item => item.index === currentRoute.value.index - 1)
        : lastRoute;
    router.push(previousRoute?.route);
  }

  function forward() {
    const nextRoute =
      currentRoute.value.index !== lastRoute.index
        ? navigationItems.find(item => item.index === currentRoute.value.index + 1)
        : firstRoute;
    router.push(nextRoute.route);
  }
</script>

<template>
  <div class="at-header">
    <div class="container relative py-2">
      <h1 class="text-white text-center">{{ currentRoute.label }}</h1>
      <p class="text-white text-center mx-auto">
        {{ currentRoute.description }}
      </p>
      <div class="player-container"></div>
      <div class="arrows">
        <button class="arrow back" @click="back">
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <button class="arrow forward" @click="forward">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .at-header {
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 300px;

    .container {
      max-width: 600px;
      padding: 0 60px;
    }

    .arrow {
      width: 60px;
      height: 50px;
      position: absolute;
      top: 90px;
      background: transparent;
      border: 0;
      box-shadow: none;
      cursor: pointer;

      .material-symbols-outlined {
        font-size: 48px;
        color: #fff;
      }

      &.back {
        left: 0;
      }
      &.forward {
        right: 0;
      }
    }
  }
</style>
