import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    host: true,
    port: 4173,
    // Allows the container to be reached via its AWS/App Runner hostname
    // or any custom domain, instead of only "localhost".
    allowedHosts: true,
  },
})