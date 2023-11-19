<script setup lang="ts">
  import Menubar from "primevue/menubar";
  import { ref } from 'vue';

  import Logo from '@/components/layouts/logo.vue';

  const items = ref([
    {
      label: 'Pattern',
      icon: 'pi pi-link',
      route: '/'
    },
    {
      label: 'Random scales one chord',
      icon: 'pi pi-link',
      route: '/'
    },
    {
      label: 'One scales one chord',
      icon: 'pi pi-link',
      route: '/'
    },
  ]);
</script>

<template>
  <div class="container">
    <header class="mb-4 text-center">
      <Menubar :model="items" :pt="{ menu: { class: 'ml-auto' } }">
        <template #start>
          <Logo />
        </template>
        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
      </Menubar>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 16px;
  }
</style>
