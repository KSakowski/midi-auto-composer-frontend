import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import Layouts from 'vite-plugin-vue-layouts';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      exclude: ['**/components/*.vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
