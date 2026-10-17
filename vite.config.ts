import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

/**
 * GitHub Pages project site for nexara-groups/nexara-ui-compnents.
 * Local `npm run dev` stays at `/`. The Pages workflow sets VITE_BASE.
 */
const pagesBase = '/nexara-ui-compnents/'

export default defineConfig({
  base: process.env.VITE_BASE ?? (process.env.GITHUB_ACTIONS ? pagesBase : '/'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
