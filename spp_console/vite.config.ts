import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: proxyOptions
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: '../shree_polymer_products/public/spp_console',
    emptyOutDir: true,
    target: 'es2015',
  },
})
