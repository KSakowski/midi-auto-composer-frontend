<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import Button from 'primevue/button';

  import { Tonations, TonationSettings } from './tonations';

  const props = defineProps<{
    modelValue: string;
  }>();
  const emit = defineEmits(['update:modelValue']);

  useVModel(props, 'modelValue', emit);

  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
</script>

<template>
  <div class="overflow-auto">
    <ul class="keyboard">
      <li
        v-for="(tonation, index) in Tonations"
        :key="index"
        :class="[
          whiteKeys.includes(tonation) ? 'white' : 'black',
          TonationSettings[tonation]?.offset ? 'offset' : '',
          modelValue === tonation ? 'pressed' : '',
        ]"
        @click="$emit('update:modelValue', tonation)"
      >
        {{ TonationSettings[tonation]?.label }}
      </li>
    </ul>
    <Button
      class="flex justify-content-center mt-3 mx-1 py-0 px-2 uppercase text-xs"
      :severity="modelValue === 'random' ? 'success' : 'primary'"
      @click="$emit('update:modelValue', 'random')"
    >
      Random
    </Button>
  </div>
</template>

<style lang="scss" scoped>
  // https://css-tricks.com/how-to-code-a-playable-synth-keyboard/
  // TODO CSS refactor
  .keyboard {
    width: 280px;
    height: 120px;
    padding: 0 0 0 1rem;
    position: relative;

    .white,
    .black {
      position: relative;
      float: left;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding: 0.5rem 0;
      user-select: none;
      cursor: pointer;
      font-size: 13px;
    }

    li:first-child {
      border-radius: 5px 0 5px 5px;
    }

    li:last-child {
      border-radius: 0 5px 5px 5px;
    }

    .white {
      height: 7rem;
      width: 2.5rem;
      z-index: 1;
      border-left: 1px solid hsl(0, 0%, 73%);
      border-bottom: 1px solid hsl(0, 0%, 73%);
      border-radius: 0 0 5px 5px;
      box-shadow:
        -1px 0 0 var(--white-80) inset,
        0 0 5px hsl(0, 0%, 80%) inset,
        0 0 3px var(--black-20);
      background: linear-gradient(to bottom, hsl(0, 0%, 93%) 0%, white 100%);
      color: var(--black-30);
      text-align: center;
    }

    .black {
      height: 4rem;
      width: 2rem;
      padding: 0.5rem;
      margin: 0 0 0 -1rem;
      z-index: 2;
      border: 1px solid black;
      border-radius: 0 0 3px 3px;
      box-shadow:
        -1px -1px 2px var(--white-20) inset,
        0 -5px 2px 3px var(--black-60) inset,
        0 2px 4px var(--black-50);
      background: linear-gradient(45deg, hsl(0, 0%, 13%) 0%, hsl(0, 0%, 33%) 100%);
      color: var(--white-50);
    }

    .white.pressed {
      border-top: 1px solid hsl(0, 0%, 47%);
      border-left: 1px solid hsl(0, 0%, 60%);
      border-bottom: 1px solid hsl(0, 0%, 60%);
      box-shadow:
        2px 0 3px var(--black-10) inset,
        -5px 5px 20px var(--black-20) inset,
        0 0 3px var(--black-20);
      background: linear-gradient(to bottom, white 0%, hsl(0, 0%, 91%) 100%);
      outline: none;
    }

    .black.pressed {
      box-shadow:
        -1px -1px 2px var(--white-20) inset,
        0 -2px 2px 3px var(--black-60) inset,
        0 1px 2px var(--black-50);
      background: linear-gradient(to right, hsl(0, 0%, 27%) 0%, hsl(0, 0%, 13%) 100%);
      outline: none;
    }

    .offset {
      margin: 0 0 0 -1rem;
    }
  }
</style>
