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
      description: 'Choose one of the most wisely known melody its tonation and tempo.',
    },
    {
      label: 'Custom creator',
      icon: customCreatorIcon,
      route: '/custom-creator',
      description: 'Learn how to improvise scales with chords progression. You can build composition by adding following blocks. Every component block has four features: tonation, duration in quarternotes, chord name, scale name. Just click on plus sign and make a choice what the next bar should be.',
    },
  ]);

  const currentRoute = computed(() => items.value.find(item => item.route === route.path));
</script>

<template>
  <nav  class="at-nav bg-gray-50 opacity-90 shadow-1 py-2 z-5">
    <ul class="flex column-gap-4 justify-content-center p-0 m-0 list-none">
      <li v-for="(item, index) in items" :key="index">
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
<!--    <p class="text border-1 border-round p-3 text-justify">{{ currentRoute?.description }}</p>-->
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
      fill: var(--gray-900);

      &.active {
        fill: var(--primary-color);
      }
    }
  }
</style>
