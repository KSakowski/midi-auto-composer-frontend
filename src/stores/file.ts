import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFileStore = defineStore('file', () => {
  const file = ref<ArrayBuffer>();
  const setFile = (file: ArrayBuffer) => {
    file.value = file;
  };
  const getFile = computed(() => file.value);

  return {
    setFile,
    getFile,
  };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot));
