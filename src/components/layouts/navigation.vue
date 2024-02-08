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
        'Learn scales by playing the selected pattern at every each scale step. This allows you  to recognize characteristic intervals of a scale and helps to build confidence in using them.',
    },
    {
      label: 'Scales one chord',
      icon: oneScalesIcon,
      route: '/scales-one-chord',
      description: 'First step towards musical improvisation. Choose a chord and then select one or more scales to be played along. You can start with one scale and then try adding another to hear how do they mix together.',
    },
    {
      label: 'Intervals',
      icon: intervalsIcon,
      route: '/intervals',
      description: 'This excercise helps you to train your musical hearing. Select which intervals will be played randomly, upwards or downwards, one after another.',
    },
    {
      label: 'Melody',
      icon: intervalsIcon,
      route: '/melody',
      description: 'Learn how to improvise scales with chords progression. You can build composition by adding following blocks. Every component block has four features: tonation, duration in quarternotes, chord name, scale name. Just click on plus sign and make a choice what the next bar should be.',
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
