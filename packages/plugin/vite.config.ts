import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'vite-plugin-react-no-set-function',
      formats: ['es', 'cjs']
    }
  }
})
