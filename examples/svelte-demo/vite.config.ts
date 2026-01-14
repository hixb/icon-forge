import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@dawnice/icon-forge-svelte': path.resolve(__dirname, '../../packages/svelte/src'),
    },
  },
})
