import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeSetState from 'vite-plugin-react-no-set-function'

// https://vite.dev/config/
export default defineConfig({
  plugins: [removeSetState(), react()],
})
