import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base ('./') makes the built site work whether it is served
// from the domain root (username.github.io) OR from a project sub-path
// (username.github.io/repo-name/) — so it deploys to GitHub Pages with zero config.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
})
