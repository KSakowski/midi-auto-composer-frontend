<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import customCreatorIcon from '@/assets/custom_creator.svg';
  import intervalsIcon from '@/assets/intervals.svg';
  import oneScalesIcon from '@/assets/one_scales.svg';
  import patternIcon from '@/assets/pattern.svg';

  const route = useRoute();

  const items = ref([
    {
      label: 'Pattern',
      icon: patternIcon,
      route: '/',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius ut nulla nec aliquet. Nam lorem arcu, hendrerit vel sem ac, scelerisque venenatis neque. Fusce vitae massa a dui maximus ullamcorper. Nunc dignissim semper rutrum. Donec a mi id dui viverra porttitor.',
    },
    {
      label: 'Scales one chord',
      icon: oneScalesIcon,
      route: '/scales-one-chord',
      description: 'lorem ipsum dolor sit amet Scales one chord',
    },
    {
      label: 'Intervals',
      icon: intervalsIcon,
      route: '/intervals',
      description: 'lorem ipsum dolor sit amet Intervals',
    },
    {
      label: 'Melody',
      icon: intervalsIcon,
      route: '/melody',
      description: 'lorem ipsum dolor sit amet Intervals',
    },
    {
      label: 'Custom creator',
      icon: customCreatorIcon,
      route: '/custom-creator',
      description: 'lorem ipsum dolor sit amet Custom creator',
    },
  ]);

  const currentRoute = computed(() => items.value.find(item => item.route === route.path));
</script>

<template>
  <nav>
    <ul class="at-nav m-0 mb-5 p-0 list-none">
      <li v-for="(item, index) in items" :key="index" class="mb-2 pl-0">
        <router-link v-if="item.route" v-slot="{ href, navigate, isActive }" :to="item.route" custom>
          <a
            :class="isActive ? 'active text-yellow-100' : 'text-white'"
            class="flex align-items-center no-underline"
            :href="href"
            @click="navigate"
          >
            <span :class="item.icon" />
            <Component class="at-nav__icon" :is="item.icon" />
            <span class="pl-2">{{ item.label }}</span>
          </a>
        </router-link>
      </li>
    </ul>
    <p class="text border-1 border-round p-3 text-justify">{{ currentRoute?.description }}</p>
  </nav>
</template>

<style lang="scss" scoped>
  .at-nav {
    &__icon {
      fill: #fff;
    }
  }
</style>
