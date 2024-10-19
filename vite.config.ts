import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ outDir: 'dist/dts', tsconfigPath: './tsconfig.lib.json' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    emptyOutDir: true,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/index.ts'),
    },
    rollupOptions: {
      external: ['vue', '@2gis/mapgl']
    }
  }
})
