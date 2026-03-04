import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
		vue(),
    dts({
      cleanVueFileName: true,
      insertTypesEntry: true
    })
	],
	build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'smartness-vue',
      formats: ['es', 'umd'],
      fileName: (format) => `smartness-vue.${format}.js`,
    },
    rolldownOptions: {
      external: ['vue'], // pnpm ensures this is strictly enforced
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
})
