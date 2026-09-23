import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is relative so the build works on GitHub Pages (served from /<repo>/) and locally.
export default defineConfig({
  plugins: [react()],
  base: './',
})
