import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        visitor: resolve(__dirname, 'visitor.html'),
        organizer : resolve(__dirname , 'organizer.html'),
      },
    },
  },
  assetsInclude: ['**/*.gltf'],
  base : "/event-listing/"
})